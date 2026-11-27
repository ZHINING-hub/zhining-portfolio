
(function(){
  var boot=document.getElementById('boot'),load=document.getElementById('load'),ready=false,sfx=true,ac=null;
  function beep(f,d){if(!sfx)return;try{ac=ac||new (window.AudioContext||window.webkitAudioContext)();var o=ac.createOscillator(),g=ac.createGain();o.type='square';o.frequency.value=f;g.gain.value=.04;g.gain.exponentialRampToValueAtTime(.0001,ac.currentTime+d);o.connect(g);g.connect(ac.destination);o.start();o.stop(ac.currentTime+d)}catch(e){}}
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches){setInterval(function(){if(boot.classList.contains('out'))return;var ds=boot.querySelectorAll('.cyber-digit');var d=ds[Math.floor(Math.random()*ds.length)];if(d)d.textContent=d.textContent==='0'?'1':'0'},180)}
   var pct=0,t=setInterval(function(){pct+=Math.random()*9+3;if(pct>=100){pct=100;clearInterval(t);load.style.width='100%';setTimeout(function(){ready=true;boot.classList.add('ready')},180)}else{load.style.width=pct+'%'}},120);
  var hotspots=Array.from(boot.querySelectorAll('.stat-hotspot'));
  function clearStats(){hotspots.forEach(function(h){h.classList.remove('active');h.setAttribute('aria-expanded','false')})}
  function showStat(h){clearStats();h.classList.add('active');h.setAttribute('aria-expanded','true');var r=h.getBoundingClientRect(),tip=h.querySelector('.stat-tip'),w=tip.offsetWidth,ht=tip.offsetHeight;var x=Math.max(12,Math.min(innerWidth-w-12,r.right-w));var y=r.bottom+10;if(r.left>w+24){x=r.left-w-12;y=r.top;}if(y+ht>innerHeight-12)y=r.top-ht-10;h.style.setProperty('--tip-x',x+'px');h.style.setProperty('--tip-y',Math.max(12,y)+'px')}
  hotspots.forEach(function(h){h.addEventListener('pointerenter',function(e){if(e.pointerType==='mouse')showStat(h)});h.addEventListener('pointerleave',function(e){if(e.pointerType==='mouse')clearStats()});h.addEventListener('focus',function(){if(h.matches(':focus-visible'))showStat(h)});h.addEventListener('blur',clearStats);h.addEventListener('click',function(e){e.stopPropagation();showStat(h)})});
  addEventListener('resize',clearStats);
  boot.addEventListener('click', function(e) {if (boot.classList.contains('out')) return;if (!ready || !e.target.closest('.opening-start')) return;beep(520, .1);setTimeout(function() {beep(780, .18);}, 110);boot.classList.add('out');document.body.classList.remove('lock');window.scrollTo(0, 0);});
  document.getElementById('home').onclick=function(){beep(400,.08);boot.classList.remove('out');document.body.classList.add('lock')};
  var b=document.getElementById('snd');b.onclick=function(){sfx=!sfx;b.textContent=sfx?'SFX ON':'SFX OFF';beep(440,.08)};

  var secs=[].slice.call(document.querySelectorAll('section')),dots=document.getElementById('dots'),lv=document.getElementById('lv'),xp=document.getElementById('xp');
  secs.forEach(function(s,i){var a=document.createElement('a');a.href='#'+s.id;a.title=s.dataset.n;a.onclick=function(){beep(600,.06)};dots.appendChild(a)});
  var da=dots.children;
  function upd(){
    var h=document.documentElement,max=h.scrollHeight-innerHeight;xp.style.width=(max>0?scrollY/max*100:0)+'%';
    var cur=0;secs.forEach(function(s,i){if(s.getBoundingClientRect().top<innerHeight*.45)cur=i});
    for(var i=0;i<da.length;i++)da[i].classList.toggle('on',i===cur);
    var txt='STAGE 0'+(cur+1)+' · '+secs[cur].dataset.n.toUpperCase();if(lv.textContent!==txt){lv.textContent=txt}
  }
  addEventListener('scroll',upd,{passive:true});upd();
  var io=new IntersectionObserver(function(es){es.forEach(function(e){e.target.classList.toggle('in',e.isIntersecting)})},{threshold:.15});
  document.querySelectorAll('.rv').forEach(function(el,i){el.style.transitionDelay=((el.dataset.d||(i%5)*.08)*.8)+'s';io.observe(el)});
  var D=[
  {
    "k": "PROJECT 01 · PENTEST",
    "t": "Penetration Testing Report",
    "d": "Did a pentest of a vulnerable Ubuntu machine, from scanning to confirmed exploitation.",
    "module": "Offensive Security Module",
    "b": [
      "Scanned the target with Nessus and manually exploited SQL injection, local file inclusion, stored XSS and privilege escalation through misconfigurations.",
      "Confirmed the actual security impact of each finding rather than relying solely on scanner results.",
      "Documented each step with commands, screenshots and explanations."
    ],
    "tools": [
      "Nessus",
      "Metasploit",
      "Hashcat",
      "Aircrack-ng",
      "John the Ripper"
    ],
    "learn": "Manually validating scanner findings helps establish their actual security impact."
  },
  {
    "k": "PROJECT 02 · EXPLOITATION",
    "t": "EternalBlue (MS17-010) Exploitation",
    "d": "Exploitation of EternalBlue on an isolated Windows lab machine.",
    "module": "Offensive Security Module",
    "b": [
      "Carried out the technical exploitation independently using Metasploit.",
      "Performed post-exploitation to demonstrate what an attacker could access after gaining control.",
      "Provided my teammate with findings, screenshots and remediation steps for the report."
    ],
    "tools": [
      "Metasploit", "OpenVAS"
    ],
    "learn": "An unpatched service can lead to full system compromise, highlighting the importance of timely patching."
  },
  {
    "k": "PROJECT 03 · SYSTEM HARDENING",
    "t": "Securing Windows & Active Directory",
    "d": "Four-person project hardening Windows 10 and Windows Server 2022 using CIS Benchmarks.",
    "module": "Secure Microsoft Windows Module",
    "b": [
      "Applied security controls in VMware: a logon banner, blocked shutdown at sign-in, logon auditing and renaming the default Administrator account.",
      "Configured DNS high availability across two domain controllers.",
      "Documented my DNS configuration, security controls and verification evidence in the group report."
    ],
    "tools": [
      "Windows Server 2022",
      "Windows 10",
      "Active Directory",
      "VMware"
    ],
    "learn": "Security settings and service availability need to be verified after configuration changes."
  },
  {
    "k": "PROJECT 04 · CRYPTOGRAPHY",
    "t": "Secure Chat & 'Seal & Send' File Transfer",
    "d": "Five-person project building an encrypted Python chat and secure file transfer application.",
    "module": "Applied Cryptography Module",
    "b": [
      "Built a secure chat using Diffie-Hellman key exchange, AES-256-CBC encryption, HMAC-SHA256 integrity checks and RSA-2048.",
      "Deployed the file transfer application across two Ubuntu VMs in VMware.",
      "Led the writing of the runbook and report."
    ],
    "tools": [
      "Python",
      "Diffie-Hellman",
      "AES-256-CBC",
      "HMAC-SHA256",
      "RSA-2048"
    ],
    "learn": "Key exchange, encryption and integrity checks serve different purposes in secure communication."
  },
  {
    "k": "PROJECT 05 · AIOT",
    "t": "Face Recognition IoT System",
    "d": "Python and OpenCV system that detects, registers and recognises faces and logs attendance.",
    "module": "AIoT Module",
    "b": [
      "Used pre-trained YuNet and SFace models with OpenCV to detect, register and recognise faces.",
      "Built an attendance logger that records names, dates and times in a CSV without duplicate daily entries.",
      "Studied limitations including lighting, spoofing and false matches, alongside biometric privacy, consent and security."
    ],
    "tools": [
      "Python",
      "OpenCV",
      "YuNet",
      "SFace"
    ],
    "learn": "Recognition reliability and responsible handling of biometric data are important considerations."
  },
  {
    "k": "PROJECT 06 · IOT",
    "t": "Automated Environmental Monitor",
    "d": "Pair project monitoring environmental conditions and responding automatically to sensor readings.",
    "module": "Internet of Things Module",
    "b": [
      "Developed a Python-based system using sensors to monitor environmental conditions.",
      "Implemented automated control based on sensor readings.",
      "Stored all readings in the cloud for remote monitoring and analysis."
    ],
    "tools": [
      "Python",
      "Sensors",
      "Cloud storage"
    ],
    "learn": null
  },
  {
    "k": "PROJECT 07 · WEB DEVELOPMENT",
    "t": "Le Petit Bakery Web Game",
    "d": "Full-stack bakery game with login, shop, timed baking, recipe book and orders.",
    "module": "Backend Web Development Module",
    "b": [
      "Built the full-stack game with Node.js, Express, SQLite and Drizzle ORM.",
      "Added JWT authentication.",
      "Used MVC architecture to separate controllers from direct database access."
    ],
    "tools": [
      "Node.js",
      "Express",
      "SQLite",
      "Drizzle ORM",
      "JavaScript",
      "HTML"
    ],
    "learn": null
  },
  {
    "k": "PROJECT 08 · IN PROGRESS",
    "t": "Smart Money Trading Bot",
    "d": "Python program for testing a smart money concepts trading strategy on historical price data.",
    "module": "Personal project · In progress",
    "b": [
      "Backtests the strategy using historical price data.",
      "Sends alerts with the entry zone and stop-loss price when price nears a setup.",
      "Uses a top-down approach: higher timeframes set direction and lower timeframes refine entries."
    ],
    "tools": [
      "Python"
    ],
    "learn": null
  }
];
var qs=document.querySelector('.quests'),cards=[].slice.call(qs.children),mq=document.createElement('div');
mq.className='marquee';qs.parentNode.insertBefore(mq,qs);mq.appendChild(qs);
cards.forEach(function(c,i){c.dataset.i=i;c.classList.remove('rv');c.tabIndex=0;c.setAttribute('role','button')});
for(var r=0;r<2;r++)cards.forEach(function(c){var n=c.cloneNode(true);n.setAttribute('aria-hidden','true');n.tabIndex=-1;qs.appendChild(n)});
var x=0,last=0,half=0,SP=45,isOpen=false,hold=false,hov=false,mx=-1,my=-1,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var modal=document.getElementById('modal'),mk=document.getElementById('mk'),mt=document.getElementById('mt'),md=document.getElementById('md'),ms=document.getElementById('ms'),mclose=document.getElementById('mclose');
function measure(){half=(qs.scrollWidth+20)/3}measure();addEventListener('resize',measure);
var dragging=false,gridMode=false,manualUntil=0,dragStart=0,dragX=0,moved=false;
function tick(t){var dt=Math.min((t-last)/1000,.1);last=t;if(!isOpen&&!hold&&!hov&&!reduce&&!dragging&&!gridMode&&t>manualUntil){x-=SP*dt;if(x<=-half)x+=half;qs.style.transform='translateX('+x+'px)'}updateQuestDots();requestAnimationFrame(tick)}
requestAnimationFrame(tick);
function show(i){var d=D[i];if(!d)return;isOpen=true;hov=false;mk.textContent=d.k;mt.textContent=d.t;md.replaceChildren();ms.innerHTML='';ms.style.display='none';
  function add(tag,text,parent){var el=document.createElement(tag);el.textContent=text;(parent||md).appendChild(el);return el}
  add('p',d.module).className='project-module';add('p',d.d);var ul=add('ul','');d.b.forEach(function(x){add('li',x,ul)});
  var tools=add('p','');add('b','Tools: ',tools);tools.append(document.createTextNode(d.tools.join(', ')));
  if(d.learn){var learn=add('p','');add('b','What I learnt: ',learn);learn.append(document.createTextNode(d.learn))}
  modal.classList.add('on');modal.setAttribute('aria-hidden','false');mclose.focus();beep(660,.08)}
function hide(){if(!isOpen)return;isOpen=false;hold=true;modal.classList.remove('on');modal.setAttribute('aria-hidden','true');beep(440,.06);
  setTimeout(function(){var el=mx<0?null:document.elementFromPoint(mx,my);hold=!!(el&&el.closest&&el.closest('.q'))},60)}

var controls=document.createElement('div');controls.className='quest-controls';controls.innerHTML='<button type="button" aria-label="Previous project">&#10094;</button><div class="quest-dots" aria-label="Choose project"></div><button type="button" aria-label="Next project">&#10095;</button><button type="button" aria-pressed="false">VIEW ALL PROJECTS</button>';mq.after(controls);var hint=document.createElement('p');hint.className='quest-hint';hint.textContent='Drag, swipe or use arrows to explore quests';controls.after(hint);
var prev=controls.children[0],dotsQ=controls.children[1],next=controls.children[2],all=controls.children[3];
function stepSize(){return half/cards.length||320}function normalize(){if(half)x=-(((-x%half)+half)%half)}function paint(){normalize();qs.style.transform='translateX('+x+'px)';updateQuestDots()}function updateQuestDots(){if(!dotsQ)return;var active=Math.round(-x/stepSize())%cards.length;Array.from(dotsQ.children).forEach(function(b,i){b.classList.toggle('active',i===active);b.setAttribute('aria-current',i===active?'true':'false')})}
function jump(i){if(gridMode)toggleGrid();x=-((i+cards.length)%cards.length)*stepSize();manualUntil=performance.now()+3500;paint()}
cards.forEach(function(c,i){var b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Go to '+c.querySelector('h3').textContent);b.onclick=function(){jump(i)};dotsQ.appendChild(b)});prev.onclick=function(){jump(Math.round(-x/stepSize())-1)};next.onclick=function(){jump(Math.round(-x/stepSize())+1)};
var gallery=document.createElement('div');gallery.id='project-gallery';gallery.hidden=true;gallery.setAttribute('aria-label','All projects');gallery.innerHTML='<div class="gallery-inner"><button class="snd gallery-back" type="button">&#8592; BACK TO QUEST LOG</button><div class="stage">STAGE 04 · QUEST ARCHIVE</div><h2 class="hand">ALL PROJECTS</h2><p class="sub">Explore my academic and personal projects. Select a project to view its details.</p><div class="gallery-grid"></div></div>';document.body.appendChild(gallery);
var back=gallery.querySelector('.gallery-back'), galleryGrid=gallery.querySelector('.gallery-grid'), savedScroll=0;
cards.forEach(function(c,i){var copy=c.cloneNode(true);galleryGrid.appendChild(copy);copy.addEventListener('click',function(){show(i)});copy.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();show(i)}})});
function setGallery(open){if(open===gridMode)return;gridMode=open;gallery.hidden=!open;all.setAttribute('aria-expanded',String(open));document.body.classList.toggle('gallery-open',open);if(open){savedScroll=window.scrollY;gallery.scrollTop=0;back.focus()}else{window.scrollTo(0,savedScroll);all.focus({preventScroll:true});manualUntil=performance.now()+3500;paint()}}
function toggleGrid(){if(gridMode){history.back()}else{history.pushState({questGallery:true},'', '#all-projects');setGallery(true)}}
all.removeAttribute('aria-pressed');all.setAttribute('aria-expanded','false');all.setAttribute('aria-controls','project-gallery');all.onclick=toggleGrid;back.onclick=toggleGrid;window.addEventListener('popstate',function(){setGallery(location.hash==='#all-projects')});window.addEventListener('keydown',function(e){if(e.key==='Escape'&&gridMode&&!isOpen){toggleGrid()}});

