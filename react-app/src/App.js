import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, NavLink } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import Home from "./components/HomePage";
import Group from "./components/GroupPage";
import Favorite from "./components/FavoritePage";
import SpotDetail from "./components/SpotDetailPage";
import GroupDetail from "./components/GroupDetailPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
require('dotenv').config();

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <><NavLink exact to="/"><img className="main__logo" src="/assets/FPVSpottr_Logo_Header_Color.png"/></NavLink>
    <div className="main__body">
      {isLoaded && (
        <div className="page__cont">
          <Switch>
            <Route path="/login">
              <LoginFormPage />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/spots/:spotId">
              <SpotDetail />
            </Route>
            <Route path="/groups/:groupId">
              <GroupDetail />
            </Route>
            <Route path="/groups">
              <Group />
            </Route>
            <Route path="/favorites">
              <Favorite />
            </Route>
          </Switch>
        </div>
      )}
      <Navigation isLoaded={isLoaded} />
    </div>
    </>
  );
}

export default App;
