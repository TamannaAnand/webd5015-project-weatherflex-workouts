'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SuccessPage = () => {
  const router = useRouter();
  const [updateStatus, setUpdateStatus] = useState<'loading' | 'success' | 'error'>('loading');

  // Update the subscription status in the database when the page loads
  useEffect(() => {
    const updateSubscriptionStatus = async () => {
      try {
        // First, get the user session to obtain email/id
        const sessionRes = await fetch("/api/auth/session");
        if (!sessionRes.ok) throw new Error("Failed to fetch session");
        
        const sessionData = await sessionRes.json();
        const userEmail = sessionData.user?.email;
        
        if (!userEmail) {
          throw new Error("User email not found in session");
        }

        // Then update the subscription status
        const updateRes = await fetch("/api/subscription", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userEmail,
            subscriptionStatus: "Premium" // Set to Premium since payment was successful
          }),
        });

        if (!updateRes.ok) {
          throw new Error("Failed to update subscription status");
        }

        setUpdateStatus('success');
      } catch (error) {
        console.error("Error updating subscription:", error);
        setUpdateStatus('error');
      }
    };

    updateSubscriptionStatus();
  }, []);

  const handleRedirect = () => {
    router.push("/weatherflex");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Success!</h1>
      
      {updateStatus === 'loading' && (
        <p className="mt-4 text-lg">Updating your subscription status...</p>
      )}
      
      {updateStatus === 'success' && (
        <p className="mt-4 text-lg">Your subscription has been successfully activated!</p>
      )}
      
      {updateStatus === 'error' && (
        <p className="mt-4 text-lg text-red-500">
          Your payment was successful, but we could not update your profile. 
          Please contact support if premium features are not available.
        </p>
      )}
      
      <button 
        onClick={handleRedirect} 
        className="mt-4 px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default SuccessPage;