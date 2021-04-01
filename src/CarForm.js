import React from "react";
import axios from "axios";

class CarForm extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      challenge: "",
      action: "",
      result: "",
      tags: "",
      err: false,
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
    if (this.props.id) {
      const updateObject = {
        challenge: this.state.challenge || undefined,
        action: this.state.action || undefined,
        result: this.state.result || undefined,
        tags: this.state.tags || undefined,
      };
      console.log("handling submit");
      axios
        .put(`/updateentry/${this.props.id}`, updateObject)
        .then((data) => {
          this.props.update();
          this.props.updateSo();
          debugger;
          this.props.close();
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      if (this.state.challenge === "") {
        this.setState({ err: true });
        return;
      }
      axios
        .post("/addentry", this.state)
        .then((data) => {
          this.props.update();
          this.props.updateSo();
        })
        .then((d) => {
          this.setState({ challenge: "", action: "", result: "", tags: "" });
        })
        .catch((e) => {
          console.log(e);
        });
    }
    e.preventDefault();
  }

  render() {
    const { challenge, action, result, tags, err } = this.state;
    return (
      <div className="car-form">
        <h3>Challenge:</h3>
        {this.state.err && <h5>You must have a challenge!</h5>}
        <input
          value={challenge}
          onChange={this.handleChange}
          name="challenge"
          placeholder="A well formulated challenge leads to better results."
        />
        <h3>Actions:</h3>
        <textarea value={action} onChange={this.handleChange} name="action" />
        <h3>Results:</h3>
        <textarea value={result} onChange={this.handleChange} name="result" />
        <h4>Tags:</h4>
        <input value={tags} onChange={this.handleChange} name="tags" />
        <div className="controls">
          <button type="button" name="submitButton" onClick={this.handleSubmit}>
            Commit
          </button>
          {!this.props.id && (
            <button
              type="button"
              name="deleteButton"
              value={this.props.trackingId}
              onClick={this.props.delete}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    );
  }
}
export default CarForm;
