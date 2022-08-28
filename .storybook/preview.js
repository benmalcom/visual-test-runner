import theme from 'styles/theme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  chakra: {
    theme,
  },
  backgrounds: {
    default: 'gray',
    values: [
      { name: 'white', value: '#FFFFFF' },
      { name: 'gray', value: '#F5F5F5' },
    ],
  },
};
