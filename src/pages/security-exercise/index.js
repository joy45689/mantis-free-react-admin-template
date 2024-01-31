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
  }, [showAddExerForm]);

  const addExercise = () => {
    console.log("showAddExerForm: "+ showAddExerForm)
    setShowAddExerForm(!showAddExerForm);
  };

  const handleView = (targetSN, title) => {
    console.log(targetSN + " " + title + " clicked");
  }

  const handleDelete = (targetSN, title) => {
    console.log(targetSN + " " + title + " clicked");
    setExerciseList(exerciseList.filter(e => e.sn !== targetSN));
  }

  const handleAbort = (targetSN, title) => {
    const updatedList = exerciseList.map(item =>
      item.sn === targetSN ? { ...item, status: 3 } : item
    );
    setExerciseList(updatedList);
    console.log(targetSN + " " + title + " clicked");

    //Wrong
    // for (var i = 0; i < exerciseList.length; i++) {
    //   if (exerciseList[i].sn === targetSN) {
    //     exerciseList[i].status = 3;
    //     break;
    //   }
    // }
    // setExerciseList(exerciseList);
  }

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
            showAddExerForm && <Grid item xs={8} md={5} lg={4}>
              <AddExerForm setDispaly={setShowAddExerForm}/>
            </Grid>
          }
        </Grid>
      </Grid>

      {/* Tables */}
      <Grid item xs={12} md={12} lg={12} xl={7}>
        <MainCard content={false}>
          <ExerciseTable exerciseList={exerciseList} displayActionBtns viewRow={handleView} deleteRow={handleDelete} abortRow={handleAbort}/>
        </MainCard>
      </Grid>

    </Grid>
  );
};

export default SecurityExercise;
