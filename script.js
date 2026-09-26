const brandMark=`<g aria-label="BR"><text x="18" y="68" fill="#ffffff" font-family="Space Grotesk,Arial,sans-serif" font-size="68" font-weight="700" letter-spacing="-8">B</text><text x="78" y="68" fill="#20e8a8" font-family="Space Grotesk,Arial,sans-serif" font-size="68" font-weight="700" letter-spacing="-8">R</text><path d="M18 80h132M44 76c23-25 52-25 76 0M56 73V54M70 73V43M84 73V36M98 73V43M112 73V54" fill="none" stroke="#20e8a8" stroke-width="2.6" stroke-linecap="round" opacity=".95"/></g>`;
document.querySelectorAll('.br-symbol').forEach(svg=>{svg.innerHTML=brandMark;});

const loader=document.getElementById('loader');
window.addEventListener('load',()=>setTimeout(()=>loader?.classList.add('done'),1800));
setTimeout(()=>loader?.classList.add('done'),3200);

const header=document.querySelector('.site-header');
const nav=document.querySelector('.site-header nav');
const menu=document.querySelector('.menu-toggle');
const progress=document.querySelector('.scroll-progress span');
const panels=[...document.querySelectorAll('.panel')];
const journeyButtons=[...document.querySelectorAll('.journey button')];
const journeyLabel=document.querySelector('.journey-label');

function updateScrollUI(){
  header?.classList.toggle('scrolled',scrollY>24);
  const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);
  if(progress)progress.style.width=(scrollY/max*100)+'%';
}
addEventListener('scroll',updateScrollUI,{passive:true});updateScrollUI();

menu?.addEventListener('click',()=>{const open=nav?.classList.toggle('open');menu.setAttribute('aria-expanded',String(!!open));});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu?.setAttribute('aria-expanded','false');}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav?.classList.remove('open');menu?.setAttribute('aria-expanded','false');}});

function goTo(id){document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'});}
document.querySelectorAll('[data-go]').forEach(el=>el.addEventListener('click',()=>goTo(el.dataset.go)));

const sectionObs=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  const id=entry.target.id;
  const idx=panels.indexOf(entry.target);
  if(journeyLabel)journeyLabel.textContent=entry.target.dataset.section||'';
  journeyButtons.forEach((b,i)=>b.classList.toggle('active',i===idx));
  document.querySelectorAll('.site-header nav a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+id));
}),{threshold:.42});
panels.forEach(p=>sectionObs.observe(p));

const revealObs=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  entry.target.animate([{opacity:0,transform:'translateY(34px)'},{opacity:1,transform:'translateY(0)'}],{duration:760,easing:'cubic-bezier(.2,.75,.2,1)',fill:'both'});
  revealObs.unobserve(entry.target);
}),{threshold:.15});
document.querySelectorAll('.reveal-group,.metric-card,.service-experience,.data-wall,.testimonial-experience').forEach(el=>revealObs.observe(el));

const metricCards=[...document.querySelectorAll('.metric-card')];
metricCards.forEach(card=>['mouseenter','focus'].forEach(evt=>card.addEventListener(evt,()=>metricCards.forEach(c=>c.classList.toggle('active',c===card)))));

const services=[
  {n:'01',title:'MÍDIA PAGA DE ALTO VALOR',text:'Google Ads e Meta Ads para alcançar proprietários de imóveis nos EUA que já estão procurando serviços.',tags:['INTENÇÃO','LOCAL','QUALIFICAÇÃO']},
  {n:'02',title:'PLATAFORMAS WEB DE ELITE',text:'Sites rápidos, modernos e bilíngues, criados para converter atenção em pedidos de orçamento.',tags:['VELOCIDADE','CONVERSÃO','BILÍNGUE']},
  {n:'03',title:'MOTOR DE VENDAS E CRM',text:'Atendimento, follow-up e automação para reduzir oportunidades perdidas.',tags:['FOLLOW-UP','AUTOMAÇÃO','CRM']}
];
const tabs=[...document.querySelectorAll('.service-tab')];
const screen=document.querySelector('.service-screen');
function renderService(i){
  const s=services[i];
  tabs.forEach((t,n)=>t.classList.toggle('active',n===i));
  if(!screen)return;
  screen.animate([{opacity:.45,transform:'translateY(10px)'},{opacity:1,transform:'none'}],{duration:360,easing:'ease-out'});
  screen.querySelector('.service-number').textContent=s.n;
  screen.querySelector('h3').textContent=s.title;
  screen.querySelector('p').textContent=s.text;
  screen.querySelector('.service-tags').innerHTML=s.tags.map(t=>`<span>${t}</span>`).join('');
}
tabs.forEach((tab,i)=>tab.addEventListener('click',()=>renderService(i)));

