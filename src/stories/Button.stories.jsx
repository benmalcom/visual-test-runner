import { Button } from '@chakra-ui/react';
import React from 'react';

export default {
  title: 'UI/Button',
  component: Button,
};

const Template = ({ label, ...args }) => <Button {...args}>{label}</Button>;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  label: 'Primary Button',
};

export const Outline = Template.bind({});
Outline.args = {
  variant: 'outline',
  label: 'Button Outline',
};

export const OutlineWhite = Template.bind({});
OutlineWhite.args = {
  variant: 'outline-white',
  label: 'Outline White',
};
