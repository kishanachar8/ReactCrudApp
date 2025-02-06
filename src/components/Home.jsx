import { Fragment, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [employees, setEmployees] = useState([]);
  let history = useNavigate();

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem("Employees")) || [];
    setEmployees(storedEmployees);
  }, []);

  const handleEdit = (id, name, age) => {
    localStorage.setItem("Name", name);
    localStorage.setItem("Age", age);
    localStorage.setItem("Id", id);
  };

  const handleDelete = (id) => {
    const updatedEmployees = employees.filter((e) => e.id !== id);
    setEmployees(updatedEmployees);
    localStorage.setItem("Employees", JSON.stringify(updatedEmployees));
  };

  return (
    <Fragment>
      <div className="container my-4">
        <Table striped bordered hover size="sm">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees && employees.length > 0 ? (
              employees.map((item) => (
                <tr key={item.id}>
                  <td>{item.Name}</td>
                  <td>{item.Age}</td>
                  <td>
                    <Link to={"/edit"}>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() =>
                          handleEdit(item.id, item.Name, item.Age)
                        }
                      >
                        Edit
                      </Button>
                    </Link>
                    &nbsp;
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <br />
        <Link className="d-grid gap-2" to={"/create"}>
          <Button variant="success" size="lg">
            Create New Employee
          </Button>
        </Link>
      </div>
    </Fragment>
  );
};

export default Home;
