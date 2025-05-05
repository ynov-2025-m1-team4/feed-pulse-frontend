'use client';

import Link from "next/link";

// import { useState } from 'react';

export default function SimpleFeedPulseDashboard() {
  // const [selectedPlatform, setSelectedPlatform] = useState('');
  
  // const commentData = [
  //   { id: 1, comment: "J'adore ce produit ! .............", platform: "Amazon" },
  //   { id: 2, comment: "J'adore ce produit ! .............", platform: "Amazon" },
    
  // ];
    
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      {/* <header className="flex justify-between items-center p-4 bg-white shadow">
        <h1 className="text-xl font-bold text-gray-800">FEED PULSE</h1>
        <button className="bg-black text-white px-4 py-2 rounded text-sm">
          Add Data
        </button>
      </header> */}
      
      
      <div className="flex flex-1">
        
        {/* <aside className="w-48 bg-white shadow-md">
          <nav className="py-6">
            <ul className="space-y-2">
              <li>
                <Link href="/" className="block px-6 py-3 text-gray-700 hover:bg-gray-100">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/metrics" className="block px-6 py-3 text-gray-700 ">
                  Metrics
                </Link>
              </li>
              <li>
                <Link href="/profil" className="block px-6 py-3 text-gray-700 hover:bg-gray-100">
                  Profil
                </Link>
              </li>
              <li className="border-t border-gray-200 mt-6 pt-4">
                <Link href="" className="block px-6 py-3 bg-gray-800 text-white">
                  LOGOUT
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
         */}
        
      </div>
    </div>
  );
}