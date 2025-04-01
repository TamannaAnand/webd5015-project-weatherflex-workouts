"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSignOut from "@/utils/useSignOut";
import { User } from "next-auth"

const AdminDashboard = () => {
  const [users, setUser] = useState([]);
  const handleSignOut = useSignOut();
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Admin Dashboard
        </h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.push("/adminDashboard/create")}
            className="rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            Add User
          </button>
          <button
            onClick={handleSignOut}
            className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90"
          >
            Sign Out
          </button>
        </div>
      </div>

      <table className="w-full border-collapse border border-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">
              User ID
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Username
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Email
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Subscription Status
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{user.id}</td>
              <td className="border border-gray-300 px-4 py-2">{user.name}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">
                {user.subscriptionStatus}
              </td>
              <td className="space-x-1 border border-gray-300 px-4 py-2 text-center">
                <button
                  onClick={() => router.push(`/adminDashboard/details/${user.id}`)}
                  className="rounded bg-green-500 px-2 py-1 text-sm text-white hover:bg-green-600"
                >
                  Details
                </button>
                <button
                  onClick={() => router.push(`/adminDashboard/update/${user.id}`)}

                  className="rounded bg-blue-500 px-2 py-1 text-sm text-white hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => router.push(`/adminDashboard/delete/${user.id}`)}
                  className="rounded bg-red-500 px-2 py-1 text-sm text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
