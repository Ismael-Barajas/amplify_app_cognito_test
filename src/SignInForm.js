import React, { useState } from "react";
import { Auth } from "aws-amplify";

const SignInForm = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    signedIn: false,
  });

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { signedIn, username, password } = formValues;

    Auth.signIn({
      username: username,
      password: password,
    })
      .then(() => console.log("Signed In Success"))
      .catch((err) => console.log(err));

    Auth.confirmSignIn(username, password)
      .then(() => console.log("confirmed sign in"))
      .catch((err) => console.log(err));

    setFormValues({ signedIn: true });
  };

  if (formValues.signedIn) {
    return <h1>You have signed in!</h1>;
  } else {
    return (
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text" name="username" onChange={handleChange} />
        <label>Password</label>
        <input type="password" name="password" onChange={handleChange} />
        <button type="submit">Sign In</button>
      </form>
    );
  }
};

export default SignInForm;
