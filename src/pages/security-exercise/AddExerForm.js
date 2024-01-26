// import { useEffect, useState } from 'react';
// import { useState } from 'react';

// material-ui
import {
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import Axios from "axios";
import { useSnackbar } from 'notistack';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

// assets

// ============================|| FIREBASE - ADD SECURITY EXERCISE ||============================ //


const formatDate = () => {
  let date = new Date();

  let day = date.getDate();
  let month = date.getMonth()+1;
  let year = date.getFullYear();

  if (day < 10) {
      day = '0' + day;
  }
  if (month < 10) {
      month = `0${month}`;
  }
  
  // return year + "-" + month + "-" + day;
  return `${year}-${month}-${day}`;
}

const addExercise = (values, setDispaly, enqueueSnackbar) => {
  Axios.post("/exercises/create", values)
  .then((res) => {
    enqueueSnackbar('Successfully added.', {variant: 'success'});
    setDispaly(false);
    console.log(res);
    console.log("done!");
  })
  .catch((err) => {
    setDispaly(true);
    console.log(err);
  });
}

const AddExerForm = ({ setDispaly }) => {
  const { enqueueSnackbar } = useSnackbar();
  return (
    <>
      <Formik
        initialValues={{
          organization: '',
          start: formatDate(),
          end: formatDate(),
          submit: null
        }}
        validationSchema={Yup.object().shape({
          organization: Yup.string().max(255).required('Organization is required'),
          start: Yup.string().max(255).required('Start is required'),
          end: Yup.string().max(255).required('End is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            addExercise(values, setDispaly, enqueueSnackbar);
            setStatus({ success: false });
            setSubmitting(false);
            console.log(values);
          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Organization */}
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="organization-add-exer">Organization*</InputLabel>
                  <OutlinedInput
                    id="organization-add-exer"
                    type="text"
                    value={values.organization}
                    name="organization"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="delta"
                    fullWidth
                    error={Boolean(touched.organization && errors.organization)}
                  />
                  {touched.organization && errors.organization && (
                    <FormHelperText error id="helper-text-organization-add-exer">
                      {errors.organization}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              {/* Start */}
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="start-add-exer">Start*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.start && errors.start)}
                    id="start-add-exer"
                    type="date"
                    value={values.start}
                    name="start"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.start && errors.start && (
                    <FormHelperText error id="helper-text-start-add-exer">
                      {errors.start}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              {/* End */}
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="end-add-exer">End*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.end && errors.end)}
                    id="end-add-exer"
                    type="date"
                    value={values.end}
                    name="end"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.end && errors.end && (
                    <FormHelperText error id="helper-text-end-add-exer">
                      {errors.end}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Create
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AddExerForm;
