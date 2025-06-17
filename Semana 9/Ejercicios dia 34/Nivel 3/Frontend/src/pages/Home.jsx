export default function Home({ user }) {
  return (
    <div>
      <h1>Inicio</h1>
      {user ? (
        <p>Bienvenido, {user.email} {user.isAdmin && '(Admin)'}</p>
      ) : (
        <p>No has iniciado sesión.</p>
      )}
    </div>
  );
}
