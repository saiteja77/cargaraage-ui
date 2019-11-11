import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { Grid, Button } from "@material-ui/core";
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  card: {
    width: 300,
    display: "inline-grid",
    margin: 10
  },
  media: {
    height: 0,
    paddingTop: "56.25%"
  },
  propHeading: {
    fontWeight: 600,
    fontSize: "0.8rem"
  },
  propValue: {
    fontWeight: 400,
    fontSize: "0.9rem"
  },
  price: {
    fontWeight: 500,
    fontSize: "1.4rem"
  }
}));

export default function CarCard(props) {
  const classes = useStyles();
  const car = props.data
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={car.pictures[0]}
          title="Paella dish"
        />
        <CardContent>
          <Grid container>
            <Grid item xs={6}>
              <Typography className={classes.carPrice}>$ {car.carPrice}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item sm={12}>
              <Typography color="textSecondary" style={{ textDecoration: "underline" }}>
                {car.specs.year +
                  " " +
                  car.specs.make.value +
                  " " +
                  car.carName}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <Typography color="textSecondary" className={classes.propHeading}>
                Ext. Color :
              </Typography>
              <Typography color="textSecondary">{car.specs.exteriorColor}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography color="textSecondary" className={classes.propHeading}>
                Transmission :
              </Typography>
              <Typography color="textSecondary">{car.specs.transmission}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <Typography color="textSecondary" className={classes.propHeading}>
                Int. Color :
              </Typography>
              <Typography color="textSecondary" className={classes.propValue}>
                {car.specs.interiorColor}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography color="textSecondary" className={classes.propHeading}>
                Driveterrain :
              </Typography>
              <Typography color="textSecondary" className={classes.propValue}>
                {car.specs.driveterrain}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Link to ={"/cars_for_sale/viewcar/" + car.id}>
            <Button
                fullWidth
                aria-label="add to favorites"
                color="primary"
                variant="contained"
            >
                View More
            </Button>
          </Link>
        </CardActions>
      </Card>
    );
}
