import React, { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { serverLink } from '../../..';

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#e0e0e0', // Customize the primary color
      paper : '#d1d4dc'
    },
    background: {
      default: '#333333',
      paper : '#333333',
    },
  },
});

function shortenValue(value, maxLength) {
  if (value.length <= maxLength) {
    return value;
  } else {
    return value.slice(0, maxLength) + '...';
  }
}

const KeysTable = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios(`${serverLink}api/api-account`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        console.log('Init data', response.data.data);
        setRows(response.data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  console.log('rows', rows);

  return (
    <div className='KeysTable'>
      <ThemeProvider theme={darkTheme}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="center">Key</TableCell>
                <TableCell align="center">Market</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="left">{shortenValue(row.publicKey, 20)}</TableCell>
                  <TableCell align="center">{row.market}</TableCell>
                  <TableCell align="center"><button className='sideBtnData'>Delete?</button></TableCell>
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
