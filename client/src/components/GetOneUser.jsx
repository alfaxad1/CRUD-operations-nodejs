import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const GetOneUser = () => {
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
      <h1>User details</h1>
      <p>ID: {user.id}</p>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>

      <Link
        className="font-medium text-blue-600 hover:underline mr-3"
        to={`/users`}
      >
        Back
      </Link>
    </div>
  );
};

export default GetOneUser;
