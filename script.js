(function(){
  // Entrance animation
  var nameEl=document.getElementById('introName');
  'JAYASHREE P.'.split('').forEach(function(ch,i){
    var s=document.createElement('span');
    s.textContent=ch===' '?'\u00A0':ch;
    if(ch==='P'||ch==='.')s.className='y';
    s.style.animationDelay=(0.15+i*0.07)+'s';
    nameEl.appendChild(s);
  });
  var intro=document.getElementById('intro');
  window.addEventListener('load',function(){
    setTimeout(function(){
      intro.classList.add('open');
      document.body.classList.remove('locked');
      setTimeout(function(){document.body.classList.add('ready')},350);
      setTimeout(function(){intro.style.display='none'},1300);
    },2600);
  });

  // Header scroll state
  var header=document.getElementById('header');
  function onScroll(){header.classList.toggle('scrolled',window.scrollY>40)}
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();

  // Mobile menu
  var burger=document.getElementById('burger'),nav=document.getElementById('nav');
  burger.addEventListener('click',function(){
    burger.classList.toggle('on');nav.classList.toggle('open');
  });
  nav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click',function(){burger.classList.remove('on');nav.classList.remove('open')});
  });

  // Reveal on scroll
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}});
  },{threshold:.15});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el)});

  // Active nav link
  var links=nav.querySelectorAll('a');
  var secs=['home','about','skills','roadmap','projects','contact'].map(function(id){return document.getElementById(id)});
  var so=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        links.forEach(function(l){l.classList.toggle('active',l.getAttribute('href')==='#'+e.target.id)});
      }
    });
  },{rootMargin:'-40% 0px -55% 0px',threshold:0});
  secs.forEach(function(s){so.observe(s)});

  // Portrait fallback
  var img=document.getElementById('portraitImg'),box=document.getElementById('portrait');
  img.addEventListener('error',function(){img.style.display='none';box.classList.add('empty')});

  // Cursor-following highlights
  function trackCursor(sel){
    document.querySelectorAll(sel).forEach(function(el){
      el.addEventListener('mousemove',function(e){
        var r=el.getBoundingClientRect();
        el.style.setProperty('--mx',(e.clientX-r.left)+'px');
        el.style.setProperty('--my',(e.clientY-r.top)+'px');
      });
    });
  }
  trackCursor('.skill');
  trackCursor('.project');
  trackCursor('.c-row');

  // Roadmap: progress line + active stages
  var tl=document.getElementById('timeline'),fill=document.getElementById('trackFill');
  function updateTrack(){
    var r=tl.getBoundingClientRect(),mid=window.innerHeight*0.55;
    var p=Math.max(0,Math.min(1,(mid-r.top)/r.height));
    fill.style.height=(p*100)+'%';
  }
  window.addEventListener('scroll',updateTrack,{passive:true});
  window.addEventListener('resize',updateTrack);
  updateTrack();
  var stageObs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){if(e.isIntersecting)e.target.classList.add('active')});
  },{rootMargin:'-45% 0px -45% 0px',threshold:0});
  document.querySelectorAll('.stage').forEach(function(s){stageObs.observe(s)});

  // Copy email
  var copyBtn=document.getElementById('copyEmail'),copyMsg=document.getElementById('copyMsg');
  var copyTimer;
  function copyDone(ok){
    copyMsg.textContent=ok?'Email address copied.':'Couldn’t copy. Please select the address manually.';
    clearTimeout(copyTimer);
    copyTimer=setTimeout(function(){copyMsg.textContent=''},3000);
  }
  copyBtn.addEventListener('click',function(){
    var email='sshree1106@gmail.com';
    if(navigator.clipboard&&window.isSecureContext){
      navigator.clipboard.writeText(email).then(function(){copyDone(true)},function(){copyDone(false)});
    }else{
      var t=document.createElement('textarea');
      t.value=email;t.setAttribute('readonly','');t.style.position='fixed';t.style.opacity='0';
      document.body.appendChild(t);t.select();
      var ok=false;
      try{ok=document.execCommand('copy')}catch(err){}
      document.body.removeChild(t);
      copyDone(ok);
    }
  });

  // Rotating identity words
  var rw=document.querySelectorAll('#rotWords span'),ri=0;
  if(rw.length>1){
    setInterval(function(){
      var cur=rw[ri];cur.classList.remove('on');cur.classList.add('out');
      ri=(ri+1)%rw.length;
      rw[ri].classList.remove('out');rw[ri].classList.add('on');
      setTimeout(function(){cur.classList.remove('out')},900);
    },2600);
  }

  // Identity rows reveal
  var idObs=new IntersectionObserver(function(en){
    en.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');idObs.unobserve(e.target)}});
  },{threshold:.4});
  document.querySelectorAll('.id-row').forEach(function(r){idObs.observe(r)});

  // Footer year
  document.getElementById('year').textContent=new Date().getFullYear();
})();
