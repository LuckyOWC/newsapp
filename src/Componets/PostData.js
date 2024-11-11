import { useEffect, useState } from "react";
import { Form, Button, Table } from "react-bootstrap";

function PostData() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");
  const [country, setCountry] = useState("");
  const [image, setImage] = useState("");
  const [gender, setGender] = useState("");
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/allusers");
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      name,
      username,
      email,
      phone,
      website,
      age,
      city,
      pin,
      country,
      image,
      gender,
    };

    try {
      if (isEditing) {
        // Update the user
        const response = await fetch(
          `http://localhost:5000/allusers/${editingUserId}`,
          {
            method: "PUT",
            body: JSON.stringify(newUser),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(await response.json());
        alert("Data updated successfully 😊");
        setIsEditing(false);
        setEditingUserId(null);
      } else {
        // Add a new user
        const response = await fetch("http://localhost:5000/allusers", {
          method: "POST",
          body: JSON.stringify(newUser),
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(await response.json());
        alert("Data submitted successfully 😍");
      }
      resetForm();
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Submission failed. Please try again 👺");
    }
  };

  const handleEdit = (user) => {
    setName(user.name);
    setUsername(user.username);
    setEmail(user.email);
    setPhone(user.phone);
    setWebsite(user.website);
    setAge(user.age);
    setCity(user.city);
    setPin(user.pin);
    setCountry(user.country);
    setImage(user.image);
    setGender(user.gender);
    setIsEditing(true);
    setEditingUserId(user.id); // Assuming `id` is the identifier
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/allusers/${id}`, { method: "DELETE" });
      alert("User deleted successfully 🗑️");
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again 👺");
    }
  };

  const resetForm = () => {
    setName("");
    setUsername("");
    setEmail("");
    setPhone("");
    setWebsite("");
    setAge("");
    setCity("");
    setPin("");
    setCountry("");
    setImage("");
    setGender("");
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container">
      <h1 style={{ marginTop: "60px" }}>
        {isEditing ? "Edit User" : "Add New User"}
      </h1>
      <Form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-sm-4">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col-sm-4">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="JohnDoe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="col-sm-4">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="number"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="col-sm-4">
            <Form.Label>Website</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Website url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <div className="col-sm-4">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="col-sm-4">
            <Form.Label>Zipcode</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Zipcode"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
          </div>
          <div className="col-sm-4">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your image url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div className="col-sm-4">
            <Form.Label>Gender</Form.Label>
            <div>
              <Form.Check
                type="radio"
                label="Male"
                name="gender"
                value="Male"
                checked={gender === "Male"}
                onChange={(e) => setGender(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="Female"
                name="gender"
                value="Female"
                checked={gender === "Female"}
                onChange={(e) => setGender(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="Other"
                name="gender"
                value="Other"
                checked={gender === "Other"}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
          </div>
          <div className="col-sm-4">
            <Button type="submit" className="my-5" style={{ float: "right" }}>
              {isEditing ? "Save Changes" : "Submit"}
            </Button>
          </div>
        </div>
      </Form>
      <div className="container">
        <h1>Show All User Data</h1>
        {data.length > 0 ? (
          <Table border="1px" bordered variant="dark" hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email Address</th>
                <th>Phone</th>
                <th>Website</th>
                <th>Age</th>
                <th>City</th>
                <th>Zipcode</th>
                <th>Country</th>
                <th>Gender</th>
                <th>Profile</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <a
                      href={
                        user.website.startsWith("http")
                          ? user.website
                          : `http://${user.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {user.website}
                    </a>
                  </td>
                  <td>{user.age}</td>
                  <td>{user.city}</td>
                  <td>{user.pin}</td>
                  <td>{user.country}</td>
                  <td>{user.gender}</td>
                  <td>
                    <img
                      src={user.image}
                      alt=""
                      style={{
                        width: "70px",
                        height: "70px",
                        borderRadius: "60px",
                      }}
                    />
                  </td>
                  <td>
                    <Button variant="warning" onClick={() => handleEdit(user)}>
                      Edit
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No user data available.</p>
        )}
      </div>
    </div>
  );
}

export default PostData;
