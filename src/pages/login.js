import { Button, Card, Input, Typography } from "@material-tailwind/react";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Login() {
  const router = useRouter();

  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/api/user/login", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const data = await res.json();
    if (res.ok) {
      toast.success("You are now logged in!");
      Cookies.set("token", data.token, { expires: 1 });
      router.push("/");
      return;
    } else {
      toast.error("Check for any error!");
      if (data.errors) {
        setErrors(data.errors);
      }
    }
  }

  useEffect(() => {
    if (router.query.verified) {
      toast.success("Your email has been verified. You can now login.");
    }
  }, [router.query]);

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
          <form
            onSubmit={handleSubmit}
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          >
            <div className="mb-4 flex flex-col gap-6">
              <div>
                <Input
                  value={form.email}
                  onChange={handleChange}
                  error={errors.email}
                  size="lg"
                  label="Email"
                  name="email"
                  type="email"
                />
                {errors.email && (
                  <small className="text-red-500">{errors.email[0]}</small>
                )}
              </div>

              <div>
                <Input
                  value={form.password}
                  onChange={handleChange}
                  type="password"
                  size="lg"
                  label="Password"
                  name="password"
                  error={errors.password}
                />
                {errors.password && (
                  <small className="text-red-500">{errors.password[0]}</small>
                )}
              </div>
            </div>
            <Button type="submit" className="mt-6" fullWidth>
              Login
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
