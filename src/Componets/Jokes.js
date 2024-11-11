import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";

function Jokes() {
  const [jokes, setJokes] = useState([]);
  const [count, setCount] = useState(0);
  const [doge, setDoges] = useState(null);

  useEffect(() => {
    fetch("https://official-joke-api.appspot.com/random_ten")
      .then((res) => res.json())
      .then((json) => setJokes(json));
  }, []);

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/image/random/ten")
      .then((responce) => responce.json())
      .then((json) => setDoges(json));
  }, []);

  return (
    <div className="container" style={{ marginTop: "5rem" }}>
      <h1>Jokes</h1>
      {jokes.length > 0 ? (
        jokes.map((joke) => (
          <div key={joke.id}>
            <h2>{joke.setup}</h2>
            <p>{joke.punchline}</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}

      {doge ? (
        <div key={doge.message}>
          <img src={doge.message} alt="Rendom Dog Images" />
          <p>{doge.status}</p>
        </div>
      ) : (
        <p>Loding Dog Images....</p>
      )}

      <div style={{ marginTop: "2rem" }}>
        <Button onClick={() => setCount(count + 1)}>counter</Button>
        <h1>Counter: {count}</h1>
      </div>
    </div>
  );
}

export default Jokes;
