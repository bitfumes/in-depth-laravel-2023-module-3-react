import { Button, Card, Input, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/api/user/register", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const data = await res.json();
    if (res.ok) {
      toast.success("You are now registered!");
      router.push("/login");
      return;
    } else {
      toast.error("Check for any error!");
      if (data.errors) {
        setErrors(data.errors);
      }
    }
  }

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Sign Up
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your details to register.
          </Typography>
          <form
            onSubmit={handleSubmit}
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          >
            <div className="mb-4 flex flex-col gap-6">
              <div>
                <Input
                  value={form.name}
                  onChange={handleChange}
                  error={errors.name}
                  size="lg"
                  label="Name"
                  name="name"
                />
                {errors.name && (
                  <small className="text-red-500">{errors.name[0]}</small>
                )}
              </div>
              <div>
                <Input
                  value={form.email}
                  onChange={handleChange}
                  size="lg"
                  label="Email"
                  name="email"
                  error={errors.email}
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
              <div>
                <Input
                  value={form.password_confirmation}
                  onChange={handleChange}
                  type="password"
                  size="lg"
                  label="Confirm Password"
                  name="password_confirmation"
                  error={errors.password_confirmation}
                />
                {errors.password_confirmation && (
                  <small className="text-red-500">
                    {errors.password_confirmation[0]}
                  </small>
                )}
              </div>
            </div>
            <Button type="submit" className="mt-6" fullWidth>
              Register
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-blue-500 transition-colors hover:text-blue-700"
              >
                Log In
              </Link>
            </Typography>
          </form>
        </Card>
      </div>
    </div>
  );
}

Register.getLayout = (page) => page;

export default Register;
