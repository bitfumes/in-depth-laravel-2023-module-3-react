import http from "@/utility/http";
import { Button, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Campaign() {
  const [Campaigns, setCampaigns] = useState([]);

  async function getCampaigns() {
    const res = await http("campaign");

    const { data } = await res.json();
    if (res.ok) {
      setCampaigns(data);
      return;
    }

    toast.error("Check for any error!");
  }

  async function destroy(id) {
    const res = await http(`campaign/${id}`, { method: "DELETE" });

    if (res.ok) {
      setCampaigns(Campaigns.filter((list) => list.id !== id));
      return;
    }

    toast.error("Check for any error!");
  }

  useEffect(() => {
    getCampaigns();
  }, []);

  async function sendNow(campaign) {
    if (campaign.status === 1) return;
    const res = await http(`campaign/${campaign.id}/send`, { method: "POST" });
    if (res.ok) {
      toast.success("Campaign sent successfully");
      setCampaigns(
        Campaigns.map((camp) => {
          if (camp.id === campaign.id) {
            camp.status = 1;
          }
          return camp;
        })
      );
      return;
    }

    toast.error("Check for any error!");
  }

  return (
    <div>
      <div className="flex justify-between">
        <Typography variant="h5" className="mb-10">
          Campaigns
        </Typography>

        <Link href="/campaign/create" className="flex flex-col justify-center">
          <Button variant="outlined">New Campaign</Button>
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
                Subscriber List
              </th>
              <th scope="col" className="px-6 py-3">
                Subject
              </th>

              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {Campaigns.map((campaign) => (
              <tr
                key={campaign.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="w-3/12 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <Link href={`/email-campaign/${campaign.id}`}>
                    {campaign.name}
                  </Link>
                </th>
                <td className="w-2/12 px-6 py-4">{campaign.list?.name}</td>
                <td className="w-2/12 px-6 py-4">{campaign.subject}</td>
                <td className="w-2/12 px-6 py-4">
                  {campaign.status ? "Sent" : "In Draft"}
                </td>
                <td className="w-4/12 px-6 py-4">
                  <Button
                    disabled={campaign.status}
                    onClick={() => sendNow(campaign)}
                    color="blue"
                  >
                    Send Now
                  </Button>

                  <Button
                    onClick={() => destroy(campaign.id)}
                    color="red"
                    className="ml-2"
                  >
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
