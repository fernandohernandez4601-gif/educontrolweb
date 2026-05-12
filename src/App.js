import React, { useState } from "react";
import Login from "./components/login";
import Students from "./components/students";
import Subjects from "./components/subjects";

function App() {
  const [logged, setLogged] = useState(false);

  const [section, setSection] = useState("students");

  const handleLogout = () => {
    setLogged(false);
    setSection("students");
  };

  return (
    <div>
      {!logged ? (
        <Login onLogin={() => setLogged(true)} />
      ) : (
        <div>

          {/* Menú */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginTop: "20px"
            }}
          >
            <button onClick={() => setSection("students")}>
              Alumnos
            </button>

            <button onClick={() => setSection("subjects")}>
              Materias
            </button>
          </div>

          {/* Vista */}
          {section === "students" ? (
            <Students onLogout={handleLogout} />
          ) : (
            <Subjects onLogout={handleLogout} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;