import React from 'react';

import { Button } from "@material-tailwind/react";

const ButtonComponent = (props) => {
  return (
    <Button className="bg-primary-text px-5 py-2 rounded-xl text-white flex items-center gap-2 hover:opacity-70 transition-opacity">
      {props.name}
    </Button>
  )
}

export default ButtonComponent
