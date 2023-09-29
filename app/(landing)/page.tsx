import { Button } from "@/components/ui/button";
import Link from "next/link";
const LandingPage = () => {
  return (
    <div>
      <p>Landing Page (Unprotected)</p> 
      <p className="font-light">You may explore the UI without signing in, but if you want to use OpenAI you have to sign in and provide user authentication</p> 
      <div>
        <Link href="/sign-in">
          <Button>Sign in</Button>
        </Link>
        <Link href="/sign-up">
          <Button>Register</Button>
        </Link>
        <Link href="/dashboard">
          <Button>UI Demo</Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
