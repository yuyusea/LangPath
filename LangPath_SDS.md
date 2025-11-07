# Software Design Specification (SDS)

## LangPath - AI 기반 외국어 학습 컨설턴트 서비스

**Team Information:**
- Student ID: 21821469
- Name: 정창화
- E-mail: [이메일 주소]

---

## [ Revision History ]

| Revision date | Version # | Description | Author |
|--------------|-----------|-------------|---------|
| 11/07/2025 | 1.0 | Initial SDS document creation | 정창화 |

---

## = Contents =

1. Introduction
2. Use case analysis
3. Class diagram
4. Sequence diagram
5. State machine diagram
6. User interface prototype
7. Implementation requirements
8. Glossary
9. References

---

## = Authors for each section =

- Introduction – 정창화
- Use case analysis – 정창화
- Class diagram – 정창화
- Sequence diagram – 정창화
- State machine diagram – 정창화
- User interface prototype - 정창화
- Implementation requirements - 정창화
- Glossary - 정창화
- References - 정창화

---

## 1. Introduction

본 문서는 LangPath 외국어 학습 컨설턴트 서비스의 소프트웨어 설계 명세서(Software Design Specification)이다. LangPath는 AI 기반 맞춤형 학습 스케줄 생성과 진도 관리 기능을 제공하여 학습자가 목표를 달성할 수 있도록 돕는 개인 맞춤형 학습 플랫폼이다.

### 주요 설계 포인트

1. **7단계 온보딩 시스템**: 사용자의 언어, 수준, 목표, 기간, 학습시간, 방식, 약점을 체계적으로 수집하여 맞춤형 학습 계획 생성의 기반을 마련한다.

2. **AI 기반 스케줄 생성**: OpenAI API를 활용하여 사용자 프로필에 기반한 12주간의 상세한 학습 로드맵을 자동 생성한다.

3. **진도 관리 시스템**: 일일 과제 체크리스트, 연속 학습 일수 추적, 주간 캘린더를 통해 학습 동기를 유지하고 꾸준한 학습 습관 형성을 지원한다.

4. **데이터 영속성**: localStorage와 서버 데이터베이스를 결합하여 사용자 데이터의 안정적인 저장과 동기화를 보장한다.

5. **반응형 디자인**: 모바일과 데스크톱 환경 모두에서 최적화된 사용자 경험을 제공한다.

---

## 2. Use case analysis

### Use Case Diagram
[사용자]
|
|--- (1. 학습 프로필 생성)
|--- (2. AI 학습 계획 생성)
|--- (3. 오늘의 학습 조회)
|--- (4. 과제 완료 처리)
|--- (5. 전체 스케줄 조회)
|--- (6. 진행률 추적)
|--- (7. AI 챗봇 상담)
|--- (8. 프로필 관리)
|--- (9. 페이지 이동)



---

### Use case #1: 학습 프로필 생성

**GENERAL CHARACTERISTICS**

| 항목 | 내용 |
|-----|------|
| Summary | 사용자가 7단계 질문을 통해 맞춤형 학습 프로필을 생성한다 |
| Scope | LangPath - AI 기반 외국어 학습 컨설턴트 서비스 |
| Level | User level |
| Author | 정창화 |
| Last Update | 2025.11.07 |
| Status | Analysis (Finalize) |
| Primary Actor | 학습자 |
| Preconditions | 사용자가 LangPath 애플리케이션에 접속한 상태여야 한다 |
| Trigger | 사용자가 처음 LangPath를 사용하거나 학습 계획 재생성을 선택할 때 |
| Success Post Condition | 사용자의 학습 프로필이 생성되고 AI 학습 계획 생성이 시작된다 |
| Failed Post Condition | 프로필 생성이 실패하고 사용자는 온보딩 단계에 머무른다 |

**MAIN SUCCESS SCENARIO**

| Step | Action |
|------|--------|
| S | 사용자가 학습 프로필을 생성한다 |
| 1 | 이 Use case는 사용자가 온보딩을 시작할 때 시작된다 |
| 2 | 사용자는 학습하고자 하는 언어를 선택한다 (일본어, 영어, 중국어, 스페인어, 프랑스어, 기타) |
| 3 | 사용자는 현재 언어 수준을 선택한다 (완전 초보, 기본 문자 읽기 가능, 간단한 회화 가능, 중급) |
| 4 | 사용자는 학습 목표를 선택한다 (여행 회화, 업무 활용, 시험 합격, 원서/영상 이해) |
| 5 | 사용자는 목표 달성 기간을 선택한다 (1개월, 3개월, 6개월, 천천히) |
| 6 | 사용자는 하루 학습 가능 시간을 선택한다 (30분, 1시간, 2시간 이상) |
| 7 | 사용자는 선호하는 학습 방식을 선택한다 (문법 중심, 회화 중심, 듣기/독해 중심, 골고루) |
| 8 | 사용자는 가장 약한 부분을 선택한다 (듣기, 말하기, 읽기, 쓰기) |
| 9 | 시스템은 입력된 정보를 검증하고 저장한다 |
| 10 | 이 Use case는 프로필 생성이 완료되면 끝난다 |

