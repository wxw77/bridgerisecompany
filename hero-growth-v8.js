document.addEventListener('DOMContentLoaded',()=>{
  const hero=document.querySelector('.hero-system');
  if(!hero||hero.querySelector('.hero-growth')) return;
  const growth=document.createElement('div');
  growth.className='hero-growth';
  growth.setAttribute('aria-hidden','true');
  growth.innerHTML=`<div class="hero-growth-shell">
    <div class="hero-growth-glow"></div>
    <div class="hg-flowline l1"></div><div class="hg-flowline l2"></div><div class="hg-flowline l3"></div>
    <div class="hg-node ads">TRÁFEGO PAGO<small>GOOGLE + META</small></div>
    <div class="hg-node clients">CLIENTES<small>INTENÇÃO REAL</small></div>
    <div class="hg-node sales">VENDAS<small>ORÇAMENTO → CONTRATO</small></div>
    <div class="hg-bridge"><div class="hg-arch"></div><div class="hg-deck"></div><div class="hg-tower"></div><div class="hg-cable c1"></div><div class="hg-cable c2"></div><div class="hg-cable c3"></div><div class="hg-cable c4"></div></div>
    <div class="hg-br"><img src="bridge-rise-mark-v6.svg" alt=""></div>
    <div class="hg-kicker">TRÁFEGO → CONEXÃO → CLIENTES → VENDAS</div>
  </div>`;
  hero.appendChild(growth);
});
