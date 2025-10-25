# Taeifolio - Interactive 3D Yacht Simulation

Next.js 14와 React Three Fiber를 활용한 인터랙티브 3D 요트 시뮬레이션 포트폴리오입니다.

<div align="center">

  <!-- GitHub Actions 배지 -->
  ![CI](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME/workflows/CI/badge.svg)
  ![Deploy](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME/workflows/Deploy%20to%20Production/badge.svg)
  ![CodeQL](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME/workflows/CodeQL%20Security%20Analysis/badge.svg)

  <!-- 기술 스택 배지 -->
  <img src="https://img.shields.io/badge/Next.js-14.0.3-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Three.js-0.158.0-000000?style=for-the-badge&logo=three.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.3-06B6D4?style=for-the-badge&logo=tailwindcss" />

  <!-- 추가 정보 배지 -->
  ![License](https://img.shields.io/badge/License-Private-red?style=for-the-badge)
  ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)

</div>

---

## 📋 목차

- [프로젝트 소개](#-프로젝트-소개)
- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [시작하기](#-시작하기)
- [키보드 컨트롤](#-키보드-컨트롤)
- [프로젝트 구조](#-프로젝트-구조)
- [핵심 컴포넌트](#-핵심-컴포넌트)
- [커스터마이징](#-커스터마이징)
- [학습 포인트](#-학습-포인트)
- [CI/CD](#-cicd)

---

## 🎯 프로젝트 소개

이 프로젝트는 Three.js를 React 환경에서 효율적으로 사용하는 방법을 학습하고 시연하기 위해 제작된 **인터랙티브 3D 웹 애플리케이션**입니다.

### 핵심 특징

- **실시간 물리 시뮬레이션**: 현실적인 요트 움직임과 관성 구현
- **3인칭 카메라 시스템**: 요트를 부드럽게 추적하는 게임 스타일 카메라
- **키보드 인터랙션**: 직관적인 키보드 컨트롤로 요트 조종
- **동적 환경**: Sky, Ocean, 조명 시스템을 활용한 사실적인 바다 환경
- **반응형 디자인**: 다양한 화면 크기에 대응하는 레이아웃

---

## ✨ 주요 기능

### 1. 인터랙티브 요트 제어

- **방향키**로 요트를 전진/후진/좌우 회전
- **W/S 키**로 요트를 상승/하강
- 현실적인 물리 시뮬레이션 (가속도, 최대 속도, 마찰력)
- 속도에 따른 요트 흔들림 효과

### 2. 3인칭 카메라 시스템

- 요트를 부드럽게 따라다니는 동적 카메라
- 요트의 회전을 고려한 카메라 위치 계산
- 부드러운 카메라 이동(lerp) 구현

### 3. 사실적인 환경 렌더링

- **Ocean**: 셰이더 기반 바다 렌더링
- **Sky**: 동적인 하늘과 태양 위치
- **Environment**: 도시 환경 프리셋 배경
- **조명**: Ambient Light + Directional Light

### 4. UI 오버레이

- 실시간 키보드 컨트롤 가이드 표시
- 투명한 UI로 몰입감 유지

---

## 🛠 기술 스택

### Core Technologies

| 기술 | 용도 |
|------|------|
| **Next.js 14** | React 프레임워크 (App Router) |
| **React 18** | UI 컴포넌트 라이브러리 |
| **TypeScript** | 타입 안정성 |
| **Tailwind CSS** | 유틸리티 기반 스타일링 |

### 3D Graphics

| 라이브러리 | 용도 |
|-----------|------|
| **Three.js** | 3D 그래픽 코어 엔진 |
| **React Three Fiber** | Three.js React 렌더러 |
| **React Three Drei** | Three.js 고수준 컴포넌트 (Sky, Environment 등) |

### Development Tools

- **ESLint**: 코드 품질 검사
- **PostCSS**: CSS 처리
- **Autoprefixer**: 브라우저 호환성

---

## 🚀 시작하기

### 사전 요구사항

- Node.js 18.x 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:3000)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 코드 린팅
npm run lint
```

---

## 🎮 키보드 컨트롤

### 이동 컨트롤

| 키 | 동작 |
|---|------|
| **↑ (ArrowUp)** | 전진 |
| **↓ (ArrowDown)** | 후진 |
| **← (ArrowLeft)** | 좌회전 |
| **→ (ArrowRight)** | 우회전 |

### 고도 컨트롤

| 키 | 동작 |
|---|------|
| **W** | 상승 |
| **S** | 하강 |

> 💡 **Tip**: 방향키와 W/S를 동시에 사용하여 3D 공간에서 자유롭게 비행할 수 있습니다!

---

## 📂 프로젝트 구조

```
three/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx           # 루트 레이아웃
│   │   ├── page.tsx             # 홈 페이지
│   │   └── globals.css          # 전역 CSS
│   │
│   ├── components/              # React 컴포넌트
│   │   ├── YachtScene.tsx      # 메인 3D 씬 컴포넌트
│   │   ├── ControllableYacht.tsx # 제어 가능한 요트
│   │   ├── CameraRig.tsx       # 3인칭 카메라 시스템
│   │   ├── Ocean.tsx           # 바다 렌더링
│   │   ├── Island.tsx          # 섬 컴포넌트
│   │   ├── IslandUI.tsx        # 섬 UI
│   │   ├── NeonButton.tsx      # 네온 버튼 컴포넌트
│   │   └── ControlsUI.tsx      # 키보드 컨트롤 UI
│   │
│   ├── controls/                # 입력 제어
│   │   └── controls.ts         # 키보드 입력 및 설정
│   │
│   ├── types/                   # TypeScript 타입 정의
│   │   └── threeTypes.ts       # Three.js 관련 타입
│   │
│   └── utils/                   # 유틸리티 함수
│       ├── collision.ts        # 충돌 감지
│       └── timeSync.ts         # 시간 동기화
│
├── public/                      # 정적 파일
│   ├── yacht_light.glb         # 요트 3D 모델
│   └── *.svg                   # 아이콘 및 로고
│
├── next.config.js              # Next.js 설정
├── tsconfig.json               # TypeScript 설정
├── tailwind.config.ts          # Tailwind CSS 설정
├── postcss.config.js           # PostCSS 설정
├── .eslintrc.json              # ESLint 설정
├── CLAUDE.md                   # 프로젝트 상세 문서
└── README.md                   # 프로젝트 소개
```

---

## 🔧 핵심 컴포넌트

### YachtScene.tsx

메인 3D 씬을 관리하는 최상위 컴포넌트입니다.

**주요 기능:**
- Canvas 설정 및 카메라 구성
- 조명 시스템 (Ambient + Directional)
- 환경 설정 (Sky, Environment)
- 컴포넌트 구성 (Yacht, Ocean, Camera)

### ControllableYacht.tsx

키보드 입력으로 제어 가능한 요트 컴포넌트입니다.

**물리 시뮬레이션:**
- 회전 제어 (좌우 방향키)
- 가속/감속 (상하 방향키)
- 상승/하강 (W/S 키)
- 마찰력 및 최대 속도 제한
- 속도 기반 흔들림 효과

**코드 참조:**
```typescript
// controls/controls.ts
export const YACHT_CONTROLS = {
  rotationSpeed: 0.02,      // 회전 속도
  acceleration: 0.001,      // 가속도
  maxSpeed: 0.3,           // 최대 속도
  friction: 0.98,          // 마찰력
  verticalSpeed: 2.0,      // 상승/하강 속도
};
```

### CameraRig.tsx

요트를 부드럽게 추적하는 3인칭 카메라 시스템입니다.

**동작 원리:**
1. 요트의 회전을 고려한 오프셋 계산
2. 목표 카메라 위치 계산
3. Lerp를 사용한 부드러운 이동
4. 요트를 향한 카메라 회전

```typescript
// 현재 카메라 설정
offset={new THREE.Vector3(0, 8, -20)}  // 요트 뒤쪽 위에서 추적
smoothness={0.05}                       // 부드러움 정도
```

### Ocean.tsx

셰이더를 활용한 사실적인 바다 렌더링 컴포넌트입니다.

---

## 🎨 커스터마이징

### 요트 제어 조정

`src/controls/controls.ts` 파일에서 요트의 움직임을 조정할 수 있습니다:

```typescript
export const YACHT_CONTROLS = {
  rotationSpeed: 0.02,    // 회전 속도 (더 크면 빠르게 회전)
  acceleration: 0.001,    // 가속도 (더 크면 빠르게 가속)
  maxSpeed: 0.3,         // 최대 속도 제한
  friction: 0.98,        // 마찰력 (1에 가까울수록 관성이 큼)
  verticalSpeed: 2.0,    // 상승/하강 속도
};
```

### 카메라 위치 변경

`src/components/YachtScene.tsx`에서 카메라 오프셋을 조정할 수 있습니다:

```typescript
<CameraRig
  targetRef={yachtRef}
  offset={new THREE.Vector3(0, 8, -20)}  // [x, y, z]
  smoothness={0.05}
/>
```

**오프셋 예시:**
- **더 멀리 보기**: `z: -30`
- **더 가까이 보기**: `z: -15`
- **더 높은 시점**: `y: 10`
- **더 낮은 시점**: `y: 5`

### 요트 초기 설정

`src/components/ControllableYacht.tsx`에서 초기 위치와 회전을 설정할 수 있습니다:

```typescript
useEffect(() => {
  if (yachtRef.current) {
    yachtRef.current.rotation.y = Math.PI;  // 180도 회전
    yachtRef.current.position.y = 2;        // 높이 설정
  }
}, [ref]);
```

---

## 📚 학습 포인트

이 프로젝트를 통해 다음을 학습할 수 있습니다:

### React Three Fiber

- **useFrame**: 매 프레임 실행되는 애니메이션 루프
- **forwardRef**: 컴포넌트 간 ref 전달
- **useGLTF**: 3D 모델 로딩
- **Canvas**: Three.js 씬 설정

### Three.js 핵심 개념

- **Vector3**: 3D 공간의 위치, 방향 계산
- **Quaternion**: 3D 회전 표현
- **Lerp**: 부드러운 값 보간
- **useFrame**: 60fps 애니메이션 루프

### React 패턴

- **커스텀 훅**: `useKeyboardControls`로 키보드 입력 처리
- **forwardRef**: 부모-자식 컴포넌트 간 ref 전달
- **useRef**: DOM 및 값 참조 유지
- **useEffect**: 라이프사이클 관리

### 물리 시뮬레이션

- 가속도 및 속도 계산
- 마찰력 적용
- 최대 속도 제한
- 관성 시뮬레이션

---

## 🚧 향후 개발 계획

- [ ] 파도의 영향을 받는 요트 움직임
- [ ] 동적 날씨 시스템 (비, 안개, 낮/밤)
- [ ] 섬 및 장애물 추가
- [ ] 충돌 감지 시스템
- [ ] 체크포인트 레이싱 모드
- [ ] 속도계, 고도계 UI
- [ ] 모바일 터치 컨트롤
- [ ] 포스트 프로세싱 효과 (블룸, 반사)

---

## 🔄 CI/CD

이 프로젝트는 GitHub Actions를 통해 자동화된 CI/CD 파이프라인을 구축했습니다.

### GitHub Actions 워크플로우

#### 1. CI (Continuous Integration)
**파일**: `.github/workflows/ci.yml`

- **트리거**: `master`, `main`, `develop` 브랜치에 push 또는 PR 생성 시
- **실행 작업**:
  - Node.js 18.x, 20.x 버전에서 테스트
  - ESLint 코드 품질 검사
  - 프로덕션 빌드 실행
  - 빌드 결과 검증
  - 유닛 테스트 실행 (존재하는 경우)

```yaml
# 워크플로우 상태 확인
GitHub Repository → Actions → CI
```

#### 2. Deploy (배포)
**파일**: `.github/workflows/deploy.yml`

- **트리거**: `master` 또는 `main` 브랜치에 push 시
- **실행 작업**:
  - 린트 및 빌드
  - Vercel 자동 배포 (설정 시)
  - GitHub Pages 배포 옵션 제공

**Vercel 배포 설정 방법**:
1. GitHub Repository → Settings → Secrets and variables → Actions
2. 다음 시크릿 추가:
   - `VERCEL_TOKEN`: Vercel 계정 토큰
   - `VERCEL_ORG_ID`: Vercel 조직 ID
   - `VERCEL_PROJECT_ID`: Vercel 프로젝트 ID

#### 3. CodeQL (보안 분석)
**파일**: `.github/workflows/codeql.yml`

- **트리거**:
  - Push 및 PR 시
  - 매주 월요일 오전 9시 (UTC) 정기 스캔
- **실행 작업**:
  - JavaScript/TypeScript 코드 보안 취약점 분석
  - 보안 경고 자동 생성

#### 4. Dependabot (의존성 관리)
**파일**: `.github/dependabot.yml`

- **자동 업데이트**:
  - npm 패키지: 매주 월요일 오전 9시 (KST)
  - GitHub Actions: 매주 월요일 자동 확인
- **그룹화**: React, Next.js, Three.js, Tailwind CSS 등 관련 패키지 묶어서 업데이트

### Pull Request 템플릿

PR 생성 시 자동으로 제공되는 템플릿 (`.github/PULL_REQUEST_TEMPLATE.md`):
- 변경 사항 요약
- 변경 유형 체크리스트
- 테스트 방법
- 스크린샷 섹션
- 관련 이슈 링크

### 워크플로우 배지

위 배지들은 각 워크플로우의 상태를 실시간으로 표시합니다:
- ✅ **통과**: 모든 검사 성공
- ❌ **실패**: 일부 검사 실패
- 🟡 **진행 중**: 워크플로우 실행 중

### 사용 방법

```bash
# 1. 코드 변경 및 커밋
git add .
git commit -m "feat: 새로운 기능 추가"

# 2. GitHub에 푸시
git push origin master

# 3. GitHub Actions 자동 실행
# Repository → Actions 탭에서 진행 상황 확인
```

---

## 📄 라이센스

Private 프로젝트 - 개인 학습 및 포트폴리오 용도

---

## 📞 참고 자료

- [Next.js 공식 문서](https://nextjs.org/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [React Three Drei](https://github.com/pmndrs/drei)
- [Three.js 공식 문서](https://threejs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

<div align="center">
  <p>Made with ❤️ by Taei</p>
  <p>© 2025 Taeifolio. All rights reserved.</p>
</div>
