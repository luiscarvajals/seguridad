import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import './dashboard.css';

const Dashboard = () => {
  const [chartDataUsuarios, setChartDataUsuarios] = useState(null);
  const [chartDataSedes, setChartDataSedes] = useState(null);
  const [chartDataCarreras, setChartDataCarreras] = useState(null);
  const [chartDataNoticias, setChartDataNoticias] = useState(null);

  const barColors = ['#FF5733', '#33FF57', '#5733FF'];
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/dashboard/obtener');
        const data = response.data;

        // Gráfico 1
        const labelsUsuarios = ['Usuarios', 'Sedes', 'Carreras'];
        const dataUsuarios = [data.usuarios.length, data.sedes.length, data.carreras.length];
        setChartDataUsuarios({ labels: labelsUsuarios, data: dataUsuarios });

        // Gráfico 2
        const activeUsers = data.usuarios.filter((usuario) => usuario.activo).length;
        const inactiveUsers = data.usuarios.length - activeUsers;
        const labelsEstadoUsuarios = ['Usuarios Activos', 'Usuarios Inactivos'];
        const dataEstadoUsuarios = [activeUsers, inactiveUsers];
        setChartDataSedes({ labels: labelsEstadoUsuarios, data: dataEstadoUsuarios });

        // Gráfico 3
        const sedesPorPais = {};
        data.sedes.forEach((sede) => {
          if (sedesPorPais[sede.ciudad]) {
            sedesPorPais[sede.ciudad]++;
          } else {
            sedesPorPais[sede.ciudad] = 1;
          }
        });
        const labelsSedes = Object.keys(sedesPorPais);
        const dataSedes = Object.values(sedesPorPais);
        setChartDataCarreras({ labels: labelsSedes, data: dataSedes });

        // Gráfico 4
        const carrerasPorCategoria = {};
        data.carreras.forEach((carrera) => {
          if (carrerasPorCategoria[carrera.categoria]) {
            carrerasPorCategoria[carrera.categoria]++;
          } else {
            carrerasPorCategoria[carrera.categoria] = 1;
          }
        });
        const labelsCarreras = Object.keys(carrerasPorCategoria);
        const dataCarreras = Object.values(carrerasPorCategoria);
        setChartDataNoticias({ labels: labelsCarreras, data: dataCarreras });

  
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-container">
    {/* Gráfico 1: Cantidad Total de Usuarios */}
    <div className="card">
      <h2 className="dashboard-title">Cantidad Total de Usuarios</h2>
      <div className="chart-wrapper">
        <HighchartsReact
          highcharts={Highcharts}
          options={{
            chart: {
              type: 'bar',
            },
            title: {
              text: 'Cantidad Total de Usuarios',
            },
            xAxis: {
              categories: chartDataUsuarios?.labels,
            },
            yAxis: {
              title: {
                text: 'Cantidad',
              },
            },
            series: [
              {
                name: 'Cantidad Total',
                data: chartDataUsuarios?.data.map((value, index) => ({
                  y: value,
                  color: barColors[index],
                })),
                borderWidth: 3,
                dataLabels: {
                  enabled: true,
                  format: '{point.y}',
                },
              },
            ],
          }}
        />
      </div>
    </div>
  
    {/* Gráfico 2: Estado de Usuarios (Activos vs. Inactivos) */}
    <div className="card">
      <h2 className="dashboard-title">Estado de Usuarios</h2>
      {chartDataSedes && (
        <div className="chart-wrapper">
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              chart: {
                type: 'area', // Cambiado de 'pie' a 'area'
              },
              title: {
                text: 'Estado de Usuarios',
              },
              xAxis: {
                categories: chartDataSedes.labels,
              },
              yAxis: {
                title: {
                  text: 'Cantidad',
                },
              },
              series: [
                {
                  name: 'Usuarios',
                  data: chartDataSedes.data,
                  color: '#49FF91',
                },
              ],
            }}
          />
        </div>
      )}
    </div>
  
    {/* Gráfico 3: Cantidad de Sedes por País */}
    <div className="card">
      <h2 className="dashboard-title">Sedes</h2>
      {chartDataCarreras && (
        <div className="chart-wrapper">
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              chart: {
                type: 'pie',
              },
              title: {
                text: 'Cantidad de Sedes',
              },
              series: [
                {
                  name: 'Sedes',
                  data: chartDataCarreras.labels.map((value, index) => ({
                    name: value,
                    y: chartDataCarreras.data[index],
                  })),
                  colors: [
                    'rgba(255, 99, 132, 5.2)',
                    'rgba(54, 162, 235, 5.2)',
                    'rgba(255, 206, 86, 5.2)',
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                  ],
                  borderWidth: 3,
                },
              ],
            }}
          />
        </div>
      )}
    </div>
  
    {/* Gráfico 4: Cantidad de Carreras por Categoría */}
    <div className="card">
      <h2 className="dashboard-title">Carreras por Categoría</h2>
      {chartDataNoticias && (
        <div className="chart-wrapper">
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              chart: {
                type: 'line',
              },
              title: {
                text: 'Carreras por Categoría',
              },
              xAxis: {
                categories: chartDataNoticias.labels,
              },
              yAxis: {
                title: {
                  text: 'Cantidad',
                },
              },
              series: [
                {
                  name: 'Carreras por Categoría',
                  data: chartDataNoticias.data,
                  color: '#FE7F28',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  tension: 0.1,
                },
              ],
            }}
          />
        </div>
      )}
    </div>
  </div>
  );
};

export default Dashboard;
