"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

const SignUpPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSignUp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("SignUp success", response.data);
      router.push("/login");
      toast.success(response.data.message);
    } catch (error) {
      console.log("SignUp failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.username.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="max-w-md mx-auto flex flex-col items-center justify-center min-h-screen py-2 px-4">
      {loading ? (
        "Processing..."
      ) : (
        <>
          <h1 className="mb-6 font-bold text-3xl">SignUp</h1>
          <hr />
          <form onSubmit={onSignUp} className="flex flex-col w-full">
            <label htmlFor="username" className="mb-2">
              Username
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:border-gray-600 text-black"
              type="text"
              id="username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="Username"
            />
            <label htmlFor="email" className="mb-2">
              Email
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:border-gray-600 text-black"
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
              className="w-full p-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:border-gray-600 text-black"
              type="password"
              id="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Password"
            />
            <button className="w-full p-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:border-gray-600">
              {buttonDisabled ? "No SignUp" : "SignUp Here"}
            </button>
          </form>
          <p>
            Already a user?{" "}
            <Link href="/login" className="underline cursor-pointer">
              Login
            </Link>{" "}
            here
          </p>
        </>
      )}
    </div>
  );
};

export default SignUpPage;
