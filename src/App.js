import React from "react";
import CarForm from "./CarForm";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  GetCurrentDate() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return <h2>{`${month}/${day}/${year}`}</h2>;
  }

  render() {
    return (
      <div className="App">
        <h1>Dev Journal</h1>
        {/* <h2>{this.getCurrentDate()}</h2> */}
        <this.GetCurrentDate />
        <CarForm />
      </div>
    );
  }
}

export default App;
