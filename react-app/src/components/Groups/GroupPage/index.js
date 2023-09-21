import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as GroupActions from "../../../store/groups";
import SearchBar from "../../SearchBar";

function Group() {
  const groups = useSelector((state) => Object.values(state.groups));
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(GroupActions.getAllGroupsThunk()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  const handleSpotClick = (groupId) => {
    history.push(`/groups/${groupId}`);
  };

  return (
    <div>
      <SearchBar item="Groups" />
      <div className="home__spot__cont">
        {isLoaded &&
          groups.map((group) => {
            let group_type_value = group.group_type.split("_").map((word) => {
              return " " + word[0].toUpperCase() + word.slice(1);
            });
            if (Number.isInteger(group.id)) {
              return (
                <div
                  className="spot__card cards"
                  key={group.id}
                  onClick={() => handleSpotClick(group.id)}
                >
                  <img
                    className="card__img"
                    src={group.preview_img}
                    alt="Spot preview"
                  />
                  <h2>{group.name}</h2>
                  <ul className="spot__card__details">
                    <li>{group_type_value}</li>
                    <li>{group.visibility ? "Public" : "Private"}</li>
                  </ul>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}

export default Group;
