"use client"
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { signup } from '@/lib/store/features/users/userSlice';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state);
  // console.log('error:here on page ', error);
  // console.log('isLoading, error: ', isLo,ading, error);

  const [formData, setFormData] = useState  ({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    gender: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.success("Passwords don't match");
      return;
    }

    dispatch(signup({ formData, router })); // Dispatch signup thunk
  };
  return (
    <div>
    <div className="w-full max-w-3xl mx-auto bg-white p-4 rounded-lg hover:shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className='flex gap-2'>
        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-bold mb-[4px]" htmlFor="name">
           First Name  
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name='firstName'
            type="text"
            placeholder="First name"
            required       
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-bold mb-[4px]" htmlFor="name">
           Last Name  
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="lastName"
            type="text"
            placeholder="Last name"
            required
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        </div>
        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-bold mb-[4px]" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-bold mb-[4px]" htmlFor="email">
            Phone Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="number"
            name="phoneNumber"
            type="number"
            placeholder="Enter your Phone number"
            required
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
            <label htmlFor="gender" className="block text-gray-700 text-sm font-bold mb-[4px]">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              required
              value={formData.gender}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="" disabled>
                Select your gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
          </div>

        <div className="mb-3 relative">
          <label className="block text-gray-700 text-sm font-bold mb-[4px]" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            required
            value={formData.password}
            onChange={handleChange}
          />
            <button
              type="button"
              onClick={() => setIsPasswordVisible((prev) => !prev)}
              className="absolute inset-y-0 right-0 flex items-center px-3 top-6 text-gray-700"
            >
              {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
        </div>
        <div className="mb-3 relative">
          <label className="block text-gray-700 text-sm font-bold mb-[4px]" htmlFor="confirm-password">
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="confirm-password"
            name="confirmPassword"
            value={formData.confirmPassword}
            type={isConfirmPasswordVisible ? "text" : "password"}
            placeholder="Confirm your password"
            required
            onChange={handleChange}
          />
            <button
              type="button"
              onClick={() => setIsConfirmPasswordVisible((prev) => !prev)}
              className="absolute inset-y-0 right-0 flex items-center px-3 top-6 text-gray-700"
            >
              {isConfirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
        </div>
        <div className="w-full flex justify-center">
          <button className="btn2" type="submit">
           {isLoading ? 'loading...' : 'Sign Up'}
          </button>
        </div>
        <div className="flex justify-between items-center gap-5 mt-3">
          <Link
            className="inline-block align-baseline font-bold text-[12px] text-blue-500 hover:text-blue-800"
            href="/auth/login"
          >
            Already have an account? <br />
            Sign In
          </Link>
          {/* <a
            className="inline-block align-baseline font-bold text-[12px] text-blue-500 hover:text-blue-800"
            href="#"
          >
            Forgot Password?
          </a> */}
        </div>
      </form>
    </div>
  </div>
  
  )
}

export default Signup