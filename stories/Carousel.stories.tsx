import React from 'react';
import { Meta } from '@storybook/react';
import { useCarousel } from '../src';
import './style.css';

export const Default = () => {
  const { element, index, onNext, onPrev, jump } = useCarousel({
    width: 250,
    children: ['yellowgreen', 'blueviolet', 'orangered'].map((color, i) => (
      <div className="carousel-item" key={i} style={{ backgroundColor: color }}>
        {i + 1}
      </div>
    )),
  });

  return (
    <div>
      <h3>curIndex: {index}</h3>
      <button style={{ marginRight: 10 }} onClick={() => onPrev()}>
        prev
      </button>
      <button onClick={() => onNext()}>next</button>
      <div style={{ marginTop: 20 }}>
        <div className="carousel-container">
          {element}
          <div className="carousel-dots">
            {[0, 1, 2].map(i => (
              <div
                onClick={() => jump(i)}
                key={i}
                className={i === index ? 'active' : ''}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const meta: Meta = {
  title: 'Carousel',
};

export default meta;
