"use client";

import { useEffect, useState } from "react";

export default function UniloApp() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Dynamically load the Paystack script to avoid "window" errors
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = () => {
    // Check if Paystack loaded correctly on the phone
    if (typeof window !== "undefined" && (window as any).PaystackPop) {
      const paystack = new (window as any).PaystackPop();
      paystack.newTransaction({
        key: "pk_test_your_real_key_here", // REPLACE WITH YOUR TEST KEY
        email: "okpalapatrick426@gmail.com",
        amount: 200000, // ₦2,000
        onSuccess: () => {
          window.location.href = "https://wa.me/2348000000000?text=I%20paid%20for%20Unilo";
        },
        onCancel: () => console.log("User cancelled"),
      });
    } else {
      alert("Payment system is loading, please try again in a second.");
    }
  };

  if (!mounted) return null;

  return (
    <main className="max-w-md mx-auto bg-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Recently viewed</h2>
      
      {/* Airbnb Horizontal Scroll */}
      <div className="flex overflow-x-auto gap-4 pb-6 no-scrollbar">
        {[1, 2, 3].map((i) => (
          <div key={i} className="min-w-[85%] flex-shrink-0">
            <div className="w-full h-48 bg-gray-200 rounded-2xl mb-2"></div>
            <p className="font-bold text-lg text-gray-900">Luxury Self-Contain</p>
            <p className="text-gray-500 mb-3 text-sm">Choba, Port Harcourt</p>
            
            <button 
              onClick={handlePayment}
              className="w-full py-4 bg-[#FF385C] text-white font-bold rounded-xl shadow-lg active:scale-95 transition-transform"
            >
              Speak to Unilo Agent (₦2,000)
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
