import React from "react";

const ProfileDetails = ({ params }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>
        User Profile:{" "}
        <span className="p-2 rounded bg-orange-400 text-black">
          {params.id}
        </span>
      </p>
    </div>
  );
};

export default ProfileDetails;
