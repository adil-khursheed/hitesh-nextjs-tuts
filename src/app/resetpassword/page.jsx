"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const restPasswordHandler = async () => {
    try {
      setLoading(true);
      await axios.put("/api/users/resetpassword", { token, password });
      toast.success("Password changed successfully!");
      router.push("/login");
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div className="max-w-md mx-auto flex flex-col items-center justify-center min-h-screen py-2 px-4">
      {loading ? (
        "Processing"
      ) : (
        <>
          <h1 className="mb-6 font-bold text-3xl">Reset Password</h1>
          <hr />
          <form onSubmit={restPasswordHandler} className="flex flex-col w-full">
            <label htmlFor="password" className="mb-2">
              New Password
            </label>
            <input
              className="w-full p-2 border text-black border-gray-300 rounded-lg mb-3 focus:outline-none focus:border-gray-600"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
            />
            <button className="w-full p-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:border-gray-600">
              Reset Password
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default ResetPasswordPage;
