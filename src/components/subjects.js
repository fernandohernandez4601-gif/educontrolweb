import React, { useState, useEffect } from "react";
import "./subjects.css";

function Subjects( {onLogout}) {
const [name, setName] = useState("");
const [editingIndex, setEditingIndex] = useState(null);
const [error, setError] = useState("");
const [list, setList] = useState(() => {
  const storedSubjects = localStorage.getItem("subjects");

  if (storedSubjects) {
    return JSON.parse(storedSubjects);
  } else {
    const demoSubjects = [];
    for (let i = 1; i <= 20; i++) {
      demoSubjects.push(`Materia ${i}`);
    }
    return demoSubjects;
  }
});

  useEffect(() => {
  localStorage.setItem("subjects", JSON.stringify(list));
  }, [list]);

  const addSubject = () => {
  const trimmedName = name.trim();

  // Validar vacío
  if (trimmedName === "") {
    setError("El nombre de la materia es obligatorio.");
    return;
  }

  // Validar duplicado (ignorando mayúsculas)
  const duplicate = list.some(
    (subject, index) =>
      subject.toLowerCase() === trimmedName.toLowerCase() &&
      index !== editingIndex
  );

  if (duplicate) {
    setError("La materia ya está registrada.");
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
    <div className="subjects-container">
      <h2>Registro de Materias</h2>

        <button className="logout-btn" onClick={onLogout}>
        Cerrar sesión
        </button>
      

      <div className="form">
        <input
          type="text"
          placeholder="Nombre de la materia"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button onClick={addSubject}>
          {editingIndex !== null ? "Actualizar" : "Agregar"}
        </button>

        {error && <p className="error-message">{error}</p>}
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre de materia</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {list.map((subject, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{subject}</td>
              <td>
                <button
                  onClick={() => {
                    setName(subject);
                    setEditingIndex(index);
                  }}
                >
                  Editar
                </button>

                <button
                  className="delete-btn"
                  onClick={() => {
                    const confirmDelete = window.confirm(
                      "¿Deseas eliminar esta materia?"
                    );

                    if (confirmDelete) {
                      const updatedList = list.filter((_, i) => i !== index);
                      setList(updatedList);
                    }
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Subjects;