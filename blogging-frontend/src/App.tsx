import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import Topbar from './Components/topbar';
import Sidebar from './Components/sidebar/';

function App() {
  return (
    <div className='w-screen h-screen flex bg-zinc-500 dark:bg-zinc-900'>
      <Topbar />
    </div>
  );
}

export default App;
