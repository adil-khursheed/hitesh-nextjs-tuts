"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const [data, setData] = useState("nothing");
  const router = useRouter();

  const logoutHandler = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful!");
      router.push("/login");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <h3 className="py-2 px-4 rounded bg-green-700 mt-3">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h3>
      <hr />
      <button
        onClick={logoutHandler}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className="bg-emerald-500 mt-4 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded">
        Get User Details
      </button>
    </div>
  );
};

export default ProfilePage;
