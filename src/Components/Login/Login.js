import { useEffect, useState } from "react";
import "./login.css";
import CloseIcon from "@mui/icons-material/Close";
const Login = ({ show }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({
    email: "",
    password: "",
    error: "",
    success: "",
  });
  const myStyle = {
    fontSize: "3rem",
  };
  const saveForm = (e) => {
    e.preventDefault();
    let errors = {};

    if (formData.email.trim() === "" && formData.password.trim() === "") {
      errors.error = "Please Enter the Email and Password";
    } else if (formData.email.trim() === "") {
      errors.email = "Please Enter the Email";
    } else if (formData.password.trim() === "") {
      errors.password = "Please Enter the Password";
    } else {
      errors.success = "Login Successfull";
      setFormData({
        email: "",
        password: "",
      });
    }
    setFormError(errors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      <form onSubmit={saveForm}>
        <div className="blurred-background"></div>
        <div className="form">
          <CloseIcon
            style={myStyle}
            className="icon"
            onClick={() => show(false)}
          />
          <h2>Login</h2>
          {formError.email && <div className="error">{formError.email}</div>}
          {formError.password && (
            <div className="error">{formError.password}</div>
          )}
          {formError.error && <div className="error">{formError.error}</div>}
          {formError.success && (
            <div className="success">{formError.success}</div>
          )}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter your Email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            autoComplete="off"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="off"
          />

          <button type="submit">Log in</button>
        </div>
      </form>
    </>
  );
};
export default Login;
