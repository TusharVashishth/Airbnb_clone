"use client";
import React, { useEffect, useState } from "react";
import AnimatedNumbers from "react-animated-numbers";

export default function Counter({ num }: { num: number }) {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <>
      {show && (
        <AnimatedNumbers
          includeComma
          animateToNumber={num}
          fontStyle={{ fontSize: 40, fontWeight: "bold" }}
          locale="en-US"
          configs={[
            { mass: 1, tension: 220, friction: 100 },
            { mass: 1, tension: 180, friction: 130 },
            { mass: 1, tension: 280, friction: 90 },
            { mass: 1, tension: 180, friction: 135 },
            { mass: 1, tension: 260, friction: 100 },
            { mass: 1, tension: 210, friction: 180 },
          ]}
        ></AnimatedNumbers>
      )}
    </>
  );
}
