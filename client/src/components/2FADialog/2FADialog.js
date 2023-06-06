import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import { FetchUserData } from '../Fetchs/FetchUserData';
import { serverLink } from '../..';
import { Box, Button, Stack } from '@mui/material';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';
import { darkTheme } from '../../theme'
import { ShowToast } from '../Toast/Toast';
import OtpInput from 'react-otp-input';
  const TwoFADialog = ({ triggerElement, content, title, openVal, onSubmit, onCancel }) => {
  const [QRCode, SetQRCode] = useState(null);
  const [curStep, SetCurStep] = useState(0) 
  const [open, setOpen] = useState(openVal)
  const [code, setCode] = useState(null)
  const [toastOpen, setToastOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const totp = useRef(localStorage.getItem('totp') == 'true' ? true : false)
  const inputStyles = {
    width: '100%',
    height: '3rem',
    margin: '0 1rem',
    fontSize: '2rem',
    borderRadius: '4px',
    border: '1px solid rgba(0, 0, 0, 0.3)'
  }

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
    if(totp.current){
      SetCurStep(1)
    }
    FetchUserData(true, true).then(() => {
      console.log(localStorage.getItem('totp') == 'true' ? true : false)
      totp.current = localStorage.getItem('totp') == 'true' ? true : false
      console.log('totp', totp, 'local', localStorage.getItem('totp') == 'true' ? true : false)
      if(!totp)
        fetchQRCode();
      if(totp){
        SetCurStep(1)
      }
    })
  }, []);
  
  const handleCodeSubmit = async () => {
    console.log(code)
    return await fetch(`${serverLink}api/auth/otpt/verify`, {
      method : 'POST',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization : `Bearer ${localStorage.getItem('token')}`
      },
      body : JSON.stringify({
        token : code 
      })
    }).then(async (res) => {
      if(!res?.ok){
        console.error(res)
        const json = await res.json()
        json.ok = false
        return json
      }
      return await res.json()
    }).then((res) => {console.log(res); if(res.status != 'failed'){ res.ok = true; localStorage.setItem('totpToken', res?.token)}return res;})
  }

  return (
  <ThemeProvider theme={darkTheme}>
    {
      toastOpen && <ShowToast open={toastOpen} setOpen={setToastOpen} message={toastMessage} type={'error'}/>
    }
  <Dialog.Root open={open} modal={true}>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <header className="dialog-title">
            {
              !totp.current ? 
              <>
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
              </>
              :
              <Dialog.Title>Verify 2FA</Dialog.Title>
          }
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
                  <div className="dialog-description-container" style={{ alignItems : 'start', flexDirection : 'row', paddingLeft : 'auto' }}>
                    <div className='column' style={{ alignContent: 'center', alignItems : 'center'}}>
                      <img src={QRCode} alt="QR Code" />
                      <label htmlFor="img" style={{ fontSize: '12px', color: 'gray', paddingTop: '2px' }}>
                        Scan me
                      </label>
                    </div>
                    <div style={{paddingLeft : '1rem'}}>
                      <Button size='small' sx={{ width : 'auto', minWidth : 'auto'}} onClick={() => {fetchQRCode()}} className='button'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-refresh-ccw"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
                      </Button>
                    </div>
                  </div>
                </Box>
                :
                curStep == 1 ? 
                <Box className="dialog-description-container">
                  <Dialog.Description className="dialog-description" style={{ margin : '1rem' }} asChild>
                    <ol>
                      <li style={{paddingBottom : '0.5rem'}}>Open the Google Authenticator app on your mobile</li>
                      <li style={{paddingBottom : '0.5rem'}}>Look for crtp website</li>
                      <li style={{paddingBottom : '0.5rem'}}>The 2FA code will be displayed next to the website name. Simply enter this code.</li>
                    </ol>
                  </Dialog.Description>
                  <Box className="dialog-description-container">
                    <form style={{ alignItems: 'center', alignContent : 'center'}}>
                      {/* <input type="number" onChange={handleInputChange} placeholder="Enter a code"/> */}
                      <Box style={{ paddingBottom : '10px', color: 'gray'}}>Input Code:</Box>
                      <OtpInput 
                        inputStyle = {inputStyles}
                        value={code}
                        onChange={(e) => { setToastOpen(false), setCode(e) }}
                        numInputs={6}
                        renderInput={(props) => <input name="code-input" {...props} />}
                      />
                    </form>
                  </Box>
                </Box>
                :
                <Box className="dialog-description-container">
                  <Dialog.Description className="dialog-description" asChild>
                  <svg style={{ width : '10rem', height : 'auto' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-party-popper"><path d="M5.8 11.3 2 22l10.7-3.79"/><path d="M4 3h.01"/><path d="M22 8h.01"/><path d="M15 2h.01"/><path d="M22 20h.01"/><path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12v0c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"/><path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11v0c-.11.7-.72 1.22-1.43 1.22H17"/><path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98v0C9.52 4.9 9 5.52 9 6.23V7"/><path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z"/></svg>
                  </Dialog.Description>
                  <Box className="dialog-description-container" sx={{ textAlign : 'center'}}>
                    Congratulations on successfully setting up 2FA! Your commitment to securing your accounts is commendable. Well done!
                  </Box>
                </Box>
            }

          <footer className="submit-buttons">
              <Box>
                {
                  curStep == 1 && !totp.current ? 
                  <button className="submit" type="submit" onClick={() => {setToastOpen(false); SetCurStep(curStep - 1)}}>Previous</button>
                  :
                  <></>
                }
                {
                  curStep == 0 ?
                  <button className='submit' onClick={() => {setToastOpen(false); SetCurStep(curStep + 1)}}>
                    Next
                  </button>
                  :
                  curStep == 1 ? 
                  <button className="submit" type="submit" onClick={async () => {
                    const response = await handleCodeSubmit()
                    console.log(response)
                    if(!response.ok)
                    {
                      setCode('')
                      setToastMessage(response.message)
                      setToastOpen(true)
                      return
                    }
                    if(totp.current){
                      setToastOpen(false); 
                      setOpen(false)
                      return
                    }
                    SetCurStep(curStep + 1)
                  }}>
                    Submit
                  </button>
                  :
                  curStep == 2 ?
                  <button className="submit" type="submit" onClick={() => {setToastOpen(false); setOpen(false)}}>
                    Close
                  </button>
                  :
                  null
                }
              </Box>
          </footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  </ThemeProvider>
  );
};

export default TwoFADialog;
