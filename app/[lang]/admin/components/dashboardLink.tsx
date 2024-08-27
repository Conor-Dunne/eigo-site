import Link from "next/link";


export default function DashboardLink() {


    return (
        <Link 
        className=" bg-blue-600 text-white p-3 rounded-md"
        href={`/admin/dashboard`}>
        <h1>{"<<"} Back to Dashboard</h1>
      </Link>
    )
  }