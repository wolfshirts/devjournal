import React from "react";
import axios from "axios";
const PriorEntries = (props) => {
  const { entries } = props;

  const mapped = entries.map((obj) => {
    return (
      <div className="journal-entry">
        <div className="j-date">
          <b>{obj.date}</b>
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
      </div>
    );
  });

  return mapped;
};

export default PriorEntries;
