"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UpdateUserPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [user, setUser] = useState({ name: "", email: "", subscriptionStatus: "Free" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [paramId, setParamId] = useState<string | null>(null);

  useEffect(() => {
    const fetchParams = async () => {
      try {
        const resolvedParams = await params;
        setParamId(resolvedParams.id);
      } catch (err) {
        setError("Failed to fetch params");
      }
    };

    fetchParams();
  }, [params]);

  useEffect(() => {
    if (!paramId) return;

    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${paramId}`);
        if (!res.ok) throw new Error("Failed to fetch user details");

        const data = await res.json();
        setUser({ 
          name: data.name, 
          email: data.email, 
          subscriptionStatus: data.subscriptionStatus || "Free" 
        });
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchUser();
  }, [paramId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch(`/api/users/${paramId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!res.ok) throw new Error("Failed to update user");

      setSuccess(true);
      setTimeout(() => router.push(`/adminDashboard`), 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg dark:bg-gray-800">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Edit User</h1>

      {error && <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-md dark:bg-red-900 dark:text-red-300">{error}</div>}
      {success && <div className="p-3 mb-4 bg-green-100 text-green-700 rounded-md dark:bg-green-900 dark:text-green-300">User updated successfully!</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-300">Name</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="mt-1 p-2 border rounded w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-300">Email</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="mt-1 p-2 border rounded w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-300">Subscription Status</label>
          <select
            value={user.subscriptionStatus}
            onChange={(e) => setUser({ ...user, subscriptionStatus: e.target.value })}
            className="mt-1 p-2 border rounded w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="Free">Free</option>
            <option value="Premium">Premium</option>
          </select>
        </div>

        <div className="flex justify-between pt-2">
          <button
            type="button"
            onClick={() => router.push('/adminDashboard')}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-70 dark:bg-blue-600 dark:hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update User"}
          </button>
        </div>
      </form>
    </div>
  );
}