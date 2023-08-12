import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as FavoriteActions from "../../store/favorites";

function UpdateFavoriteModal({ favorite,onSetIsLoaded }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const [name, setName] = useState(favorite.name);
  const [desc, setDsec] = useState(favorite.desc ? favorite.desc : "");
  const [visibility, setVisibility] = useState(
    favorite.visibility ? true : false
  );

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const payload = {
      id: favorite.id,
      name,
      desc,
      visibility,
    };

    const updatedFavorite = await dispatch(
      FavoriteActions.updateFavoritesThunk(payload)
    );

    if (updatedFavorite.id) {
      const updatedFavoriteId = updatedFavorite.id;
      const url = `/favorites/${updatedFavoriteId}`;
      setName("");
      setDsec("");
      setVisibility("");
      setErrors({});
      closeModal();
      onSetIsLoaded(false)
    } else {
      setErrors(updatedFavorite.errors);
    }
  };

  return (
    <div className="modal">
      <h1>Update Favorites List</h1>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="New Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </td>
            </tr>
            {errors.name && (
              <tr className="errors">
                <td>{errors.name[0]}</td>
              </tr>
            )}
            <tr>
              <td>
                <textarea
                  type="text"
                  rows="5"
                  placeholder="Favorites List Description"
                  value={desc}
                  onChange={(e) => setDsec(e.target.value)}
                />
              </td>
            </tr>
            {errors.desc && (
              <tr className="errors">
                <td>{errors.desc[0]}</td>
              </tr>
            )}
            <tr>
              <td>
                <select
                  type="text"
                  placeholder="Favorite List Status"
                  value={visibility}
                  onChange={(e) =>
                    setVisibility(e.target.value === "true" ? true : false)
                  }
                >
                  <option value="true">Public</option>
                  <option value="false">Private</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <button>Update Favorites List!</button>
      </form>
    </div>
  );
}

export default UpdateFavoriteModal;
