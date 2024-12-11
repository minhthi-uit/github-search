import { useLoaderData } from "@remix-run/react";
import { Card } from "~/components/ui/card";

export const loader = async ({ params }: { params: { username: string } }) => {
  const response = await fetch(`https://api.github.com/users/${params.username}/repos`);
  if (!response.ok) {
    throw new Response("Failed to fetch", { status: response.status });
  }

  const repos = await response.json();
  return Response.json(repos);
};

export default function UserDetailPage() {
  const repos = useLoaderData<typeof loader>();

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Repositories</h1>
      <div className="space-y-2">
        {repos.map((repo: any) => (
          <Card key={repo.id} className="p-4">
            <h2 className="text-lg font-bold">{repo.name}</h2>
            <p>{repo.description || "No description provided"}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
