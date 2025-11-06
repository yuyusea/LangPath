# LangPath - AI 외국어 학습 컨설턴트

## 프로젝트 개요
AI 기반 맞춤형 외국어 학습 스케줄을 제공하는 웹 애플리케이션입니다. 사용자가 7단계 질문에 답변하면 OpenAI가 12주 완성 학습 계획을 자동으로 생성합니다.

## 핵심 기능
1. **온보딩 채팅**: 7단계 질문을 통한 학습자 프로필 수집
2. **AI 스케줄 생성**: OpenAI를 활용한 맞춤형 12주 학습 계획 자동 생성
3. **일일 대시보드**: 오늘 할 학습 체크리스트 및 완료 추적
4. **진행률 시각화**: 주간/전체 진행률, 연속 학습일 표시
5. **주간 캘린더**: 월~일 학습 완료 여부 시각화
6. **동기부여**: 학습 완료 시 격려 메시지 및 업적 시스템

## 기술 스택
- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Express.js, Node.js
- **AI**: OpenAI GPT-5 (Replit AI Integrations)
- **Storage**: In-memory storage (MemStorage)
- **State Management**: TanStack Query (React Query)

## 프로젝트 구조
```
├── client/
│   └── src/
│       ├── components/      # 재사용 가능한 컴포넌트
│       │   ├── ProgressRing.tsx
│       │   ├── WeeklyCalendar.tsx
│       │   ├── TaskCard.tsx
│       │   ├── BottomNav.tsx
│       │   ├── TopNav.tsx
│       │   ├── QuestionStep.tsx
│       │   └── MotivationalMessage.tsx
│       ├── pages/           # 페이지 컴포넌트
│       │   ├── onboarding.tsx
│       │   ├── dashboard.tsx
│       │   ├── schedule.tsx
│       │   ├── progress.tsx
│       │   └── profile.tsx
│       └── hooks/
│           └── useUserProfile.ts
├── server/
│   ├── openai.ts           # OpenAI 통합
│   ├── routes.ts           # API 라우트
│   └── storage.ts          # 데이터 저장소
└── shared/
    └── schema.ts           # 공유 타입 정의
```

## API 엔드포인트
- `POST /api/profile` - 프로필 생성 및 AI 스케줄 생성
- `GET /api/schedule/:profileId` - 학습 스케줄 조회
- `GET /api/progress/:profileId` - 진행 상태 조회
- `GET /api/today/:profileId` - 오늘 할 학습 조회
- `POST /api/progress/complete` - 일일 학습 완료 처리
- `GET /api/profile/:id` - 프로필 조회

## 데이터 모델
1. **UserProfile**: 사용자 학습 프로필 (언어, 수준, 목표 등)
2. **LearningSchedule**: AI 생성 12주 학습 스케줄
3. **UserProgress**: 학습 진행 상황 (완료일, 연속 학습일 등)

## 사용자 플로우
1. 온보딩: 7단계 질문 답변
2. AI가 맞춤형 12주 학습 계획 생성 (30초-1분 소요)
3. 대시보드에서 오늘 할 학습 확인
4. 학습 완료 후 체크
5. 진행률 및 스케줄 확인

## 최근 변경사항
- 2025-01-06: MVP 개발 완료
  - 전체 프론트엔드 컴포넌트 구축 (디자인 가이드라인 준수)
  - OpenAI 통합 백엔드 API 구현
  - 프론트엔드-백엔드 통합 완료
  - 사용자 세션 관리 (localStorage)
  - 에러 핸들링 및 로딩 상태 추가

## 환경 변수
- `AI_INTEGRATIONS_OPENAI_BASE_URL`: OpenAI API Base URL (자동 설정)
- `AI_INTEGRATIONS_OPENAI_API_KEY`: OpenAI API Key (자동 설정)
- `SESSION_SECRET`: 세션 암호화 키

## 개발 가이드
- 프론트엔드 디자인은 `design_guidelines.md` 참조
- Inter 폰트 사용, 깔끔하고 친근한 UI
- 모바일 우선 반응형 디자인
- 모든 인터랙티브 요소에 data-testid 속성 추가

## 실행 방법
```bash
npm run dev
```
애플리케이션이 포트 5000에서 실행됩니다.
