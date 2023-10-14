import React from "react";

const initialLoginValues = {
  email: "",
  password: "",
};

const initialValues = {
  first_name: "",
  last_name: "",
  username: "",
  contact: "",
  account_type: "",
  address: "",
  password: "",
  farm_id: "",
  gender: "",
  nin: "",
};

const restPasswordData = {
  old_password: "",
  new_password: "",
};

const userDetials = {
  first_name: "",
  last_name: "",
  username: "",
  address: "",
  account_type: "",
  employee_type: "",
  super_admin: "",
  gender: "",
  nin: "",
  profile_picture: "",
  contact: "",
  farm_id: "",
  groups: "",
  user_permissions: "",
  password: "",
};


export default function useForm(validateOnChange = false) {
  const [loginValues, setLoginValues] = React.useState(initialLoginValues);
  const [profile, setProfile] = React.useState(initialValues);
  const [passwordRest, setPasswordRest] = React.useState(restPasswordData);
  const [showPassword, setShowPassword] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [values, setValues] = React.useState(userDetials);


  const handleInputChange = (e) => {
    e.persist();
    const { value, name } = e.target;

    setLoginValues({
      ...loginValues,
      [name]: value,
    });

    setProfile({
      ...profile,
      [name]: value,
    });

    setPasswordRest({
      ...passwordRest,
      [name]: value,
    });

    setValues({
      ...values,
      [name]: value,
    });


    if (validateOnChange) {
      validateLogin({ [name]: value });
    }
  };

  const validateLogin = () => {
    let temp = {};
    if (loginValues) {
      temp.email = /$^|.+@.+..+/.test(loginValues.email)
        ? ""
        : "Enter a valid email address";

      temp.password =
        loginValues.password.length > 6
          ? ""
          : "Password should contains at least 8 characters";
    }
    setErrors({
      ...temp,
    });

    return Object.values(temp).every((x) => x === "");
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleClearForm = () => {
    setLoginValues(initialLoginValues);
    setProfile(initialValues);
    setPasswordRest(restPasswordData);
    setValues(userDetials);
  };

  return {
    values,
    loginValues,
    showPassword,
    errors,
    profile,
    passwordRest,
    setProfile,
    validateLogin,
    setErrors,
    handleInputChange,
    handleClearForm,
    handleShowPassword,
  };
}