mq.addEventListener('pointerdown',function(e){if(gridMode||e.button!==0)return;dragging=true;moved=false;dragStart=e.clientX;dragX=x;});window.addEventListener('pointermove',function(e){if(!dragging)return;var delta=e.clientX-dragStart;if(Math.abs(delta)>7)moved=true;if(moved){mq.classList.add('dragging');x=dragX+delta;paint()}});function endDrag(){if(!dragging)return;dragging=false;mq.classList.remove('dragging');manualUntil=performance.now()+3500;if(moved)setTimeout(function(){moved=false},100)}window.addEventListener('pointerup',endDrag);window.addEventListener('pointercancel',endDrag);mq.addEventListener('click',function(e){if(moved){e.preventDefault();e.stopImmediatePropagation()}},true);updateQuestDots();

qs.addEventListener('click',function(e){var c=e.target.closest('.q');if(c)show(+c.dataset.i)});
qs.addEventListener('keydown',function(e){var c=e.target.closest('.q');if(c&&(e.key==='Enter'||e.key===' ')){e.preventDefault();show(+c.dataset.i)}});
mclose.onclick=hide;modal.addEventListener('click',function(e){if(e.target===modal)hide()});
addEventListener('keydown',function(e){if(e.key==='Escape')hide()});
addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;hov=!isOpen&&!!(e.target.closest&&e.target.closest('.q'));if(hold&&!isOpen&&!(e.target.closest&&e.target.closest('.q')))hold=false});
document.querySelectorAll('.q').forEach(function(c){
    c.addEventListener('mousemove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform='perspective(700px) rotateY('+x*8+'deg) rotateX('+-y*8+'deg) scale(1.1)'});
    c.addEventListener('mouseleave',function(){c.style.transform=''});
    c.addEventListener('mouseenter',function(){beep(300,.05)});
  });
  document.querySelectorAll('.ach').forEach(function(a){function tg(){var o=a.classList.toggle('open');a.setAttribute('aria-expanded',o);beep(o?660:440,.06)}a.addEventListener('click',tg);a.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();tg()}})});
  var g=document.getElementById('glow');addEventListener('mousemove',function(e){g.style.left=e.clientX+'px';g.style.top=e.clientY+'px'});
  document.getElementById('vres').onclick=function(){isOpen=true;hov=false;mk.textContent='RESUME';mt.textContent='Yap Zhi Ning';md.textContent='Offensive Cybersecurity · 2 pages';ms.className='shots one';ms.style.display='';ms.innerHTML='';['images/resume-page-1.png','images/resume-page-2.png'].forEach(function(id,i){var s=document.createElement('div');s.className='shot';var im=document.createElement('img');im.src=id;im.alt='Resume page '+(i+1);s.appendChild(im);ms.appendChild(s)});modal.classList.add('on');modal.setAttribute('aria-hidden','false');mclose.focus();beep(660,.08)};
  var dlb=document.getElementById('dlres');
  try{(window.claude&&claude.use?claude.use('downloads'):Promise.resolve(null)).then(function(d){if(!d)return;dlb.style.display='';dlb.onclick=function(){beep(660,.08);fetch('Yap_Zhi_Ning_Resume.pdf').then(function(r){return r.blob()}).then(function(b){return d.save({filename:'Yap_Zhi_Ning_Resume.pdf',data:b})}).catch(function(){})}}).catch(function(){})}catch(e){}
  var g=document.getElementById('glow');addEventListener('mousemove',function(e){g.style.left=e.clientX+'px';g.style.top=e.clientY+'px'});
})();

