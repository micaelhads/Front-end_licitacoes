import { Checkbox } from "@mui/material";
import React from 'react';
import axios from 'axios';

function RenderCheckBox(props) {
    const [checked, setChecked] = React.useState(props.value); 
    const handleChange = (event) => {
      setChecked(event.target.checked);
      Save(event.target.checked,props.row)
    };
    const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }
    };

    function Save(checked, item){
      console.log(checked, item)
      item.visualizado = checked;
       axios.post('http://localhost:8080/licitacoes/gravar',item,{ ...config })
           .then(({data}) => {
           })
           .catch(error => {
             console.error('Error fetching data:', error);
           });
    }
    return (
      <Checkbox
        label="some text"
        checked={checked} 
        onChange={handleChange} 
        disabled={checked}
        sx={{ '& .MuiSvgIcon-root': { fontSize: 25 } }}
      />
    );
  }

  export default RenderCheckBox;