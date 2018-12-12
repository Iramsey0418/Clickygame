//imports dependencies and files
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import FriendCard from "./components/FriendCard";
import Footer from "./components/Footer";
import WoW from "./WoW.json";
import "./App.css";

//sets state to 0 or empty
class App extends Component {
  state = {
    WoW,
    clickedWoW: [],
    score: 0
  };

//when you click on a card ... the WoW is taken out of the array
  imageClick = event => {
    const currentWoW = event.target.alt;
    const WoWAlreadyClicked =
      this.state.clickedWoW.indexOf(currentWoW) > -1;

//if you click on a WoW that has already been selected, the game is reset and cards reordered
    if (WoWAlreadyClicked) {
      this.setState({
        WoW: this.state.WoW.sort(function(a, b) {
          return 0.5 - Math.random();
        }),
        clickedWoW: [],
        score: 0
      });
        alert("You lose. Play again?");

//if you click on an available WoW, your score is increased and cards reordered
    } else {
      this.setState(
        {
          WoW: this.state.WoW.sort(function(a, b) {
            return 0.5 - Math.random();
          }),
          clickedWoW: this.state.clickedWoW.concat(
            currentWoW
          ),
          score: this.state.score + 1
        },
//if you get all 12 WoW corrent you get a congrats message and the game resets        
        () => {
          if (this.state.score === 12) {
            alert("Yay! You Win!");
            this.setState({
              WoW: this.state.WoW.sort(function(a, b) {
                return 0.5 - Math.random();
              }),
              clickedWoW: [],
              score: 0
            });
          }
        }
      );
    }
  };

//the order of components to be rendered: navbar, jumbotron, friendcard, footer 
  render() {
    return (
      <div>
        <Navbar 
          score={this.state.score}
        />
        <Jumbotron />
        <div className="wrapper">
          {this.state.WoW.map(WoW => (
            <FriendCard
              imageClick={this.imageClick}
              id={WoW.id}
              key={WoW.id}
              image={WoW.image}
            />
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}
export default App;