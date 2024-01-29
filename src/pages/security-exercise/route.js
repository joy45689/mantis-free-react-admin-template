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
    console.log('loadExercises is called');
    Axios.get('/exercises')
    .then((response) => {
        setExerciseList(response.data);
    });
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