import './style.css';
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import Checkbox from './checkbox';


function Home() {
  const columns = [
    { field: "visualizado", headerName: "Visualizado", flex: 1, headerClassName: 'custom-header',cellClassName: 'custom-cell', renderCell: Checkbox },
    { field: 'codUASG', headerName: 'Código da UASG', type: 'number', flex: 1, headerClassName: 'custom-header',cellClassName: 'custom-cell'  },
    { field: 'descricaoLicitacao', headerName: 'Descrição', flex: 5, headerClassName: 'custom-header',cellClassName: 'custom-cell'  },
    { field: 'objeto', headerName: 'Objeto', flex: 5, headerClassName: 'custom-header',cellClassName: 'custom-cell'  },
    { field: 'dataEdital', headerName: 'Edital', flex: 4, headerClassName: 'custom-header',cellClassName: 'custom-cell'  },
    { field: 'endereco', headerName: 'Endereço', flex: 4, headerClassName: 'custom-header',cellClassName: 'custom-cell'  },
    { field: 'telefone', headerName: 'Telefone', flex: 1, headerClassName: 'custom-header',cellClassName: 'custom-cell'  },
    { field: 'fax', headerName: 'Fax', flex: 1, headerClassName: 'custom-header',cellClassName: 'custom-cell'  },
    { field: 'dataEntregaProposta', headerName: 'Entrega da Proposta', flex: 2, headerClassName: 'custom-header',cellClassName: 'custom-cell'  },
  ];
  console.log(columns.map(column => column.width));

  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
  };

  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios.get('http://localhost:8080/licitacoes/getlicitacoes',config)
      .then(({data}) => {
        setRows(data.map(item => ({...item,id:item.codUASG})));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
      });
  },[]);
  return (
    <div style={{ height: '80%', width: '100%' }}>
      {error && <Alert severity="error">Erro ao buscar as licitações</Alert>}
     <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 20 },
        },
      }}
      pageSizeOptions={[20, 30]}
    />
  </div>
  );
}

export default Home;
