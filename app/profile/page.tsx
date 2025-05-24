"use client";
import { useState } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Dummy fetch function (replace with real API call)
const fetchProfile = async () => {
  // Simulate API response
  return {
    university: "IUT",
    department: "CSE",
    program: "BSc",
    year: "3",
    // phone: "0123456789" // do not display
  };
};

// Dummy update function (replace with real API call)
const updateProfile = async (data: any) => {
  // Simulate API update
  return data;
};

const ProfileForm = () => {
  // Commented out react-query for now due to install issues
  // const queryClient = useQueryClient();
  // const { data, isLoading } = useQuery({
  //   queryKey: ["profile"],
  //   queryFn: fetchProfile,
  // });
  // const mutation = useMutation({
  //   mutationFn: updateProfile,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
  // });

  // Fallback: useState for demo
  const [data] = useState({
    university: "IUT",
    department: "CSE",
    program: "BSc",
    year: "3",
  });
  const [form, setForm] = useState({
    university: data.university,
    department: data.department,
    program: data.program,
    year: data.year,
  });
  const [saving, setSaving] = useState(false);

  // if (isLoading) return <div className="p-6">Loading...</div>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert("Profile updated (demo only)");
    }, 800);
    // mutation.mutate(form);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md mt-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="university"
          value={form.university}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="University"
        />
        <input
          name="department"
          value={form.department}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Department"
        />
        <input
          name="program"
          value={form.program}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Program"
        />
        <input
          name="year"
          value={form.year}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Year"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default function Page() {
  return <ProfileForm />;
}