**EXTENSION SCENARIOS**

| Step | Branching Action |
|------|------------------|
| 2-8 | a. 사용자가 필수 항목을 선택하지 않은 경우<br>...a1. "다음" 버튼이 비활성화된다<br>...a2. 해당 항목을 선택할 때까지 다음 단계로 진행할 수 없다 |
| 9 | b. 데이터 저장에 실패한 경우<br>...b1. 에러 메시지를 표시한다<br>...b2. 사용자에게 다시 시도하도록 안내한다 |

**RELATED INFORMATION**

| 항목 | 내용 |
|-----|------|
| Performance | ≤ 1 second per step |
| Frequency | 사용자당 평균 1-2회 (초기 생성 및 재생성) |
| Concurrency | 제한 없음 |
| Due Date | 2025.11.15 |

---

### Use case #2: AI 학습 계획 생성

**GENERAL CHARACTERISTICS**

| 항목 | 내용 |
|-----|------|
| Summary | OpenAI를 활용하여 사용자 맞춤형 12주 학습 스케줄을 생성한다 |
| Scope | LangPath - AI 기반 외국어 학습 컨설턴트 서비스 |
| Level | System level |
| Author | 정창화 |
| Last Update | 2025.11.07 |
| Status | Analysis (Finalize) |
| Primary Actor | 시스템 (OpenAI API) |
| Preconditions | 사용자의 학습 프로필이 완성된 상태여야 한다 |
| Trigger | 학습 프로필 생성이 완료되었을 때 |
| Success Post Condition | 12주간의 학습 계획이 생성되고 대시보드로 이동한다 |
| Failed Post Condition | AI 생성에 실패하고 개발용 mock 데이터를 제공한다 |

**MAIN SUCCESS SCENARIO**

| Step | Action |
|------|--------|
| S | 시스템이 AI 학습 계획을 생성한다 |
| 1 | 이 Use case는 학습 프로필 생성이 완료될 때 시작된다 |
| 2 | 시스템은 로딩 화면과 진행률 표시를 나타낸다 |
| 3 | 시스템은 사용자 프로필 정보를 기반으로 AI 프롬프트를 생성한다 |
| 4 | 시스템은 OpenAI API를 호출하여 12주간의 학습 계획을 생성한다 |
| 5 | 각 주차는 주간 목표와 일일 학습 과제로 구성된다 |
| 6 | 선택한 언어에 따라 특화된 학습 내용이 포함된다 |
| 7 | 생성된 학습 계획은 데이터베이스에 저장된다 |
| 8 | 시스템은 자동으로 대시보드로 이동한다 |
| 9 | 이 Use case는 대시보드 진입 시 끝난다 |

**EXTENSION SCENARIOS**

| Step | Branching Action |
|------|------------------|
| 4 | a. API 호출이 실패한 경우<br>...a1. retry 로직이 작동한다 (최대 3회)<br>...a2. 3회 실패 후에도 생성되지 않으면 개발용 mock 데이터를 제공한다<br>...a3. 사용자에게 "AI 생성에 실패하여 샘플 데이터를 제공합니다" 메시지를 표시한다 |
| 4 | b. API 응답 시간이 30초를 초과하는 경우<br>...b1. timeout 에러를 발생시킨다<br>...b2. retry 로직으로 이동한다 |

**RELATED INFORMATION**

| 항목 | 내용 |
|-----|------|
| Performance | ≤ 30 seconds |
| Frequency | 사용자당 평균 1-2회 |
| Concurrency | 동시 처리 가능 (API rate limit 내) |
| Due Date | 2025.11.15 |

---

### Use case #3: 과제 완료 처리

**GENERAL CHARACTERISTICS**

