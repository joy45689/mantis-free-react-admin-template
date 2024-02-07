import * as React from 'react';
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import { 
  Box, 
  Stack, 
  Typography, 
} from '@mui/material';


import Dot from 'components/@extended/Dot';

// Icon
import DeleteIcon from '@mui/icons-material/Delete';
import ViewIcon from '@mui/icons-material/Visibility';
import AbortIcon from '@mui/icons-material/Block';


const ExerciseStatus = ({ status }) => {
  let color;
  let title;

  switch (status) {
    case 0:
      color = 'warning';
      title = 'Pending';
      break;
    case 1:
      color = 'success';
      title = 'Ongoing';
      break;
    case 2:
      color = 'info';
      title = 'End';
      break;
    case 3:
        color = 'error';
        title = 'Cancel';
        break;
    default:
      color = 'primary';
      title = 'None';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};


export default function ExerciseTable({rows, viewRow, deleteRow, abortRow}) {
  const columns = [
    { 
      field: 'sn', 
      headerName: 'Serial Number', 
      width: 180 },
    {
      field: 'org',
      headerName: 'Organization',
      width: 180,
      // editable: true,
    },
    {
      field: 'start_time',
      headerName: 'Start Time	',
      type: 'dateTime',
      width: 200,
      // editable: true,
    },
    {
      field: 'end_time',
      headerName: 'End Time',
      type: 'dateTime',
      width: 200,
      // editable: true,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => (
        <ExerciseStatus status={params.row.status}/>
      ),
    },
    {
      field: 'actions',
      type: 'actions',
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<ViewIcon />}
          label="View"
          onClick={() => viewRow(params.id, 'View')}
          key={params.id}
        />,
        <GridActionsCellItem
          icon={<AbortIcon />}
          label="Abort"
          onClick={() => abortRow(params.id, 'Abort')}
          key={params.id}
        // showInMenu
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => deleteRow(params.id, 'Delete')}
          key={params.id}
        />,
      ],
    },
  ];

  const updatedList = rows.map(item => {
    return {...item, start_time: new Date(item.start_time), end_time: new Date(item.end_time)};
   });

  return (
    <Box 
      sx={{
        height: '100%',
        width: '100%',
      }}
    >
      <DataGrid
        rows={updatedList}
        getRowId={(row) => row.sn}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        sx={{
          "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": {
            outline: "none !important", // Disable cell focus outline
          },
          "& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-columnHeader:focus":
          {
            outline: "none !important", // Disable header focus outline
          },
          '& .MuiDataGrid-cell': {
            fontSize: 14, // Cell fontsize 
          },
          '& .MuiDataGrid-columnHeader': {
            fontSize: 16, // Header fontsize 
            color: 'black',
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