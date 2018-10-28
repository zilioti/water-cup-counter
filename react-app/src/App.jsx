import React, { Component } from "react";
import crypto from "crypto";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cups: [0, 0, 0, 0, 0, 0, 0]
    };
    if (localStorage.getItem("appId")) {
      this.appId = localStorage.getItem("appId");
    } else {
      this.appId = crypto.randomBytes(16).toString("hex");
      localStorage.setItem("appId", this.appId);
    }
    this.labels = [
      "Today",
      "Yesterday",
      "2 days ago",
      "3 days ago",
      "4 days ago",
      "5 days ago",
      "6 days ago"
    ];
  }

  addCup = function() {
    fetch(
      "https://webhooks.mongodb-stitch.com/api/client/v2.0/app/watercupcounter-alfxg/service/watercup/incoming_webhook/add?appId=" +
        this.appId,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cups: 1
        })
      }
    ).then(() => {
      this.fetchData();
    });
  };

  fetchData = function() {
    fetch(
      "https://webhooks.mongodb-stitch.com/api/client/v2.0/app/watercupcounter-alfxg/service/watercup/incoming_webhook/history?appId=" +
        this.appId
    )
      .then(results => {
        return results.json();
      })
      .then(results => {
        let cups = [0],
          i = 0,
          lastDay;
        results.forEach(result => {
          let day = new Date(parseInt(result.date.$date.$numberLong)).getDay(),
            count = parseInt(result.cups.$numberInt);
          if (lastDay && lastDay !== day) {
            i++;
            cups[i] = 0;
          }
          cups[i] += count;
          lastDay = day;
        });
        this.setState({ cups });
      });
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div className="App">
        <h1 style={{ textAlign: "center" }}>Drink 8 glasses of water a day</h1>
        <div className="container">
          <div
            style={{
              fontSize: 40,
              cursor: "pointer"
            }}
            onClick={() => {
              this.addCup();
            }}
          >
            {" "}
            +{" "}
          </div>
          <div id="cup">
            <div id="glass">
              <div
                id="water"
                style={{
                  height:
                    this.state.cups[this.state.cups.length - 1] > 8
                      ? 300
                      : (300 / 8) * this.state.cups[this.state.cups.length - 1]
                }}
              />
            </div>
          </div>
          <div id="handle" />
        </div>
        <div className="history">
          <h3> Number of cups in last seven days </h3>
          <div className="days">
            {this.state.cups.reverse().map((day, index) => {
              return (
                <div key={index}>
                  <p>{this.labels[index]}</p>
                  <p className={day >= 8 ? "green" : "red"}>{day}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
