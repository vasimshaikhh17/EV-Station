"use client";

import { useEffect, useState } from "react";
import {useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const searchParams = useSearchParams()
  const mail = searchParams.get('email')

  const handleSendOtp = async () => {
    setIsLoading(true);
    setMessage("");
    setError("");


    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },    
        body: JSON.stringify({ email:mail }),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Failed to send OTP.")
        throw new Error(data.message || "Failed to send OTP.");
      }

      setIsOtpSent(true);
      toast.success("OTP sent to your email. Please check your inbox.");
    } catch (err) {
      console.log('err: ', err);      
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };  

  const handleVerifyOtp = async () => {
    setIsLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email:mail, otp }),
      });

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Failed to verify OTP.")
        throw new Error(data.message || "Failed to verify OTP.");
      }
      toast.success("Email verified successfully!");
      router.push("/auth/login");
    } catch (err) {
      toast.error("Invalid Server Response")
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="w-full max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Verify Email</h2>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={mail}
          // onChange={(e) => setEmail(e.target.value)}
          disabled={isOtpSent}
          placeholder="Enter your email address"
          required
          className="w-full px-3 py-2 border rounded shadow focus:outline-none focus:shadow-outline"
        />
      </div>
      {isOtpSent && (
        <div className="mb-4">
          <label
            htmlFor="otp"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            OTP
          </label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter the OTP"
            required
            className="w-full px-3 py-2 border rounded shadow focus:outline-none focus:shadow-outline"
          />
        </div>
      )}
      <div className="flex items-center justify-between">
        {!isOtpSent ? (
          <button
            type="button"
            onClick={handleSendOtp}
            className="btn2"
            disabled={isLoading}
          >
            {isLoading ? "Sending OTP..." : "Send OTP"}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleVerifyOtp}
            className="btn2"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        )}
      </div>
      {/* {message && <p className="mt-4 text-green-500">{message}</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>} */}
    </div>
  );
};

export default VerifyEmail;
