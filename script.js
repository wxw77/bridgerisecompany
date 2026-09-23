const refinement=document.createElement('link');refinement.rel='stylesheet';refinement.href='mobile-refinement.css?v=2';document.head.appendChild(refinement);
const visual=document.createElement('link');visual.rel='stylesheet';visual.href='visual-v2.css?v=3';document.head.appendChild(visual);

// Use the real Bridge Rise identity everywhere instead of the placeholder monogram.
const logoMarkup='<img src="bridge-rise-logo.svg" alt="Bridge Rise Company">';
document.querySelectorAll('.brand').forEach(el=>{el.innerHTML=logoMarkup});

// Cinematic branded loading sequence.
document.documentElement.classList.add('is-loading');
const loader=document.createElement('div');loader.className='br-loader';loader.innerHTML='<div class="br-loader__inner"><img class="br-loader__logo" src="bridge-rise-logo.svg" alt="Bridge Rise Company"><div class="br-loader__rail"></div><div class="br-loader__label">building the bridge</div></div>';document.body.prepend(loader);
const finishLoad=()=>{setTimeout(()=>{loader.classList.add('is-hidden');document.documentElement.classList.remove('is-loading');document.body.classList.add('motion-ready');setTimeout(()=>loader.remove(),900)},1450)};
if(document.readyState==='complete')finishLoad();else window.addEventListener('load',finishLoad,{once:true});

// Architectural background inspired by entering a bridge, not generic particles.
const tunnel=document.createElement('div');tunnel.className='bridge-tunnel';tunnel.setAttribute('aria-hidden','true');tunnel.innerHTML='<div class="bridge-tunnel__world"><div class="bridge-tunnel__rail"></div><div class="bridge-tunnel__rail"></div><div class="bridge-tunnel__rail"></div><div class="bridge-tunnel__rail"></div><div class="bridge-tunnel__deck"></div><div class="bridge-tunnel__arch a1"></div><div class="bridge-tunnel__arch a2"></div><div class="bridge-tunnel__arch a3"></div><div class="bridge-tunnel__arch a4"></div><div class="bridge-tunnel__glow"></div></div>';document.body.prepend(tunnel);

// Add a subtle section progress line to make scrolling feel authored and deliberate.
document.querySelectorAll('.panel').forEach(panel=>{const wipe=document.createElement('div');wipe.className='section-wipe';panel.appendChild(wipe)});

const header=document.querySelector('.site-header');const menu=document.querySelector('.menu-toggle');const nav=document.querySelector('.desktop-nav');const dots=[...document.querySelectorAll('.section-indicator i')];const label=document.querySelector('.section-indicator span');const sections=[...document.querySelectorAll('.panel')];const counters=[...document.querySelectorAll('[data-count]')];const ring=document.querySelector('.cursor--ring');const dot=document.querySelector('.cursor--dot');

window.addEventListener('scroll',()=>{header?.classList.toggle('scrolled',window.scrollY>24)},{passive:true});

const closeMenu=()=>{nav?.classList.remove('open');menu?.setAttribute('aria-expanded','false');document.documentElement.classList.remove('menu-open');document.body.classList.remove('menu-open');menu?.setAttribute('aria-label','Abrir menu')};
const openMenu=()=>{nav?.classList.add('open');menu?.setAttribute('aria-expanded','true');document.documentElement.classList.add('menu-open');document.body.classList.add('menu-open');menu?.setAttribute('aria-label','Fechar menu')};
menu?.addEventListener('click',e=>{e.stopPropagation();nav?.classList.contains('open')?closeMenu():openMenu()});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
window.addEventListener('resize',()=>{if(window.innerWidth>900)closeMenu()});
document.addEventListener('click',e=>{if(window.innerWidth<=900&&nav?.classList.contains('open')&&!nav.contains(e.target)&&!menu?.contains(e.target))closeMenu()});

const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){const i=sections.indexOf(entry.target);if(label)label.textContent=entry.target.dataset.section||'';dots.forEach((d,idx)=>d.classList.toggle('active',idx===Math.min(i,dots.length-1)))}})},{threshold:.42});sections.forEach(s=>observer.observe(s));

let counted=false;const countObserver=new IntersectionObserver(entries=>{if(counted)return;entries.forEach(entry=>{if(entry.isIntersecting){counted=true;counters.forEach(el=>{const target=+el.dataset.count;const duration=1000;const tick=t=>{if(!el._start)el._start=t;const p=Math.min((t-el._start)/duration,1);el.textContent=Math.floor(target*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(tick)};requestAnimationFrame(tick)});countObserver.disconnect()}})},{threshold:.35});const numbers=document.querySelector('.numbers');if(numbers)countObserver.observe(numbers);

if(window.matchMedia('(pointer:fine)').matches&&ring&&dot){window.addEventListener('mousemove',e=>{dot.style.left=e.clientX+'px';dot.style.top=e.clientY+'px';ring.animate({left:e.clientX+'px',top:e.clientY+'px'},{duration:180,fill:'forwards'})});document.querySelectorAll('a,button').forEach(el=>{el.addEventListener('mouseenter',()=>ring.classList.add('hover'));el.addEventListener('mouseleave',()=>ring.classList.remove('hover'))})}

const reveal=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.animate([{opacity:0,transform:'translateY(30px)'},{opacity:1,transform:'translateY(0)'}],{duration:760,easing:'cubic-bezier(.2,.72,.18,1)',fill:'both'});reveal.unobserve(entry.target)}})},{threshold:.12});document.querySelectorAll('.metrics article,.comparison-card,.service-grid article,.testimonial-grid article,.numbers article').forEach(el=>reveal.observe(el));

// Scroll depth: bridge appears to come toward the viewer while content moves at different speeds.
let raf=false;const updateMotion=()=>{raf=false;const y=window.scrollY;const vh=Math.max(window.innerHeight,1);const world=document.querySelector('.bridge-tunnel__world');if(world){world.style.setProperty('--tunnel-y',`${(y*.085)%160}px`);world.style.transform=`translate(-50%,-50%) rotateX(68deg) translateY(${(y*.085)%160}px) translateZ(${Math.min(y*.025,85)}px)`}sections.forEach(section=>{const r=section.getBoundingClientRect();const progress=Math.max(-1,Math.min(1,(vh*.55-r.top)/vh));section.style.setProperty('--eyebrow-y',`${progress*-10}px`);section.style.setProperty('--heading-y',`${progress*-18}px`);section.style.setProperty('--hero-y',`${progress*-12}px`);section.style.setProperty('--art-y',`${progress*28}px`);section.style.setProperty('--art-scale',String(1+Math.max(0,progress)*.025));const wipe=section.querySelector('.section-wipe');if(wipe)wipe.style.setProperty('--wipe',String(Math.max(0,Math.min(1,(vh-r.top)/(vh*.9)))))});};
window.addEventListener('scroll',()=>{if(!raf){raf=true;requestAnimationFrame(updateMotion)}},{passive:true});window.addEventListener('resize',updateMotion);updateMotion();
