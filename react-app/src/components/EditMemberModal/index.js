import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as MemberActions from "../../store/members";

export const EditMemberModal = ({ group, setMembersLoaded }) => {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.members.members);
  const { closeModal } = useModal();

  const togglePrivileges = (member) => {
    dispatch(MemberActions.toggleMemberThunk(group.id, member.member.id)).then(
      () => {
        setMembersLoaded(false);
      }
    );
  };

  const removeMember = (member) => {
    dispatch(MemberActions.removeMemberThunk(group.id, member.member.id)).then(
      () => {
        setMembersLoaded(false);
      }
    );
  };

  return (
    <div className="modal">
      <div className="modal__headers" >
        <h1>Edit Members</h1>
        <i onClick={() => closeModal()}  className="fas fa-times-circle"></i>
      </div>
      <div className="group__edit__members">
        {members &&
          members.map((member) => {
            return (
              <div key={member.id}>
                <img src={member.member.profile_img} />
                <div>
                  <h3>{member.member.callsign}</h3>
                  <h4>{member.privileges}</h4>
                  {member.privileges === "admin" && (
                    <button onClick={() => togglePrivileges(member)}>
                      Remove Admin
                    </button>
                  )}
                  {member.privileges === "member" && (
                    <button onClick={() => togglePrivileges(member)}>
                      Add Admin
                    </button>
                  )}
                  {member.privileges !== "owner" && (
                    <button onClick={() => removeMember(member)}>
                      Remove Member
                    </button>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default EditMemberModal;
