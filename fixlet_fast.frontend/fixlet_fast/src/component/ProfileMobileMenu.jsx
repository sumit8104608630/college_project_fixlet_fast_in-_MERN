import React from 'react';
import { X, HelpCircle, LogOut, Calendar } from 'lucide-react';

function ProfileMobileMenu({ isOpen, onClose }) {


  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-20"
        onClick={onClose}
      />

      {/* Profile Popup */}
      <div className="fixed bottom-1/2 left-1/2 transform -translate-x-1/2 z-30 w-80 max-w-[90vw]">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200">
          {/* Header with close button */}
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Profile Menu</h3>
            <button
              onClick={()=>onClose(false)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} className="text-gray-600" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button
              onClick={() => handleMenuClick('Help Center')}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
            >
              <HelpCircle size={22} className="text-blue-600" />
              <span className="text-gray-700 font-medium">Help Center</span>
            </button>

            <button
              onClick={() => handleMenuClick('My Booking')}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
            >
              <Calendar size={20} className="text-green-600" />
              <span className="text-gray-700 font-medium">My Booking</span>
            </button>

            <button
              onClick={() => handleMenuClick('Logout')}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left border-t border-gray-100"
            >
              <LogOut size={22} className="text-red-600" />
              <span className="text-gray-700 font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileMobileMenu;