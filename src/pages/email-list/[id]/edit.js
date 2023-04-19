import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Create() {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    description: "",
  });

  async function getList(id) {
    const token = Cookies.get("token");
    const res = await fetch(`http://localhost:8000/api/email-list/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const { data } = await res.json();
    if (res.ok) {
      setForm(data);
      return;
    }

    toast.error("Check for any error!");
  }

  useEffect(() => {
    if (router.query.id) {
      getList(router.query.id);
    }
  }, [router.query]);

  async function submit() {
    const token = Cookies.get("token");
    const res = await fetch("http://localhost:8000/api/email-list", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const data = await res.json();
    if (res.ok) {
      toast.success("Email list created successfully!");
      router.push("/email-list");
      return;
    }

    toast.error("Check for any error!");
    if (data.errors) {
      setErrors(data.errors);
    }
  }

  return (
    <div className="flex justify-center w-full">
      <Card className="w-1/2">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Update Email List
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
            name="name"
            label="Name"
            size="lg"
          />
          <Input
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
            name="description"
            label="Description"
            size="lg"
          />
        </CardBody>
        <CardFooter className="pt-0">
          <Button onClick={submit} variant="gradient" fullWidth>
            Create
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
