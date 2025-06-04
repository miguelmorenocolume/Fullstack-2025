import React, { useEffect, useState } from "react";
import "../styles/randomUser.css";

/**
 * Componente que obtiene y muestra una lista de usuarios aleatorios.
 */
export default function RandomUser() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const controller = new AbortController();

        const fetchUsers = async () => {
            try {
                const response = await fetch("https://randomuser.me/api/?results=10", {
                    signal: controller.signal,
                });
                const data = await response.json();
                setUsers(data.results);
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error("Error fetching users:", error);
                }
            }
        };

        fetchUsers();
        return () => controller.abort();
    }, []);

    return (
        <div className="random-user-container">
            <h2>Usuarios Aleatorios</h2>
            {users.map((user, index) => {
                const { name, email, picture, location, ...rest } = user;
                return (
                    <div className="user-card" key={index}>
                        <img src={picture.medium} alt={`${name.first} ${name.last}`} />
                        <h3>{`${name.first} ${name.last}`}</h3>
                        <p>Email: {email}</p>
                        <p>País: {location.country}</p>
                    </div>
                );
            })}
        </div>
    );
}