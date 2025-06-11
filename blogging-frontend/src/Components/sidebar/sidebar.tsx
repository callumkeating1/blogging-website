import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";

export default function Sidebar() {
    const [width, setWidth] = useState<number | null>(null);

    useEffect(() => {
        setWidth(window.innerWidth);
    }, []);
    console.log(width);

    useEffect(() => {
    function handleResize() {
        setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    handleResize(); // set initial width
    return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (width === null) return null; 
    if (width >= 1024 ) {
        return (
            <motion.div className="text-3xl font-bold text-left fixed  top-0 h-full text-gray-500 bg-teal-300 rounded-xl w-32 p-2 m-6" initial={{x : -width/4}} animate={{x : 0}} transition={{ duration: 1 }}>
                
            </motion.div>
        )
    } else {
        return (
            <motion.div className="text-3xl font-bold text-left fixed top-0 h-full text-gray-500 bg-teal-300 rounded-xl w-12 p-2 m-6">

            </motion.div>
        )
    }
}