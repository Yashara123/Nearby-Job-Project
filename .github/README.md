# 📍 Nearby Job Finder System

A modern MERN stack web application designed to help job seekers find employment opportunities within their local areas effortlessly.

---

## 📄 Problem Description
Finding a job within a specific geographical radius or location can be highly challenging for job seekers. Traditional job portals often list openings nationwide without efficient filtering for local proximity. This leads to increased commuting costs, time wastage, and friction for users who strictly prefer jobs nearby. Businesses also struggle to recruit local talent effectively, leading to high employee turnover due to travel constraints.

## 💡 Proposed Solution
The **Nearby Job Finder System** solves this issue by providing a dedicated location-based job search platform. It allows businesses to post vacancies tied to specific regions and enables job seekers to query openings based on specific job titles and locations. By offering a clean, responsive, and intuitive interface, users can quickly discover, filter, and apply for relevant jobs right around their area.

---

## ✨ Features
* **Dynamic Job Search:** Search and filter jobs instantly by Job Title or Location.
* **Multi-Location Tagging:** Supports flexible location queries (e.g., displaying jobs available across multiple regional branches like Colombo, Kandy, Galle).
* **Detailed Job Views:** View key details for each posting, including salary, company name, location, and clear qualification/role descriptions.
* **Easy Job Application:** Integrated modal forms enabling applicants to apply for jobs directly through the platform.
* **Live Database Integration:** Real-time data storage and fetching via cloud-hosted MongoDB.

---

## 🛠️ Technologies Used
* **Frontend:** React.js, Tailwind CSS (Custom Navy Blue Theme)
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas (Mongoose ODM)
* **API Testing:** Postman
* **Environment Variables:** Dotenv

---

## 🚀 API Endpoints

### 1. Get All Jobs
* **URL:** `/api/jobs`
* **Method:** `GET`
* **Description:** Fetches all available jobs from the database.
* **Example Response (200 OK):**
    ```json
    [
      {
        "_id": "6a06002853b0cddba839d7fe",
        "title": "Retail Cashier",
        "company": "Keells Super",
        "location": "Colombo, Kandy, Galle, Negombo, Jaffna",
        "salary": "45,000",
        "description": "We are looking for a friendly and energetic Retail Cashier."
      }
    ]
    ```

### 2. Create a Job
* **URL:** `/api/jobs`
* **Method:** `POST`
* **Description:** Adds a new job listing to the platform.
* **Example Body (JSON):**
    ```json
    {
      "title": "Inventory & Stock Checker",
      "company": "Daraz Warehouse",
      "location": "Kelaniya, Kurunegala",
      "salary": "55,000",
      "description": "Responsible for checking incoming stock and inventory counts."
    }
    ```

### 3. Update a Job
* **URL:** `/api/jobs/:id`
* **Method:** `PUT`
* **Description:** Updates an existing job's location, salary, or other information by ID.

### 4. Delete a Job
* **URL:** `/api/jobs/:id`
* **Method:** `DELETE`
* **Description:** Removes a specific job vacancy from the database using its unique ID.

---

## ⚙️ Setup Instructions

### Prerequisites
* Node.js installed on your machine.
* A MongoDB Atlas account and cluster setup.

### 1. Clone and Install Dependencies
Open your terminal and run the following commands:
```bash
# Install root backend dependencies
npm install

# Navigate to frontend and install UI dependencies
cd frontend
npm install