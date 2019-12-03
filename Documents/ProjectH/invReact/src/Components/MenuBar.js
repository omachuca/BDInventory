import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from "react-router-dom"
import { AuthContext } from './AuthContext'


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));


export default function MenuBar() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { setAuthenticated } = useContext(AuthContext)
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        setAuthenticated(false)
        setAnchorEl(null);
    };


    return (
        <div className={classes.root}>
            <AppBar position="static" color="primary">
            
                <Toolbar>

                    <IconButton edge="start" className={classes.menuButton} color="default" aria-label="menu" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <MenuIcon />
                    </IconButton>

                    <Menu

                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}>

                        <Button color="inherit" component={Link} to="/signin">Log In</Button>
                        <MenuItem onClick={handleClose} component={Link} to="/">Inventory</MenuItem>
                        <MenuItem onClick={handleLogOut} >Log Out</MenuItem>

                    </Menu>

                    <Typography variant="h6" className={classes.title}>Balam's Designs</Typography>

                </Toolbar>
            </AppBar>
        </div>
    );
}






