import React from "react";

const Login = () => {
  return (
    <div className="flex h-screen">
      {/* Left Section - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-10">
        <a href="/dashboard" className="text-sm text-gray-500 mb-6">
          &larr; Back to dashboard
        </a>
        <h2 className="text-3xl font-bold mb-2">Sign In</h2>
        <p className="text-gray-500 mb-6">
          Enter your email and password to sign in!
        </p>

        <div className="flex gap-4 mb-6">
          <button className="flex-1 flex items-center justify-center gap-2 border rounded-md py-2">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
            Sign in with Google
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 border rounded-md py-2">
            <img src="https://www.svgrepo.com/show/508806/twitter.svg" alt="X" className="w-5 h-5" />
            Sign in with X
          </button>
        </div>

        <div className="relative text-center my-4">
          <hr className="border-gray-300" />
          <span className="absolute bg-white px-3 text-sm text-gray-500 left-1/2 transform -translate-x-1/2 -top-2">
            Or
          </span>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="info@gmail.com"
              className="w-full border rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="form-checkbox" />
              Keep me logged in
            </label>
            <a href="#" className="text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
            Sign In
          </button>

          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </p>
        </form>
      </div>

      {/* Right Section - Info */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-[#0f172a] text-white relative">
        <div className="text-center px-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-blue-600 p-2 rounded-md">
              <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h4l3 8 4-16 3 8h4" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold">TailAdmin</h1>
          </div>
          <p className="text-sm text-gray-300">
            Free and Open-Source Tailwind CSS Admin Dashboard Template
          </p>
        </div>

        {/* Grid background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-10 grid grid-cols-12 grid-rows-6 gap-4 z-0" />

        {/* Theme switch icon */}
        <div className="absolute bottom-6 right-6">
          <button className="bg-blue-600 p-3 rounded-full hover:bg-blue-700">
            <svg className="w-5 h-5 text-white" fill="none" stroke="white" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m6.364 1.636l-.707.707M21 12h-1m-1.636 6.364l-.707-.707M12 21v-1m-6.364-1.636l.707-.707M3 12h1m1.636-6.364l.707.707" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
