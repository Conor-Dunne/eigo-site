
"use client"
import { redirect } from "next/navigation";
import { useState } from 'react';
import { Locale } from '@/i18n.config';


export default function Register({
  params: { lang }
}: {
  params: { lang: Locale }
}) {


  // redirect("/") //disable for now


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
    } else {
      // Handle errors here, display error messages, etc.
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <br />
        <label>
          Role:
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
