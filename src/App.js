import React from "react";
import CarForm from "./CarForm";
import PriorEntries from "./PriorEntries";
import Suggestions from "./Suggestions";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.updateEntries = this.updateEntries.bind(this);
    this.state = {
      carForms: [<CarForm update={this.updateEntries} />],
      writeNew: true,
      viewOld: false,
      suggestions: false,
      priorEntries: {},
      soEntries: [],
    };
    this.addForm = this.addForm.bind(this);
    this.writeNew = this.writeNew.bind(this);
    this.viewOld = this.viewOld.bind(this);
    this.viewSuggestions = this.viewSuggestions.bind(this);
    this.updateSoEntries = this.updateSoEntries.bind(this);
  }

  GetCurrentDate() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return <h2>{`${month}/${day}/${year}`}</h2>;
  }

  componentDidMount() {
    this.updateEntries();
    this.updateSoEntries();
  }

  updateEntries() {
    axios
      .get("/getentries")
      .then((data) => {
        this.setState({ priorEntries: data.data });
      })
      .catch((e) => {
        console.log("Something broke!!!! ", e);
      });
  }

  updateSoEntries() {
    axios
      .get("/getso")
      .then((data) => {
        this.setState({ soEntries: data.data });
      })
      .catch((e) => {
        console.log("Broke getting so ", e);
      });
  }

  writeNew() {
    if (this.state.writeNew) {
      return;
    } else {
      this.setState({ writeNew: true, viewOld: false, suggestions: false });
    }
  }

  viewOld() {
    if (this.state.viewOld) {
      return;
    } else {
      this.setState({ writeNew: false, viewOld: true, suggestions: false });
    }
  }

  viewSuggestions() {
    if (this.state.suggestions) {
      return;
    } else {
      this.setState({ writeNew: false, viewOld: false, suggestions: true });
    }
  }

  addForm() {
    const newForms = [...this.state.carForms];
    newForms.push(<CarForm update={this.updateEntries} />);
    this.setState({ carForms: newForms });
  }

  render() {
    const { carForms, priorEntries } = this.state;
    const entryArray = priorEntries.results;
    return (
      <div className="App">
        <h1>Dev Journal</h1>
        <this.GetCurrentDate />
        <div className="header">
          <div onClick={this.writeNew}>
            <u>New Entries</u>
          </div>
          <div onClick={this.viewOld}>
            <u>Prior Entries</u>
          </div>
          <div onClick={this.viewSuggestions}>
            <u>Suggestions</u>
          </div>
        </div>
        {this.state.writeNew && (
          <div className="forms-div">
            {carForms.map((obj) => obj)}
            <button name="addForm" type="button" onClick={this.addForm}>
              Add Form
            </button>
          </div>
        )}

        {this.state.viewOld && (
          <div className="entry-div">
            <PriorEntries entries={entryArray} />
          </div>
        )}
        {this.state.suggestions && (
          <div className="suggestions-div">
            <Suggestions entries={this.state.soEntries} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
