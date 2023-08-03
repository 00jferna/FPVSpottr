import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as GroupActions from "../../store/groups";
import * as SpotActions from "../../store/spots";
import * as FavoriteActions from '../../store/favorites'

export const DeleteModal = (item) => {
  const type = item.type;
  console.log(item.favorite);
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const handleYes = async (e) => {
    e.preventDefault();
    if (type === "spot") {
      const deleteItem = await dispatch(SpotActions.deleteSpotThunk(item.item));
      if (deleteItem) {
        closeModal();
        alert(`${item.item.name} has been Deleted!`);
        history.push("/");
      }
    }
    
    if (type === "group") {
      const deleteItem = await dispatch(GroupActions.deleteGroupThunk(item.item));
      if (deleteItem) {
        closeModal();
        alert(`${item.item.name} has been Deleted!`);
        history.push("/groups");
      }
    }

    if (type === "favorite") {
      const deleteItem = await dispatch(FavoriteActions.deleteFavoritesThunk(item.item));
      if (deleteItem) {
        closeModal();
        alert(`${item.item.name} has been Deleted!`);
        history.push("/favorites");
      }
    }
  };

  return (
    <div className="modal">
      <h1>
        Delete {type}: {item.item.name}?
      </h1>
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