| 항목 | 내용 |
|-----|------|
| Summary | 사용자가 일일 과제를 완료 표시하고 진도를 저장한다 |
| Scope | LangPath - AI 기반 외국어 학습 컨설턴트 서비스 |
| Level | User level |
| Author | 정창화 |
| Last Update | 2025.11.07 |
| Status | Analysis (Finalize) |
| Primary Actor | 학습자 |
| Preconditions | 학습 계획이 생성되어 있어야 한다 |
| Trigger | 사용자가 과제 체크박스를 클릭할 때 |
| Success Post Condition | 과제 완료 상태가 저장되고 UI가 업데이트된다 |
| Failed Post Condition | 완료 상태가 저장되지 않고 이전 상태를 유지한다 |

**MAIN SUCCESS SCENARIO**

| Step | Action |
|------|--------|
| S | 사용자가 과제를 완료 처리한다 |
| 1 | 이 Use case는 사용자가 과제 체크박스를 클릭할 때 시작된다 |
| 2 | 시스템은 과제 완료 상태를 토글한다 (완료 ↔ 미완료) |
| 3 | 완료된 과제는 시각적으로 구분된다 (줄 그어짐, 회색 처리) |
| 4 | 시스템은 과제 완료 상태를 즉시 데이터베이스에 저장한다 |
| 5 | 하루의 모든 과제를 완료한 경우 자동으로 일일 완료 처리된다 |
| 6 | 일일 완료 시 해당 날짜가 완료 날짜 목록에 추가된다 |
| 7 | 연속 학습 일수가 1 증가한다 |
| 8 | 이 Use case는 저장이 완료되면 끝난다 |

**EXTENSION SCENARIOS**

| Step | Branching Action |
|------|------------------|
| 4 | a. 데이터베이스 저장에 실패한 경우<br>...a1. 로컬 스토리지에 임시 저장한다<br>...a2. 네트워크 연결 복구 시 자동으로 동기화를 시도한다 |
| 5 | b. 완료된 과제를 언체크하는 경우<br>...b1. 일일 완료 상태가 해제된다<br>...b2. 완료 날짜 목록에서 제거된다 (당일인 경우) |

**RELATED INFORMATION**

| 항목 | 내용 |
|-----|------|
| Performance | ≤ 500ms |
| Frequency | 사용자당 하루 평균 2-5회 |
| Concurrency | 제한 없음 |
| Due Date | 2025.11.15 |

---

## 3. Class diagram

### 주요 클래스 다이어그램
┌─────────────────────┐ │ UserProfile │ ├─────────────────────┤ │ - id: string │ │ - language: string │ │ - level: string │ │ - goal: string │ │ - duration: string │ │ - dailyTime: string │ │ - studyMethod: string│ │ - weakness: string │ │ - startDate: Date │ ├─────────────────────┤ │ + createProfile() │ │ + updateProfile() │ │ + getProfile() │ └─────────────────────┘ │ │ 1:1 ▼ ┌─────────────────────┐ │ LearningSchedule │ ├─────────────────────┤ │ - userId: string │ │ - weeks: Week[] │ ├─────────────────────┤ │ + generateSchedule()│ │ + getWeek(number) │ │ + getAllWeeks() │ └─────────────────────┘ │ │ 1:N ▼ ┌─────────────────────┐ │ Week │ ├─────────────────────┤ │ - weekNumber: number│ │ - theme: string │ │ - days: DailyTask[] │ ├─────────────────────┤ │ + getTasks() │ │ + getProgress() │ └─────────────────────┘ │ │ 1:N ▼ ┌─────────────────────┐ │ DailyTask │ ├─────────────────────┤ │ - day: string │ │ - tasks: Task[] │ ├─────────────────────┤ │ + addTask() │ │ + removeTask() │ │ + getTasks() │ └─────────────────────┘ │ │ 1:N ▼ ┌─────────────────────┐ │ Task │ ├─────────────────────┤ │ - id: string │ │ - title: string │ │ - details: string[] │ │ - duration: string │ │ - completed: boolean│ ├─────────────────────┤ │ + toggleComplete() │ │ + isCompleted() │ └─────────────────────┘

┌─────────────────────┐
│   UserProgress      │
├─────────────────────┤
│ - userId: string    │
│ - completedDates: Date[]│
│ - completedTasks: string[]│
│ - currentStreak: number│
├─────────────────────┤
│ + updateProgress()  │
│ + calculateStreak() │
│ + getWeeklyProgress()│
└─────────────────────┘



### 클래스 상세 설명

#### 1. UserProfile

| 속성 | 타입 | 설명 |
|-----|------|------|
| id | string | 사용자 고유 식별자 |
| language | string | 학습 언어 (일본어, 영어 등) |
| level | string | 현재 수준 |
| goal | string | 학습 목표 |
| duration | string | 목표 기간 |
| dailyTime | string | 일일 학습 시간 |
| studyMethod | string | 학습 방식 |
| weakness | string | 약점 |
| startDate | Date | 학습 시작일 |

