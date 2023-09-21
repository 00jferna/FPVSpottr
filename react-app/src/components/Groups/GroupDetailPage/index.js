import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as GroupActions from "../../../store/groups";
import * as MemberActions from "../../../store/members";
import OpenModalButton from "../../OpenModalButton";
import DeleteModal from "../../DeleteModal";
import UpdateGroupModal from "../UpdateGroupModal";
import EditMemberModal from "../../Members/EditMemberModal";

function GroupDetail() {
  const { groupId } = useParams();
  const dispatch = useDispatch();
  const group = useSelector((state) => state.groups.groupDetail);
  const members = useSelector((state) => state.members.members);
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [membersLoaded, setMembersLoaded] = useState(false);

  useEffect(() => {
    dispatch(GroupActions.getGroupDetailsThunk(groupId))
      .then(() => dispatch(MemberActions.getMembersThunk(groupId)))
      .then(() => {
        setIsLoaded(true);
        setMembersLoaded(true);
      });
  }, [dispatch, groupId, isLoaded, membersLoaded]);

  const handleJoin = () => {
    dispatch(MemberActions.addMemberThunk(groupId))
      .then((res) => {
        if (res.statusCode != 200) alert(res.message);
      })
      .then(() => {
        setMembersLoaded(false);
      });
  };

  return (
    isLoaded && (
      <div>
        <div className="cont group__details">
          <div className="spot__detail__cont">
            <img src={group.preview_img} alt="Spot preview" />
            <div className="spot__detail">
              <div className="spot__name__list">
                <h2>{group.name}</h2>
                <div>
                  <ul>
                    <li>
                      {group.group_type.split("_").map((word) => {
                        return " " + word[0].toUpperCase() + word.slice(1);
                      })}
                    </li>
                    <li>{group.owner.callsign}</li>
                    <li>{group.visibility ? "Public" : "Private"}</li>
                  </ul>
                </div>
                <div className="group__join">
                  {user && (
                    <a
                      onClick={() => {
                        handleJoin();
                      }}
                    >
                      Join Group
                    </a>
                  )}
                </div>
              </div>
              {user && user.id === group.owner.id && (
                <div className="spot__actions">
                  <OpenModalButton
                    buttonText="Update Group"
                    modalComponent={<UpdateGroupModal group={group} />}
                  />
                  <OpenModalButton
                    buttonText="Delete Group"
                    modalComponent={<DeleteModal type="group" item={group} />}
                  />
                </div>
              )}
              <div className="spot__desc">
                <h3>Group Description</h3>
                <p>{group.desc}</p>
              </div>
            </div>
          </div>
        </div>
        {group.visibility && (
          <div className="spot__reviews__cont">
            <div className="group__members__header">
              <h3>Members</h3>
              {user && user.id === group.owner.id && (
                <OpenModalButton
                  buttonText="Edit Members"
                  modalComponent={
                    <EditMemberModal
                      setMembersLoaded={setMembersLoaded}
                      group={group}
                      user={user}
                    />
                  }
                />
              )}
            </div>
            <div className="group__members">
              {members &&
                members.map((member) => {
                  return (
               
                      <NavLink key={member.id} to={`/users/${member.member.id}`}>
                        <img src={member.member.profile_img} />
                        <div>
                          <h3>{member.member.callsign}</h3>
                          <h4>{member.privileges}</h4>
                        </div>
                      </NavLink>
                   
                  );
                })}
            </div>
          </div>
        )}
      </div>
    )
  );
}

export default GroupDetail;
