"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const UserDetails = () => {
  const params = useParams();
  const router = useRouter(); // To handle navigation
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (!params.id) return; // Ensure params.id is available
        const response = await fetch(`/api/users/${params.id}`);
        if (!response.ok) throw new Error("Failed to fetch user details");
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [params.id]); // Ensure params.id is unwrapped before using

  const handleGoBack = () => {
    router.push("/adminDashboard"); // Redirect to the dashboard
  };

  if (loading) return <p>Loading user details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-4">User Details</h1>

      <div className="bg-gray-50 p-4 rounded-lg shadow-md">
        <div className="mb-4">
          <h2 className="text-lg font-medium">ID</h2>
          <p>{user?.id}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-medium">Name</h2>
          <p>{user?.name}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-medium">Email</h2>
          <p>{user?.email}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-medium">Created At</h2>
          <p>{new Date(user?.createdAt).toLocaleString()}</p>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleGoBack}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Go Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
