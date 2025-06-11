import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import Sidebar from './Components/sidebar';
import Topbar from './Components/topbar';

function App() {
  return (
    <>
    <Topbar/>
    <Sidebar />
    </>
  );
}

export default App;
