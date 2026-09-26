document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.bridge-3d,.loader-bridge-3d').forEach(el=>el.remove());
  const markup=`<div class="bridge-shadow"></div><div class="bridge-under"></div><div class="bridge-deck"></div><div class="bridge-pylon"></div><span class="bridge-stay l s1"></span><span class="bridge-stay l s2"></span><span class="bridge-stay l s3"></span><span class="bridge-stay l s4"></span><span class="bridge-stay r s1"></span><span class="bridge-stay r s2"></span><span class="bridge-stay r s3"></span><span class="bridge-stay r s4"></span><div class="bridge-light"></div>`;
  const hero=document.querySelector('.hero-system');
  if(hero&&!hero.querySelector('.bridge-signature')){const el=document.createElement('div');el.className='bridge-signature';el.innerHTML=markup;hero.prepend(el)}
  const loader=document.getElementById('loader');
  if(loader&&!loader.querySelector('.loader-bridge-signature')){const el=document.createElement('div');el.className='loader-bridge-signature';el.innerHTML=markup;loader.prepend(el)}
});
