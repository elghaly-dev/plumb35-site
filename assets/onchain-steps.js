(function(){
  var root=document.getElementById('onchain-list'); if(!root) return;
  var esc=function(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});};
  fetch('steps.json',{cache:'no-store'}).then(function(r){return r.json();}).then(function(d){
    root.innerHTML='';
    var flag=document.createElement('p'); flag.className='oc-flag'; flag.textContent='Sample entries — layout preview.'; root.appendChild(flag);
    (d.steps||[]).forEach(function(s){
      var card=document.createElement('article'); card.className='oc-card';
      var link='';
      if(s.signature){
        var base=s.chain==='Arbitrum'?'https://arbiscan.io/tx/':'https://solscan.io/tx/';
        link='<a class="oc-sig" href="'+base+encodeURIComponent(s.signature)+'" target="_blank" rel="noopener noreferrer">'+esc(s.signature.slice(0,10))+'…</a>';
      } else {
        link='<span class="oc-sig oc-sig--none">no signature (sample)</span>';
      }
      card.innerHTML='<div class="oc-top"><span class="oc-stage oc-stage--'+esc(String(s.stage).toLowerCase())+'">'+esc(s.stage)+'</span>'+
        '<span class="oc-chain">'+esc(s.chain)+'</span><time class="oc-time">'+esc(String(s.time).replace('T',' ').replace('Z',''))+'</time></div>'+
        '<p class="oc-hops">'+ (s.hops||[]).map(esc).join(' <span aria-hidden="true">→</span> ') +'</p>'+
        (s.reason?'<p class="oc-reason">'+esc(s.reason)+'</p>':'')+
        '<div class="oc-foot">'+link+'</div>';
      root.appendChild(card);
    });
  }).catch(function(){ root.innerHTML='<p class="oc-flag">Steps could not be loaded.</p>'; });
})();
