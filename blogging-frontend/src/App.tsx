import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import Topbar from './Components/secondary/topbar';
import Sidebar from './Components/secondary/sidebar';

function App() {
  return (
    <div className='w-screen h-screen flex bg-white'>
      <Topbar />
    </div>
  );
}

export default App;
