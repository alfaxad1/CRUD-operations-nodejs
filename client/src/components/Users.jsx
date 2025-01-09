import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Users = () => {
  const Delete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  const [usersData, setUsersData] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:5000/api/users")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("network response not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => setUsersData(data))
  //     .catch((error) => {
  //       console.error("Error fetching users:", error);
  //     });
  // }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        setUsersData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      {usersData.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Link
            className="font-medium text-blue-600 hover:underline mr-3"
            to={`/register`}
          >
            Create
          </Link>
          <table className="min-w-full text-base text-left text-gray-700 ">
            <thead className="text-xs text-neutral-100 uppercase bg-gray-950">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {usersData.users.map((user) => (
                <tr
                  className="bg-neutral-200 border-b hover:bg-gray-50"
                  key={user.id}
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {user.id}
                  </td>
                  <td className="px-6 py-4 ">{user.name}</td>
                  <td className="px-6 py-4">{user.age}</td>
                  <td className="px-6 py-4">
                    <Link
                      className="font-medium text-blue-600 hover:underline mr-3"
                      to={`/users/edit/${user.id}}`}
                    >
                      Edit
                    </Link>

                    <Link
                      className="font-medium text-blue-600 hover:underline mr-3"
                      to={`/users/${user.id}}`}
                    >
                      View
                    </Link>

                    <button
                      onClick={() => Delete(user.id)}
                      className="font-medium text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Users;
