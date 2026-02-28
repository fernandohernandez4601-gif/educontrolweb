import React, { useState, useEffect } from "react";
import "./students.css";

function Students( {onLogout}) {
const [name, setName] = useState("");
const [editingIndex, setEditingIndex] = useState(null);
const [error, setError] = useState("");
const [list, setList] = useState(() => {
  const storedStudents = localStorage.getItem("students");

  if (storedStudents) {
    return JSON.parse(storedStudents);
  } else {
    const demoStudents = [];
    for (let i = 1; i <= 20; i++) {
      demoStudents.push(`Alumno ${i}`);
    }
    return demoStudents;
  }
});

  useEffect(() => {
  localStorage.setItem("students", JSON.stringify(list));
  }, [list]);

  const addStudent = () => {
  const trimmedName = name.trim();

  // Validar vacío
  if (trimmedName === "") {
    setError("El nombre del alumno es obligatorio.");
    return;
  }

  // Validar duplicado (ignorando mayúsculas)
  const duplicate = list.some(
    (student, index) =>
      student.toLowerCase() === trimmedName.toLowerCase() &&
      index !== editingIndex
  );

  if (duplicate) {
    setError("El alumno ya está registrado.");
    return;
  }

  setError("");

  if (editingIndex !== null) {
    const updatedList = [...list];
    updatedList[editingIndex] = trimmedName;
    setList(updatedList);
    setEditingIndex(null);
  } else {
    setList([...list, trimmedName]);
  }

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

        <button onClick={addStudent}>
          {editingIndex !== null ? "Actualizar" : "Agregar"}
        </button>

        {error && <p className="error-message">{error}</p>}
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {list.map((student, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{student}</td>
              <td>
                <button
                  onClick={() => {
                    setName(student);
                    setEditingIndex(index);
                  }}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Students;