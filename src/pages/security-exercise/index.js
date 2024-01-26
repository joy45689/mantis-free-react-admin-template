import { useState, useEffect } from 'react';

// material-ui
import {
  Button,
  Grid,
  Typography
} from '@mui/material';

// project import
import ExerciseTable from 'pages/security-exercise/ExerciseTable';
import AddExerForm from './AddExerForm';
import MainCard from 'components/MainCard';
import { loadExercises } from 'pages/security-exercise/route';

// assets
import { PlusOutlined } from '@ant-design/icons';

// ==============================|| Security Exercise ||============================== //

const SecurityExercise = () => {
  const [showAddExerForm, setShowAddExerForm] = useState(false);

  const [exerciseList, setExerciseList] = useState([]);
  useEffect(() => {
    loadExercises(setExerciseList);
  }, []);

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
          <ExerciseTable exerciseList={exerciseList}/>
        </MainCard>
      </Grid>

    </Grid>
  );
};

export default SecurityExercise;
