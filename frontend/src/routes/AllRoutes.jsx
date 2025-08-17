import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home,About,Skills,Projects,IndividualProject,Contact } from '../pages/indexPages';

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />}/>
      <Route path="/skills" element={<Skills />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/project/:projectId" element={<IndividualProject/>} />
      <Route path="/contact" element={<Contact/>}/>
    </Routes>
  );
};
