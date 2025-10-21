# Taeifolio - Three.js Next.js 프로젝트 문서

## 프로젝트 개요

이 프로젝트는 **Next.js 14**와 **React Three Fiber**를 활용한 3D 웹 시각화 포트폴리오입니다. Three.js를 React 환경에서 효율적으로 사용하는 방법을 학습하고 시연하는 목적으로 제작되었습니다.

- **프로젝트 이름**: Taeifolio
- **버전**: 0.1.0
- **프레임워크**: Next.js 14 (App Router)
- **3D 라이브러리**: Three.js + React Three Fiber
- **스타일링**: Tailwind CSS
- **언어**: TypeScript

---

## 디렉토리 구조

```
three/
├── app/                    # Next.js App Router 디렉토리
│   ├── layout.tsx         # 루트 레이아웃 (메타데이터, 폰트 설정)
│   ├── page.tsx           # 홈 페이지 (/)
│   └── globals.css        # 전역 CSS (Tailwind)
├── components/            # React 컴포넌트
│   ├── YachtScene.tsx    # 메인 3D 씬 컴포넌트
│   ├── ControllableYacht.tsx  # 키보드로 제어 가능한 요트
│   ├── ControlsUI.tsx    # 컨트롤 UI 표시
│   ├── CameraRig.tsx     # 요트를 따라다니는 카메라
│   └── Ocean.tsx         # 바다 렌더링
├── controls/              # 입력 제어
│   └── controls.ts       # 키보드 입력 및 요트 제어 설정
├── public/                # 정적 파일
│   ├── yacht_light.glb   # 요트 3D 모델
│   ├── paints.svg        # 커스텀 SVG
│   └── *.svg, *.ico      # 아이콘 및 로고
├── next.config.js        # Next.js 설정
├── tsconfig.json         # TypeScript 설정
├── tailwind.config.ts    # Tailwind CSS 설정
├── postcss.config.js     # PostCSS 설정
├── .eslintrc.json        # ESLint 설정
├── package.json          # 의존성 및 스크립트
├── CLAUDE.md             # AI 참고용 프로젝트 문서
└── README.md             # 프로젝트 설명
```

---

## 주요 기능

### 1. 인터랙티브 요트 제어 시스템

#### YachtScene 컴포넌트 (`components/YachtScene.tsx`)

메인 3D 씬을 관리하는 컴포넌트입니다.

**주요 구성 요소:**
- Canvas 설정: `camera={{ position: [0, 10, 20], fov: 60, near: 1, far: 1000 }}`
- Environment: 도시 환경 프리셋
- 조명 시스템:
  - `ambientLight intensity={0.6}` - 전체 환경광
  - `directionalLight position={[50, 50, 50]} intensity={1.5}` - 방향성 조명
- Sky 컴포넌트: 태양 위치 `[100, 20, 100]`
- Ocean 컴포넌트: 바다 렌더링
- CameraRig: 요트를 따라다니는 3인칭 카메라

**ref 전달:**
```tsx
const yachtRef = useRef<THREE.Group>(null);
<ControllableYacht ref={yachtRef} url={YACHT_MODEL_URL} />
<CameraRig targetRef={yachtRef} offset={new THREE.Vector3(0, 8, -20)} />
```

#### ControllableYacht 컴포넌트 (`components/ControllableYacht.tsx`)

키보드 입력으로 제어 가능한 요트 컴포넌트입니다.

**초기 설정 (useEffect):**
```tsx
yachtRef.current.rotation.y = Math.PI;  // 180도 회전 (뒷모습 보임)
yachtRef.current.position.y = 2;         // y축 초기 위치
```

**물리 시뮬레이션 (useFrame):**
- 회전 제어 (좌우 방향키): `yacht.rotation.y ± YACHT_CONTROLS.rotationSpeed`
- 전진/후진 (상하 방향키): velocity에 방향 벡터 * acceleration 적용
- 상승/하강 (W/S 키): `velocity.y ± YACHT_CONTROLS.verticalSpeed * delta`
- 최대 속도 제한: `YACHT_CONTROLS.maxSpeed`
- 마찰력 적용: `velocity.multiplyScalar(YACHT_CONTROLS.friction)`
- 최소 높이 제한: y < 0일 때 y = 0으로 고정

**흔들림 효과:**
```tsx
if (speed > 0.01) {
  const time = state.clock.getElapsedTime();
  yacht.rotation.z = Math.sin(time * 3) * 0.02;
  yacht.rotation.x = Math.cos(time * 2.5) * 0.02;
}
```

