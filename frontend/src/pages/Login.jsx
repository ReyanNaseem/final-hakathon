import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login() {
    const [show, setshow] = useState(false)
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log("first")
    await axios.post(`${import.meta.env.VITE_BASE_URL}/login`, {
      email,
      password
    })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        toast.success(res.data.message)
        navigate('/dashboard')
      })
      .catch((err) => {
        // toast.error(err.response.data.message)
        console.log(err.response)
      })
  }

  return (
    <div className="min-h-screen flex font-poppins bg-[#EDF4F2]">
      {/* Left Side with clip-path */}
      <div className="w-1/2 bg-green-600 text-white px-16 py-10 relative clip-diagonal hidden lg:flex flex-col items-center justify-center">
        {/* <div className='mx-au'> */}
          <h1 className="text-4xl font-bold">HealthMate</h1>
          <p className="mt-4 text-sm leading-relaxed">
            Your Family’s Health, Simplified and Organized.
          </p>
        {/* </div> */}
      </div>

      {/* Right Side */}
      <div className="lg:w-1/2 w-full bg-[#EDF4F2] flex items-center justify-center p-10">
        <div className="w-full max-w-md">
          <h2 className="text-3xl text-green-600 lg:text-start text-center font-bold mb-8">Login Account</h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            <input
              type="email"
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full border-b border-green-600 bg-transparent focus:outline-none py-2 text-sm"
            />
            <div className="relative">
              <input
                type={show?"text":"password"}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Password"
                className="w-full border-b border-green-600 bg-transparent focus:outline-none py-2 text-sm pr-8"
              />
              <i onClick={()=>setshow(!show)} className={`${show?"ri-eye-off-line":"ri-eye-line"} absolute right-2 top-2 text-gray-500 cursor-pointer text-lg`}></i>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-[#31473A]"
            >
              Login Account
            </button>
          </form>

          <p className="text-sm text-gray-600 lg:text-start text-center mt-4">
            Don't have an account?{' '}
            <Link to={'/'} className="text-green-600 font-medium hover:underline">
              Sign up
            </Link>
          </p>

          

          
        </div>
      </div>
    </div>
  );
}