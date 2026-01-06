// 모듈 불러오기
const express = require('express');
const cors = require('cors');
const tls = require('tls');
const { X509Certificate } = require('@peculiar/x509');

// Express 앱 생성
const app = express();

// 미들웨어 설정
app.use(cors());  // CORS 허용
app.use(express.json());  // JSON 파싱
app.use(express.static('.'));  // 정적 파일 제공 (index.html)
app.use(express.static('.'));  // 정적 파일 제공 (index.html)

// URL 파싱 함수
function parseDomain(input) {
  let domain = input.trim();

  // https://, http:// 제거
  domain = domain.replace(/^https?:\/\//, '');

  // 경로 제거 (/ 이후)
  domain = domain.split('/')[0];

  // 포트 제거 (:443 같은 거)
  domain = domain.split(':')[0];

  // XSS 방어: 특수문자 제거
  domain = domain.replace(/[<>'"]/g, '');

  return domain;
}

function getSSLInfo(domain) {
  return new Promise((resolve, reject) => {
    const options = {
      host: domain,
      port: 443,
      servername: domain,
      rejectUnauthorized: false
    };

    const socket = tls.connect(options, () => {

      const cert = socket.getPeerCertificate(true);

      const issuer = cert.issuer.O || cert.issuer.CN;
      const validTo = cert.valid_to;
      const validFrom = cert.valid_from;

      // 서명 알고리즘 추출
      let signatureAlgorithm = 'Unknown';
      let version = 3; // 기본값
      
      try {
        const x509 = new X509Certificate(cert.raw);

        const algName = x509.signatureAlgorithm.name;
        const hashAlg = x509.signatureAlgorithm.hash?.name;

        if (algName === 'ECDSA') {
          signatureAlgorithm = hashAlg
            ? `${hashAlg}를 포함한 X9.62 ECDSA 서명`
            : 'X9.62 ECDSA 서명';
        } else if (algName === 'RSASSA-PKCS1-v1_5' || algName.includes('RSA')) {
          signatureAlgorithm = hashAlg
            ? `${hashAlg}를 포함한 RSA 서명`
            : 'RSA 서명';
        } else {
          signatureAlgorithm = hashAlg
            ? `${hashAlg}를 포함한 ${algName} 서명`
            : algName;
        }

        // 버전 추출
        version = x509.version || 3;

      } catch (e) {
        signatureAlgorithm = 'Unknown';
      }

      // 날짜 계산
      const expiryDate = new Date(validTo);
      const startDate = new Date(validFrom);
      const now = new Date();
      const diffTime = expiryDate - now;
      const daysLeft = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const validDays = Math.floor((expiryDate - startDate) / (1000 * 60 * 60 * 24));

      // 상태
      const isExpired = daysLeft < 0;
      const isExpiringSoon = daysLeft < 30 && daysLeft >= 0;
      const status = isExpired ? '만료됨'
        : isExpiringSoon ? '만료 임박'
          : '정상';

      // SAN 파싱
      const sanList = cert.subjectaltname
        ? cert.subjectaltname.split(', ').map(s => s.replace('DNS:', ''))
        : [];

      socket.end();

      resolve({
        // 기본
        domain: domain,
        issuer: issuer,

        // 날짜
        validFrom: validFrom,
        validTo: validTo,
        daysLeft: daysLeft,
        validDays: validDays,

        // 상태
        status: status,
        isExpired: isExpired,
        isExpiringSoon: isExpiringSoon,

        // 상세
        subjectCN: cert.subject.CN,
        organization: cert.subject.O || 'N/A',
        country: cert.subject.C || 'N/A',
        alternativeNames: sanList,

        // 보안
        signatureAlgorithm: signatureAlgorithm,
        keySize: cert.bits,
        fingerprint: cert.fingerprint256,
        version: cert.version || 3
      });
    });

    socket.on('error', (error) => {
      reject(error);
    });

    socket.setTimeout(10000);
    socket.on('timeout', () => {
      socket.destroy();
      reject(new Error('연결 타임아웃'));
    });
  });
}

app.post('/api/check', async (req, res) => {
  try {
    const { domain } = req.body;
    const parsedDomain = parseDomain(domain);

    // SSL 정보 가져오기
    const sslInfo = await getSSLInfo(parsedDomain);

    res.json(sslInfo);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`서버가 ${PORT}번 포트에서 실행 중...`);
});