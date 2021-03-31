import React from "react";

const SoListEntry = (props) => {
  return (
    <div className="so-list-entry">
      <div>
        <a href={props.entry.link}>{props.entry.title}</a>
      </div>
      <div>
        <b>Tags:</b>
        <div>{props.entry.tags.join(" ")}</div>
        <button value={props.entry.id} type="button" onClick={props.delete}>
          delete
        </button>
        <hr />
      </div>
    </div>
  );
};

export default SoListEntry;