**forwardRef 사용:**
- `forwardRef<THREE.Group, ControllableYachtProps>`로 ref 전달 가능
- CameraRig에서 요트 위치를 참조하기 위해 필요

#### CameraRig 컴포넌트 (`components/CameraRig.tsx`)

요트를 따라다니는 3인칭 카메라 시스템입니다.

**Props:**
- `targetRef`: 추적할 요트의 ref
- `offset`: 카메라 오프셋 (기본값: `new THREE.Vector3(0, 5, 15)`)
  - 현재 설정: `(0, 8, -20)` - 요트 뒤쪽 위에서 추적 (게임 스타일)
- `smoothness`: 카메라 이동 부드러움 (기본값: 0.05)

**동작 원리 (useFrame):**
1. 요트의 rotation을 고려한 오프셋 계산:
   ```tsx
   const rotatedOffset = offset.clone();
   rotatedOffset.applyQuaternion(target.quaternion);
   ```
2. 목표 카메라 위치 계산:
   ```tsx
   const targetCameraPosition = target.position.clone().add(rotatedOffset);
   ```
3. 부드러운 이동 (lerp):
   ```tsx
   cameraPositionRef.current.lerp(targetCameraPosition, smoothness);
   camera.position.copy(cameraPositionRef.current);
   ```
4. 요트를 향해 카메라 회전:
   ```tsx
   camera.lookAt(lookAtPositionRef.current);
   ```

#### 키보드 컨트롤 시스템 (`controls/controls.ts`)

**키 바인딩:**
- 방향키:
  - `ArrowUp`: forward (전진)
  - `ArrowDown`: backward (후진)
  - `ArrowLeft`: left (좌회전)
  - `ArrowRight`: right (우회전)
- W/S 키:
  - `w`: up (상승)
  - `s`: down (하강)

**요트 제어 설정 (YACHT_CONTROLS):**
```typescript
{
  rotationSpeed: 0.02,        // 회전 속도
  acceleration: 0.001,        // 가속도
  maxSpeed: 0.3,             // 최대 속도
  friction: 0.98,            // 마찰력 (1에 가까울수록 관성 큼)
  verticalSpeed: 2.0,        // 상승/하강 속도
}
```

**커스텀 훅:**
```typescript
export const useKeyboardControls = () => {
  // 키 상태를 추적하고 반환
  return {
    forward: boolean,
    backward: boolean,
    left: boolean,
    right: boolean,
    up: boolean,
    down: boolean,
  };
};
```

#### ControlsUI 컴포넌트 (`components/ControlsUI.tsx`)

화면에 키보드 컨트롤 가이드를 표시합니다.

---

## 기술 스택

### 프로덕션 의존성

| 패키지 | 버전 | 용도 |
|--------|------|------|
| `next` | 14.0.3 | React 프레임워크 (SSR, SSG, ISR) |
| `react` | ^18 | UI 라이브러리 |
| `react-dom` | ^18 | React DOM 렌더링 |
| `three` | ^0.158.0 | 3D 그래픽 코어 라이브러리 |
| `@react-three/fiber` | ^8.16.6 | Three.js React 렌더러 |
| `@react-three/drei` | ^9.105.6 | Three.js 고수준 컴포넌트 (Sky, Environment 등) |
| `@react-three/gltfjsx` | ^4.3.4 | GLTF 모델 변환 도구 |
| `@types/three` | ^0.158.3 | Three.js 타입 정의 |

### 개발 의존성

| 패키지 | 버전 | 용도 |
|--------|------|------|
| `typescript` | ^5 | 타입 안정성 |
| `tailwindcss` | ^3.3.0 | 유틸리티 CSS 프레임워크 |
| `postcss` | ^8 | CSS 변환 도구 |
| `autoprefixer` | ^10.0.1 | CSS 벤더 프리픽스 자동화 |
| `eslint` | ^8 | 코드 린팅 |
| `eslint-config-next` | 14.0.3 | Next.js ESLint 설정 |
| `next-transpile-modules` | ^10.0.1 | Three.js 모듈 트랜스파일 |
| `@types/node` | ^20 | Node.js 타입 정의 |
| `@types/react` | ^18 | React 타입 정의 |
| `@types/react-dom` | ^18 | React DOM 타입 정의 |

---

## 컴포넌트 계층 구조

