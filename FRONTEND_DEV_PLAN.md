# AI Paper Detector - Frontend Development Plan

## MVP Scope Analysis

### Core Pages Required
1. **Home Page** - Product introduction & CTA
2. **Detection Page** - File upload & text paste
3. **Result Page** - Detection report display

### Key Features
- Document upload (PDF, DOCX, TXT) - max 10MB
- Text paste - max 30,000 characters
- AI score display
- Risk level indicator
- Paragraph-level analysis
- Improvement suggestions
- Processing state management
- Error handling

---

## Phase 1: Foundation Setup (2-3 days)

### 1.1 Project Structure & Components
- [ ] Create page layout components
- [ ] Set up routing (React Router)
- [ ] Create base component templates (Button, Card, Input, etc.)
- [ ] Set up global styles with TailwindCSS

### 1.2 State Management
- [ ] Create Zustand stores for:
  - `uploadStore` - file/text state, upload progress
  - `detectionStore` - detection results, AI scores
  - `uiStore` - loading state, error messages, notifications

### 1.3 API Service Setup
- [ ] Create API service layer with axios
  - `/api/detect` - submit for detection
  - Error handling & interceptors
  - Request/response logging

---

## Phase 2: Home Page (1-2 days)

### 2.1 Components
- [ ] Hero section with product description
- [ ] Feature highlights
- [ ] Call-to-action button
- [ ] Logo and branding

### 2.2 Styling & Layout
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Dark mode support
- [ ] Smooth animations

---

## Phase 3: Detection Page (2-3 days)

### 3.1 File Upload Component
- [ ] Drag-and-drop upload zone
- [ ] File input with type validation (PDF, DOCX, TXT)
- [ ] File size validation (max 10MB)
- [ ] Upload progress indicator
- [ ] File preview/info display

### 3.2 Text Paste Component
- [ ] Textarea component
- [ ] Character counter (max 30,000)
- [ ] Format hints/tips

### 3.3 Tab/Toggle Interface
- [ ] Switch between Upload and Paste modes
- [ ] Maintain state for both inputs

### 3.4 Detection Button & Processing State
- [ ] "Detect AI" button
- [ ] Loading spinner during processing
- [ ] Cancel functionality (if needed)
- [ ] Estimated time display

---

## Phase 4: Result Page (2-3 days)

### 4.1 Overall Score Display
- [ ] Large AI probability percentage
- [ ] Risk level badge (Low/Medium/High)
- [ ] Score visualization (progress bar or gauge)

### 4.2 Risk Level Indicator
- [ ] Color-coded risk badges
- [ ] Risk legend explanation

### 4.3 Paragraph Analysis
- [ ] Paragraph list with individual scores
- [ ] Highlight high-risk paragraphs
- [ ] Expandable paragraph preview
- [ ] Original text display with risk highlighting

### 4.4 Improvement Suggestions
- [ ] Actionable recommendation list
- [ ] Category grouping (if applicable)

### 4.5 Action Buttons
- [ ] Export/Download report (PDF)
- [ ] Copy results
- [ ] Back to detection
- [ ] New detection

---

## Phase 5: Common Features (1-2 days)

### 5.1 Loading & Processing States
- [ ] Loading overlay/spinner
- [ ] Progress indicator
- [ ] Processing time display

### 5.2 Error Handling
- [ ] File validation errors
- [ ] Network error messages
- [ ] API error handling
- [ ] User-friendly error displays

### 5.3 Notifications
- [ ] Toast/notification system
- [ ] Success messages
- [ ] Warning messages
- [ ] Error alerts

### 5.4 Navigation
- [ ] Header with logo/branding
- [ ] Navigation between pages
- [ ] Back button functionality

---

## Phase 6: Polish & Optimization (1-2 days)

### 6.1 Responsive Design
- [ ] Mobile-first approach
- [ ] Test on multiple devices
- [ ] Touch optimization

### 6.2 Accessibility
- [ ] ARIA labels
- [ ] Keyboard navigation
- [ ] Color contrast compliance

### 6.3 Performance
- [ ] Code splitting
- [ ] Lazy loading
- [ ] Image optimization

### 6.4 Testing
- [ ] Component testing
- [ ] Integration testing
- [ ] E2E testing

---

## Technology Stack

- **Framework**: React 18 + TypeScript
- **Styling**: TailwindCSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Routing**: React Router v6
- **UI Components**: shadcn/ui (optional)
- **Form Handling**: React Hook Form (optional)
- **File Handling**: react-dropzone

---

## Component Checklist

### Pages
- [ ] HomePage
- [ ] DetectionPage
- [ ] ResultPage
- [ ] NotFoundPage (404)

### Business Components
- [ ] FileUploadZone
- [ ] TextPasteInput
- [ ] DetectionButton
- [ ] LoadingSpinner
- [ ] ParagraphAnalysis
- [ ] SuggestionList
- [ ] ResultCard
- [ ] RiskBadge

### UI Components
- [ ] Button
- [ ] Input
- [ ] Textarea
- [ ] Card
- [ ] Badge
- [ ] Tab
- [ ] Progress/Gauge
- [ ] Toast/Notification
- [ ] Modal
- [ ] Header/Footer

### Hooks
- [ ] useFileUpload
- [ ] useDetection
- [ ] useNotification
- [ ] usePagination (if needed)

---

## API Endpoints Required (Backend)

```
POST /api/v1/detect
  - Input: file or text
  - Output: { aiScore, riskLevel, paragraphAnalysis, suggestions }

POST /api/v1/detect/export
  - Input: result data
  - Output: PDF file
```

---

## Development Timeline

**Estimated Total**: 10-15 days

- Phase 1: 2-3 days
- Phase 2: 1-2 days
- Phase 3: 2-3 days
- Phase 4: 2-3 days
- Phase 5: 1-2 days
- Phase 6: 1-2 days

---

## Success Criteria

- [ ] All core pages functional
- [ ] File upload working (multiple formats)
- [ ] Text input working
- [ ] API integration complete
- [ ] Results displaying correctly
- [ ] Error handling working
- [ ] Mobile responsive
- [ ] Smooth user experience
- [ ] Code follows conventions from `.github/copilot-instructions.md`
