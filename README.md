# Authoryn - Premium User & Teacher Management

Authoryn is a high-end, production-ready application for managing user and teacher records. Built with a robust CodeIgniter 4 backend and a sleek, animated React frontend.

## 🌟 Features
- **Relational Data**: 1-to-1 relationship between `auth_user` and `teachers`.
- **Atomic Registration**: Single POST API to register both user and teacher profiles simultaneously.
- **Secure Auth**: JWT-based token authentication with secure Bcrypt password hashing.
- **Modern UI/UX**: Premium "Midnight Slate" dark theme with glassmorphism and smooth Framer Motion animations.
- **Responsive Tables**: Interactive datatables for users and teachers on separate pages.

---

## 🛠️ Tech Stack
- **Backend**: CodeIgniter 4.5.x (PHP 8.1+)
- **Frontend**: React.js 18+ with Vite & TypeScript
- **Database**: SQLite3 (Default for Zero-Setup) or MySQL
- **Styling**: Vanilla CSS with Premium Design Tokens
- **Animations**: Framer Motion
- **Iconography**: Lucide React

---

## 🚀 Quick Setup (Highly Recommended)

1. **One-Click Startup**: Double-click `start_authoryn.vbs` in the root folder. 
   - *This will automatically start the Backend AND Frontend servers and open your browser.*

2. **Wait 3 Seconds**: The browser will open to `http://localhost:5173`.

3. **Login Instantly**: The login page is pre-filled with a test account:
   - **User**: `Testuser`
   - **Password**: `test123`

---

## 🏗️ Manual Backend Setup

### Database Initialization
The project defaults to **SQLite3** for zero-configuration testing. If you want to reset or re-seed the database:
```bash
cd backend
php AUTO_SETUP.php
```
*This script automatically creates the database file, builds the tables, and seeds the test user.*

### To Switch to MySQL:
1. Create a MySQL database named `authoryn`.
2. Import the `database.sql` file provided in the root.
3. Update `backend/.env` (uncomment the database lines and set your credentials).

---

## 📡 API Endpoints

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| POST | `/api/register` | Atomic Register (User + Teacher) | No |
| POST | `/api/login` | Login & Get JWT Token | No |
| GET | `/api/users` | List all Users (Table) | Yes |
| GET | `/api/teachers` | List all Teachers (Table) | Yes |
| GET | `/api/health` | API Status Check | No |

---

## 📂 Project Structure
```text
/backend/
  ├── app/Config/          # Routes, Filters, & DB Settings
  ├── app/Controllers/Api/ # Auth, Users, Teachers Logic
  ├── app/Filters/         # Jwt & CORS security filters
  ├── app/Libraries/       # JWT Core Logic
  ├── app/Models/          # Relational Models
  ├── .env                 # Project Environment Configuration
  └── AUTO_SETUP.php       # Instant One-Click Database Setup script
/frontend/
  ├── src/api/             # Axios Instance with interceptors
  ├── src/pages/           # Users, Teachers, and Dashboard pages
  ├── src/index.css        # Premium Design System
  └── package.json         # UI Dependencies
/start_authoryn.vbs         # Windows Automation Start Script
/database.sql              # MySQL Schema Export
```

---

## 🎨 Design Choices
- **Typography**: `Plus Jakarta Sans` for headers and `Outfit` for body text.
- **Glassmorphism**: High-blur translucent panels with subtle `var(--glass-border)`.
- **Transitions**: Non-blocking page entry/exit animations using Framer Motion's `AnimatePresence`.
- **Atomic Transactions**: Registration uses `$db->transStart()` to ensure data consistency between related tables.
