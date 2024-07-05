import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';


const LoginDescription = () => {
  return (
    <div className="flex justify-center items-center mb-12 bg-gray-100 dark:bg-gray-900">
        <Card>
          <Typography variant="h4" className='mb-6'>
            Discover and Curate the Web Like Never Before!
          </Typography>
          <Typography variant="body1">
            Welcome to [App Name], your ultimate resource library. Effortlessly gather key details from your favorite websites, tag, categorize, and filter them to your heart's content. Dive in to organize the web your way and unlock a world of information. Ready to transform your browsing experience? Log in now and start your journey!
          </Typography>
        </Card>
    </div>
  );
};

export default LoginDescription;
