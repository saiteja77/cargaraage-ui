import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { MuiThemeProvider, Grid, Paper } from "@material-ui/core";
import Nav from "../Layout/Nav";
import { makeStyles } from "@material-ui/core/styles"
import CarDetails from "./CarDetails";
import Axios from "axios";
import { Redirect } from 'react-router-dom'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#752205"
    },
    secondary: {
      main: "#363636"
    },
    text: {
      primary: "#363636"
    }
  },
});

const useStyles = makeStyles({
  grid: {
    padding: 10
  }
})


export default function ViewCar(props) {
  const [data, setData] = React.useState({})
  const [error, setError] = React.useState(false)
  React.useEffect(() => {
    Axios.get(`${'https://saiteja.dev/cars-api/cars/'}${props.match.params.key}`).then(response => {
      setData(response.data)
    }).catch(error => {
      setError(true)
    })
  }, [props.match.params.key])
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  function handleIndexChange(index) {
    setSelectedIndex(index)
  }

  const classes = useStyles()
  return (
    error ? (<Redirect to='/404_not_found' />) : (
      <MuiThemeProvider theme={theme}>
        <Nav />
        {data.hasOwnProperty('carName') && <Grid container style={{ marginTop: 120 }}>
          <Grid item md={2} className={classes.grid}></Grid>
          <Grid item md={5} className={classes.grid}>
            <Paper>
              <img alt="img" style={{ width: "100%" }} src={data.pictures[selectedIndex]} />
            </Paper>
          </Grid>
          <Grid item md={4} className={classes.grid}>
            <CarDetails onIndexChange={handleIndexChange} data={data} />
          </Grid>
        </Grid>}
      </MuiThemeProvider>
    )
  )
}