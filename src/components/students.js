import React, { useState, useEffect } from "react";
import "./students.css";

function Students( {onLogout}) {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    const demoStudents = [];

    for (let i = 1; i <= 20; i++) {
      demoStudents.push(`Alumno ${i}`);
    }

    setList(demoStudents);
  }, []);

  const addStudent = () => {
    if (name.trim() === "") {
      alert("Ingrese nombre");
      return;
    }

    setList([...list, name]);
    setName("");
  };

  return (
    <div className="students-container">
      <h2>Registro de Alumnos</h2>

        <button className="logout-btn" onClick={onLogout}>
        Cerrar sesión
        </button>
      

      <div className="form">
        <input
          type="text"
          placeholder="Nombre del alumno"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button onClick={addStudent}>Agregar</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
          </tr>
        </thead>

        <tbody>
          {list.map((student, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{student}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Students;