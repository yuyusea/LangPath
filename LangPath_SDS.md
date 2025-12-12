# Software Design Specification (SDS)

## LangPath - AI 기반 외국어 학습 컨설턴트 서비스

**Team Information:**
- Student ID: 21821469
- Name: 정창화
- E-mail: [wkdghkwjd07@yu.ac.kr]

---

## [ Revision History ]

 Revision date | Version # | Description | Author |
|--------------|-----------|-------------|---------|
| 11/07/2025 | 1.0 | Initial SDS document creation | 정창화 |
| 12/12/2025 | 1.1 | Added Use case #4, #5, #6 (교재 기반 학습, 스케줄 수정, AI 챗봇 상담), Added TextbookSchedule and ChatMessage classes | 정창화 |

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

4. **AI 학습 챗봇**: 실시간으로 학습 관련 질문에 답변하고 개인 맞춤형 학습 조언을 제공하여 학습 과정을 지원한다.

5. **데이터 영속성**: localStorage와 서버 데이터베이스를 결합하여 사용자 데이터의 안정적인 저장과 동기화를 보장한다.

6. **반응형 디자인**: 모바일과 데스크톱 환경 모두에서 최적화된 사용자 경험을 제공한다.

---

## 2. Use case analysis

### Use Case Diagram
[사용자]
- 1. 학습 프로필 생성
- 2. AI 학습 계획 생성
- 3. 오늘의 학습 조회
- 4. 과제 완료 처리
- 5. 전체 스케줄 조회
- 6. 진행률 추적
- 7. AI 챗봇 상담
- 8. 프로필 관리
- 9. 페이지 이동

