# 📍 Nearby Job Finder

A modern, full-stack **Job Search & Localization Web Application** designed to help users find employment opportunities around their current geographical location. This project is built using the MERN stack and incorporates modern **DevOps**, **Docker containerization**, and **CI/CD** practices.

---

## 🌟 Key Features

* **Location-Based Job Search:** Find jobs easily around your area.
* **Interactive UI:** A beautiful, responsive light blue theme with dynamic job cards.
* **Instant Filtering:** Search by job title or location in real-time.
* **Job Detail Modal:** Click on any job card to view complete descriptions, salaries, and company info.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Axios, CSS3 (Custom Soft Blue Theme)
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **DevOps & Infrastructure:** Docker, GitHub Actions

---

## 🐳 DevOps & Architecture Concepts Applied

This project goes beyond traditional development by incorporating production-ready software engineering standards:

### 1. Microservices Architecture
The application is decoupled into two separate, independent services that communicate via APIs:
* **Frontend Service:** React single-page application handling user interaction.
* **Backend Service:** Express REST API managing business logic and database communication.

### 2. Containerization (Docker)
Both frontend and backend microservices are completely containerized using **Docker** to ensure consistency across development and production environments.
* `Dockerfile` is configured for the root backend server.
* `Dockerfile` is configured inside the `/frontend` directory.

### 3. Continuous Integration (GitHub Actions)
A fully automated **CI/CD pipeline** is integrated using GitHub Actions. Upon every `push` or `pull_request` to the main repository branches, the workflow:
* Automatically checks out the repository.
* Sets up the Node.js environment.
* Installs backend and frontend dependencies to run automated syntax and build tests.

---

## 🚀 Getting Started

### Prerequisites
* Node.js (v18 or higher)
* MongoDB Local or Atlas Account
* Docker (Optional, for containerized running)

### Local Setup (Without Docker)

1. **Clone the repository:**
   ```bash
   git clone <your-github-repository-url>
   cd Job-Finder