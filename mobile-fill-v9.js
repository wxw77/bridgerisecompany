document.addEventListener('DOMContentLoaded',()=>{
  const difference=document.querySelector('.difference .panel-inner');
  if(difference&&!difference.querySelector('.mobile-extra-difference')){
    const block=document.createElement('div');
    block.className='mobile-extra mobile-extra-difference';
    block.innerHTML=`<div class="mobile-extra-label">DA ATENÇÃO AO CONTRATO</div>
      <div class="mobile-extra-flow">
        <div class="mobile-extra-step"><span>01</span><b>ATRAIR</b><small>tráfego com intenção real</small></div>
        <i></i>
        <div class="mobile-extra-step"><span>02</span><b>CONVERTER</b><small>site + resposta rápida</small></div>
        <i></i>
        <div class="mobile-extra-step"><span>03</span><b>FECHAR</b><small>follow-up até o contrato</small></div>
      </div>`;
    difference.appendChild(block);
  }

  const services=document.querySelector('.services .panel-inner');
  if(services&&!services.querySelector('.mobile-extra-services')){
    const block=document.createElement('div');
    block.className='mobile-extra mobile-extra-services';
    block.innerHTML=`<div class="mobile-extra-label">UM SISTEMA. NÃO SERVIÇOS SOLTOS.</div>
      <div class="mobile-system-map">
        <div class="ms-node"><span>ADS</span><small>gera demanda</small></div>
        <i></i>
        <div class="ms-node"><span>WEB</span><small>gera confiança</small></div>
        <i></i>
        <div class="ms-node"><span>CRM</span><small>gera follow-up</small></div>
        <i></i>
        <div class="ms-node hot"><span>VENDA</span><small>vira contrato</small></div>
      </div>`;
    services.appendChild(block);
  }
});
