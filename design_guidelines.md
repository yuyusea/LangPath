# Design Guidelines: AI Language Learning Consultant

## Design Approach

**Reference-Based**: Drawing inspiration from successful educational and productivity platforms:
- **Duolingo**: Friendly, achievement-driven interface with clear progress indicators
- **Notion**: Clean task organization and daily planning aesthetics
- **Linear**: Minimalist typography and subtle progress visualization

**Core Principles**:
- Encouraging and approachable (not intimidating)
- Progress-first design (achievements front and center)
- Friction-free interaction (minimal clicks to complete tasks)
- Mobile-optimized throughout

## Typography

**Font Families**:
- Primary: Inter (via Google Fonts) - clean, modern, excellent readability
- Headings: Inter 600-700 weight
- Body: Inter 400-500 weight

**Hierarchy**:
- Page titles: text-3xl font-bold
- Section headers: text-xl font-semibold
- Chat messages: text-base font-medium
- Task items: text-base
- Metadata/timestamps: text-sm text-gray-500

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, and 16 for consistency
- Component padding: p-4 to p-6
- Section gaps: gap-4 to gap-8
- Container margins: mx-4 on mobile, mx-auto max-w-4xl on desktop

**Container Strategy**:
- Chat interface: max-w-2xl centered
- Dashboard: max-w-4xl for comfortable reading
- Progress widgets: max-w-lg for focused attention

## Component Library

### Chat Onboarding Interface
- Messages appear sequentially with subtle fade-in
- User responses as pill-shaped buttons (inline-flex, rounded-full, px-6 py-3)
- Bot messages: left-aligned with avatar icon
- Selection buttons: grid layout for multiple choices (grid-cols-2 md:grid-cols-3 gap-3)
- Progress indicator at top: slim progress bar showing question 3/7

### Daily Dashboard
**Today's Tasks Section**:
- Large checkboxes (w-6 h-6) with smooth check animation
- Task cards: rounded-lg border with hover lift (hover:shadow-md transition)
- Time estimates displayed next to each task (text-sm)
- "Complete All" floating action button (fixed bottom-right on mobile)

**Progress Visualization**:
- Circular progress ring showing weekly completion percentage
- Weekly calendar grid: 7 equal squares with check/empty states
- Streak counter with flame emoji and number (text-2xl font-bold)

### Schedule Views
**Weekly Overview**:
- Accordion-style week cards (expand/collapse)
- Each day: minimal card with 2-3 key tasks visible
- Expandable to show full task list

**Monthly Roadmap**:
- Timeline-style layout with milestone markers
- Month cards stacked vertically with connecting line
- Key goals as badges (rounded-full, text-xs, px-3 py-1)

### Motivational Elements
- Toast notifications for achievements (slide-in from top-right)
- Confetti animation on milestone completions (3-day streak, week completed)
- Progress stats cards: small rounded cards with icon + number + label

### Navigation
- Bottom tab bar on mobile (4 tabs: Today, Schedule, Progress, Profile)
- Top navigation on desktop with same sections
- Floating "+" button for manual task addition (optional feature)

## Images

**Hero Section**: NOT applicable - this is a functional dashboard app, not a marketing site

**UI Imagery**:
- Language flag icons for language selection (inline with option text)
- Achievement badges/illustrations for milestones (small, decorative)
- Empty state illustrations when no tasks completed (friendly, encouraging style)
- Profile avatar placeholder (circular, 40x40px)

**Image Strategy**:
- Use simple, flat illustration style (like undraw.co aesthetic)
- Icons from Heroicons (outline style for UI, solid for active states)
- Minimal imagery - focus on progress data and tasks

## Interaction Patterns

- Checkbox completion triggers confetti + success message
- Smooth transitions between onboarding questions (slide animation)
- Loading states during AI schedule generation: skeleton screens + progress message ("Creating your personalized plan...")
- Haptic feedback on mobile for task completion (if supported)

## Responsive Behavior

**Mobile (default)**:
- Single column layout
- Fixed bottom navigation
- Full-width task cards with p-4
- Collapsed week view (tap to expand)

**Desktop (md: and up)**:
- Two-column layout for dashboard: tasks (60%) + progress sidebar (40%)
- Side navigation instead of bottom tabs
- Hover states active on interactive elements
- max-w-4xl content wrapper with centered alignment