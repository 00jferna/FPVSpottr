import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, NavLink } from "react-router-dom";
import Home from "./components/HomePage";
import Group from "./components/Groups/GroupPage";
import Favorite from "./components//Favorites/FavoritePage";
import SpotDetail from "./components/Spots/SpotDetailPage";
import GroupDetail from "./components/Groups/GroupDetailPage";
import FavoriteDetail from "./components/Favorites/FavoriteDetailPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import UserProfile from "./components/User/Profile";
require("dotenv").config();

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <NavLink exact to="/">
        <div className="main__logo__cont">
          <img
            className="main__logo"
            src="/assets/FPVSpottr_Logo_Header_Color.png"
            alt="FPV Spottr logo"
          />
        </div>
      </NavLink>
      <div className="main__body">
        {isLoaded && (
          <div className="page__cont">
            <Switch>
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
              <Route path="/favorites/:favoriteId">
                <FavoriteDetail />
              </Route>
              <Route path="/favorites">
                <Favorite />
              </Route>
              <Route path="/users/:userId">
                <UserProfile />
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
