import React, { Component } from "react";

class App extends Component {
  render() {
    return (
      <div className="container">
        <div
          style={{
            fontSize: 40,
            cursor: "pointer"
          }}
          onClick={this.props.onClick}
        >
          +
        </div>
        <div id="cup">
          <div id="glass">
            <div
              id="water"
              style={{
                height:
                  this.props.todayCup > 8
                    ? 300
                    : (300 / 8) * this.props.todayCup
              }}
            />
          </div>
        </div>
        <div id="handle" />
      </div>
    );
  }
}

export default App;
