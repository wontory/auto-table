# Auto Table

자동으로 시간표를 생성해주는 웹 애플리케이션입니다.

&nbsp;

## 주요 기능

- 수강할 과목 정보 입력
  - 과목명, 교수명, 학점 등 기본 정보 입력
  - 강의 시간 정보 추가
  - 여러 분반에 대한 정보 입력 가능
- 가능한 모든 시간표 조합 생성
  - 입력된 과목들의 모든 가능한 조합 계산
  - 시간 중복 없는 유효한 시간표만 생성
- 시간표 평가 및 최적화된 결과 제공
  - 공강 시간 최적화
  - 아침/저녁 시간대 선호도 반영
- 생성된 시간표 이미지로 저장
  - PNG 이미지 포맷으로 저장

&nbsp;

## 사용 방법

1. 과목 추가하기
   - "과목 추가" 버튼을 클릭하여 새로운 과목 추가
   - 과목명, 교수명, 학점 정보 입력
   - "강의 추가" 버튼으로 해당 과목의 강의 시간 및 강의실 정보 입력
   - 여러 분반이 있는 경우 추가 강의 정보 입력

2. 시간표 생성하기
   - 모든 과목 정보를 입력한 후 "시간표 생성" 버튼 클릭
   - 시스템이 자동으로 가능한 모든 조합을 계산하고 최적화

3. 결과 확인 및 저장
   - 생성된 시간표들을 평가 점수 순으로 확인
   - 마음에 드는 시간표 선택
   - "이미지로 저장" 버튼을 통해 시간표 저장

&nbsp;

## 기술 스택

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![daisyUI](https://img.shields.io/badge/daisyUI-5.0-5A0EF8?logo=daisyui)](https://daisyui.com/)
[![Jotai](https://img.shields.io/badge/Jotai-2.12-black?logo=react)](https://jotai.org/)
[![React Hook Form](https://img.shields.io/badge/React_Hook_Form-7.54-EC5990?logo=react)](https://react-hook-form.com/)
[![Zod](https://img.shields.io/badge/Zod-3.24-blue?logo=zod)](https://zod.dev/)

### 코드 품질

[![Biome](https://img.shields.io/badge/Biome-1.9-green?logo=biome)](https://biomejs.dev/)
[![Husky](https://img.shields.io/badge/Husky-9.1-yellow?logo=git)](https://typicode.github.io/husky/)
[![Commitlint](https://img.shields.io/badge/Commitlint-19.8-red?logo=commitlint)](https://commitlint.js.org/)

&nbsp;

## 시작하기

### 필수 조건

- [Bun](https://bun.sh) 1.1.20 이상

### 설치

```bash
# 패키지 설치
bun install
```

### 개발 서버 실행

```bash
bun dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하여 확인할 수 있습니다.

&nbsp;

## API

### POST /api/combine

시간표 조합을 생성하는 API입니다.

#### 요청

```typescript
type Subject = {
  id: string;
  title: string;
  professor: string;
  credit: number;
  lectures: {
    id: string;
    day: number;
    startTime: number;
    endTime: number;
  }[];
}

// Request Body: Subject[]
```

#### 응답

```typescript
type Timetable = {
  id: string;
  subjects: Subject[];
}

// Response Body: Timetable[]
```

&nbsp;

### POST /api/evaluate

생성된 시간표를 평가하는 API입니다.

#### 요청

```typescript
type Timetable = {
  id: string;
  subjects: Subject[];
}

// Request Body: Timetable[]
```

#### 응답

```typescript
type EvaluatedTimetable = Timetable & {
  score: number;
  // 공강 시간, 아침/저녁 시간대 등을 고려한 점수
}

// Response Body: EvaluatedTimetable[]
```

&nbsp;

## 스크립트

- `bun dev`: 개발 서버 실행
- `bun build`: 프로덕션용 빌드
- `bun start`: 프로덕션 서버 실행
- `bun check`: 코드 검사 및 포매팅
- `bun format`: 코드 포맷팅
- `bun lint`: 린트 검사

&nbsp;

## 라이선스

MIT
