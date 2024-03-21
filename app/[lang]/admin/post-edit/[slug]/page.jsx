const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import Link from "next/link";

const EditPost = async ({ params }) => {
  const { slug } = params;

  const getData = async (slug) => {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://eigo-site.vercel.app"
        : "http://localhost:3000";

    const res = await fetch(`${baseUrl}/${"ja" || "en"}/api/posts/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed");
    }

    return res.json();
  };

  const data = await getData(slug);

  return (
    <>
      <div>
        <Link href={`/admin/dashboard`}>
          <h1>{"<<<"} Back to Dashboard</h1>
        </Link>
        <h1>EDIT POST</h1>
        <h2>{data.title}</h2>
      </div>
    </>
  );
};

export default EditPost;
