import { shallow } from 'enzyme';
import * as React from 'react';

import Container from './Container';

it('matches snapshot', () => {
  const wrapper = shallow(
    <Container />,
  );

  expect(wrapper).toMatchSnapshot();
});
