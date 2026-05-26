import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export function useSignOut(){
    const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push(process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL ?? "/");
  };

  return handleSignOut;
    
}