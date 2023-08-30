import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./sign.css";
const Sign = ({ show }) => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    confirm_password: "",
    email: "",
  });
  const [formError, setFormError] = useState({
    error: "",
    userName: "",
    email: "",
    password: "",
    confirm_password: "",
    success: "",
  });
  const [validation, setValidation] = useState({
    minLength: false,
    upperCase: false,
    char: false,
  });
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "password") {
      setValidation((prevValidation) => ({
        ...prevValidation,
        minLength: value.length >= 8,
        upperCase: /[A-Z]/.test(value),
        char: /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value),
      }));
    }
  };

  const saveForm = (e) => {
    e.preventDefault();
    let errors = {};
    if (
      formData["email"].trim() === "" &&
      formData["confirm_password"].trim() === "" &&
      formData["password"].trim() === "" &&
      formData["userName"].trim() === ""
    ) {
      errors.error = "Please Fill the fields";
    } else if (formData["userName"].trim() === "") {
      errors.userName = "Please Enter the username";
    } else if (formData["email"].trim() === "") {
      errors.email = "Please Enter the Email";
    } else if (formData["password"].trim() === "") {
      errors.password = "Please Enter the Password";
    } else if (formData["confirm_password"].trim() === "") {
      errors.confirm_password = "Please Enter the Confirm Password";
    } else if (formData["password"] !== formData["confirm_password"]) {
      errors.confirmPassword = "Confirm Password does not match";
    } else if (
      validation["char"] === true &&
      validation.minLength === true &&
      validation.upperCase === true
    ) {
      errors.success = "Sign up Successfull";
    }
    setFormError(errors);
    setFormData({
      userName: "",
      password: "",
      confirm_password: "",
      email: "",
    });
    setValidation({
      minLength: false,
      upperCase: false,
      char: false,
    });
  };

  const myStyle = {
    fontSize: "3rem",
  };

  return (
    <>
      <div className="blurred-background"></div>
      <form onSubmit={saveForm}>
        <div className="sign_form">
          <CloseIcon
            style={myStyle}
            className="icon"
            onClick={() => show(false)}
          />
          <h2>Sign up</h2>
          {formError["error"] && <div className="error">{formError.error}</div>}
          {formError["userName"] && (
            <div className="error">{formError.userName}</div>
          )}
          {formError["confirm_password"] && (
            <div className="error">{formError.confirm_password}</div>
          )}
          {formError["email"] && <div className="error">{formError.email}</div>}
          {formError["password"] && (
            <div className="error">{formError.password}</div>
          )}
          {formError["confirmPassword"] && (
            <div className="error">{formError.confirmPassword}</div>
          )}
          {formError.success && (
            <div className="success">{formError.success}</div>
          )}
          <label htmlFor="userName">Username</label>
          <input
            name="userName"
            type="text"
            onChange={changeHandler}
            value={formData.userName}
            placeholder="Enter the Username"
          />
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={changeHandler}
            value={formData.password}
          />
          <label htmlFor="password">Confirm Password</label>
          <input
            name="confirm_password"
            type="password"
            placeholder="Confirm your password"
            onChange={changeHandler}
            value={formData.confirm_password}
          />
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your Email"
            onChange={changeHandler}
            value={formData.email}
            autoComplete="off"
          />
          <button type="submit">Sign Up</button>
          <div className="validation">
            <p className={validation.minLength ? "valid" : "invalid"}>
              At least 8 characters.{" "}
            </p>
            <p className={validation.upperCase ? "valid" : "invalid"}>
              At least one uppercase letter.
            </p>
            <p className={validation.char ? "valid" : "invalid"}>
              At least one special character(e.g., !, @, #, $).
            </p>
          </div>
        </div>
      </form>
    </>
  );
};
export default Sign;
