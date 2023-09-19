import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as MemberActions from "../../store/members";

export const EditMemberModal = ({ members }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const togglePrivileges = (member) => {
    console.log("Toggle:", member);
  };

  const removeMember = (member) => {
    console.log("Remove:", member);
  };

  return (
    <div className="modal">
      <h1>Edit Members</h1>
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