| 메서드 | 반환 타입 | 설명 |
|-------|----------|------|
| createProfile() | void | 새로운 프로필 생성 |
| updateProfile() | void | 프로필 정보 수정 |
| getProfile() | UserProfile | 프로필 정보 조회 |

#### 2. LearningSchedule

| 속성 | 타입 | 설명 |
|-----|------|------|
| userId | string | 사용자 ID |
| weeks | Week[] | 12주 스케줄 배열 |

| 메서드 | 반환 타입 | 설명 |
|-------|----------|------|
| generateSchedule() | void | AI를 통한 스케줄 생성 |
| getWeek(number) | Week | 특정 주차 조회 |
| getAllWeeks() | Week[] | 전체 주차 조회 |

#### 3. Week

| 속성 | 타입 | 설명 |
|-----|------|------|
| weekNumber | number | 주차 번호 (1-12) |
| theme | string | 주간 목표 |
| days | DailyTask[] | 일일 과제 배열 |

| 메서드 | 반환 타입 | 설명 |
|-------|----------|------|
| getTasks() | Task[] | 해당 주의 모든 과제 조회 |
| getProgress() | number | 주간 진행률 계산 |

#### 4. DailyTask

| 속성 | 타입 | 설명 |
|-----|------|------|
| day | string | 요일 |
| tasks | Task[] | 과제 목록 |

| 메서드 | 반환 타입 | 설명 |
|-------|----------|------|
| addTask() | void | 과제 추가 |
| removeTask() | void | 과제 삭제 |
| getTasks() | Task[] | 과제 목록 조회 |

#### 5. Task

| 속성 | 타입 | 설명 |
|-----|------|------|
| id | string | 과제 고유 ID |
| title | string | 과제 제목 |
| details | string[] | 상세 내용 |
| duration | string | 예상 소요 시간 |
| completed | boolean | 완료 여부 |

| 메서드 | 반환 타입 | 설명 |
|-------|----------|------|
| toggleComplete() | void | 완료 상태 토글 |
| isCompleted() | boolean | 완료 여부 확인 |

#### 6. UserProgress

| 속성 | 타입 | 설명 |
|-----|------|------|
| userId | string | 사용자 ID |
| completedDates | Date[] | 완료한 날짜 목록 |
| completedTasks | string[] | 완료한 과제 ID 목록 |
| currentStreak | number | 연속 학습 일수 |

| 메서드 | 반환 타입 | 설명 |
|-------|----------|------|
| updateProgress() | void | 진행률 업데이트 |
| calculateStreak() | number | 연속 일수 계산 |
| getWeeklyProgress() | object | 주간 진행 상황 조회 |

---

## 4. Sequence diagram

### 4.1 학습 프로필 생성 및 AI 스케줄 생성 Sequence Diagram
사용자    →  OnboardingPage  →  ProfileService  →  AIService  →  Database
│              │                    │                 │            │
│─ 온보딩 시작 ─→│                    │                 │            │
│              │                    │                 │            │
│← 첫 번째 질문 ─│                    │                 │            │
│              │                    │                 │            │
│─ 답변 입력 ──→│                    │                 │            │
│              │─ 답변 검증 ────────→│                 │            │
│              │←─ 검증 완료 ────────│                 │            │
│              │                    │                 │            │
│← 다음 질문 ───│                    │                 │            │
│              │                    │                 │            │
│─ (7단계 반복)→│                    │                 │            │
│              │                    │                 │            │
│              │─ 프로필 저장 ──────→│                 │            │
│              │                    │─ DB 저장 ──────→│            │
│              │                    │←─ 저장 완료 ────│            │
│              │←─ 저장 성공 ────────│                 │            │
│              │                    │                 │            │
│← 로딩 화면 ───│                    │                 │            │
│              │                    │                 │            │
│              │─ AI 생성 요청 ────→│                 │            │
│              │                    │─ OpenAI API 호출 →│           │
│              │                    │                 │            │
│              │                    │←─ 학습 계획 응답 ─│           │
│              │                    │                 │            │
│              │                    │─ 스케줄 저장 ──────────────→│
│              │                    │←─ 저장 완료 ────────────────│
│              │←─ 생성 완료 ────────│                 │            │
│              │                    │                 │            │
│← 대시보드 이동 │                    │                 │            │



