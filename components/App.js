import {
  Provider,
  Container,
  Heading,
  Blockquote,
  Toolbar,
  NavLink,
  Flex,
  Box
} from 'rebass'

export default ({ children }) => (
  
  <Provider
  theme={{
    font: '"Avenir Next", Helvetica, sans-serif',
    fontSizes: [
      12, 16, 24, 36, 48, 72
    ],
    breakpoints: [
      // min-width breakpoints in ems
      40, 52, 64
    ],
    space: [
      0, 6, 12, 18, 24, 30, 36
    ],
    weights: [
      400, 600
    ],
    colors: {
      black: '#111',
      white: '#fff',
      blue: '#07c'
    },
  }}>
    <main>
      {children}
      
    </main>

  </Provider>
)
