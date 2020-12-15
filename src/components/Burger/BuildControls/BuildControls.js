import React from "react";

import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.module.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      {controls.map((ctrl) => (
        <BuildControl
          added={() => props.ingAdded(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
          key={ctrl.label}
          removed={() => props.ingRemoved(ctrl.type)}
          label={ctrl.label}
        />
      ))}
    </div>
  );
};

export default buildControls;
