import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Carousel, CarouselProps } from '../src';

const meta: Meta = {
  title: 'Carousel',
  component: Carousel,
  args: {
    width: 250,
  },
};

export default meta;

const Template: Story<CarouselProps> = args => (
  <Carousel {...args}>
    {['yellowgreen', 'blueviolet', 'orangered'].map((color, i) => (
      <div
        key={i}
        style={{
          display: 'grid',
          width: args.width,
          height: 150,
          backgroundColor: color,
          fontSize: '3rem',
          placeItems: 'center',
          color: 'white',
          borderRight: '1px solid white',
        }}
      >
        {i + 1}
      </div>
    ))}
  </Carousel>
);

export const Default = Template.bind({});

Default.args = {};
