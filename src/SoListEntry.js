import React from "react";

const SoListEntry = (props) => {
  debugger;
  return (
    <div className="so-list-entry">
      <div>
        <a href={props.entry.link}>{props.entry.title}</a>
      </div>
      <div>
        <b>Tags:</b>
        <div>{props.entry.tags.join(" ")}</div>
        <hr />
      </div>
    </div>
  );
};

export default SoListEntry;
