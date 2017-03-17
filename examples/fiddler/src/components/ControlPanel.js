import React from 'react';
import { Flex, Box } from 'reflexbox';
import {
  Button,
  Section,
  SectionHeader,
  Divider,
  Select,
  Slider,
} from 'rebass';

import ScrollArea from './ScrollArea';

export default ({
  numberToScroll,
  onNumberToScrollChange,
  duration,
  onDurationChange,
  transitionTimingFunction,
  onTimingFnChange,
  yAlignment,
  onYAlignmentChange,
  xAlignment,
  onXAlignmentChange,
  yMargin,
  onYMarginChange,
  xMargin,
  onXMarginChange,
  onScrollStart,
}) => (
  <Section>
    <SectionHeader
      heading="Scroll Configuration"
      description="Fiddle with scroll options"
    />
    <Flex wrap gutter={2}>
      <Box col={12} sm={5} px={2}>
        <Slider
          fill
          mb={0}
          name="duration"
          label={`Scroll to number: ${numberToScroll}`}
          value={numberToScroll}
          min={1}
          max={16}
          step={1}
          onChange={onNumberToScrollChange}
        />
        <Button onClick={() => onScrollStart(numberToScroll)}>
          Scroll to {numberToScroll}
        </Button>
        <Divider />
        <Slider
          fill
          mb={0}
          name="duration"
          label={`Duraion: ${duration}`}
          value={duration}
          min={0}
          max={2000}
          step={100}
          onChange={onDurationChange}
        />
        <Select
          name="timingFn"
          label="Timing Function"
          value={transitionTimingFunction}
          onChange={onTimingFnChange}
          options={[
            'LINEAR',
            'EASE_IN_QUAD',
            'EASE_OUT_QUAD',
            'EASE_IN_OUT_QUAD',
            'EASE_IN_CUBIC',
            'EASE_OUT_CUBIC',
            'EASE_IN_OUT_CUBIC',
            'EASE_IN_QUART',
            'EASE_OUT_QUART',
            'EASE_IN_OUT_QUART',
          ].map(value => ({ value, children: value }))}
        />
        <Divider />
        <Select
          name="yAlignment"
          label="yAlignment"
          value={yAlignment}
          onChange={onYAlignmentChange}
          options={[
            { value: 'TOP', children: 'TOP' },
            { value: 'BOTTOM', children: 'BOTTOM' },
            { value: null, children: 'null' },
          ]}
        />
        <Select
          name="xAlignment"
          label="xAlignment"
          value={xAlignment}
          onChange={onXAlignmentChange}
          options={[
            { value: 'LEFT', children: 'LEFT' },
            { value: 'RIGHT', children: 'RIGHT' },
            { value: null, children: 'null' },
          ]}
        />
        <Divider />
        <Slider
          fill
          mb={0}
          name="yMargin"
          label={`Y margin: ${yMargin}`}
          value={yMargin}
          min={-50}
          max={50}
          step={1}
          onChange={onYMarginChange}
        />
        <Slider
          fill
          mb={0}
          name="xMargin"
          label={`X margin: ${xMargin}`}
          value={xMargin}
          min={-50}
          max={50}
          step={1}
          onChange={onXMarginChange}
        />
      </Box>
      <Box col={12} sm={7} px={2}>
        <ScrollArea />
      </Box>
    </Flex>
  </Section>
);
