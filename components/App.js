import {
  Provider
} from 'rebass'

export default ({ children }) => (
  
  <Provider
  theme={{
    font: '"Avenir Next", Helvetica, sans-serif',
    fontSizes: [
      12, 16, 24, 36, 48, 56
    ],
    breakpoints: [
      // min-width breakpoints in em units
      40, 52, 64, 64, 64, 64
    ],
    space: [
      0, 6, 12, 18, 24, 30, 36
    ],
    weights: [
      400, 600
    ],
  }}>
    <main>
      {children}
      
    </main>

  </Provider>
)
