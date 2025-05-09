"use client";

import Image from "next/image";
import React from "react";

export default function Profile({ userName, email }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-6">
          <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden mb-6">
            <Image
              src="/zoro.jpeg"
              width={50}
              height={50}
              alt="Profile picture"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h1 className="text-3xl font-normal text-black mb-8">Information</h1>

        <div className="w-full mb-4">
          <div className="w-full bg-gray-200 p-4 mb-4">
            <p className="text-xl text-black">{userName}</p>
          </div>

          <div className="w-full bg-gray-200 p-4">
            <p className="text-xl text-black">{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