```
RootLayout (app/layout.tsx)
├── 메타데이터: title="Taeifolio"
├── 전역 CSS: globals.css
├── Inter 폰트 (Google Fonts)
└── children
    └── 홈 페이지 (app/page.tsx)
        └── <YachtScene />
            ├── <ControlsUI /> (UI 오버레이)
            └── <Canvas camera={{ position: [0, 10, 20], fov: 60 }}>
                ├── <Environment preset="city" />
                ├── <ambientLight intensity={0.6} />
                ├── <directionalLight />
                ├── <Sky sunPosition={[100, 20, 100]} />
                ├── <Suspense>
                │   └── <ControllableYacht ref={yachtRef} />
                │       └── <group>
                │           └── <Clone object={scene} scale={0.5} />
                ├── <Ocean />
                └── <CameraRig targetRef={yachtRef} offset={[0, 8, -20]} />
```

---

## 개발 워크플로우

### 사용 가능한 스크립트

```bash
npm run dev      # 개발 서버 시작 (Hot Module Replacement)
npm run build    # 프로덕션 빌드
npm start        # 프로덕션 서버 실행
npm run lint     # ESLint 코드 품질 검사
```

### 개발 프로세스
1. TypeScript 파일이 엄격한 타입 체킹과 함께 컴파일됨
2. Tailwind CSS가 PostCSS와 autoprefixer로 처리됨
3. Three.js가 브라우저 호환성을 위해 트랜스파일됨
4. HMR(Hot Module Replacement)로 빠른 개발 반영

---

## 주요 코드 패턴

### 1. forwardRef를 사용한 ref 전달

```tsx
export const ControllableYacht = forwardRef<THREE.Group, ControllableYachtProps>(
  ({ url }, ref) => {
    const yachtRef = useRef<THREE.Group>(null!);

    useEffect(() => {
      if (yachtRef.current) {
        // ref 전달
        if (typeof ref === "function") {
          ref(yachtRef.current);
        } else if (ref) {
          ref.current = yachtRef.current;
        }
      }
    }, [ref]);

    return <group ref={yachtRef}>...</group>;
  }
);
```

### 2. useFrame을 사용한 애니메이션

```tsx
useFrame((state, delta) => {
  if (!yachtRef.current) return;

  // 매 프레임마다 실행되는 로직
  const yacht = yachtRef.current;
  const velocity = velocityRef.current;

  // 물리 계산 및 위치 업데이트
  yacht.position.add(velocity.clone().multiplyScalar(delta * 60));
});
```

### 3. 키보드 이벤트 처리

```tsx
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    setKeys((prev) => ({ ...prev, [e.key]: true }));
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    setKeys((prev) => ({ ...prev, [e.key]: false }));
  };

  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
  };
}, []);
```

### 4. Three.js 벡터 연산

```tsx
// 요트의 전진 방향 계산
const direction = new THREE.Vector3(0, 0, -1);
direction.applyQuaternion(yacht.quaternion);

// velocity에 가속도 적용
velocity.add(direction.multiplyScalar(YACHT_CONTROLS.acceleration));

// 부드러운 카메라 이동 (lerp)
cameraPositionRef.current.lerp(targetCameraPosition, smoothness);
```

---

## 현재 상태

### Git 상태
**브랜치**: master

**수정된 파일**:
- `.eslintrc.json` - ESLint 설정 수정
- `.gitignore` - Git 무시 규칙 수정
- `app/globals.css` - 전역 스타일 수정
- `app/layout.tsx` - 루트 레이아웃 수정
- `app/page.tsx` - YachtScene 컴포넌트 사용
- `next.config.js` - Next.js 설정 수정
- `package.json` - 의존성 목록 수정
- `tailwind.config.ts` - Tailwind 설정 수정
- `tsconfig.json` - TypeScript 설정 수정

**새로 추가된 파일**:
- `components/YachtScene.tsx` - 메인 3D 씬
- `components/ControllableYacht.tsx` - 제어 가능한 요트
- `components/ControlsUI.tsx` - 컨트롤 UI
- `components/CameraRig.tsx` - 3인칭 카메라
- `components/Ocean.tsx` - 바다 렌더링
- `controls/controls.ts` - 키보드 입력 제어

**삭제된 파일**:
- `app/fiber/` 디렉토리 (구 3D 페이지)

**최근 커밋**:
1. `0f9af18` - feat: 방향키 컨트롤 추가
2. `1773b44` - Update README.md
3. `f1d9aa3` - feat: react-three-fiber / drei
4. `b8053bc` - Initial commit from Create Next App

---

## 설정 파일 설명

### next.config.js
```javascript
transpilePackages: ["three"]
```
- Three.js 모듈을 브라우저 호환 가능하도록 트랜스파일
- `next-transpile-modules` 미들웨어 사용

