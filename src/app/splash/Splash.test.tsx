import { shallow } from 'enzyme';
import * as React from 'react';

import Splash from './Splash';

it('matches snapshot', () => {
  const wrapper = shallow(<Splash />);

  expect(wrapper).toMatchSnapshot();
});
