import React, { Suspense, useRef } from "react";
import { createRoot } from "react-dom/client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshTransmissionMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import "./styles.css";

function OrbitalGlass() {
  const group = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.14;
      group.current.rotation.x = Math.sin(t * 0.24) * 0.18;
    }
  });
  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.45} floatIntensity={0.8}>
        <mesh>
          <icosahedronGeometry args={[1.48, 2]} />
          <MeshTransmissionMaterial
            transmission={1}
            thickness={0.55}
            roughness={0.13}
            ior={1.42}
            chromaticAberration={0.045}
            anisotropy={0.12}
            distortion={0.12}
            distortionScale={0.28}
            temporalDistortion={0.16}
          />
        </mesh>
      </Float>
      <mesh scale={0.55} rotation={[0.6, 0.1, 0.5]}>
        <torusGeometry args={[2.05, 0.014, 16, 220]} />
        <meshBasicMaterial transparent opacity={0.35} />
      </mesh>
      <mesh scale={0.8} rotation={[1.15, 0.5, -0.2]}>
        <torusGeometry args={[2.15, 0.007, 12, 220]} />
        <meshBasicMaterial transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 6.7], fov: 38 }} dpr={[1, 1.8]}>
      <color attach="background" args={["#050505"]} />
      <ambientLight intensity={1.2} />
      <directionalLight position={[4, 3, 4]} intensity={2.6} />
      <directionalLight position={[-4, -1, 1]} intensity={1.4} />
      <Suspense fallback={null}>
        <OrbitalGlass />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}

const work = [
  ["AI", "Agents, models, interfaces, and strange experiments.", "↗"],
  ["Software", "Systems built from first principles and curiosity.", "↗"],
  ["Physics", "Questions about spacetime, gravity, dimensions, and reality.", "↗"],
  ["Thinking", "Notes on psychology, philosophy, human nature, and systems.", "↗"]
];

function App() {
  const [active, setActive] = React.useState(null);
  return (
    <main>
      <div className="grain" />
      <header className="topbar">
        <a className="brand" href="#top">frezanz<span>°</span></a>
        <button className="menu" onClick={() => document.querySelector("#work")?.scrollIntoView({behavior:"smooth"})}>
          <i /><i /><i />
          <span>explore</span>
        </button>
      </header>

      <section id="top" className="hero">
        <div className="scene"><Scene /></div>
        <div className="hero-copy">
          <p className="eyebrow">DIGITAL SPACE / 2026</p>
          <h1>I build things<br/><em>to understand.</em></h1>
          <p className="lede">AI · software · physics · ideas</p>
          <a className="glass-button" href="#work">Enter the space <b>↓</b></a>
        </div>
        <div className="hero-meta"><span>01</span><span>SCROLL TO EXPLORE</span><span>∞</span></div>
      </section>

      <section id="work" className="work">
        <div className="section-heading">
          <span>02 / WORKSPACE</span>
          <h2>Curiosity<br/><em>made tangible.</em></h2>
        </div>
        <div className="cards">
          {work.map(([title, desc, arrow], i) => (
            <motion.button
              key={title}
              className="glass-card"
              onClick={() => setActive(i)}
              whileHover={{y:-8, rotateX:2, rotateY:-2}}
              whileTap={{scale:0.985}}
            >
              <span className="num">0{i+1}</span>
              <span className="card-title">{title}</span>
              <span className="card-desc">{desc}</span>
              <span className="arrow">{arrow}</span>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="manifesto">
        <span>03 / NOW</span>
        <p>Not a portfolio.<br/><em>A living map of what I'm trying to figure out.</em></p>
      </section>

      <footer>
        <span>frezanz°</span>
        <span>built in public / eventually</span>
      </footer>

      {active !== null && (
        <motion.div className="overlay" initial={{opacity:0}} animate={{opacity:1}} onClick={() => setActive(null)}>
          <motion.div className="modal glass-card" initial={{y:30, scale:.96}} animate={{y:0, scale:1}} onClick={e=>e.stopPropagation()}>
            <button className="close" onClick={()=>setActive(null)}>×</button>
            <span className="num">0{active+1}</span>
            <h3>{work[active][0]}</h3>
            <p>{work[active][1]}</p>
            <span className="coming">SPACE UNDER CONSTRUCTION</span>
          </motion.div>
        </motion.div>
      )}
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);