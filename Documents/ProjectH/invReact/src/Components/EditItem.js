import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import { AuthConsumer, AuthContext } from './AuthContext'
import {baseEndpoint,api} from './const'


function getModalStyle() {
  const top = 20;
  const left = 20;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 250,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function InfoDialog(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const [title, setTitle] = React.useState(props.item.title)
  const [count, setCount] = React.useState(props.item.count)
  const { token, setToken, setAuthenticated } = useContext(AuthContext)

  let deleteOnClickHandler = () => {

    fetch(`${baseEndpoint}${api}/inventory/${props.item._id}`,
      {
        method: "DELETE",

      })
      .then(httpResult => {
        if (httpResult.statusText === "OK") {
          props.refreshPage()
        }
      })
  }

  let onClickHandler = (event) => {
    console.log(baseEndpoint)
    if (count !== "" && title !== "") {

      let item = {
        imageName: props.item.imageName,
        title: title,
        count: count,
      }

      fetch(`${baseEndpoint}${api}/Inventory/${props.item._id}`, {
        method: "PUT",
        body: JSON.stringify(item),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }

      })

        .then(result => {
          if (!result.ok) {
            setAuthenticated(false)
            throw new Error('Login Failed')

          } else {
            return result.json()
          }
        })
        .then(token => {
          setToken(token)
          setAuthenticated(true)
          props.refreshPage()
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (

    <div>
      <IconButton color="default" className={classes.icon} onClick={handleOpen} >
        <InfoIcon />
      </IconButton>


      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <TextField
            id="outlined-basic"
            className={classes.textField}
            onChange={(event) => { return setTitle(event.target.value) }}
            label="Title"
            margin="normal"
            variant="outlined"
            value={title}>
          </TextField>
          <TextField
            id="outlined-basic"
            className={classes.textField}
            onChange={(event) => { return setCount(event.target.value) }}
            label="Count"
            margin="normal"
            variant="outlined"
            value={count}>
          </TextField>

          <AuthConsumer>
            {({ authenticated }) => {
              return authenticated ? (

                <div>
                  <SaveIcon
                    onClick={onClickHandler}
                    variants="contained"
                    color="primary"
                  ></SaveIcon>

                  <CancelIcon
                    onClick={handleClose}
                    variants="contained"
                    color="error"
                  ></CancelIcon>

                  <DeleteIcon
                    onClick={deleteOnClickHandler}
                    variants="contained"
                    color="third"
                  ></DeleteIcon>
                </div>
              ) : null
            }
            }
          </AuthConsumer>

        </div>
      </Modal>
    </div>
  );
}