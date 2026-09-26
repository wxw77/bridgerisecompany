document.addEventListener('DOMContentLoaded',()=>{
  const bridgeMarkup=`<div class="bridge-plane"></div><span class="bridge-side left"></span><span class="bridge-side right"></span><span class="bridge-tower left"></span><span class="bridge-tower right"></span><span class="bridge-frame f1"></span><span class="bridge-frame f2"></span><span class="bridge-frame f3"></span><span class="bridge-frame f4"></span><span class="bridge-frame f5"></span><span class="bridge-frame f6"></span><span class="bridge-frame f7"></span>`;
  const hero=document.querySelector('.hero-system');
  if(hero&&!hero.querySelector('.bridge-3d')){const el=document.createElement('div');el.className='bridge-3d';el.innerHTML=bridgeMarkup;hero.prepend(el)}
  const loader=document.getElementById('loader');
  if(loader&&!loader.querySelector('.loader-bridge-3d')){const el=document.createElement('div');el.className='loader-bridge-3d';el.innerHTML=bridgeMarkup;loader.prepend(el)}
});