**설명:**
1. 사용자가 온보딩을 시작하면 7단계 질문이 순차적으로 제시된다
2. 각 답변은 ProfileService에서 검증된다
3. 모든 질문 완료 후 프로필이 Database에 저장된다
4. AIService가 OpenAI API를 호출하여 12주 학습 계획을 생성한다
5. 생성된 스케줄이 Database에 저장되고 사용자는 대시보드로 이동한다

---

### 4.2 과제 완료 처리 Sequence Diagram
사용자    →  Dashboard  →  TaskService  →  ProgressService  →  Database
│             │               │                 │               │
│─ 체크박스 클릭 →│               │                 │               │
│             │─ 과제 완료 ──→│                 │               │
│             │               │─ 상태 토글 ─────→│               │
│             │               │                 │─ 업데이트 ───→│
│             │               │                 │←─ 완료 ───────│
│             │               │                 │               │
│             │               │─ 일일 완료 체크 ─→│               │
│             │               │                 │               │
│             │               │                 │─ 연속일수 계산 │
│             │               │                 │               │
│             │               │←─ 진행률 업데이트 ─│               │
│             │               │                 │               │
│             │←─ UI 업데이트 ──│                 │               │
│             │               │                 │               │
│← 화면 갱신 ────│               │                 │               │



**설명:**
1. 사용자가 과제 체크박스를 클릭한다
2. TaskService가 과제 완료 상태를 토글한다
3. ProgressService가 진행률과 연속 학습 일수를 업데이트한다
4. 변경사항이 Database에 저장된다
5. UI가 실시간으로 갱신된다

---

### 4.3 전체 스케줄 조회 Sequence Diagram
사용자    →  SchedulePage  →  ScheduleService  →  Database
│              │                   │               │
│─ 스케줄 조회 ─→│                   │               │
│              │─ 데이터 요청 ─────→│               │
│              │                   │─ 조회 ───────→│
│              │                   │←─ 12주 데이터 ─│
│              │                   │               │
│              │←─ 스케줄 반환 ─────│               │
│              │                   │               │
│← 12주 표시 ────│                   │               │
│              │                   │               │
│─ 과제 체크 ────→│                   │               │
│              │─ 완료 처리 ───────→│               │
│              │                   │─ 업데이트 ───→│
│              │                   │←─ 완료 ───────│
│              │←─ 동기화 완료 ─────│               │
│              │                   │               │
│← 화면 갱신 ────│                   │               │



**설명:**
1. 사용자가 스케줄 페이지를 조회한다
2. ScheduleService가 Database에서 12주 학습 데이터를 가져온다
3. 사용자가 스케줄 페이지에서도 과제를 완료 처리할 수 있다
4. 대시보드와 스케줄 페이지는 실시간으로 동기화된다

---

## 5. State machine diagram

### 5.1 클라이언트 State Machine Diagram
[초기 상태]
│
▼
┌─────────────┐
│ Onboarding  │ ← 학습 계획 재생성
└─────────────┘
│ 프로필 생성 완료
▼
┌─────────────┐
│AI Generating│
└─────────────┘
│ 생성 완료
▼
┌─────────────┐        과제 완료
│  Dashboard  │ ◄────────────────┐
└─────────────┘                  │
│                            │
│ 페이지 이동                 │
├────────────┬───────────────┤
│            │               │
▼            ▼               ▼
┌─────────┐  ┌─────────┐  ┌─────────┐
│Schedule │  │Progress │  │ Chatbot │
└─────────┘  └─────────┘  └─────────┘
│            │               │
│            │               │
└────────────┴───────────────┘
│
▼
┌─────────┐
│ Profile │
└─────────┘



**상태 설명:**

1. **Onboarding**: 
   - 초기 진입 상태
   - 7단계 질문 진행
   - 모든 질문 완료 시 AI Generating으로 전환

2. **AI Generating**:
   - AI 학습 계획 생성 중
   - 로딩 화면 표시
   - 생성 완료 시 Dashboard로 전환

3. **Dashboard**:
   - 메인 학습 화면
   - 오늘의 과제 표시
   - 과제 완료 처리 가능
   - 다른 페이지로 이동 가능

4. **Schedule**:
   - 12주 전체 스케줄 조회
   - 과제 완료 처리 가능

5. **Progress**:
   - 진행률 추적
   - 연속 학습 일수 확인

6. **Chatbot**:
   - AI 학습 상담
   - 대화 히스토리 유지

7. **Profile**:
   - 학습 프로필 조회
   - 학습 계획 재생성 (Onboarding으로 이동)

---

