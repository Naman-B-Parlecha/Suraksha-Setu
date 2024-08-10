"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { TiTick } from "react-icons/ti";
import { RxCross1 } from "react-icons/rx";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../../firebase";
import { prisma } from "../../prisma";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginModal = ({ onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const appVerifier = window.recaptchaVerifier;
  const [isUserLogin, setIsUserLogin] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (!otpSent) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "normal",
          callback: (response) => {
            console.log("reCAPTCHA solved!");
            // reCAPTCHA solved, allow OTP to be sent
            // handleSendOtp();
          },
        }
      );
    }
  }, [otpSent]);

  const handleSendOtp = async () => {
    console.log("sending OTP to", phoneNumber);
    signInWithPhoneNumber(auth, `+91${phoneNumber}`, appVerifier)
      .then((confirmationResult) => {
        setConfirmationResult(confirmationResult);
        setOtpSent(true);
      })
      .catch((error) => {
        console.error("Error during OTP sending:", error);
      });
  };

  const handleOtpChange = (e) => {
    e.preventDefault();
    setOtp(e.target.value);
  };

  const handlePhoneChange = (e) => {
    e.preventDefault();
    setPhoneNumber(e.target.value);
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    if (!confirmationResult) return;

    confirmationResult
      .confirm(otp)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log("User signed in:", user);
        // Handle user login success, like closing the modal
        createUser(user);

        onClose();
      })
      .catch((error) => {
        console.error("Error during OTP verification:", error);
      });
  };

  const {
    mutate: createUser,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: async (data) => {
      // console.log("data", data.UserImp.phoneNumber);
       const res = await axios.post("/api/user", {
        phone: phoneNumber,
       });
       localStorage.setItem("user", JSON.stringify(res.data));
       router.push("/user");
      return res.data;
    },
    onSuccess: () => {
      console.log("User created successfully");
    },
    onError: () => {
      console.log("Error during user creation:", error);
    },
  });

  return (
    <>
      <title>Login</title>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="relative bg-white md:w-5/6 rounded-lg flex animate-slide-up">
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            <RxCross1 size={30} />
          </button>

          <div className="hidden md:w-1/2 md:flex items-center justify-center">
            <Image src="/login.jpg" width={500} height={500} alt="icon" />
          </div>
          <div className="w-full md:w-1/2 flex text-center flex-col justify-between p-10 md:p-20 bg-slate-100 rounded-lg">
            <div>
              <h2 className="text-3xl font-bold mb-4">Log In</h2>
              <p className="text-gray-500 mb-4">
                Enter your phone number to get started
              </p>
              <div className="relative mb-4">
                <div className="absolute top-2 left-4 text-gray-600">+91</div>
                <input
                  type="tel"
                  id="phone"
                  className="px-4 py-2 pl-12 border border-gray-400 rounded w-full"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  required
                />
              </div>
              {otpSent && (
                <div className="mb-4">
                  <input
                    type="text"
                    id="otp"
                    className="px-4 py-2 h-12 border border-gray-400 rounded-xl w-full"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={handleOtpChange}
                    required
                  />
                </div>
              )}
              <div className="flex flex-col space-y-4">
                {!otpSent ? (
                  <>
                    <button
                      type="button"
                      className="w-full bg-gradient-to-br from-[#007FF5] to-[#0003b8] p-2 text-white font-bold py-2 px-8 rounded"
                      onClick={handleSendOtp}
                    >
                      Send OTP
                    </button>
                    <div id="recaptcha-container"></div>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={handleOTPSubmit}
                    className="w-full bg-gradient-to-br from-[#007FF5] to-[#0003b8] p-2 text-white font-bold py-2 px-8 rounded"
                  >
                    Verify
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center bg-white px-2 py-3 rounded ">
                <TiTick size={24} color="green" /> &nbsp;
                <p className=" text-gray-500">Get real-time disaster alerts.</p>
              </div>
              <div className="flex items-start bg-white px-2 py-3 rounded">
                <TiTick size={24} color="green" /> &nbsp;
                <p className=" text-gray-500">
                  Best practices to stay safe during disasters.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
