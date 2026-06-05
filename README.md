# Office Asset Tracker

## Overview

Office Asset Tracker is a full-stack web application designed to streamline the management of organizational assets. The system enables administrators to track, assign, monitor, and maintain office assets while providing employees with a centralized platform to access assigned assets, raise complaints, and receive notifications.

The application improves asset visibility, reduces manual record-keeping, and enhances operational efficiency through a modern and user-friendly interface.

---

## Key Features

### Asset Management

* Add, update, and delete assets
* Asset categorization and inventory tracking
* Asset image upload support
* Asset status monitoring

### Asset Assignment

* Assign assets to employees
* Track assigned and available assets
* Asset return management

### Warranty Management

* Warranty expiry monitoring
* Automated warranty alerts
* Preventive asset maintenance tracking

### Complaint Management

* Raise asset-related complaints
* Track complaint status
* Manage and resolve reported issues

### Notifications

* Real-time notification system
* Asset assignment notifications
* Warranty and maintenance alerts

### User Management

* Secure authentication and authorization
* Role-based access control (Admin/User)
* Profile management
* Password management

---

## Technology Stack

### Frontend

* React.js
* Vite
* Axios
* React Router DOM
* React Toastify
* React Icons
* CSS3

### Backend

* Node.js
* Express.js
* JWT Authentication
* Multer

### Database

* MongoDB Atlas
* Mongoose

### Deployment

* Vercel (Frontend)
* Render (Backend)

---

## Project Architecture

```text
Office_Asset_Tracker
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── uploads
│   └── server.js
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/23CSE147/Office_Asset_Tracker.git
cd Office_Asset_Tracker
```

### Backend Setup

```bash
cd backend
npm install
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Core Functionalities

* Asset Inventory Management
* Asset Assignment & Return Tracking
* Warranty Expiry Monitoring
* Complaint Handling System
* Notification Management
* User Authentication & Authorization
* Responsive User Interface

---

## Future Enhancements

* QR Code Based Asset Tracking
* Advanced Reporting & Analytics
* Email Notification Integration
* Mobile Application Support
* Multi-Language Support
* Dark Mode Customization

---

## Author

**Saravanan M**

Computer Science and Engineering Student

GitHub: https://github.com/23CSE147

---

## License

This project is developed for academic, learning, and demonstration purposes.