### tsconfig.json
```json
{
  "target": "ES5",           // 최대 브라우저 호환성
  "strict": true,            // 엄격한 타입 체킹
  "jsx": "preserve",         // Next.js 처리용
  "paths": { "@/*": ["./*"] } // 루트 경로 alias
}
```

### tailwind.config.ts
- 콘텐츠 경로: `pages/**`, `components/**`, `app/**`
- 커스텀 그라데이션: radial, conic

### .eslintrc.json
```json
{
  "extends": "next/core-web-vitals"
}
```
- Next.js 권장 ESLint 규칙 적용

---

## 기술적 특징

### 장점
- 컴포넌트 기반 아키텍처로 관심사의 명확한 분리
- TypeScript를 통한 타입 안정성
- 현대적인 React 패턴 (forwardRef, useRef, useFrame 훅)
- 물리 기반 요트 시뮬레이션
- 부드러운 3인칭 카메라 추적 시스템
- 키보드 입력을 통한 인터랙티브 제어
- 반응형 디자인을 위한 Tailwind CSS
- SSR 친화적이면서 클라이언트 사이드 3D 렌더링

### 학습 포인트
- React Three Fiber의 실용적 사용법
- useFrame을 활용한 애니메이션 및 물리 시뮬레이션
- forwardRef를 사용한 컴포넌트 간 ref 전달
- 커스텀 훅을 통한 키보드 입력 처리
- Three.js 벡터 연산 (방향, quaternion, lerp)
- 3인칭 카메라 시스템 구현
- Next.js 14 App Router에서의 3D 통합

---

## 커스터마이징 가이드

### 요트 제어 조정 (`controls/controls.ts`)

```typescript
export const YACHT_CONTROLS = {
  rotationSpeed: 0.02,    // 회전 속도 증가/감소
  acceleration: 0.001,    // 가속도 증가/감소
  maxSpeed: 0.3,         // 최대 속도 제한
  friction: 0.98,        // 마찰력 (낮을수록 빠르게 멈춤)
  verticalSpeed: 2.0,    // 상승/하강 속도
};
```

### 카메라 위치 조정 (`components/YachtScene.tsx`)

```tsx
<CameraRig
  targetRef={yachtRef}
  offset={new THREE.Vector3(0, 8, -20)}  // [x, y, z]
  smoothness={0.05}                       // 0에 가까울수록 부드러움
/>
```

**오프셋 예시:**
- 더 멀리: `z: -30`
- 더 가까이: `z: -15`
- 더 높이: `y: 10`
- 더 낮게: `y: 5`

### 요트 초기 위치 및 회전 (`components/ControllableYacht.tsx`)

```tsx
useEffect(() => {
  if (yachtRef.current) {
    yachtRef.current.rotation.y = Math.PI;  // 회전 각도
    yachtRef.current.position.y = 2;        // 높이
  }
}, [ref]);
```

### 최소 높이 제한 수정 (`components/ControllableYacht.tsx:70-73`)

```tsx
if (yacht.position.y < 0) {  // 0을 다른 값으로 변경
  yacht.position.y = 0;
  velocity.y = 0;
}
```

---

## 향후 개발 방향

현재 프로젝트는 인터랙티브한 요트 시뮬레이션을 구현하고 있으며, 다음과 같은 확장이 가능합니다:

1. **물리 엔진 강화**
   - 파도의 영향 받는 요트 움직임
   - 바람 시스템 추가
   - 충돌 감지 시스템

2. **환경 개선**
   - 동적인 날씨 시스템 (비, 안개, 밤/낮)
   - 섬이나 장애물 추가
   - 수면 아래 해저 렌더링

3. **게임 메커닉스**
   - 체크포인트 레이싱
   - 속도계, 고도계 UI
   - 멀티플레이어 지원

4. **성능 최적화**
   - LOD(Level of Detail) 시스템
   - 오브젝트 풀링
   - 프러스텀 컬링

5. **UI/UX 개선**
   - 모바일 터치 컨트롤
   - 설정 메뉴 (카메라 거리, 민감도 조절)
   - 미니맵

6. **포스트 프로세싱**
   - 블룸 효과
   - 수면 반사
   - DOF(Depth of Field)

---

## 참고 자료

- [Next.js 공식 문서](https://nextjs.org/docs)
- [React Three Fiber 문서](https://docs.pmnd.rs/react-three-fiber)
- [Drei 컴포넌트](https://github.com/pmndrs/drei)
- [Three.js 공식 문서](https://threejs.org/docs)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)

---

## 라이센스

Private 프로젝트 - 개인 학습 및 포트폴리오 용도
