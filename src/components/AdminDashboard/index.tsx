"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSignOut from "@/utils/useSignOut";
import { User } from "next-auth"

const AdminDashboard = () => {
  const [users, setUsers] = useState([]); // Fixed variable name
  const handleSignOut = useSignOut();
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        setUsers(data); // Fixed variable name
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
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

      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                User ID
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                Username
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                Email
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                Subscription Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{user.id}</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{user.name}</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{user.email}</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  {user.subscriptionStatus}
                </td>
                <td className="px-4 py-3 text-sm space-x-2">
                  <button
                    onClick={() => router.push(`/adminDashboard/details/${user.id}`)}
                    className="rounded bg-green-500 px-2 py-1 text-xs text-white hover:bg-green-600"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => router.push(`/adminDashboard/update/${user.id}`)}
                    className="rounded bg-blue-500 px-2 py-1 text-xs text-white hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => router.push(`/adminDashboard/delete/${user.id}`)}
                    className="rounded bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;