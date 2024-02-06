import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const columns = [
  { 
    field: 'username', 
    headerName: 'User Name', 
    headerClassName: 'super-app-theme--header',
    width: 150 },
  {
    field: 'score',
    headerName: 'Score',
    headerClassName: 'super-app-theme--header',
    type: 'number',
    width: 100,
    // editable: true,
  },
  {
    field: 'org',
    headerName: 'Organization',
    headerClassName: 'super-app-theme--header',
    width: 150,
    // editable: true,
  },
  {
    field: 'redeem_time',
    headerName: 'Redeemed Time',
    headerClassName: 'super-app-theme--header',
    type: 'dateTime',
    width: 200,
    // editable: true,
  },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     headerClassName: 'super-app-theme--header',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (params) =>
//       `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//   },
];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

export default function ScoreTable({rows}) {
  const updatedList = rows.map(item => item.redeem_time !== null ? { ...item, redeem_time: new Date(item.redeem_time) } : item);
  return (
    <Box 
    sx={{ 
        height: '100%', 
        width: '100%',
        '& .super-app-theme--header': {
            // backgroundColor: 'rgba(255, 7, 0, 0.55)',
            fontSize: 14
        },
     }}
    >
      <DataGrid
        rows={updatedList}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5,10,25,50]} // Rows per page
        // checkboxSelection
        disableRowSelectionOnClick
        // autoPageSize
        autoHeight
        slots={{ toolbar: GridToolbar }} // Add tool bar
        slotProps={{
          toolbar: {
            showQuickFilter: true, //Display quick filter
          },
        }}
      />
    </Box>
  );
}