let testimonialIndex=0;
const testimonialCards=[...document.querySelectorAll('.testimonial-card')];
const testimonialDots=[...document.querySelectorAll('.testimonial-dots i')];
function setTestimonial(i){
  testimonialIndex=(i+testimonialCards.length)%testimonialCards.length;
  testimonialCards.forEach((c,n)=>c.classList.toggle('active',n===testimonialIndex));
  testimonialDots.forEach((d,n)=>d.classList.toggle('active',n===testimonialIndex));
}
document.querySelector('[data-testimonial="prev"]')?.addEventListener('click',()=>setTestimonial(testimonialIndex-1));
document.querySelector('[data-testimonial="next"]')?.addEventListener('click',()=>setTestimonial(testimonialIndex+1));
let testimonialTimer=setInterval(()=>setTestimonial(testimonialIndex+1),6500);
document.querySelector('.testimonial-experience')?.addEventListener('mouseenter',()=>clearInterval(testimonialTimer));

const counterObs=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  const el=entry.target,target=+el.dataset.count,start=performance.now(),duration=1000;
  const tick=now=>{const p=Math.min((now-start)/duration,1);el.textContent=Math.round(target*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(tick)};requestAnimationFrame(tick);counterObs.unobserve(el);
}),{threshold:.55});document.querySelectorAll('[data-count]').forEach(el=>counterObs.observe(el));

const dot=document.querySelector('.cursor-dot'),ring=document.querySelector('.cursor-ring'),emblem=document.querySelector('.hero-emblem');
let mouseX=.5,mouseY=.5;
addEventListener('mousemove',e=>{
  mouseX=e.clientX/innerWidth;mouseY=e.clientY/innerHeight;
  document.documentElement.style.setProperty('--mx',(mouseX*100)+'%');
  document.documentElement.style.setProperty('--my',(mouseY*100)+'%');
  if(emblem){emblem.style.setProperty('--emblem-rx',((.5-mouseY)*6)+'deg');emblem.style.setProperty('--emblem-ry',((mouseX-.5)*9)+'deg');}
  if(dot){dot.style.left=e.clientX+'px';dot.style.top=e.clientY+'px'}
  if(ring)ring.animate({left:e.clientX+'px',top:e.clientY+'px'},{duration:160,fill:'forwards'});
});
document.querySelectorAll('a,button,.metric-card').forEach(el=>{el.addEventListener('mouseenter',()=>ring?.classList.add('hover'));el.addEventListener('mouseleave',()=>ring?.classList.remove('hover'));});

if(matchMedia('(pointer:fine)').matches){
  document.querySelectorAll('.magnetic').forEach(el=>{
    el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();const x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;el.style.transform=`translate(${x*.06}px,${y*.08}px)`;});
    el.addEventListener('mouseleave',()=>el.style.transform='');
  });
}

const canvas=document.getElementById('bridgeCanvas'),ctx=canvas?.getContext('2d');let w=0,h=0,dpr=1,travel=0,last=0,lastScroll=scrollY,boost=0;
function resize(){if(!canvas||!ctx)return;dpr=Math.min(devicePixelRatio||1,2);w=innerWidth;h=innerHeight;canvas.width=w*dpr;canvas.height=h*dpr;canvas.style.width=w+'px';canvas.style.height=h+'px';ctx.setTransform(dpr,0,0,dpr,0,0)}resize();addEventListener('resize',resize);
addEventListener('scroll',()=>{const d=Math.abs(scrollY-lastScroll);lastScroll=scrollY;boost=Math.min(1.5,boost+d*.00022)},{passive:true});
function line(x1,y1,x2,y2,a=.14,width=1,color='70,255,195'){ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.strokeStyle=`rgba(${color},${a})`;ctx.lineWidth=width;ctx.stroke()}
function drawBridge(ts){
  if(!ctx)return;if(!last)last=ts;const dt=Math.min(36,ts-last);last=ts;travel=(travel+dt*(.00014+boost*.0011))%1;boost*=.95;ctx.clearRect(0,0,w,h);
  const vx=w/2+(mouseX-.5)*w*.075,vy=h*.34+(mouseY-.5)*h*.035,bottom=h*1.05,halfBottom=w*.34,halfTop=w*.018;
  const radial=ctx.createRadialGradient(vx,vy,0,vx,vy,h*.62);radial.addColorStop(0,'rgba(90,255,210,.10)');radial.addColorStop(.35,'rgba(25,180,125,.035)');radial.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=radial;ctx.fillRect(0,0,w,h);
  [-1,-.66,-.33,0,.33,.66,1].forEach((lane,i)=>line(vx+lane*halfTop,vy,vx+lane*halfBottom,bottom,i===3?.18:.075,i===3?1.3:.85,'90,255,210'));
  for(let i=0;i<30;i++){
    const p=((i/30)+travel)%1,z=Math.pow(p,2.35),y=vy+z*(bottom-vy),hw=halfTop+z*(halfBottom-halfTop),outer=hw*1.42,arch=(1-z)*h*.22+h*.018,a=.025+z*.18;
    line(vx-hw,y,vx+hw,y,a*.35,.8,'65,245,180');line(vx-outer,y,vx-hw,y-arch,a,1.05,'110,255,220');line(vx+outer,y,vx+hw,y-arch,a,1.05,'110,255,220');line(vx-hw,y-arch,vx+hw,y-arch,a*.85,1,'110,255,220');
  }
  ctx.fillStyle='rgba(0,6,4,.18)';ctx.fillRect(0,0,w,h);requestAnimationFrame(drawBridge);
}requestAnimationFrame(drawBridge);
