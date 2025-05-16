# Fit Zone Setup Guide

This guide will help you set up the Fit Zone project on your local machine.

## Prerequisites

-   Node.js installed ([https://nodejs.org](https://nodejs.org))
-   Git installed ([https://git-scm.com](https://git-scm.com))

## How to Run

### 1. Clone the repository

Open your terminal and run:

```bash
git clone [https://github.com/vikashmishra464/fitZone.git](https://github.com/vikashmishra464/fitZone.git)
```

This will download the project files.

### 2. Start Frontend

Go inside the frontend folder:

```bash
cd fitZone/frontend
```

Install frontend packages:

```bash
npm install
```

Run the frontend server:

```bash
npm run dev
```

The frontend will start, usually at http://localhost:3000.  If it doesn't open automatically, navigate to that address in your web browser.

### 3. Start Backend

Open a new terminal window or tab.  This is important; you need the frontend and backend running *simultaneously*.

Go inside the backend folder:

```bash
cd fitZone/backend
```

Install backend packages:

```bash
npm install
```

Run the backend server:

```bash
npm start
```

The backend will start, usually at http://localhost:5000.  The exact port will be shown in your terminal output.
