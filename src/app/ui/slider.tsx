"use client";

import * as Slider from "@radix-ui/react-slider";
import { useState, useEffect } from "react";
import styles from "@/app/page.module.css";

type Props = {
  min: number;
  max: number;
  onChangeAction: (range: [number, number]) => void;
};

export default function PriceSlider({ min, max, onChangeAction }: Props) {
  const [range, setRange] = useState<[number, number]>([min, max]);

  useEffect(() => {
    onChangeAction(range);
  }, [range, onChangeAction]);

  return (
    <div className={styles.sliderWrapper}>
      <h4 className={styles.label}>Price Range</h4>
      <Slider.Root
        className={styles.sliderRoot}
        min={min}
        max={max}
        step={10}
        value={range}
        onValueChange={(val) => setRange(val as [number, number])}
      >
        <Slider.Track className={styles.sliderTrack}>
          <Slider.Range className={styles.sliderRange} />
        </Slider.Track>
        <Slider.Thumb className={styles.sliderThumb} />
        <Slider.Thumb className={styles.sliderThumb} />
      </Slider.Root>
      <div className={styles.priceDisplay}>
        <span>${range[0]}</span>
        <span>${range[1]}</span>
      </div>
    </div>
  );
}
