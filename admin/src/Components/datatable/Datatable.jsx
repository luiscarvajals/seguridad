import "./datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../Hooks/useFetch";
import axios from "axios";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1]; // e.g., "usuarios"
  const navigate = useNavigate();
  const { data } = useFetch(`/${path}`);
  const [list, setList] = useState([]);

  // On mount, fill our local 'list' state
  useEffect(() => {
    if (data) {
      setList(data);
    }
  }, [data]);

  // Refresh data from server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/${path}`);
        setList(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [path]);

  // Toggle user/career/news "activo" field
  const handleToggleActive = async (row) => {
    try {
      const newStatus = !row.activo;
      // Confirmation
      const confirmText = newStatus
        ? `¿Deseas activar a "${row.usuario || row.nombre || row.titulo}"?`
        : `¿Deseas desactivar a "${row.usuario || row.nombre || row.titulo}"?`;
      if (!window.confirm(confirmText)) return;

      // Send request
      await axios.put(`/${path}/${row._id}`, { activo: newStatus });

      // Update local list
      setList((prev) =>
        prev.map((item) =>
          item._id === row._id ? { ...item, activo: newStatus } : item
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Go to update page
  const handleUpdate = (id) => {
    navigate(`/${path}/${id}`);
  };

  // Action column
  const actionColumn = [
    {
      field: "action",
      headerName: (
        <span style={{ fontWeight: "bold", fontSize: "20px" }}>Acción</span>
      ),
      width: 220,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <button
              className="buttonAct"
              onClick={() => handleUpdate(params.row._id)}
            >
              Actualizar
            </button>
            <div
              className="deleteButton"
              onClick={() => handleToggleActive(params.row)}
            >
              {params.row.activo ? "Desactivar" : "Activar"}
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/nuevoUsuario`} className="link">
          Agregar
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={10}
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
