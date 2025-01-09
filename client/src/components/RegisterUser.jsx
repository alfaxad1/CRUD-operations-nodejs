import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const RegisterUser = () => {
  const [userData, setUserData] = useState({ name: "", age: 0 });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: [e.target.value] });
  };

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    // const submitUser = async () => {
    //   console.log("userData:", userData);
    //   const result = await fetch("http://localhost:5000/api/users", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(userData),
    //   });
    //   const data = await result.json;
    //   console.log(data);
    // };

    axios
      .post("http://localhost:5000/api/users", userData)
      .then((res) => {
        console.log(res);
        navigate("/users");
      })
      .catch((err) => console.log(err));

    // submitUser();
  };

  return (
    <div>
      <h1>Register User</h1>
      <form className="">
        <div className="mb-5">
          <label>name:</label>
          <input type="text" name="name" onChange={(e) => handleChange(e)} />
        </div>

        <div className="mb-5">
          <label>age:</label>
          <input type="number" name="age" onChange={(e) => handleChange(e)} />
        </div>

        <button type="submit" name="submit" onClick={(e) => handleSubmit(e)}>
          Save
        </button>
        <Link
          className="font-medium text-blue-600 hover:underline mr-3"
          to={`/users`}
        >
          Back
        </Link>
      </form>
    </div>
  );
};

export default RegisterUser;
