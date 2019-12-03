import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Input from '@material-ui/core/Input'
import AddToPhotosTwoToneIcon from '@material-ui/icons/AddToPhotosTwoTone';
import TextField from '@material-ui/core/TextField';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import { AuthContext } from './AuthContext';
import {baseEndpoint,api} from './const';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function AddItem(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = React.useState("")
  const [title, setTitle] = React.useState("")
  const [count, setCount] = React.useState("")
  const { token, setToken, setAuthenticated } = useContext(AuthContext)

  let onClickHandler = (event) => {
    
    if (image !== "" && title !== "") {

      let formData = new FormData()
      formData.append('title', title)
      formData.append('image', image)
      formData.append('count', count)

      fetch(`${baseEndpoint}${api}/Inventory`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(result => {
          if (!result.ok) {
            setAuthenticated(false)
            throw new Error('Item not Added')

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

      <AddToPhotosTwoToneIcon color="primary" onClick={handleOpen}></AddToPhotosTwoToneIcon>

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}>

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

          <Input
            accept='image/*'
            className={classes.input}
            type='file'
            onChange={(event) => { return setImage(event.target.files[0]) }}>
          </Input>

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

          </div>
        </div>
      </Modal>
    </div>
  );
}