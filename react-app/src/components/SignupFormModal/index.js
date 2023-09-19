import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";

const default_profile = process.env.REACT_APP_DEFAULT_PROFILE;

const SignupFormModal = ({ onIsloaded }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [callsign, setCallsign] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(
        signUp(username, email, callsign, password, default_profile)
      );
      if (data) {
        setErrors(data);
      } else {
        onIsloaded(false);
        closeModal();
      }
    } else {
      setErrors({
        password: [
          "Confirm Password field must be the same as the Password field",
        ],
      });
    }
  };

  return (
    <div className="modal">
      <div className="modal__headers">
        <h1>Sign Up</h1>
        <i onClick={() => closeModal()} className="fas fa-times-circle"></i>
      </div>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </td>
            </tr>
            {errors.email && (
              <tr className="errors">
                <td>{errors.email[0]}</td>
              </tr>
            )}
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </td>
            </tr>
            {errors.username && (
              <tr className="errors">
                <td>{errors.username[0]}</td>
              </tr>
            )}
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
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupFormModal;
