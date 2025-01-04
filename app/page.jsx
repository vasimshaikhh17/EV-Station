"use client"
import List from "@/components/list/List";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/protected-route/ProtectedRoute";
import dynamic from "next/dynamic";

const Location = dynamic(() => import("../components/Location"), { ssr: false });

export default function Home() {
  const data = sessionStorage.getItem('auth')
  console.log('data: ', JSON.parse(data));
  return (
    <ProtectedRoute>
      <Navbar/>
    <div className="">
      <Location />
      <List/>
    </div>
    </ProtectedRoute>
  );
}