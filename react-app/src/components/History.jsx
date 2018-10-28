import React, { Component } from "react";

const labels = [
  "Today",
  "Yesterday",
  "2 days ago",
  "3 days ago",
  "4 days ago",
  "5 days ago",
  "6 days ago"
];

class App extends Component {
  render() {
    return (
      <div className="history">
        <h3> Number of cups in last seven days </h3>
        <div className="days">
          {this.props.cups.reverse().map((day, index) => {
            return (
              <div key={index}>
                <p>{labels[index]}</p>
                <p className={day >= 8 ? "green" : "red"}>{day}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
