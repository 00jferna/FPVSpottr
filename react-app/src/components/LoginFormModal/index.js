import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

const demo = process.env.REACT_APP_DEMO_USER;
const secret = process.env.REACT_APP_DEMO_SECRET;

function LoginFormModal() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(username, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  const handleDemoLogin = async () => {
    setErrors({});
    await dispatch(login(demo, secret));
    closeModal();
  };

  return (
    <div className="modal">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
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
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

        <button type="submit">Log In</button>
      </form>
      <div className="modal__demo__login">
        <button onClick={() => handleDemoLogin()}>Demo Login</button>
      </div>
    </div>
  );
}

export default LoginFormModal;
