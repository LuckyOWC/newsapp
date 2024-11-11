import React, { Component } from "react";

export default class Game extends Component {
  constructor() {
    super();
    this.state = {
      data: [
        {
          name: "Lucky",
          email: "lucky@gmail.com",
          phone: "+9198745621",
        },
        {
          name: "Vicky",
          email: "vicky@gmail.com",
          phone: "+9198745621",
        },
        {
          name: "Raj",
          email: "raj@gmail.com",
          phone: "+9198745621",
        },
        {
          name: "JK",
          email: "jk@gmail.com",
          phone: "+9198745621",
        },
      ],
    };
  }

  render() {
    return (
      <div className="container">
        <h1 style={{ marginTop: "50px" }}>Class</h1>
        <div>
          <ul>
            {this.state.data.map((details, index) => (
              <li key={index}>
                <strong>Name: {details.name}</strong>
                <br />
                <strong>Email: {details.email}</strong> <br />
                <strong>Phone: {details.phone}</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
