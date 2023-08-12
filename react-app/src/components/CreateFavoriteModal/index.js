import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as FavoriteActions from "../../store/favorites";

function CreateFavoriteModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const [name, setName] = useState("");
  const [desc, setDsec] = useState("");
  const [visibility, setVisibility] = useState("true");

  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const payload = {
      name,
      desc,
      visibility,
    };

    const newFavorite = await dispatch(
      FavoriteActions.createFavoritesThunk(payload)
    );

    if (newFavorite.id) {
      const newFavoriteId = newFavorite.id;
      const url = `/favorites/${newFavoriteId}`;
      setName("");
      setDsec("");
      setVisibility("");
      setErrors({});
      closeModal();
      history.push(url);
    } else {
      setErrors(newFavorite.errors);
    }
  };

  return (
    <div className="modal">
      <h1>Create Favorites List</h1>
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
        <button>Create Favorites List!</button>
      </form>
      {uploading && (
        <div>
          <h3>Please Wait while your Favorite List is Created!</h3>
        </div>
      )}
    </div>
  );
}

export default CreateFavoriteModal;
