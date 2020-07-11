import { shallow } from 'enzyme';
import * as React from 'react';

import App from './App';

it('matches snapshot', () => {
  const wrapper = shallow(
    <App />,
  );

  expect(wrapper).toMatchSnapshot();
});
