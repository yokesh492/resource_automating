import { Button } from '@mui/material'
import React from 'react'

import logout from '../../utils/serverActions/logout';

const Logout = () => {
  return (
    <Button
              className="text-black bg-white hover:bg-black hover:text-white"
              onClick={() => logout()}
            >
              Logout
    </Button>
  )
}

export default Logout