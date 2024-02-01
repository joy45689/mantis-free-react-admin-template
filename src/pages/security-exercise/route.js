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
      console.log("addExercise failed! " + err);
    //   console.log(err);
    });
}

export function loadExercises(setExerciseList) {
    Axios.get('/exercises')
    .then((response) => {
        setExerciseList(response.data);
    });
}

export function abortExercise(sn) {
  console.log('abortExercise is called');
  let promise = new Promise((resolve) => {
    Axios.post("/exercises/abort", { "sn": sn })
      .then(() => {
        // console.log(res);
        console.log("abortExercise done!");
        resolve(true);
      })
      .catch((err) => {
        console.log("abortExercise failed! " + err);
        resolve(false);
        //   console.log(err);
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