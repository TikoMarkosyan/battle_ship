import React,{ Component } from 'react';
import './App.css';
import Ships from '../ships/index.js';
import Draw from '../draw/index.js';
import Auxiliary from '../auxiliary/index.js';
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      ships: {
        long:[1,1,1,1],
        mid:[1,1,1],
        short:[1,1]
      },
      whichShip: "",
      toggle: true,
      start:false,
      endGame : false,
      win:"",
      yourarea:[[0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0],],
      comparea:[[0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],],
    }
  }
  ship = (e) => {
    const [name, valueString ] = e.target.textContent.split(" ");
    this.setState({
      whichShip: name,
    })
  }

  toggles = () => {
    const { toggle } = this.state;
      this.setState({
        toggle: !toggle,
    })
  }
  randomRelocation = (name,toggle) => {
    const { ships, comparea} = this.state;
    const  newarea  = JSON.parse(JSON.stringify(comparea));
    const  value = ships[name];
    const index_i = Math.floor(Math.random() * 4);
    const index_j = Math.floor(Math.random() * 6);
    const res = toggle === true ? Auxiliary.establishShipHorizontal(newarea,index_i,index_j,value.length,2) :
       Auxiliary.establishShipVertical(newarea,index_i,index_j,value.length,2);
        if(res.toString() !== newarea.toString()){
           this.setState({
             comparea: [...res],
           })
        }else{
          this.randomRelocation(name,toggle)
        }
  }
  shipsRelocation = (e) => {
    const { toggle,yourarea,ships,comparea,whichShip } = this.state;
    const  newarea  = JSON.parse(JSON.stringify(yourarea));
    const newobj =  Object.assign({}, ships);
    if(Object.entries(newobj).length !== 0 && whichShip !== ""){
      this.randomRelocation(whichShip,toggle);
      const value = newobj[whichShip];
      const [index_i,index_j] = e.target.id.split("");
      const res = toggle === true ? Auxiliary.establishShipHorizontal(newarea,index_i,index_j,value.length,1) :
       Auxiliary.establishShipVertical(newarea,index_i,index_j,value.length,1);
         if(res.toString() !== newarea.toString()){
              delete newobj[whichShip];
              this.setState({
                yourarea: [...res],
                ships: newobj,
                whichShip:"",
              })
              if(Object.entries(newobj).length === 0){
                this.setState({
                  start:true,
                })
              }
         }
    }
  }
  attack = (e) => {
    const [index_i, index_j] = e.target.id;
    const { yourarea,comparea }= this.state
    if(Auxiliary.checkendgame(comparea,2)){
      this.setState({
        endGame:true,
        win:"You win"
      })
    }
    const  newarea  = JSON.parse(JSON.stringify(this.state.comparea));
    if(newarea[index_i][index_j] === 2){
        newarea[index_i][index_j] = "X"
        document.getElementById(e.target.id).style.color = "red";
    }else if(newarea[index_i][index_j] !== "X"){
        newarea[index_i][index_j] = "X"
        document.getElementById(e.target.id).style.color = "black";
        this.random(yourarea);
    }
    this.setState({
      comparea:newarea,
    },() => {
        const { comparea }= this.state
      if(Auxiliary.checkendgame(comparea,2)){
        this.setState({
          endGame:true,
          win:"You win"
        })
      }
    })
  }
  random = (arr) => {
    const index_i = Math.floor(Math.random() * 5);
    const index_j = Math.floor(Math.random() * 7);
    if(arr[index_i][index_j] === "X"){
      this.random(arr);
    }else if(arr[index_i][index_j] === 1){
     document.querySelector(`td[name='${index_i}${index_j}']`).style.color = "red"
        this.compAttack(index_j,index_i,arr,true);
    }else if(arr[index_i][index_j] === 0){
        this.compAttack(index_j,index_i,arr,false);
    }

  }
  compAttack = (index_j,index_i,arr,turn) => {
    const newarr = this.state.comparea
    if(Auxiliary.checkendgame(this.state.yourarea,1)){
      this.setState({
        endGame:true,
        win:"You lose"
      })
    }
    const  newarea  = JSON.parse(JSON.stringify(arr));
    newarea[index_i][index_j] = "X";
    this.setState({
      yourarea:[...newarea]
    })
    const res = turn === true ? this.random(newarea) : null;
  }
  render(){
    const { ships,yourarea,toggle,start,comparea,endGame,win } = this.state;
    console.log(comparea);
    return(
      <div>
      { endGame === false ?
          <div className="App">
              <Ships  data={ships} fun_ship={this.ship} fun_toggles={this.toggles}/>
              <div>
                  { start === true ?
                          <div className="bigbox">
                            <Draw data={[...comparea]} shipsRelocation={this.attack} bool={false}/>
                          </div>
                          : null
                  }
              </div>
              <Draw data={[...yourarea]} shipsRelocation={this.shipsRelocation} bool={true}/>
          </div>
          : <h1>{win}</h1> }
      </div>
    )
  }
}
export default App;
