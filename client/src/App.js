import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/screen/Home";
import Profile from "./components/screen/Profile";
import Login from "./components/screen/Login";
import SignUp from "./components/screen/SignUp";
import CreatePost from "./components/screen/CreatePost";
import Reset from "./components/screen/Reset";
import NewPassword from "./components/screen/NewPassword";
import DusreProfile from "./components/screen/DusreProfile";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/signup">
        <SignUp />
      </Route>
      <Route exact path="/createkro">
        <CreatePost />
      </Route>
      <Route exact path="/reset">
        <Reset />
      </Route>
      <Route exact path="/reset-password/:token">
        <NewPassword />
      </Route>
      <Route exact path="/dusrekaprofile/:userid">
        <DusreProfile />
      </Route>
    </BrowserRouter>
  );
}

export default App;
