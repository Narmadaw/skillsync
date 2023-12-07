import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import './App.scss';
import Header from "./components/Header/Header";
import HomePage from './pages/HomePage/HomePage';
import UserProfile from "./components/UserProfile/UserProfile";
import SelectedJob from "./components/SelectedJob/SelectedJob";
import SearchJob from "./components/SearchJob/SearchJob";
import Footer from "./components/Footer/Footer";
import Resume from "./components/Resume/Resume";


function App() {

  return (
    
      <BrowserRouter>
      <div className="app">
        <Header />
     
        <main>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/profile" element={<UserProfile />}/>
            <Route path="/:id/:title/:company/" element={<SelectedJob />}/>
            <Route path='/search' element={<SearchJob />}/>
            <Route path="/resume"element={<Resume />}></Route>
          </Routes>
        </main>
        <div className="footer">
          <Footer />
        </div>
      </div>
      </BrowserRouter>
    
  );
}

export default App;
