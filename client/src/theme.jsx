import { createTheme } from "@mui/material";

const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#d1d4dc', // Customize the primary color
        paper : '#393939'
      },
      background: {
        default: '#333333',
        paper : '#333333',
      },
      text : {
        primary : '#d1d4dc'
      }
    },
    typography : {
      fontFamily : 'roboto, poppins, sans-serif'
    },
    components : {
        MuiStepLabel : {
            styleOverrides : {
              "root": {
                "&.Mui-disabled": {
                  "color": "white"
                }
              }
            }
        },
        MuiTableHead : {
            styleOverrides : {
                root : {
                    height : '100%'
                },
                      
                
            }
        },
        
    }
}
);

export {darkTheme}