import React,{useEffect,useRef,useState} from "react";
import {createRoot} from "react-dom/client";
import {motion,useMotionValue,useSpring} from "framer-motion";
import "./styles.css";

const modules=[
 {id:"01",title:"AI SYSTEMS",tag:"INTELLIGENCE",copy:"Models, agents, interfaces and architectures.",detail:"Building systems that turn language, tools and reasoning into useful machines."},
 {id:"02",title:"PHYSICS",tag:"REALITY",copy:"Spacetime, gravity, dimensions and the structure underneath.",detail:"Questions that start where ordinary explanations stop."},
 {id:"03",title:"SOFTWARE",tag:"ENGINEERING",copy:"Products, experiments and systems built from first principles.",detail:"Software is the laboratory."},
 {id:"04",title:"PSYCHOLOGY",tag:"HUMAN",copy:"Mind, emotion, behaviour, identity and human systems.",detail:"Observations about the machinery inside people."}
];

function Grid(){return <div className="grid"><div className="gridGlow"/><div className="gridH"/><div className="gridV"/></div>}

function Reactor(){
 const ref=useRef(null);
 useEffect(()=>{
  const canvas=ref.current,ctx=canvas.getContext("2d");
  let raf;
  const resize=()=>{const d=Math.min(devicePixelRatio||1,1.5);canvas.width=innerWidth*d;canvas.height=innerHeight*d;canvas.style.width=innerWidth+"px";canvas.style.height=innerHeight+"px";ctx.setTransform(d,0,0,d,0,0)};
  const draw=(t)=>{
   ctx.clearRect(0,0,innerWidth,innerHeight);
   const x=innerWidth*.5,y=innerHeight*.49,s=Math.min(innerWidth,innerHeight);
   ctx.save();ctx.translate(x,y);ctx.globalCompositeOperation="lighter";
   for(let i=0;i<5;i++){
    const r=s*(.055+i*.032),a=.12-i*.017;
    ctx.beginPath();ctx.arc(0,0,r,t*.00015*(i%2?1:-1),t*.00015*(i%2?1:-1)+Math.PI*(1.2+i*.27));
    ctx.strokeStyle="rgba(190,220,255,"+a+")";ctx.lineWidth=i===0?2:1;ctx.stroke();
   }
   ctx.beginPath();ctx.arc(0,0,s*.058,0,Math.PI*2);ctx.fillStyle="rgba(190,225,255,.025)";ctx.fill();ctx.strokeStyle="rgba(215,235,255,.35)";ctx.lineWidth=1;ctx.stroke();
   const g=ctx.createRadialGradient(0,0,0,0,0,s*.075);g.addColorStop(0,"rgba(235,248,255,.9)");g.addColorStop(.18,"rgba(150,205,255,.42)");g.addColorStop(1,"rgba(80,140,255,0)");
   ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,s*.075,0,Math.PI*2);ctx.fill();
   ctx.restore();raf=requestAnimationFrame(draw)
  };
  resize();addEventListener("resize",resize);raf=requestAnimationFrame(draw);
  return()=>{cancelAnimationFrame(raf);removeEventListener("resize",resize)}
 },[]);
 return <canvas ref={ref} className="reactor" aria-hidden="true"/>;
}

function GlassPanel({children,className="",...p}){return <div className={"panel "+className} {...p}>{children}</div>}

