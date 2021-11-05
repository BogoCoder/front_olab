import React, {useState} from "react";
import Switch from "react-switch";

export default function CustomSwitch({onChangeFather, idx}){
  const [state, setState] = useState(true);
  const handleChange = nextChecked => {
    setState(nextChecked);
    onChangeFather(nextChecked, idx);
  };

  return (
    <Switch
      checked={state}
      onChange={handleChange}
      offColor='#fa323f'
    />
  );
};