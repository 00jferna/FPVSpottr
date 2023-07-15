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
    <div>
      <h2>Delete {spot.name}?</h2>
      <div>
        <button onClick={handleYes}>Yes</button>
        <button onClick={() => closeModal()}>No</button>
      </div>
    </div>
  );
}

export default DeleteSpotModal;
