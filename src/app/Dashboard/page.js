'use client';

import { useState } from 'react';

export default function SimpleFeedPulseDashboard() {
  const [selectedPlatform, setSelectedPlatform] = useState('');
  
  const commentData = [
    { id: 1, comment: "J'adore ce produit ! .............", platform: "Amazon" },
    { id: 2, comment: "J'adore ce produit ! .............", platform: "Amazon" },
    
  ];
    
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      <header className="flex justify-between items-center p-4 bg-white shadow">
        <h1 className="text-xl font-bold text-gray-800">FEED PULSE</h1>
        <button className="bg-black text-white px-4 py-2 rounded text-sm">
          Add Data
        </button>
      </header>
      
      
      <div className="flex flex-1">
        
        <aside className="w-48 bg-white shadow-md">
          <nav className="py-6">
            <ul className="space-y-2">
              <li>
                <a href="" className="block px-6 py-3 text-gray-700 hover:bg-gray-100">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="" className="block px-6 py-3 text-gray-700 hover:bg-gray-100 bg-gray-100">
                  Metrics
                </a>
              </li>
              <li>
                <a href="" className="block px-6 py-3 text-gray-700 hover:bg-gray-100">
                  Profil
                </a>
              </li>
              <li className="border-t border-gray-200 mt-6 pt-4">
                <a href="" className="block px-6 py-3 bg-gray-800 text-white">
                  LOGOUT
                </a>
              </li>
            </ul>
          </nav>
        </aside>
        
        
        <main className="flex-1 p-6">
          
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="grid grid-cols-2 gap-4 p-6">
              <div className="text-lg font-medium text-gray-900">commentaire</div>
              <div className="text-lg font-medium text-gray-900">Platform</div>
            </div>
            <div className="border-t border-gray-200">
              {commentData.map((item) => (
                <div key={item.id} className="grid grid-cols-2 gap-4 p-6 border-b border-gray-200">
                  <div className="text-sm text-gray-800">{item.comment}</div>
                  <div className="text-sm text-gray-800">{item.platform}</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}