import "./list.css"
import Datatable from '../datatable/Datatable'
import { useState } from "react"



const List = ({columns}) => {
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
  };

  return (
    <div className="list">
      <div className="listContainer">
        <Datatable columns={columns} onRowClick={handleRowClick} />
        <div className="selectedRowInfo">
          {selectedRow && (
            <div>
              <h2>Selected Row:</h2>
              <pre>{JSON.stringify(selectedRow, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default List