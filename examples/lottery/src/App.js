import React from 'react';
import rebassConfig from './rebass-config';
import Header from './components/Header';
import RouletteNumbers from './components/RouletteNumbers';

export default rebassConfig(() =>
  <div>
    <Header />
    <RouletteNumbers />
  </div>
);
