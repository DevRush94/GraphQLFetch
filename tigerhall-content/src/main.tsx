import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ApolloProvider from './ApolloProvider';
import './index.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools'; // Import the mode function

// Custom theme with dark mode as default
const customTheme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: mode('#0E0F0F', '#0E0F0F')(props), // Dark background colors
        color: mode('white', 'whiteAlpha.900')(props), // Light text colors
      },
    }),
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider>
      <ChakraProvider theme={customTheme}>
        <App />
      </ChakraProvider>
    </ApolloProvider>
  </React.StrictMode>
);
