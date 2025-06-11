import DashboardLayout from '../../components/DashboardLayout';

function Stats() {
  return <p>Estadísticas del sistema y del usuario.</p>;
}

Stats.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Stats;
