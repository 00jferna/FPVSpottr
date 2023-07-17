import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as SpotActions from "../../store/spots";

const default_img = process.env.REACT_APP_DEFAULT_IMG;

function CreateSpotModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const [name, setName] = useState("");
  const [desc, setDsec] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [address, setAddress] = useState("");
  const [spot_type, setSpot_Type] = useState("field");
  const [spots_status, setSpots_status] = useState("active");
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
      const res = await fetch("/api/spots/upload", {
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
      latitude,
      longitude,
      address,
      spot_type,
      spots_status,
      preview_img:
        preview_img !== "default" ? upload_data.image_url : default_img,
    };

    const newSpot = await dispatch(SpotActions.createSpotThunk(payload));

    if (newSpot.id) {
      const newSpotId = newSpot.id;
      const url = `/spots/${newSpotId}`;
      setName("");
      setDsec("");
      setLatitude("");
      setLongitude("");
      setAddress("");
      setSpot_Type("");
      setSpots_status("");
      setPreview_img("");
      setErrors([]);
      closeModal();
      history.push(url);
    } else {
      setUploading(false);
      setErrors(newSpot.errors);
    }
  };

  return (
    <div className="modal">
      <h1>Create Spot</h1>
      <form onSubmit={handleUpload}>
        <table>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="Spot Name"
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
                <input
                  type="text"
                  placeholder="Spot Description"
                  value={desc}
                  onChange={(e) => setDsec(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="Spot Latitude"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                />
              </td>
            </tr>
            {errors.latitude && (
              <tr className="errors">
                <td>{errors.latitude[0]}</td>
              </tr>
            )}
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="Spot Longitude"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                />
              </td>
            </tr>
            {errors.longitude && (
              <tr className="errors">
                <td>{errors.longitude[0]}</td>
              </tr>
            )}
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="Spot Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <select
                  type="text"
                  placeholder="Spot Type"
                  value={spot_type}
                  onChange={(e) => setSpot_Type(e.target.value)}
                >
                  <option value="field">Field</option>
                  <option value="park">Park</option>
                  <option value="playground">Playground</option>
                  <option value="bando">Bando</option>
                  <option value="industrial_park">Industrial Park</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <select
                  type="text"
                  placeholder="Spot Status"
                  value={spots_status}
                  onChange={(e) => setSpots_status(e.target.value)}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
              </td>
            </tr>
            <tr>
              <td>
                <label>Spot Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPreview_img(e.target.files[0])}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button>Create Spot!</button>
      </form>
      {uploading && (
        <div>
          <h3>Please Wait while your Spot is Created!</h3>
        </div>
      )}
    </div>
  );
}

export default CreateSpotModal;
