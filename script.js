const loader=document.getElementById('loader');
window.addEventListener('load',()=>setTimeout(()=>loader?.classList.add('done'),1900));
setTimeout(()=>loader?.classList.add('done'),3200);

const header=document.querySelector('.site-header');const nav=document.querySelector('.site-header nav');const menu=document.querySelector('.menu-toggle');
window.addEventListener('scroll',()=>header?.classList.toggle('scrolled',scrollY>20));
menu?.addEventListener('click',()=>nav?.classList.toggle('open'));nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const sections=[...document.querySelectorAll('.panel')], label=document.querySelector('.section-indicator span'), ticks=[...document.querySelectorAll('.section-indicator i')];
const sectionObs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const i=sections.indexOf(e.target);if(label)label.textContent=e.target.dataset.section||'';ticks.forEach((t,n)=>t.classList.toggle('active',n===Math.min(i,ticks.length-1)))}}),{threshold:.42});sections.forEach(s=>sectionObs.observe(s));

const reveal=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.animate([{opacity:0,transform:'translateY(40px)'},{opacity:1,transform:'translateY(0)'}],{duration:850,easing:'cubic-bezier(.16,.8,.2,1)',fill:'both'});reveal.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.metrics article,.service-grid article,.numbers article,.testimonial-grid article').forEach(el=>reveal.observe(el));

const core=document.querySelector('.hero-logo-core');const dot=document.querySelector('.cursor-dot'),ring=document.querySelector('.cursor-ring');let mouseX=.5,mouseY=.5;
window.addEventListener('mousemove',e=>{mouseX=e.clientX/innerWidth;mouseY=e.clientY/innerHeight;document.documentElement.style.setProperty('--mx',(mouseX*100)+'%');document.documentElement.style.setProperty('--my',(mouseY*100)+'%');if(core){const rx=(.5-mouseY)*15,ry=(mouseX-.5)*20;core.style.transform=`rotateX(${rx}deg) rotateY(${ry}deg) translateZ(22px)`}if(dot){dot.style.left=e.clientX+'px';dot.style.top=e.clientY+'px'}if(ring)ring.animate({left:e.clientX+'px',top:e.clientY+'px'},{duration:180,fill:'forwards'})});document.querySelectorAll('a,button').forEach(el=>{el.addEventListener('mouseenter',()=>ring?.classList.add('hover'));el.addEventListener('mouseleave',()=>ring?.classList.remove('hover'))});

const canvas=document.getElementById('bridgeCanvas'),ctx=canvas?.getContext('2d');let w=0,h=0,dpr=1,scrollPhase=0;
function resize(){if(!canvas||!ctx)return;dpr=Math.min(devicePixelRatio||1,2);w=innerWidth;h=innerHeight;canvas.width=w*dpr;canvas.height=h*dpr;canvas.style.width=w+'px';canvas.style.height=h+'px';ctx.setTransform(dpr,0,0,dpr,0,0)}resize();addEventListener('resize',resize);
addEventListener('scroll',()=>{scrollPhase=scrollY*.0025},{passive:true});
function line(x1,y1,x2,y2,a=.12,width=1){ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.strokeStyle=`rgba(20,215,155,${a})`;ctx.lineWidth=width;ctx.stroke()}
function drawBridge(t){if(!ctx)return;ctx.clearRect(0,0,w,h);const cx=w/2+(mouseX-.5)*45,cy=h*.48+(mouseY-.5)*22;const horizonY=cy;const speed=t*.00022+scrollPhase;const rings=26;for(let i=0;i<rings;i++){const p=((i/rings+speed)%1);const z=Math.pow(p,2.25);const bw=70+z*w*.9,bh=24+z*h*.68,alpha=.035+z*.22;const y=horizonY+(z-.05)*h*.18;ctx.strokeStyle=`rgba(16,207,149,${alpha})`;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(cx-bw,y+bh*.45);ctx.lineTo(cx-bw*.78,y-bh*.35);ctx.lineTo(cx-bw*.42,y-bh*.7);ctx.lineTo(cx+bw*.42,y-bh*.7);ctx.lineTo(cx+bw*.78,y-bh*.35);ctx.lineTo(cx+bw,y+bh*.45);ctx.stroke();if(i%2===0){line(cx-bw,y+bh*.45,cx-bw*.78,y-bh*.35,alpha*.8);line(cx+bw,y+bh*.45,cx+bw*.78,y-bh*.35,alpha*.8)}}for(let j=-4;j<=4;j++){const bx=cx+j*42;line(cx+j*4,horizonY,bx+(mouseX-.5)*70,h,0.09)}ctx.fillStyle='rgba(0,8,6,.30)';ctx.fillRect(0,0,w,h);requestAnimationFrame(drawBridge)}requestAnimationFrame(drawBridge);

let lastY=scrollY;addEventListener('scroll',()=>{const delta=scrollY-lastY;lastY=scrollY;document.querySelectorAll('.panel').forEach((p,i)=>{const r=p.getBoundingClientRect();if(r.bottom>0&&r.top<h){const amt=(r.top-h*.5)*-.018;p.style.setProperty('--drift',amt+'px')}});if(core){const y=Math.max(-80,Math.min(80,scrollY*.04));core.style.marginTop=y+'px'}},{passive:true});