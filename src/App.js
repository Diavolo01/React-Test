import "./styles.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const baseUrl = "https://jsonplaceholder.typicode.com/users";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme === "dark";
  });
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const schema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    role: yup
      .string()
      .oneOf(["Admin", "Editor", "Viewer"])
      .required("Role is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setMessage("User added successfully!");
    console.log("Form Submitted: ", data);
    reset();
    setTimeout(() => setMessage(""), 3000);
  };

  useEffect(() => {
    axios.get(baseUrl).then((res) => {
      setUser(res.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`min-h-screen py-6 ${
        isDarkMode ? "bg-gray-600 text-slate-900" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="container max-w-screen-lg mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">User List</h1>
          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-x-auto shadow rounded bg-white dark:bg-amber-50">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
              <thead className="bg-amber-300 dark:bg-amber-400 text-white">
                <tr>
                  <th className="px-4 py-2 text-left font-medium">Name</th>
                  <th className="px-4 py-2 text-left font-medium">Email</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <h2 className="text-2xl font-semibold mt-10 mb-4">Add New User</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-4 sm:grid-cols-2 bg-white dark:bg-indigo-100 p-6 rounded shadow"
        >
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              {...register("name")}
              className="w-full px-3 py-2 border rounded dark:text-black"
            />
            <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="text"
              {...register("email")}
              className="w-full px-3 py-2 border rounded dark:text-black"
            />
            <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
          </div>

          <div className="sm:col-span-2">
            <label className="block mb-1 font-medium">Role</label>
            <select
              {...register("role")}
              className="w-full px-3 py-2 border rounded dark:text-black"
            >
              <option value="">--Select Role--</option>
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
            </select>
            <p className="text-red-500 text-sm mt-1">{errors.role?.message}</p>
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
              Add User
            </button>
          </div>
        </form>

        {message && (
          <div className="mt-4 text-green-600 font-semibold">{message}</div>
        )}
      </div>
    </div>
  );
}
