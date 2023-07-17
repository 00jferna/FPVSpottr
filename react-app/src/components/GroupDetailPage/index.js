import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as GroupActions from "../../store/groups";
import OpenModalButton from "../OpenModalButton";
import DeleteGroupModal from "../DeleteGroupModal";
import UpdateGroupModal from "../UpdateGroupModal";

function GroupDetail() {
  const { groupId } = useParams();
  const dispatch = useDispatch();
  const group = useSelector((state) => state.groups.groupDetail);
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(GroupActions.getGroupDetailsThunk(groupId)).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch, groupId]);

  return (
    isLoaded && (
      <div>
        <div className="spot__cont">
          <div className="spot__detail__cont">
            <img src={group.preview_img} alt="Spot preview" />
            <div className="spot__detail">
              <div className="spot__name__list">
                <h2>{group.name}</h2>
                <ul>
                  <li>{group.group_type.toUpperCase()}</li>
                  <li>{group.owner.callsign}</li>
                  <li>{group.visibility ? "Public" : "Private"}</li>
                </ul>
              </div>
              {user && user.id === group.owner.id && (
                <div className="spot__actions">
                  <OpenModalButton
                    buttonText="Update Group"
                    modalComponent={<UpdateGroupModal group={group} />}
                  />
                  <OpenModalButton
                    buttonText="Delete Group"
                    modalComponent={<DeleteGroupModal group={group} />}
                  />
                </div>
              )}
              <h3>Group Description</h3>
              <div className="spot__desc">
                <p>{group.desc}</p>
              </div>
            </div>
          </div>
        </div>
        {group.visibility && (
          <div className="spot__reviews__cont">
            <div>
              <h3>Members</h3>
              {user && (
                <div>
                  <a
                    onClick={() => {
                      alert(`Feature coming Soon!`);
                    }}
                  >
                    Join Group
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
  );
}

export default GroupDetail;
