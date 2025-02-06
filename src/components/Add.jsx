import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuid } from "uuid";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

 const handleSubmit = (e) => {
  e.preventDefault();

  const ids = uuid();
  let uniqueId = ids.slice(0, 8);

  // Retrieve existing employees from local storage
  const existingEmployees = JSON.parse(localStorage.getItem("Employees")) || [];
  existingEmployees.push({ id: uniqueId, Name: name, Age: age });

  localStorage.setItem("Employees", JSON.stringify(existingEmployees));

  navigate("/");
};


  return (
    <div className="container" style={{ marginTop: "5rem", maxWidth: "400px" }}>
      <h3 className="mb-4 text-center">Add Employee</h3>
      <Form className="shadow p-4 rounded bg-light" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAge">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Age"
            required
            onChange={(e) => setAge(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Submit
        </Button>
        <Link to="/" className="btn btn-secondary w-100 mt-3">
          Back to Home
        </Link>
      </Form>
    </div>
  );
};

export default Add;
