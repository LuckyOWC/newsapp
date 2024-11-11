import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
function Universities() {
  const [Universities, setUniversities] = useState([]);
  const [user, setuser] = useState([]);
  const [news, setNews] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    fetch("http://universities.hipolabs.com/search?name=middle")
      .then((res) => res.json())
      .then((json) => setUniversities(json));
  }, []);

  useEffect(() => {
    fetch("https://reqres.in/api/users")
      .then((responce) => responce.json())
      .then((json) => setuser(json.data));
  }, []);
  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=300eb435478b4f2396b2498c09f965ef"
    )
      .then((responce) => responce.json())
      .then((json) => setNews(json.articles));
  }, []);

  function MyButton() {
    // return <button onClick={() => alert(Date())}>I'm a button</button>;
    return (
      <button onClick={() => prompt("Enter a value")}>I'm a button</button>
    );
  }
  return (
    <div className="container">
      <h1 className="text-center" style={{ marginTop: "60px" }}>
        Top Universities In UK
      </h1>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Alpha Two Code</th>
            <th>Domains</th>
            <th>State Province</th>
            <th>Country</th>
            <th>Name</th>
            <th>Web Pages</th>
          </tr>
        </thead>
        {Universities.map((ulist, index) => (
          <tbody key={index}>
            <tr>
              <td>{ulist.alpha_two_code}</td>
              <td>
                {ulist.domains
                  .map((domain, i) => (
                    <a href={`http://${domain}`} key={i} target="_blank">
                      {domain}
                    </a>
                  ))
                  .reduce((prev, curr) => [prev, ", ", curr])}
              </td>
              <td>{ulist["state - province"] || "N/A"}</td>

              <td>{ulist.country}</td>
              <td>{ulist.name}</td>
              <td>
                <a
                  href={ulist.web_pages}
                  target="_blank"
                  rel="nnoopener noreferrer"
                >
                  {ulist.web_pages}
                </a>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
      <h1 className="text-center">Users</h1>
      <Table bordered className="text-center bg-dark" hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Email Address</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Avatar</th>
          </tr>
        </thead>
        {user.map((items, index) => (
          <tbody>
            <tr key={index}>
              <td>{items.id}</td>
              <td>{items.email}</td>
              <td>{items.first_name}</td>
              <td>{items.last_name}</td>
              <td>
                <img
                  src={items.avatar}
                  alt=""
                  style={{ width: "100px", borderRadius: "60px" }}
                />
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
      <MyButton style={{ marginBottom: "30px" }} />
      <h1>Top business headlines in the US right now</h1>

      <div className="row">
        {news.map((newsitem) => (
          <div className="col-sm-4 my-3">
            <Card>
              <Card.Img
                variant="top"
                src={
                  !newsitem.urlToImage
                    ? "https://s.france24.com/media/display/e6279b3c-db08-11ee-b7f5-005056bf30b7/w:980/p:16x9/news_en_1920x1080.jpg"
                    : newsitem.urlToImage
                }
                style={{ height: "250px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{newsitem.title}</Card.Title>
                <Card.Text>{newsitem.description}</Card.Text>
                <p>
                  <b>Author: </b>
                  {newsitem.author}
                </p>
                <p>
                  <b>PublishedAt: </b>
                  {newsitem.publishedAt}
                </p>
                <a href={newsitem.url} target="_blank">
                  <Button variant="primary">Go somewhere</Button>
                </a>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Universities;
