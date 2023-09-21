import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import * as ProfileActions from "../../../store/profile";

const UpdateProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [callsign, setCallsign] = useState(user.callsign);
  const [password, setPassword] = useState("");
  const [profile_img, setProfile_img] = useState(user.profile_img);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleUpload = async (e) => {
    e.preventDefault();

    if (profile_img !== user.profile_img) {
      const formData = new FormData();
      formData.append("image", profile_img);
      const res = await fetch("/api/users/upload", {
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
    if (password === confirmPassword) {
      const payload = {
        id: user.id,
        callsign,
      };

      if (upload_data) {
        payload.profile_img = upload_data.image_url;
      }

      const data = await dispatch(ProfileActions.updateUserThunk(payload));
      if (data.id) {
        closeModal();
      } else {
        setErrors(data.errors);
      }
    } else {
      setErrors({
        password: [
          "Confirm New Password field must be the same as the New Password field",
        ],
      });
    }
  };

  return (
    <div className="modal">
      <div className="modal__headers">
        <h1>Update Profile</h1>
        <i onClick={() => closeModal()} className="fas fa-times-circle"></i>
      </div>
      <form onSubmit={handleUpload}>
        <table>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="Callsign"
                  value={callsign}
                  onChange={(e) => setCallsign(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Profile Image</label>
                <input
                  type="file"
                  accept="image/*"
                  files={profile_img}
                  onChange={(e) => setProfile_img(e.target.files[0])}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="password"
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </td>
            </tr>
            {errors.password && (
              <tr className="errors">
                <td>{errors.password[0]}</td>
              </tr>
            )}
          </tbody>
        </table>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
