"use client";
import { useEffect, useState } from "react";
import { usePaystackPayment } from "react-paystack";

export default function UniloApp() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);

  const config = {
    reference: new Date().getTime().toString(),
    email: "okpalapatrick426@gmail.com",
    amount: 200000,
    publicKey: "pk_test_3ec3b75fc995b5503e97a9bd070a569aa90aa5be",
  };

  const initializePayment = usePaystackPayment(config);

  const handlePaymentClick = () => {
    initializePayment({
      onSuccess: () => {
        const message = encodeURIComponent("I just paid for unilo");
        window.location.href = `https://wa.me/2349024669252?text=${message}`;
      },
      onClose: () => {
        console.log("Payment closed");
      },
    });
  };

  if (!isMounted) {
    return null;
  }

  return (
    <main className="max-w-md mx-auto bg-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Recently viewed</h2>
      
      <div className="flex overflow-x-auto gap-4 pb-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="min-w-[85%] shrink-0">
            <div className="w-full h-48 bg-gray-200 rounded-2xl mb-2"></div>
            <p className="font-bold text-lg text-gray-900">Luxury Self-Contain</p>
            <p className="text-gray-500 mb-3 text-sm">Choba, Port Harcourt</p>
            
            <button 
              onClick={handlePaymentClick}
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