### 5.2 서버 State Machine Diagram
[서버 시작]
│
▼
┌──────────┐
│  Idle    │ ← 요청 처리 완료
└──────────┘
│ 클라이언트 요청
▼
┌──────────┐
│Processing│
└──────────┘
│
├─ 프로필 저장 요청 ──→ [DB Write] ──→ [Idle]
│
├─ 스케줄 생성 요청 ──→ [AI API Call] ──→ [DB Write] ──→ [Idle]
│
├─ 데이터 조회 요청 ──→ [DB Read] ──→ [Idle]
│
├─ 과제 완료 요청 ───→ [DB Update] ──→ [Idle]
│
└─ 에러 발생 ────────→ [Error Handling] ──→ [Idle]

[DB Write/Read/Update]
│
├─ 성공 ──→ Response 전송
│
└─ 실패 ──→ [Retry] ──→ [Error Response]



**상태 설명:**

1. **Idle**:
   - 요청 대기 상태
   - 새로운 요청 수신 시 Processing으로 전환

2. **Processing**:
   - 요청 처리 중
   - 요청 타입에 따라 다른 처리 경로 선택

3. **DB Write**:
   - 데이터베이스 쓰기 작업
   - 프로필, 스케줄 저장

4. **DB Read**:
   - 데이터베이스 읽기 작업
   - 스케줄, 진행률 조회

5. **DB Update**:
   - 데이터베이스 업데이트 작업
   - 과제 완료 상태 변경

6. **AI API Call**:
   - OpenAI API 호출
   - 학습 계획 생성
   - Retry 로직 포함 (최대 3회)

7. **Error Handling**:
   - 에러 로깅
   - 클라이언트에 에러 응답 전송
   - Idle 상태로 복귀

---

## 6. User interface prototype

### 6.1 온보딩 화면 (1/7 단계)
┌─────────────────────────────────────┐
│  LangPath                      [X]  │
├─────────────────────────────────────┤
│                                     │
│       🌍 학습할 언어를 선택하세요      │
│                                     │
│   ┌──────┐  ┌──────┐  ┌──────┐    │
│   │ 🇯🇵   │  │ 🇺🇸   │  │ 🇨🇳   │    │
│   │일본어 │  │ 영어  │  │중국어 │    │
│   └──────┘  └──────┘  └──────┘    │
│                                     │
│   ┌──────┐  ┌──────┐  ┌──────┐    │
│   │ 🇪🇸   │  │ 🇫🇷   │  │ ✏️   │    │
│   │스페인어│  │프랑스어│  │ 기타  │    │
│   └──────┘  └──────┘  └──────┘    │
│                                     │
│             ━━━━━━━━━               │
│             1 / 7                   │
│                                     │
│  [이전]              [다음] (비활성) │
└─────────────────────────────────────┘



### 6.2 대시보드 (메인 화면)
┌─────────────────────────────────────┐
│  LangPath            🔥 0일     👤   │
├─────────────────────────────────────┤
│                                     │
│  📅 오늘의 학습 - 1주차 / 12주       │
│  ────────────────────────────────   │
│                                     │
│  □ 히라가나 あ행 익히기              │
│     • あ、い、う、え、お 읽고 쓰기  │
│     • 각 글자 10번씩 연습            │
│     ⏱️ 30분                         │
│                                     │
│  □ 기본 인사말 익히기                │
│     • おはよう、こんにちは          │
│     • 발음 연습 5회                 │
│     ⏱️ 20분                         │
│                                     │
│  완료: 0/2                          │
│                                     │
│  📊 이번 주 진행률                   │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│  월 화 수 목 금 토 일                │
│  ○ ○ ○ ○ ○ ○ ○                    │
│                                     │
├─────────────────────────────────────┤
│  [오늘] [스케줄] [챗봇] [진행률] [프로필] │
└─────────────────────────────────────┘



### 6.3 전체 스케줄 화면
┌─────────────────────────────────────┐
│  LangPath         📅 전체 스케줄     │
├─────────────────────────────────────┤
│                                     │
│  ▼ 1개월차: 일본어 기초 다지기       │
│  ─────────────────────────────────  │
│                                     │
│  ▶ 1주차: 히라가나 마스터하기        │
│     주간 목표: 히라가나 50음 완벽 습득│
│                                     │
│  ▶ 2주차: 가타카나 학습              │
│     주간 목표: 가타카나 기본 읽기    │
│                                     │
│  ▶ 3주차: 기본 문법 (1)              │
│     주간 목표: です/ます 문형 익히기 │
│                                     │
│  ▶ 4주차: 기본 문법 (2)              │
│     주간 목표: 조사 は/を/が 이해    │
│                                     │
│  ▼ 2개월차: 일상 회화 기본           │
│  ─────────────────────────────────  │
│                                     │
│  ▶ 5주차: 자기소개 표현              │
│  ...                                │
│                                     │
├─────────────────────────────────────┤
│  [오늘] [스케줄] [챗봇] [진행률] [프로필] │
└─────────────────────────────────────┘



