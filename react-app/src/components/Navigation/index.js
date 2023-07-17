import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { authenticate } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

import CreateSpotModal from "../CreateSpotModal";
import CreateGroupModal from "../CreateGroupModal";

function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout()).then(() => setIsLoaded(false));
  };

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch, isLoaded]);

  return (
    <>
      {isLoaded && (
        <div className="navbar">
          {sessionUser && (
            <ul className="navbar__user">
              <li>
                <img src={sessionUser.profile_img} />
                <p>{sessionUser.callsign}</p>
              </li>
              <li>
                <a onClick={handleLogout}>Log Out</a>
              </li>
              <li>
                <OpenModalButton
                  buttonText="Add a Spot"
                  modalComponent={<CreateSpotModal />}
                />
              </li>
              <li>
                <OpenModalButton
                  buttonText="Add a Group"
                  modalComponent={<CreateGroupModal />}
                />
              </li>
            </ul>
          )}
          <ul className="navbar__navlinks">
            <li>
              <NavLink exact to="/">
                Spots
              </NavLink>
            </li>
            <li>
              <NavLink to="/groups">Groups</NavLink>
            </li>
            {/* <li>
          <NavLink to="/favorites">Favorites</NavLink>
        </li> */}
            {!sessionUser && (
              <li className="navbar__login__signup">
                <OpenModalButton
                  buttonText="Log In"
                  modalComponent={<LoginFormModal />}
                />
                <OpenModalButton
                  buttonText="Sign Up"
                  modalComponent={<SignupFormModal />}
                />
              </li>
            )}
          </ul>
        </div>
      )}
    </>
  );
}

export default Navigation;
