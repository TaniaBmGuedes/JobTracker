<p align="center">
  <img src="public/logo.png" alt="Job Tracker Logo" width="120" />
</p>

<h1 align="center">Job Tracker</h1>

<p align="center">
  A modern, feature-rich job application tracker built with React and HeroUI. Keep track of where you've applied, manage your timeline, attach proof of submission, and export your data.
</p>

---

## Features

### Application Management
- **Add, edit, and delete** job applications with detailed information
- **Status tracking** — Applied, Interview, Offer, Rejected, No Response
- **Search & filter** by company name, role, or status
- **Sort** by date, company name, or status
- **Archive** applications you no longer need to see actively

### Timeline & History
- Each application has a **timeline** to track progress over time
- Add events like "Interview scheduled", "Received offer", etc. with dates
- First event is auto-created when you add an application

### Attachments
- **Screenshot uploads** as proof of submission (image preview + full-screen view)
- **PDF attachments** per application (downloadable from the card)

### Profile Tab
- Store your personal data: name, email, phone, GitHub, LinkedIn, portfolio
- Upload and manage your **CV/Resume**
- Data persisted locally for quick access

### Import & Export
- **Export to CSV** — download all applications as a spreadsheet
- **Export to PDF** — generate a formatted PDF report
- **Import from CSV** — bulk-import applications from a CSV file

### Dashboard
- **Stats board** showing total applications, applied, interviews, offers, and rejected counts
- Stats reflect only active (non-archived) applications

---

## Tech Stack

| Layer       | Technology                          |
| ----------- | ----------------------------------- |
| Framework   | React 19                            |
| UI Library  | HeroUI v3                           |
| Styling     | Tailwind CSS v4                     |
| Build Tool  | Vite 8                              |
| PDF Export  | jsPDF + jspdf-autotable             |
| Persistence | Browser localStorage                |

---

## Project Structure

```
src/
├── components/
│   ├── ApplicationCard.jsx    # Individual application card with timeline
│   ├── ApplicationForm.jsx    # Modal form for add/edit
│   ├── ApplicationList.jsx    # List of application cards
│   ├── FilterBar.jsx          # Search, filter, sort, import/export controls
│   ├── Header.jsx             # App header with logo and tab navigation
│   ├── ProfileTab.jsx         # Personal data management tab
│   └── StatsBoard.jsx         # Dashboard statistics cards
├── hooks/
│   ├── useApplications.js     # Core application CRUD logic & exports
│   └── useLocalStorage.js     # localStorage persistence hook
├── constants/
│   └── statuses.js            # Status definitions and helpers
├── App.jsx                    # Main app with tab routing
├── main.jsx                   # React entry point
└── index.css                  # Tailwind + HeroUI imports
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **npm** >= 9

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd job-tracker

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview   # Preview the production build locally
```

---

## Data Storage

All data is stored in the browser's **localStorage**. This means:

- Data persists across sessions and browser restarts
- Data is specific to the browser and device
- Clearing browser data will erase all saved information
- Storage limit is approximately 5-10 MB

> For permanent, cross-device storage, consider integrating a backend service like Supabase or Firebase.

---

## CSV Format

When importing a CSV file, the following column headers are recognized:

| Column          | Maps to       |
| --------------- | ------------- |
| Company         | Company name  |
| Role            | Job role      |
| Status          | Status value  |
| Date Applied    | Applied date  |
| Contact         | Contact person|
| Salary          | Salary range  |
| URL             | Job post URL  |
| Notes           | Notes field   |

---

## License

This project is private and not licensed for public distribution.