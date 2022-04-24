import React, { useState, useRef, useEffect } from "react";

import logo from "./logo.svg";
import "./App.css";

import WAVES from "vanta/dist/vanta.waves.min";

import * as THREE from "three";

function App() {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        WAVES({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
        })
      );
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div ref={vantaRef} className="MainContainer">
      <div className="Overlay" />
      <div className="Header">
        <div className="HeaderOverlay"/>
        <h1>CryptoWave</h1>
      </div>
    </div>
  );
}

export default App;
