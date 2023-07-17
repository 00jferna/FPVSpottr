import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as SpotActions from "../../store/spots";

const default_img = process.env.REACT_APP_DEFAULT_IMG;

function UpdateSpotModal({ spot }) {
  const spots = useSelector((state) => Object.values(state.spots));
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const [name, setName] = useState(spot.name);
  const [desc, setDsec] = useState(spot.desc);
  const [latitude, setLatitude] = useState(spot.latitude);
  const [longitude, setLongitude] = useState(spot.longitude);
  const [address, setAddress] = useState(spot.address);
  const [spot_type, setSpot_Type] = useState(spot.spot_type.toLowerCase());
  const [spots_status, setSpots_status] = useState(spot.spots_status.toLowerCase());
  const [preview_img, setPreview_img] = useState("default");

  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState();

  const handleUpload = async (e) => {
    e.preventDefault();
    setErrors({});

    if (name !== spot.name) {
      spots.some((obj) => {
        if (name === obj.name && spot.id !== obj.id) {
          setErrors({name:'Name'});
        }
      });
    }

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
      id:spot.id,
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

    const updatedSpot = await dispatch(SpotActions.updateSpotThunk(payload));

    if (updatedSpot.id) {
      const updatedSpotId = updatedSpot.id;
      const url = `/spots/${updatedSpotId}`;
      setName("");
      setDsec("");
      setLatitude("");
      setLongitude("");
      setAddress("");
      setSpot_Type("");
      setSpots_status("");
      setPreview_img("");
      setErrors({});
      closeModal();
      history.push(url);
    } else {
      setUploading(false);
      setErrors(updatedSpot.errors);
    }
  };

  return (
    <div className="modal">
      <h1>Update {spot.name}</h1>
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
            {/* {errors.name && (
              <tr className="errors">
                <td>{errors.name[0]}</td>
              </tr>
            )} */}
            <tr>
              <td>
                <textarea
                  type="text"
                  rows="5"
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
            {/* {errors.latitude && (
              <tr className="errors">
                <td>{errors.latitude[0]}</td>
              </tr>
            )} */}
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
            {/* {errors.longitude && (
              <tr className="errors">
                <td>{errors.longitude[0]}</td>
              </tr>
            )} */}
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
                <label>Spot Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPreview_img(e.target.files[0])}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button>Update Spot!</button>
      </form>
      {uploading && (
        <div>
          <h3>Please Wait while your Spot is Updated!</h3>
        </div>
      )}
    </div>
  );
}

export default UpdateSpotModal;
