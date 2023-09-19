"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success(`Login successful!`);
      router.push("/profile");
    } catch (error) {
      console.log("SignUp failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="max-w-md mx-auto flex flex-col items-center justify-center min-h-screen py-2 px-4">
      {loading ? (
        "Processing"
      ) : (
        <>
          <h1 className="mb-6 font-bold text-3xl">Login</h1>
          <hr />
          <form onSubmit={onLogin} className="flex flex-col w-full">
            <label htmlFor="email" className="mb-2">
              Email
            </label>
            <input
              className="w-full p-2 border text-black border-gray-300 rounded-lg mb-3 focus:outline-none focus:border-gray-600"
              type="email"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Email"
            />
            <label htmlFor="password" className="mb-2">
              Password
            </label>
            <input
              className="w-full p-2 border text-black border-gray-300 rounded-lg mb-3 focus:outline-none focus:border-gray-600"
              type="password"
              id="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Password"
            />
            <button className="w-full p-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:border-gray-600">
              {buttonDisabled ? "No Login" : "Login Here"}
            </button>
          </form>
          <p>
            Not a user?{" "}
            <Link href="/signup" className="underline cursor-pointer">
              Sign up
            </Link>{" "}
            here
          </p>
          <p className="mt-3">
            <Link href="/forgotpassword" className="underline cursor-pointer">
              Forgot Password
            </Link>
          </p>
        </>
      )}
    </div>
  );
};

export default LoginPage;
