import React, { useState, useEffect } from "react";

function PerfilGithub() {
  const [username, setUsername] = useState("miguelmorenocolume"); 
  const [searchUser, setSearchUser] = useState(null);              
  const [userData, setUserData] = useState(null);                  
  const [isLoading, setIsLoading] = useState(false);               
  const [error, setError] = useState("");                          

  useEffect(() => {
    if (!searchUser) return;

    const fetchUserData = async () => {
      setIsLoading(true);
      setError("");
      setUserData(null);

      try {
        const response = await fetch(`https://api.github.com/users/${searchUser}`);
        if (!response.ok) {
          throw new Error("Usuario no encontrado");
        }
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [searchUser]);

  const handleBuscar = () => {
    if (username.trim()) {
      setSearchUser(username.trim());
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Buscar Usuario de GitHub</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleBuscar}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Buscar
        </button>
      </div>

      {isLoading && <p>Cargando...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {userData && (
        <div className="bg-white p-6 rounded shadow-md text-center">
          <img
            src={userData.avatar_url}
            alt="Avatar"
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold">{userData.name || userData.login}</h2>
          <p>Repos públicos: {userData.public_repos}</p>
        </div>
      )}
    </div>
  );
}

export default PerfilGithub;
