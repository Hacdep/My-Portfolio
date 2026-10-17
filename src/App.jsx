import { useState, useEffect } from "react";
import photo from "./assets/photo.jpg";

/* ✏️ O'zingiznikini shu yerga yozing */
const ME = {
  name:"Behruz Baxtiyorov", email:"behruzbaxtiyorov82@gmail.com", phone:"+998 20 009 46 10",
  github:"https://github.com/Hacdep", telegram:"https://t.me/whoami0613", photo,           // bo'sh bo'lsa ko'rsatilmaydi
  docs:{ uz:"1RbICPPpI_omZCFOH4mSRVMOTJyDQ1APIQ-srmnAkEGQ", en:"1BjW4KECa2V59Ekni4cp7Qm0sVVFFfWYdFOtD6dkLuYE", ru:"179-iixwpgxnbtioCVoga_R3hEHMYj0DmOhKMUce-ERU" }
};
const pdf = id => "https://docs.google.com/document/d/"+id+"/export?format=pdf";
const view = id => "https://docs.google.com/document/d/"+id+"/preview";

const T = {
 uz:{ nav:["Loyihalar","Jarayon","Men haqimda","Resume","Aloqa"], loc:"Toshkent, O'zbekiston", avail:"Ishga tayyor",
  sub:"Foydali, qulay va esda qoladigan veb-tajribalar yarataman.", seeP:"Loyihalarni ko'rish", dl:"Resume yuklab olish",
  proj:"Tanlangan loyihalar", soon:"Loyiha rasmi",
  P:[["SPOTIFY CLONE","Component-based va responsive musiqa ilovasi interfeysi: Header, Layout va boshqa murakkab komponentlar, qulay UX.",["React","CSS Modules"]],["3D WEB CONCEPT","Three.js bilan 3D vizual elementlar va brauzer interaktivligi; Node.js va RESTful API orqali ma'lumot almashinuvi.",["Three.js","Node.js"]],["PORTFOLIO SAYTI","Shaxsiy sayt: 3 tilli, resume yuklab olish bilan.",["React","CSS3"]]],
  proc:"Ish jarayonim", S:[["Tahlil","Talab va maqsadni aniqlash."],["Reja","Struktura va maket."],["Kod","Toza HTML, CSS, React."],["Responsive","Telefon, planshet, kompyuter."],["Test va deploy","Tekshiruv va GitHub'ga joylash."]],
  tools:"Asboblarim", T:["Interfeys kutubxonasi","Dasturlash tili","Markup","Stil va layout","Versiyalar nazorati","Kod hosting"],
  about:"Men haqimda", ab:"Frontend va zamonaviy web-texnologiyalar (JavaScript, React) bo'yicha amaliy tajribaga ega 3-kurs Kompyuter muhandisligi talabasi. ProWeb o'quv markazining Frontend Development kursini tamomlaganman. Responsive, tezkor va qulay interfeyslar yarataman hamda RESTful API integratsiyalarini qilaman. Hozir Tailwind CSS va Three.js bilan interaktiv dizayn ko'nikmalarimni chuqurlashtiryapman.",
  st:[["3-kurs","Kompyuter muhandisligi"],["B2","Ingliz tili"],["3","Til: UZ · EN · RU"]],
  rs:"Resume", rsT:"Resumeni yuklab oling", rsP:"Resume sayt tiliga mos holda PDF bo'lib yuklanadi: o'zbekcha saytda o'zbekcha, inglizchada inglizcha, ruschada ruscha.", online:"Onlayn ko'rish",
  let:"Keling,", let2:"birga yarataylik", conn:"Bog'lanish", rights:"Barcha huquqlar himoyalangan." },
 en:{ nav:["Projects","Process","About","Resume","Contact"], loc:"Tashkent, Uzbekistan", avail:"Open to work",
  sub:"I build useful, usable and memorable web experiences.", seeP:"View projects", dl:"Download resume",
  proj:"Featured projects", soon:"Project image",
  P:[["SPOTIFY CLONE","Component-based, responsive music app UI: Header, Layout and other complex components with a focus on UX.",["React","CSS Modules"]],["3D WEB CONCEPT","3D visuals and browser interactivity with Three.js; data exchange with backend services via Node.js and RESTful API.",["Three.js","Node.js"]],["PORTFOLIO SITE","Personal site: 3 languages, with resume download.",["React","CSS3"]]],
  proc:"My workflow", S:[["Discover","Understand needs and goals."],["Plan","Structure and layout."],["Code","Clean HTML, CSS, React."],["Responsive","Phone, tablet, desktop."],["Test & deploy","Check and publish via GitHub."]],
  tools:"Tools I use", T:["UI library","Programming language","Markup","Styling & layout","Version control","Code hosting"],
  about:"About me", ab:"3rd-year Computer Engineering student with hands-on experience in frontend and modern web technologies (JavaScript, React). Graduate of ProWeb Learning Center's Frontend Development course. I build responsive, fast and user-friendly interfaces and integrate RESTful APIs. Currently deepening interactive design skills with Tailwind CSS and Three.js.",
  st:[["Year 3","Computer Engineering"],["B2","English"],["3","Languages: UZ · EN · RU"]],
  rs:"Resume", rsT:"Download my resume", rsP:"The resume downloads as a PDF matching the site language: Uzbek, English or Russian.", online:"View online",
  let:"Let's build", let2:"something amazing", conn:"Let's connect", rights:"All rights reserved." },
 ru:{ nav:["Проекты","Процесс","Обо мне","Резюме","Контакты"], loc:"Ташкент, Узбекистан", avail:"Открыт к работе",
  sub:"Создаю полезные, удобные и запоминающиеся веб-решения.", seeP:"Смотреть проекты", dl:"Скачать резюме",
  proj:"Избранные проекты", soon:"Изображение проекта",
  P:[["SPOTIFY CLONE","Компонентный адаптивный интерфейс музыкального приложения: Header, Layout и другие сложные компоненты, упор на UX.",["React","CSS Modules"]],["3D WEB CONCEPT","3D-элементы и интерактивность в браузере на Three.js; обмен данными с бэкендом через Node.js и RESTful API.",["Three.js","Node.js"]],["САЙТ-ПОРТФОЛИО","Личный сайт на 3 языках со скачиванием резюме.",["React","CSS3"]]],
  proc:"Мой процесс", S:[["Анализ","Понять задачи и цели."],["План","Структура и макет."],["Код","Чистый HTML, CSS, React."],["Адаптивность","Телефон, планшет, ПК."],["Тест и деплой","Проверка и публикация на GitHub."]],
  tools:"Мои инструменты", T:["UI-библиотека","Язык программирования","Разметка","Стили и вёрстка","Контроль версий","Хостинг кода"],
  about:"Обо мне", ab:"Студент 3-го курса «Компьютерная инженерия» с практическим опытом во frontend и современных веб-технологиях (JavaScript, React). Выпускник курса Frontend Development учебного центра ProWeb. Создаю адаптивные, быстрые и удобные интерфейсы, интегрирую RESTful API. Сейчас углубляю навыки интерактивного дизайна с Tailwind CSS и Three.js.",
  st:[["3 курс","Компьютерная инженерия"],["B2","Английский"],["3","Языка: UZ · EN · RU"]],
  rs:"Резюме", rsT:"Скачайте моё резюме", rsP:"Резюме скачивается в PDF на языке сайта: узбекском, английском или русском.", online:"Смотреть онлайн",
  let:"Давайте создадим", let2:"что-то крутое", conn:"Связаться", rights:"Все права защищены." }
};
const TOOLS = ["React.js","JavaScript","HTML5","CSS3","Git","GitHub"];
const EXTRA = {
 uz:{skills:"Ko'nikmalar",G:[["Frontend",["HTML5","CSS3","JavaScript (ES6+)","React.js","Vite","CSS Modules"]],["O'rganilmoqda",["Tailwind CSS","Three.js"]],["Backend va tillar",["RESTful API","JSON","Node.js","Go","C/C++","Python"]],["Asboblar",["Git","GitHub","VS Code","Chrome DevTools","Linux (Ubuntu)"]]],edu:"Ta'lim va kurslar",E:[["Toshkent davlat texnika universiteti (TDTU)","2024 – hozirgacha · Kompyuter muhandisligi, 3-kurs"],["ProWeb o'quv markazi","Frontend Development kursi bitiruvchisi"]],langs:"Tillar",L:[["O'zbek tili","Ona tili"],["Ingliz tili","B2 (sertifikatlangan)"],["Rus tili","Muloqot darajasi"]]},
 en:{skills:"Skills",G:[["Frontend",["HTML5","CSS3","JavaScript (ES6+)","React.js","Vite","CSS Modules"]],["Learning",["Tailwind CSS","Three.js"]],["Backend & languages",["RESTful API","JSON","Node.js","Go","C/C++","Python"]],["Tools",["Git","GitHub","VS Code","Chrome DevTools","Linux (Ubuntu)"]]],edu:"Education & courses",E:[["Tashkent State Technical University (TSTU)","2024 – present · Computer Engineering, 3rd year"],["ProWeb Learning Center","Frontend Development course graduate"]],langs:"Languages",L:[["Uzbek","Native"],["English","B2 (certified)"],["Russian","Conversational"]]},
 ru:{skills:"Навыки",G:[["Frontend",["HTML5","CSS3","JavaScript (ES6+)","React.js","Vite","CSS Modules"]],["Изучаю",["Tailwind CSS","Three.js"]],["Backend и языки",["RESTful API","JSON","Node.js","Go","C/C++","Python"]],["Инструменты",["Git","GitHub","VS Code","Chrome DevTools","Linux (Ubuntu)"]]],edu:"Образование и курсы",E:[["Ташкентский государственный технический университет (ТГТУ)","2024 – настоящее время · Компьютерная инженерия, 3 курс"],["Учебный центр ProWeb","Выпускник курса Frontend Development"]],langs:"Языки",L:[["Узбекский","Родной"],["Английский","B2 (сертификат)"],["Русский","Разговорный"]]}
};

