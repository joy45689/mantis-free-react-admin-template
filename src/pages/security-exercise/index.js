import { useState } from 'react';

// material-ui
import {
  // Avatar,
  // AvatarGroup,
  // Box,
  Button,
  Grid,
  // List,
  // ListItemAvatar,
  // ListItemButton,
  // ListItemSecondaryAction,
  // ListItemText,
  // MenuItem,
  // Stack,
  // TextField,
  Typography
} from '@mui/material';
// import { styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';

// project import
import ExerciseTable from 'pages/security-exercise/ExerciseTable';
import AddExerForm from './AddExerForm';
import MainCard from 'components/MainCard';

// assets
import { PlusOutlined } from '@ant-design/icons';
// import avatar1 from 'assets/images/users/avatar-1.png';
// import avatar2 from 'assets/images/users/avatar-2.png';
// import avatar3 from 'assets/images/users/avatar-3.png';
// import avatar4 from 'assets/images/users/avatar-4.png';

// // avatar style
// const avatarSX = {
//   width: 36,
//   height: 36,
//   fontSize: '1rem'
// };

// // action style
// const actionSX = {
//   mt: 0.75,
//   ml: 1,
//   top: 'auto',
//   right: 'auto',
//   alignSelf: 'flex-start',
//   transform: 'none'
// };

// // sales report status
// const status = [
//   {
//     value: 'today',
//     label: 'Today'
//   },
//   {
//     value: 'month',
//     label: 'This Month'
//   },
//   {
//     value: 'year',
//     label: 'This Year'
//   }
// ];

// ==============================|| DASHBOARD - DEFAULT ||============================== //

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

const SecurityExercise = () => {
  const [showAddExerForm, setShowAddExerForm] = useState(false);
  const addExercise = () => {
    console.log("showAddExerForm: "+ showAddExerForm)
    setShowAddExerForm(!showAddExerForm);
  };

  return (
    <Grid container rowSpacing={3} columnSpacing={2.75}>

      {/* Title */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Typography variant="h5">Secury Exercises</Typography>
        </Grid>
      </Grid>


      {/* Buttons */}
      <Grid item xs={12}>
        <Grid container rowSpacing={1}>
          <Grid item xs={12}>
            <Button onClick={addExercise} variant="contained" color="success" size="small" startIcon={<PlusOutlined />}>
              Add
            </Button>
          </Grid>
          {/* Form */}
          {
            showAddExerForm && <Grid item xs={12} md={4} lg={4}>
              <AddExerForm setDispaly={setShowAddExerForm}/>
            </Grid>
          }
        </Grid>
      </Grid>

      {/* Tables */}
      <Grid item xs={12} md={7} lg={8}>
        <MainCard content={false}>
          <ExerciseTable />
        </MainCard>
      </Grid>

    </Grid>
  );
};

export default SecurityExercise;
