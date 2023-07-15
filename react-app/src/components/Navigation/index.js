import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import "./Navigation.css";
import CreateSpotModal from "../CreateSpotModal";
import CreateGroupModal from "../CreateGroupModal";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  

  return (
    <div className="navbar">
      <ul>
        {sessionUser && (
          <li>
            <OpenModalButton
            buttonText="Add a Spot"
            modalComponent={<CreateSpotModal/>}/>
          </li>
        )}
        {sessionUser && (
          <li>
          <OpenModalButton
          buttonText="Add a Group"
          modalComponent={<CreateGroupModal/>}/>
        </li>
        )}
        <li>
          <NavLink exact to="/">
            Spots
          </NavLink>
        </li>
        <li>
          <NavLink to="/groups">Groups</NavLink>
        </li>
        <li>
          <NavLink to="/favorites">Favorites</NavLink>
        </li>
        {isLoaded && (
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navigation;
