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
          <div className="spot__detail__cont">
            <img src={group.preview_img} alt="Spot preview" />
            <div>
              <div>
                <h2>{group.name}</h2>
                <h3>{group.group_type}</h3>
                <h3>{group.owner}</h3>
                <h3>{group.visibility ? "Public" : "Private"}</h3>
              </div>
              {user && user.id === group.owner && (
                <div>
                  <OpenModalButton
                    buttonText="Update Group"
                    modalComponent={<UpdateGroupModal group={group} />}
                  />
                  <OpenModalButton
                    buttonText="Delete Group!"
                    modalComponent={<DeleteGroupModal group={group} />}
                  />
                </div>
              )}
              <div>
                <h3>Spot Description</h3>
                <p>{group.desc}</p>
              </div>
            </div>
          </div>
          <div className="spot__reviews__cont">
            <div>
              <h3>Spot Reviews</h3>
              {user && (
                <div>
                  <button>Join Group</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    );
  }
  
  export default GroupDetail;
  