# HOSU Command Center

강호수 전용 커맨드센터 정적 페이지입니다.

## 파일 구성

- `index.html`: 페이지 구조
- `styles.css`: 전체 스타일
- `app.js`: 탭 전환, 할 일 체크, 수익 기록, 노션 내보내기, 로컬 AI 응답

## 사용 방법

브라우저에서 `index.html`을 바로 열면 됩니다.

## 배포

이 저장소는 정적 사이트라서 GitHub Pages로 바로 올릴 수 있습니다.

1. 저장소에 푸시
2. GitHub 저장소의 `Settings > Pages` 이동
3. `Deploy from a branch` 선택
4. `main` 브랜치의 `/ (root)` 선택

## 참고

- 진행 상태와 수익 기록은 브라우저 `localStorage`에 저장됩니다.
- AI 에이전트 탭은 현재 로컬 규칙 기반 응답입니다.
- 실제 LLM API 연동이 필요하면 서버 API를 붙이는 방식으로 확장할 수 있습니다.
