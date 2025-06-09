import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";

function App() {
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    setHeight(window.innerHeight);
  }, []);

  if (height === null) return null; // or a loading spinner

  return (
    <motion.div
      initial={{ y: height/2, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1 className='text-3xl font-bold text-center text-gray-500 bg-teal-300 rounded-xl m-6 p-2'>
        welcome to the blogging website!
      </h1>
    </motion.div>
  );
}

export default App;
