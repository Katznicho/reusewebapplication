import React, { useState } from "react";
import Validation from "../forms/validation";
import Alert from "../alerts";

const Register = ({ message = null }) => {
  const [data, onSubmit] = useState(null);
  let items = [
    {
      label: "First Name",
      error: { required: "Please enter a valid first mame" },
      name: "firstName",
      type: "text",
      placeholder: "Enter you first name",
    },
    {
      label: "Last Name",
      error: { required: "Please enter a valid last name" },
      name: "lastName",
      type: "text",
      placeholder: "Enter you last name",
    },
    {
      label: "Email",
      error: { required: "Please enter a valid Email" },
      name: "email",
      type: "email",
      placeholder: "Enter you last email",
    },
    {
      label: "Password",
      error: {
        required: "Password is required",
        minLength: {
          value: 4,
          message: "Your password should have at least 4 characters",
        },
        maxLength: {
          value: 8,
          message: "Your password should have no more than 8 characters",
        },
      },
      name: "password",
      type: "password",
      placeholder: "Enter your password",
    },
  ];
  return (
    <>
      <div className="flex flex-col">
        {data && message && (
          <div className="w-full mb-4">
            <Alert
              color="bg-transparent border-green-500 text-green-500"
              borderLeft
              raised
            >
              {message}
            </Alert>
          </div>
        )}
        <Validation items={items} onSubmit={onSubmit} />
      </div>
    </>
  );
};

export default Register;
