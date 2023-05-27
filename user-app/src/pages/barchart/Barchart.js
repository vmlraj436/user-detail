import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Chart, LinearScale,CategoryScale,BarElement } from 'chart.js';

// Register the linear scale
Chart.register(BarElement,LinearScale,CategoryScale);

const SalesDashboard = () => {
  const [salesData,setSalesData] = useState([]);
  const [chartData,setchartData] = useState(null);
  
  const fetchSalesData = () =>{
    fetch("https://blob-internal.goblitz.ai/quickdump/sales-data")
    .then(response => response.json())
    .then(data=>{
      setSalesData(data);
      generateChartData(data);
    })
    .catch(error =>{
      console.error("Error fetching sales data :",error);
    })
  }
  useEffect(()=>{
    fetchSalesData();
  },[]);
  const generateChartData = (data) => {
    const productLines = {};
    data.forEach((sale) => {
      const { PRODUCTLINE } = sale;
      if (productLines[PRODUCTLINE]) {
        productLines[PRODUCTLINE]++;
      } else {
        productLines[PRODUCTLINE] = 1;
      }
    });
    
    const labels = Object.keys(productLines);
    const values = Object.values(productLines);
    //Chart config
    const chartConfig = {
      type: 'bar',
      data:{
        labels,
        datasets:[
          {
            label:'Total Products sold',
            data: values,
            backgroundColor:'rgba(71, 204, 204,0.6)',
            borderColor:'rgba(71, 204, 204,1)',
            borderWidth:1,
          }
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    };
    setchartData(chartConfig);
    };

  
  const columns = [
  {
    field: 'id',headerName: 'ID',width: 70,
  },
  { field: 'productCode', headerName: 'Product Code', width: 200, sortable: true },
  { field: 'productLine', headerName: 'Product Line', width: 150, sortable: true },
  { field: 'sales', headerName: 'Sales', width: 120, sortable: true },
];
const rows = salesData.map((sale,index)=>({
  id : index +1,
  productCode:sale.PRODUCTCODE,
  productLine:sale.PRODUCTLINE,
  sales:sale.SALES,
}));

  return (
    <div className="App">
      <h1>Product Data</h1>
      <div style={{
        display:'flex'
      }}>
        <div style={{
          width:'50%',
          padding:'10px 10px',
          height:'500px'          
        }}>
          {chartData &&

            <Bar data={chartData?.data} options={chartData?.options} />

          }          
        </div>
        <div style={{
          width:'50%',  
          padding:'10px 10px' ,
          height:'500px'        
        }}>
          <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          sortingOrder={["asc","desc"]}
          filterModel={{
            items:[
            {columnField:'productName',
            operatorValue:'contains',
            value:''
            },
            {columnField:'productLine',
            operatorValue:'contains',
            value:''
            },
            {columnField:'sales',
            operatorValue:'equals',
            value:''
            },
            ],
          }}
        />
          
        </div>
      </div>
      
    </div>
  );
};

export default SalesDashboard;
