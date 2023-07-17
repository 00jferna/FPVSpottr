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
    <div className="modal">
      <h1>Delete Group: {group.name}?</h1>
      <table>
        <tbody>
          <tr>
            <td>
              <button onClick={handleYes}>Yes</button>
              <button onClick={() => closeModal()}>No</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DeleteGroupModal;
