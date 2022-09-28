import React from 'react';
import { render } from '@testing-library/react';
import Tasks from './tasks';

test('should render Tasks', () => {
  const { getByText } = render(<Tasks />);

  expect(getByText('')).toBeInTheDocument();
});
  