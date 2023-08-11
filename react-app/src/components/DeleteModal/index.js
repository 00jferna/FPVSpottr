import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as GroupActions from "../../store/groups";
import * as SpotActions from "../../store/spots";
import * as FavoriteActions from "../../store/favorites";
import * as ReviewActions from "../../store/reviews";

const DeleteModal = ({ type, item, onIsloaded }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const handleYes = async (e) => {
    e.preventDefault();
    if (type === "spot") {
      const deleteItem = await dispatch(SpotActions.deleteSpotThunk(item));

      if (deleteItem) {
        closeModal();
        alert(`${item.name} has been Deleted!`);
        history.push("/");
      }
    }

    if (type === "group") {
      const deleteItem = await dispatch(GroupActions.deleteGroupThunk(item));

      if (deleteItem) {
        closeModal();
        alert(`${item.name} has been Deleted!`);
        history.push("/groups");
      }
    }

    if (type === "favorite") {
      const deleteItem = await dispatch(
        FavoriteActions.deleteFavoritesThunk(item)
      );
      if (deleteItem) {
        closeModal();
        alert(`${item.name} has been Deleted!`);
        history.push("/favorites");
      }
    }

    if (type === "review") {
      const deleteItem = await dispatch(
        ReviewActions.deleteSpotReviewsThunk(item)
      );

      if (deleteItem) {
        onIsloaded(false);
        closeModal();
        alert(`Your review has been Deleted!`);
      }
    }
  };

  return (
    <div className="modal">
      <h1>Delete {type}?</h1>
      {type !== "review" && <h2>{item.name}</h2>}
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
};

export default DeleteModal;
