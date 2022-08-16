import React from 'react';
import { render } from '@testing-library/react';
import Footer from './footer';

test('should render Footer', () => {
  const { getByText } = render(<Footer />);

  expect(getByText('')).toBeInTheDocument();
});
  