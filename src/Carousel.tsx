import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { mod, peek } from './utils';

export interface CarouselProps {
  width: number;
  children: React.ReactNode[];
}

export function Carousel(props: CarouselProps): JSX.Element {
  const { width = 250, children } = props;

  const [curIndex, setCurIndex] = useState(0);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [rightList, setRightList] = useState<number[]>([]);
  const [leftList, setLeftList] = useState<number[]>([]);
  const [isResetting, setResetting] = useState(false);

  const getIndex = useCallback(mod(children.length), [children.length]);
  const transformX = useMemo(() => -scrollIndex * width, [width, scrollIndex]);

  const onNext = useCallback(() => {
    const isNearRightEdge = scrollIndex === rightList.length - 1;
    if (isNearRightEdge)
      setRightList([
        ...rightList,
        getIndex(rightList[rightList.length - 1] + 1),
      ]);
    setScrollIndex(i => i + 1);
    setCurIndex(i => i + 1);
  }, [getIndex, rightList, scrollIndex]);

  const onPrev = useCallback(() => {
    const isNearLeftEdge = -scrollIndex === leftList.length - 1;
    if (isNearLeftEdge) setLeftList([getIndex(leftList[0] - 1), ...leftList]);
    setScrollIndex(i => i - 1);
    setCurIndex(i => i - 1);
  }, [getIndex, leftList, scrollIndex]);

  const resetBufferList = useCallback(() => {
    setScrollIndex(0);
    setRightList([getIndex(curIndex), getIndex(curIndex + 1)]);
    setLeftList([getIndex(curIndex - 1)]);
    setResetting(true);
    setTimeout(() => setResetting(false));
  }, [getIndex, curIndex]);

  useEffect(() => {
    resetBufferList();
  }, []);

  return (
    <div>
      <button onClick={onPrev}>prev</button>
      <button onClick={onNext}>next</button>
      <div style={{ overflow: 'hidden', width }}>
        <div
          style={{
            display: 'flex',
            transition: isResetting ? 'none' : 'transform 300ms ease',
            transform: `translateX(${transformX}px)`,
          }}
          onTransitionEnd={resetBufferList}
        >
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              right: width,
            }}
          >
            {peek(children, leftList).map((child, index) => (
              <div style={{ flexShrink: 0 }} key={index}>
                {child}
              </div>
            ))}
          </div>
          {peek(children, rightList).map((child, index) => (
            <div style={{ flexShrink: 0 }} key={index}>
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
