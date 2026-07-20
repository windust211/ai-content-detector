# AI Paper Detector MVP Product Requirements Document (PRD)

> **Version:** V0.1  
> **Product:** AI Paper Detector  
> **Type:** MVP  
> **Status:** Draft

---

# 1. Product Overview

## 1.1 Background

With the rapid adoption of generative AI tools such as ChatGPT, Claude, and Gemini, an increasing number of students, researchers, and academic writers are using AI to assist with academic writing.

At the same time, universities, academic journals, and research institutions have begun using AI content detection tools to evaluate whether submitted papers contain AI-generated content.

As a result, users want a simple way to evaluate the AI-generated content risk of their papers before submission.

This project aims to build a lightweight AI paper detection platform that allows users to:

> Upload a paper → Analyze the content → Receive an AI detection report.

---

# 2. Product Positioning

## Product Name

**AI Paper Detector**

---

## Product Positioning

An AI content detection tool designed specifically for academic writing and research papers.

The product helps users:

- Detect AI-generated content in academic papers
- Identify high-risk paragraphs
- Receive suggestions for improving their writing

---

# 3. MVP Goal

## Primary Goal

Deliver a complete end-to-end detection workflow.

```text
Visit Website

↓

Upload Paper

↓

Parse Document

↓

Run AI Detection

↓

Generate Report

↓

Display Results
```

---

## MVP Validation Goals

Validate the following assumptions:

- Users have a real need for AI content detection before paper submission.
- Users are willing to upload their papers for analysis.
- The generated report provides enough value for initial adoption.

---

# 4. Target Users

The primary users include:

- Undergraduate students
- Graduate students
- PhD candidates
- International students
- Researchers
- Academic writers

---

# 5. MVP Scope

## Included Features

### 5.1 Document Upload

Users can upload academic documents.

Supported formats:

- PDF
- DOCX
- TXT

Supported methods:

- File Upload
- Paste Text

Limitations:

- Maximum file size: **10 MB**
- Maximum text length: **30,000 characters**

---

### 5.2 Document Parsing

The system automatically processes uploaded documents.

Workflow:

```text
Upload File

↓

Extract Text

↓

Clean Text

↓

Split into Paragraphs

↓

Prepare for Detection
```

---

### 5.3 AI Content Detection

The system calls a third-party AI detection service.

The detection includes:

- AI probability score
- Overall risk level
- Paragraph-level analysis

Example:

```text
AI Probability

18%

Risk Level

Low
```

---

### 5.4 Detection Report

The report includes:

#### Overall AI Score

Example:

```text
AI Score: 18%
```

---

#### Risk Level

| Score | Risk Level |
|--------|------------|
| 0–30% | Low |
| 31–70% | Medium |
| 71–100% | High |

---

#### Paragraph Analysis

Example:

```text
Paragraph 1

10%

Paragraph 5

55%

Paragraph 12

80%
```

The purpose is to help users quickly identify high-risk sections.

---

#### Suggestions

Example recommendations:

- Add more original analysis.
- Reduce repetitive sentence structures.
- Strengthen academic arguments.
- Improve writing diversity.

---

# 6. User Flow

```text
Visit Website

↓

Open Detection Page

↓

Upload Document

↓

Click "Detect"

↓

Processing

↓

View Detection Report
```

---

# 7. Page Requirements

## 7.1 Home Page

Purpose:

Introduce the product and encourage users to start detection.

Components:

- Product Logo
- Product Description
- Upload Entry
- Call-to-Action Button

Primary Button:

```text
Start Detection
```

---

## 7.2 Detection Page

Purpose:

Allow users to submit documents.

Components:

```text
Upload File

or

Paste Text

[ Detect AI ]
```

---

## 7.3 Result Page

Displays:

- AI Score
- Risk Level
- Paragraph Analysis
- Improvement Suggestions

---

# 8. Data Processing Policy

## Privacy First

The platform follows a strict **stateless processing** policy.

---

## No Data Storage

The system does **NOT** store:

- User accounts
- Personal information
- Uploaded documents
- Paper content
- Detection results
- History records

---

## Data Lifecycle

```text
Upload

↓

Temporary Processing

↓

AI Detection

↓

Return Results

↓

Delete All Temporary Data
```

---

# 9. Out of Scope

The following features are **not included** in the MVP.

### User Management

- User Registration
- Login
- User Profile
- Account Management

### Data Management

- History
- Saved Reports
- File Storage

### Commercial Features

- Subscription
- Payment
- Membership

### AI Features

- AI Humanizer
- AI Rewrite
- Grammar Check
- Citation Check

### Administration

- Admin Dashboard
- Analytics
- User Management

---

# 10. Non-functional Requirements

## Performance

Target processing time:

```text
Upload → Detection Report

≤ 30 seconds
```

---

## Security

The system should enforce:

- File size limitation
- Rate limiting
- Basic request validation

---

## Privacy

Uploaded documents:

- Are processed temporarily.
- Are never permanently stored.
- Are never used for AI model training.
- Are never shared outside required detection services.

---

# 11. MVP Success Criteria

## Functional

- Users can upload documents.
- The system successfully parses documents.
- AI detection completes successfully.
- Users receive a readable report.

---

## Product

- Users can complete the full workflow without assistance.
- Users understand the detection results.

---

## Technical

- Stable deployment.
- Successful end-to-end processing.
- Reliable third-party API integration.

---

# 12. Future Roadmap

## Version 0.2

- User Authentication
- Usage Limits
- Detection History

---

## Version 0.3

- Multiple Detection Engines
- Downloadable PDF Reports
- Advanced Detection Comparison

---

## Version 1.0

- Subscription Plans
- Team Workspace
- Enterprise Version
- API Services
- Proprietary AI Detection Engine