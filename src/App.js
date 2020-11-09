import React from 'react';
import { Button } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip';
import RotateLeft from '@material-ui/icons/RotateLeft';
import HelpOutline from '@material-ui/icons/HelpOutline';
import './App.css';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const pictures = [
  {
    fileName : "brother",
    relation : "brother",
    name : "Trevor"
  },
  {
    fileName : "grandchild1",
    relation : "grandchild",
    name : "Marry"
  },
  {
    fileName : "grandchild2",
    relation : "grandchild",
    name : "Billy"
  },
  {
    fileName : "neice1",
    relation : "neice",
    name : "Katie"
  },
  {
    fileName : "neice2",
    relation : "neice",
    name : "Liz"
  },
  {
    fileName : "neice3",
    relation : "neice",
    name : "Katrina"
  },
  {
    fileName : "nephew1",
    relation : "nephew",
    name : "Nate"
  },
  {
    fileName : "nephew2",
    relation : "nephew",
    name : "Mark"
  },
  {
    fileName : "sister",
    relation : "sister",
    name : "Kathy"
  },
]

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      cards: [],
      hint: "",
      winner: {},
      isSuccessOpen: false,
      isWrongOpen: false,
      0: false,
      1: false,
      2: false,
      3: false
    }
  }

  componentDidMount() {
    this.getValues();
  }

  async getValues(){
    await this.setCards();
    this.setWinningCard();
    this.setState({hint: ""});
    this.setState({isWrongOpen: false});
  }

  shufflePics(arr) {
    for(let i = arr.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * i)
      const temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
    }
    return arr;
  }

  async setCards(){
    const newPics = this.shufflePics(pictures);
    const cards = newPics.slice(0,4);
    this.setState({cards: cards});
  }

  setWinningCard(){
    const winningCard = this.state.cards[Math.floor(Math.random() * 4)];
    if(winningCard.name == this.state.name){
      this.setWinningCard();
    }else{
      this.setState({winner: winningCard});
      this.setState({name: winningCard.name});
    }
  }

  getHint(){
    if(!this.state.winner){
      return;
    }
    this.setState({hint: this.state.winner.relation});
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({isSuccessOpen: false});
    this.setState({isWrongOpen: false});
  };

  checkWinState(card){
    if(card == this.state.winner){
      this.setState({isWrongOpen: false});
      this.setState({isSuccessOpen: true});
      this.getValues();
    }
    else{
      this.setState({isSuccessOpen: false});
      this.setState({isWrongOpen: true});
    }
  }

  render() {
    const {name, cards, hint, isSuccessOpen, isWrongOpen} = this.state;
    return (
      <div className="Home">
      <div className="headers">
        <div className="target-name">Click on the picture of : <span className="blue">{name}</span></div>
        {hint && (<div>Hint! {name} is your : <span className="blue">{hint}</span></div>)}
      </div>
      <div className="pics">
        {cards.map((card,i) =>  
        <a style={{opacity: this.state[i] === true ? "0.5" : "1"}} onMouseEnter={() => this.setState({[i]: true})} onMouseLeave={() => this.setState({[i]: false})} onClick={() => {this.checkWinState(card)}} key={i} className="shadow">
          <span role="img" aria-label="This is an image of a family member">
            <img aria-label="This is an image of a family member" style={{backgroundImage: `url("./photos/${card.fileName}.jpg")`}} ></img>
          </span>
        </a>
      )}
      </div>
      <div className = "buttons">
        <Tooltip title={<p>Click to reset the images and the family member name</p>}>
          <Button style={{ background: '#002f5b', fontSize: '22px', fontSize:'calc(14px + 1.2vw)', textTransform: 'none' }} startIcon={<RotateLeft style={{ fontSize: '22px', fontSize:'calc(14px + 1.2vw)' }} />} aria-label="Click to reset the images and the family member name" onClick={() => { this.getValues(); }} variant="contained" color="Primary">Click to Reset</Button>
        </Tooltip >
        <Tooltip title={<p>Click to see a hint about {name}</p>}>
          <Button style={{ background: '#002f5b', fontSize: '22px', fontSize:'calc(14px + 1.2vw)', textTransform: 'none' }} startIcon={<HelpOutline style={{ fontSize: '22px', fontSize:'calc(14px + 1.2vw)' }} />} aria-label="click to see a hint about the family member" onClick={()=> {this.getHint(); }} variant="contained" color="Primary">Click to See Hint</Button>
        </Tooltip>
      </div>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={isSuccessOpen} autoHideDuration={4000} onClose={this.handleClose}>
        <Alert style={{ fontSize: '22px', fontSize:'calc(14px + 0.6vw)'}} onClose={this.handleClose} severity="success">
          Congratulations! You picked the correct option!
        </Alert>
      </Snackbar>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={isWrongOpen} autoHideDuration={4000} onClose={this.handleClose}>
        <Alert style={{ fontSize: '22px', fontSize:'calc(14px + 0.6vw)'}} onClose={this.handleClose} severity="error">
          Sorry! That was the wrong option
        </Alert>
      </Snackbar>
    </div>
    );
  }
}
