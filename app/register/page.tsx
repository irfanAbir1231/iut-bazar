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

  const validateEmail = (email: string) =>
    allowedDomains.some((domain) => email.endsWith(domain));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please use a valid university email");
      return;
    }
    setError("");
    // TODO: API call to backend for registration
    alert("Registration submitted!");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md mt-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="University email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Password"
          required
        />
        <input
          type="text"
          value={university}
          onChange={(e) => setUniversity(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="University (optional)"
        />
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Department (optional)"
        />
        <input
          type="text"
          value={program}
          onChange={(e) => setProgram(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Program (optional)"
        />
        <input
          type="text"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full p-2 border rounded"
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
    </div>
  );
};

export default function Page() {
  return <RegisterForm />;
}
