import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as GroupActions from "../../store/groups";

function DeleteGroupModal({ group }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const handleYes = async (e) => {
    e.preventDefault();

    const deleteGroup = await dispatch(GroupActions.deleteGroupThunk(group));
    if (deleteGroup) {
      closeModal();
      alert(`${group.name} has been Deleted!`);
      history.push("/groups");
    } else {
    }
  };

  return (
    <div>
      <h2>Delete {group.name}?</h2>
      <div>
        <button onClick={handleYes}>Yes</button>
        <button onClick={() => closeModal()}>No</button>
      </div>
    </div>
  );
}

export default DeleteGroupModal;
