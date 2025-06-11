import DashboardLayout from '../../components/DashboardLayout';

function DashboardHome() {
  return <p>Bienvenido al panel de control.</p>;
}

DashboardHome.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default DashboardHome;
