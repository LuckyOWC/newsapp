import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

function User() {
  const [user, setUser] = useState([]);
  const [data, setData] = useState([]);

  // Fetch user data from jsonplaceholder
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setUser(json));
  }, []);

  // Fetch data from restful-api
  useEffect(() => {
    fetch("https://api.restful-api.dev/objects")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  return (
    <div className="container">
      <h1 className="heading">User Page</h1>

      {/* Add responsive table wrapper */}
      <div className="table-responsive">
        <h2>Users Table</h2>
        <Table bordered variant="dark" hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Street</th>
              <th>Suite</th>
              <th>City</th>
              <th>Zipcode</th>
              <th>Lat</th>
              <th>Lng</th>
              <th>Phone</th>
              <th>Website</th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>
            {user.map((allusers) => (
              <tr key={allusers.id}>
                <td>{allusers.id}</td>
                <td>{allusers.name}</td>
                <td>{allusers.username}</td>
                <td>{allusers.email}</td>
                <td>{allusers.address.street}</td>
                <td>{allusers.address.suite}</td>
                <td>{allusers.address.city}</td>
                <td>{allusers.address.zipcode}</td>
                <td>{allusers.address.geo.lat}</td>
                <td>{allusers.address.geo.lng}</td>
                <td>{allusers.phone}</td>
                <td>{allusers.website}</td>
                <td>
                  {allusers.company.name}. {allusers.company.catchPhrase}.
                  {allusers.company.bs}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <h2>Objects Table</h2>
        <Table bordered hover variant="dark" striped border="1px">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Color</th>
              <th>Capacity</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.data?.color || "N/A"}</td>{" "}
                {/* Use optional chaining */}
                <td>{item.data?.capacity || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default User;
