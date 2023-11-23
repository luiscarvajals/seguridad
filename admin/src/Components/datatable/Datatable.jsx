import "./datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../Hooks/useFetch";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "react-tabs/style/react-tabs.css";
import { useNavigate } from "react-router-dom";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const navigate = useNavigate();
  const { data} = useFetch(`/${path}`);
  const [list, setList] = useState([]);

  useEffect(() => {
    if (data) {
      setList(data);
    }
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/${path}`);
        setList(response.data);
      } catch (err) {}
    };
  
    fetchData(); 
  }, [path]);
  

  const handleDelete = async (id) => {
    try {
      await axios.put(`/${path}/${id}`, { activo: false });
      setList(list.filter((item) => item._id !== id));
    } catch (err) {}
  };

  const handleUpdate = (id) => {
    navigate(`/${path}/${id}`);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: <span style={{ fontWeight: 'bold', fontSize:'20px' }}>Acción</span>,
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <button className="buttonAct" onClick={() => handleUpdate(params.row._id)}>
              Actualizar
            </button>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Borrar
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
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;