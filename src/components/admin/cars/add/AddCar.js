import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import SaveRoundedIcon from "@material-ui/icons/SaveRounded";
import {
  Paper,
  Button,
  TextField,
  MuiThemeProvider,
  Grid
} from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import Specifications from "./Specifications";
import Pictures from "./Pictures";
import Axios from "axios";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#752205"
    },
    secondary: {
      main: "#ffffff"
    }
  }
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function AddCar(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [carName, setCarName] = React.useState("");
  const [carPrice, setCarPrice] = React.useState(0)
  const [data, setData] = React.useState({
    carName: "",
    carPrice: 0,
    specs: {},
    pictures: []
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCarNameChange = event => {
    handleDataChange({ id: "carName", value: event.target.value });
    setCarName(event.target.value);
  };

  const handleCarPriceChange = event => {
    handleDataChange({ id: "carPrice", value: parseInt(event.target.value, 10) });
    setCarPrice(parseInt(event.target.value, 10));
  }

  function handleDataChange(subData) {
    let d = data;
    d[subData.id] = subData.value;
    setData(d);
  }
  const handleClick = event => {
    let payload = data
    Axios.post('http://ec2-18-218-233-7.us-east-2.compute.amazonaws.com/cars', payload).then(response => {
      console.log(response)
    }).catch(error=>{
      console.log(error.response)
    })
  };
  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <Paper>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              <Tab label="New Car" {...a11yProps(0)} />
              <Tab label="Specifications" {...a11yProps(1)} />
              <Tab label="Pictures" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <div style={{display: "inline-grid"}}>
              <TextField
                id="standard-uncontrolled"
                label="Car Name"
                placeholder="Enter the Car Name..."
                className={classes.textField}
                margin="normal"
                value={carName}
                onChange={handleCarNameChange}
              />
              <TextField
                id="standard-uncontrolled"
                label="Car Price"
                placeholder="Enter the Car Price..."
                className={classes.textField}
                margin="normal"
                value={carPrice}
                onChange={handleCarPriceChange}
              />
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Specifications onDataChange={handleDataChange} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Pictures onDataChange={handleDataChange} />
          </TabPanel>
          <Paper
            style={{
              backgroundColor: "#ececec",
              padding: 10,
              borderRadius: 0,
              alignContent: "right"
            }}
          >
            <Grid
              container
              alignItems="flex-start"
              justify="flex-end"
              direction="row"
            >
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleClick}
              >
                <SaveRoundedIcon /> Save
              </Button>
            </Grid>
          </Paper>
        </Paper>
      </div>
    </MuiThemeProvider>
  );
}
