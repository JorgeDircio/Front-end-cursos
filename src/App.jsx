import { useState } from 'react';
import Home from './pages/Home';
import { Routes, Route } from "react-router-dom";
import Student from './pages/Student';
import NavBar from './components/NavBar';
import Teacher from './pages/Teacher';
import Course from './pages/Course';



function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student" element={<Student />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/course" element={<Course />} />
      </Routes>
    </>
  )
}

export default App
