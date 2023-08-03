import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as FavoriteActions from "../../store/favorites";

const default_img = process.env.REACT_APP_DEFAULT_IMG;

function CreateFavoriteModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const [name, setName] = useState("");
  const [desc, setDsec] = useState("");
  const [visibility, setVisibility] = useState("true");
  const [group_type, setGroup_type] = useState("racing");

  const [preview_img, setPreview_img] = useState("default");

  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleUpload = async (e) => {
    e.preventDefault();
    setErrors({});
    if (preview_img !== "default") {
      const formData = new FormData();
      formData.append("image", preview_img);

      setUploading(true);
      const res = await fetch("/api/groups/upload", {
        method: "POST",
        body: formData,
      });

      const upload_data = await res.json();

      handleSubmit(upload_data);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async (upload_data) => {
    setErrors({});

    const payload = {
      name,
      desc,
      visibility,
      group_type,
      preview_img:
        preview_img !== "default" ? upload_data.image_url : default_img,
    };

    const newFavorite = null // await dispatch(FavoriteActions(payload));

    if (newFavorite.id) {
      const newFavoriteId = newFavorite.id;
      const url = `/favorites/${newFavoriteId}`;
      setName("");
      setDsec("");
      setVisibility("");
      setGroup_type("");
      setPreview_img("");
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
      <h1>Create Favorite List</h1>
      <form onSubmit={handleUpload}>
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
                  placeholder="Favorite List Description"
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
            <tr>
              <td>
                <label>Favorite List Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPreview_img(e.target.files[0])}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button>Create Group!</button>
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
