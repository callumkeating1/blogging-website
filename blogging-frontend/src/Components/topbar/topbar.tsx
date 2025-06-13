import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AccountSection from "./account";

export default function Topbar() {
    const [height, setHeight] = useState<number | null>(null);

    useEffect(() => {
    const handleResize = () => {
        setHeight(window.innerHeight);
    };

    handleResize(); // Run once on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
    }, []);

  if (height === null) return null;
  return (
  <motion.div
    className='bg-teal-300 rounded-xl ml-20 lg:ml-40 m-6 p-7 relative'
    initial={{ y: height / 2, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 1 }}
  >
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <h1 className='text-3xl font-bold text-gray-500'>Blogging website</h1>
    </div>
    
    <AccountSection username="guest" />
  </motion.div>
  );
}