const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import Link from "next/link";

export default async function Dashboard() {
  const getData = async (slug) => {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://eigo-site.vercel.app"
        : "http://localhost:3000";

    const res = await fetch(`${baseUrl}/${"ja" || "en"}/api/posts`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed");
    }

    return res.json();
  };

  const posts = await getData();

  return (
    <div className="flex flex-col items-center gap-4 pt-7">
      <h1>DASHBOARD</h1>
      <ul className="flex flex-col items-left gap-8">
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/admin/post-edit/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
