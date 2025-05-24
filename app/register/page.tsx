"use client";
import { useState } from "react";

const allowedDomains = ["@iut-dhaka.edu", "@du.ac.bd", "@bracu.ac.bd"]; // add more as needed

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [university, setUniversity] = useState("");
  const [department, setDepartment] = useState("");
  const [program, setProgram] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");

  const validateEmail = (email: string) =>
    allowedDomains.some((domain) => email.endsWith(domain));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please use a valid university email");
      return;
    }
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }
      alert("Registration successful!");
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md mt-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
        Register
      </h2>
      <p className="text-gray-600 mb-6 text-center">
        Create your account to start trading on StudMarket
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded bg-gray-50 text-gray-900 placeholder-gray-500"
          placeholder="Full Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded bg-gray-50 text-gray-900 placeholder-gray-500"
          placeholder="University email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded bg-gray-50 text-gray-900 placeholder-gray-500"
          placeholder="Password"
          required
        />
        <input
          type="text"
          value={university}
          onChange={(e) => setUniversity(e.target.value)}
          className="w-full p-2 border rounded bg-gray-50 text-gray-900 placeholder-gray-500"
          placeholder="University (optional)"
        />
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="w-full p-2 border rounded bg-gray-50 text-gray-900 placeholder-gray-500"
          placeholder="Department (optional)"
        />
        <input
          type="text"
          value={program}
          onChange={(e) => setProgram(e.target.value)}
          className="w-full p-2 border rounded bg-gray-50 text-gray-900 placeholder-gray-500"
          placeholder="Program (optional)"
        />
        <input
          type="text"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full p-2 border rounded bg-gray-50 text-gray-900 placeholder-gray-500"
          placeholder="Year (optional)"
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Register
        </button>
      </form>
      <div className="my-6 flex items-center justify-center">
        <span className="text-gray-400 text-xs">or</span>
      </div>
      <button
        onClick={() =>
          (window.location.href = "http://localhost:5000/api/auth/google")
        }
        className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_17_40)">
            <path
              d="M47.5 24.552c0-1.636-.146-3.2-.418-4.704H24v9.02h13.22c-.57 3.08-2.28 5.68-4.86 7.44v6.18h7.86c4.6-4.24 7.28-10.5 7.28-17.936z"
              fill="#4285F4"
            />
            <path
              d="M24 48c6.48 0 11.92-2.16 15.9-5.88l-7.86-6.18c-2.2 1.48-5.02 2.36-8.04 2.36-6.18 0-11.42-4.18-13.3-9.8H2.7v6.24C6.66 43.34 14.64 48 24 48z"
              fill="#34A853"
            />
            <path
              d="M10.7 28.5c-.5-1.48-.8-3.06-.8-4.5s.3-3.02.8-4.5v-6.24H2.7A23.98 23.98 0 000 24c0 3.98.96 7.76 2.7 10.74l8-6.24z"
              fill="#FBBC05"
            />
            <path
              d="M24 9.52c3.52 0 6.66 1.22 9.14 3.62l6.84-6.84C35.92 2.16 30.48 0 24 0 14.64 0 6.66 4.66 2.7 13.26l8 6.24c1.88-5.62 7.12-9.8 13.3-9.8z"
              fill="#EA4335"
            />
          </g>
          <defs>
            <clipPath id="clip0_17_40">
              <path fill="#fff" d="M0 0h48v48H0z" />
            </clipPath>
          </defs>
        </svg>
        <span>Sign in with Google</span>
      </button>
    </div>
  );
};

export default function Page() {
  return <RegisterForm />;
}