### 6.4 진행률 화면
┌─────────────────────────────────────┐
│  LangPath         📊 진행률          │
├─────────────────────────────────────┤
│                                     │
│  🎯 전체 진행률                      │
│  ─────────────────────────────────  │
│                                     │
│      ╭───────╮                      │
│      │       │                      │
│      │  0%   │   1 / 12주          │
│      │       │                      │
│      ╰───────╯                      │
│                                     │
│  현재 주차 진행률                    │
│  ━━━━━━━━━━━━━━━━━━━━━ 0%          │
│                                     │
│  🔥 연속 학습: 0일                   │
│  ✅ 완료 과제: 0개                   │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  📅 이번 주 완료 현황                │
│     월 화 수 목 금 토 일             │
│     ○ ○ ○ ○ ○ ○ ○  (0/7일)        │
│                                     │
│  🏆 업적                            │
│  ─────────────────────────────────  │
│  ⭐ 첫 학습 완료    (미달성)         │
│  🔥 3일 연속       (미달성)         │
│  📚 일주일 완주    (미달성)         │
│                                     │
├─────────────────────────────────────┤
│  [오늘] [스케줄] [챗봇] [진행률] [프로필] │
└─────────────────────────────────────┘



### 6.5 AI 챗봇 화면
┌─────────────────────────────────────┐
│  LangPath         💬 학습 상담       │
├─────────────────────────────────────┤
│                                     │
│  🤖 안녕하세요! 일본어 학습 어시스턴트 │
│     입니다. 무엇을 도와드릴까요?     │
│                                     │
│  💡 샘플 질문:                       │
│  • 히라가나를 빨리 외우는 방법은?   │
│  • JLPT N5 준비 팁 알려주세요       │
│  • 오늘 학습이 너무 어려워요        │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  [대화 히스토리 영역]                │
│                                     │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  [메시지 입력...]            [전송]  │
│                                     │
├─────────────────────────────────────┤
│  [오늘] [스케줄] [챗봇] [진행률] [프로필] │
└─────────────────────────────────────┘



### 6.6 프로필 화면
┌─────────────────────────────────────┐
│  LangPath         👤 내 프로필       │
├─────────────────────────────────────┤
│                                     │
│  📚 학습 정보                        │
│  ─────────────────────────────────  │
│                                     │
│  학습 언어:     🇯🇵 일본어           │
│  현재 수준:     완전 초보            │
│  학습 목표:     시험 합격 (JLPT N3) │
│  목표 기간:     6개월               │
│  일일 학습:     1시간               │
│  학습 방식:     문법 중심 (체계적)  │
│  약점:         읽기                 │
│                                     │
│  시작일:       2025.11.07          │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  [학습 계획 재생성]                  │
│                                     │
│  ⚠️ 주의: 재생성 시 현재 진행률이    │
│     초기화됩니다.                   │
│                                     │
├─────────────────────────────────────┤
│  [오늘] [스케줄] [챗봇] [진행률] [프로필] │
└─────────────────────────────────────┘



---

## 7. Implementation requirements

### 7.1 개발 환경

**Frontend:**
- React 18.3
- TypeScript 5.x
- Vite 5.x (빌드 도구)
- Tailwind CSS 3.x
- Shadcn UI (컴포넌트 라이브러리)

**Backend:**
- Node.js 18.x 이상
- Express.js 4.x
- RESTful API 설계

**Database:**
- In-memory storage (localStorage)
- Server-side storage (JSON 파일 또는 간단한 DB)

**AI Integration:**
- OpenAI GPT-4 API
- Replit AI Integrations

**State Management:**
- TanStack Query (React Query) 5.x

**Routing:**
- Wouter 3.x

### 7.2 시스템 요구사항

