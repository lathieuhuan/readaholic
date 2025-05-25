import { Button } from "@lib/components/button";
import { Link } from "@components/link";

export function WelcomePage() {
  return (
    <div>
      <h1 className="text-4xl font-bold">Welcome</h1>

      <div className="flex gap-2">
        <Link href="/login">
          <Button>Login</Button>
        </Link>
        <Link href="/register">
          <Button>Register</Button>
        </Link>
      </div>
    </div>
  );
}
