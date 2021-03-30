import React from "react";
import axios from "axios";

class CarForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      challenge: "",
      action: "",
      result: "",
      tags: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    // Figure out what we're dealing with.
    const name = e.target.name;
    if (name === "challenge") {
      this.setState({ challenge: e.target.value });
    }
    if (name === "action") {
      this.setState({ action: e.target.value });
    }
    if (name === "result") {
      this.setState({ result: e.target.value });
    }
    if (name === "tags") {
      this.setState({ tags: e.target.value });
    }
  }
  handleSubmit(e) {
    axios
      .post("/addentry", this.state)
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
    e.preventDefault();
  }

  render() {
    const { challenge, action, result, tags } = this.state;
    return (
      <div className="car-form">
        <h3>Challenge:</h3>
        <textarea
          value={challenge}
          onChange={this.handleChange}
          name="challenge"
        />
        <h3>Actions:</h3>
        <textarea value={action} onChange={this.handleChange} name="action" />
        <h3>Results:</h3>
        <textarea value={result} onChange={this.handleChange} name="result" />
        <h4>Tags:</h4>
        <input value={tags} onChange={this.handleChange} name="tags" />
        <button type="submit" name="submitButton" onClick={this.handleSubmit}>
          Commit
        </button>
      </div>
    );
  }
}
export default CarForm;
