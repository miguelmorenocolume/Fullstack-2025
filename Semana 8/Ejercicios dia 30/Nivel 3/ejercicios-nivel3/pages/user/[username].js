import { useRouter } from 'next/router';

export default function PerfilUsuario() {
  const { username } = useRouter().query;

  return (
    <div>
      <h1>Perfil de Usuario</h1>
      <p>Nombre de usuario: <strong>{username}</strong></p>
    </div>
  );
}
