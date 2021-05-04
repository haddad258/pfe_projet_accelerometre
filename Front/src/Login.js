import React, { useState } from 'react';

import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios'
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const logo = require('./assets/logo.jpeg');
//import {  as eyepassword} from 'react-feather'
const eye = <FontAwesomeIcon icon={faEye} />;


// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: theme.palette.background.dark,
//     height: '100%',
//     paddingBottom: theme.spacing(3),
//     paddingTop: theme.spacing(3)
//   }
// }));

const LoginView = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  // const navigate = useNavigate();
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      justifyContent="center"
      style={{ backgroundColor: "#000000",  paddingTop: "20", paddingBottom: "20" }}

    >

      <img src={logo} width="" height={350}
        width={600}
        style={{ alignSelf: 'center', paddingTop: "10" ,borderSpacing:"10"}} />
      <Container maxWidth="sm"
        style={{ backgroundColor: "#FFFFFF", width: "100%", height: "100%", paddingTop: "20", paddingBottom: "20" }}
      >
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
            password: Yup.string().max(255).required('Password is required')
          })}


          onSubmit={(values, { setSubmitting }) => {
            //  window.location.href= "/Home"
            // navigate('/app/dashboard', { replace: true });

            axios.post("http://localhost:5000/login", values).then((response) => {

              console.log(response.data)
              if (response.data.error) {

                alert(response.data.message)
                window.location.href = "/"
              } else {
                window.location.href = "/Home"
              }

              // if (response.data.success) {
              // //  navigate('/app/adddl', { replace: true });

              // } else {

              //   alert(response.data.message)

              // }
            })

            /*  if(values.email =="gs1tools@gs1tools.fr" && values.password =="gs1tools1"){
               navigate('/app/dashboard', { replace: true });

             }else {

               alert("check email and password")

             }
             console.log(values)
             setSubmitting(false); */



          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values
          }) => (
            <form onSubmit={handleSubmit}>
              <Box mb={3}>
                <Typography
                  color="textPrimary"
                  variant="h2"
                >
                  Sign in
                  </Typography>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  variant="body2"
                >
                  Sign in on the internal platform
                  </Typography>
              </Box>
              <Grid
                container
                spacing={3}
              >
                {/* <Grid
                      item
                      xs={12}
                      md={6}
                    >
                      <Button

                        fullWidth
                        startIcon={<FacebookIcon />}
                        onClick={handleSubmit}
                        size="large"
                        variant="contained"
                      >
                        Login with Facebook
                    </Button>
                    </Grid> */}
                {/*  <Grid
                      item
                      xs={12}
                      md={6}
                    >
                      <Button
                        fullWidth
                        startIcon={<GoogleIcon />}
                        onClick={handleSubmit}
                        size="large"
                        variant="contained"
                      >
                        Login with Google
                    </Button>
                    </Grid> */}
              </Grid>
              <Box
                mt={3}
                mb={1}
              >
                <Typography
                  align="center"
                  color="textSecondary"
                  variant="body1"
                >
                  {/*  or login with email address */}
                </Typography>
              </Box>
              <TextField
                error={Boolean(touched.email && errors.email)}
                fullWidth
                helperText={touched.email && errors.email}
                label="Email Address"
                margin="normal"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                type="email"
                value={values.email}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.password && errors.password)}
                fullWidth
                helperText={touched.password && errors.password}
                label="Password"
                margin="normal"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                type={passwordShown ? "text" : "password"}
                value={values.password}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <i onClick={togglePasswordVisiblity}>{eye}</i>

                  ),
                }}
              />
              <Box my={2}>
                <Button
                  style={{ background: "#1E90FF" }}


                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Sign in now
                  </Button>
              </Box>
              <Typography
                color="textSecondary"
                variant="body1"
              >
                Don&apos;t have an account?
                  {' '}
                {/* <Link
                      component={RouterLink}
                      to="/register"
                      variant="h6"
                    >
                      Sign up
                  </Link> */}
              </Typography>
            </form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};

export default LoginView;
