"use client";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { use, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineLoading3Quarters } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const { signIn, signInWithGoogle, loading, user, setLoading } =
    useContext(AuthContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/"; // CHANGED: Access 'from' via searchParams
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => { // <--- ADD THIS FUNCTION
    setShowPassword(prev => !prev);
  };

  // form submit handler

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(errors);

  console.log(errors);

  /*   if (loading) return <LoadingSpinner />;
  if (user) return <Navigate to={from} replace={true} />; */

  // form submit handler
  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      //User Login
      await signIn(email, password);
      router.replace(from);
      toast.success("Login Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  // Handle Google Signin
  const handleGoogleSignIn = async () => {
    try {
      //User Registration using google
      await signInWithGoogle();
      router.replace(from);
      toast.success("Login Successful");
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err?.message);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Log In</h1>
          <p className="text-sm text-gray-400">
            Sign in to access your account
          </p>
        </div>
        {/* form start  */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate=""
          action=""
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Za-z][A-Za-z0-9]*@[A-Za-z]+\.[A-Za-z]{2,}$/,

                    message: "Invalid email address",
                  },
                })}
                data-temp-mail-org="0"
              />
              {errors.email && (
                <p className="text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Password
                </label>
              </div>
             <div className="relative"> 
    <input
      type={showPassword ? "text" : "password"} // Dynamic type toggle
      id="password"
      autoComplete="new-password"
      placeholder="*******"
      className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900 pr-10" // Added pr-10 for icon space
      {...register("password", {
        required: "Password is required",
        pattern: {
          value:
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
          message:
            "Password must be 6+ chars, include uppercase, lowercase, number & special char",
        },
      })}
    />
    
    {/* Toggle Button/Icon */}
    <div
      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer text-gray-600"
      onClick={togglePasswordVisibility}
    >
      {showPassword ? (
        <AiOutlineEye size={20} /> // Icon for visible password
      ) : (
        <AiOutlineEyeInvisible size={20} /> // Icon for hidden password
      )}
    </div>
  </div>
              {errors.password && (
                <p className="text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-red-500  w-full rounded-md py-3 text-white"
            >
              {loading ? (
                <AiOutlineLoading3Quarters className="animate-spin m-auto" />
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </form>
        <div className="space-y-1">
          <button className="text-xs hover:underline hover:text-red-500  text-gray-400 cursor-pointer">
            Forgot password?
          </button>
        </div>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Login with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer"
        >
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </div>
        <p className="px-6 text-sm text-center text-gray-400">
          Don&apos;t have an account yet?{" "}
          <Link
            state={from}
            href="/register"
            className="hover:underline hover:text-red-500 text-gray-600"
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
