import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as ProfileActions from "../../../store/profile";
import * as SpotActions from "../../../store/spots";
import * as GroupActions from "../../../store/groups";
import { useState } from "react";
import OpenModalButton from "../../OpenModalButton";
import UpdateProfile from "../UpdateProfile";

function UserProfile() {
  const { userId } = useParams();
  const currUser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.user);
  const spots = useSelector((state) => state.spots.userSpots);
  const groups = useSelector((state) => state.groups.userGroups);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ProfileActions.getUserThunk(userId))
      .then(() => dispatch(SpotActions.getUserSpotsThunk(userId)))
      .then(() => dispatch(GroupActions.getUserGroupsThunk(userId)))
      .then(() => setIsLoaded(true));
  }, [dispatch, userId]);

  return (
    isLoaded && (
      <div className="cont profile__cont">
        <div className="profile__cont__details">
          <div>
            <img src={`${user.profile_img}`} />
            <h1>{user.callsign}</h1>
            <h3>{user.username}</h3>
          </div>
          <div>
            <OpenModalButton
              buttonText="Update Profile"
              modalComponent={<UpdateProfile user={user} />}
            />
          </div>
        </div>
        <div className="profile__cont__links">
          <div className="profile__cont__spots">
            <h2>{user.callsign}'s Spots</h2>
            <div className="profile__cont_spots_details">
              {spots.map((spot) => {
                return (
                  <NavLink key={spot.id} to={`/spots/${spot.id}`}>
                    <img src={spot.preview_img} />
                    <div>
                      <h3>{spot.name}</h3>
                      <h4>{spot.spots_status}</h4>
                      <p>{spot.desc}</p>
                    </div>
                  </NavLink>
                );
              })}
            </div>
          </div>
          <div className="profile__cont__groups">
            <h2>{user.callsign}'s Groups</h2>
            <div className="profile__cont_groups_details">
              {groups.map((group) => {
                return (
                  <NavLink key={group.id} to={`/groups/${group.id}`}>
                    <img src={group.preview_img} />
                    <div>
                      <h3>{group.name}</h3>
                      <h4>{group.visibility ? "Public" : "Private"}</h4>
                      <p>{group.desc}</p>
                    </div>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default UserProfile;
