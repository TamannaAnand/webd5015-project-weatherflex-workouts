"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


export default function SuccessPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, update } = useSession();


  useEffect(() => {
    async function verifyAndUpdate() {
      const params = new URLSearchParams(window.location.search);
      const sessionId = params.get("session_id");
  
      if (!sessionId || !session?.user) return;
  
      try {
        const res = await fetch(`/api/payment?session_id=${sessionId}`);
        const data = await res.json();
  
        if (data.success) {
          // Update DB optimistically via next-auth
          await update({
            ...session,
            user: {
              ...session.user,
              subscriptionStatus: "Premium",
            },
          });
  
          router.push("/weatherflex/profile");
        } else {
          console.error("Payment not completed or invalid.");
        }
      } catch (error) {
        console.error("Error verifying subscription:", error);
      } finally {
        setIsLoading(false);
      }
    }
  
    verifyAndUpdate();
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