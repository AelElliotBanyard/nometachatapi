"use client";
import api from "@/utils/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await api.register({ name, email, password });
    if (response.data.success) {
      router.push("/login");
    } else {
      alert(response.data.message);
    }
  };
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-5">
      <h1 className="text-2xl">Register</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name..."
          className="outline outline-2 outline-white bg-transparent rounded outline-none focus:outline-white focus:bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 to-indigo-500 focus:placeholder:text-white p-1"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email..."
          className="outline outline-2 outline-white bg-transparent rounded outline-none focus:outline-white focus:bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 to-indigo-500 focus:placeholder:text-white p-1"
        />
        <input
          type="password"
          value={password}
          placeholder="Password..."
          onChange={(e) => setPassword(e.target.value)}
          className="outline outline-2 outline-white bg-transparent rounded outline-none focus:outline-white focus:bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 to-indigo-500 focus:placeholder:text-white p-1"
        />
        <button
          type="submit"
          className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 to-indigo-500 flex items-center justify-center py-2 rounded-md"
        >
          Register
        </button>
      </form>
      <p>
        Already have an Account?{" "}
        <Link href="/login" className="text-blue-500">
          Login
        </Link>
      </p>
    </div>
  );
};

export default page;
