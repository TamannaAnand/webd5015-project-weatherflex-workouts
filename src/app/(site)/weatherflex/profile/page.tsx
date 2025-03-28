"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Pricing from "@/components/Pricing";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = session?.user?.id;

  const handleUpgrade = () => {
    router.push("/pricing");
  };

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
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
  }, [userId]);

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-500">Error: {error}</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4 text-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-900">Profile Page</h1>
      <div className="mt-6 bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-left">
        <p className="text-lg font-semibold text-gray-700">User ID: <span className="font-normal">{user?.id ?? "N/A"}</span></p>
        <p className="text-lg font-semibold text-gray-700">Name: <span className="font-normal">{user?.name ?? "N/A"}</span></p>
        <p className="text-lg font-semibold text-gray-700">Email: <span className="font-normal">{user?.email ?? "N/A"}</span></p>
      </div>
      
      <div className="mt-10 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-900">Upgrade Your Plan</h2>
        <p className="mt-2 text-gray-600">Choose a plan that suits you best!</p>
        <button 
          onClick={handleUpgrade} 
          className="mt-4 px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Upgrade to Premium
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
