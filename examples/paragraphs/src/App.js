import React from 'react';
import rebassConfig from './rebass-config';
import Navbar from './components/Navbar';
import Content from './components/Content';

export default rebassConfig(() =>
  <div>
    <Navbar />
    <Content />
  </div>
);
