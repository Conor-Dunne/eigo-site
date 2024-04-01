
"use client"
import { redirect } from "next/navigation";
import { useState } from 'react';
import { Locale } from '@/i18n.config';


export default function Register({
  params: { lang }
}: {
  params: { lang: Locale }
}) {


  redirect("/") //disable for now


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'USER', // Set a default role, or provide options for selection
  });

  const handleChange = (e : any ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e : any) => {
    e.preventDefault();

    // Send a POST request to your server to create a new user
    const response = await fetch(`/${lang}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      // User was successfully created, you can redirect to a success page or do something else
      // For example, you can use router.push('/success') if you have Next.js routing set up.
      console.log("User created")
    } else {
      // Handle errors here, display error messages, etc.
      console.log("Registration error")
    }
  };

  const labelStyle = "flex flex-col"
  const inputStyle = " bg-slate-200 rounded-lg p-2"

  return (
    <div className="flex flex-col justify-center items-center mt-[10%] gap-5">
      <h1 className="font-extrabold">Enter your details</h1>
      <form onSubmit={handleSubmit}
      className="flex flex-col gap-4"
      >
        <label className={labelStyle}>
          Name:
          <input className={inputStyle} type="text" name="name" value={formData.name} onChange={handleChange} required/>
        </label>
        <label  className={labelStyle}>
          Email:
          <input className={inputStyle} type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label  className={labelStyle}>
          Password:
          <input className={inputStyle} type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
        <label  className={labelStyle}>
          Role:
          <select className={inputStyle} name="role" value={formData.role} onChange={handleChange} required>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </label>
        <button className=" bg-green-500 rounded-lg p-2" type="submit">Register</button>
      </form>
    </div>
  );
}
