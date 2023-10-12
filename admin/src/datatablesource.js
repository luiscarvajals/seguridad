export const userColumns = [
    { field: "_id",headerName: <span style={{ fontWeight: 'bold', fontSize:'20px' }}>ID</span>, width: 230},
    {
      field: "usuario",
      headerName: <span style={{ fontWeight: 'bold', fontSize:'20px' }}>Usuario</span>,
      width: 160,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            {params.row.img ? (
              <img
                className="cellImg"
                src={params.row.img}
                alt="avatar"
              />
            ) : (
              <img
                className="cellImg"
                src="https://cdn.tresorit.com/webv10/dist/img/landings/features/icons/icon-file-sharing.3802e9ca.png"
                alt="avatar"
              />
            )}
            {params.row.usuario}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: <span style={{ fontWeight: 'bold', fontSize:'20px' }}>Email</span>,
      width: 200,
    },
    {
      field: "pais",
      headerName: <span style={{ fontWeight: 'bold', fontSize:'20px' }}>País</span>,
      width: 100,
    },
    {
      field: "ciudad",
      headerName: <span style={{ fontWeight: 'bold', fontSize:'20px' }}>Ciudad</span>,
      width: 100,
    },
    {
      field: "telefono",
      headerName: <span style={{ fontWeight: 'bold', fontSize:'20px' }}>Teléfono</span>,
      width: 120,
    },
    {
      field: "isAdmin",
      headerName: <span style={{ fontWeight: 'bold', fontSize:'20px' }}>Admin</span>,
      width: 80,
    },
    {
      field: "activo",
      headerName: <span style={{ fontWeight: 'bold', fontSize:'20px' }}>Activo</span>,
      width: 80,
    },
  ];
  
  export const hotelColumns = [
    { field: "_id", headerName: <span style={{ fontWeight: 'bold', fontSize:'20px' }}>ID</span>, width: 220 },
    // {
    //   field: "titulo",
    //   headerName: "Titulo",
    //   width: 230,
    // },
    {
      field: "tipo",
      headerName: <span style={{ fontWeight: 'bold', fontSize:'20px' }}>Tipo</span>,
      width: 120,
    },
    {
      field: "nombre",
      headerName: <span style={{ fontWeight: 'bold', fontSize:'20px' }}>Nombre</span>,
      width: 150,
    },
    {
      field: "pais",
      headerName: <span style={{ fontWeight: 'bold', fontSize:'20px' }}>País</span>,
      width: 110,
    },
    {
      field: "ciudad",
      headerName: <span style={{ fontWeight: 'bold', fontSize:'20px' }}>Ciudad</span>,
      width: 130,
    },
    {
      field: "destacado",
      headerName: <span style={{ fontWeight: 'bold', fontSize:'20px' }}>Destacado</span>,
      width: 130,
    },
    {
      field: "activo",
      headerName: <span style={{ fontWeight: 'bold', fontSize:'20px' }}>Activo</span>,
      width: 100,
    },
    
  ];
  
  export const habitacionesColumns = [
    { field: "_id", headerName: <span style={{ fontWeight: 'bold', fontSize:'20px' }}>ID</span>, width: 230 },
    {
      field: "titulo",
      headerName: <span style={{ fontWeight: 'bold', fontSize:'20px' }}>Título</span>,
      width: 200,
    },
    {
      field: "descripcion",
      headerName: <span style={{ fontWeight: 'bold', fontSize:'20px' }}>Descripción</span>,
      width: 300,
    },
    {
      field: "precio",
      headerName: <span style={{ fontWeight: 'bold', fontSize:'20px' }}>Precio</span>,
      width: 100,
    },
    {
      field: "maximopersonas",
      headerName: <span style={{ fontWeight: 'bold', fontSize:'20px' }}>Máx P.</span>,
      width: 120,
    },
    {
      field: "activo",
      headerName: <span style={{ fontWeight: 'bold', fontSize:'20px' }}>Activo</span>,
      width: 80,
    },
  ];