import { Button, Card, Input, Typography } from "@material-tailwind/react";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Login
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your details to login.
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-4 flex flex-col gap-6">
              <Input size="lg" label="Email" />
              <Input type="password" size="lg" label="Password" />
            </div>
            <Button className="mt-6" fullWidth>
              Register
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Don&apos;t have an account yet?{" "}
              <Link
                href="/register"
                className="font-medium text-blue-500 transition-colors hover:text-blue-700"
              >
                Register
              </Link>
            </Typography>
          </form>
        </Card>
      </div>
    </div>
  );
}
