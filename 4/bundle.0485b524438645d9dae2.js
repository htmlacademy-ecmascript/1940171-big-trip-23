(()=>{var e={484:function(e){e.exports=function(){"use strict";var e=6e4,t=36e5,n="millisecond",i="second",s="minute",r="hour",a="day",l="week",o="month",c="quarter",d="year",u="date",p="Invalid Date",f=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,h=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],n=e%100;return"["+e+(t[(n-20)%10]||t[n]||t[0])+"]"}},m=function(e,t,n){var i=String(e);return!i||i.length>=t?e:""+Array(t+1-i.length).join(n)+e},_={s:m,z:function(e){var t=-e.utcOffset(),n=Math.abs(t),i=Math.floor(n/60),s=n%60;return(t<=0?"+":"-")+m(i,2,"0")+":"+m(s,2,"0")},m:function e(t,n){if(t.date()<n.date())return-e(n,t);var i=12*(n.year()-t.year())+(n.month()-t.month()),s=t.clone().add(i,o),r=n-s<0,a=t.clone().add(i+(r?-1:1),o);return+(-(i+(n-s)/(r?s-a:a-s))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:o,y:d,w:l,d:a,D:u,h:r,m:s,s:i,ms:n,Q:c}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},b="en",y={};y[b]=v;var g=function(e){return e instanceof T},$=function e(t,n,i){var s;if(!t)return b;if("string"==typeof t){var r=t.toLowerCase();y[r]&&(s=r),n&&(y[r]=n,s=r);var a=t.split("-");if(!s&&a.length>1)return e(a[0])}else{var l=t.name;y[l]=t,s=l}return!i&&s&&(b=s),s||!i&&b},M=function(e,t){if(g(e))return e.clone();var n="object"==typeof t?t:{};return n.date=e,n.args=arguments,new T(n)},w=_;w.l=$,w.i=g,w.w=function(e,t){return M(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var T=function(){function v(e){this.$L=$(e.locale,null,!0),this.parse(e)}var m=v.prototype;return m.parse=function(e){this.$d=function(e){var t=e.date,n=e.utc;if(null===t)return new Date(NaN);if(w.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var i=t.match(f);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(t)}(e),this.$x=e.x||{},this.init()},m.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},m.$utils=function(){return w},m.isValid=function(){return!(this.$d.toString()===p)},m.isSame=function(e,t){var n=M(e);return this.startOf(t)<=n&&n<=this.endOf(t)},m.isAfter=function(e,t){return M(e)<this.startOf(t)},m.isBefore=function(e,t){return this.endOf(t)<M(e)},m.$g=function(e,t,n){return w.u(e)?this[t]:this.set(n,e)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(e,t){var n=this,c=!!w.u(t)||t,p=w.p(e),f=function(e,t){var i=w.w(n.$u?Date.UTC(n.$y,t,e):new Date(n.$y,t,e),n);return c?i:i.endOf(a)},h=function(e,t){return w.w(n.toDate()[e].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(t)),n)},v=this.$W,m=this.$M,_=this.$D,b="set"+(this.$u?"UTC":"");switch(p){case d:return c?f(1,0):f(31,11);case o:return c?f(1,m):f(0,m+1);case l:var y=this.$locale().weekStart||0,g=(v<y?v+7:v)-y;return f(c?_-g:_+(6-g),m);case a:case u:return h(b+"Hours",0);case r:return h(b+"Minutes",1);case s:return h(b+"Seconds",2);case i:return h(b+"Milliseconds",3);default:return this.clone()}},m.endOf=function(e){return this.startOf(e,!1)},m.$set=function(e,t){var l,c=w.p(e),p="set"+(this.$u?"UTC":""),f=(l={},l[a]=p+"Date",l[u]=p+"Date",l[o]=p+"Month",l[d]=p+"FullYear",l[r]=p+"Hours",l[s]=p+"Minutes",l[i]=p+"Seconds",l[n]=p+"Milliseconds",l)[c],h=c===a?this.$D+(t-this.$W):t;if(c===o||c===d){var v=this.clone().set(u,1);v.$d[f](h),v.init(),this.$d=v.set(u,Math.min(this.$D,v.daysInMonth())).$d}else f&&this.$d[f](h);return this.init(),this},m.set=function(e,t){return this.clone().$set(e,t)},m.get=function(e){return this[w.p(e)]()},m.add=function(n,c){var u,p=this;n=Number(n);var f=w.p(c),h=function(e){var t=M(p);return w.w(t.date(t.date()+Math.round(e*n)),p)};if(f===o)return this.set(o,this.$M+n);if(f===d)return this.set(d,this.$y+n);if(f===a)return h(1);if(f===l)return h(7);var v=(u={},u[s]=e,u[r]=t,u[i]=1e3,u)[f]||1,m=this.$d.getTime()+n*v;return w.w(m,this)},m.subtract=function(e,t){return this.add(-1*e,t)},m.format=function(e){var t=this,n=this.$locale();if(!this.isValid())return n.invalidDate||p;var i=e||"YYYY-MM-DDTHH:mm:ssZ",s=w.z(this),r=this.$H,a=this.$m,l=this.$M,o=n.weekdays,c=n.months,d=function(e,n,s,r){return e&&(e[n]||e(t,i))||s[n].slice(0,r)},u=function(e){return w.s(r%12||12,e,"0")},f=n.meridiem||function(e,t,n){var i=e<12?"AM":"PM";return n?i.toLowerCase():i},v={YY:String(this.$y).slice(-2),YYYY:this.$y,M:l+1,MM:w.s(l+1,2,"0"),MMM:d(n.monthsShort,l,c,3),MMMM:d(c,l),D:this.$D,DD:w.s(this.$D,2,"0"),d:String(this.$W),dd:d(n.weekdaysMin,this.$W,o,2),ddd:d(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(r),HH:w.s(r,2,"0"),h:u(1),hh:u(2),a:f(r,a,!0),A:f(r,a,!1),m:String(a),mm:w.s(a,2,"0"),s:String(this.$s),ss:w.s(this.$s,2,"0"),SSS:w.s(this.$ms,3,"0"),Z:s};return i.replace(h,(function(e,t){return t||v[e]||s.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(n,u,p){var f,h=w.p(u),v=M(n),m=(v.utcOffset()-this.utcOffset())*e,_=this-v,b=w.m(this,v);return b=(f={},f[d]=b/12,f[o]=b,f[c]=b/3,f[l]=(_-m)/6048e5,f[a]=(_-m)/864e5,f[r]=_/t,f[s]=_/e,f[i]=_/1e3,f)[h]||_,p?b:w.a(b)},m.daysInMonth=function(){return this.endOf(o).$D},m.$locale=function(){return y[this.$L]},m.locale=function(e,t){if(!e)return this.$L;var n=this.clone(),i=$(e,t,!0);return i&&(n.$L=i),n},m.clone=function(){return w.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},v}(),D=T.prototype;return M.prototype=D,[["$ms",n],["$s",i],["$m",s],["$H",r],["$W",a],["$M",o],["$y",d],["$D",u]].forEach((function(e){D[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),M.extend=function(e,t){return e.$i||(e(t,T,M),e.$i=!0),M},M.locale=$,M.isDayjs=g,M.unix=function(e){return M(1e3*e)},M.en=y[b],M.Ls=y,M.p={},M}()}},t={};function n(i){var s=t[i];if(void 0!==s)return s.exports;var r=t[i]={exports:{}};return e[i].call(r.exports,r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";function e(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}function t(e,t,n="beforeend"){t.insertAdjacentElement(n,e.getElement())}class i{getTemplate=()=>'\n  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n  <div class="trip-sort__item  trip-sort__item--day">\n    <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>\n    <label class="trip-sort__btn" for="sort-day">Day</label>\n  </div>\n\n  <div class="trip-sort__item  trip-sort__item--event">\n    <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n    <label class="trip-sort__btn" for="sort-event">Event</label>\n  </div>\n\n  <div class="trip-sort__item  trip-sort__item--time">\n    <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n    <label class="trip-sort__btn" for="sort-time">Time</label>\n  </div>\n\n  <div class="trip-sort__item  trip-sort__item--price">\n    <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">\n    <label class="trip-sort__btn" for="sort-price">Price</label>\n  </div>\n\n  <div class="trip-sort__item  trip-sort__item--offer">\n    <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n    <label class="trip-sort__btn" for="sort-offer">Offers</label>\n  </div>\n</form>\n  ';getElement=()=>(this.element||(this.element=e(this.getTemplate())),this.element);removeElement=()=>{this.element=null}}var s=n(484),r=n.n(s);function a(e,t){return e?r()(e).format(t):""}const l=["taxi","bus","train","ship","drive","flight","check-in","sightseeing","restaurant"],o="DD/MM/YY HH:MM";class c{constructor(e,t,n){this.point=e,this.destination=t,this.offers=n}getTemplate=()=>function(e,t,n){const{type:i,basePrice:s,dateFrom:r,dateTo:c}=e,d=t.find((t=>t.id===e.destination)),u=n.find((e=>e.type===i)).offers.filter((t=>e.offers.includes(t.id)));return`\n  <li class="trip-events__item">\n              <form class="event event--edit" action="#" method="post">\n                <header class="event__header">\n                  <div class="event__type-wrapper">\n                    <label class="event__type  event__type-btn" for="event-type-toggle-1">\n                      <span class="visually-hidden">Choose event type</span>\n                      <img class="event__type-icon" width="17" height="17" src="img/icons/${i}.png" alt="Event type icon">\n                    </label>\n                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n                    <div class="event__type-list">\n                      <fieldset class="event__type-group">\n                        <legend class="visually-hidden">Event type</legend>\n                        ${l.map((e=>`\n                        <div class="event__type-item">\n                        <input id="event-type-${e}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${e}">\n                        <label class="event__type-label  event__type-label--${e}" for="event-type-${e}-1">${e}</label>\n                      </div>\n                      `)).join("")}\n\n                      </fieldset>\n                    </div>\n                  </div>\n\n                  <div class="event__field-group  event__field-group--destination">\n                    <label class="event__label  event__type-output" for="event-destination-1">\n                      ${i}\n                    </label>\n                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${d.name}" list="destination-list-1">\n                    <datalist id="destination-list-1">\n                      ${t.map((e=>`<option value="${e.name}"></option>`)).join("")}\n                    </datalist>\n                  </div>\n\n                  <div class="event__field-group  event__field-group--time">\n                    <label class="visually-hidden" for="event-start-time-1">From</label>\n                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${a(r,o)}">\n                    &mdash;\n                    <label class="visually-hidden" for="event-end-time-1">To</label>\n                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${a(c,o)}">\n                  </div>\n\n                  <div class="event__field-group  event__field-group--price">\n                    <label class="event__label" for="event-price-1">\n                      <span class="visually-hidden">Price</span>\n                      &euro;\n                    </label>\n                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${s}">\n                  </div>\n\n                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n                  <button class="event__reset-btn" type="reset">Delete</button>\n                  <button class="event__rollup-btn" type="button">\n                    <span class="visually-hidden">Open event</span>\n                  </button>\n                </header>\n                <section class="event__details">\n                  ${e.offers.length?`<section class="event__section  event__section--offers">\n                  <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n                  <div class="event__available-offers">\n                  ${u.map((e=>`<div class="event__offer-selector">\n                      <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>\n                      <label class="event__offer-label" for="event-offer-luggage-1">\n                        <span class="event__offer-title">${e.title}</span>\n                        &plus;&euro;&nbsp;\n                        <span class="event__offer-price">${e.price}</span>\n                      </label>\n                    </div>\n                  `))}\n                  </div>\n                </section>`:""}\n\n                  ${d.description?function(e){return`<section class="event__section  event__section--destination">\n<h3 class="event__section-title  event__section-title--destination">Destination</h3>\n<p class="event__destination-description">${e.description}</p>\n${e.pictures.length?`<div class="event__photos-container">\n<div class="event__photos-tape">\n${e.pictures.map((e=>`<img class="event__photo" src="${e.src}" alt="Event photo">`)).join("")}\n\n  </div>\n</div>`:""}\n\n</section>\n`}(d):""}\n                </section>\n              </form>\n            </li>\n  `}(this.point,this.destination,this.offers);getElement=()=>(this.element||(this.element=e(this.getTemplate())),this.element);removeElement=()=>{this.element=null}}const d="HH:MM";class u{constructor(e,t){this.point=e,this.destination=t}getTemplate=()=>function(e,t){const{type:n,isFavorite:i,basePrice:s,dateFrom:r,dateTo:l}=e;return`\n  <li class="trip-events__item">\n              <div class="event">\n                <time class="event__date" datetime="2019-03-18">MAR 18</time>\n                <div class="event__type">\n                  <img class="event__type-icon" width="42" height="42" src="img/icons/${n}.png" alt="Event type icon">\n                </div>\n                <h3 class="event__title">${n} ${t.find((t=>t.id===e.destination)).name}</h3>\n                <div class="event__schedule">\n                  <p class="event__time">\n                    <time class="event__start-time" datetime="2019-03-18T12:25">${a(r,d)}</time>\n                    &mdash;\n                    <time class="event__end-time" datetime="2019-03-18T13:35">${a(l,d)}</time>\n                  </p>\n                  <p class="event__duration">40M</p>\n                </div>\n                <p class="event__price">\n                  &euro;&nbsp;<span class="event__price-value">${s}</span>\n                </p>\n                <h4 class="visually-hidden">Offers:</h4>\n                <ul class="event__selected-offers">\n                  <li class="event__offer">\n                    <span class="event__offer-title">Add breakfast</span>\n                    &plus;&euro;&nbsp;\n                    <span class="event__offer-price">50</span>\n                  </li>\n                </ul>\n                <button class="event__favorite-btn ${i?"event__favorite-btn--active":""}" type="button">\n                  <span class="visually-hidden">Add to favorite</span>\n                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n                  </svg>\n                </button>\n                <button class="event__rollup-btn" type="button">\n                  <span class="visually-hidden">Open event</span>\n                </button>\n              </div>\n            </li>\n  `}(this.point,this.destination);getElement=()=>(this.element||(this.element=e(this.getTemplate())),this.element);removeElement=()=>{this.element=null}}class p{getTemplate=()=>'\n          <div class="trip-main__trip-controls  trip-controls">\n            <div class="trip-controls__filters">\n              <h2 class="visually-hidden">Filter events</h2>\n              <form class="trip-filters" action="#" method="get">\n                <div class="trip-filters__filter">\n                  <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>\n                  <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n                </div>\n\n                <div class="trip-filters__filter">\n                  <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n                  <label class="trip-filters__filter-label" for="filter-future">Future</label>\n                </div>\n\n                <div class="trip-filters__filter">\n                  <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n                  <label class="trip-filters__filter-label" for="filter-present">Present</label>\n                </div>\n\n                <div class="trip-filters__filter">\n                  <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">\n                  <label class="trip-filters__filter-label" for="filter-past">Past</label>\n                </div>\n\n                <button class="visually-hidden" type="submit">Accept filter</button>\n              </form>\n            </div>\n          </div>\n  ';getElement=()=>(this.element||(this.element=e(this.getTemplate())),this.element);removeElement=()=>{this.element=null}}class f{getTemplate=()=>'\n  <section class="trip-main__trip-info  trip-info">\n  <div class="trip-info__main">\n    <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>\n\n    <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>\n  </div>\n\n  <p class="trip-info__cost">\n    Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>\n  </p>\n</section>\n  ';getElement=()=>(this.element||(this.element=e(this.getTemplate())),this.element);removeElement=()=>{this.element=null}}class h{getTemplate=()=>'\n  <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>\n  ';getElement=()=>(this.element||(this.element=e(this.getTemplate())),this.element);removeElement=()=>{this.element=null}}class v{getTemplate=()=>'\n  <ul class="trip-events__list">\n  <ul>\n  ';getElement=()=>(this.element||(this.element=e(this.getTemplate())),this.element);removeElement=()=>{this.element=null}}const m=[{id:"f4b62099-293f-4c3d-a702-94eec4a2808c",basePrice:1100,dateFrom:"2019-07-09T12:55:56.845Z",dateTo:"2019-07-11T13:22:13.375Z",destination:"bfa5cb75-a1fe-4b77-a83c-0e528e910e04",isFavorite:!1,offers:["1","2","3","4"],type:"taxi"},{id:"f4b62099-293f-4c3d-a702-94eec4a2808c",basePrice:500,dateFrom:"2019-07-10T10:55:56.845Z",dateTo:"2019-07-11T11:11:13.375Z",destination:"bfa5cb75-a1fe-4b77-a83c-0e528e910e05",isFavorite:!0,offers:["b4c3e4e6-9053-42ce-b747-e281314baa34"],type:"train"},{id:"f4b62099-293f-4c3d-a702-94eec4a2808c",basePrice:2e3,dateFrom:"2019-07-10T16:55:56.845Z",dateTo:"2019-07-11T13:22:13.375Z",destination:"bfa5cb75-a1fe-4b77-a83c-0e528e910e06",isFavorite:!0,offers:[],type:"flight"}],_=[{id:"bfa5cb75-a1fe-4b77-a83c-0e528e910e04",description:"Surgut, is a beautiful city, a true asian pearl, with crowded streets.",name:"Surgut",pictures:[{src:"https://loremflickr.com/248/1525556",description:"Chamonix parliament building"},{src:"https://loremflickr.com/248/4556568",description:"Chamonix parliament building"},{src:"https://loremflickr.com/248/15552213",description:"Chamonix parliament building"},{src:"img/photos/3.jpg",description:"Chamonix parliament building"}]},{id:"bfa5cb75-a1fe-4b77-a83c-0e528e910e06",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",name:"SPB",pictures:[{src:"https://loremflickr.com/248/1525556",description:"Chamonix parliament building"}]},{id:"bfa5cb75-a1fe-4b77-a83c-0e528e910e05",description:"Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.",name:"Moscow",pictures:[{src:"https://loremflickr.com/248/1525556",description:"Chamonix parliament building"}]}],b=[{type:"taxi",offers:[{id:"1",title:"Add luggage",price:50},{id:"2",title:"Switch to comfort",price:80},{id:"3",title:"Add meal",price:15},{id:"4",title:"Choose seats",price:5},{id:"5",title:"Travel by train",price:40}]},{type:"train",offers:[{id:"1",title:"Socks in reserved seat will not smell",price:50},{id:"2",title:"Switch to compartment",price:80},{id:"3",title:"Add meal",price:15}]},{type:"flight",offers:[{id:"1",title:"The flight attendants will dance for you",price:50},{id:"2",title:"Add alcohol to lunch",price:80}]}],y=document.querySelector(".trip-main"),g=document.querySelector(".trip-events"),$=new class{constructor(){this.points=[],this.destination=[],this.offers=[]}init=()=>{this.points=m,this.destination=_,this.offers=b};getPoints=()=>this.points;getDestination=()=>this.destination;getOffers=()=>this.offers};$.init();const M=new class{eventListComponent=new v;constructor({boardContainer:e,headerContainer:t,pointModel:n}){this.boardContainer=e,this.headerContainer=t,this.pointModel=n}init=()=>{const e=this.pointModel.getPoints(),n=this.pointModel.getDestination(),s=this.pointModel.getOffers();t(new f,this.headerContainer),t(new p,this.headerContainer),t(new h,this.headerContainer),t(new i,this.boardContainer),t(this.eventListComponent,this.boardContainer),t(new c(e[0],n,s),this.eventListComponent.getElement()),e.forEach((i=>{e[0]!==i&&t(new u(i,n),this.eventListComponent.getElement())}))}}({boardContainer:g,headerContainer:y,pointModel:$});M.init()})()})();
//# sourceMappingURL=bundle.0485b524438645d9dae2.js.map