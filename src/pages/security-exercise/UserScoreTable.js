import PropTypes from 'prop-types';
import { useState } from 'react';
import { formatDatetime } from 'utils/dateFormatter';

// material-ui
import { 
  Box,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow
} from '@mui/material';

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

// ==============================|| TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: 'username',
    align: 'left',
    disablePadding: false,
    label: 'User Name'
  },
  {
    id: 'score',
    align: 'right',
    disablePadding: false,
    label: 'Score'
  },
  {
    id: 'org',
    align: 'left',
    disablePadding: false,
    label: 'Organization'
  },
  {
    id: 'redeem_time',
    align: 'right',
    disablePadding: false,
    label: 'Redeemed Time'
  }
];

// ==============================|| TABLE - ELEMENT ||============================== //

function MyTableHead({ order, orderBy }) {
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

MyTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string
};

// ==============================|| TABLE ||============================== //

export default function UserScoreTable({userScoreList}) {
  const [order] = useState('asc');
  const [orderBy] = useState('username');
  const [selected] = useState([]);

  const isSelected = (username) => selected.indexOf(username) !== -1;
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
          <MyTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {stableSort(userScoreList, getComparator(order, orderBy)).map((row, index) => {
              const isItemSelected = isSelected(row.username);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.username}
                  selected={isItemSelected}
                >
                  <TableCell component="th" id={labelId} scope="row" align="left">
                    {row.username}
                  </TableCell>
                  <TableCell align="right">{row.score}</TableCell>
                  <TableCell align="left">{row.org}</TableCell>
                  <TableCell align="right">{formatDatetime(row.redeem_time)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
