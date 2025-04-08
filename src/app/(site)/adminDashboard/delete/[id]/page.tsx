"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const DeleteUser = () => {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch user info to show name in confirmation
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch user");
        const data = await response.json();
        setUserName(data.name || "this user");
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  const handleDelete = async () => {
    setError("");
    
    try {
      const response = await fetch(`/api/users/[id]`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId }),
      });

      if (!response.ok) throw new Error("Failed to delete user");
      router.push("/adminDashboard");
    } catch (error) {
      setError("Failed to delete user. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Delete User
      </h1>
      
      <div className="bg-red-50 text-red-800 p-4 rounded-md dark:bg-red-900 dark:text-red-300 mb-6">
        <p>Are you sure you want to delete {userName}?</p>
        <p className="text-sm mt-2">This action cannot be undone.</p>
      </div>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <div className="flex space-x-4">
        <button
          onClick={() => router.push("/adminDashboard")}
          className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-70"
        >Delete User
        </button>
      </div>
    </div>
  );
};

export default DeleteUser;