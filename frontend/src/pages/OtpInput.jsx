import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OtpInput = () => {
  const length = 4;
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const inputsRef = useRef([]);
  const location = useLocation();

  const handleChange = (element, index) => {
    const val = element.value.replace(/[^0-9]/g, "");
    if (!val) return;

    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    if (index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleSubmit = async() => {
    const fullOtp = otp.join("");
    if (fullOtp.length === length) {
      try {
        console.log("first")
        const res = await axios.post(`http://localhost:8080/api/v1/users/verify`, {
          email: email,
          otp: Number(fullOtp)
        });
        localStorage.removeItem('otpEmail'); // ✅ Clear email after verification
        toast.success(res.data.message)
        navigate('/login');

      } catch (err) {
        toast.error(err.response.data.message)
      }
    } else {
      setMessage("❌ Please enter all 6 digits of the OTP.");
    }
  };

  useEffect(() => {
    const emailFromState = location.state?.email;
    if (emailFromState) {
      setEmail(emailFromState);
      localStorage.setItem('otpEmail', emailFromState); // Save for refresh
    } else {
      const emailFromStorage = localStorage.getItem('otpEmail');
      if (emailFromStorage) {
        setEmail(emailFromStorage);
      } else {
        alert("No email found. Redirecting to signup...");
        navigate('/'); // Redirect if no email
      }
    }
  }, [location.state, navigate]);

  return (
    <div className="h-screen flex items-center justify-center bg-[#EDF4F2] px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-[#31473A] mb-2">OTP Verification</h1>
        <p className="text-gray-600 mb-6">
          Please enter the 4-digit code sent to your email or phone number.
        </p>

        <div className="flex justify-center gap-2 mb-4">
          {otp.map((digit, i) => (
            <input
              key={i}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              ref={(el) => (inputRefs.current[i] = el)}
              className="w-12 h-12 text-center text-xl border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#31473A]"
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-2 bg-[#31473A] text-white font-semibold scale-95 rounded hover:scale-100 transition"
        >
          Verify OTP
        </button>

        {message && (
          <p className="mt-4 text-sm text-gray-700">{message}</p>
        )}

      </div>
    </div>
  );
};

export default OtpInput;