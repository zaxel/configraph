import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return <div className="f-full h-screen flex items-center justify-center">
    <SignUp />
  </div>
}