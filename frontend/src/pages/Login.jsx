import { FaGithub, FaTwitter, FaLinkedin, FaDiscord } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { BsGithub } from 'react-icons/bs';
import { AiOutlineEyeInvisible } from 'react-icons/ai';

const Signup = ()=> {
  return (
    <div className="h-[100vh] w-full flex font-sans">
      {/* Left Side */}
      <div className="w-1/2 h-full m-0 bg-[#2C6DD2] text-white flex flex-col justify-between p-10">
        <div>
          <h1 className="text-4xl font-bold">LOREM IPSUM DOLOR</h1>
          <p className="mt-4 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis cursus gravida ac.
          </p>
        </div>
        <div className="flex gap-6 text-2xl">
          <FaGithub className="cursor-pointer" />
          <FaTwitter className="cursor-pointer" />
          <FaLinkedin className="cursor-pointer" />
          <FaDiscord className="cursor-pointer" />
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 bg-white flex items-center justify-center p-10">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6">Create Account</h2>
          <form className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border-b border-gray-400 outline-none py-2"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full border-b border-gray-400 outline-none py-2"
              />
            </div>
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="w-full border-b border-gray-400 outline-none py-2 pr-8"
              />
              <AiOutlineEyeInvisible className="absolute right-2 top-3 text-gray-500" />
            </div>

            <button
              type="submit"
              className="w-full bg-[#2C6DD2] text-white py-2 rounded-md font-semibold"
            >
              Create Account
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-600">
            Already have an account?{' '}
            <span className="text-blue-600 cursor-pointer">Log in</span>
          </p>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-sm text-gray-500">or Sign In with</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <div className="flex gap-4">
            <button className="flex items-center gap-2 border border-gray-400 px-4 py-2 rounded-md w-full justify-center">
              <FcGoogle className="text-xl" />
              <span className="text-sm">Sign up with Google</span>
            </button>
            <button className="flex items-center gap-2 border border-gray-400 px-4 py-2 rounded-md w-full justify-center">
              <BsGithub className="text-xl" />
              <span className="text-sm">Sign up with Github</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;