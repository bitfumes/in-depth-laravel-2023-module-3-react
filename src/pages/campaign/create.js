import http from "@/utility/http";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Option,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CreateCampaign() {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [lists, setLists] = useState([]);
  const [form, setForm] = useState({
    name: "",
    subject: "",
    content: "",
    scheduled_at: "",
    from_name: "Sarthak",
    from_email: "sarthak@bitfumes.com",
    list_id: null,
  });

  async function getLists() {
    const res = await http("email-list");
    const { data } = await res.json();
    if (res.ok) {
      setLists(data);
      return;
    }

    toast.error("Check for any error!");
  }

  useEffect(() => {
    getLists();
  }, []);

  async function submit() {
    const res = await http("campaign", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      if (form.scheduled_at === "") {
        toast.success("Campaign created scheduled !");
      } else {
        toast.success("Campaign sending to all subscribers!");
      }

      router.push("/campaign");
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
            Create Campaign
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <div>
            <Select
              label="Select Subscriber List"
              name="list_id"
              value={form.list_id}
              onChange={(value) => setForm({ ...form, list_id: value })}
            >
              {lists.map((list) => (
                <Option key={list.id} value={list.id}>
                  {list.name}
                </Option>
              ))}
            </Select>
            {errors.list_id && (
              <small className="text-red-500">{errors.list_id[0]}</small>
            )}
          </div>

          <div>
            <Input
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              name="name"
              label="Name"
              size="lg"
            />
            {errors.name && (
              <small className="text-red-500">{errors.name[0]}</small>
            )}
          </div>

          <div>
            <Input
              value={form.subject}
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              name="subject"
              label="subject"
              size="lg"
            />
            {errors.subject && (
              <small className="text-red-500">{errors.subject[0]}</small>
            )}
          </div>

          <div>
            <Textarea
              label="Content"
              name="content"
              value={form.content}
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
            />
            {errors.content && (
              <small className="text-red-500">{errors.content[0]}</small>
            )}
          </div>

          <input
            type="datetime-local"
            name="scheduled_at"
            value={form.scheduled_at}
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
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
