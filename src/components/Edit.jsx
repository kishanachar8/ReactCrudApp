import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Edit = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [id, setId] = useState("");
  let history = useNavigate();

  useEffect(() => {
    setName(localStorage.getItem("Name") || "");
    setAge(localStorage.getItem("Age") || "");
    setId(localStorage.getItem("Id") || "");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get the current list of employees from localStorage
    let employees = JSON.parse(localStorage.getItem("Employees")) || [];

    // Find and update the existing employee
    const updatedEmployees = employees.map((employee) =>
      employee.id === id ? { ...employee, Name: name, Age: age } : employee
    );

    // Save the updated list back to localStorage
    localStorage.setItem("Employees", JSON.stringify(updatedEmployees));

    history("/");
  };

  return (
    <div className="container" style={{ marginTop: "5rem", maxWidth: "400px" }}>
      <h3 className="mb-4 text-center">Edit Employee</h3>
      <Form className="shadow p-4 rounded bg-light" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAge">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Age"
            value={age}
            required
            onChange={(e) => setAge(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Update
        </Button>
        <Link to="/" className="btn btn-secondary w-100 mt-3">
          Back to Home
        </Link>
      </Form>
    </div>
  );
};

export default Edit;
