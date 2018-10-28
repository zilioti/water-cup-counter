import React, { Component } from "react";
import crypto from "crypto";
import History from "./components/History";
import WaterCup from "./components/WaterCup";
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
        <WaterCup
          todayCup={this.state.cups[this.state.cups.length - 1]}
          onClick={this.addCup.bind(this)}
        />
        <History cups={this.state.cups} />
      </div>
    );
  }
}

export default App;
