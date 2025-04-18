"use client";

import React from 'react';
import { UserCircle } from 'lucide-react';

export default function Profile() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
            <div className="w-full max-w-md flex flex-col items-center">

                <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-6">
                    <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden mb-6">
                        <img
                            src="/zoro.jpeg"
                            alt="Profile picture"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <h1 className="text-3xl font-normal text-black mb-8"> Username</h1>

                <div className="w-full mb-4">
                    <div className="w-full bg-gray-200 p-4 mb-4">
                        <p className="text-xl text-black">username</p>
                    </div>

                    <div className="w-full bg-gray-200 p-4">
                        <p className="text-xl text-black">...@gamil.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
}