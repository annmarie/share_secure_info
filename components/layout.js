import { Component } from "react";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

class Layout extends Component {
  render() {
    const theme = createTheme({
      palette: {
        primary: {
          main: "#673ab7"
        }
      }
    });

    return <ThemeProvider theme={theme}>{this.props.children}</ThemeProvider>;
  }
}

export default Layout;
