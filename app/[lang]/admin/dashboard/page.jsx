const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import Link from "next/link";

export default async function Dashboard() {
  const getData = async (slug) => {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://eigo-site.vercel.app"
        : "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/posts`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed");
    }

    return res.json();
  };

  const posts = await getData();


  return (
    <div className="flex flex-col items-center gap-4 pt-7 mx-3">
      <h1 className=" font-bold text-4xl underline p-6">DASHBOARD</h1>
      <ul className="flex flex-col items-left gap-8">
        {posts.map((post) => (
          <li key={post.id}>
            <div className="flex gap-4 justify-between items-center ">

              <h2>{post.title}</h2>

              <Link
                href={`/admin/post-edit/${post.id}`}
                className=" bg-blue-500 p-2 rounded-lg"
              >
                Edit
              </Link>
              <div>{post.published === true ? "true" : "false"}</div>
            </div>
          </li>
        ))}
      </ul>
      <Link
        href={`/admin/post-new`}
        className=" p-5 my-6 bg-green-400 rounded-lg"
      >
        ADD POST
      </Link>
    </div>
  );
}
