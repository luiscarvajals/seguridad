export const userColumns = [
    { field: "_id",headerName: <span style={{ fontWeight: 'bold', fontSize:'20px' }}>ID</span>, width: 210},
    {
      field: "usuario",
      headerName: <span style={{ fontWeight: 'bold', fontSize:'20px' }}>Usuario</span>,
      width: 100,
      // renderCell: (params) => {
      //   return (
      //     <div className="cellWithImg">
      //       {params.row.img ? (
      //         <img
      //           className="cellImg"
      //           src={params.row.img}
      //           alt="avatar"
      //         />
      //       ) : (
      //         <img
      //           className="cellImg"
      //           src="https://cdn.tresorit.com/webv10/dist/img/landings/features/icons/icon-file-sharing.3802e9ca.png"
      //           alt="avatar"
      //         />
      //       )}
      //       {params.row.usuario}
      //     </div>
      //   );
      // },
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
      field: "roles",
      headerName: <span style={{ fontWeight: 'bold', fontSize:'20px' }}>Rol</span>,
      width: 80,
    },
    {
      field: "activo",
      headerName: <span style={{ fontWeight: 'bold', fontSize:'20px' }}>Activo</span>,
      width: 80,
    },
  ];

  export const noticiaColumns = [
    { field: "_id",headerName: <span style={{ fontWeight: 'bold', fontSize:'20px' }}>ID</span>, width: 210},
    {
      field: "titulo",
      headerName: <span style={{ fontWeight: 'bold', fontSize:'20px' }}>Título</span>,
      width: 200,
    },
    // {
    //   field: "descripcion",
    //   headerName: <span style={{ fontWeight: 'bold', fontSize:'20px' }}>Descripción</span>,
    //   width: 200,
    // },
    {
      field: "destacada",
      headerName: <span style={{ fontWeight: 'bold', fontSize:'20px' }}>Destacada</span>,
      width: 130,
    },
    {
      field: "activo",
      headerName: <span style={{ fontWeight: 'bold', fontSize:'20px' }}>Activo</span>,
      width: 80,
    },
    // {
    //   field: "contenido",
    //   headerName: <span style={{ fontWeight: 'bold', fontSize:'20px' }}>Contenido</span>,
    //   width: 80,
    // },
    {
      field: "fecha_publicacion",
      headerName: <span style={{ fontWeight: 'bold', fontSize:'20px' }}>Fecha Publicación</span>,
      width: 200,
    },
    // {
    //   field: "img",
    //   headerName: <span style={{ fontWeight: 'bold', fontSize:'20px' }}>Imagen</span>,
    //   width: 100,
    //   renderCell: (params) => {
    //     return (
    //       <div className="cellWithImg">
    //         {params.row.img ? (
    //           <img
    //             className="cellImg"
    //             src={params.row.img}
    //             alt="avatar"
    //           />
    //         ) : (
    //           <img
    //             className="cellImg"
    //             src="https://cdn.tresorit.com/webv10/dist/img/landings/features/icons/icon-file-sharing.3802e9ca.png"
    //             alt="avatar"
    //           />
    //         )}
    //       </div>
    //     );
    //   },
    // },
  ];

  export const sedesColumns = [
    { field: "_id",headerName: <span style={{ fontWeight: 'bold', fontSize:'20px' }}>ID</span>, width: 210},
    {
      field: "nombre",
      headerName: <span style={{ fontWeight: 'bold', fontSize:'20px' }}>Nombre</span>,
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
      field: "activo",
      headerName: <span style={{ fontWeight: 'bold', fontSize:'20px' }}>Activo</span>,
      width: 80,
    },
  ];
  
