import React, { Component } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

import { storage , db } from '../../firebase';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
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
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    },
  inputRoot: {
    color: 'inherit',
    width: '100%',
    },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
});

class SearchBar extends Component {

  constructor (props) {
    super(props)
    this.state = {
      productName: [],
      searchTerm: '',
      imgURL: '',
      items: [],
      initialItems: []
    }
  }

  componentDidMount() {
    this.getName()
  }

  getName = () => {
    console.log("start getName");
    let data = []
    db.ref('products/').once('value', snapshot=> {
      snapshot.forEach((doc) => {
        data.push(doc.key);
        // console.log("done here = " + doc.key);
      })
    }).then( res => {
      this.setState({
        initialItems: data
      })
      console.log("done getName");
    })
  }

  getSearchProduct = (e) => {
    console.log(e);
    var im = storage.ref().child('mainpage').child(e + '.jpg')
    im.getDownloadURL().then((url) => {
      this.setState({
        imgURL : url
      })
    })
    console.log('hello');
    // return (
      // <Card style={Cardstyles}>
      //   <CardActionArea>
      //     <CardContent>
      //       <img src={url} width="250" height="270" style={{margin: 5}}/>
      //     </CardContent>
      //   </CardActionArea>
      // </Card>
      // <h1>Hello</h1>
    // )
  }

  filterList = (event) => {
    console.log(this.state.initialItems);
    var updatedList = this.state.initialItems;
    updatedList = updatedList.filter(function(item){
      return item.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({items: updatedList});
  }

  getInitialState = () => {
     return {
       initialItems: this.state.productName,
       items: []
     }
  }

  componentWillMount(){
    this.setState({items: this.state.initialItems})
  }

    render() {
      const { classes } = this.props;
        return (
          <div>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
                <Input
                  disableUnderline
                  placeholder="Search.."
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  onChange={this.filterList}
                  />
            </div>
            <div position="relative">
            { this.state.items.length > 0 &&
              <FormControl>
                <List items={this.state.items}/>
              </FormControl>
            }
            </div>
          </div>
        );
    }
}

class List extends Component{
  render (){
    // console.log(this.props.items)
    return (
      <ul className="list-group">
      {
        this.props.items.map(function(item) {
          return <MenuItem className="list-group-item" data-category={item} key={item}>{item}</MenuItem>
        })
       }
      </ul>
    )
  }
}

export default withStyles(styles)(SearchBar);
