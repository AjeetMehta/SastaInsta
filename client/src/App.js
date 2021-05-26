import React from "react";
import './App.css';
import Navbar from "./components/Navbar";
import {BrowserRouter,Route,Switch} from "react-router-dom";
import Home from "./components/screen/Home";
import Profile from "./components/screen/Profile";
import Login from "./components/screen/Login";
import SignUp from "./components/screen/SignUp";
import CreatePost from "./components/screen/CreatePost";

function App() {
  return (
    <BrowserRouter>
       <Navbar/>
       <Route exact path="/"><Home/></Route>
       <Route exact path="/profile"><Profile/></Route>
       <Route exact path="/login"><Login/></Route>
       <Route exact path="/signup"><SignUp/></Route>
       <Route exact path="/createkro"><CreatePost/></Route>
    </BrowserRouter>  
  );
}

export default App;
