# 🔒 SSL 인증서 체커 (SSL Checker)

웹사이트 도메인을 입력하면 **SSL/TLS 인증서 정보와 만료 상태**를 확인할 수 있는 웹 애플리케이션입니다.  
Node.js 기반으로 구현되었으며, 별도의 설치 없이 브라우저에서 바로 사용할 수 있습니다.

👉 **라이브 데모**  
https://ssl-checker-os4j.onrender.com/

---

## ⚠️ 접속 시 유의사항 (중요)

본 서비스는 **Render 무료 플랜**을 사용하고 있습니다.  
이로 인해 **오랜 시간 접속하지 않았을 경우 첫 접속 시 서버가 슬립 상태에서 깨어나며 로딩이 지연**될 수 있습니다.

- 첫 접속 시 **약 20~40초 정도 대기**가 발생할 수 있습니다
- 한 번 로딩된 이후에는 정상 속도로 이용 가능합니다
- 오류가 아닌 정상 동작이니 잠시만 기다려 주세요

---

## ✨ 주요 기능

- ✅ 도메인 SSL 인증서 정보 조회
- 📅 인증서 만료일 및 남은 기간(D-Day) 표시
- 🏷 인증서 발급 기관(Issuer) 확인
- 🔐 인증서 유효 기간(발급일 / 만료일)
- 📄 SAN (Subject Alternative Names) 확인
- 🧾 인증서 기본 메타 정보 출력
- 🚦 상태 표시 (정상 / 만료 임박 / 만료)

---

## 🛠 사용 기술

### Frontend
- HTML / CSS / JavaScript
- Fetch API
- 반응형 UI

### Backend
- Node.js
- Express
- TLS / SSL 모듈

### Deployment
- Render (Free Plan)

---

## 📌 사용 방법

1. 사이트 접속  
   https://ssl-checker-os4j.onrender.com/

2. SSL 정보를 확인하고 싶은 **도메인 입력**
