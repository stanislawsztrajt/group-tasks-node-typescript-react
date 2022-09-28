import React from 'react';
import { render } from '@testing-library/react';
import Groups from './groups';

test('should render Groups', () => {
  const { getByText } = render(<Groups />);

  expect(getByText('')).toBeInTheDocument();
});
  