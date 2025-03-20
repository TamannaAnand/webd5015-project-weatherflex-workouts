import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const useSignOut = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/signin");
  };

  return handleSignOut;

}

export default useSignOut;