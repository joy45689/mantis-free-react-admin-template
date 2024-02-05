import { useState, useEffect } from 'react';

// material-ui
import {
  Button,
  Grid,
  Typography,
  IconButton
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

// project import
import ExerciseTable from 'pages/security-exercise/ExerciseTable';
import UserScoreTable from './UserScoreTable';
import AddExerForm from './AddExerForm';
import MainCard from 'components/MainCard';
import { loadExercises, abortExercise, deleteExercise, loadUserScore } from 'pages/security-exercise/route';
import confirmDialog from 'components/ConfirmDialog';
import { formatDatetime } from 'utils/dateFormatter';

// assets
import { PlusOutlined } from '@ant-design/icons';
import { useSnackbar } from 'notistack';


// ==============================|| Functions ||============================== //
const getPercentage = (partial, total) => {
  let percent = Math.round((partial/total) * 100);
  return `${percent}%`;
}


// ==============================|| Security Exercise ||============================== //




const SecurityExercise = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [showAddExerForm, setShowAddExerForm] = useState(false);
  const [showUserScore, setShowUserScore] = useState(false);
  

  const [summary, setSummary] = useState([]);
  const [exerciseList, setExerciseList] = useState([]);
  const [userScoreList, setUserScoreList] = useState([]);
  const [getConfirmation, Confirmation] = confirmDialog();

  useEffect(() => {
    loadExercises(setExerciseList);
  }, [showAddExerForm]);

  const handleAdd = () => {
    setShowAddExerForm(!showAddExerForm);
  };

  const handleView = (targetSN, title) => {
    console.log(targetSN + " " + title + " clicked");

    loadUserScore(targetSN)
    .then((result) => {
      if(result != null){
        const total = result.length;
        let score = 0;
        result.forEach((user) => score = score + user.score);
        let exerciseInfo = exerciseList.filter(e => e.sn === targetSN);
        exerciseInfo = {
          ...exerciseInfo[0], 
          summary: `${score}/${total} (${getPercentage(score, total)})`
        }
        setSummary(exerciseInfo);

        setUserScoreList(result);        
        setShowUserScore(true);
      } else {
        enqueueSnackbar('Failed to load data.', {variant: 'error'});
      }
    });
    
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
          <Typography variant="h4">Secury Exercises</Typography>
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
          <ExerciseTable exerciseList={exerciseList} displayActionBtns viewRow={handleView} deleteRow={handleDelete} abortRow={handleAbort} />
        </MainCard>
      </Grid>

      {/* User score */}
      {showUserScore &&

        <Grid item xs={12}>
          <Grid container rowSpacing={2.5}>
            {/* Title */}
            <Grid item xs={12} md={8} lg={8} xl={5}>
              <Grid container alignItems="left" justifyContent="space-between">
                <Typography variant="h4">User Score</Typography>
                <IconButton onClick={() => setShowUserScore(false)}>
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>
            {/* Info */}
            <Grid item xs={12}>
              <Typography variant="h5">SN: {summary.sn}</Typography>
              <Typography variant="h5">Organization: {summary.org}</Typography>
              {/* <Typography variant="h5">Peroid: {formatDatetime(info.start_time)} - {formatDatetime(info.end_time)}</Typography> */}
              <Typography variant="h5">Start: {formatDatetime(summary.start_time)}</Typography>
              <Typography variant="h5">End: {formatDatetime(summary.end_time)}</Typography>
              <Typography variant="h5">Summary: {summary.summary}</Typography>

            </Grid>
            {/* Table */}
            <Grid item xs={12} md={8} lg={8} xl={5}>
              <MainCard content={false}>
                <UserScoreTable userScoreList={userScoreList} />
              </MainCard>
            </Grid>
          </Grid>
        </Grid>
      }



    </Grid>
  );
};

export default SecurityExercise;
