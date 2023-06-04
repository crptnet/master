import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { serverLink } from '../../..';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TwoFADialog from '../../2FADialog/2FADialog';
import { darkTheme } from '../../../theme';


function shortenValue(value, maxLength) {
  if (value.length <= maxLength) {
    return value;
  } else {
    return value.slice(0, maxLength) + '...';
  }
}

const KeysTable = () => {
  useEffect(() => {
    return () => {
      console.log('rerender')
    }
  })

  const [rows, setRows] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    axios(`${serverLink}api/api-account`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        setRows(response.data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const tableContainerSx = {
    width: '100%',
    marginTop: 4,
    borderRadius: 2,
    maxHeight: 500,
  };

  return (
    <div className='KeysTable'>
      {
        <TwoFADialog open={dialogOpen} setOpen={setDialogOpen}/>
      }
      <ThemeProvider theme={darkTheme}>
        <TableContainer component={Paper} sx={tableContainerSx}>
          <Table  aria-label="simple table">
            <TableHead sx={{backgroundColor: "primary.paper" }}>
              <TableRow>
                <TableCell style={{width : '10%'}}>Id</TableCell>
                <TableCell align="lett" style={{width : '30%'}}>Key</TableCell>
                <TableCell align="left" style={{width : '30%'}}>market</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={index + 1}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index}
                  </TableCell>
                  <TableCell align="left">{shortenValue(row.publicKey,20)}</TableCell>
                  <TableCell align="left">{row.market}</TableCell>
                  <TableCell align="right" style={{paddingRight : '2rem'}}><button onClick={() => setDialogOpen(true)} style={{background : 'none', border : 'none'}}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg></button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>
    </div>
  );
};

export default KeysTable;
