import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import EditItem from './EditItem'
import AddItem from './AddItem'
import { AuthConsumer } from './AuthContext'
import {baseEndpoint,api} from './const'


const useStyles = makeStyles(theme => ({
  root: {

    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'visible',
    backgroundColor: 'rgb(81, 126, 116)',
    'background-image': `url("${baseEndpoint}/images/ASantana.PNG")`
  },
  gridList: {
    width: 400,
    height: 675,
  },

}));


export default function Inventory() {
  const classes = useStyles();
  const [items, setItems] = React.useState([])
  
  let refreshPage = () => {
    fetch(`${baseEndpoint}${api}/inventory`,
      {
        method: "GET",
        headers: {                                  //this builts the packet
          'Content-Type': 'application/json'
        }
      })
      .then((httpResult) => { return httpResult.json() })
      .then(result => {
        setItems(result)

      })
      .catch(error => {
        console.log(error)
      })
  }
  useEffect(() => {
    refreshPage()
  }, [])


  return (                                                  //JSX
    <div>
      
        <div className={classes.root}>

          <GridList cellHeight={180} cols={3} className={`${classes.gridList} grad`}>
            <GridListTile align='left' size='medium' key="Subheader" cols={3} style={{ height: 'auto' }}>
              <ListSubheader size='medium' component="div"></ListSubheader>
              <AuthConsumer>
                {({ authenticated }) => {

                  return authenticated ? <AddItem align='left' refreshPage={refreshPage}></AddItem> : null
                }
                }
              </AuthConsumer>


            </GridListTile>
            {items.map(item => (
              <GridListTile key={item.title}>
                <img src={`${baseEndpoint}/images/${item.imageName}`} alt={item.title} />
                <GridListTileBar
                  title={item.title}
                  subtitle={`count ${item.count}`}
                  actionIcon={
                    <EditItem item={item} refreshPage={refreshPage}></EditItem>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
      
    </div>
  );
}