![langpath-usecase-diagram](https://github.com/user-attachments/assets/aab5a305-f165-4828-a447-bfb621d968ff)# Software Design Specification (SDS)

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

### Use case #4: 교재 기반 학습

**GENERAL CHARACTERISTICS**

| 항목 | 내용 |
|-----|------|
| Summary | 사용자가 보유한 교재 정보를 입력하여 맞춤형 학습 계획을 생성한다 |
| Scope | LangPath - AI 기반 외국어 학습 컨설턴트 서비스 |
| Level | User level |
| Author | 정창화 |
| Last Update | 2025.12.12 |
| Status | Analysis (Finalize) |
| Primary Actor | 학습자 |
| Preconditions | 사용자가 LangPath 애플리케이션에 접속한 상태여야 한다 |
| Trigger | 사용자가 교재 기반 학습을 선택할 때 |
| Success Post Condition | 교재 목차 기반의 학습 계획이 생성되고 대시보드로 이동한다 |
| Failed Post Condition | 생성이 실패하고 사용자에게 재시도 안내가 표시된다 |

**MAIN SUCCESS SCENARIO**

| Step | Action |
|------|--------|
| S | 사용자가 교재 기반 학습 계획을 생성한다 |
| 1 | 이 Use case는 사용자가 교재 기반 학습을 선택할 때 시작된다 |
| 2 | 사용자는 교재 제목을 입력한다 (예: "민나노 니홍고 1") |
| 3 | 사용자는 학습 언어를 선택한다 |
| 4 | 사용자는 교재 목차를 입력한다 (예: "1과 인사, 2과 자기소개") |
| 5 | 사용자는 일일 학습 시간을 설정한다 |
| 6 | 사용자는 목표 기간을 설정한다 |
| 7 | 시스템은 AI를 통해 교재 목차 기반 스케줄을 생성한다 |
| 8 | 생성된 학습 계획은 데이터베이스에 저장된다 |
| 9 | 시스템은 자동으로 대시보드로 이동한다 |
| 10 | 이 Use case는 대시보드 진입 시 끝난다 |

**EXTENSION SCENARIOS**

| Step | Branching Action |
|------|------------------|
| 2-4 | a. 필수 입력 항목이 비어있는 경우<br>...a1. "다음" 버튼이 비활성화된다<br>...a2. 해당 항목을 입력할 때까지 다음 단계로 진행할 수 없다 |
| 7 | b. AI 생성이 실패한 경우<br>...b1. 에러 메시지를 표시한다<br>...b2. 사용자에게 다시 시도하도록 안내한다 |

**RELATED INFORMATION**

| 항목 | 내용 |
|-----|------|
| Performance | ≤ 30 seconds |
| Frequency | 사용자당 평균 1-2회 |
| Concurrency | 동시 처리 가능 (API rate limit 내) |
| Due Date | 2025.12.15 |

---

### Use case #5: 스케줄 수정

**GENERAL CHARACTERISTICS**

| 항목 | 내용 |
|-----|------|
| Summary | 사용자가 생성된 과제의 내용을 직접 수정한다 |
| Scope | LangPath - AI 기반 외국어 학습 컨설턴트 서비스 |
| Level | User level |
| Author | 정창화 |
| Last Update | 2025.12.12 |
| Status | Analysis (Finalize) |
| Primary Actor | 학습자 |
| Preconditions | 학습 계획이 생성되어 있어야 한다 |
| Trigger | 사용자가 과제 수정을 선택할 때 |
| Success Post Condition | 과제 내용이 수정되고 저장된다 |
| Failed Post Condition | 수정 내용이 저장되지 않고 이전 상태를 유지한다 |

**MAIN SUCCESS SCENARIO**

| Step | Action |
|------|--------|
| S | 사용자가 과제 내용을 수정한다 |
| 1 | 이 Use case는 사용자가 과제 수정 버튼을 클릭할 때 시작된다 |
| 2 | 시스템은 수정 가능한 입력 필드를 표시한다 |
| 3 | 사용자는 과제 제목을 수정할 수 있다 |
| 4 | 사용자는 과제 설명을 수정할 수 있다 |
| 5 | 사용자는 예상 소요 시간을 수정할 수 있다 |
| 6 | 사용자가 저장 버튼을 클릭한다 |
| 7 | 시스템은 수정 내용을 즉시 데이터베이스에 저장한다 |
| 8 | 이 Use case는 저장이 완료되면 끝난다 |

**EXTENSION SCENARIOS**

| Step | Branching Action |
|------|------------------|
| 3-5 | a. 필수 입력 항목이 비어있는 경우<br>...a1. 저장 버튼이 비활성화된다<br>...a2. 빈 필드에 에러 표시가 나타난다 |
| 7 | b. 데이터베이스 저장에 실패한 경우<br>...b1. 에러 메시지를 표시한다<br>...b2. 수정 전 상태를 유지한다 |

**RELATED INFORMATION**

| 항목 | 내용 |
|-----|------|
| Performance | ≤ 500ms |
| Frequency | 사용자당 평균 0-5회 |
| Concurrency | 제한 없음 |
| Due Date | 2025.12.15 |

---

### Use case #6: AI 챗봇 상담

**GENERAL CHARACTERISTICS**

| 항목 | 내용 |
|-----|------|
| Summary | AI 기반 학습 어시스턴트가 사용자의 질문에 답변한다 |
| Scope | LangPath - AI 기반 외국어 학습 컨설턴트 서비스 |
| Level | User level |
| Author | 정창화 |
| Last Update | 2025.12.12 |
| Status | Analysis (Finalize) |
| Primary Actor | 학습자 |
| Preconditions | 학습 프로필이 생성되어 있어야 한다 |
| Trigger | 사용자가 챗봇 페이지에서 메시지를 전송할 때 |
| Success Post Condition | AI가 사용자 질문에 맞춤형 답변을 제공한다 |
| Failed Post Condition | 에러 메시지가 표시되고 재시도를 안내한다 |

**MAIN SUCCESS SCENARIO**

| Step | Action |
|------|--------|
| S | 사용자가 AI 챗봇에게 질문한다 |
| 1 | 이 Use case는 사용자가 챗봇 페이지에 진입할 때 시작된다 |
| 2 | 시스템은 초기 인사 메시지와 샘플 질문을 표시한다 |
| 3 | 사용자는 입력창에 질문을 입력하거나 샘플 질문을 클릭한다 |
| 4 | 시스템은 로딩 인디케이터를 표시한다 |
| 5 | 시스템은 사용자 프로필을 고려하여 OpenAI API를 호출한다 |
| 6 | AI 응답이 대화창에 표시된다 |
| 7 | 대화 히스토리가 유지된다 |
| 8 | 이 Use case는 사용자가 페이지를 떠나면 끝난다 |

**EXTENSION SCENARIOS**

| Step | Branching Action |
|------|------------------|
| 3 | a. 입력창이 비어있는 경우<br>...a1. 전송 버튼이 비활성화된다 |
| 3 | b. 메시지가 500자를 초과하는 경우<br>...b1. 경고 메시지가 표시된다<br>...b2. 전송 버튼이 비활성화된다 |
| 5 | c. API 호출이 실패한 경우<br>...c1. "죄송합니다, 다시 시도해주세요" 메시지가 표시된다 |

**RELATED INFORMATION**

| 항목 | 내용 |
|-----|------|
| Performance | ≤ 10 seconds |
| Frequency | 사용자당 하루 평균 3-10회 |
| Concurrency | 동시 처리 가능 (API rate limit 내) |
| Due Date | 2025.12.15 |

---

## 3. Class diagram

### 주요 클래스 다이어그램

![langpath-class-diagram](https://github.com/user-attachments/assets/1a58f06d-c3d4-4fb3-a253-d8823e81064e)## LangPath - AI 기반 외국어 학습 컨설턴트 서비스


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

#### 7. TextbookSchedule

| 속성 | 타입 | 설명 |
|-----|------|------|
| textbookTitle | string | 교재 제목 |
| language | string | 학습 언어 |
| tableOfContents | string | 교재 목차 |
| dailyTime | string | 일일 학습 시간 |
| duration | string | 목표 기간 |

| 메서드 | 반환 타입 | 설명 |
|-------|----------|------|
| generateFromTextbook() | LearningSchedule | 교재 기반 스케줄 생성 |

#### 8. ChatMessage

| 속성 | 타입 | 설명 |
|-----|------|------|
| id | string | 메시지 고유 ID |
| role | string | 역할 (user / assistant) |
| content | string | 메시지 내용 |
| timestamp | Date | 전송 시간 |

| 메서드 | 반환 타입 | 설명 |
|-------|----------|------|
| send() | void | 메시지 전송 |
| getHistory() | ChatMessage[] | 대화 히스토리 조회 |

---

## 4. Sequence diagram

### 4.1 학습 프로필 생성 및 AI 스케줄 생성 Sequence Diagram
사용자    →  OnboardingPage  →  ProfileService  →  AIService  →  Database

![langpath-sequence-diagram](https://github.com/user-attachments/assets/35966b77-3b99-46d0-8573-e97b66e6bfa5)

**설명:**
1. 사용자가 온보딩을 시작하면 7단계 질문이 순차적으로 제시된다
2. 각 답변은 ProfileService에서 검증된다
3. 모든 질문 완료 후 프로필이 Database에 저장된다
4. AIService가 OpenAI API를 호출하여 12주 학습 계획을 생성한다
5. 생성된 스케줄이 Database에 저장되고 사용자는 대시보드로 이동한다

---

### 4.2 과제 완료 처리 Sequence Diagram
사용자    →  Dashboard  →  TaskService  →  ProgressService  →  Database

![langpath-sequence-task-completion](https://github.com/user-attachments/assets/e42b729c-1592-4b06-8827-3eb7ed0ec903)

**설명:**
1. 사용자가 과제 체크박스를 클릭한다
2. TaskService가 과제 완료 상태를 토글한다
3. ProgressService가 진행률과 연속 학습 일수를 업데이트한다
4. 변경사항이 Database에 저장된다
5. UI가 실시간으로 갱신된다

---

### 4.3 전체 스케줄 조회 Sequence Diagram
사용자    →  SchedulePage  →  ScheduleService  →  Database

![langpath-sequence-schedule](https://github.com/user-attachments/assets/186fb6c1-ef95-4298-8098-ea0e2211599d)

**설명:**
1. 사용자가 스케줄 페이지를 조회한다
2. ScheduleService가 Database에서 12주 학습 데이터를 가져온다
3. 사용자가 스케줄 페이지에서도 과제를 완료 처리할 수 있다
4. 대시보드와 스케줄 페이지는 실시간으로 동기화된다

---

## 5. State machine diagram

### 5.1 클라이언트 State Machine Diagram

![langpath-state-machine](https://github.com/user-attachments/assets/7f145cd8-be1e-463d-843b-162aab47a24d)

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

![langpath-state-machine-server](https://github.com/user-attachments/assets/47b76850-fe88-40a7-964c-9ccc66c9c365)

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

본 섹션에서는 LangPath 서비스의 주요 화면에 대한 UI 명세를 제시한다. 각 화면의 구성 요소, 배치, 인터랙션을 상세히 기술한다.

---

### 6.1 온보딩 화면 (1/7 단계 - 언어 선택)

<img width="780" height="500" alt="온보딩 화면 (1_7 단계 - 언어 선택)" src="https://github.com/user-attachments/assets/75246999-2c37-4953-81df-e46217b5301d" />

**화면 설명:**  
사용자가 학습하고자 하는 외국어를 선택하는 첫 번째 온보딩 화면이다.

#### 화면 구성

**상단:**
- LangPath 로고 (파란색 아이콘 + 텍스트)
- 진행률 바 (14.3%)

**중앙:**
- 진행 표시: "질문 1/7"
- 타이틀: "어떤 언어를 공부하고 싶으세요?"
- 언어 선택 카드 6개 (2행 3열):
  - JP 일본어 / US 영어
  - CN 중국어 / ES 스페인어
  - FR 프랑스어 / 🌐 기타

**하단:**
- "← 이전 질문" 버튼 (1단계에서는 표시만)

#### 인터랙션

1. 언어 카드 클릭 시 선택 상태로 변경 (파란색 테두리)
2. 선택 완료 시 자동으로 다음 단계로 전환

---

### 6.2 온보딩 화면 (2/7 단계 - 현재 수준)

<img width="780" height="450" alt="온보딩 화면 (2_7 단계 - 현재 수준)" src="https://github.com/user-attachments/assets/0da2298f-2ea2-4f80-bbeb-847ef672c3d7" />

**화면 설명:**  
현재 언어 수준을 선택하는 화면이다.

#### 화면 구성

**상단:**
- LangPath 로고
- 진행률 바 (28.6%)

**중앙:**
- 진행 표시: "질문 2/7"
- 타이틀: "현재 수준이 어떻게 되나요?"
- 수준 선택 카드 4개 (2행 2열):
  - 완전 초보 / 기본 문자 읽기 가능
  - 간단한 회화 가능 / 중급 (시험 준비 중)

**하단:**
- "← 이전 질문" 버튼

#### 인터랙션

1. 수준 카드 클릭 시 선택
2. 선택 완료 시 다음 단계로 전환

---

### 6.3 온보딩 화면 (3/7 단계 - 학습 목표)

<img width="780" height="450" alt="온보딩 화면 (3_7 단계 - 학습 목표)" src="https://github.com/user-attachments/assets/03579877-d9a4-48e9-9c05-77649767af31" />

**화면 설명:**  
학습 목표를 선택하는 화면이다.

#### 화면 구성

**상단:**
- LangPath 로고
- 진행률 바 (42.9%)

**중앙:**
- 진행 표시: "질문 3/7"
- 타이틀: "최종 목표가 뭔가요?"
- 목표 선택 카드 4개 (2행 2열):
  - 여행 회화 / 업무 활용
  - 시험 합격 (JLPT N3 등) / 원서/영상 이해

**하단:**
- "← 이전 질문" 버튼

#### 인터랙션

1. 목표 카드 클릭 시 선택
2. 선택 완료 시 다음 단계로 전환

---

### 6.4 온보딩 화면 (4/7 단계 - 목표 기간)

<img width="765" height="450" alt="6 4 온보딩 화면 (4_7 단계 - 목표 기간)" src="https://github.com/user-attachments/assets/ffce6708-bc30-427d-a005-6e52745e446c" />

**화면 설명:**  
목표 달성 기간을 선택하는 화면이다.

#### 화면 구성

**상단:**
- LangPath 로고
- 진행률 바 (57.1%)

**중앙:**
- 진행 표시: "질문 4/7"
- 타이틀: "언제까지 목표를 달성하고 싶으세요?"
- 기간 선택 카드 4개 (2행 2열):
  - 1개월 / 3개월 (선택 예시)
  - 6개월 / 천천히

**하단:**
- "← 이전 질문" 버튼

#### 인터랙션

1. 기간 카드 클릭 시 선택 (파란색 배경으로 강조)
2. 선택 완료 시 다음 단계로 전환

---

### 6.5 온보딩 화면 (5/7 단계 - 일일 학습 시간)

<img width="780" height="430" alt="온보딩 화면 (5_7 단계 일일 학습 시간)" src="https://github.com/user-attachments/assets/9e2e9fee-d0e5-462e-a3e0-a49bca86fe9f" />

**화면 설명:**  
하루 학습 가능 시간을 선택하는 화면이다.

#### 화면 구성

**상단:**
- LangPath 로고
- 진행률 바 (71.4%)

**중앙:**
- 진행 표시: "질문 5/7"
- 타이틀: "하루에 몇 시간 공부 가능한가요?"
- 시간 선택 카드 3개:
  - 30분 / 1시간 (1행 2열)
  - 2시간 이상 (2행)

**하단:**
- "← 이전 질문" 버튼

#### 인터랙션

1. 시간 카드 클릭 시 선택
2. 선택 완료 시 다음 단계로 전환

---

### 6.6 온보딩 화면 (6/7 단계 - 학습 방식)

<img width="755" height="450" alt="온보딩 화면 (6_7 단계 학습 방식)" src="https://github.com/user-attachments/assets/96a99acd-b23d-403a-a907-90291cc9a82c" />

**화면 설명:**  
선호하는 학습 방식을 선택하는 화면이다.

#### 화면 구성

**상단:**
- LangPath 로고
- 진행률 바 (85.7%)

**중앙:**
- 진행 표시: "질문 6/7"
- 타이틀: "어떤 방식으로 공부하고 싶으세요?"
- 방식 선택 카드 4개 (2행 2열):
  - 문법 중심 (체계적) / 회화 중심 (실용적)
  - 듣기/독해 중심 / 골고루

**하단:**
- "← 이전 질문" 버튼

#### 인터랙션

1. 방식 카드 클릭 시 선택
2. 선택 완료 시 다음 단계로 전환

---

### 6.7 온보딩 화면 (7/7 단계 - 약점)

**화면 설명:**  
사용자의 가장 약한 부분을 선택하는 마지막 온보딩 화면이다.

<img width="780" height="450" alt="온보딩 화면 (7_7 단계 약점)" src="https://github.com/user-attachments/assets/a886194e-61fa-4f86-a80b-ca961764f8d0" />

**화면 설명:**  
가장 약한 부분을 선택하는 마지막 온보딩 화면이다.

#### 화면 구성

**상단:**
- LangPath 로고
- 진행률 바 (100%)

**중앙:**
- 진행 표시: "질문 7/7"
- 타이틀: "가장 약한 부분이 뭔가요?"
- 약점 선택 카드 4개 (2행 2열):
  - 듣기 / 말하기
  - 읽기 / 쓰기

**하단:**
- "← 이전 질문" 버튼

#### 인터랙션

1. 약점 카드 클릭 시 선택
2. 선택 완료 시 프로필 저장 및 AI 생성 로딩 화면으로 전환

---

### 6.8 AI 생성 로딩 화면

<img width="630" height="350" alt="AI 생성 로딩 화면" src="https://github.com/user-attachments/assets/769efb17-b45f-4999-9943-310deec73240" />

#### 화면 구성

**중앙:**
- 로딩 스피너 (파란색 원형 애니메이션)
- 메시지: "🤖 AI가 맞춤형 학습 계획을 생성하고 있습니다..."
- 서브 메시지: "잠시만 기다려주세요"
- 진행률 바 (애니메이션)

#### 인터랙션

1. OpenAI API 호출하여 12주 학습 계획 생성 (최대 30초)
2. 생성 완료 시 "✅ 완료!" 메시지 표시 후 대시보드로 이동
3. 실패 시 재시도 (최대 3회), 3회 실패 후 샘플 데이터 사용

---

### 6.9 대시보드 (메인 화면)

<img width="888" height="755" alt="대시보드 (메인 화면)" src="https://github.com/user-attachments/assets/3a535e27-d3a9-414e-bac8-eed4cddf9014" />

**화면 설명:**  
일일 학습 과제를 수행하는 메인 화면이다.

#### 화면 구성

**상단 헤더:**
- 좌측: LangPath 로고
- 중앙: 연속 학습 일수 표시 (🔥 0일)
- 우측: 프로필 아이콘

**오늘의 학습 섹션:**
- 제목: "📅 오늘의 학습 - 1주차 / 12주"
- 과제 카드 리스트:
  - 체크박스 + 과제 제목 + 상세 내용 + 예상 소요 시간
  - 예시: "영어 알파벳과 발음 / A-M 발음 연습, 모음 발음 차이 학습 / 20분"
- 완료 카운트: "0/2 완료"
- "모두 완료" 버튼 (우측 상단)

**오늘 진행률 섹션:**
- 원형 진행률 그래프 (0%)
- "완료율" 텍스트

**주간 캘린더 섹션:**
- 제목: "이번 주 한눈에 보기"
- 요일 표시: 월 화 수 목 금 토 일
- 완료 상태: 회색 원(미완료), 파란색 원(완료)

**학습 통계:**
- 연속 학습: 0일
- 총 학습 완료: 0개

**하단 네비게이션:**
- 오늘 / 스케줄 / 챗봇 / 진행률 / 프로필 (5개 탭)

#### 인터랙션

1. **체크박스 클릭:** 과제 완료/취소 토글, 완료 시 줄 그어짐 효과
2. **모든 과제 완료:** "오늘도 화이팅! 🎉" 메시지 표시, 연속 학습 일수 증가
3. **탭 클릭:** 해당 페이지로 전환

---

### 6.10 전체 스케줄 화면

<img width="892" height="761" alt="전체 스케줄 화면" src="https://github.com/user-attachments/assets/01eadd89-baf7-4943-a647-cd3fc7f38b24" />

**화면 설명:**  
12주간의 전체 학습 계획을 조회하는 화면이다.

#### 화면 구성

**상단 헤더:**
- 좌측: LangPath 로고
- 중앙: "📅 스케줄" 타이틀
- 우측: 프로필 아이콘

**메인 컨텐츠:**

**월별 아코디언 (1~3개월차):**
- 헤더: "1개월차: 기초 다지기" (예시)
- 펼침/접힘 아이콘: ▼ / ▶
- 배경: 연한 파란색

**주차별 아코디언 (각 월 내 1~4주차):**
- 헤더: "1주차: [주제명]"
- 부제: "주간 목표: [목표 설명]"
- 펼침 시: 일일 과제 목록 표시 (대시보드와 동일 구조)

**하단 네비게이션:**
- 스케줄 탭 활성화

#### 인터랙션

1. **월 헤더 클릭:** 주차 목록 펼침/접힘, 아이콘 변경
2. **주차 헤더 클릭:** 일일 과제 펼침/접힘
3. **과제 체크:** 대시보드와 실시간 동기화

---

### 6.11 진행률 화면

<img width="898" height="944" alt="진행률 화면" src="https://github.com/user-attachments/assets/61eb122a-8c16-4a04-965f-dfb0029e0050" />

**화면 설명:**  
전체 학습 진행 상황을 확인하는 화면이다.

#### 화면 구성

**상단 헤더:**
- 좌측: LangPath 로고
- 중앙: "📊 진행률" 타이틀
- 우측: 프로필 아이콘

**전체 진행률:**
- 원형 진행률 그래프 (중앙 "0%", 하단 "1/12주")

**현재 주차 진행률:**
- 프로그레스 바 (0%)

**학습 통계 카드 (2열):**
- 연속 학습: 🔥 0일
- 완료 과제: ✅ 0개

**주간 완료 현황:**
- 요일별 완료 상태 (월~일)
- 완료 일수 표시 (0/7일)

**업적 섹션:**
- 업적 카드 리스트:
  - ⭐ 첫 학습 완료 (미달성)
  - 🔥 3일 연속 (미달성)
  - 📚 일주일 완주 (미달성)
  - 🎯 한 달 달성 (미달성)
- 달성 시 아이콘과 텍스트 파란색으로 변경

**하단 네비게이션:**
- 진행률 탭 활성화

#### 인터랙션

1. **실시간 업데이트:** 과제 완료 시 모든 진행률 자동 갱신
2. **업적 달성:** "🎉 업적 달성!" 팝업 표시

---

### 6.12 AI 챗봇 화면

<img width="887" height="756" alt="AI 챗봇 화면" src="https://github.com/user-attachments/assets/614d08bb-22dd-456d-892b-a91e83ea7fb5" />

**화면 설명:**  
학습 관련 질문에 AI가 답변하는 화면이다.

#### 화면 구성

**상단 헤더:**
- 좌측: LangPath 로고
- 중앙: "💬 챗봇" 타이틀
- 우측: 프로필 아이콘

**초기 화면:**
- 인사 메시지: "안녕하세요! 학습 어시스턴트입니다."
- 샘플 질문 버튼 3개:
  - "학습 방법 추천해주세요"
  - "오늘 학습이 어려워요"
  - "시험 준비 팁 알려주세요"

**대화 영역:**
- 사용자 메시지: 우측 정렬, 파란색 말풍선
- AI 응답: 좌측 정렬, 흰색 말풍선
- 로딩 중: "..." 애니메이션

**하단 입력창:**
- 텍스트 입력 (최대 500자)
- 전송 버튼 (➤)

**하단 네비게이션:**
- 챗봇 탭 활성화

#### 인터랙션

1. **샘플 질문 클릭:** 자동으로 질문 전송
2. **메시지 전송:** AI 응답 표시, 자동 스크롤
3. **입력창 상태:** 빈 입력창 시 전송 버튼 비활성, 500자 초과 시 경고
4. **에러 발생:** "다시 시도해주세요" 메시지 표시

---

### 6.13 프로필 화면

<img width="895" height="1448" alt="프로필 화면" src="https://github.com/user-attachments/assets/6381545a-9a44-484f-b0f3-eb0d8297cbd1" />

**화면 설명:**  
학습 프로필 정보를 조회하고 재설정하는 화면이다.

#### 화면 구성

**상단 헤더:**
- 좌측: LangPath 로고
- 중앙: "👤 프로필" 타이틀

**학습 정보 테이블:**
- 학습 언어: (선택한 언어)
- 현재 수준: (선택한 수준)
- 학습 목표: (선택한 목표)
- 목표 기간: (선택한 기간)
- 일일 학습: (선택한 시간)
- 학습 방식: (선택한 방식)
- 약점: (선택한 약점)
- 시작일: (학습 시작 날짜)

**학습 계획 재생성:**
- "학습 계획 재생성" 버튼 (빨간색)
- 경고 메시지: "⚠️ 주의: 재생성 시 현재 진행률이 초기화됩니다."

**하단 네비게이션:**
- 프로필 탭 활성화

#### 인터랙션

1. **재생성 버튼 클릭:** 확인 다이얼로그 표시
   - 제목: "정말 재생성하시겠습니까?"
   - 내용: "현재까지의 모든 학습 진행률이 삭제되고 처음부터 다시 시작됩니다."
   - 버튼: "취소" / "재생성"
2. **재생성 확인:** 진행률 삭제 후 온보딩 화면으로 이동
3. **취소:** 다이얼로그 닫힘

---

### 6.8 반응형 디자인 (모바일/데스크톱)

#### 모바일 (320px ~ 767px)

**레이아웃 특징:**
- 하단 네비게이션 바 사용
- 네비게이션 바 높이: 64px
- 메인 컨텐츠 하단 패딩: 80px (네비게이션 바 공간 확보)
- 좌우 패딩: 16px
- 카드/버튼: 전체 너비 사용

**온보딩 화면 조정:**
- 언어 버튼: 2열 3행 유지
- 버튼 크기: 80px x 80px (축소)
- 간격: 12px

**대시보드 조정:**
- 과제 카드: 세로 나열
- 주간 캘린더 원: 24px (축소)

#### 데스크톱 (1024px 이상)

**레이아웃 특징:**
- 상단 네비게이션 바 사용 (가로 배치)
- 네비게이션 바 높이: 64px
- 메인 컨텐츠 최대 너비: 1200px (중앙 정렬)
- 좌우 패딩: 24px

**대시보드 조정:**
- 과제 카드: 최대 2열 그리드 가능
- 주간 캘린더: 더 넓은 간격 (16px)

**진행률 화면 조정:**
- 통계 카드: 4열 그리드 (모바일 2열)
- 업적 카드: 2열 그리드 (모바일 1열)

---

### 6.9 공통 디자인 스펙

#### 색상 팔레트

**Primary 색상:**
- 메인 파란색: #3B82F6
- 호버 파란색: #2563EB
- 연한 파란색: #EFF6FF

**Secondary 색상:**
- 회색 텍스트: #6B7280
- 연한 회색: #F3F4F6
- 테두리 회색: #E5E7EB

**Accent 색상:**
- 빨간색 (경고): #EF4444
- 초록색 (성공): #10B981
- 주황색: #F59E0B

#### 타이포그래피

**폰트 패밀리:**
- 한글: "Pretendard", -apple-system, sans-serif
- 영문/숫자: "Inter", sans-serif

**폰트 크기:**
- 큰 제목: 24px (1.5rem)
- 중간 제목: 20px (1.25rem)
- 소제목: 18px (1.125rem)
- 본문: 16px (1rem)
- 작은 텍스트: 14px (0.875rem)
- 캡션: 12px (0.75rem)

**폰트 굵기:**
- Bold: 700 (제목, 강조)
- SemiBold: 600 (부제목)
- Regular: 400 (본문)

#### 간격 시스템

**패딩/마진:**
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px

#### 모서리

**Border Radius:**
- 버튼: 8px
- 카드: 12px
- 입력창: 8px
- 모달: 16px

#### 애니메이션

**전환 시간:**
- 빠름: 150ms
- 보통: 300ms
- 느림: 500ms

**이징:**
- ease-in-out (기본)
- ease-out (페이드 인)

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
