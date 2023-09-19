"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const forgotPasswordHandler = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/forgotpassword", { email });
      toast.success("Password reset link has been sent to your email!");
      router.push("/login");
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-md mx-auto flex flex-col items-center justify-center min-h-screen py-2 px-4">
      {loading ? (
        "Processing"
      ) : (
        <>
          <h1 className="mb-6 font-bold text-3xl">Forgot Password</h1>
          <hr />
          <form
            onSubmit={forgotPasswordHandler}
            className="flex flex-col w-full">
            <label htmlFor="email" className="mb-2">
              Email
            </label>
            <input
              className="w-full p-2 border text-black border-gray-300 rounded-lg mb-3 focus:outline-none focus:border-gray-600"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <button className="w-full p-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:border-gray-600">
              Send Email
            </button>
          </form>
          <p>
            Back to{" "}
            <Link href="/login" className="underline cursor-pointer">
              Login
            </Link>{" "}
          </p>
        </>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