function App(){
  const [l,setL] = useState("uz");
  const t = T[l];
  const x = EXTRA[l];
  useEffect(()=>{ document.documentElement.lang = l; },[l]);
  const ids = ["projects","process","about","resume","contact"];
  return (<>
  <nav><div className="w">
    <a href="#top" className="d" style={{fontSize:"1.1rem",letterSpacing:2}}>BB<span style={{color:"var(--blue)"}}>.</span></a>
    <div className="nl">{t.nav.map((n,i)=><a key={i} href={"#"+ids[i]}>{n}</a>)}</div>
    <div className="lg">{["uz","en","ru"].map(c=><button key={c} className={l===c?"on":""} onClick={()=>setL(c)}>{c.toUpperCase()}</button>)}</div>
  </div></nav>

  <header className="hero" id="top"><div className="w">
    <div>
      <div className="tag"><span>Frontend Developer</span><span>◎ {t.loc}</span><span><b>● {t.avail}</b></span></div>
      <h1 className="d"><span className="a">Frontend</span><span className="b">Portfolio</span></h1>
      <p className="sub">✦ {t.sub}</p>
      <div className="btns">
        <a className="btn p" href={pdf(ME.docs[l])} target="_blank" rel="noopener">⬇ {t.dl}</a>
        <a className="btn" href="#projects">{t.seeP} ↗</a>
      </div>
    </div>
    <div className="pt">
      <div className="ph">{ME.photo ? <img src={ME.photo} alt={ME.name}/> : <span className="d">BB</span>}</div>
      <div className="nm">{ME.name}<small>Frontend / React</small></div>
    </div>
  </div></header>

  <section id="projects"><div className="w">
    <div className="h">{t.proj}</div>
    <div className="g3">{t.P.map((p,i)=>(
      <div className="c" key={i}>
        <div className="num d">0{i+1}</div>
        <div className="ph2">{t.soon}</div>
        <h3>{p[0]}</h3><p style={{marginBottom:12}}>{p[1]}</p>
        <div className="ch">{p[2].map(x=><span key={x}>{x}</span>)}</div>
      </div>))}
    </div>
  </div></section>

  <section id="process"><div className="w two">
    <div>
      <div className="h">{t.proc}</div>
      {t.S.map((s,i)=>(<div className="step" key={i}><i>0{i+1}</i><div><b>{s[0]}</b><small>{s[1]}</small></div></div>))}
    </div>
    <div>
      <div className="h">{t.tools}</div>
      <div className="tools">{TOOLS.map((n,i)=>(<div className="tl" key={n}><b>{n}</b><small>{t.T[i]}</small></div>))}</div>
    </div>
  </div></section>

  <section id="about"><div className="w ab">
    <div className="pt" style={{maxWidth:260}}><div className="ph" style={{width:"90%"}}>{ME.photo ? <img src={ME.photo} alt=""/> : <span className="d">BB</span>}</div></div>
    <div>
      <div className="h">{t.about}</div>
      <p>{t.ab}</p>
      <div className="st">{t.st.map((s,i)=>(<div key={i}><span className="d">{s[0]}</span><small>{s[1]}</small></div>))}</div>
    </div>
  </div></section>

  <section id="skills"><div className="w">
    <div className="h">{x.skills}</div>
    <div className="g3">{x.G.map(g=>(<div className="c" key={g[0]}><h3>{g[0]}</h3><div className="ch" style={{marginTop:12}}>{g[1].map(s=><span key={s}>{s}</span>)}</div></div>))}</div>
    <div className="two" style={{marginTop:44}}>
      <div><div className="h">{x.edu}</div>{x.E.map((e,i)=>(<div className="c" style={{marginBottom:12}} key={i}><h3>{e[0]}</h3><p>{e[1]}</p></div>))}</div>
      <div><div className="h">{x.langs}</div>{x.L.map((a,i)=>(<div className="step" key={i}><div><b>{a[0]}</b><small>{a[1]}</small></div></div>))}</div>
    </div>
  </div></section>

  <section id="resume"><div className="w">
    <div className="rs">
      <div>
        <div className="h" style={{margin:"0 0 10px"}}>{t.rs}</div>
        <h2 className="d">{t.rsT}</h2>
        <p>{t.rsP}</p>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        <a className="btn p" href={pdf(ME.docs[l])} target="_blank" rel="noopener">⬇ {t.dl} (PDF · {l.toUpperCase()})</a>
        <a className="btn" href={view(ME.docs[l])} target="_blank" rel="noopener">{t.online} ↗</a>
      </div>
    </div>
  </div></section>

  <section id="contact"><div className="w two">
    <div className="big d">{t.let}<em>{t.let2}</em></div>
    <div>
      <div className="h">{t.conn}</div>
      <div className="lk">
        <a href={"mailto:"+ME.email}>✉ {ME.email}</a>
        <a href={"tel:"+ME.phone.replace(/\s/g,"")}>☎ {ME.phone}</a>
        <a>◎ {t.loc}</a>
        {ME.github && <a href={ME.github} target="_blank" rel="noopener">⌘ GitHub</a>}
        {ME.telegram && <a href={ME.telegram} target="_blank" rel="noopener">➤ Telegram</a>}
      </div>
    </div>
  </div></section>

  <footer>© 2026 {ME.name}. {t.rights}</footer>
  </>);
}
export default App;
