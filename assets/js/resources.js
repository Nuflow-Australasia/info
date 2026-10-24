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
  /* a video is either YouTube ({yt}) or Vimeo ({vimeo, h?, thumb}); h = the private-link hash */
  function videoInfo(v){
    if(v.vimeo) return {
      embed:'https://player.vimeo.com/video/'+encodeURIComponent(v.vimeo)+'?autoplay=1'+(v.h?'&h='+encodeURIComponent(v.h):''),
      link:'https://vimeo.com/'+encodeURIComponent(v.vimeo)+(v.h?'/'+encodeURIComponent(v.h):''),
      thumb:v.thumb||'', site:'Vimeo'};
    return {
      embed:'https://www.youtube-nocookie.com/embed/'+encodeURIComponent(v.yt)+'?autoplay=1&rel=0',
      link:'https://www.youtube.com/watch?v='+encodeURIComponent(v.yt),
      thumb:'https://i.ytimg.com/vi/'+encodeURIComponent(v.yt)+'/hqdefault.jpg', site:'YouTube'};
  }
  function videoCard(v,cls){
    const i=videoInfo(v);
    const play='data-video="'+esc(i.embed)+'" data-link="'+esc(i.link)+'" data-site="'+i.site+'" data-title="'+esc(v.title)+'"';
    return '<div class="case video '+(cls||'')+'"><button class="case-img" type="button" '+play+' aria-label="Play video: '+esc(v.title)+'">'+
      (i.thumb?'<img loading="lazy" src="'+esc(i.thumb)+'" alt="">':'')+'<span class="play">'+ICON.play+'</span><span class="case-tag">'+esc(v.system||'Video')+'</span></button>'+
      '<div class="case-body"><span class="kicker">Video</span><h4>'+esc(v.title)+'</h4><div class="doc-actions">'+
      '<button class="btn-sm" type="button" '+play+'>'+ICON.play+'Watch</button>'+
      '<a class="btn-sm ghost" href="'+esc(i.link)+'" target="_blank" rel="noopener">'+i.site+'</a></div></div></div>';
  }

  /* ---- carousels: on phones, grids become one-row swipe lists with a "2 / 8" counter.
     On wider screens the CSS keeps the grid and hides the controls. ---- */
  const ARROW_L='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>';
  const ARROW_R='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';
  function carousel(track,label){
    if(!track||track.closest('.carousel')) return;
    const wrap=document.createElement('div'); wrap.className='carousel';
    track.parentNode.insertBefore(wrap,track); wrap.appendChild(track);
    track.classList.add('car-track'); track.setAttribute('role','region'); track.setAttribute('aria-label',label); track.tabIndex=0;
    const ctl=document.createElement('div'); ctl.className='car-ctl';
    ctl.innerHTML='<button type="button" class="car-btn" aria-label="Previous">'+ARROW_L+'</button><span class="car-count" aria-live="polite"></span><button type="button" class="car-btn" aria-label="Next">'+ARROW_R+'</button>';
    wrap.appendChild(ctl);
    const [prev,next]=ctl.querySelectorAll('button'), count=ctl.querySelector('.car-count');
    const items=()=>[...track.children].filter(c=>c.offsetParent!==null);
    const step=()=>{const it=items();return it.length>1?it[1].offsetLeft-it[0].offsetLeft:track.clientWidth;};
    function update(){
      const it=items(), n=it.length, s=step()||1;
      const i=Math.min(n-1,Math.max(0,Math.round(track.scrollLeft/s)));
      const atEnd=track.scrollLeft+track.clientWidth>=track.scrollWidth-4;
      count.textContent=(atEnd?n:i+1)+' / '+n;
      prev.disabled=track.scrollLeft<4; next.disabled=atEnd;
      wrap.classList.toggle('single',n<2);
    }
    prev.addEventListener('click',()=>track.scrollBy({left:-step(),behavior:'smooth'}));
    next.addEventListener('click',()=>track.scrollBy({left:step(),behavior:'smooth'}));
    track.addEventListener('scroll',()=>requestAnimationFrame(update),{passive:true});
    addEventListener('resize',update);
    update();
  }
  window.__nuflowCarousel=carousel;

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
    const name=R.sectors[s];
    if(b) h+='<h3 class="s-subhead reveal">Download the booklet</h3>'+bookletCard(b,'reveal');
    if(tds.length) h+='<h3 class="s-subhead reveal">Technical data sheets <span class="s-count">'+tds.length+'</span></h3><div class="reveal">'+tdsList(tds)+'</div>';
    const cards=vids.length+cases.length;
    if(cards){
      h+='<h3 class="s-subhead reveal">Case studies <span class="s-count">'+cards+'</span></h3><div class="case-grid">';
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
    const sec=box.closest('.sector');
    carousel(sec&&sec.querySelector('.asset-grid'),name+': what we rehabilitate');
    carousel(box.querySelector('.tds-list'),name+': technical data sheets');
    carousel(box.querySelector('.case-grid'),name+': case studies');
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
      lib.querySelectorAll('.booklet-grid,.tds-list,.case-grid').forEach(el=>carousel(el,'Resources'));
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
  function openVideo(b){
    lastFocus=document.activeElement;
    vf.src=b.dataset.video;
    vt.textContent=b.dataset.title||'';
    $('videoYT').href=b.dataset.link;
    $('videoYT').textContent='Open in '+(b.dataset.site||'YouTube');
    vm.classList.add('open');vm.setAttribute('aria-hidden','false');lenisStop();
    $('videoClose').focus();
  }
  function closeVideo(){
    if(!vm.classList.contains('open'))return;
    vm.classList.remove('open');vm.setAttribute('aria-hidden','true');vf.src='about:blank';lenisStart();
    lastFocus&&lastFocus.focus&&lastFocus.focus();
  }
  if(vm){
    document.addEventListener('click',e=>{const b=e.target.closest('[data-video]');if(b){e.preventDefault();openVideo(b);}});
    $('videoClose').addEventListener('click',closeVideo);
    vm.addEventListener('click',e=>{if(e.target===vm)closeVideo();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape')closeVideo();});
  }

  /* ---- phones/tablets: sticky bar under the menu showing which sector you are in ---- */
  const bar=$('secbar'), nav=$('nav');
  if(bar&&'IntersectionObserver' in window){
    const pills=[...bar.querySelectorAll('a')];
    const secs=pills.map(a=>document.getElementById(a.dataset.s)).filter(Boolean);
    let current=null;
    const place=()=>{bar.style.top=(nav?nav.offsetHeight:56)+'px';};
    function setActive(id){
      if(id===current) return; current=id;
      bar.classList.toggle('show',!!id);
      pills.forEach(a=>{const on=a.dataset.s===id;a.classList.toggle('active',on);if(on)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});
      const a=pills.find(p=>p.dataset.s===id);
      if(a) bar.scrollTo({left:a.offsetLeft-(bar.clientWidth-a.offsetWidth)/2,behavior:'smooth'});
      place();
    }
    const live=new Set();
    const io=new IntersectionObserver(es=>{
      es.forEach(e=>{if(e.isIntersecting)live.add(e.target.id);else live.delete(e.target.id);});
      const id=secs.map(x=>x.id).find(x=>live.has(x))||null;
      setActive(id);
    },{rootMargin:'-40% 0px -55% 0px'});
    secs.forEach(x=>io.observe(x));
    addEventListener('resize',place); place();
  }

  /* ---- phones: long sector intros show four lines with a Read more toggle ---- */
  document.querySelectorAll('.sector .s-intro').forEach(p=>{
    p.classList.add('clamp');
    const btn=document.createElement('button');
    btn.type='button'; btn.className='read-more reveal'; btn.textContent='Read more'; btn.setAttribute('aria-expanded','false');
    btn.addEventListener('click',()=>{
      const open=p.classList.toggle('open');
      btn.textContent=open?'Show less':'Read more'; btn.setAttribute('aria-expanded',open?'true':'false');
      try{window.ScrollTrigger&&ScrollTrigger.refresh();}catch(e){}
    });
    p.after(btn);
  });

  /* ---- touch devices have no hover: reword the hero hint ---- */
  if(matchMedia('(hover: none)').matches){
    const ht=document.querySelector('.hint-txt'); if(ht) ht.textContent='Tap an industry to descend';
  }
})();
