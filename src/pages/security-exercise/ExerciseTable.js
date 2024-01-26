import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Box, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// project import
import Dot from 'components/@extended/Dot';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function formatDate(dateTime){
    let date = new Date(dateTime);

    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();

    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = `0${month}`;
    }
    
    // return year + "-" + month + "-" + day;
    return `${year}-${month}-${day}`;
}

// ==============================|| TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: 'sn',
    align: 'left',
    disablePadding: false,
    label: 'Serial Number'
  },
  {
    id: 'org',
    align: 'left',
    disablePadding: false,
    label: 'Organization'
  },
  {
    id: 'start',
    align: 'left',
    disablePadding: false,
    label: 'Start'
  },
  {
    id: 'end',
    align: 'left',
    disablePadding: false,
    label: 'End'
  },
  {
    id: 'status',
    align: 'left',
    disablePadding: false,
    label: 'Status'
  }
];

// ==============================|| TABLE - HEADER ||============================== //



function ExerTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

ExerTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string
};

// ==============================|| TABLE - STATUS ||============================== //

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

ExerciseStatus.propTypes = {
  status: PropTypes.number
};

// ==============================|| TABLE ||============================== //

export default function OrderTable() {
  const [order] = useState('asc');
  const [orderBy] = useState('status');
  const [selected] = useState([]);

  const isSelected = (sn) => selected.indexOf(sn) !== -1;

  const [exerciseList, setExerciseList] = useState([]);
  useEffect(() => {
    fetch('/exercises')
    .then((response) => {
      let json = response.json();
      // console.log(json)
      return json
    })
    .then((data) => {
      setExerciseList(data);
      // console.log(data);
    });
  }, []);

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          sx={{
            '& .MuiTableCell-root:first-of-type': {
              pl: 2
            },
            '& .MuiTableCell-root:last-of-type': {
              pr: 3
            }
          }}
        >
          <ExerTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {stableSort(exerciseList, getComparator(order, orderBy)).map((row, index) => {
              const isItemSelected = isSelected(row.sn);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.sn}
                  selected={isItemSelected}
                >
                  <TableCell component="th" id={labelId} scope="row" align="left">
                    <Link color="secondary" component={RouterLink} to="/color">
                      {row.sn}
                    </Link>
                  </TableCell>
                  <TableCell align="left">{row.org}</TableCell>
                  <TableCell>{formatDate(row.start)}</TableCell>
                  <TableCell>{formatDate(row.end)}</TableCell>
                  <TableCell align="left">
                    <ExerciseStatus status={row.status} />
                  </TableCell>
                  {/* <TableCell align="right">
                    <NumberFormat value={row.status} displayType="text" thousandSeparator prefix="$" />
                  </TableCell> */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
