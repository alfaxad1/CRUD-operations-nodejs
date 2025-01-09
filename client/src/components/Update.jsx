import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const Update = () => {
  const [userData, setUserData] = useState({ name: "", age: 0 });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: [e.target.value] });
  };
  const [user, setUser] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users/${id}`)
      .then((res) => {
        console.log(res);
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div>
      <h1>Register User</h1>
      <form>
        <label>name:</label>
        <input
          type="text"
          name="name"
          onChange={(e) => handleChange(e)}
          value={user.name}
        />
        <br />
        <label>age:</label>
        <input
          type="number"
          name="age"
          onChange={(e) => handleChange(e)}
          value={user.age}
        />
        <br />
        <input type="submit" name="submit" />
      </form>
      <Link
        className="font-medium text-blue-600 hover:underline mr-3"
        to={`/users`}
      >
        Back
      </Link>
    </div>
  );
};

export default Update;
