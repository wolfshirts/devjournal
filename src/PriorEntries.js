import React from "react";
import axios from "axios";
const PriorEntries = (props) => {
  const { entries } = props;

  const mapped = entries.map((obj) => {
    const date = new Date(obj.date);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return (
      <div key={obj.id} className="journal-entry">
        <div className="j-date">
          <b>{`${month}/${day}/${year}`}</b>
        </div>
        <div className="j-challenge">
          <b>{"Challenge: "}</b> {obj.challenge}
        </div>
        <div className="j-action">
          <b>{"Action: "}</b> {obj.action}
        </div>
        <div className="j-result">
          <b>{"Result: "}</b> {obj.result}
        </div>
        <div className="j-tags">
          <b>Tags:</b>
          <div className="j-inner-tag">{obj.tags}</div>
        </div>
        <button value={obj.id} onClick={props.delete} type="button">
          delete
        </button>
        <button value={obj.id} onClick={props.showModal} type="button">
          edit
        </button>
      </div>
    );
  });

  return mapped;
};

export default PriorEntries;
