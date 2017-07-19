import {
  Provider
} from 'rebass'
import {ThemeProvider} from 'styled-components'
import {Grid, Col, Row} from 'react-styled-flexboxgrid'

const theme = {
  flexboxgrid: {
    // Defaults
    gutterWidth: 1, // rem
    outerMargin: 2, // rem
    container: {
      sm: 46, // rem
      md: 61, // rem
      lg: 76  // rem
    },
    breakpoints: {
      xs: 0,  // em
      sm: 48, // em
      md: 64, // em
      lg: 75  // em
    }
  }
}

export default ({ children }) => (
  
  <Provider theme={theme}>
    <ThemeProvider theme={theme}>
      <main>
        {children}
        
      </main>

    </ThemeProvider>
  </Provider>
)
