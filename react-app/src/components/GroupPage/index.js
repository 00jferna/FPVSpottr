import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as GroupActions from "../../store/groups";

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
      <div className="home__search__cont">
        <input className="home__search" type="search" placeholder="Search" />
      </div>
      <div className="home__spot__cont">
        {isLoaded &&
          groups.map((group) => {
            if (Number.isInteger(group.id)) {
              return (
                <div
                  className="spot__card"
                  key={group.id}
                  onClick={() => handleSpotClick(group.id)}
                >
                  <img
                    className="spot__card__img"
                    src={group.preview_img}
                    alt="Spot preview"
                  />
                  <h2>{group.name}</h2>
                  <h4>{group.group_type}</h4>
                  <h4>{group.visibility ? "Public" : "Private"}</h4>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}

export default Group;
