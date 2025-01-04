"use client"
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { login } from '@/lib/store/features/users/userSlice';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Login = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const dispatch = useAppDispatch()
  const { user, isLoading, error } = useAppSelector((state) => state);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login({formData,router}))  // Dispatch login thunk
  }
  return (
    <div>
      <div className="w-full max-w-3xl mx-auto bg-white p-4 rounded-lg hover:shadow-md">
    <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="block text-gray-700 text-sm font-bold mb-2" for="email">
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3 relative">
  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
    Password
  </label>
  <input
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-0 leading-tight focus:outline-none focus:shadow-outline"
    id="password"
    name="password"
    placeholder="Enter your password"
    onChange={handleChange}
    type={isPasswordVisible ? "text" : "password"}
    required
  />
  <button
    type="button"
    onClick={() => setIsPasswordVisible((prev) => !prev)}
    className="absolute inset-y-0 right-0 flex items-center px-3 top-6 text-gray-700"
  >
    {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
  </button>
</div>

      <div className='w-full flex justify-center'>
      <button
          className="btn2"
          type="submit"
        >
                  {isLoading ? 'Logging In...' : 'Log In'}

        </button>

        </div>
        <div className='flex justify-between items-center gap-5 mt-3'>
        <Link
          className="inline-block align-baseline font-bold text-[12px] text-blue-500 hover:text-blue-800"
          href="/auth/signup"
        >
        doesn&apos;t have an account? <br />Signup
        </Link>
        <a
          className="inline-block align-baseline font-bold text-[12px] text-blue-500 hover:text-blue-800"
          href="/auth/forgot-password"
        >
          Forgot Password?
        </a>
        </div>
    </form>
      </div>
    </div>
  )
}

export default Login