import React from "react";
import SoListEntry from "./SoListEntry";

const Suggestions = (props) => {
  return (
    <div className="suggestions-list">
      {props.entries.map((entry) => {
        return (
          <SoListEntry key={entry.id} entry={entry} delete={props.delete} />
        );
      })}
    </div>
  );
};

export default Suggestions;
