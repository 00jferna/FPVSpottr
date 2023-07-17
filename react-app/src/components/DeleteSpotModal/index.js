import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as SpotActions from "../../store/spots";

function DeleteSpotModal({ spot }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const handleYes = async (e) => {
    e.preventDefault();

    const deleteSpot = await dispatch(SpotActions.deleteSpotThunk(spot));
    if (deleteSpot) {
      closeModal();
      alert(`${spot.name} has been Deleted!`);
      history.push("/");
    } else {
    }
  };

  return (
    <div className="modal">
      <h1>Delete Spot: {spot.name}?</h1>
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

export default DeleteSpotModal;
