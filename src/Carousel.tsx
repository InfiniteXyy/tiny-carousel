import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { mod, peek } from './utils';

interface CarouselOptions {
  width: number;
  children: React.ReactNode[];
}

interface CarouselReturn {
  onNext: (step?: number) => void;
  onPrev: (step?: number) => void;
  jump: (index: number) => void;
  index: number;
  element: JSX.Element;
}

export function useCarousel(options: CarouselOptions): CarouselReturn {
  const { width = 250, children } = options;

  const [curIndex, setCurIndex] = useState(0);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [rightList, setRightList] = useState<number[]>([]);
  const [leftList, setLeftList] = useState<number[]>([]);
  const [isResetting, setResetting] = useState(false);

  const getIndex = useCallback(mod(children.length), [children.length]);
  const transformX = useMemo(() => -scrollIndex * width, [width, scrollIndex]);

  const onNext = useCallback(
    (step = 1) => {
      const nextRightList = [...rightList];
      while (nextRightList.length < scrollIndex + step + 1) {
        nextRightList.push(
          getIndex(nextRightList[nextRightList.length - 1] + 1)
        );
      }
      setRightList(nextRightList);
      setScrollIndex(i => i + step);
      setCurIndex(i => i + step);
    },
    [getIndex, rightList, scrollIndex]
  );

  const onPrev = useCallback(
    (step = 1) => {
      const nextLeftList = [...leftList];
      while (nextLeftList.length < -scrollIndex + step) {
        nextLeftList.unshift(getIndex(nextLeftList[0] - 1));
      }
      setLeftList(nextLeftList);
      setScrollIndex(i => i - step);
      setCurIndex(i => i - step);
    },
    [getIndex, leftList, scrollIndex]
  );

  const jump = useCallback(
    (target: number) => {
      const realIndex = getIndex(curIndex);
      if (target < realIndex) {
        onPrev(realIndex - target);
      } else {
        onNext(target - realIndex);
      }
    },
    [getIndex, curIndex, onPrev, onNext]
  );

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

  return {
    index: getIndex(curIndex),
    onNext,
    onPrev,
    jump,
    element: (
      <div style={{ overflow: 'hidden', width }}>
        <div
          style={{
            display: 'grid',
            gridAutoFlow: 'column',
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
              <React.Fragment key={index}>{child}</React.Fragment>
            ))}
          </div>
          {peek(children, rightList).map((child, index) => (
            <React.Fragment key={index}>{child}</React.Fragment>
          ))}
        </div>
      </div>
    ),
  };
}
