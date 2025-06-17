export default function Protected({ user }) {
  return (
    <div>
      <h1>Zona Protegida</h1>
      <p>Hola {user.email}, estás en contenido protegido.</p>
    </div>
  );
}
