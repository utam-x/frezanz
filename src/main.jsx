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

function About() {
  return (
<article className="aboutContent">
  <div className="aboutLead">
    <span>ABOUT</span>
    <h2>FREZANZ</h2>
    <p>A place for things that are still becoming.</p>
  </div>
  <div className="aboutGrid">
    <section>
      <span>01</span><h3>THE PERSON</h3>
      <p>I'm Uttam Jit Chakma.</p>
      <p>Frezanz is the name attached to this place, but the person behind it is not a finished idea.</p>
      <p>I make things, study things, question things, and occasionally become interested in something for reasons I don't understand until much later.</p>
      <p>Some of those things end up here.</p>
    </section>
    <section>
      <span>02</span><h3>THE WEBSITE</h3>
      <p>This is not meant to be a complete record of me.</p>
      <p>It is a changing collection of things:</p>
      <p>ideas · experiments · projects · images · questions · observations · things I'm learning · things I'm trying to understand · and things that probably shouldn't have worked but somehow did.</p>
      <p>The website exists to give those things somewhere to meet.</p>
      <p>A project may lead to a thought. A thought may become a project. An image may become a memory. A question may remain a question.</p>
      <p>There isn't always a straight line between them.</p>
      <p>That's intentional.</p>
    </section>
    <section>
      <span>03</span><h3>WHAT YOU CAN FIND HERE</h3>
      <p><strong>EXPLORE</strong><br/>Move through the things I've made, collected, questioned, or left unfinished.</p>
      <p><strong>THINK</strong><br/>Read ideas, observations and questions that are still being worked out.</p>
      <p><strong>BUILD</strong><br/>See experiments and projects as they develop, rather than only seeing their final versions.</p>
      <p><strong>LOOK</strong><br/>Photography, visual experiments, references and things that caught my attention.</p>
      <p><strong>FOLLOW</strong><br/>See what is changing over time.</p>
      <p>Some things will disappear. Some will return differently.</p>
    </section>
    <section>
      <span>04</span><h3>WHAT I CAN OFFER</h3>
      <p>I don't have everything figured out.</p>
      <p>I don't want this website to pretend otherwise.</p>
      <p>What I can offer is the things I actually have:</p>
      <p>my observations, my experiments, my way of connecting things, things I've learned, things I've built, and the questions I'm currently willing to spend time on.</p>
      <p>If one of those becomes useful to you, take it.</p>
      <p>Use it. Question it. Improve it. Disagree with it.</p>
      <p>There is no ownership attached to being the first person to think something.</p>
    </section>
    <section>
      <span>05</span><h3>IF YOU ARE HERE FOR...</h3>
      <p><strong>A PROJECT</strong><br/>You can see what it is, why it exists, how it developed, and where it is going.</p>
      <p><strong>AN IDEA</strong><br/>You can explore it without having to agree with it.</p>
      <p><strong>A RESOURCE</strong><br/>Take whatever is useful.</p>
      <p><strong>A COLLABORATION</strong><br/>Find something worth building together.</p>
      <p><strong>A CONVERSATION</strong><br/>Bring a better question.</p>
      <p><strong>A PERSON</strong><br/>You will probably understand more by exploring what they made than by reading a biography.</p>
      <p><strong>A STRANGE WEBSITE</strong><br/>You are already in the right place.</p>
    </section>
    <section>
      <span>06</span><h3>WHAT I EXPECT FROM YOU</h3>
      <p>Nothing.</p>
      <p>You don't have to agree with me.</p>
      <p>You don't have to understand everything.</p>
      <p>You don't even have to like it.</p>
      <p>But if something here makes you stop for a moment—question it.</p>
      <p>That is probably more valuable than simply liking it.</p>
    </section>
    <section>
      <span>07</span><h3>AND IF YOU HAVE SOMETHING TO ADD</h3>
      <p>A useful correction.</p>
      <p>A better idea.</p>
      <p>A different perspective.</p>
      <p>A problem worth solving.</p>
      <p>Something worth making.</p>
      <p>You can bring it here.</p>
      <p>Because a website that only moves in one direction eventually becomes an archive.</p>
      <p>I would rather it remain a place where things can enter.</p>
    </section>
    <section>
      <span>08</span><h3>THE POINT</h3>
      <p>Maybe there isn't one.</p>
      <p>Or maybe there are too many.</p>
      <p>A website can be a portfolio. An archive. A laboratory. A notebook. A public space. A way of remembering.</p>
      <p>This one can be whatever it becomes.</p>
      <p>For now, it is a place where I put things worth keeping—and a place where you might find something worth taking.</p>
    </section>
  </div>
  <div className="aboutFooter"><strong>FREZANZ</strong><span>explore → make → question → return</span></div>
</article>);
}

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
      <div className="hudGrid" />
      <div className="scan" />
      <div className="coreGlow" />

      <header className="hudHeader">
        <button className="brand" onClick={close} aria-label="Frezanz home">
          <span className="brandCore">F</span><span>FREZANZ</span>
        </button>
        <div className="headerTools">
          <button className={`hudButton menuTrigger ${panel === "menu" ? "active" : ""}`} onClick={() => panel === "menu" ? close() : openPanel("menu")} aria-label="Menu">
            <span>MENU</span><i /><i /><i />
          </button>
        </div>
      </header>

      <section className="hero" aria-label="Frezanz home">
        <div className="crosshair" aria-hidden="true">
          <span className="lineH" />
          <span className="lineV" />
          <span className="ring ringA" />
          <span className="ring ringB" />
        </div>
        <div className="telemetry telemetryLeft"><span>SYS / 001</span><b>ACTIVE</b><i /></div>
        <div className="telemetry telemetryRight"><span>SPACE / 04D</span><b>000.001</b><i /></div>
      </section>

      <section className="homeAbout" aria-label="About Frezanz">
        <div className="homeAboutHeader"><span>ABOUT</span><b>FREZANZ / IDENTITY</b></div>
        <About />
      </section>

      {panel && (
        <div className="interfaceLayer" onClick={close}>
          <div className="interfacePanel" onClick={(e) => e.stopPropagation()}>
            {panel === "menu" && (
              <>
                <div className="panelHeader"><span>NAVIGATION</span><b>FREZANZ / SYSTEM</b></div>
                <nav className="systemNav">
                  <button onClick={close}><span>01</span><strong>HOME</strong><em>◌</em></button>
                  <button onClick={() => openPanel("about")}><span>02</span><strong>ABOUT</strong><em>+</em></button>
                  <button onClick={() => openPanel("links")}><span>03</span><strong>LINKS</strong><em>↗</em></button>
                  <button onClick={() => openPanel("settings")}><span>04</span><strong>SETTINGS</strong><em>⚙</em></button>
                </nav>
              </>
            )}

            {panel === "about" && (
              <>
                <div className="panelHeader"><span>ABOUT</span><b>FREZANZ / IDENTITY</b></div>
                <About />
              </>
            )}

            {panel === "links" && (
              <>
                <div className="panelHeader"><span>EXTERNAL CHANNELS</span><b>FREZANZ / LINKS</b></div>
                <nav className="linksList">
                  {links.map((link, index) => (
                    <a key={link.href} href={link.href} target={link.href.startsWith("mailto:") ? undefined : "_blank"} rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"} onClick={() => uiSound("click")}>
                      <span className="linkIndex">{String(index + 1).padStart(2, "0")}</span>
                      <span><small>{link.label}</small><strong>{link.value}</strong></span>
                      <em>{link.icon}</em>
                    </a>
                  ))}
                </nav>
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
                  <div>
                    <span>UI SOUNDS</span>
                    <button className={`settingToggle ${sound ? "on" : ""}`} onClick={() => { const next = !sound; setSound(next); if (next) setTimeout(() => uiSound("click"), 0); }}>
                      <i />{sound ? "ON" : "OFF"}
                    </button>
                  </div>
                  <div className="volumeRow">
                    <span>SOUND LEVEL</span>
                    <label><input type="range" min="0" max="1" step="0.01" value={volume} onChange={e => setVolume(Number(e.target.value))} /><b>{Math.round(volume * 100)}%</b></label>
                  </div>
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
