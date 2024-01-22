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

// project import
import ExerciseTable from 'pages/dashboard/ExerciseTable';
import MainCard from 'components/MainCard';

// assets
// import { GiftOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';
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


const SecurityExercise = () => {
  const [showAddExerForm, setShowAddExerForm] = useState(false);
  const addExercise = () => {
    setShowAddExerForm(!showAddExerForm);
  }

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 0 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Recent Secury Exercises</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <Button onClick={addExercise} variant="contained" color="success" size="small">
          Create a new Activity
        </Button>
        {showAddExerForm && <ExerciseTable />}
        <MainCard sx={{ mt: 2 }} content={false}>
          <ExerciseTable />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default SecurityExercise;
