import React, { Fragment } from "react";
import Nav from "../Layout/Nav";
import CarCard from "./CarCard";
import {
  Grid,
  Button,
  FormControl,
  NativeSelect,
  InputLabel,
  GridList,
  Paper,
  FormLabel,
  FormGroup,
  TableBody,
  TableRow,
  TableCell,
  FormControlLabel,
  Checkbox,
  Divider,
  Popover,
  Typography,
  Slider
} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import { createMuiTheme } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core";
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


const styles = ["Sedan", "SUV", "Coupe", "Convertible", "Truck", "Hacthback"];
const makes = [
  "Honda",
  "Toyota",
  "Mercedes",
  "BMW",
  "Audi",
  "Volksvagen",
  "Mazda"
];
export default function() {
  const [cars, setCars] = React.useState([])
  React.useEffect(()=> {
    Axios.get('https://saiteja.dev/cars-api/cars').then(response => {
      setCars(response.data)
    })
  }, [])
  const min = cars.map(car => car.carPrice).sort().shift()
  const max = cars.map(car => car.carPrice).sort().pop()
  const [priceRange, setPriceRange] = React.useState([min, max])
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleApply = (event) => {
      setAnchorEl(null)
  }

  const open = Boolean(anchorEl);
  return (
    <MuiThemeProvider theme={theme}>
      <Nav />
      <Grid container style={{ marginTop: 120, paddingLeft: 20 }}>
        <Grid item xs={12} sm={12} md={4} lg={3} xl={1}>
          <Paper style={{ maxWidth: 270 }}>
            <div style={{ padding: 10 }}>
              <Fragment>
                <Button variant="contained" onClick={handleClick}>
                  <FilterListIcon /> Filter
                </Button>
                <Popover
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left"
                  }}
                >
                  <div style={{ padding: 20, width: 250}}>
                    <Button style={{ marginBottom: 5,align :"right"}} onClick={handleApply}>Apply</Button>
                    <Divider />
                    <FormControl
                      component="fieldset"
                      style={{ marginTop: 10, marginBottom: 5, width: "100%" }}
                    >
                      <FormLabel component="legend">Make</FormLabel>
                      <FormGroup>
                        <TableBody style={{ maxHeight: 150, overflow: "auto" }}>
                          {makes.map((make, index) => {
                            return (
                              <TableRow style={{ display: "flex" }} key={index}>
                                <TableCell style={{ padding: 0, border: 0 }}>
                                  <FormControlLabel
                                    style={{marginBottom: 0}}
                                    control={<Checkbox value={make} />}
                                    label={make}
                                  />
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </FormGroup>
                    </FormControl>
                    <Divider />
                    <FormControl
                      component="fieldset"
                      style={{ marginTop: 10, marginBottom: 5, width: "100%" }}
                    >
                      <FormLabel component="legend">Body Style: </FormLabel>
                      <FormGroup>
                        <TableBody style={{ maxHeight: 150, overflow: "auto" }}>
                          {styles.map((style, index) => {
                            return (
                              <TableRow style={{ display: "flex" }} key={index}>
                                <TableCell style={{ padding: 0, border: 0 }}>
                                  <FormControlLabel
                                    style={{marginBottom: 0}}
                                    control={<Checkbox value={style} />}
                                    label={style}
                                  />
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </FormGroup>
                    </FormControl>
                    <Divider/>
                    <div style={{marginTop: 10}}>
                        <Typography id="range-slider" gutterBottom>
                            Price
                        </Typography>
                        <Slider
                            value={priceRange}
                            onChange={handlePriceRangeChange}
                            min={min}
                            max={max}
                        />
                        <Typography>$ {priceRange[0]} to $ {priceRange[1]}</Typography>
                    </div>
                  </div>
                </Popover>
              </Fragment>
              <FormControl style={{ marginTop: 20 }}>
                <InputLabel shrink htmlFor="age-native-label-placeholder">
                  Sort By:
                </InputLabel>
                <NativeSelect
                  inputProps={{
                    name: "age",
                    id: "age-native-label-placeholder"
                  }}
                >
                  <option value="">None</option>
                  <option value={50}>Make</option>
                  <option value={60}>Model</option>
                  <option value={30}>Year: Newest</option>
                  <option value={40}>Year: Oldest</option>
                  <option value={10}>Price: Highest to Lowest</option>
                  <option value={20}>Price: Lowest to Highest</option>
                </NativeSelect>
              </FormControl>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={9} xl={11}>
          <GridList>
            {cars.map((car, index) => (
              <CarCard data={car} key={index} />
            ))}
          </GridList>
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
}
