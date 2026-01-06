# 🔒 SSL 인증서 체커

웹사이트의 SSL/TLS 인증서 정보를 확인할 수 있는 웹 애플리케이션입니다.

## 📋 기능

- ✅ SSL 인증서 만료일 확인
- ✅ 남은 일수 계산 및 상태 표시 (정상/만료임박/만료됨)
- ✅ 발급기관 및 발급일 정보
- ✅ 서명 알고리즘 상세 정보
- ✅ SAN (Subject Alternative Names) - 커버 도메인 목록
- ✅ SHA-256 Fingerprint
- ✅ X.509 인증서 버전

## 🚀 시작하기

### 필요 사항
- Node.js (v14 이상)
- npm

### 설치

```bash
# 패키지 설치
npm install
```

### 실행

```bash
# 서버 시작
npm start

# 또는
node server.js
```

서버가 실행되면 브라우저에서 `index.html` 파일을 열어주세요.

## 💻 사용 방법

1. 도메인 입력창에 확인하고 싶은 도메인 입력
   - 예: `google.com`, `www.naver.com`
2. "확인" 버튼 클릭
3. SSL 인증서 정보 확인

## 🛠 기술 스택

### Frontend
- HTML5
- CSS3 (Gradient 배경, Flexbox)
- Vanilla JavaScript (ES6+)

### Backend
- Node.js
- Express.js
- TLS (Node.js 내장 모듈)
- @peculiar/x509 (인증서 파싱)

## 📂 프로젝트 구조

```
ssl-checker/
├── index.html          # 프론트엔드 UI
├── server.js           # Express 서버 & SSL 체크 로직
├── package.json        # 프로젝트 설정
└── README.md          # 프로젝트 문서
```

## 🔐 보안 기능

- XSS 방어 (입력값 검증 및 sanitization)
- 도메인 형식 검증
- SNI (Server Name Indication) 지원
- 에러 처리 및 타임아웃 설정

## ⚠️ 주의사항

- 로컬 개발 환경에서만 작동 (localhost:3000)
- 배포 시 CORS 설정 및 HTTPS 적용 필요
- `rejectUnauthorized: false` 옵션은 개발용 (프로덕션에서는 제거 권장)

## 📝 라이선스

MIT License

## 👤 작성자

Hyun

---

Made with by Hyun
