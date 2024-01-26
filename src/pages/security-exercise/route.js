// third party
import Axios from "axios";

export function loadExercises(setExerciseList) {
    Axios.get('/exercises')
    .then((response) => {
        setExerciseList(response.data);
    });
}

export default function addExercise (values, setDispaly, enqueueSnackbar) {
    Axios.post("/exercises/create", values)
    .then(() => {
      enqueueSnackbar('Successfully added.', {variant: 'success'});
      setDispaly(false);
      console.log("addExercise done!");
    })
    .catch((err) => {
      setDispaly(true);
      console.log("addExercise failed!" + err);
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