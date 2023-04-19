import { Button, Typography } from "@material-tailwind/react";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Emailist() {
  const [lists, setLists] = useState([]);

  async function getLists() {
    const token = Cookies.get("token");
    const res = await fetch("http://localhost:8000/api/email-list", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });

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

  return (
    <div>
      <div className="flex justify-between">
        <Typography variant="h5" className="mb-10">
          Email List
        </Typography>

        <Link
          href="/email-list/create"
          className="flex flex-col justify-center"
        >
          <Button variant="outlined">New List</Button>
        </Link>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {lists.map((list) => (
              <tr
                key={list.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {list.name}
                </th>
                <td className="px-6 py-4">{list.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
