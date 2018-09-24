/* eslint-disable */

import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import Homepage from '../src/containers/Homepage/Homepage';
import CoreValues from '../src/components/CoreValues/CoreValues';

chai.use(chaiEnzyme());

describe('<Homepage />', () => {
  context('header', () => {
    const wrapper = shallow(<Homepage />);
    expect(wrapper.find(<CoreValues />).to.have.length(1));
  });
});
