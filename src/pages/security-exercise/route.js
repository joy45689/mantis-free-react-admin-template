// third party
import Axios from "axios";



export default function addExercise (values, setDispaly, enqueueSnackbar) {
    Axios.post("/exercises/create", values)
    .then(() => {
      enqueueSnackbar('Successfully added.', {variant: 'success'});
      setDispaly(false);
      console.log("addExercise done!");
    })
    .catch((err) => {
      setDispaly(true);
      enqueueSnackbar('Failed to add.', {variant: 'error'});
      console.log(`addExercise failed!\n${err}\n${err.response.data}`);
    });
}

export function loadExercises(setExerciseList) {
    Axios.get('/exercises')
    .then((response) => {
      setExerciseList(response.data);
    })
    .catch((err)=>{
      console.log(`loadExercises failed!\n${err}\n${err.response.data}`);
    });
}

export function loadUserScore(sn) {
  let promise = new Promise((resolve) => {
    Axios.post('/exercises/user/score', { 'sn': sn })
    .then((response) => {
      resolve(response.data);
    })
    .catch((err)=>{
      console.log(`loadUserScore failed!\n${err}\n${err.response.data}`);
      resolve(null);
    });
  });
  return promise;
}

export function abortExercise(sn) {
  let promise = new Promise((resolve) => {
    Axios.post("/exercises/abort", { "sn": sn })
      .then(() => {
        console.log("abortExercise done!");
        resolve(true);
      })
      .catch((err) => {
        console.log(`abortExercise failed!\n${err}\n${err.response.data}`);
        resolve(false);
      });
  });
  return promise;
}

export function deleteExercise(sn) {
  let promise = new Promise((resolve) => {
    Axios.post("/exercises/delete", { "sn": sn })
      .then(() => {
        console.log("deleteExercise done!");
        resolve(true);
      })
      .catch((err) => {
        console.log(`deleteExercise failed!\n${err}\n${err.response.data}`);
        resolve(false);
      });
  });
  return promise;
}

// exports.loadExercises = (setExerciseList) => {
//     fetch('/exercises')
//     .then((response) => {
//       let json = response.json();
//       // console.log(json)
//       return json
//     })
//     .then((data) => {
//       setExerciseList(data);
//       // console.log(data);
//     });
// }