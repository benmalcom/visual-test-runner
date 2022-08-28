import { ChakraProvider, theme } from '@chakra-ui/react';
import { render } from '@testing-library/react';
import React from 'react';

const AllProviders = ({ children }) => (
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
);

const customRender = (ui, options) =>
  render(ui, { wrapper: AllProviders, ...options });

export { customRender as render };
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
