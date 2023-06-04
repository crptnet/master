import React, { useEffect, useMemo, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import { FetchUserData } from '../Fetchs/FetchUserData';
import { serverLink } from '../..';
import { Box, Stack } from '@mui/material';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';
import { darkTheme } from '../../theme';
import axios from 'axios';

const TwoFADialog = ({ triggerElement, content, title, openVal, onSubmit, onCancel }) => {
  const [QRCode, SetQRCode] = useState(null);
  const [curStep, SetCurStep] = useState(0) 
  const [open, setOpen] = useState(openVal)
  const [code, setCode] = useState(null)
  const steps = [
    {
      label: 'Link 2FA'
    },
    {
      label: 'Confirm 2FA via code'
    },
    {
      label: 'Finish'
    }
  ];

  const fetchQRCode = async () => {
    fetch(`${serverLink}api/auth/otpt/create`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
    }).then(async (res) => {
      const data = await res.json();
      SetQRCode(data.uri);
    }).catch((err) => {
      console.error(err);
    });
  };

  
  useEffect(() => {
    fetchQRCode();
    FetchUserData();
  }, []);
  
  const handleInputChange = (value) => {
    setCode(value)
  }
  
  const handleCodeSubmit = async () => {
    return axios.post(`${serverLink}api/auth/otpt/verify`, {
      headers : {
        Authorization : `Bearer ${localStorage.getItem('token')}`
      },
      data : {
        token : code
      }
    }).then((res) => {console.log(res); return true;}).catch((err) => {console.error(err); return false})
  }

  return (
  <ThemeProvider theme={darkTheme}>

  <Dialog.Root open={open} modal={true}>
      <Dialog.Trigger asChild>
        {triggerElement}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <header className="dialog-title">
            <Stack direction="row" sx={{ width: '100%' }} spacing={4}>
              <Stepper activeStep={curStep} alternativeLabel sx={{ width: '100%' }}>
                {steps.map((element) => (
                  <Step key={element.label}>
                    <StepLabel >
                      {element.label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Stack>
            <Dialog.Title>Link 2FA</Dialog.Title>
          </header>
            {
              curStep == 0 ?  
                <Box className="dialog-description-container">
                  <Dialog.Description className="dialog-description" asChild>
                    <ol>
                      <li>Install and open Google Authenticator.</li>
                      <li>Scan QR-Code or enter.</li>
                      <li>Click next</li>
                    </ol>
                  </Dialog.Description>
                  <Box className="dialog-description-container">
                    <img src={QRCode} alt="QR Code" />
                    <label htmlFor="img" style={{ fontSize: '12px', color: 'gray', paddingTop: '2px' }}>
                      Scan me
                    </label>
                  </Box>
                </Box>
                :
                curStep == 1 ? 
                <Box className="dialog-description-container">
                  <Dialog.Description className="dialog-description" asChild>
                  </Dialog.Description>
                  <Box className="dialog-description-container">
                    <form>
                      <input type="text" onChange={handleInputChange} placeholder="Enter a code"/>
                    </form>
                  </Box>
                </Box>
                :
                <></>
            }

          <footer className="submit-buttons">
              <Box>
                {
                  curStep != 0 ? 
                  <button className="submit" type="submit" onClick={() => {SetCurStep(curStep - 1)}}>Previous</button>
                  :
                  <></>
                }
                {
                  curStep == 1 ? 
                  <button className="submit" type="submit" onClick={async () => {
                    if(await handleCodeSubmit())
                      SetCurStep(curStep + 1)
                  }}>
                    Submit
                  </button>
                  :
                  <button className="submit" type="submit" onClick={() => {SetCurStep(curStep + 1)}}>
                    Next
                  </button>
                  
                }
              </Box>
            <Dialog.Close asChild>
            </Dialog.Close>
          </footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  </ThemeProvider>
  );
};

export default TwoFADialog;
