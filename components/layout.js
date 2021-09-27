import { Component } from 'react';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';


class Layout extends Component {
  render() {
    const theme = createTheme({
      palette: {
        primary: {
          main: "#673ab7"
        }
      }
    });

    return(
      <MuiThemeProvider theme={theme}>
        {this.props.children}
      </MuiThemeProvider>
    )
  }
}

export default Layout;