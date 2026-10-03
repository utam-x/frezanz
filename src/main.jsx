import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function App() {
  const [menu, setMenu] = useState(false);
  const [settings, setSettings] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menu || settings ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menu, settings]);

  const close = () => { setMenu(false); setSettings(false); };

  return (
    <main className="app">
      <div className="hudGrid" />
      <div className="scan" />
      <div className="coreGlow" />

      <header className="hudHeader">
        <button className="brand" onClick={close} aria-label="Frezanz home">
          <span className="brandCore">F</span>
          <span>FREZANZ</span>
        </button>

        <div className="headerTools">
          <button className="hudButton" onClick={() => { setSettings(!settings); setMenu(false); }} aria-label="Settings">
            <span className="gear">⚙</span>
            <span>SETTINGS</span>
          </button>
          <button className={`hudButton menuTrigger ${menu ? "active" : ""}`} onClick={() => { setMenu(!menu); setSettings(false); }} aria-label="Menu">
            <span>MENU</span>
            <i /><i /><i />
          </button>
        </div>
      </header>

      <section className="hero">
        <div className="crosshair">
          <span className="lineH" /><span className="lineV" />
          <span className="ring ringA" /><span className="ring ringB" />
          <span className="tick t1" /><span className="tick t2" /><span className="tick t3" /><span className="tick t4" />
          <div className="core">F</div>
        </div>

        <div className="heroTitle">
          <span className="micro">PERSONAL INTERFACE / ONLINE</span>
          <h1>frezanz</h1>
          <span className="sub">THINK · BUILD · EXPLORE</span>
        </div>

        <div className="telemetry telemetryLeft">
          <span>SYS / 001</span>
          <b>ACTIVE</b>
          <i />
        </div>
        <div className="telemetry telemetryRight">
          <span>SPACE / 04D</span>
          <b>000.001</b>
          <i />
        </div>
      </section>

      {(menu || settings) && (
        <div className="interfaceLayer" onClick={close}>
          <div className="interfacePanel" onClick={e => e.stopPropagation()}>
            {menu && (
              <>
                <div className="panelHeader"><span>NAVIGATION</span><b>FREZANZ / MENU</b></div>
                <nav className="radialNav">
                  <button onClick={close}><span>01</span><strong>HOME</strong><em>⌂</em></button>
                  <button onClick={close}><span>02</span><strong>ABOUT</strong><em>+</em></button>
                  <button onClick={close}><span>03</span><strong>LINKS</strong><em>↗</em></button>
                  <button onClick={close}><span>04</span><strong>OTHER SITES</strong><em>◇</em></button>
                </nav>
              </>
            )}

            {settings && (
              <>
                <div className="panelHeader"><span>SYSTEM SETTINGS</span><b>FREZANZ / CONFIG</b></div>
                <div className="settingsList">
                  <div><span>INTERFACE</span><b>HOLOGRAPHIC</b></div>
                  <div><span>DEPTH</span><b>2D / 2.5D</b></div>
                  <div><span>ACCENT</span><b>CYAN</b></div>
                  <div><span>MOTION</span><b>RESPONSIVE</b></div>
                  <div><span>GRID</span><b>SPATIAL</b></div>
                </div>
              </>
            )}
            <button className="closeInterface" onClick={close}>× <span>CLOSE</span></button>
          </div>
        </div>
      )}
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
