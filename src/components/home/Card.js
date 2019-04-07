import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};

class MediaCard extends React.Component{

  render(){
    const {classes} = this.props
    return (
      <Card className={[classes.card, "shadow-box-example z-depth-1-half"].join(" ")}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image= {this.props.cardInfo.src}
          title={this.props.cardInfo.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {this.props.cardInfo.title}
          </Typography>
          <Typography component="p">
            {this.props.cardInfo.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
    )
  }
}


MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
  cardInfo: PropTypes.object.isRequired
};

export default withStyles(styles)(MediaCard);