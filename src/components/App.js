import { ChakraProvider, theme } from '@chakra-ui/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Runner } from 'components/TestRunner';

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Runner />
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
