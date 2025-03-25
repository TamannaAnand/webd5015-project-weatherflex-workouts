"use client";
import { useParams, useRouter } from "next/navigation";

const DeleteUser = () => {
  const router = useRouter();
  const params = useParams(); // Unwrap params correctly
  const userId = params.id as string; // Ensure it's treated as a string

  const handleDelete = async () => {
    try {
      const response = await fetch("/api/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId }),
      });

      if (!response.ok) throw new Error("Failed to delete user");

      router.push("/adminDashboard"); // Redirect after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Are you sure you want to delete this user?
      </h1>
      <div className="mt-4 flex space-x-4">
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
        <button
          onClick={() => router.push("/adminDashboard")}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteUser;
