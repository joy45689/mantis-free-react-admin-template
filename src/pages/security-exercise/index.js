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
import { loadExercises, abortExercise, deleteExercise } from 'pages/security-exercise/route';
import confirmDialog from 'components/ConfirmDialog';

// assets
import { PlusOutlined } from '@ant-design/icons';
import { useSnackbar } from 'notistack';


// ==============================|| Security Exercise ||============================== //




const SecurityExercise = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [showAddExerForm, setShowAddExerForm] = useState(false);

  const [exerciseList, setExerciseList] = useState([]);
  const [ getConfirmation, Confirmation ] = confirmDialog();

  useEffect(() => {
    loadExercises(setExerciseList);
  }, [showAddExerForm]);

  const handleAdd = () => {
    setShowAddExerForm(!showAddExerForm);
  };

  // TODO to be update
  const handleView = (targetSN, title) => {
    console.log(targetSN + " " + title + " clicked");
  }

  const handleDelete = async (targetSN, title) => {
    console.log(targetSN + " " + title + " clicked");
    const status = await getConfirmation('Warning!','Do you want to delete this security exercise?');
    
    if (status) {
      if(await deleteExercise(targetSN)){
        setExerciseList(exerciseList.filter(e => e.sn !== targetSN));
        enqueueSnackbar('Successfully deleted.', {variant: 'success'});
      } else {
        enqueueSnackbar('Failed to delete.', {variant: 'error'});
      }
      
    }
  }

  // TODO to be update
  const handleAbort = async (targetSN, title) => {
    console.log(targetSN + " " + title + " clicked");
    const status = await getConfirmation('Warning!','Do you want to abort this security exercise?');
    
    if (status) {
      if(await abortExercise(targetSN)){
        const updatedList = exerciseList.map(item =>
          item.sn === targetSN ? { ...item, status: 3 } : item
        );
        setExerciseList(updatedList);
        enqueueSnackbar('Successfully abborted.', {variant: 'success'});
      } else {
        enqueueSnackbar('Failed to abort.', {variant: 'error'});
      }
    }

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

      <Confirmation />

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
            <Button onClick={handleAdd} variant="contained" color="success" size="small" startIcon={<PlusOutlined />}>
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
