import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Student = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/")
      .then((res) => setStudents(res.data)) // Update state with the fetched data
      .catch((err) => console.log(err));
  }, []);

     const navigate=useNavigate();
     const handleDelete=(id)=>{
      axios.delete("http://localhost:8081/delete/"+id)
      .then(res=>navigate("/"))
      .catch(err=>console.log(err));
     }
  

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-4">
        <Link to="/create" className="btn btn-success">
          Add +
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Dept</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((data, i) => (
              <tr key={i}>
                <td>{data.name}</td>
                <td>{data.position}</td>
                <td>{data.dept}</td>
                <td>{data.salary}</td>
                <td>
                  <Link to={`view/${data.id}`} className="btn btn-info">View</Link>
                  <Link to={`update/${data.id}`} className="btn btn-primary">
                    Update
                  </Link>
                  <button className="btn btn-danger md-3" onClick={e=>handleDelete(data.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Student;