;

(() => {
    /* SIDE QUESTS — EXPERIENCE DATA */
    const experiences = [
    {
        "title": "NullSec Hack'N'Flag",
        "category": "CTF COMPETITION",
        "date": "2026",
        "description": "Participated in a Capture the Flag (CTF) competition as a team of four, tackling six challenges across web security, password cracking, steganography and cryptography.",
        "skills": [
            "Web",
            "Steganography",
            "Cryptography"
        ],
        "activities": [
            "Analysed an image using ExifTool and extracted a hidden IP address to successfully recover a flag.",
            "Explored unfamiliar challenge categories by independently researching techniques and experimenting with different approaches.",
            "Applied cybersecurity knowledge gained from practical labs to competition-based challenges.",
            "Challenged myself to explore areas of cybersecurity beyond those I was already familiar with."
        ],
        "reflection": "The competition taught me the importance of curiosity, persistence and independent research when solving unfamiliar cybersecurity challenges. It also helped me understand that useful information can be hidden in unexpected places, such as image metadata.",
        "image": "images/nullsec-certificate.png",
        "certificate": true
    },
    {
        "title": "Ethical Hacking Class CTF",
        "image": "images/ethical-hacking-module.png",
        "category": "CTF COMPETITION",
        "date": "2025",
        "description": "Team of 4 solving 10 challenges in traffic analysis, web inspection, SQL injection and password cracking.",
        "skills": [
            "Wireshark",
            "Burp Suite",
            "SQL Injection"
        ],
        "activities": [
            "Used browser developer tools to inspect page source and network requests to uncover hidden information.",
            "Used Wireshark, Burp Suite and John the Ripper to complete my tasks and find flags."
        ],
        "reflection": "Learnt to combine different tools and inspect web and network data systematically."
    },
    {
        "title": "Swift Nano Bootcamp",
        "image": "images/apple-development.jpeg",
        "category": "BOOTCAMP",
        "date": "2025",
        "description": "Built an iOS app with a group of 3 in 5 days and presented it to an industry professional at Innovis.",
        "skills": [
            "Swift",
            "SwiftUI",
            "UI Design"
        ],
        "activities": [
            "Designed the user interface using Swift, Xcode, MapKit and SwiftUI.",
            "Learnt Swift from scratch and built the app in 5 days.",
            "Presented and demonstrated the final app to a senior industry professional at Innovis."
        ],
        "reflection": "Learnt to adapt to unfamiliar technologies and collaborate under a tight deadline."
    },
    {
        "title": "Shenzhen Overseas Study Trip",
        "image": "images/shenzhen-photo-5.jpeg",
        "photos": [
            {"src": "images/shenzhen-photo-1.jpeg", "label": "CUHK-Shenzhen"},
            {"src": "images/shenzhen-photo-2.jpeg", "label": "Huaqiangbei"},
            {"src": "images/TCT.jpeg", "label": "TCT Exhibition"},
            {"src": "images/shenzhen-photo-4.jpeg", "label": "Shenzhen Science and Technology Museum"},
        ],
        "category": "STUDY TRIP",
        "date": "2026",
        "organiser": "Shenzhen, China",
        "description": "Explored university life, AI-powered robotics and emerging technologies through university and industry visits in Shenzhen, China.",
        "skills": [
            "Artificial Intelligence",
            "Robotics",
            "Emerging Technologies"
        ],
        "activities": [
            "Visited the Chinese University of Hong Kong, Shenzhen (CUHK-Shenzhen), to understand student life, learning culture and further education opportunities after my diploma.",
            "Visited LimX Dynamics to explore how humanoid robots are developed and learn about ongoing robotics projects.",
            "Attended the TCT exhibition to discover innovations in AI, 3D printing and other emerging technologies.",
            "Visited the Shenzhen Science and Technology Meuseum to learn how technology evolve over the years in China."
        ],
        "reflection": "The trip broadened my perspective on technology, sparked my interest in AI and robotics, and encouraged me to explore further education and career opportunities beyond cybersecurity and digital forensics."
    }
];

    /* INITIALISE SIDE QUESTS */
    const $ = id => document.getElementById(id),
          track = $('sqTrack'), dots = $('sqDots'),
          prev = $('sqPrev'), next = $('sqNext'),
          viewAll = $('sqViewAll');

    if (!track || !dots || !prev || !next || !viewAll) return;

    /* CREATE POP-UPS */
    document.body.insertAdjacentHTML('beforeend', `
        <dialog class="sq-modal" id="sqDetailModal">
            <button type="button" class="sq-close" aria-label="Close">✕</button>
            <div id="sqDetailContent"></div>
        </dialog>
        <dialog class="sq-gallery-modal" id="sqGalleryModal">
            <button type="button" class="sq-close" aria-label="Close">✕</button>
            <div class="sq-heading">
                <span class="sq-subtitle">EXPERIENCE ARCHIVE</span>
                <h2>ALL SIDE QUESTS</h2>
                <p>Explore my competitions, programmes and other experiences.</p>
            </div>
            <div class="sq-gallery-grid" id="sqGalleryGrid"></div>
        </dialog>
    `);

    const detail = $('sqDetailModal'), gallery = $('sqGalleryModal');
    const esc = s => String(s).replace(/[&<>"']/g, c => ({
        '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
    }[c]));
    const tags = e => `<div class="sq-tags">${e.skills.map(s => `<span>${esc(s)}</span>`).join('')}</div>`;

    /* GENERATE EXPERIENCE CARDS */
    function card(e, i) {
        return `<article class="sq-card">
            <div class="sq-image">
                <span class="sq-category">${esc(e.category)}</span>
                <div class="sq-cert-placeholder">${e.certificate ? 'CERTIFICATE PHOTO' : 'ADD EXPERIENCE PHOTO'}</div><img class="${e.certificate ? 'sq-cert-image' : 'sq-cover-image'}" src="${esc(e.image)}" alt="${esc(e.title)}" loading="lazy" onerror="this.style.display='none'">
            </div>
            <div class="sq-content">
                <h3>${esc(e.title)}</h3>
                <div class="sq-date">${esc(e.date)}</div>
                <p class="sq-description">${esc(e.description)}</p>
                ${tags(e)}
                <button type="button" class="sq-button" data-experience="${i}">VIEW EXPERIENCE →</button>
            </div>
        </article>`;
    }

    track.innerHTML = experiences.map(card).join('');
    $('sqGalleryGrid').innerHTML = experiences.map(card).join('');

    /* CAROUSEL NAVIGATION */
    function positions() {
        const max = Math.max(0, track.scrollWidth - track.clientWidth), p = [0];
        Array.from(track.children).forEach(c => {
            const x = Math.min(max, c.offsetLeft - track.firstElementChild.offsetLeft);
            if (x > 0 && !p.some(v => Math.abs(v - x) < 2)) p.push(x);
        });
        return p.sort((a, b) => a - b);
    }

    function active(p) {
        return p.reduce((a, v, i) => Math.abs(track.scrollLeft - v) < Math.abs(track.scrollLeft - p[a]) ? i : a, 0);
    }

    function update() {
        const p = positions(), a = active(p);
        Array.from(dots.children).forEach((d, i) => {
            d.classList.toggle('active', i === a);
            d.setAttribute('aria-current', i === a ? 'true' : 'false');
        });
        prev.disabled = track.scrollLeft <= 2;
        next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
    }

    function render() {
        dots.innerHTML = '';
        positions().forEach((x, i) => {
            const b = document.createElement('button');
            b.type = 'button';
            b.className = 'sq-dot';
            b.setAttribute('aria-label', `Experience page ${i + 1}`);
            b.onclick = () => track.scrollTo({left: x, behavior: 'smooth'});
            dots.append(b);
        });
        update();
    }

    function move(d) {
        const p = positions();
        track.scrollTo({
            left: p[Math.max(0, Math.min(p.length - 1, active(p) + d))],
            behavior: 'smooth'
        });
    }

    prev.onclick = () => move(-1);
    next.onclick = () => move(1);
    track.addEventListener('scroll', update, {passive: true});
    window.addEventListener('resize', render);
    render();

    /* EXPERIENCE DETAILS */
    function open(i) {
        const e = experiences[i];
        if (!e) return;
        $('sqDetailContent').innerHTML = `
            <span class="sq-subtitle">${esc(e.category)}</span>
            <h2>${esc(e.title)}</h2>
            <p class="sq-date">${esc(e.date)}</p>
            ${e.certificate ? `<div class="sq-cert-detail"><div class="sq-cert-placeholder">CERTIFICATE PHOTO</div><img class="sq-detail-image sq-cert-image" src="${esc(e.image)}" alt="Competition certificate" onerror="this.style.display='none'"></div>` : ''}
            <h3>EVENT OVERVIEW</h3>
            <p>${esc(e.description)}</p>
            ${e.activities.length ? `<h3>ACTIVITIES</h3><ul>${e.activities.map(a => `<li>${esc(a)}</li>`).join('')}</ul>` : ''}
            ${e.achievement ? `<h3>RESULT</h3><p>${esc(e.achievement)}</p>` : ''}
            <h3>SKILLS ACQUIRED</h3>
            ${tags(e)}
            ${e.reflection ? `<h3>WHAT I LEARNT</h3><p>${esc(e.reflection)}</p>` : ''}
            ${e.photos ? `<h3>TRIP PHOTO GALLERY</h3><div class="sq-trip-photos">${e.photos.map((photo, n) => `<figure><div class="sq-trip-frame"><span>ADD PHOTO ${n+1}</span><img src="${esc(photo.src)}" alt="${esc(photo.label)}" loading="lazy" onerror="this.style.display='none'"></div><figcaption>${esc(photo.label)}</figcaption></figure>`).join('')}</div>` : ''}

        `;
        if (!detail.open) detail.showModal();
    }

    /* BUTTON INTERACTIONS */
    document.addEventListener('click', e => {
        const b = e.target.closest('[data-experience]');
        if (b) open(Number(b.dataset.experience));
    });

    viewAll.onclick = () => {
        if (!gallery.open) gallery.showModal();
    };

    /* CLOSE POP-UPS */
    [detail, gallery].forEach(m => {
        m.querySelector('.sq-close').onclick = () => m.close();
        m.addEventListener('click', e => {
            if (e.target !== m) return;
            const r = m.getBoundingClientRect();
            if (e.clientX < r.left || e.clientX > r.right ||
                e.clientY < r.top || e.clientY > r.bottom) m.close();
        });
    });
})();
