import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [user, setUser] = useState(null);

  const procesarLogin = (username) => {
    setUser(username);
  };

  const procesarLogout = () => {
    setUser(null);
  };

  return (
    <>
      {user ? (
        <Dashboard user={user} onLogout={procesarLogout} />
      ) : (
        <Login onLogin={procesarLogin} />
      )}
    </>
  );
}

export default App;
