import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as FavoriteActions from "../../store/favorites";

function AddFavoriteModal({ spot }) {
  const favorites = useSelector((state) => Object.values(state.favorites));
  const user = useSelector((state)=> state.session.user)
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
  const { closeModal } = useModal();

  const [favorite_id, setFavorite_id] = useState("");

  const [name, setName] = useState("");
  const [desc, setDsec] = useState("");
  const [visibility, setVisibility] = useState("true");

  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(FavoriteActions.getUserFavoritesThunk(user)).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch, user]);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const newAdd = await dispatch(FavoriteActions.addFavoritesThunk(favorite_id,spot));
    console.log(newAdd)
    if (newAdd.id) {

      setErrors({});
      closeModal();
      alert(`New Favorite has been Created!`);
    } else {
      setUploading(false);
      setErrors(newAdd.errors);
    }
  };
  const handleCreateSubmit = async (e) => {
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
      setUploading(false);
      setErrors(newFavorite.errors);
    }
  };

  return (
    <div className="modal">
      <h1>Add to Favorites List</h1>
      <form onSubmit={handleAddSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                {isLoaded && (
                  <select 
                  type="text"
                  onChange={(e)=>setFavorite_id(e.target.value)}
                  >
                    <option value={null}>Pick a Favorite</option>
                    {favorites.map((favorite) => {
                      return <option key={favorite.id} value={favorite.id}>{favorite.name}</option>;
                    })}
                  </select>
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <button>Add to Favorites List!</button>
      </form>
      <h1>Or Create a new Favorites List</h1>
      <form onSubmit={handleCreateSubmit}>
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

export default AddFavoriteModal;
