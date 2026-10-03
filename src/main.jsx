import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const links = [
  { label: "GITHUB", value: "utam-x / frezanz", href: "https://github.com/utam-x/frezanz", icon: "↗" },
  { label: "INSTAGRAM", value: "di_pudo_lettoh", href: "https://www.instagram.com/di_pudo_lettoh?stkn=NzM4Z2FvdDVuaTRp", icon: "◎" },
  { label: "INSTAGRAM", value: "frezanz", href: "https://www.instagram.com/frezanz?stkn=NnM1MmJqOW5vNmky", icon: "◎" },
  { label: "YOUTUBE", value: "@frezanzzz", href: "https://youtube.com/@frezanzzz?si=OAX19epXEvd1JjQY", icon: "▶" },
  { label: "EMAIL", value: "ujclnove@gmail.com", href: "mailto:ujclnove@gmail.com", icon: "@" },
];

function App() {
  const [panel, setPanel] = useState(null);
  const [sound, setSound] = useState(() => localStorage.getItem("frezanz-ui-sound") !== "off");
  const [volume, setVolume] = useState(() => Number(localStorage.getItem("frezanz-ui-volume") ?? 0.22));
  const audioRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = panel ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [panel]);

  useEffect(() => {
    localStorage.setItem("frezanz-ui-sound", sound ? "on" : "off");
  }, [sound]);

  useEffect(() => {
    localStorage.setItem("frezanz-ui-volume", String(volume));
  }, [volume]);

  // Short hardware-like HUD feedback: filtered noise + a low digital transient.
  // It is intentionally dry and extremely brief—no musical beep or rising synth tone.
  const uiSound = (type = "click") => {
    if (!sound) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioRef.current) audioRef.current = new AudioContext();
      const ctx = audioRef.current;
      if (ctx.state === "suspended") ctx.resume();

      const now = ctx.currentTime;
      const master = ctx.createGain();
      master.gain.setValueAtTime(Math.max(volume * 0.34, 0.001), now);
      master.gain.exponentialRampToValueAtTime(0.001, now + (type === "open" ? 0.075 : 0.035));
      master.connect(ctx.destination);

      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = "triangle";
      const startHz = type === "close" ? 92 : type === "open" ? 148 : 118;
      osc.frequency.setValueAtTime(startHz, now);
      osc.frequency.exponentialRampToValueAtTime(startHz * 0.48, now + 0.045);
      oscGain.gain.setValueAtTime(0.16, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.055);
      osc.connect(oscGain).connect(master);

      const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.025), ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 5);
      }
      const noise = ctx.createBufferSource();
      const filter = ctx.createBiquadFilter();
      const noiseGain = ctx.createGain();
      filter.type = "bandpass";
      filter.frequency.value = type === "open" ? 1700 : 2300;
      filter.Q.value = 2.8;
      noiseGain.gain.setValueAtTime(type === "open" ? 0.28 : 0.2, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
      noise.buffer = buffer;
      noise.connect(filter).connect(noiseGain).connect(master);

      osc.start(now);
      osc.stop(now + 0.06);
      noise.start(now);
    } catch {}
  };

  const openPanel = (next) => {
    uiSound("open");
    setPanel(next);
  };

  const close = () => {
    uiSound("close");
    setPanel(null);
  };

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
          <button className="hudButton" onClick={() => openPanel("settings")} aria-label="Settings">
            <span className="gear">⚙</span><span>SETTINGS</span>
          </button>
          <button className={`hudButton menuTrigger ${panel === "menu" ? "active" : ""}`} onClick={() => panel === "menu" ? close() : openPanel("menu")} aria-label="Menu">
            <span>MENU</span><i /><i /><i />
          </button>
        </div>
      </header>

      <section className="hero" aria-label="Frezanz home">
        <div className="crosshair" aria-hidden="true">
          <span className="lineH" /><span className="lineV" />
          <span className="ring ringA" /><span className="ring ringB" />
          <span className="tick t1" /><span className="tick t2" /><span className="tick t3" /><span className="tick t4" />
          <div className="core">F</div>
        </div>
        <div className="homeSignal">
          <span className="micro">PERSONAL INTERFACE / ONLINE</span>
          <span className="sub">THINK · BUILD · EXPLORE</span>
        </div>
        <div className="telemetry telemetryLeft"><span>SYS / 001</span><b>ACTIVE</b><i /></div>
        <div className="telemetry telemetryRight"><span>SPACE / 04D</span><b>000.001</b><i /></div>
      </section>

      {panel && (
        <div className="interfaceLayer" onClick={close}>
          <div className="interfacePanel" onClick={e => e.stopPropagation()}>
            {panel === "menu" && (
              <>
                <div className="panelHeader"><span>NAVIGATION</span><b>FREZANZ / SYSTEM</b></div>
                <nav className="systemNav">
                  <button onClick={close}><span>01</span><strong>HOME</strong><em>⌂</em></button>
                  <button onClick={() => openPanel("about")}><span>02</span><strong>ABOUT</strong><em>+</em></button>
                  <button onClick={() => openPanel("links")}><span>03</span><strong>LINKS</strong><em>↗</em></button>
                  <button onClick={() => openPanel("settings")}><span>04</span><strong>SETTINGS</strong><em>⚙</em></button>
                </nav>
              </>
            )}

            {panel === "about" && (
              <>
                <div className="panelHeader"><span>ABOUT / DESIGN RESEARCH</span><b>FREZANZ / HUD-01</b></div>
                <article className="aboutContent">
                  <div className="aboutLead"><span>REFERENCE SYSTEM</span><h2>IRON MAN HUD</h2><p>Frezanz borrows the <strong>principles</strong> behind the Iron Man interfaces—not a literal copy of their graphics.</p></div>
                  <div className="researchGrid">
                    <section><span>01 / CONTEXT</span><h3>Interfaces change with the task.</h3><p>The HUD shifts between diagnostics, flight, targeting, radar, navigation and other modes. Information appears when it becomes relevant instead of staying permanently expanded.</p></section>
                    <section><span>02 / INFORMATION</span><h3>Symbols beat paragraphs.</h3><p>The original HUD team described using symbols because information had to be understood quickly. Frezanz therefore keeps persistent UI compact and reveals detail inside focused panels.</p></section>
                    <section><span>03 / MOTION</span><h3>Elements assemble, move and collapse.</h3><p>Iron Man's UI was designed as motion graphics: widgets fly in and out, expand when needed, then return to a compact state. Frezanz uses scan lines, rotating rings and state transitions with the same logic.</p></section>
                    <section><span>04 / DEPTH</span><h3>2D becomes spatial.</h3><p>Later Iron Man HUD work used true 3D elements and layered interfaces. Frezanz starts with 2D and 2.5D layers so depth supports navigation rather than becoming visual noise.</p></section>
                    <section><span>05 / COLOUR</span><h3>Colour communicates state.</h3><p>Cyan became strongly associated with the early HUD; later Mark III design moved toward white graphics with colour accents. Frezanz keeps cyan as its active system signal while reserving stronger accents for state changes.</p></section>
                    <section><span>06 / INTERACTION</span><h3>Reveal information progressively.</h3><p>Primary controls stay peripheral and compact. Selecting one should reconfigure the interface around that task—closer to an operating system than a conventional webpage.</p></section>
                  </div>
                  <div className="sourceLine"><span>RESEARCH</span><a href="https://vfxblog.com/ironman/" target="_blank" rel="noreferrer">VFXBLOG / ORIGINAL HUD ORAL HISTORY ↗</a><a href="https://scifiinterfaces.com/2015/07/01/iron-man-hud-a-breakdown/amp/" target="_blank" rel="noreferrer">SCI-FI INTERFACES / HUD BREAKDOWN ↗</a><a href="https://www.johnlikens.com/project/iron-man-3/" target="_blank" rel="noreferrer">JOHN LIKENS / IRON MAN 3 ↗</a></div>
                </article>
              </>
            )}

            {panel === "links" && (
              <>
                <div className="panelHeader"><span>EXTERNAL CHANNELS</span><b>FREZANZ / LINKS</b></div>
                <nav className="linksList">{links.map((link, index) => (
                  <a key={link.href} href={link.href} target={link.href.startsWith("mailto:") ? undefined : "_blank"} rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"} onClick={() => uiSound("click")}>
                    <span className="linkIndex">{String(index + 1).padStart(2, "0")}</span><span><small>{link.label}</small><strong>{link.value}</strong></span><em>{link.icon}</em>
                  </a>
                ))}</nav>
              </>
            )}

            {panel === "settings" && (
              <>
                <div className="panelHeader"><span>SYSTEM SETTINGS</span><b>FREZANZ / CONFIG</b></div>
                <div className="settingsList">
                  <div><span>INTERFACE</span><b>HOLOGRAPHIC</b></div>
                  <div><span>DEPTH</span><b>2D / 2.5D</b></div>
                  <div><span>ACCENT</span><b>CYAN</b></div>
                  <div><span>MOTION</span><b>RESPONSIVE</b></div>
                  <div><span>UI SOUNDS</span><button className={`settingToggle ${sound ? "on" : ""}`} onClick={() => { const next = !sound; setSound(next); if (next) setTimeout(() => uiSound("click"), 0); }}><i /> {sound ? "ON" : "OFF"}</button></div>
                  <div className="volumeRow"><span>SOUND LEVEL</span><label><input type="range" min="0" max="1" step="0.01" value={volume} onChange={e => setVolume(Number(e.target.value))} /><b>{Math.round(volume * 100)}%</b></label></div>
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
