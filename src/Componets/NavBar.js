import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div>
      <Navbar
        fixed="top"
        collapseOnSelect
        expand="sm"
        className="bg-body-tertiary"
        bg="dark"
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            NewsMonkey
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/business">
                Business
              </Nav.Link>
              <Nav.Link as={Link} to="/entertainment">
                Entertainment
              </Nav.Link>

              <Nav.Link as={Link} to="/health">
                Health
              </Nav.Link>
              <Nav.Link as={Link} to="/science">
                Science
              </Nav.Link>
              <Nav.Link as={Link} to="/sports">
                Sports
              </Nav.Link>
              <Nav.Link as={Link} to="/technology">
                Technology
              </Nav.Link>
              <Nav.Link as={Link} to="/Notebook">
                Notebook
              </Nav.Link>
              <Nav.Link as={Link} to="/User">
                User
              </Nav.Link>
              <Nav.Link as={Link} to="/Jokes">
                Jokes
              </Nav.Link>
              <Nav.Link as={Link} to="/Posts">
                post
              </Nav.Link>
              <Nav.Link as={Link} to="/PostData">
                Add User
              </Nav.Link>
            </Nav>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
