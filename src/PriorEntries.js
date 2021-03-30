import React from "react";
import axios from "axios";
const PriorEntries = (props) => {
  const { entries } = props;

  const mapped = entries.map((obj) => {
    return (
      <div className="journal-entry">
        <div className="j-date">{obj.date}</div>
        <div className="j-challenge">{"Challenge: " + obj.challenge}</div>
        <div className="j-action">{"Action: " + obj.action}</div>
        <div className="j-result">{"Result: " + obj.result}</div>
        <div className="j-tags">
          Tags:
          <div className="j-inner-tag">{obj.tags}</div>
        </div>
      </div>
    );
  });

  return mapped;
};

export default PriorEntries;
