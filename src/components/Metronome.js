import React, { Component } from "react";
import click1 from "../utils/click1.wav";
import click2 from "../utils/click2.wav";

class Metronome extends Component {
  state = {
    playing: false,
    count: 0,
    bpm: 100,
    beatsPerMeasure: 4
  };
  click1 = new Audio(click1);
  click2 = new Audio(click2);
  startStop = () => {
    if (this.state.playing) {
      // Stop the timer
      clearInterval(this.timer);
      this.setState({
        playing: false
      });
    } else {
      // Start a timer with the current BPM
      this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000);
      this.setState(
        {
          count: 0,
          playing: true
        },
        this.playClick
      );
    }
  };
  playClick = () => {
    const { count, beatsPerMeasure } = this.state;
    // The first beat will have a different sound than the others
    if (count % beatsPerMeasure === 0) {
      this.click2.play();
    } else {
      this.click1.play();
    }
    // Keep track of which beat we're on
    this.setState(state => ({
      count: (state.count + 1) % state.beatsPerMeasure
    }));
  };
  handleBpmChange = event => {
    const bpm = event.target.value;
    if (this.state.playing) {
      // Stop the old timer and start a new one
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000);
      this.setState({
        bpm,
        count: 0
      });
    } else {
      // Otherwise just update the BPM
      this.setState({ bpm });
    }
  };
  render() {
    const { bpm, playing } = this.state;
    return (
      <div className="metronome">
        <div className="bpm-slider">
          <h3 className="value">{bpm} BPM</h3>
          <input
            type="range"
            min="60"
            max="240"
            value={bpm}
            onChange={this.handleBpmChange}
          />
        </div>
        <button onClick={this.startStop}>{playing ? "Stop" : "Start"}</button>
      </div>
    );
  }
}

export default Metronome;
