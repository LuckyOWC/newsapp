import React, { useEffect, useState } from "react";

function Posts() {
  const [posts, setPosts] = useState([]); // Set posts as an array initially

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => setPosts(json));
  }, []);

  return (
    <div className="container">
      <h1 style={{ marginTop: "65px" }}>Blogs</h1>

      {posts.map((post) => (
        <div key={post.id}>
          <h2>User Id: {post.userId}</h2>
          <p>Post Id: {post.id}</p>
          <p>Title: {post.title}</p>
          <p>Body: {post.body}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Posts;
