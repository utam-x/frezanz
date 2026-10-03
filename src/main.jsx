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

  useEffect(() => { localStorage.setItem("frezanz-ui-sound", sound ? "on" : "off"); }, [sound]);
  useEffect(() => { localStorage.setItem("frezanz-ui-volume", String(volume)); }, [volume]);

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
      for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 5);
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
      osc.start(now); osc.stop(now + 0.06); noise.start(now);
    } catch {}
  };

  const openPanel = (next) => { uiSound("open"); setPanel(next); };
  const close = () => { uiSound("close"); setPanel(null); };

  return (
    <main className="app">
      <div className="hudGrid" /><div className="scan" /><div className="coreGlow" />

      <header className="hudHeader">
        <button className="brand" onClick={close} aria-label="Frezanz home">
          <span className="brandCore">F</span><span>FREZANZ</span>
        </button>
        <div className="headerTools">
          <button className="hudButton" onClick={() => openPanel("settings")} aria-label="Settings"><span className="gear">⚙</span><span>SETTINGS</span></button>
          <button className={`hudButton menuTrigger ${panel === "menu" ? "active" : ""}`} onClick={() => panel === "menu" ? close() : openPanel("menu")} aria-label="Menu"><span>MENU</span><i /><i /><i /></button>
        </div>
      </header>

      <section className="hero" aria-label="Frezanz home">
        <div className="crosshair" aria-hidden="true">
          <span className="lineH" /><span className="lineV" /><span className="ring ringA" /><span className="ring ringB" />
          <span className="tick t1" /><span className="tick t2" /><span className="tick t3" /><span className="tick t4" /><div className="core">F</div>
        </div>
        <div className="homeSignal"><span className="micro">PERSONAL INTERFACE / ONLINE</span><span className="sub">THINK · BUILD · EXPLORE</span></div>
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
                <div className="panelHeader"><span>ABOUT</span><b>FREZANZ / IDENTITY</b></div>
                <article className="aboutContent">
                  <div className="aboutLead">
                    <span>WHO IS BEHIND IT</span>
                    <h2>FREZANZ</h2>
                    <p>Frezanz is a personal space for <strong>thinking, building and exploring</strong>—especially where computer science, AI, physics, psychology and philosophy start to overlap.</p>
                  </div>
                  <div className="aboutGrid">
                    <section>
                      <span>01 / THE PERSON</span>
                      <h3>Built around curiosity.</h3>
                      <p>Frezanz is the personal identity of Uttam Jit Chakma. The work here comes from a habit of taking an idea apart, going beneath the obvious explanation and asking what the underlying system actually is.</p>
                    </section>
                    <section>
                      <span>02 / THE WORK</span>
                      <h3>Ideas become experiments.</h3>
                      <p>This space connects software projects, AI experiments, research notes, visual experiments and questions that are still being worked out. Not everything starts as a finished answer.</p>
                    </section>
                    <section>
                      <span>03 / THE QUESTIONS</span>
                      <h3>Go deeper than the surface.</h3>
                      <p>Some of the recurring questions are about intelligence, how minds work, how systems understand information, what space and time really mean, and where the boundaries between disciplines begin to disappear.</p>
                    </section>
                    <section>
                      <span>04 / THE WEBSITE</span>
                      <h3>Not a conventional portfolio.</h3>
                      <p>The interface is deliberately closer to a personal operating system than a list of projects. The idea is to make the website feel like an environment that can reveal different parts of the work rather than a static page full of cards.</p>
                    </section>
                    <section>
                      <span>05 / THE INFLUENCE</span>
                      <h3>Systems over decoration.</h3>
                      <p>The HUD language takes inspiration from science-fiction interfaces, including Iron Man, but the goal is not to reproduce a movie screen. Motion, spatial hierarchy, compact information and responsive states are used because they fit the way this site is meant to be explored.</p>
                    </section>
                    <section>
                      <span>06 / STILL EVOLVING</span>
                      <h3>This is unfinished by design.</h3>
                      <p>Frezanz is a living project. The ideas, experiments and interface can change as understanding changes. The website is part of that process, not a final presentation of it.</p>
                    </section>
                  </div>
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
                  <div><span>INTERFACE</span><b>HOLOGRAPHIC</b></div><div><span>DEPTH</span><b>2D / 2.5D</b></div><div><span>ACCENT</span><b>CYAN</b></div><div><span>MOTION</span><b>RESPONSIVE</b></div>
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
