//Add User Page
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState("Free");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subscriptionStatus }),
        // body: JSON.stringify({ name, email}),

      });

      if (!response.ok) throw new Error("Failed to add user");

      router.push("/adminDashboard"); // Redirect to admin dashboard after success
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
        Create User
      </h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Name</label>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Subscription Status</label>
          <select
            value={subscriptionStatus}
            onChange={(e) => setSubscriptionStatus(e.target.value)}
            className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Free">Free</option>
            <option value="Premium">Premium</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-200"
        >
          Create User
        </button>
      </form>
    </div>
  );
};

export default CreateUser;