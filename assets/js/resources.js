/* Builds the booklet menu, mobile drawer, per-sector documents, resource library and video player
   from window.NUFLOW_RESOURCES. Runs before the main page script so new .reveal items animate in. */
(function(){
  const R=window.NUFLOW_RESOURCES; if(!R) return;
  const $=id=>document.getElementById(id);
  const SECTOR_KEYS=Object.keys(R.sectors);
  const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const viewUrl=id=>'https://drive.google.com/file/d/'+id+'/view';
  const dlUrl=id=>'https://drive.google.com/uc?export=download&id='+id;
  const thumbUrl=(id,w)=>'https://drive.google.com/thumbnail?id='+id+'&sz=w'+w;
  const size=mb=>mb<1?Math.round(mb*1000)+' KB':(mb<10?mb.toFixed(1):Math.round(mb))+' MB';
  const inSector=(item,s)=>!s||s==='all'||item.sector===s||(item.sectors||[]).indexOf(s)>=0;

  const ICON={
    view:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
    dl:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M5 21h14"/></svg>',
    play:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>',
    doc:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" aria-hidden="true"><path d="M14 3H6v18h12V7z"/><path d="M14 3v4h4M9 12h6M9 16h6"/></svg>'
  };
  function actions(d,label){
    const n=esc(label||d.title);
    return '<div class="doc-actions">'+
      '<a class="btn-sm" href="'+viewUrl(d.id)+'" target="_blank" rel="noopener" aria-label="View '+n+'">'+ICON.view+'View</a>'+
      '<a class="btn-sm ghost" href="'+dlUrl(d.id)+'" target="_blank" rel="noopener" aria-label="Download '+n+' ('+size(d.mb)+')">'+ICON.dl+'<span class="lbl">Download</span> <small>'+size(d.mb)+'</small></a>'+
    '</div>';
  }
  function bookletRow(b){
    return '<div class="menu-doc"><div><b>'+esc(R.sectors[b.sector])+'</b><small>PDF · '+size(b.mb)+'</small></div>'+actions(b)+'</div>';
  }
  function bookletCard(b,cls){
    return '<div class="booklet '+(cls||'')+'"><div class="booklet-cover"><img loading="lazy" referrerpolicy="no-referrer" src="'+thumbUrl(b.id,400)+'" alt="" onerror="this.remove()">'+ICON.doc+'</div>'+
      '<div class="booklet-body"><span class="kicker">Sector booklet</span><h4>'+esc(b.title)+'</h4><p>PDF · '+size(b.mb)+'</p>'+actions(b)+'</div></div>';
  }
  function tdsList(items){
    const groups=[];
    items.forEach(t=>{let g=groups.find(x=>x.system===t.system);if(!g){g={system:t.system,items:[]};groups.push(g);}g.items.push(t);});
    return '<div class="tds-list">'+groups.map(g=>'<div class="tds-group"><span class="tds-sys">'+esc(g.system)+'</span>'+
      g.items.map(t=>'<div class="doc-row"><span class="doc-name">'+esc(t.title)+'</span>'+actions(t,t.title+' data sheet')+'</div>').join('')+
    '</div>').join('')+'</div>';
  }
  function caseCard(c,cls){
    return '<div class="case '+(cls||'')+'"><div class="case-img"><img loading="lazy" referrerpolicy="no-referrer" src="'+thumbUrl(c.id,600)+'" alt="" onerror="this.remove()"><span class="case-tag">'+esc(c.system)+'</span></div>'+
      '<div class="case-body"><span class="kicker">Case study · PDF</span><h4>'+esc(c.title)+'</h4>'+actions(c,c.title+' case study')+'</div></div>';
  }
  function videoCard(v,cls){
    return '<div class="case video '+(cls||'')+'"><button class="case-img" type="button" data-yt="'+esc(v.yt)+'" data-title="'+esc(v.title)+'" aria-label="Play video: '+esc(v.title)+'">'+
      '<img loading="lazy" src="https://i.ytimg.com/vi/'+esc(v.yt)+'/hqdefault.jpg" alt=""><span class="play">'+ICON.play+'</span><span class="case-tag">Video</span></button>'+
      '<div class="case-body"><span class="kicker">Case study · Video</span><h4>'+esc(v.title)+'</h4><div class="doc-actions">'+
      '<button class="btn-sm" type="button" data-yt="'+esc(v.yt)+'" data-title="'+esc(v.title)+'">'+ICON.play+'Watch</button>'+
      '<a class="btn-sm ghost" href="https://www.youtube.com/watch?v='+esc(v.yt)+'" target="_blank" rel="noopener">YouTube</a></div></div></div>';
  }

  /* ---- top menu: booklets dropdown ---- */
  const menu=$('bookletMenu'), menuBtn=$('bookletBtn');
  if(menu&&menuBtn){
    menu.innerHTML='<span class="menu-title">Sector booklets</span>'+R.booklets.map(bookletRow).join('')+
      '<a class="menu-more" href="#resources">All resources: data sheets, case studies and videos</a>';
    const setOpen=o=>{menu.classList.toggle('open',o);menuBtn.setAttribute('aria-expanded',o?'true':'false');};
    menuBtn.addEventListener('click',e=>{e.stopPropagation();setOpen(!menu.classList.contains('open'));});
    menu.addEventListener('click',e=>{if(e.target.closest('a'))setOpen(false);e.stopPropagation();});
    document.addEventListener('click',()=>setOpen(false));
    document.addEventListener('keydown',e=>{if(e.key==='Escape')setOpen(false);});
  }

  /* ---- mobile drawer ---- */
  const drawer=$('drawer'), burger=$('navBurger'), scrim=$('drawerScrim');
  function lenisStop(){try{window.__lenis&&window.__lenis.stop();}catch(e){}}
  function lenisStart(){try{window.__lenis&&window.__lenis.start();}catch(e){}}
  function setDrawer(o){
    if(!drawer)return;
    drawer.classList.toggle('open',o);scrim.classList.toggle('open',o);
    drawer.setAttribute('aria-hidden',o?'false':'true');burger.setAttribute('aria-expanded',o?'true':'false');
    document.documentElement.classList.toggle('drawer-lock',o);
    if(o){lenisStop();const f=drawer.querySelector('a,button');f&&f.focus();}else{lenisStart();}
  }
  if(drawer&&burger){
    $('drawerBooklets').innerHTML=R.booklets.map(bookletRow).join('');
    burger.addEventListener('click',()=>setDrawer(!drawer.classList.contains('open')));
    $('drawerClose').addEventListener('click',()=>{setDrawer(false);burger.focus();});
    scrim.addEventListener('click',()=>setDrawer(false));
    /* runs before the page's own anchor handler, so scrolling resumes before it scrolls */
    drawer.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>setDrawer(false)));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&drawer.classList.contains('open'))setDrawer(false);});
    addEventListener('resize',()=>{if(innerWidth>860&&drawer.classList.contains('open'))setDrawer(false);});
  }

  /* ---- per-sector documents ---- */
  const SHOW=6;
  document.querySelectorAll('.res-sector[data-sector]').forEach(box=>{
    const s=box.dataset.sector;
    const b=R.booklets.find(x=>x.sector===s);
    const tds=R.tds.filter(t=>inSector(t,s));
    const vids=R.videos.filter(v=>inSector(v,s));
    const cases=R.cases.filter(c=>inSector(c,s));
    let h='';
    if(b) h+='<h3 class="s-subhead reveal">Download the booklet</h3>'+bookletCard(b,'reveal');
    if(tds.length) h+='<h3 class="s-subhead reveal">Technical data sheets</h3><div class="reveal">'+tdsList(tds)+'</div>';
    const cards=vids.length+cases.length;
    if(cards){
      h+='<h3 class="s-subhead reveal">Case studies</h3><div class="case-grid">';
      let i=0;
      vids.forEach(v=>{h+=videoCard(v,'reveal'+(i++>=SHOW?' extra':''));});
      cases.forEach(c=>{h+=caseCard(c,'reveal'+(i++>=SHOW?' extra':''));});
      h+='</div>';
      if(cards>SHOW) h+='<button class="btn-ghost show-more reveal" type="button" aria-expanded="false">Show all '+cards+' case studies</button>';
    }
    box.innerHTML=h;
    const more=box.querySelector('.show-more');
    if(more) more.addEventListener('click',()=>{
      const open=box.classList.toggle('show-all');
      more.setAttribute('aria-expanded',open?'true':'false');
      more.textContent=open?'Show fewer case studies':'Show all '+cards+' case studies';
      try{window.ScrollTrigger&&ScrollTrigger.refresh();}catch(e){}
    });
  });

  /* ---- resource library ---- */
  const lib=$('libBody');
  if(lib){
    let tab='booklets', sec='all';
    const tabs=[...document.querySelectorAll('.lib-tab')], fil=[...document.querySelectorAll('.lib-chip')];
    function render(){
      let h='';
      if(tab==='booklets'){
        const list=R.booklets.filter(b=>inSector(b,sec));
        h='<div class="booklet-grid">'+list.map(b=>bookletCard(b)).join('')+'</div>';
      }else if(tab==='tds'){
        h=tdsList(R.tds.filter(t=>inSector(t,sec)));
      }else if(tab==='cases'){
        const list=R.cases.filter(c=>inSector(c,sec));
        h='<div class="case-grid">'+list.map(c=>caseCard(c)).join('')+'</div>';
      }else{
        const list=R.videos.filter(v=>inSector(v,sec));
        h='<div class="case-grid">'+list.map(v=>videoCard(v)).join('')+'</div>'+
          '<p class="lib-note">More videos on <a href="https://www.youtube.com/@NuflowAustralasia" target="_blank" rel="noopener">youtube.com/@NuflowAustralasia</a></p>';
      }
      lib.innerHTML=h||'<p class="lib-note">Nothing in this category yet.</p>';
      try{window.ScrollTrigger&&ScrollTrigger.refresh();}catch(e){}
    }
    tabs.forEach(t=>t.addEventListener('click',()=>{tab=t.dataset.tab;tabs.forEach(x=>x.setAttribute('aria-selected',x===t?'true':'false'));render();}));
    fil.forEach(f=>f.addEventListener('click',()=>{sec=f.dataset.sec;fil.forEach(x=>x.setAttribute('aria-pressed',x===f?'true':'false'));render();}));
    /* links with data-lib-tab (e.g. the footer) open the library on that tab */
    document.querySelectorAll('[data-lib-tab]').forEach(a=>a.addEventListener('click',()=>{
      const t=tabs.find(x=>x.dataset.tab===a.dataset.libTab); if(t) t.click();
    }));
    render();
  }

  /* ---- video player ---- */
  const vm=$('videoModal'), vf=$('videoFrame'), vt=$('videoTitle');
  let lastFocus=null;
  function openVideo(id,title){
    lastFocus=document.activeElement;
    vf.src='https://www.youtube-nocookie.com/embed/'+encodeURIComponent(id)+'?autoplay=1&rel=0';
    vt.textContent=title||'';
    $('videoYT').href='https://www.youtube.com/watch?v='+encodeURIComponent(id);
    vm.classList.add('open');vm.setAttribute('aria-hidden','false');lenisStop();
    $('videoClose').focus();
  }
  function closeVideo(){
    if(!vm.classList.contains('open'))return;
    vm.classList.remove('open');vm.setAttribute('aria-hidden','true');vf.src='about:blank';lenisStart();
    lastFocus&&lastFocus.focus&&lastFocus.focus();
  }
  if(vm){
    document.addEventListener('click',e=>{const b=e.target.closest('[data-yt]');if(b){e.preventDefault();openVideo(b.dataset.yt,b.dataset.title);}});
    $('videoClose').addEventListener('click',closeVideo);
    vm.addEventListener('click',e=>{if(e.target===vm)closeVideo();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape')closeVideo();});
  }

  /* ---- touch devices have no hover: reword the hero hint ---- */
  if(matchMedia('(hover: none)').matches){
    const ht=document.querySelector('.hint-txt'); if(ht) ht.textContent='Tap an industry to descend';
  }
})();
