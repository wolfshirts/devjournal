import React from "react";
import CarForm from "./CarForm";
import PriorEntries from "./PriorEntries";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carForms: [<CarForm update={this.updateEntries} />],
      writeNew: true,
      viewOld: false,
      suggestions: false,
      priorEntries: {},
    };
    this.addForm = this.addForm.bind(this);
    this.writeNew = this.writeNew.bind(this);
    this.viewOld = this.viewOld.bind(this);
    this.updateEntries = this.updateEntries.bind(this);
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
          <div>
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

        {this.state.viewOld && <PriorEntries entries={entryArray} />}
      </div>
    );
  }
}

export default App;
