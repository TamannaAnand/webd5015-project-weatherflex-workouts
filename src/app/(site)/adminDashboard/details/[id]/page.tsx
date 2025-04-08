"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const UserDetails = () => {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (!params.id) return;
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
  }, [params.id]);

  const handleEdit = () => {
    router.push(`/adminDashboard/update/${params.id}`);
  };

  const handleGoBack = () => {
    router.push("/adminDashboard");
  };

  if (loading) return (
    <div className="p-6 max-w-md mx-auto text-center">
      <div className="animate-pulse">Loading user details...</div>
    </div>
  );
  
  if (error) return (
    <div className="p-6 max-w-md mx-auto">
      <div className="bg-red-100 p-3 rounded-md text-red-700">{error}</div>
      <button 
        onClick={handleGoBack}
        className="mt-4 bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
      >
        Go Back
      </button>
    </div>
  );

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg dark:bg-gray-800">
      <h1 className="text-2xl font-bold text-center mb-6 dark:text-white">User Details</h1>

      <div className="bg-gray-50 p-4 rounded-lg shadow-sm dark:bg-gray-700">
        <div className="mb-4">
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">ID</h2>
          <p className="text-gray-900 dark:text-white">{user?.id}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</h2>
          <p className="text-gray-900 dark:text-white">{user?.name}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h2>
          <p className="text-gray-900 dark:text-white">{user?.email}</p>
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">Subscription Status</h2>
          <p className="text-gray-900 dark:text-white">{user?.subscriptionStatus}</p>
        </div>
      </div>

      <div className="mt-6 flex space-x-4">
        <button
          onClick={handleGoBack}
          className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        >
          Back to Dashboard
        </button>
        <button
          onClick={handleEdit}
          className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Edit User
        </button>
      </div>
    </div>
  );
};

export default UserDetails;