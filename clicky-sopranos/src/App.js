import React, { Component } from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Score from "./components/Score";
import pups from "./cards.json";
import "./App.css";

class App extends Component {
  // Setting this.state.sopranos to the cards json array
  state = {
    sopranos,
    clickedCharacterIds: [],
    score: 0,
    goal: 6,
    status: ""
  };

  //shuffle the pup cards in the browser when clicked
  shuffleScoreCard = id => {
    let clickedCharacterIds = this.state.clickedCharacterIds;

    if(clickedCharacterIds.includes(id)){
      this.setState({ clickedCharacterIds: [], score: 0, status:  "Game Over! You lost. Click to play again!" });
      return;
    }else{
      clickedCharacterIds.push(id)

      if(clickedCharacterIds.length === 9){
        this.setState({score: 9, status: "You Won! Great Job, Smartie! Click to play again!", clickedPuppyIds: []});
        console.log('You Win');
        return;
      }

      this.setState({ sopranos, clickedCharacterIds, score: clickedCharacterIds.length, status: " " });

      for (let i = sopranos.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [sopranos[i], sopranos[j]] = [sopranos[j], sopranos[i]];
      }
    }
  }

  // Map over this.state.cards and render a Card component for each card object
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">The Clickster</h1>
          <p className="App-intro">
            Try not to click the same image twice!
          </p>
        </header>
        <Score total={this.state.score}
               goal={9}
               status={this.state.status}
               />
        <Wrapper>
          {this.state.pups.map(puppy => (
            <Card
              shuffleScoreCard={this.shuffleScoreCard}
              id={puppy.id}
              key={puppy.id}
              image={puppy.image}
            />
          ))}
        </Wrapper>
        <footer>
          <p>Designed and built by Heather Mathies. You can find the 
          code<a href="https://github.com/hmathies/Clicky-Game" target="_blank" rel="noopener"> here</a>.</p>
        </footer>
    </div>
    );
  }
}

export default App;