**클라이언트:**
- 모던 웹 브라우저 (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- JavaScript 활성화 필수
- localStorage 지원 필수
- 최소 화면 해상도: 320px (모바일)

**서버:**
- Node.js 실행 환경
- 최소 512MB RAM
- 최소 1GB 저장 공간
- 인터넷 연결 (OpenAI API 통신)

### 7.3 배포 환경

**플랫폼:**
- Replit (개발 및 호스팅)
- 도메인: replit.app 서브도메인
- 포트: 5000

**환경 변수:**
OPENAI_API_KEY=<OpenAI API 키>
OPENAI_BASE_URL=<OpenAI API 엔드포인트>
NODE_ENV=production
PORT=5000



### 7.4 성능 요구사항

- 페이지 로드 시간: 2초 이내
- AI 스케줄 생성 시간: 30초 이내
- 과제 완료 저장: 즉시 (500ms 이내)
- API 응답 시간: 2초 이내

### 7.5 보안 요구사항

- API 키 환경변수 관리 (코드에 하드코딩 금지)
- HTTPS 통신
- 사용자 데이터 로컬 저장 (개인정보 최소화)
- XSS, CSRF 방어

### 7.6 호환성 요구사항

**브라우저:**
- Chrome/Edge: 최신 버전 -2
- Firefox: 최신 버전 -2
- Safari: 최신 버전 -2
- 모바일 브라우저 지원

**디바이스:**
- 데스크톱 (1024px 이상)
- 태블릿 (768px - 1023px)
- 모바일 (320px - 767px)

---

## 8. Glossary

| 용어 | 설명 |
|-----|------|
| AI 학습 계획 | OpenAI GPT-4를 활용하여 사용자 프로필 기반으로 생성된 12주간의 맞춤형 학습 로드맵 |
| 온보딩 | 사용자가 처음 서비스를 이용할 때 7단계 질문을 통해 학습 프로필을 수집하는 과정 |
| 학습 프로필 | 사용자의 학습 언어, 수준, 목표, 기간, 일일 학습 시간, 학습 방식, 약점 정보를 담은 데이터 |
| 일일 과제 | 각 날짜에 할당된 학습 과제 목록 (제목, 상세 내용, 예상 소요 시간 포함) |
| 연속 학습 일수 | 학습을 빠짐없이 연속으로 완료한 날짜 수 (Streak) |
| 주간 목표 | 각 주차별로 설정된 학습 목표 (예: "히라가나 마스터하기") |
| localStorage | 브라우저에 데이터를 저장하는 웹 스토리지 API |
| TanStack Query | React에서 서버 상태 관리를 위한 라이브러리 (이전 React Query) |
| Wouter | 경량 React 라우팅 라이브러리 |
| Shadcn UI | Tailwind CSS 기반의 재사용 가능한 UI 컴포넌트 라이브러리 |
| Mock 데이터 | AI API 실패 시 제공되는 개발용 샘플 학습 계획 데이터 |
| Retry 로직 | API 호출 실패 시 자동으로 재시도하는 로직 (최대 3회) |
| 업적 시스템 | 학습 성취를 시각화하는 기능 (첫 학습 완료, 3일 연속, 일주일 완주 등) |
| 반응형 디자인 | 다양한 화면 크기에 자동으로 적응하는 웹 디자인 |
| RESTful API | REST 아키텍처 스타일을 따르는 웹 API |

---

## 9. References

### 9.1 기술 문서

1. **OpenAI API Documentation**
   - URL: https://platform.openai.com/docs
   - 사용: AI 학습 계획 생성 API 연동

2. **React Documentation**
   - URL: https://react.dev
   - 사용: React 18.3 기반 프론트엔드 개발

3. **TanStack Query Documentation**
   - URL: https://tanstack.com/query
   - 사용: 서버 상태 관리 및 데이터 fetching

4. **Tailwind CSS Documentation**
   - URL: https://tailwindcss.com/docs
   - 사용: 스타일링 및 반응형 디자인

5. **Shadcn UI Components**
   - URL: https://ui.shadcn.com
   - 사용: UI 컴포넌트 라이브러리

6. **Wouter Documentation**
   - URL: https://github.com/molefrog/wouter
   - 사용: 경량 라우팅 시스템

### 9.2 디자인 참고

1. **FitFlow 운동 앱**
   - 사용: 일일 과제 체크리스트 UI/UX 참고

2. **Duolingo**
   - 사용: 학습 진행률 시스템 및 연속 학습 일수(Streak) 개념 참고

3. **Habitica**
   - 사용: 업적 시스템 및 게이미피케이션 요소 참고

### 9.3 학술 자료

1. **UML 다이어그램 표기법**
   - 참고: Software Engineering course materials
   - 사용: Use case, Class, Sequence, State machine diagram 작성

2. **소프트웨어 설계 방법론**
   - 참고: 영남대학교 소프트웨어공학 강의자료
   - 사용: SDS 문서 구조 및 작성 방법

---

**문서 버전**: 1.0  
**최종 수정일**: 2025-11-07  
**작성자**: 정창화 (21821469)
