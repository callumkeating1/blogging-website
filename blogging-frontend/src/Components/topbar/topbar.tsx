import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Topbar() {
    const [height, setHeight] = useState<number | null>(null);
    let [isLarge, setValue] = useState(false);

    useEffect(() => {
    const handleResize = () => {
        setHeight(window.innerHeight);
        setValue(window.innerHeight >= 1024 ? true : false);
    };

    handleResize(); // Run once on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
    }, []);

  if (height === null) return null; // or a loading spinner
  return (
    <motion.div
      className=''
      initial={{ y: height/2, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1 className='text-3xl font-bold text-center text-gray-500 bg-teal-300 rounded-xl ml-20 lg:ml-40 m-6'>
        {isLarge ? "welcome to the website" : "welcome"}
      </h1>

    </motion.div>
  );
}