import React, { useState } from "react";
import { Auth } from "aws-amplify";

const SignUpForm = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    email: "",
    phone_number: "",
    signedUp: false,
    confirmationCode: "",
  });

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      signedUp,
      username,
      password,
      email,
      phone_number,
      confirmationCode,
    } = formValues;

    if (!signedUp) {
      Auth.signUp({
        username: username,
        password: password,
        attributes: {
          email: email,
          phone_number: phone_number,
        },
      })
        .then(() => console.log("Signed Up Success"))
        .catch((err) => console.log(err));
      setFormValues({ signedUp: true });
    } else {
      Auth.confirmSignUp(username, confirmationCode)
        .then(() => console.log("confirmed sign up"))
        .catch((err) => console.log(err));
    }
  };

  if (formValues.signedUp) {
    return (
      <form>
        <label>username</label>
        <input type="text" name="username" onChange={handleChange} />
        <label>Confirmation Code</label>
        <input type="text" name="confirmationCode" onChange={handleChange} />
        <button type="submit">Sign up</button>
      </form>
    );
  } else {
    return (
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text" name="username" onChange={handleChange} />
        <label>Password</label>
        <input type="password" name="password" onChange={handleChange} />
        <label>Email</label>
        <input type="text" name="email" onChange={handleChange} />
        <label>Phone Number</label>
        <input type="text" name="phone_number" onChange={handleChange} />
        <button type="submit">Sign up</button>
      </form>
    );
  }

  return <div></div>;
};

export default SignUpForm;
