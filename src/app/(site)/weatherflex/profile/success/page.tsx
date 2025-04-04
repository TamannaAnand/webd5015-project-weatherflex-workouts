"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


export default function SuccessPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, update } = useSession();


  useEffect(() => {
    async function updateSubscription() {
      try {
        if (session?.user && session.user?.subscriptionStatus !== "Premium") {
          // update
          await update({
            ...session,
            user: {
              ...session.user,
              subscriptionStatus: "Premium",
            },
          });

          // After updating the session, redirect to profile
          router.push("/weatherflex/profile");
        }
      } catch (error) {
        console.error("Error updating subscription:", error);
      } finally {
        setIsLoading(false);
      }
    }

    updateSubscription();
  }, [session, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      {isLoading ? (
        <div>
          <h1 className="text-2xl font-bold">
            Processing your subscription...
          </h1>
          <p>Please wait while we update your account.</p>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold">Subscription activated!</h1>
          <p>Redirecting to your profile...</p>
        </div>
      )}

    </div>
  );
}