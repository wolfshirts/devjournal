import React from "react";
import CarForm from "./CarForm";
import PriorEntries from "./PriorEntries";
import Suggestions from "./Suggestions";
import FormModal from "./FormModal";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.updateEntries = this.updateEntries.bind(this);
    this.updateSoEntries = this.updateSoEntries.bind(this);
    this.showModal = this.showModal.bind(this);

    this.state = {
      carForms: [
        <CarForm
          key="0"
          update={this.updateEntries}
          updateSo={this.updateSoEntries}
          close={this.showModal}
        />,
      ],
      writeNew: true,
      viewOld: false,
      suggestions: false,
      priorEntries: {},
      soEntries: [],
      modal: false,
      modalId: null,
    };

    this.addForm = this.addForm.bind(this);
    this.writeNew = this.writeNew.bind(this);
    this.viewOld = this.viewOld.bind(this);
    this.viewSuggestions = this.viewSuggestions.bind(this);
    this.deleteEntry = this.deleteEntry.bind(this);
    this.deleteSoEntry = this.deleteSoEntry.bind(this);
  }

  showModal(e) {
    let value;
    if (!e) {
      value = null;
    } else {
      value = e.target.value;
    }
    this.setState({ modal: !this.state.modal, modalId: value });
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

  deleteSoEntry(e) {
    axios
      .delete(`/deletesoentry/${e.target.value}`)
      .then((data) => {
        this.updateSoEntries();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  deleteEntry(e) {
    axios
      .delete(`/deleteentry/${e.target.value}`)
      .then((date) => {
        this.updateEntries();
      })
      .catch((err) => {
        console.log(err);
      });
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
    newForms.push(
      <CarForm
        key={newForms.length + 1}
        update={this.updateEntries}
        updateSo={this.updateSoEntries}
        close={this.showModal}
      />
    );
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
            <PriorEntries
              entries={entryArray}
              delete={this.deleteEntry}
              showModal={this.showModal}
            />
          </div>
        )}
        {this.state.suggestions && (
          <div className="suggestions-div">
            <Suggestions
              entries={this.state.soEntries}
              delete={this.deleteSoEntry}
            />
          </div>
        )}
        {this.state.modal && (
          <FormModal
            id={this.state.modalId}
            update={this.updateEntries}
            updateSo={this.updateSoEntries}
            close={this.showModal}
          />
        )}
      </div>
    );
  }
}

export default App;
