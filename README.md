# ⚛️ React User Management Dashboard

A basic React frontend project demonstrating:

- User list fetched from an external API  
- Form handling with validation  
- Dark mode toggle with theme persistence  
- Responsive layout with mobile support  
- Smooth and clean UI/UX

🔗 **Live Demo**: (https://6mtdky-3000.csb.app)  
🧩 **View on CodeSandbox**: (https://codesandbox.io/s/6mtdky)

---

## ✨ Features

### 🔄 User List
- Fetched from: `https://jsonplaceholder.typicode.com/users`
- Displays name and email in a table
- Shows loading indicator while fetching

### ➕ Add New User
- Includes fields for name, email, and role (Admin, Editor, Viewer)
- Built with `react-hook-form` and `Yup` for validation
- Logs new user to the console
- Shows inline error messages and confirmation

### 🌙 Dark Mode
- Toggle to switch between light and dark themes
- Theme preference is saved in `localStorage`
- Smooth transitions with Tailwind CSS

### 📱 Responsive Design
- Fully responsive layout for desktop and mobile
- Built with Tailwind CSS utility classes

---

## 🛠 Built With

- React (with Hooks)
- Tailwind CSS
- React Hook Form
- Yup (for validation)
- JSONPlaceholder API (mock API)
