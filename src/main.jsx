import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const menuItems = [
  { id: "home", label: "HOME" },
  { id: "about", label: "ABOUT" },
  { id: "links", label: "LINKS" },
  { id: "sites", label: "OTHER SITES" },
];

function App() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState("home");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const navigate = (id) => {
    setPage(id);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="app">
      <div className="ambient ambientA" />
      <div className="ambient ambientB" />
      <div className="grain" />

      <header className="topbar">
        <button className="brand" onClick={() => navigate("home")} aria-label="Frezanz home">
          <span className="brandMark">F</span>
          <span>FREZANZ</span>
        </button>

        <button
          className={`menuButton ${open ? "active" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span>MENU</span>
          <i /><i />
        </button>
      </header>

      <section className={`content page-${page}`}>
        {page === "home" && (
          <div className="home">
            <div className="orbit orbitOne" />
            <div className="orbit orbitTwo" />
            <div className="homeCopy">
              <p className="kicker">DIGITAL SPACE / 2026</p>
              <h1>frezanz<span>.</span></h1>
              <p className="homeLead">Ideas, systems, experiments<br />and things worth building.</p>
            </div>
            <div className="coordinate">26° // 4D</div>
            <div className="scrollCue">SCROLL TO EXPLORE <b>↓</b></div>
          </div>
        )}

        {page === "about" && (
          <article className="pageContent">
            <p className="kicker">01 / ABOUT</p>
            <h2>Building at the edge of<br /><em>ideas & technology.</em></h2>
            <div className="rule" />
            <p className="bodyText">
              Frezanz is a personal space for experiments across AI, computer science,
              physics, psychology, philosophy and software.
            </p>
            <p className="bodyText muted">
              A place to think, build, break things, and document what comes next.
            </p>
          </article>
        )}

        {page === "links" && (
          <article className="pageContent">
            <p className="kicker">02 / LINKS</p>
            <h2>Find me<br /><em>elsewhere.</em></h2>
            <div className="linkList">
              <a href="https://github.com/utam-x" target="_blank" rel="noreferrer"><span>01</span> GitHub <b>↗</b></a>
              <a href="https://github.com/Frezanz" target="_blank" rel="noreferrer"><span>02</span> GitHub / Frezanz <b>↗</b></a>
              <a href="#" onClick={(e) => e.preventDefault()}><span>03</span> Socials <b>↗</b></a>
            </div>
          </article>
        )}

        {page === "sites" && (
          <article className="pageContent">
            <p className="kicker">03 / OTHER SITES</p>
            <h2>Other corners<br /><em>of the system.</em></h2>
            <div className="siteGrid">
              <a href="#" onClick={(e) => e.preventDefault()}><small>PROJECT / 01</small><strong>WORKSHOP</strong><span>Visual knowledge & learning</span></a>
              <a href="#" onClick={(e) => e.preventDefault()}><small>PROJECT / 02</small><strong>CHAKMALEXICON</strong><span>Language & culture project</span></a>
              <a href="#" onClick={(e) => e.preventDefault()}><small>PROJECT / 03</small><strong>KCHAT</strong><span>Multi-model AI experiments</span></a>
            </div>
          </article>
        )}
      </section>

      {open && (
        <div className="menuOverlay" onClick={() => setOpen(false)}>
          <nav className="menuPanel" onClick={(e) => e.stopPropagation()}>
            <div className="menuHead"><span>NAVIGATION</span><small>FREZANZ / 001</small></div>
            <div className="menuItems">
              {menuItems.map((item, index) => (
                <button key={item.id} className={page === item.id ? "selected" : ""} onClick={() => navigate(item.id)}>
                  <span>0{index + 1}</span>{item.label}<b>↗</b>
                </button>
              ))}
            </div>
            <div className="menuFoot">CLOSE <button onClick={() => setOpen(false)}>ESC</button></div>
          </nav>
        </div>
      )}
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
