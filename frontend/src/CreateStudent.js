import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateStudent = () => {
  const [name, setName] = useState("");
  const[position, setPosition]=useState("");
  const [dept, setDept] = useState("");
  const [salary, setSalary] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:8081/create", { name, position, dept, salary })
      .then((res) => {
        console.log(res);
        navigate("/");  // Redirects to the home page after successful submission
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-dark vh-100">
      <div className="bg-white rounded w-50 p-3">
        <form onSubmit={handleSubmit}>
          <h2>Add Student</h2>
          <div className="mb-4">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="position">Position</label>
            <input
              type="text"
              placeholder="Enter Position"
              className="form-control"
              id="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>
         
          <div className="mb-4">
            <label htmlFor="dept">Dept</label>
            <input
              type="text"
              placeholder="Enter Dept"
              className="form-control"
              id="dept"
              value={dept}
              onChange={(e) => setDept(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="salary">Salary</label>
            <input
              type="number"
              placeholder="Enter Salary"
              className="form-control"
              id="salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateStudent;

