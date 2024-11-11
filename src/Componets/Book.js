import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

function Book() {
  const [Breaches, setBreaches] = useState([]);

  useEffect(() => {
    fetch("https://haveibeenpwned.com/api/v2/breaches")
      .then((responsce) => responsce.json())
      .then((json) => setBreaches(json));
  }, []);
  return (
    <div className="container">
      <h1 className="text-center" style={{ marginTop: "60px" }}>
        Books
      </h1>
      <Table border="1" bordered hover responsive>
        <>
          {" "}
          <thead>
            <tr>
              <th>Name</th>
              <th>Title</th>
              <th>Domain</th>
              <th>BreachDate</th>
              <th>AddedDate</th>
              <th>ModifiedDate</th>
              <th>PwnCount</th>
              <th>Description</th>
              <th>LogoPath</th>
            </tr>
          </thead>
          <tbody>
            {Breaches.map((items) => (
              <tr>
                <td>{items.Name}</td>
                <td>{items.Title}</td>
                <td>{items.Domain}</td>
                <td>{items.BreachDate}</td>
                <td>{items.AddedDate}</td>
                <td>{items.ModifiedDate}</td>
                <td>{items.PwnCount}</td>
                <td>{items.Description}</td>
                <td>
                  <img style={{ width: "150px" }} src={items.LogoPath} />
                </td>
              </tr>
            ))}
          </tbody>
        </>
      </Table>
    </div>
  );
}
export default Book;
