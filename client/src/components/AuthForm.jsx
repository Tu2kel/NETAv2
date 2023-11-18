import React from "react";

export default function AuthForm(props) {
  const {
    handleChange, //value of an input field changes
    handleSubmit, //when the form is submitted
    btnText,
    toggleForm,
    errMsg, //displays upon err
    inputs: { username, password }, // from Auth.jsx
  } = props;

  

  return (
    //returns a form
    <form onSubmit={handleSubmit} className="authForm">
      <div className="sign_In_grid">
        <h3 className="sign_In_Below"> Sign In Below</h3>
      </div>
      
      <input
        type="text"
        value={username}
        name="username"
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        type="text"
        value={password}
        name="password"
        onChange={handleChange}
        placeholder="Password"
      />
      
      <button>{btnText}</button>
      {/* <button>Click to Login</button> */}
      <p style={{ color: "red" }}> </p>
    </form>
  );
}
