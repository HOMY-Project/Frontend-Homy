import React from 'react';
import {CSVLink} from 'react-csv';
import {
    Button,
  } from "antd";

function ExportBtn({data}) {
    return (
        <Button style={{ backgroundColor : "#c2115e", borderColor : "#c2115e" , marginLeft: "2%", color: "#ffff"}}>
            <CSVLink data={data}>Export</CSVLink>
        </Button>
    );
}

export default ExportBtn;