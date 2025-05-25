import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    brand: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
      },
    },
    Heading: {
      baseStyle: {
        color: 'black',
      },
    },
    Link: {
      baseStyle: {
        color: 'blue.600',
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
    Text: {
      baseStyle: {
        color: 'black',
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'black',
      },
      a: {
        color: 'blue.600',
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
  },
})

export default theme 