import React, { Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import { Typography } from "@material-ui/core";
import { Link } from 'react-router-dom'

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #808080",
    backgroundColor: "#363636",
    marginLeft: '50px'
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    "&:focus, &:hover": {
      backgroundColor: '#752205'
    },
  }
}))(MenuItem);

export default function ActionsButton(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <Typography
        style={{ cursor: 'pointer', padding: '5px', color: 'rgb(173, 173, 173) ' }}
        onClick={handleClick}
      >
        <ArrowDropDownRoundedIcon />
      </Typography>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
      {['Edit', 'Add', 'Delete'].map((text, index) => (
        <Link key={index} to={props.link + '/' + text.toLowerCase()}>
            <StyledMenuItem>
                <ListItemIcon style={{color:'rgb(173, 173, 173)'}}>
                    {text === 'Edit' && <EditRoundedIcon/>}
                    {text === 'Add' && <AddBoxRoundedIcon/>}
                    {text === 'Delete' && <DeleteForeverRoundedIcon/>}
                </ListItemIcon>
                <Typography style={{color:'rgb(173, 173, 173)'}}>{text + ' ' + props.item}</Typography>
            </StyledMenuItem>
        </Link>
      ))}
      </StyledMenu>
      </Fragment>
  );
}
