document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.bridge-3d,.loader-bridge-3d').forEach(el=>el.remove());
  const markup=`<div class="bridge-shadow"></div><div class="bridge-under"></div><div class="bridge-deck"></div><div class="bridge-pylon"></div><span class="bridge-stay l s1"></span><span class="bridge-stay l s2"></span><span class="bridge-stay l s3"></span><span class="bridge-stay l s4"></span><span class="bridge-stay r s1"></span><span class="bridge-stay r s2"></span><span class="bridge-stay r s3"></span><span class="bridge-stay r s4"></span><div class="bridge-light"></div>`;

  /* Keep the bridge identity in the loader only. The hero now uses the growth engine animation. */
  document.querySelectorAll('.hero-system .bridge-signature').forEach(el=>el.remove());
  const loader=document.getElementById('loader');
  if(loader&&!loader.querySelector('.loader-bridge-signature')){const el=document.createElement('div');el.className='loader-bridge-signature';el.innerHTML=markup;loader.prepend(el)}

  const css=document.createElement('link');
  css.rel='stylesheet';
  css.href='hero-growth-v8.css?v=8';
  document.head.appendChild(css);

  const script=document.createElement('script');
  script.src='hero-growth-v8.js?v=8';
  document.body.appendChild(script);
});
