import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const View = () => {
  const { id } = useParams();
  const [student, setStudent] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/view/${id}`)
      .then((res) => {
        setStudent(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch student data.");
      });
  }, [id]);

  if (error)
    return (
      <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-4">
          <h2>{error}</h2>
        </div>
      </div>
    );

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-4">
        <h2>Employee Details</h2>
        {student ? (
          <div className="p-4">
            <h2>Name: {student.name}</h2>
            <h2>Position: {student.position}</h2>
            <h2>Department: {student.dept}</h2>
            <h2>Salary: {student.salary}</h2>
          </div>
        ) : (
          <p>Loading student details...</p>
        )}
        <Link to="/" className="btn btn-primary ms-2">
          Back
        </Link>
      </div>
    </div>
  );
};

export default View;