function App(){
 const [active,setActive]=useState(null);
 const mx=useMotionValue(.5),my=useMotionValue(.5);
 const sx=useSpring(mx,{stiffness:80,damping:25}),sy=useSpring(my,{stiffness:80,damping:25});

 useEffect(()=>{
  const move=e=>{mx.set(e.clientX/innerWidth);my.set(e.clientY/innerHeight)};
  addEventListener("pointermove",move,{passive:true});
  return()=>removeEventListener("pointermove",move)
 },[]);

 useEffect(()=>{
  if(!active)return;
  const scrollY=window.scrollY;
  const html=document.documentElement,body=document.body;
  html.style.overflow="hidden";
  body.style.overflow="hidden";
  body.style.touchAction="none";
  return()=>{
   html.style.overflow="";
   body.style.overflow="";
   body.style.touchAction="";
   window.scrollTo(0,scrollY);
  };
 },[active]);

 const close=()=>setActive(null);

 return <div className={"app"+(active?" interface-locked":"")}>
  <Grid/><Reactor/>
  <div className="scanlines"/>
  <header>
   <a className="logo" href="#">FREZANZ<span>///</span></a>
   <div className="status"><b/> SYSTEM ONLINE <span>2026.10</span></div>
   <button className="menu" onClick={()=>document.querySelector("#modules")?.scrollIntoView({behavior:"smooth"})}><span>01</span> MENU <i/><i/><i/></button>
  </header>

  <main>
   <section className="hero">
    <motion.div className="crosshair" style={{x:sx,y:sy}}/>
    <div className="coordinates">12° 58' 31.2" N<br/>77° 38' 44.4" E</div>
    <div className="heroLeft">
      <div className="eyebrow"><span>FZ / 001</span> PERSONAL OPERATING SYSTEM</div>
      <h1>BUILD<br/><span>THE</span> UNKNOWN.</h1>
      <p>AI / SOFTWARE / PHYSICS / HUMAN SYSTEMS</p>
    </div>
    <GlassPanel className="readout">
      <div className="readoutTop"><span>CORE</span><span>ACTIVE</span></div>
      <div className="coreLine"><b>∞</b><span>CURIOSITY<br/><small>MODE</small></span></div>
      <div className="bars"><i/><i/><i/><i/><i/><i/><i/><i/><i/></div>
      <div className="readoutBottom"><span>POWER</span><strong>87.4%</strong></div>
    </GlassPanel>
    <div className="scrollHint"><span>SCROLL</span><b>↓</b><span>ENTER SYSTEM</span></div>
   </section>

   <section id="modules" className="modules">
    <div className="sectionHead"><span>02 / MODULES</span><h2>THINGS<br/><em>WORTH BUILDING.</em></h2></div>
    <div className="moduleGrid">
     {modules.map(m=><motion.button key={m.id} className="module" onClick={()=>setActive(m)} whileHover={{y:-5}} whileTap={{scale:.99}}>
       <div className="moduleGlow"/>
       <span className="moduleId">{m.id}</span>
       <span className="moduleTag">{m.tag}</span>
       <strong>{m.title}</strong>
       <p>{m.copy}</p>
       <span className="moduleArrow">↗</span>
       <div className="moduleLine"/>
     </motion.button>)}
    </div>
   </section>

   <section className="statement">
    <span>03 / SIGNAL</span>
    <div><p>I'm not trying to make a portfolio.</p><h2>I'm building a place<br/><em>for the things I haven't figured out yet.</em></h2></div>
   </section>
  </main>

  <footer><span>FREZANZ / DIGITAL SPACE</span><span>TRANSMISSION COMPLETE</span></footer>

  {active&&<motion.div
    className="modalWrap"
    role="dialog"
    aria-modal="true"
    aria-label={active.title}
    initial={{opacity:0}}
    animate={{opacity:1}}
    onClick={close}
    onWheel={e=>e.stopPropagation()}
    onTouchMove={e=>e.stopPropagation()}
  >
   <motion.section className="modal panel" initial={{scale:.96,y:18}} animate={{scale:1,y:0}} onClick={e=>e.stopPropagation()}>
    <button className="close" aria-label="Close module" onClick={close}>×</button>
    <span>{active.id} / {active.tag}</span>
    <h2>{active.title}</h2>
    <p>{active.detail}</p>
    <small>MODULE INTERFACE / ACTIVE</small>
   </motion.section>
  </motion.div>}
 </div>
}

createRoot(document.getElementById("root")).render(<App/>);