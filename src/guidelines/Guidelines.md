# 정부지원사업 매칭 에이전트 플랫폼 개발 가이드라인

## 📋 프로젝트 정보
- **현재 버전**: v1.3.0
- **프로젝트명**: 정부지원사업 매칭 에이전트 플랫폼
- **매칭 정확도**: 92%
- **포인트 컬러**: #58d674

## 🔄 버전 관리 규칙

### 새로운 기능 개발 시 필수 사항
1. **버전 업데이트**: 새로운 기능 완료 시 VERSION.md와 project.json 업데이트
2. **문서화**: 기능별 상세 설명 및 사용법 문서화
3. **컴포넌트 네이밍**: 기능별로 명확한 컴포넌트명 사용
4. **일관성 유지**: 기존 디자인 시스템과 코딩 패턴 준수

### 버전 번호 체계
- **Major (X.0.0)**: 주요 아키텍처 변경
- **Minor (1.X.0)**: 새로운 기능 추가  
- **Patch (1.1.X)**: 버그 수정, 소규모 개선

## 🎨 디자인 시스템 가이드라인

### 컬러 시스템
- **Primary Color**: #58d674 (포인트 그린)
- **배경**: 그라데이션 패턴 (from-gray-50 to-gray-100)
- **카드**: 반투명 효과 (bg-white/70 backdrop-blur-md)
- **테두리**: 부드러운 라운드 (rounded-[40px])

### 디자인 패턴
- **Figma 원형 기하학적 패턴** 활용
- **깔끔하고 전문적인** 비즈니스 룩앤필
- **반응형 디자인** 필수 (모바일 우선)
- **애니메이션**: Motion/React 활용한 부드러운 전환

### 타이포그래피
- 기본 폰트 크기, 굵기, 행간은 globals.css 기본값 사용
- 사용자 요청이 없는 한 text-*, font-*, leading-* 클래스 사용 금지

## 🛠 개발 가이드라인

### 컴포넌트 구조
- **재사용 가능한 컴포넌트** 우선 개발
- **/components** 디렉토리에 비즈니스 로직 컴포넌트 배치
- **/components/ui** 는 ShadCN 전용 (수정 금지)
- **단일 책임 원칙** 준수

### 코딩 스타일
- **TypeScript** 필수 사용
- **함수형 컴포넌트** + **React Hooks** 패턴
- **명확한 인터페이스** 정의
- **에러 핸들링** 및 **사용자 피드백** (toast 알림) 포함

### 라이브러리 사용 규칙
- **Icons**: lucide-react 사용
- **Charts**: recharts 사용  
- **Animations**: motion/react 사용
- **Notifications**: sonner@2.0.3 사용
- **Forms**: react-hook-form@7.55.0 사용

## 📝 기능별 개발 원칙

### 매칭 시스템
- **92% 정확도** 유지
- **실시간 알림** 기능 포함
- **상세한 매칭 결과** 제공
- **사용자 맞춤형 추천**

### 구독 시스템  
- **3단계 플랜** (베이직/프리미엄/엔터프라이즈)
- **유연한 플랜 변경** 기능
- **결제 연동** 준비 상태 유지

### 프로모션 시스템
- **코드 생성/관리/삭제** 기능
- **할인 적용** 로직
- **사용 내역 추적**
- **관리자 권한** 분리

### 관리자 시스템
- **종합 대시보드** 제공
- **실시간 통계** 표시
- **세분화된 관리** 기능
- **권한별 접근 제어**

## 🔒 보안 및 데이터 처리

### 개인정보 보호
- **PII 수집 최소화**
- **데이터 암호화** 고려
- **접근 권한 관리**
- **감사 로그** 유지

### API 및 백엔드
- **Mock 데이터** 활용한 프론트엔드 개발
- **Supabase 연동** 준비 상태 유지
- **에러 처리** 및 **재시도 로직**
- **API 키 보안** 관리

## 📱 사용자 경험 (UX)

### 반응형 디자인
- **모바일 우선** 접근법
- **터치 인터페이스** 고려
- **로딩 상태** 명확한 표시
- **오프라인 대응** 고려

### 접근성 (A11y)
- **키보드 네비게이션** 지원
- **스크린 리더** 호환성
- **색상 대비** 준수
- **포커스 관리** 적절한 구현

## 🚀 성능 최적화

### 코드 최적화
- **컴포넌트 메모이제이션** 적절한 사용
- **이미지 최적화** (Unsplash 활용)
- **번들 크기** 최소화
- **레이지 로딩** 구현

### 사용자 경험 최적화
- **로딩 시간 < 2초** 목표
- **부드러운 애니메이션**
- **즉각적인 피드백**
- **오류 상황 처리**
<!--

System Guidelines

Use this file to provide the AI with rules and guidelines you want it to follow.
This template outlines a few examples of things you can add. You can add your own sections and format it to suit your needs

TIP: More context isn't always better. It can confuse the LLM. Try and add the most important rules you need

# General guidelines

Any general rules you want the AI to follow.
For example:

* Only use absolute positioning when necessary. Opt for responsive and well structured layouts that use flexbox and grid by default
* Refactor code as you go to keep code clean
* Keep file sizes small and put helper functions and components in their own files.

--------------

# Design system guidelines
Rules for how the AI should make generations look like your company's design system

Additionally, if you select a design system to use in the prompt box, you can reference
your design system's components, tokens, variables and components.
For example:

* Use a base font-size of 14px
* Date formats should always be in the format “Jun 10”
* The bottom toolbar should only ever have a maximum of 4 items
* Never use the floating action button with the bottom toolbar
* Chips should always come in sets of 3 or more
* Don't use a dropdown if there are 2 or fewer options

You can also create sub sections and add more specific details
For example:


## Button
The Button component is a fundamental interactive element in our design system, designed to trigger actions or navigate
users through the application. It provides visual feedback and clear affordances to enhance user experience.

### Usage
Buttons should be used for important actions that users need to take, such as form submissions, confirming choices,
or initiating processes. They communicate interactivity and should have clear, action-oriented labels.

### Variants
* Primary Button
  * Purpose : Used for the main action in a section or page
  * Visual Style : Bold, filled with the primary brand color
  * Usage : One primary button per section to guide users toward the most important action
* Secondary Button
  * Purpose : Used for alternative or supporting actions
  * Visual Style : Outlined with the primary color, transparent background
  * Usage : Can appear alongside a primary button for less important actions
* Tertiary Button
  * Purpose : Used for the least important actions
  * Visual Style : Text-only with no border, using primary color
  * Usage : For actions that should be available but not emphasized
-->
