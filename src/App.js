import React, { useState } from "react";
import Login from "./components/login";
import Students from "./components/students";

function App() {
  const [logged, setLogged] = useState(false);
    const handleLogout = () => {
    setLogged(false);
    };

  return (
    <div>
      {!logged ? (
        <Login onLogin={() => setLogged(true)} />
      ) : (
        <Students onLogout={handleLogout}/>
      )}
    </div>
  );
}

export default App;