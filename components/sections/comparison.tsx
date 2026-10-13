"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, PawPrint } from "lucide-react";
import { photos } from "@/content/photos";

const { peteBefore: before, peteAfter: after } = photos;
const SIZES = "(max-width: 768px) 100vw, 60vw";

/** Interactive before/after illustration with a resilient empty-state fallback. */
export function Comparison() {
  const [value, setValue] = useState(50);

  return (
    <div className="comparison-card">
      <div className="comparison">
        <div className="comparison-layer tint-pink">
          {after.src ? (
            <Image src={after.src} alt={after.alt} fill sizes={SIZES} />
          ) : (
            <div className="comparison-placeholder">
              <Camera size={40} aria-hidden="true" />
              <b>Fresh from the spa</b>
              <small>After illustration coming soon</small>
            </div>
          )}
          <span className="comparison-tag after">AFTER</span>
        </div>
        <div
          className="comparison-layer tint-blue comparison-before"
          style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
        >
          {before.src ? (
            <Image src={before.src} alt={before.alt} fill sizes={SIZES} />
          ) : (
            <div className="comparison-placeholder">
              <PawPrint size={48} aria-hidden="true" />
              <b>Ready for some pampering</b>
              <small>Before illustration coming soon</small>
            </div>
          )}
          <span className="comparison-tag">BEFORE</span>
        </div>
        <div className="comparison-line" style={{ left: `${value}%` }}>
          <span>
            <PawPrint size={22} aria-hidden="true" />
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          aria-label="Before and after comparison"
          aria-valuetext={`${value}% before illustration visible`}
        />
      </div>
      <div className="split comparison-caption">
        <div>
          <b>A little spa-day story</b>
          <small>An illustrated transformation.</small>
        </div>
        <span aria-hidden="true">↔ Slide to explore</span>
      </div>
      <p className="placeholder-note">
        Editorial brand artwork—not a client result.
      </p>
    </div>
  );
}
