import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './Sidebar';

it('renders the Sidebar component', () => {
  const { container } = render(
    <Router>
      <Sidebar menuStatus={true} />
    </Router>
  );

  const asideElement = container.querySelector('aside');
  expect(asideElement).toBeInTheDocument();
});