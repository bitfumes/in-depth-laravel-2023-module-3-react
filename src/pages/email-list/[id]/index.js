import http from "@/utility/http";
import { Button, Typography } from "@material-tailwind/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Show() {
  const router = useRouter();
  const [data, setData] = useState({
    subscribers: [],
    list: {},
  });

  async function getList() {
    const res = await http(`email-list/${router.query.id}`);
    const data = await res.json();

    if (res.ok) {
      setData(data);
    }
  }

  useEffect(() => {
    if (router.query.id) {
      getList();
    }
  }, [router.query]);

  return (
    <div>
      <div className="flex justify-between">
        <Typography variant="h5" className="mb-10">
          Subscriber List
        </Typography>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>

              <th scope="col" className="px-6 py-3">
                Confirmed
              </th>

              <th scope="col" className="px-6 py-3">
                Unsubscribed
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.subscribers.map((subscriber) => (
              <tr
                key={subscriber.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="w-3/12 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <b>{subscriber.name}</b>
                  <p>{subscriber.email}</p>
                </th>
                <td className="w-3/12 px-6 py-4">
                  {subscriber.confirmed_at ? "Yes" : "No"}
                </td>
                <td className="w-3/12 px-6 py-4">
                  {subscriber.unsubcribed_at ? "Yes" : "No"}
                </td>
                <td className="w-4/12 px-6 py-4">
                  <Button color="red" className="ml-2">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
