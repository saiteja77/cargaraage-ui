import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Paper } from "@material-ui/core";
import DatePicker from "./DatePicker";
import RadioButtonsGroup from "./RadioButtonsGroup";
import Nav from '../Layout/Nav'
import { createMuiTheme } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core";
import Axios from "axios";
import { connect } from 'react-redux'
import { saveUserToken } from '../../actions'
import { useHistory, Redirect } from 'react-router-dom'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#752205"
        },
        secondary: {
            main: "#ffffff"
        },
    }
});

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%"
  },
  button: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2)
  },
  datePicker: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2)
  },
  paper: {
    marginTop: theme.spacing(2),
    paddingTop: 10,
    paddingBottom: 15,
    boxShadow:
      "1px 1px 7px 10px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    maxWidth: 500,
    float: "right"
  }
}));

function Signup(props) {
  const classes = useStyles();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [gender, setGender] = React.useState("Female");
  const [dob, setDob] = React.useState(0);
  const [firstNameNameError, setFirstNameNameError] = React.useState("0");
  const [lastNameError, setLastNameError] = React.useState("0");
  const [userNameError, setUserNameError] = React.useState("0");
  const [emailError, setEmailError] = React.useState("0");
  const [passwordError, setPasswordError] = React.useState("0");
  const [validateError, setValidateError] = React.useState(true);
  let history = useHistory()

  React.useEffect(() => {
    if (
      firstNameNameError.length !== 0 ||
      lastNameError.length !== 0 ||
      userNameError.length !== 0 ||
      emailError.length !== 0 ||
      passwordError.length !== 0
    ) {
      setValidateError(true);
    } else {
      setValidateError(false);
    }
  }, [
    firstNameNameError,
    lastNameError,
    userNameError,
    emailError,
    passwordError
  ]);

  let input = [
    {
      label: "First Name",
      name: "firstName",
      value: firstName,
      helperText: firstNameNameError
    },
    {
      label: "Last Name",
      name: "lastName",
      value: lastName,
      helperText: lastNameError
    },
    {
      label: "User Name",
      name: "userName",
      value: userName,
      helperText: userNameError
    },
    {
      label: "Date of Birth",
      name: "dob",
      value: dob
    },
    {
      label: "Gender",
      name: "gender",
      value: gender
    },
    {
      label: "Email",
      name: "email",
      value: email,
      helperText: emailError
    },
    {
      label: "Password",
      name: "password",
      value: password,
      helperText: passwordError
    }
  ];

  function setError(name, message) {
    switch (name) {
      case "firstName":
        setFirstNameNameError(message);
        break;
      case "lastName":
        setLastNameError(message);
        break;
      case "userName":
        setUserNameError(message);
        break;
      case "email":
        setEmailError(message);
        break;
      case "password":
        setPasswordError(message);
        break;
      default:
        break;
    }
  }

  const handleChange = event => {
    const name = /^[A-Za-z\s]+$/;
    const validUserName = /^[a-zA-Z0-9]([a-zA-Z0-9-_.]*[a-zA-Z0-9]){8,16}?$/;
    const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#$%^&*])[a-zA-Z0-9.!@#$%^&*]{8,32}$/;
    const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    switch (event.target.name) {
      case "firstName":
        setFirstName(event.target.value);
        if (event.target.value.trim().length < 4) {
          setError("firstName", "Should be more than 4 letters");
        } else if (!event.target.value.match(name)) {
          setError("firstName", "Should contain only letters");
        } else {
          setFirstNameNameError("");
        }
        break;
      case "lastName":
        setLastName(event.target.value);
        // validate("firstName")
        if (event.target.value.trim().length < 4) {
          setError("lastName", "Should be more than 4 letters");
        } else if (!event.target.value.match(name)) {
          setError("lastName", "Should contain only letters");
        } else {
          setLastNameError("");
        }
        break;
      case "userName":
        setUserName(event.target.value);
        if (!event.target.value.match(validUserName)) {
          setError("userName", "Should contain only alphanumerics and .-_");
        } else {
          setUserNameError("");
        }
        // validate("firstName")
        break;
      case "email":
        setEmail(event.target.value);
        if (!event.target.value.match(validEmail)) {
          setError("email", "Invalid Email Address");
        } else {
          setEmailError("");
        }
        break;
      case "password":
        setPassword(event.target.value);
        if (!event.target.value.match(validPassword)) {
          setError(
            "password",
            "Should be 8-32 characters length, at least one lowercase letter, one upper case letter and one of the symbols .!@#$%^&*"
          );
        } else {
          setPasswordError("");
        }
        break;
      default:
        break;
    }
  };

  function changeDate(value) {
    setDob(value);
  }

  function changeGender(value) {
    setGender(value);
  }

  const formSubmitted = event => {
    event.preventDefault();
    let payload = {
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      password: password,
      gender: gender,
      email: email,
      status: "ACTIVE",
      dob: dob.valueOf()
    };
    Axios.post('https://saiteja.dev/auth/sign_up',payload).then(response => {
      localStorage.setItem("cg-tk",response.data.token)
      history.goBack()
    }).catch(error => {
    })
  };

  return (
    localStorage.getItem('cg-tk') ? (<Redirect to="/"/>) : (
    <MuiThemeProvider theme={theme}>
    <Nav />
    <Grid style={{paddingTop: 100}} container spacing={3}>
      <Grid item xs={1} sm={3} md={6} lg={7} />
      <Grid item sm={8} md={5} lg={4}>
        <Paper className={classes.paper}>
          <form
            onSubmit={formSubmitted}
            className={classes.container}
            noValidate
            autoComplete="on"
          >
            {input.map((row, index) => {
              if (row.name === "dob") {
                return (
                  <DatePicker
                    key={index}
                    value={row.value}
                    onDateChange={changeDate}
                  />
                );
              } else if (row.name === "gender") {
                return (
                  <RadioButtonsGroup
                    key={index}
                    value={row.value}
                    onGenderChange={changeGender}
                  />
                );
              } else {
                return (
                  <TextField
                    key={index}
                    required
                    className={classes.textField}
                    label={row.label}
                    margin="normal"
                    value={row.value}
                    name={row.name}
                    variant="outlined"
                    type={row.name === "password" ? "password" : "text"}
                    onChange={handleChange}
                    error={row.helperText.replace("0", "") ? true : false}
                    helperText={row.helperText.replace("0", "")}
                  />
                );
              }
            })}
            <Button
              color="primary"
              variant="contained"
              className={classes.button}
              type="submit"
              disabled={validateError}
            >
              Sign Up
            </Button>
          </form>
        </Paper>
      </Grid>
      <Grid item xs={1} />
    </Grid>
    </MuiThemeProvider>
  ))
}

const mapStateToProps = state => ({
  decodedToken: state.authReducer.decodedToken
})
export default connect(mapStateToProps, { saveUserToken }) (Signup)