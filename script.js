const refinement=document.createElement('link');refinement.rel='stylesheet';refinement.href='mobile-refinement.css?v=2';document.head.appendChild(refinement);

const header=document.querySelector('.site-header');const menu=document.querySelector('.menu-toggle');const nav=document.querySelector('.desktop-nav');const dots=[...document.querySelectorAll('.section-indicator i')];const label=document.querySelector('.section-indicator span');const sections=[...document.querySelectorAll('.panel')];const counters=[...document.querySelectorAll('[data-count]')];const ring=document.querySelector('.cursor--ring');const dot=document.querySelector('.cursor--dot');

window.addEventListener('scroll',()=>{header?.classList.toggle('scrolled',window.scrollY>24)});

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

const reveal=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.animate([{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,easing:'cubic-bezier(.2,.7,.2,1)',fill:'both'});reveal.unobserve(entry.target)}})},{threshold:.12});document.querySelectorAll('.metrics article,.comparison-card,.service-grid article,.testimonial-grid article,.numbers article').forEach(el=>reveal.observe(el));
