"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Navbar = () => {
  const router = useRouter();
  const {user} = JSON.parse( sessionStorage.getItem('auth'))
  console.log('user: ', user);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });  
      const data = await response.json();  
      if (response.ok) {
        sessionStorage.clear()
        toast.success("Logout successfully")
        console.log(data.message);
        router.push("/auth/login");
      } else {
        // Handle any errors
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  
  return (
    <nav className="flex justify-between items-center bg-global px-6 py-2">
      <Link href={"/"} className="text-white font-bold">
        Logo
      </Link>
      <Link href={"/addTopic"} className="bg-white px-2 py-1 rounded ">
        Signin
      </Link>
      <div className="relative group inline-block">
      <Link href="/" className="bg-white px-2 py-2 rounded-full h-8 w-8 block">

      </Link>
      <div className="z-20 absolute right-0 mt-2 w-52 p-4 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
        <p className="text-gray-900 font-semibold">{user.firstName+' '+user.lastName}</p>
        <p className="text-gray-600">Vehicle: Tesla Model S</p>
        <p className="text-gray-600">Preferred Customer</p>
        <div className="mt-2">
        <button onClick={handleLogout} className="btn3">logout</button>
        </div>
      </div>
    </div>
    </nav>
  );
};

export default Navbar;
