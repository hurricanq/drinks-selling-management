import React from 'react';

import { Link } from "react-router-dom"
import { Button } from "@material-tailwind/react";

const ButtonComponent = (props) => {
  return (
    <Link to="#">
        <Button>
            {props.name}
        </Button>
    </Link>
  )
}

export default ButtonComponent
