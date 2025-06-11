import DashboardLayout from '../../components/DashboardLayout';

function Settings() {
  return <p>Página de configuración del usuario.</p>;
}

Settings.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Settings;
