"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UpdateUserPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [user, setUser] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [paramId, setParamId] = useState<string | null>(null);

  useEffect(() => {
    const fetchParams = async () => {
      try {
        const resolvedParams = await params;
        setParamId(resolvedParams.id); // Unwrap the params to get the id
      } catch (err) {
        setError("Failed to fetch params");
      }
    };

    fetchParams();
  }, [params]);

  useEffect(() => {
    if (!paramId) return; // Don't fetch user if paramId is not yet available

    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${paramId}`);
        if (!res.ok) throw new Error("Failed to fetch user details");

        const data = await res.json();
        setUser({ name: data.name, email: data.email });
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchUser();
  }, [paramId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors before submission
    setSuccess(false);

    try {
      const res = await fetch(`/api/users/${paramId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!res.ok) throw new Error("Failed to update user");

      setSuccess(true); // Show success message if update is successful
      setTimeout(() => router.push(`/adminDashboard`), 1500); // Delay navigation
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold">Edit User</h1>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">User updated successfully!</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading} // Disable button during loading
        >
          {loading ? "Updating..." : "Update User"}
        </button>
      </form>
    </div>
  );
}
