import React from "react";
import { Card, ListGroup, Badge } from "react-bootstrap";
const NewsItem = (props) => {
  let {
    title,
    description,
    imageUrl,
    newUrl,
    author,
    publishedAt,
    url,
    content,
    source,
  } = props;
  return (
    <div className="container my-3">
      <Card>
        <Card.Img
          variant="top"
          style={{ height: "250px", objectFit: "cover" }}
          src={
            !imageUrl
              ? "https://cdn.pixabay.com/photo/2017/06/26/19/03/news-2444778_960_720.jpg"
              : imageUrl
          }
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Badge bg="danger">{source}</Badge>
          <Card.Text>{description}</Card.Text>
          <Card.Text>{content}</Card.Text>
          <Card.Text>
            <b>PublishedAt: </b>
            {publishedAt}
          </Card.Text>
          <ListGroup.Item>{newUrl}</ListGroup.Item>
          <ListGroup.Item>
            <b>Author:</b> {author}
          </ListGroup.Item>
          <a target="_blank" href={url}>
            <button className="btn btn-primary my-4">Read More</button>
          </a>
        </Card.Body>
      </Card>
    </div>
  );
};
export default NewsItem;
