import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import ToolTip from '@material-ui/core/Tooltip'
import { Link } from 'react-router-dom'
import { Button, Typography, InputLabel, InputAdornment } from '@material-ui/core';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField } from "@material-ui/core";
import Axios from 'axios';
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';
import { createMuiTheme } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Box from '@material-ui/core/Box';
import Badge from '@material-ui/core/Badge';
import { connect } from 'react-redux'
import { saveUserToken } from '../../actions'
import jwt from 'jwt-decode'

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

const StyledBadge = withStyles(theme => ({
  badge: {
    right: -3,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 3,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

class PrimarySearchAppBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    login: false,
    open: false,
    userName: "",
    password: "",
    errorMessage: ""
  };

  componentWillMount(){
    if(localStorage.getItem('cg-tk')){
      const exp = jwt(localStorage.getItem('cg-tk')).exp
      if(new Date(exp * 1000) > Date.now()){
        this.props.saveUserToken()
      } else{
        localStorage.removeItem('cg-tk')
      }
    }
  }

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  handleChange = event => {
    switch (event.target.name) {
      case "userName":
        this.setState({ userName: event.target.value })
        break;
      case "password":
        this.setState({ password: event.target.value })
        break;
      default:
        break;
    }
  }

  handleLogout = event => {
    localStorage.removeItem('cg-tk')
    this.props.saveUserToken()
    this.setState({ anchorEl: null });
  }

  handleLogin = event => {
    event.preventDefault()
    var payload = {
      userName: this.state.userName,
      password: this.state.password
    }
    Axios.post('https://saiteja.dev/auth/login/authorize', payload).then(response => {
      localStorage.removeItem("cg-tk")
      localStorage.setItem("cg-tk", response.data.token)
      this.props.saveUserToken()
      this.setState({
        login: false,
        open: false,
        userName: "",
        password: "",
        errorMessage: ""
      })
    }).catch(error => {
      this.setState({ errorMessage: error.response.data.message })
    })
  }

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const {fullName, group} = this.props.decodedToken

    const handleClickOpen = () => {
      this.setState({ open: true })
    };

    const handleClose = () => {
      this.setState({ open: false })
    };
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        {group && group.includes('ADMIN') &&
        <Link to='/admin'><MenuItem onClick={this.handleMenuClose}>Admin</MenuItem></Link>}
        <MenuItem onClick={this.handleLogout}>Log Out</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <Link to='/'>
          <MenuItem onClick={this.handleMobileMenuClose}>
            <IconButton color="inherit" style={{ fontSize: '15px'}}>
              <p>HOME</p>
            </IconButton>
          </MenuItem>
        </Link>
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit" style={{ fontSize: '15px' }}>
            <p>NEWS</p>
          </IconButton>
        </MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit" style={{ fontSize: '15px' }}  >
            <p>VIDEOS & REVIEWS</p>
          </IconButton>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <AppBar position="fixed" style={{ background: '#752205', zIndex: '3' }}>
            <Toolbar>
              <img src="https://raw.githubusercontent.com/saiteja77/CarGaraage/master/images/CarGaraageLogo.png" alt="CarGaraage" style={{ width: "auto", height: "70.3px", marginBottom: "-2rem", marginLeft: "100px" }} />
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>

                <Link to='/'>
                  <Button color="inherit" style={{ fontSize: '15px', height:"100%" }}>
                    HOME
                </Button>
                </Link>
                <Button color="inherit" style={{ fontSize: '15px' }}>
                  NEWS
              </Button>
                <Button color="inherit" style={{ fontSize: '15px' }}>
                  VIDEOS & REVIEWS
              </Button>
                <Link to='/cars_for_sale'>
                  <Button color="inherit" style={{ fontSize: '15px', height:"100%" }}>
                  Cars for Sale
                  </Button>
                </Link>
                <Link to='/cart'>
                  <Box display="flex">
                    <Box m={1}>
                      <IconButton aria-label="cart">
                        <StyledBadge badgeContent={this.props.quantity === undefined? (0): (this.props.quantity)} color="primary">
                          <ShoppingCartIcon color="secondary" />
                        </StyledBadge>
                      </IconButton>
                    </Box>
                  </Box>
                </Link>
                  {fullName ? (<ToolTip title={fullName}>
                      <IconButton
                      aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                      aria-haspopup="true"
                      onClick={this.handleProfileMenuOpen}
                      color="inherit"
                      style={{height:50, marginTop: 7}}
                    >
                      <AccountCircle />
                    </IconButton>
                    </ToolTip>) : (
                      <ToolTip title="Login" placement="bottom">
                        <Button onClick={handleClickOpen} color="secondary">Log in</Button>
                      </ToolTip>
                    )}
                  <Dialog
                    open={this.state.open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                  <DialogTitle id="simple-dialog-title">Log in</DialogTitle>
                  <form onSubmit={this.handleLogin}>
                    {this.state.errorMessage && <InputLabel style={{ paddingLeft: 30, fontSize: 14, color: "red" }} htmlFor="max-width">{"! " + this.state.errorMessage}</InputLabel>}
                    <DialogContent style={{ display: "inline-grid" }}>
                      <TextField
                        required
                        label="User Name"
                        margin="normal"
                        variant="outlined"
                        value={this.state.userName}
                        type="text"
                        name="userName"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccountCircle />
                            </InputAdornment>
                          ),
                        }}
                        onChange={this.handleChange}
                        style={{ width: 300 }}
                      />
                      <TextField
                        required
                        label="Password"
                        margin="normal"
                        variant="outlined"
                        type="password"
                        name="password"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <VpnKeyRoundedIcon />
                            </InputAdornment>
                          ),
                        }}
                        onChange={this.handleChange}
                        value={this.state.password}
                        style={{ width: 300 }}
                      />
                    </DialogContent>
                    <DialogActions style={{ display: "block" }}>
                      <Button type="submit" style={{ width: "100%", minHeight: 50, marginTop: 20 }} color="primary" variant="contained">
                        Log in
                  </Button>
                      <Typography style={{ marginTop: 10 }}>New User? <Link to="/signup" style={{ textDecoration: "underline" }}>Sign up Here</Link></Typography>
                    </DialogActions>
                  </form>
                </Dialog>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                  <MoreIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          <AppBar position="fixed" style={{ marginTop: "60px", background: "#363636", zIndex: "2", height: "2rem" }}>
            <Toolbar></Toolbar>
          </AppBar>
          {renderMenu}
          {renderMobileMenu}
        </div>
      </MuiThemeProvider>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  decodedToken: state.authReducer.decodedToken,
  quantity: state.cart.quantity
})
export default connect(mapStateToProps, { saveUserToken }) (withStyles(styles)(PrimarySearchAppBar))