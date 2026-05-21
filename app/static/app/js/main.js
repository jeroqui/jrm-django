"use strict";(()=>{var Tc=Object.create;var Xa=Object.defineProperty;var wc=Object.getOwnPropertyDescriptor;var Rc=Object.getOwnPropertyNames;var Cc=Object.getPrototypeOf,Lc=Object.prototype.hasOwnProperty;var Pc=(i,e)=>()=>(e||i((e={exports:{}}).exports,e),e.exports);var Ic=(i,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of Rc(e))!Lc.call(i,r)&&r!==t&&Xa(i,r,{get:()=>e[r],enumerable:!(n=wc(e,r))||n.enumerable});return i};var Dc=(i,e,t)=>(t=i!=null?Tc(Cc(i)):{},Ic(e||!i||!i.__esModule?Xa(t,"default",{value:i,enumerable:!0}):t,i));var qa=Pc(Wi=>{(function(){"use strict";var i=function(){this.init()};i.prototype={init:function(){var s=this||e;return s._counter=1e3,s._html5AudioPool=[],s.html5PoolSize=10,s._codecs={},s._howls=[],s._muted=!1,s._volume=1,s._canPlayEvent="canplaythrough",s._navigator=typeof window<"u"&&window.navigator?window.navigator:null,s.masterGain=null,s.noAudio=!1,s.usingWebAudio=!0,s.autoSuspend=!0,s.ctx=null,s.autoUnlock=!0,s._setup(),s},volume:function(s){var o=this||e;if(s=parseFloat(s),o.ctx||d(),typeof s<"u"&&s>=0&&s<=1){if(o._volume=s,o._muted)return o;o.usingWebAudio&&o.masterGain.gain.setValueAtTime(s,e.ctx.currentTime);for(var u=0;u<o._howls.length;u++)if(!o._howls[u]._webAudio)for(var f=o._howls[u]._getSoundIds(),g=0;g<f.length;g++){var _=o._howls[u]._soundById(f[g]);_&&_._node&&(_._node.volume=_._volume*s)}return o}return o._volume},mute:function(s){var o=this||e;o.ctx||d(),o._muted=s,o.usingWebAudio&&o.masterGain.gain.setValueAtTime(s?0:o._volume,e.ctx.currentTime);for(var u=0;u<o._howls.length;u++)if(!o._howls[u]._webAudio)for(var f=o._howls[u]._getSoundIds(),g=0;g<f.length;g++){var _=o._howls[u]._soundById(f[g]);_&&_._node&&(_._node.muted=s?!0:_._muted)}return o},stop:function(){for(var s=this||e,o=0;o<s._howls.length;o++)s._howls[o].stop();return s},unload:function(){for(var s=this||e,o=s._howls.length-1;o>=0;o--)s._howls[o].unload();return s.usingWebAudio&&s.ctx&&typeof s.ctx.close<"u"&&(s.ctx.close(),s.ctx=null,d()),s},codecs:function(s){return(this||e)._codecs[s.replace(/^x-/,"")]},_setup:function(){var s=this||e;if(s.state=s.ctx&&s.ctx.state||"suspended",s._autoSuspend(),!s.usingWebAudio)if(typeof Audio<"u")try{var o=new Audio;typeof o.oncanplaythrough>"u"&&(s._canPlayEvent="canplay")}catch{s.noAudio=!0}else s.noAudio=!0;try{var o=new Audio;o.muted&&(s.noAudio=!0)}catch{}return s.noAudio||s._setupCodecs(),s},_setupCodecs:function(){var s=this||e,o=null;try{o=typeof Audio<"u"?new Audio:null}catch{return s}if(!o||typeof o.canPlayType!="function")return s;var u=o.canPlayType("audio/mpeg;").replace(/^no$/,""),f=s._navigator?s._navigator.userAgent:"",g=f.match(/OPR\/(\d+)/g),_=g&&parseInt(g[0].split("/")[1],10)<33,p=f.indexOf("Safari")!==-1&&f.indexOf("Chrome")===-1,m=f.match(/Version\/(.*?) /),y=p&&m&&parseInt(m[1],10)<15;return s._codecs={mp3:!!(!_&&(u||o.canPlayType("audio/mp3;").replace(/^no$/,""))),mpeg:!!u,opus:!!o.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),ogg:!!o.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),oga:!!o.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),wav:!!(o.canPlayType('audio/wav; codecs="1"')||o.canPlayType("audio/wav")).replace(/^no$/,""),aac:!!o.canPlayType("audio/aac;").replace(/^no$/,""),caf:!!o.canPlayType("audio/x-caf;").replace(/^no$/,""),m4a:!!(o.canPlayType("audio/x-m4a;")||o.canPlayType("audio/m4a;")||o.canPlayType("audio/aac;")).replace(/^no$/,""),m4b:!!(o.canPlayType("audio/x-m4b;")||o.canPlayType("audio/m4b;")||o.canPlayType("audio/aac;")).replace(/^no$/,""),mp4:!!(o.canPlayType("audio/x-mp4;")||o.canPlayType("audio/mp4;")||o.canPlayType("audio/aac;")).replace(/^no$/,""),weba:!!(!y&&o.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")),webm:!!(!y&&o.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")),dolby:!!o.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/,""),flac:!!(o.canPlayType("audio/x-flac;")||o.canPlayType("audio/flac;")).replace(/^no$/,"")},s},_unlockAudio:function(){var s=this||e;if(!(s._audioUnlocked||!s.ctx)){s._audioUnlocked=!1,s.autoUnlock=!1,!s._mobileUnloaded&&s.ctx.sampleRate!==44100&&(s._mobileUnloaded=!0,s.unload()),s._scratchBuffer=s.ctx.createBuffer(1,1,22050);var o=function(u){for(;s._html5AudioPool.length<s.html5PoolSize;)try{var f=new Audio;f._unlocked=!0,s._releaseHtml5Audio(f)}catch{s.noAudio=!0;break}for(var g=0;g<s._howls.length;g++)if(!s._howls[g]._webAudio)for(var _=s._howls[g]._getSoundIds(),p=0;p<_.length;p++){var m=s._howls[g]._soundById(_[p]);m&&m._node&&!m._node._unlocked&&(m._node._unlocked=!0,m._node.load())}s._autoResume();var y=s.ctx.createBufferSource();y.buffer=s._scratchBuffer,y.connect(s.ctx.destination),typeof y.start>"u"?y.noteOn(0):y.start(0),typeof s.ctx.resume=="function"&&s.ctx.resume(),y.onended=function(){y.disconnect(0),s._audioUnlocked=!0,document.removeEventListener("touchstart",o,!0),document.removeEventListener("touchend",o,!0),document.removeEventListener("click",o,!0),document.removeEventListener("keydown",o,!0);for(var v=0;v<s._howls.length;v++)s._howls[v]._emit("unlock")}};return document.addEventListener("touchstart",o,!0),document.addEventListener("touchend",o,!0),document.addEventListener("click",o,!0),document.addEventListener("keydown",o,!0),s}},_obtainHtml5Audio:function(){var s=this||e;if(s._html5AudioPool.length)return s._html5AudioPool.pop();var o=new Audio().play();return o&&typeof Promise<"u"&&(o instanceof Promise||typeof o.then=="function")&&o.catch(function(){console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.")}),new Audio},_releaseHtml5Audio:function(s){var o=this||e;return s._unlocked&&o._html5AudioPool.push(s),o},_autoSuspend:function(){var s=this;if(!(!s.autoSuspend||!s.ctx||typeof s.ctx.suspend>"u"||!e.usingWebAudio)){for(var o=0;o<s._howls.length;o++)if(s._howls[o]._webAudio){for(var u=0;u<s._howls[o]._sounds.length;u++)if(!s._howls[o]._sounds[u]._paused)return s}return s._suspendTimer&&clearTimeout(s._suspendTimer),s._suspendTimer=setTimeout(function(){if(s.autoSuspend){s._suspendTimer=null,s.state="suspending";var f=function(){s.state="suspended",s._resumeAfterSuspend&&(delete s._resumeAfterSuspend,s._autoResume())};s.ctx.suspend().then(f,f)}},3e4),s}},_autoResume:function(){var s=this;if(!(!s.ctx||typeof s.ctx.resume>"u"||!e.usingWebAudio))return s.state==="running"&&s.ctx.state!=="interrupted"&&s._suspendTimer?(clearTimeout(s._suspendTimer),s._suspendTimer=null):s.state==="suspended"||s.state==="running"&&s.ctx.state==="interrupted"?(s.ctx.resume().then(function(){s.state="running";for(var o=0;o<s._howls.length;o++)s._howls[o]._emit("resume")}),s._suspendTimer&&(clearTimeout(s._suspendTimer),s._suspendTimer=null)):s.state==="suspending"&&(s._resumeAfterSuspend=!0),s}};var e=new i,t=function(s){var o=this;if(!s.src||s.src.length===0){console.error("An array of source files must be passed with any new Howl.");return}o.init(s)};t.prototype={init:function(s){var o=this;return e.ctx||d(),o._autoplay=s.autoplay||!1,o._format=typeof s.format!="string"?s.format:[s.format],o._html5=s.html5||!1,o._muted=s.mute||!1,o._loop=s.loop||!1,o._pool=s.pool||5,o._preload=typeof s.preload=="boolean"||s.preload==="metadata"?s.preload:!0,o._rate=s.rate||1,o._sprite=s.sprite||{},o._src=typeof s.src!="string"?s.src:[s.src],o._volume=s.volume!==void 0?s.volume:1,o._xhr={method:s.xhr&&s.xhr.method?s.xhr.method:"GET",headers:s.xhr&&s.xhr.headers?s.xhr.headers:null,withCredentials:s.xhr&&s.xhr.withCredentials?s.xhr.withCredentials:!1},o._duration=0,o._state="unloaded",o._sounds=[],o._endTimers={},o._queue=[],o._playLock=!1,o._onend=s.onend?[{fn:s.onend}]:[],o._onfade=s.onfade?[{fn:s.onfade}]:[],o._onload=s.onload?[{fn:s.onload}]:[],o._onloaderror=s.onloaderror?[{fn:s.onloaderror}]:[],o._onplayerror=s.onplayerror?[{fn:s.onplayerror}]:[],o._onpause=s.onpause?[{fn:s.onpause}]:[],o._onplay=s.onplay?[{fn:s.onplay}]:[],o._onstop=s.onstop?[{fn:s.onstop}]:[],o._onmute=s.onmute?[{fn:s.onmute}]:[],o._onvolume=s.onvolume?[{fn:s.onvolume}]:[],o._onrate=s.onrate?[{fn:s.onrate}]:[],o._onseek=s.onseek?[{fn:s.onseek}]:[],o._onunlock=s.onunlock?[{fn:s.onunlock}]:[],o._onresume=[],o._webAudio=e.usingWebAudio&&!o._html5,typeof e.ctx<"u"&&e.ctx&&e.autoUnlock&&e._unlockAudio(),e._howls.push(o),o._autoplay&&o._queue.push({event:"play",action:function(){o.play()}}),o._preload&&o._preload!=="none"&&o.load(),o},load:function(){var s=this,o=null;if(e.noAudio){s._emit("loaderror",null,"No audio support.");return}typeof s._src=="string"&&(s._src=[s._src]);for(var u=0;u<s._src.length;u++){var f,g;if(s._format&&s._format[u])f=s._format[u];else{if(g=s._src[u],typeof g!="string"){s._emit("loaderror",null,"Non-string found in selected audio sources - ignoring.");continue}f=/^data:audio\/([^;,]+);/i.exec(g),f||(f=/\.([^.]+)$/.exec(g.split("?",1)[0])),f&&(f=f[1].toLowerCase())}if(f||console.warn('No file extension was found. Consider using the "format" property or specify an extension.'),f&&e.codecs(f)){o=s._src[u];break}}if(!o){s._emit("loaderror",null,"No codec support for selected audio sources.");return}return s._src=o,s._state="loading",window.location.protocol==="https:"&&o.slice(0,5)==="http:"&&(s._html5=!0,s._webAudio=!1),new n(s),s._webAudio&&a(s),s},play:function(s,o){var u=this,f=null;if(typeof s=="number")f=s,s=null;else{if(typeof s=="string"&&u._state==="loaded"&&!u._sprite[s])return null;if(typeof s>"u"&&(s="__default",!u._playLock)){for(var g=0,_=0;_<u._sounds.length;_++)u._sounds[_]._paused&&!u._sounds[_]._ended&&(g++,f=u._sounds[_]._id);g===1?s=null:f=null}}var p=f?u._soundById(f):u._inactiveSound();if(!p)return null;if(f&&!s&&(s=p._sprite||"__default"),u._state!=="loaded"){p._sprite=s,p._ended=!1;var m=p._id;return u._queue.push({event:"play",action:function(){u.play(m)}}),m}if(f&&!p._paused)return o||u._loadQueue("play"),p._id;u._webAudio&&e._autoResume();var y=Math.max(0,p._seek>0?p._seek:u._sprite[s][0]/1e3),v=Math.max(0,(u._sprite[s][0]+u._sprite[s][1])/1e3-y),w=v*1e3/Math.abs(p._rate),C=u._sprite[s][0]/1e3,T=(u._sprite[s][0]+u._sprite[s][1])/1e3;p._sprite=s,p._ended=!1;var A=function(){p._paused=!1,p._seek=y,p._start=C,p._stop=T,p._loop=!!(p._loop||u._sprite[s][2])};if(y>=T){u._ended(p);return}var D=p._node;if(u._webAudio){var S=function(){u._playLock=!1,A(),u._refreshBuffer(p);var ee=p._muted||u._muted?0:p._volume;D.gain.setValueAtTime(ee,e.ctx.currentTime),p._playStart=e.ctx.currentTime,typeof D.bufferSource.start>"u"?p._loop?D.bufferSource.noteGrainOn(0,y,86400):D.bufferSource.noteGrainOn(0,y,v):p._loop?D.bufferSource.start(0,y,86400):D.bufferSource.start(0,y,v),w!==1/0&&(u._endTimers[p._id]=setTimeout(u._ended.bind(u,p),w)),o||setTimeout(function(){u._emit("play",p._id),u._loadQueue()},0)};e.state==="running"&&e.ctx.state!=="interrupted"?S():(u._playLock=!0,u.once("resume",S),u._clearTimer(p._id))}else{var E=function(){D.currentTime=y,D.muted=p._muted||u._muted||e._muted||D.muted,D.volume=p._volume*e.volume(),D.playbackRate=p._rate;try{var ee=D.play();if(ee&&typeof Promise<"u"&&(ee instanceof Promise||typeof ee.then=="function")?(u._playLock=!0,A(),ee.then(function(){u._playLock=!1,D._unlocked=!0,o?u._loadQueue():u._emit("play",p._id)}).catch(function(){u._playLock=!1,u._emit("playerror",p._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."),p._ended=!0,p._paused=!0})):o||(u._playLock=!1,A(),u._emit("play",p._id)),D.playbackRate=p._rate,D.paused){u._emit("playerror",p._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");return}s!=="__default"||p._loop?u._endTimers[p._id]=setTimeout(u._ended.bind(u,p),w):(u._endTimers[p._id]=function(){u._ended(p),D.removeEventListener("ended",u._endTimers[p._id],!1)},D.addEventListener("ended",u._endTimers[p._id],!1))}catch(L){u._emit("playerror",p._id,L)}};D.src==="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA"&&(D.src=u._src,D.load());var k=window&&window.ejecta||!D.readyState&&e._navigator.isCocoonJS;if(D.readyState>=3||k)E();else{u._playLock=!0,u._state="loading";var q=function(){u._state="loaded",E(),D.removeEventListener(e._canPlayEvent,q,!1)};D.addEventListener(e._canPlayEvent,q,!1),u._clearTimer(p._id)}}return p._id},pause:function(s){var o=this;if(o._state!=="loaded"||o._playLock)return o._queue.push({event:"pause",action:function(){o.pause(s)}}),o;for(var u=o._getSoundIds(s),f=0;f<u.length;f++){o._clearTimer(u[f]);var g=o._soundById(u[f]);if(g&&!g._paused&&(g._seek=o.seek(u[f]),g._rateSeek=0,g._paused=!0,o._stopFade(u[f]),g._node))if(o._webAudio){if(!g._node.bufferSource)continue;typeof g._node.bufferSource.stop>"u"?g._node.bufferSource.noteOff(0):g._node.bufferSource.stop(0),o._cleanBuffer(g._node)}else(!isNaN(g._node.duration)||g._node.duration===1/0)&&g._node.pause();arguments[1]||o._emit("pause",g?g._id:null)}return o},stop:function(s,o){var u=this;if(u._state!=="loaded"||u._playLock)return u._queue.push({event:"stop",action:function(){u.stop(s)}}),u;for(var f=u._getSoundIds(s),g=0;g<f.length;g++){u._clearTimer(f[g]);var _=u._soundById(f[g]);_&&(_._seek=_._start||0,_._rateSeek=0,_._paused=!0,_._ended=!0,u._stopFade(f[g]),_._node&&(u._webAudio?_._node.bufferSource&&(typeof _._node.bufferSource.stop>"u"?_._node.bufferSource.noteOff(0):_._node.bufferSource.stop(0),u._cleanBuffer(_._node)):(!isNaN(_._node.duration)||_._node.duration===1/0)&&(_._node.currentTime=_._start||0,_._node.pause(),_._node.duration===1/0&&u._clearSound(_._node))),o||u._emit("stop",_._id))}return u},mute:function(s,o){var u=this;if(u._state!=="loaded"||u._playLock)return u._queue.push({event:"mute",action:function(){u.mute(s,o)}}),u;if(typeof o>"u")if(typeof s=="boolean")u._muted=s;else return u._muted;for(var f=u._getSoundIds(o),g=0;g<f.length;g++){var _=u._soundById(f[g]);_&&(_._muted=s,_._interval&&u._stopFade(_._id),u._webAudio&&_._node?_._node.gain.setValueAtTime(s?0:_._volume,e.ctx.currentTime):_._node&&(_._node.muted=e._muted?!0:s),u._emit("mute",_._id))}return u},volume:function(){var s=this,o=arguments,u,f;if(o.length===0)return s._volume;if(o.length===1||o.length===2&&typeof o[1]>"u"){var g=s._getSoundIds(),_=g.indexOf(o[0]);_>=0?f=parseInt(o[0],10):u=parseFloat(o[0])}else o.length>=2&&(u=parseFloat(o[0]),f=parseInt(o[1],10));var p;if(typeof u<"u"&&u>=0&&u<=1){if(s._state!=="loaded"||s._playLock)return s._queue.push({event:"volume",action:function(){s.volume.apply(s,o)}}),s;typeof f>"u"&&(s._volume=u),f=s._getSoundIds(f);for(var m=0;m<f.length;m++)p=s._soundById(f[m]),p&&(p._volume=u,o[2]||s._stopFade(f[m]),s._webAudio&&p._node&&!p._muted?p._node.gain.setValueAtTime(u,e.ctx.currentTime):p._node&&!p._muted&&(p._node.volume=u*e.volume()),s._emit("volume",p._id))}else return p=f?s._soundById(f):s._sounds[0],p?p._volume:0;return s},fade:function(s,o,u,f){var g=this;if(g._state!=="loaded"||g._playLock)return g._queue.push({event:"fade",action:function(){g.fade(s,o,u,f)}}),g;s=Math.min(Math.max(0,parseFloat(s)),1),o=Math.min(Math.max(0,parseFloat(o)),1),u=parseFloat(u),g.volume(s,f);for(var _=g._getSoundIds(f),p=0;p<_.length;p++){var m=g._soundById(_[p]);if(m){if(f||g._stopFade(_[p]),g._webAudio&&!m._muted){var y=e.ctx.currentTime,v=y+u/1e3;m._volume=s,m._node.gain.setValueAtTime(s,y),m._node.gain.linearRampToValueAtTime(o,v)}g._startFadeInterval(m,s,o,u,_[p],typeof f>"u")}}return g},_startFadeInterval:function(s,o,u,f,g,_){var p=this,m=o,y=u-o,v=Math.abs(y/.01),w=Math.max(4,v>0?f/v:f),C=Date.now();s._fadeTo=u,s._interval=setInterval(function(){var T=(Date.now()-C)/f;C=Date.now(),m+=y*T,m=Math.round(m*100)/100,y<0?m=Math.max(u,m):m=Math.min(u,m),p._webAudio?s._volume=m:p.volume(m,s._id,!0),_&&(p._volume=m),(u<o&&m<=u||u>o&&m>=u)&&(clearInterval(s._interval),s._interval=null,s._fadeTo=null,p.volume(u,s._id),p._emit("fade",s._id))},w)},_stopFade:function(s){var o=this,u=o._soundById(s);return u&&u._interval&&(o._webAudio&&u._node.gain.cancelScheduledValues(e.ctx.currentTime),clearInterval(u._interval),u._interval=null,o.volume(u._fadeTo,s),u._fadeTo=null,o._emit("fade",s)),o},loop:function(){var s=this,o=arguments,u,f,g;if(o.length===0)return s._loop;if(o.length===1)if(typeof o[0]=="boolean")u=o[0],s._loop=u;else return g=s._soundById(parseInt(o[0],10)),g?g._loop:!1;else o.length===2&&(u=o[0],f=parseInt(o[1],10));for(var _=s._getSoundIds(f),p=0;p<_.length;p++)g=s._soundById(_[p]),g&&(g._loop=u,s._webAudio&&g._node&&g._node.bufferSource&&(g._node.bufferSource.loop=u,u&&(g._node.bufferSource.loopStart=g._start||0,g._node.bufferSource.loopEnd=g._stop,s.playing(_[p])&&(s.pause(_[p],!0),s.play(_[p],!0)))));return s},rate:function(){var s=this,o=arguments,u,f;if(o.length===0)f=s._sounds[0]._id;else if(o.length===1){var g=s._getSoundIds(),_=g.indexOf(o[0]);_>=0?f=parseInt(o[0],10):u=parseFloat(o[0])}else o.length===2&&(u=parseFloat(o[0]),f=parseInt(o[1],10));var p;if(typeof u=="number"){if(s._state!=="loaded"||s._playLock)return s._queue.push({event:"rate",action:function(){s.rate.apply(s,o)}}),s;typeof f>"u"&&(s._rate=u),f=s._getSoundIds(f);for(var m=0;m<f.length;m++)if(p=s._soundById(f[m]),p){s.playing(f[m])&&(p._rateSeek=s.seek(f[m]),p._playStart=s._webAudio?e.ctx.currentTime:p._playStart),p._rate=u,s._webAudio&&p._node&&p._node.bufferSource?p._node.bufferSource.playbackRate.setValueAtTime(u,e.ctx.currentTime):p._node&&(p._node.playbackRate=u);var y=s.seek(f[m]),v=(s._sprite[p._sprite][0]+s._sprite[p._sprite][1])/1e3-y,w=v*1e3/Math.abs(p._rate);(s._endTimers[f[m]]||!p._paused)&&(s._clearTimer(f[m]),s._endTimers[f[m]]=setTimeout(s._ended.bind(s,p),w)),s._emit("rate",p._id)}}else return p=s._soundById(f),p?p._rate:s._rate;return s},seek:function(){var s=this,o=arguments,u,f;if(o.length===0)s._sounds.length&&(f=s._sounds[0]._id);else if(o.length===1){var g=s._getSoundIds(),_=g.indexOf(o[0]);_>=0?f=parseInt(o[0],10):s._sounds.length&&(f=s._sounds[0]._id,u=parseFloat(o[0]))}else o.length===2&&(u=parseFloat(o[0]),f=parseInt(o[1],10));if(typeof f>"u")return 0;if(typeof u=="number"&&(s._state!=="loaded"||s._playLock))return s._queue.push({event:"seek",action:function(){s.seek.apply(s,o)}}),s;var p=s._soundById(f);if(p)if(typeof u=="number"&&u>=0){var m=s.playing(f);m&&s.pause(f,!0),p._seek=u,p._ended=!1,s._clearTimer(f),!s._webAudio&&p._node&&!isNaN(p._node.duration)&&(p._node.currentTime=u);var y=function(){m&&s.play(f,!0),s._emit("seek",f)};if(m&&!s._webAudio){var v=function(){s._playLock?setTimeout(v,0):y()};setTimeout(v,0)}else y()}else if(s._webAudio){var w=s.playing(f)?e.ctx.currentTime-p._playStart:0,C=p._rateSeek?p._rateSeek-p._seek:0;return p._seek+(C+w*Math.abs(p._rate))}else return p._node.currentTime;return s},playing:function(s){var o=this;if(typeof s=="number"){var u=o._soundById(s);return u?!u._paused:!1}for(var f=0;f<o._sounds.length;f++)if(!o._sounds[f]._paused)return!0;return!1},duration:function(s){var o=this,u=o._duration,f=o._soundById(s);return f&&(u=o._sprite[f._sprite][1]/1e3),u},state:function(){return this._state},unload:function(){for(var s=this,o=s._sounds,u=0;u<o.length;u++)o[u]._paused||s.stop(o[u]._id),s._webAudio||(s._clearSound(o[u]._node),o[u]._node.removeEventListener("error",o[u]._errorFn,!1),o[u]._node.removeEventListener(e._canPlayEvent,o[u]._loadFn,!1),o[u]._node.removeEventListener("ended",o[u]._endFn,!1),e._releaseHtml5Audio(o[u]._node)),delete o[u]._node,s._clearTimer(o[u]._id);var f=e._howls.indexOf(s);f>=0&&e._howls.splice(f,1);var g=!0;for(u=0;u<e._howls.length;u++)if(e._howls[u]._src===s._src||s._src.indexOf(e._howls[u]._src)>=0){g=!1;break}return r&&g&&delete r[s._src],e.noAudio=!1,s._state="unloaded",s._sounds=[],s=null,null},on:function(s,o,u,f){var g=this,_=g["_on"+s];return typeof o=="function"&&_.push(f?{id:u,fn:o,once:f}:{id:u,fn:o}),g},off:function(s,o,u){var f=this,g=f["_on"+s],_=0;if(typeof o=="number"&&(u=o,o=null),o||u)for(_=0;_<g.length;_++){var p=u===g[_].id;if(o===g[_].fn&&p||!o&&p){g.splice(_,1);break}}else if(s)f["_on"+s]=[];else{var m=Object.keys(f);for(_=0;_<m.length;_++)m[_].indexOf("_on")===0&&Array.isArray(f[m[_]])&&(f[m[_]]=[])}return f},once:function(s,o,u){var f=this;return f.on(s,o,u,1),f},_emit:function(s,o,u){for(var f=this,g=f["_on"+s],_=g.length-1;_>=0;_--)(!g[_].id||g[_].id===o||s==="load")&&(setTimeout(function(p){p.call(this,o,u)}.bind(f,g[_].fn),0),g[_].once&&f.off(s,g[_].fn,g[_].id));return f._loadQueue(s),f},_loadQueue:function(s){var o=this;if(o._queue.length>0){var u=o._queue[0];u.event===s&&(o._queue.shift(),o._loadQueue()),s||u.action()}return o},_ended:function(s){var o=this,u=s._sprite;if(!o._webAudio&&s._node&&!s._node.paused&&!s._node.ended&&s._node.currentTime<s._stop)return setTimeout(o._ended.bind(o,s),100),o;var f=!!(s._loop||o._sprite[u][2]);if(o._emit("end",s._id),!o._webAudio&&f&&o.stop(s._id,!0).play(s._id),o._webAudio&&f){o._emit("play",s._id),s._seek=s._start||0,s._rateSeek=0,s._playStart=e.ctx.currentTime;var g=(s._stop-s._start)*1e3/Math.abs(s._rate);o._endTimers[s._id]=setTimeout(o._ended.bind(o,s),g)}return o._webAudio&&!f&&(s._paused=!0,s._ended=!0,s._seek=s._start||0,s._rateSeek=0,o._clearTimer(s._id),o._cleanBuffer(s._node),e._autoSuspend()),!o._webAudio&&!f&&o.stop(s._id,!0),o},_clearTimer:function(s){var o=this;if(o._endTimers[s]){if(typeof o._endTimers[s]!="function")clearTimeout(o._endTimers[s]);else{var u=o._soundById(s);u&&u._node&&u._node.removeEventListener("ended",o._endTimers[s],!1)}delete o._endTimers[s]}return o},_soundById:function(s){for(var o=this,u=0;u<o._sounds.length;u++)if(s===o._sounds[u]._id)return o._sounds[u];return null},_inactiveSound:function(){var s=this;s._drain();for(var o=0;o<s._sounds.length;o++)if(s._sounds[o]._ended)return s._sounds[o].reset();return new n(s)},_drain:function(){var s=this,o=s._pool,u=0,f=0;if(!(s._sounds.length<o)){for(f=0;f<s._sounds.length;f++)s._sounds[f]._ended&&u++;for(f=s._sounds.length-1;f>=0;f--){if(u<=o)return;s._sounds[f]._ended&&(s._webAudio&&s._sounds[f]._node&&s._sounds[f]._node.disconnect(0),s._sounds.splice(f,1),u--)}}},_getSoundIds:function(s){var o=this;if(typeof s>"u"){for(var u=[],f=0;f<o._sounds.length;f++)u.push(o._sounds[f]._id);return u}else return[s]},_refreshBuffer:function(s){var o=this;return s._node.bufferSource=e.ctx.createBufferSource(),s._node.bufferSource.buffer=r[o._src],s._panner?s._node.bufferSource.connect(s._panner):s._node.bufferSource.connect(s._node),s._node.bufferSource.loop=s._loop,s._loop&&(s._node.bufferSource.loopStart=s._start||0,s._node.bufferSource.loopEnd=s._stop||0),s._node.bufferSource.playbackRate.setValueAtTime(s._rate,e.ctx.currentTime),o},_cleanBuffer:function(s){var o=this,u=e._navigator&&e._navigator.vendor.indexOf("Apple")>=0;if(!s.bufferSource)return o;if(e._scratchBuffer&&s.bufferSource&&(s.bufferSource.onended=null,s.bufferSource.disconnect(0),u))try{s.bufferSource.buffer=e._scratchBuffer}catch{}return s.bufferSource=null,o},_clearSound:function(s){var o=/MSIE |Trident\//.test(e._navigator&&e._navigator.userAgent);o||(s.src="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA")}};var n=function(s){this._parent=s,this.init()};n.prototype={init:function(){var s=this,o=s._parent;return s._muted=o._muted,s._loop=o._loop,s._volume=o._volume,s._rate=o._rate,s._seek=0,s._paused=!0,s._ended=!0,s._sprite="__default",s._id=++e._counter,o._sounds.push(s),s.create(),s},create:function(){var s=this,o=s._parent,u=e._muted||s._muted||s._parent._muted?0:s._volume;return o._webAudio?(s._node=typeof e.ctx.createGain>"u"?e.ctx.createGainNode():e.ctx.createGain(),s._node.gain.setValueAtTime(u,e.ctx.currentTime),s._node.paused=!0,s._node.connect(e.masterGain)):e.noAudio||(s._node=e._obtainHtml5Audio(),s._errorFn=s._errorListener.bind(s),s._node.addEventListener("error",s._errorFn,!1),s._loadFn=s._loadListener.bind(s),s._node.addEventListener(e._canPlayEvent,s._loadFn,!1),s._endFn=s._endListener.bind(s),s._node.addEventListener("ended",s._endFn,!1),s._node.src=o._src,s._node.preload=o._preload===!0?"auto":o._preload,s._node.volume=u*e.volume(),s._node.load()),s},reset:function(){var s=this,o=s._parent;return s._muted=o._muted,s._loop=o._loop,s._volume=o._volume,s._rate=o._rate,s._seek=0,s._rateSeek=0,s._paused=!0,s._ended=!0,s._sprite="__default",s._id=++e._counter,s},_errorListener:function(){var s=this;s._parent._emit("loaderror",s._id,s._node.error?s._node.error.code:0),s._node.removeEventListener("error",s._errorFn,!1)},_loadListener:function(){var s=this,o=s._parent;o._duration=Math.ceil(s._node.duration*10)/10,Object.keys(o._sprite).length===0&&(o._sprite={__default:[0,o._duration*1e3]}),o._state!=="loaded"&&(o._state="loaded",o._emit("load"),o._loadQueue()),s._node.removeEventListener(e._canPlayEvent,s._loadFn,!1)},_endListener:function(){var s=this,o=s._parent;o._duration===1/0&&(o._duration=Math.ceil(s._node.duration*10)/10,o._sprite.__default[1]===1/0&&(o._sprite.__default[1]=o._duration*1e3),o._ended(s)),s._node.removeEventListener("ended",s._endFn,!1)}};var r={},a=function(s){var o=s._src;if(r[o]){s._duration=r[o].duration,h(s);return}if(/^data:[^;]+;base64,/.test(o)){for(var u=atob(o.split(",")[1]),f=new Uint8Array(u.length),g=0;g<u.length;++g)f[g]=u.charCodeAt(g);l(f.buffer,s)}else{var _=new XMLHttpRequest;_.open(s._xhr.method,o,!0),_.withCredentials=s._xhr.withCredentials,_.responseType="arraybuffer",s._xhr.headers&&Object.keys(s._xhr.headers).forEach(function(p){_.setRequestHeader(p,s._xhr.headers[p])}),_.onload=function(){var p=(_.status+"")[0];if(p!=="0"&&p!=="2"&&p!=="3"){s._emit("loaderror",null,"Failed loading audio file with status: "+_.status+".");return}l(_.response,s)},_.onerror=function(){s._webAudio&&(s._html5=!0,s._webAudio=!1,s._sounds=[],delete r[o],s.load())},c(_)}},c=function(s){try{s.send()}catch{s.onerror()}},l=function(s,o){var u=function(){o._emit("loaderror",null,"Decoding audio data failed.")},f=function(g){g&&o._sounds.length>0?(r[o._src]=g,h(o,g)):u()};typeof Promise<"u"&&e.ctx.decodeAudioData.length===1?e.ctx.decodeAudioData(s).then(f).catch(u):e.ctx.decodeAudioData(s,f,u)},h=function(s,o){o&&!s._duration&&(s._duration=o.duration),Object.keys(s._sprite).length===0&&(s._sprite={__default:[0,s._duration*1e3]}),s._state!=="loaded"&&(s._state="loaded",s._emit("load"),s._loadQueue())},d=function(){if(e.usingWebAudio){try{typeof AudioContext<"u"?e.ctx=new AudioContext:typeof webkitAudioContext<"u"?e.ctx=new webkitAudioContext:e.usingWebAudio=!1}catch{e.usingWebAudio=!1}e.ctx||(e.usingWebAudio=!1);var s=/iP(hone|od|ad)/.test(e._navigator&&e._navigator.platform),o=e._navigator&&e._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),u=o?parseInt(o[1],10):null;if(s&&u&&u<9){var f=/safari/.test(e._navigator&&e._navigator.userAgent.toLowerCase());e._navigator&&!f&&(e.usingWebAudio=!1)}e.usingWebAudio&&(e.masterGain=typeof e.ctx.createGain>"u"?e.ctx.createGainNode():e.ctx.createGain(),e.masterGain.gain.setValueAtTime(e._muted?0:e._volume,e.ctx.currentTime),e.masterGain.connect(e.ctx.destination)),e._setup()}};typeof define=="function"&&define.amd&&define([],function(){return{Howler:e,Howl:t}}),typeof Wi<"u"&&(Wi.Howler=e,Wi.Howl=t),typeof global<"u"?(global.HowlerGlobal=i,global.Howler=e,global.Howl=t,global.Sound=n):typeof window<"u"&&(window.HowlerGlobal=i,window.Howler=e,window.Howl=t,window.Sound=n)})();(function(){"use strict";HowlerGlobal.prototype._pos=[0,0,0],HowlerGlobal.prototype._orientation=[0,0,-1,0,1,0],HowlerGlobal.prototype.stereo=function(e){var t=this;if(!t.ctx||!t.ctx.listener)return t;for(var n=t._howls.length-1;n>=0;n--)t._howls[n].stereo(e);return t},HowlerGlobal.prototype.pos=function(e,t,n){var r=this;if(!r.ctx||!r.ctx.listener)return r;if(t=typeof t!="number"?r._pos[1]:t,n=typeof n!="number"?r._pos[2]:n,typeof e=="number")r._pos=[e,t,n],typeof r.ctx.listener.positionX<"u"?(r.ctx.listener.positionX.setTargetAtTime(r._pos[0],Howler.ctx.currentTime,.1),r.ctx.listener.positionY.setTargetAtTime(r._pos[1],Howler.ctx.currentTime,.1),r.ctx.listener.positionZ.setTargetAtTime(r._pos[2],Howler.ctx.currentTime,.1)):r.ctx.listener.setPosition(r._pos[0],r._pos[1],r._pos[2]);else return r._pos;return r},HowlerGlobal.prototype.orientation=function(e,t,n,r,a,c){var l=this;if(!l.ctx||!l.ctx.listener)return l;var h=l._orientation;if(t=typeof t!="number"?h[1]:t,n=typeof n!="number"?h[2]:n,r=typeof r!="number"?h[3]:r,a=typeof a!="number"?h[4]:a,c=typeof c!="number"?h[5]:c,typeof e=="number")l._orientation=[e,t,n,r,a,c],typeof l.ctx.listener.forwardX<"u"?(l.ctx.listener.forwardX.setTargetAtTime(e,Howler.ctx.currentTime,.1),l.ctx.listener.forwardY.setTargetAtTime(t,Howler.ctx.currentTime,.1),l.ctx.listener.forwardZ.setTargetAtTime(n,Howler.ctx.currentTime,.1),l.ctx.listener.upX.setTargetAtTime(r,Howler.ctx.currentTime,.1),l.ctx.listener.upY.setTargetAtTime(a,Howler.ctx.currentTime,.1),l.ctx.listener.upZ.setTargetAtTime(c,Howler.ctx.currentTime,.1)):l.ctx.listener.setOrientation(e,t,n,r,a,c);else return h;return l},Howl.prototype.init=function(e){return function(t){var n=this;return n._orientation=t.orientation||[1,0,0],n._stereo=t.stereo||null,n._pos=t.pos||null,n._pannerAttr={coneInnerAngle:typeof t.coneInnerAngle<"u"?t.coneInnerAngle:360,coneOuterAngle:typeof t.coneOuterAngle<"u"?t.coneOuterAngle:360,coneOuterGain:typeof t.coneOuterGain<"u"?t.coneOuterGain:0,distanceModel:typeof t.distanceModel<"u"?t.distanceModel:"inverse",maxDistance:typeof t.maxDistance<"u"?t.maxDistance:1e4,panningModel:typeof t.panningModel<"u"?t.panningModel:"HRTF",refDistance:typeof t.refDistance<"u"?t.refDistance:1,rolloffFactor:typeof t.rolloffFactor<"u"?t.rolloffFactor:1},n._onstereo=t.onstereo?[{fn:t.onstereo}]:[],n._onpos=t.onpos?[{fn:t.onpos}]:[],n._onorientation=t.onorientation?[{fn:t.onorientation}]:[],e.call(this,t)}}(Howl.prototype.init),Howl.prototype.stereo=function(e,t){var n=this;if(!n._webAudio)return n;if(n._state!=="loaded")return n._queue.push({event:"stereo",action:function(){n.stereo(e,t)}}),n;var r=typeof Howler.ctx.createStereoPanner>"u"?"spatial":"stereo";if(typeof t>"u")if(typeof e=="number")n._stereo=e,n._pos=[e,0,0];else return n._stereo;for(var a=n._getSoundIds(t),c=0;c<a.length;c++){var l=n._soundById(a[c]);if(l)if(typeof e=="number")l._stereo=e,l._pos=[e,0,0],l._node&&(l._pannerAttr.panningModel="equalpower",(!l._panner||!l._panner.pan)&&i(l,r),r==="spatial"?typeof l._panner.positionX<"u"?(l._panner.positionX.setValueAtTime(e,Howler.ctx.currentTime),l._panner.positionY.setValueAtTime(0,Howler.ctx.currentTime),l._panner.positionZ.setValueAtTime(0,Howler.ctx.currentTime)):l._panner.setPosition(e,0,0):l._panner.pan.setValueAtTime(e,Howler.ctx.currentTime)),n._emit("stereo",l._id);else return l._stereo}return n},Howl.prototype.pos=function(e,t,n,r){var a=this;if(!a._webAudio)return a;if(a._state!=="loaded")return a._queue.push({event:"pos",action:function(){a.pos(e,t,n,r)}}),a;if(t=typeof t!="number"?0:t,n=typeof n!="number"?-.5:n,typeof r>"u")if(typeof e=="number")a._pos=[e,t,n];else return a._pos;for(var c=a._getSoundIds(r),l=0;l<c.length;l++){var h=a._soundById(c[l]);if(h)if(typeof e=="number")h._pos=[e,t,n],h._node&&((!h._panner||h._panner.pan)&&i(h,"spatial"),typeof h._panner.positionX<"u"?(h._panner.positionX.setValueAtTime(e,Howler.ctx.currentTime),h._panner.positionY.setValueAtTime(t,Howler.ctx.currentTime),h._panner.positionZ.setValueAtTime(n,Howler.ctx.currentTime)):h._panner.setPosition(e,t,n)),a._emit("pos",h._id);else return h._pos}return a},Howl.prototype.orientation=function(e,t,n,r){var a=this;if(!a._webAudio)return a;if(a._state!=="loaded")return a._queue.push({event:"orientation",action:function(){a.orientation(e,t,n,r)}}),a;if(t=typeof t!="number"?a._orientation[1]:t,n=typeof n!="number"?a._orientation[2]:n,typeof r>"u")if(typeof e=="number")a._orientation=[e,t,n];else return a._orientation;for(var c=a._getSoundIds(r),l=0;l<c.length;l++){var h=a._soundById(c[l]);if(h)if(typeof e=="number")h._orientation=[e,t,n],h._node&&(h._panner||(h._pos||(h._pos=a._pos||[0,0,-.5]),i(h,"spatial")),typeof h._panner.orientationX<"u"?(h._panner.orientationX.setValueAtTime(e,Howler.ctx.currentTime),h._panner.orientationY.setValueAtTime(t,Howler.ctx.currentTime),h._panner.orientationZ.setValueAtTime(n,Howler.ctx.currentTime)):h._panner.setOrientation(e,t,n)),a._emit("orientation",h._id);else return h._orientation}return a},Howl.prototype.pannerAttr=function(){var e=this,t=arguments,n,r,a;if(!e._webAudio)return e;if(t.length===0)return e._pannerAttr;if(t.length===1)if(typeof t[0]=="object")n=t[0],typeof r>"u"&&(n.pannerAttr||(n.pannerAttr={coneInnerAngle:n.coneInnerAngle,coneOuterAngle:n.coneOuterAngle,coneOuterGain:n.coneOuterGain,distanceModel:n.distanceModel,maxDistance:n.maxDistance,refDistance:n.refDistance,rolloffFactor:n.rolloffFactor,panningModel:n.panningModel}),e._pannerAttr={coneInnerAngle:typeof n.pannerAttr.coneInnerAngle<"u"?n.pannerAttr.coneInnerAngle:e._coneInnerAngle,coneOuterAngle:typeof n.pannerAttr.coneOuterAngle<"u"?n.pannerAttr.coneOuterAngle:e._coneOuterAngle,coneOuterGain:typeof n.pannerAttr.coneOuterGain<"u"?n.pannerAttr.coneOuterGain:e._coneOuterGain,distanceModel:typeof n.pannerAttr.distanceModel<"u"?n.pannerAttr.distanceModel:e._distanceModel,maxDistance:typeof n.pannerAttr.maxDistance<"u"?n.pannerAttr.maxDistance:e._maxDistance,refDistance:typeof n.pannerAttr.refDistance<"u"?n.pannerAttr.refDistance:e._refDistance,rolloffFactor:typeof n.pannerAttr.rolloffFactor<"u"?n.pannerAttr.rolloffFactor:e._rolloffFactor,panningModel:typeof n.pannerAttr.panningModel<"u"?n.pannerAttr.panningModel:e._panningModel});else return a=e._soundById(parseInt(t[0],10)),a?a._pannerAttr:e._pannerAttr;else t.length===2&&(n=t[0],r=parseInt(t[1],10));for(var c=e._getSoundIds(r),l=0;l<c.length;l++)if(a=e._soundById(c[l]),a){var h=a._pannerAttr;h={coneInnerAngle:typeof n.coneInnerAngle<"u"?n.coneInnerAngle:h.coneInnerAngle,coneOuterAngle:typeof n.coneOuterAngle<"u"?n.coneOuterAngle:h.coneOuterAngle,coneOuterGain:typeof n.coneOuterGain<"u"?n.coneOuterGain:h.coneOuterGain,distanceModel:typeof n.distanceModel<"u"?n.distanceModel:h.distanceModel,maxDistance:typeof n.maxDistance<"u"?n.maxDistance:h.maxDistance,refDistance:typeof n.refDistance<"u"?n.refDistance:h.refDistance,rolloffFactor:typeof n.rolloffFactor<"u"?n.rolloffFactor:h.rolloffFactor,panningModel:typeof n.panningModel<"u"?n.panningModel:h.panningModel};var d=a._panner;d||(a._pos||(a._pos=e._pos||[0,0,-.5]),i(a,"spatial"),d=a._panner),d.coneInnerAngle=h.coneInnerAngle,d.coneOuterAngle=h.coneOuterAngle,d.coneOuterGain=h.coneOuterGain,d.distanceModel=h.distanceModel,d.maxDistance=h.maxDistance,d.refDistance=h.refDistance,d.rolloffFactor=h.rolloffFactor,d.panningModel=h.panningModel}return e},Sound.prototype.init=function(e){return function(){var t=this,n=t._parent;t._orientation=n._orientation,t._stereo=n._stereo,t._pos=n._pos,t._pannerAttr=n._pannerAttr,e.call(this),t._stereo?n.stereo(t._stereo):t._pos&&n.pos(t._pos[0],t._pos[1],t._pos[2],t._id)}}(Sound.prototype.init),Sound.prototype.reset=function(e){return function(){var t=this,n=t._parent;return t._orientation=n._orientation,t._stereo=n._stereo,t._pos=n._pos,t._pannerAttr=n._pannerAttr,t._stereo?n.stereo(t._stereo):t._pos?n.pos(t._pos[0],t._pos[1],t._pos[2],t._id):t._panner&&(t._panner.disconnect(0),t._panner=void 0,n._refreshBuffer(t)),e.call(this)}}(Sound.prototype.reset);var i=function(e,t){t=t||"spatial",t==="spatial"?(e._panner=Howler.ctx.createPanner(),e._panner.coneInnerAngle=e._pannerAttr.coneInnerAngle,e._panner.coneOuterAngle=e._pannerAttr.coneOuterAngle,e._panner.coneOuterGain=e._pannerAttr.coneOuterGain,e._panner.distanceModel=e._pannerAttr.distanceModel,e._panner.maxDistance=e._pannerAttr.maxDistance,e._panner.refDistance=e._pannerAttr.refDistance,e._panner.rolloffFactor=e._pannerAttr.rolloffFactor,e._panner.panningModel=e._pannerAttr.panningModel,typeof e._panner.positionX<"u"?(e._panner.positionX.setValueAtTime(e._pos[0],Howler.ctx.currentTime),e._panner.positionY.setValueAtTime(e._pos[1],Howler.ctx.currentTime),e._panner.positionZ.setValueAtTime(e._pos[2],Howler.ctx.currentTime)):e._panner.setPosition(e._pos[0],e._pos[1],e._pos[2]),typeof e._panner.orientationX<"u"?(e._panner.orientationX.setValueAtTime(e._orientation[0],Howler.ctx.currentTime),e._panner.orientationY.setValueAtTime(e._orientation[1],Howler.ctx.currentTime),e._panner.orientationZ.setValueAtTime(e._orientation[2],Howler.ctx.currentTime)):e._panner.setOrientation(e._orientation[0],e._orientation[1],e._orientation[2])):(e._panner=Howler.ctx.createStereoPanner(),e._panner.pan.setValueAtTime(e._stereo,Howler.ctx.currentTime)),e._panner.connect(e._node),e._paused||e._parent.pause(e._id,!0).play(e._id,!0)}})()});var Ya=Dc(qa()),Si=null;function Xi(i){let e=Math.floor(i/60),t=Math.floor(i%60);return`${e}:${t.toString().padStart(2,"0")}`}var os=class{constructor(e){this.howl=null;this.rafId=null;this.isDragging=!1;this.dragPct=0;this.pendingSeekTarget=null;this.el=e,this.btn=e.querySelector(".ap-btn"),this.fill=e.querySelector(".ap-bar-fill"),this.track=e.querySelector(".ap-bar"),this.currentEl=e.querySelector(".ap-current"),this.durationEl=e.querySelector(".ap-duration"),this.btn.addEventListener("click",()=>this.toggle()),this.track.addEventListener("mousedown",t=>this.onDragStart(t)),this.track.addEventListener("touchstart",t=>this.onDragStart(t),{passive:!0})}ensureHowl(){return this.howl||(this.howl=new Ya.Howl({src:[this.el.dataset.src],html5:!0,onload:()=>{this.durationEl.textContent=Xi(this.howl.duration())},onend:()=>this.reset(),onloaderror:()=>{this.el.classList.remove("is-playing","is-loading"),this.el.classList.add("has-error")}})),this.howl}toggle(){this.howl?.playing()?this.pause():this.play()}play(){Si&&Si!==this&&Si.pause(),Si=this;let e=this.ensureHowl();this.el.classList.add("is-playing","is-loading"),e.once("play",()=>this.el.classList.remove("is-loading")),e.play(),this.scheduleTick()}pause(){this.howl?.pause(),this.el.classList.remove("is-playing"),this.cancelTick()}onDragStart(e){this.isDragging=!0,this.applyDragVisuals(this.clientXFromEvent(e));let t=r=>{this.applyDragVisuals(this.clientXFromEvent(r))},n=()=>{this.isDragging=!1,document.removeEventListener("mousemove",t),document.removeEventListener("touchmove",t),document.removeEventListener("mouseup",n),document.removeEventListener("touchend",n);let r=this.howl;if(r?.duration()){let a=this.dragPct*r.duration();this.pendingSeekTarget=a,r.seek(a)}};document.addEventListener("mousemove",t),document.addEventListener("touchmove",t,{passive:!0}),document.addEventListener("mouseup",n),document.addEventListener("touchend",n)}clientXFromEvent(e){return e instanceof MouseEvent?e.clientX:e.touches[0].clientX}applyDragVisuals(e){let t=this.track.getBoundingClientRect();this.dragPct=Math.max(0,Math.min(1,(e-t.left)/t.width));let n=this.howl?.duration()||Number(this.el.dataset.duration)||0;this.fill.style.width=`${this.dragPct*100}%`,this.currentEl.textContent=Xi(this.dragPct*n)}scheduleTick(){this.rafId=requestAnimationFrame(()=>this.tick())}cancelTick(){this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null)}tick(){let e=this.howl;if(e){if(!this.isDragging){let t=e.seek(),n=e.duration()||1;if(this.pendingSeekTarget!==null)if(Math.abs(t-this.pendingSeekTarget)<1)this.pendingSeekTarget=null;else{this.fill.style.width=`${this.pendingSeekTarget/n*100}%`,this.currentEl.textContent=Xi(this.pendingSeekTarget),this.scheduleTick();return}this.fill.style.width=`${t/n*100}%`,this.currentEl.textContent=Xi(t)}this.scheduleTick()}}reset(){this.el.classList.remove("is-playing"),this.cancelTick(),this.fill.style.width="0%",this.currentEl.textContent="0:00",this.pendingSeekTarget=null,Si=null}};function Za(){document.querySelectorAll(".audio-player[data-src]").forEach(i=>new os(i))}var Aa="160";var Uc=0,$a=1,Nc=2;var Rl=1,Ta=2,nn=3,Mn=0,wt=1,Vt=2;var vn=0,ci=1,Ja=2,Ka=3,ja=4,Fc=5,In=100,Oc=101,Bc=102,Qa=103,eo=104,zc=200,kc=201,Hc=202,Vc=203,Hs=204,Vs=205,Gc=206,Wc=207,Xc=208,qc=209,Yc=210,Zc=211,$c=212,Jc=213,Kc=214,jc=0,Qc=1,eu=2,vr=3,tu=4,nu=5,iu=6,ru=7,wa=0,su=1,au=2,xn=0,ou=1,lu=2,cu=3,uu=4,hu=5,du=6;var Cl=300,di=301,fi=302,Gs=303,Ws=304,Yr=306,Xs=1e3,Gt=1001,qs=1002,St=1003,to=1004;var ls=1005;var Ft=1006,fu=1007;var Li=1008;var yn=1009,pu=1010,mu=1011,Ra=1012,Ll=1013,mn=1014,gn=1015,Pi=1016,Pl=1017,Il=1018,Un=1020,gu=1021,Wt=1023,_u=1024,vu=1025,Nn=1026,pi=1027,xu=1028,Dl=1029,yu=1030,Ul=1031,Nl=1033,cs=33776,us=33777,hs=33778,ds=33779,no=35840,io=35841,ro=35842,so=35843,Fl=36196,ao=37492,oo=37496,lo=37808,co=37809,uo=37810,ho=37811,fo=37812,po=37813,mo=37814,go=37815,_o=37816,vo=37817,xo=37818,yo=37819,Mo=37820,So=37821,fs=36492,bo=36494,Eo=36495,Mu=36283,Ao=36284,To=36285,wo=36286;var xr=2300,yr=2301,ps=2302,Ro=2400,Co=2401,Lo=2402;var Ol=3e3,Fn=3001,Su=3200,bu=3201,Ca=0,Eu=1,Ot="",ut="srgb",an="srgb-linear",La="display-p3",Zr="display-p3-linear",Mr="linear",Ze="srgb",Sr="rec709",br="p3";var Wn=7680;var Po=519,Au=512,Tu=513,wu=514,Bl=515,Ru=516,Cu=517,Lu=518,Pu=519,Io=35044;var Do="300 es",Ys=1035,sn=2e3,Er=2001,Sn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let r=this._listeners[e];if(r!==void 0){let a=r.indexOf(t);a!==-1&&r.splice(a,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let r=n.slice(0);for(let a=0,c=r.length;a<c;a++)r[a].call(this,e);e.target=null}}},mt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var ms=Math.PI/180,Zs=180/Math.PI;function ki(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(mt[i&255]+mt[i>>8&255]+mt[i>>16&255]+mt[i>>24&255]+"-"+mt[e&255]+mt[e>>8&255]+"-"+mt[e>>16&15|64]+mt[e>>24&255]+"-"+mt[t&63|128]+mt[t>>8&255]+"-"+mt[t>>16&255]+mt[t>>24&255]+mt[n&255]+mt[n>>8&255]+mt[n>>16&255]+mt[n>>24&255]).toLowerCase()}function Tt(i,e,t){return Math.max(e,Math.min(t,i))}function Iu(i,e){return(i%e+e)%e}function gs(i,e,t){return(1-t)*i+t*e}function Uo(i){return(i&i-1)===0&&i!==0}function $s(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function bi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function At(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var He=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Tt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),a=this.x-e.x,c=this.y-e.y;return this.x=a*n-c*r+e.x,this.y=a*r+c*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Be=class i{constructor(e,t,n,r,a,c,l,h,d){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,a,c,l,h,d)}set(e,t,n,r,a,c,l,h,d){let s=this.elements;return s[0]=e,s[1]=r,s[2]=l,s[3]=t,s[4]=a,s[5]=h,s[6]=n,s[7]=c,s[8]=d,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,a=this.elements,c=n[0],l=n[3],h=n[6],d=n[1],s=n[4],o=n[7],u=n[2],f=n[5],g=n[8],_=r[0],p=r[3],m=r[6],y=r[1],v=r[4],w=r[7],C=r[2],T=r[5],A=r[8];return a[0]=c*_+l*y+h*C,a[3]=c*p+l*v+h*T,a[6]=c*m+l*w+h*A,a[1]=d*_+s*y+o*C,a[4]=d*p+s*v+o*T,a[7]=d*m+s*w+o*A,a[2]=u*_+f*y+g*C,a[5]=u*p+f*v+g*T,a[8]=u*m+f*w+g*A,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],a=e[3],c=e[4],l=e[5],h=e[6],d=e[7],s=e[8];return t*c*s-t*l*d-n*a*s+n*l*h+r*a*d-r*c*h}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],a=e[3],c=e[4],l=e[5],h=e[6],d=e[7],s=e[8],o=s*c-l*d,u=l*h-s*a,f=d*a-c*h,g=t*o+n*u+r*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return e[0]=o*_,e[1]=(r*d-s*n)*_,e[2]=(l*n-r*c)*_,e[3]=u*_,e[4]=(s*t-r*h)*_,e[5]=(r*a-l*t)*_,e[6]=f*_,e[7]=(n*h-d*t)*_,e[8]=(c*t-n*a)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,a,c,l){let h=Math.cos(a),d=Math.sin(a);return this.set(n*h,n*d,-n*(h*c+d*l)+c+e,-r*d,r*h,-r*(-d*c+h*l)+l+t,0,0,1),this}scale(e,t){return this.premultiply(_s.makeScale(e,t)),this}rotate(e){return this.premultiply(_s.makeRotation(-e)),this}translate(e,t){return this.premultiply(_s.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},_s=new Be;function zl(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Ar(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Du(){let i=Ar("canvas");return i.style.display="block",i}var No={};function Ri(i){i in No||(No[i]=!0,console.warn(i))}var Fo=new Be().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Oo=new Be().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),qi={[an]:{transfer:Mr,primaries:Sr,toReference:i=>i,fromReference:i=>i},[ut]:{transfer:Ze,primaries:Sr,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Zr]:{transfer:Mr,primaries:br,toReference:i=>i.applyMatrix3(Oo),fromReference:i=>i.applyMatrix3(Fo)},[La]:{transfer:Ze,primaries:br,toReference:i=>i.convertSRGBToLinear().applyMatrix3(Oo),fromReference:i=>i.applyMatrix3(Fo).convertLinearToSRGB()}},Uu=new Set([an,Zr]),We={enabled:!0,_workingColorSpace:an,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!Uu.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;let n=qi[e].toReference,r=qi[t].fromReference;return r(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return qi[i].primaries},getTransfer:function(i){return i===Ot?Mr:qi[i].transfer}};function ui(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function vs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Xn,Tr=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Xn===void 0&&(Xn=Ar("canvas")),Xn.width=e.width,Xn.height=e.height;let n=Xn.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Xn}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Ar("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),a=r.data;for(let c=0;c<a.length;c++)a[c]=ui(a[c]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ui(t[n]/255)*255):t[n]=ui(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Nu=0,wr=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Nu++}),this.uuid=ki(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let c=0,l=r.length;c<l;c++)r[c].isDataTexture?a.push(xs(r[c].image)):a.push(xs(r[c]))}else a=xs(r);n.url=a}return t||(e.images[this.uuid]=n),n}};function xs(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Tr.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Fu=0,Xt=class i extends Sn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Gt,r=Gt,a=Ft,c=Li,l=Wt,h=yn,d=i.DEFAULT_ANISOTROPY,s=Ot){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Fu++}),this.uuid=ki(),this.name="",this.source=new wr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=a,this.minFilter=c,this.anisotropy=d,this.format=l,this.internalFormat=null,this.type=h,this.offset=new He(0,0),this.repeat=new He(1,1),this.center=new He(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Be,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof s=="string"?this.colorSpace=s:(Ri("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=s===Fn?ut:Ot),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Cl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Xs:e.x=e.x-Math.floor(e.x);break;case Gt:e.x=e.x<0?0:1;break;case qs:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Xs:e.y=e.y-Math.floor(e.y);break;case Gt:e.y=e.y<0?0:1;break;case qs:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Ri("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===ut?Fn:Ol}set encoding(e){Ri("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Fn?ut:Ot}};Xt.DEFAULT_IMAGE=null;Xt.DEFAULT_MAPPING=Cl;Xt.DEFAULT_ANISOTROPY=1;var ct=class i{constructor(e=0,t=0,n=0,r=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,a=this.w,c=e.elements;return this.x=c[0]*t+c[4]*n+c[8]*r+c[12]*a,this.y=c[1]*t+c[5]*n+c[9]*r+c[13]*a,this.z=c[2]*t+c[6]*n+c[10]*r+c[14]*a,this.w=c[3]*t+c[7]*n+c[11]*r+c[15]*a,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,a,h=e.elements,d=h[0],s=h[4],o=h[8],u=h[1],f=h[5],g=h[9],_=h[2],p=h[6],m=h[10];if(Math.abs(s-u)<.01&&Math.abs(o-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(s+u)<.1&&Math.abs(o+_)<.1&&Math.abs(g+p)<.1&&Math.abs(d+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let v=(d+1)/2,w=(f+1)/2,C=(m+1)/2,T=(s+u)/4,A=(o+_)/4,D=(g+p)/4;return v>w&&v>C?v<.01?(n=0,r=.707106781,a=.707106781):(n=Math.sqrt(v),r=T/n,a=A/n):w>C?w<.01?(n=.707106781,r=0,a=.707106781):(r=Math.sqrt(w),n=T/r,a=D/r):C<.01?(n=.707106781,r=.707106781,a=0):(a=Math.sqrt(C),n=A/a,r=D/a),this.set(n,r,a,t),this}let y=Math.sqrt((p-g)*(p-g)+(o-_)*(o-_)+(u-s)*(u-s));return Math.abs(y)<.001&&(y=1),this.x=(p-g)/y,this.y=(o-_)/y,this.z=(u-s)/y,this.w=Math.acos((d+f+m-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Js=class extends Sn{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new ct(0,0,e,t),this.scissorTest=!1,this.viewport=new ct(0,0,e,t);let r={width:e,height:t,depth:1};n.encoding!==void 0&&(Ri("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Fn?ut:Ot),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ft,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Xt(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new wr(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},on=class extends Js{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Rr=class extends Xt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=St,this.minFilter=St,this.wrapR=Gt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ks=class extends Xt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=St,this.minFilter=St,this.wrapR=Gt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var bn=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,a,c,l){let h=n[r+0],d=n[r+1],s=n[r+2],o=n[r+3],u=a[c+0],f=a[c+1],g=a[c+2],_=a[c+3];if(l===0){e[t+0]=h,e[t+1]=d,e[t+2]=s,e[t+3]=o;return}if(l===1){e[t+0]=u,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(o!==_||h!==u||d!==f||s!==g){let p=1-l,m=h*u+d*f+s*g+o*_,y=m>=0?1:-1,v=1-m*m;if(v>Number.EPSILON){let C=Math.sqrt(v),T=Math.atan2(C,m*y);p=Math.sin(p*T)/C,l=Math.sin(l*T)/C}let w=l*y;if(h=h*p+u*w,d=d*p+f*w,s=s*p+g*w,o=o*p+_*w,p===1-l){let C=1/Math.sqrt(h*h+d*d+s*s+o*o);h*=C,d*=C,s*=C,o*=C}}e[t]=h,e[t+1]=d,e[t+2]=s,e[t+3]=o}static multiplyQuaternionsFlat(e,t,n,r,a,c){let l=n[r],h=n[r+1],d=n[r+2],s=n[r+3],o=a[c],u=a[c+1],f=a[c+2],g=a[c+3];return e[t]=l*g+s*o+h*f-d*u,e[t+1]=h*g+s*u+d*o-l*f,e[t+2]=d*g+s*f+l*u-h*o,e[t+3]=s*g-l*o-h*u-d*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,a=e._z,c=e._order,l=Math.cos,h=Math.sin,d=l(n/2),s=l(r/2),o=l(a/2),u=h(n/2),f=h(r/2),g=h(a/2);switch(c){case"XYZ":this._x=u*s*o+d*f*g,this._y=d*f*o-u*s*g,this._z=d*s*g+u*f*o,this._w=d*s*o-u*f*g;break;case"YXZ":this._x=u*s*o+d*f*g,this._y=d*f*o-u*s*g,this._z=d*s*g-u*f*o,this._w=d*s*o+u*f*g;break;case"ZXY":this._x=u*s*o-d*f*g,this._y=d*f*o+u*s*g,this._z=d*s*g+u*f*o,this._w=d*s*o-u*f*g;break;case"ZYX":this._x=u*s*o-d*f*g,this._y=d*f*o+u*s*g,this._z=d*s*g-u*f*o,this._w=d*s*o+u*f*g;break;case"YZX":this._x=u*s*o+d*f*g,this._y=d*f*o+u*s*g,this._z=d*s*g-u*f*o,this._w=d*s*o-u*f*g;break;case"XZY":this._x=u*s*o-d*f*g,this._y=d*f*o-u*s*g,this._z=d*s*g+u*f*o,this._w=d*s*o+u*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+c)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],a=t[8],c=t[1],l=t[5],h=t[9],d=t[2],s=t[6],o=t[10],u=n+l+o;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(s-h)*f,this._y=(a-d)*f,this._z=(c-r)*f}else if(n>l&&n>o){let f=2*Math.sqrt(1+n-l-o);this._w=(s-h)/f,this._x=.25*f,this._y=(r+c)/f,this._z=(a+d)/f}else if(l>o){let f=2*Math.sqrt(1+l-n-o);this._w=(a-d)/f,this._x=(r+c)/f,this._y=.25*f,this._z=(h+s)/f}else{let f=2*Math.sqrt(1+o-n-l);this._w=(c-r)/f,this._x=(a+d)/f,this._y=(h+s)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Tt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,a=e._z,c=e._w,l=t._x,h=t._y,d=t._z,s=t._w;return this._x=n*s+c*l+r*d-a*h,this._y=r*s+c*h+a*l-n*d,this._z=a*s+c*d+n*h-r*l,this._w=c*s-n*l-r*h-a*d,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,r=this._y,a=this._z,c=this._w,l=c*e._w+n*e._x+r*e._y+a*e._z;if(l<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,l=-l):this.copy(e),l>=1)return this._w=c,this._x=n,this._y=r,this._z=a,this;let h=1-l*l;if(h<=Number.EPSILON){let f=1-t;return this._w=f*c+t*this._w,this._x=f*n+t*this._x,this._y=f*r+t*this._y,this._z=f*a+t*this._z,this.normalize(),this}let d=Math.sqrt(h),s=Math.atan2(d,l),o=Math.sin((1-t)*s)/d,u=Math.sin(t*s)/d;return this._w=c*o+this._w*u,this._x=n*o+this._x*u,this._y=r*o+this._y*u,this._z=a*o+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),r=2*Math.PI*Math.random(),a=2*Math.PI*Math.random();return this.set(t*Math.cos(r),n*Math.sin(a),n*Math.cos(a),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},I=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Bo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Bo.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[3]*n+a[6]*r,this.y=a[1]*t+a[4]*n+a[7]*r,this.z=a[2]*t+a[5]*n+a[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,a=e.elements,c=1/(a[3]*t+a[7]*n+a[11]*r+a[15]);return this.x=(a[0]*t+a[4]*n+a[8]*r+a[12])*c,this.y=(a[1]*t+a[5]*n+a[9]*r+a[13])*c,this.z=(a[2]*t+a[6]*n+a[10]*r+a[14])*c,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,a=e.x,c=e.y,l=e.z,h=e.w,d=2*(c*r-l*n),s=2*(l*t-a*r),o=2*(a*n-c*t);return this.x=t+h*d+c*o-l*s,this.y=n+h*s+l*d-a*o,this.z=r+h*o+a*s-c*d,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r,this.y=a[1]*t+a[5]*n+a[9]*r,this.z=a[2]*t+a[6]*n+a[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,a=e.z,c=t.x,l=t.y,h=t.z;return this.x=r*h-a*l,this.y=a*c-n*h,this.z=n*l-r*c,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ys.copy(this).projectOnVector(e),this.sub(ys)}reflect(e){return this.sub(ys.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Tt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},ys=new I,Bo=new bn,On=class{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(zt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(zt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=zt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let a=n.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let c=0,l=a.count;c<l;c++)e.isMesh===!0?e.getVertexPosition(c,zt):zt.fromBufferAttribute(a,c),zt.applyMatrix4(e.matrixWorld),this.expandByPoint(zt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Yi.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Yi.copy(n.boundingBox)),Yi.applyMatrix4(e.matrixWorld),this.union(Yi)}let r=e.children;for(let a=0,c=r.length;a<c;a++)this.expandByObject(r[a],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,zt),zt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ei),Zi.subVectors(this.max,Ei),qn.subVectors(e.a,Ei),Yn.subVectors(e.b,Ei),Zn.subVectors(e.c,Ei),un.subVectors(Yn,qn),hn.subVectors(Zn,Yn),wn.subVectors(qn,Zn);let t=[0,-un.z,un.y,0,-hn.z,hn.y,0,-wn.z,wn.y,un.z,0,-un.x,hn.z,0,-hn.x,wn.z,0,-wn.x,-un.y,un.x,0,-hn.y,hn.x,0,-wn.y,wn.x,0];return!Ms(t,qn,Yn,Zn,Zi)||(t=[1,0,0,0,1,0,0,0,1],!Ms(t,qn,Yn,Zn,Zi))?!1:($i.crossVectors(un,hn),t=[$i.x,$i.y,$i.z],Ms(t,qn,Yn,Zn,Zi))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,zt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(zt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Jt[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Jt[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Jt[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Jt[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Jt[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Jt[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Jt[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Jt[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Jt),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Jt=[new I,new I,new I,new I,new I,new I,new I,new I],zt=new I,Yi=new On,qn=new I,Yn=new I,Zn=new I,un=new I,hn=new I,wn=new I,Ei=new I,Zi=new I,$i=new I,Rn=new I;function Ms(i,e,t,n,r){for(let a=0,c=i.length-3;a<=c;a+=3){Rn.fromArray(i,a);let l=r.x*Math.abs(Rn.x)+r.y*Math.abs(Rn.y)+r.z*Math.abs(Rn.z),h=e.dot(Rn),d=t.dot(Rn),s=n.dot(Rn);if(Math.max(-Math.max(h,d,s),Math.min(h,d,s))>l)return!1}return!0}var Ou=new On,Ai=new I,Ss=new I,Bn=class{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Ou.setFromPoints(e).getCenter(n);let r=0;for(let a=0,c=e.length;a<c;a++)r=Math.max(r,n.distanceToSquared(e[a]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ai.subVectors(e,this.center);let t=Ai.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Ai,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ss.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ai.copy(e.center).add(Ss)),this.expandByPoint(Ai.copy(e.center).sub(Ss))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},Kt=new I,bs=new I,Ji=new I,dn=new I,Es=new I,Ki=new I,As=new I,Ii=class{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Kt)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Kt.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Kt.copy(this.origin).addScaledVector(this.direction,t),Kt.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){bs.copy(e).add(t).multiplyScalar(.5),Ji.copy(t).sub(e).normalize(),dn.copy(this.origin).sub(bs);let a=e.distanceTo(t)*.5,c=-this.direction.dot(Ji),l=dn.dot(this.direction),h=-dn.dot(Ji),d=dn.lengthSq(),s=Math.abs(1-c*c),o,u,f,g;if(s>0)if(o=c*h-l,u=c*l-h,g=a*s,o>=0)if(u>=-g)if(u<=g){let _=1/s;o*=_,u*=_,f=o*(o+c*u+2*l)+u*(c*o+u+2*h)+d}else u=a,o=Math.max(0,-(c*u+l)),f=-o*o+u*(u+2*h)+d;else u=-a,o=Math.max(0,-(c*u+l)),f=-o*o+u*(u+2*h)+d;else u<=-g?(o=Math.max(0,-(-c*a+l)),u=o>0?-a:Math.min(Math.max(-a,-h),a),f=-o*o+u*(u+2*h)+d):u<=g?(o=0,u=Math.min(Math.max(-a,-h),a),f=u*(u+2*h)+d):(o=Math.max(0,-(c*a+l)),u=o>0?a:Math.min(Math.max(-a,-h),a),f=-o*o+u*(u+2*h)+d);else u=c>0?-a:a,o=Math.max(0,-(c*u+l)),f=-o*o+u*(u+2*h)+d;return n&&n.copy(this.origin).addScaledVector(this.direction,o),r&&r.copy(bs).addScaledVector(Ji,u),f}intersectSphere(e,t){Kt.subVectors(e.center,this.origin);let n=Kt.dot(this.direction),r=Kt.dot(Kt)-n*n,a=e.radius*e.radius;if(r>a)return null;let c=Math.sqrt(a-r),l=n-c,h=n+c;return h<0?null:l<0?this.at(h,t):this.at(l,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,a,c,l,h,d=1/this.direction.x,s=1/this.direction.y,o=1/this.direction.z,u=this.origin;return d>=0?(n=(e.min.x-u.x)*d,r=(e.max.x-u.x)*d):(n=(e.max.x-u.x)*d,r=(e.min.x-u.x)*d),s>=0?(a=(e.min.y-u.y)*s,c=(e.max.y-u.y)*s):(a=(e.max.y-u.y)*s,c=(e.min.y-u.y)*s),n>c||a>r||((a>n||isNaN(n))&&(n=a),(c<r||isNaN(r))&&(r=c),o>=0?(l=(e.min.z-u.z)*o,h=(e.max.z-u.z)*o):(l=(e.max.z-u.z)*o,h=(e.min.z-u.z)*o),n>h||l>r)||((l>n||n!==n)&&(n=l),(h<r||r!==r)&&(r=h),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Kt)!==null}intersectTriangle(e,t,n,r,a){Es.subVectors(t,e),Ki.subVectors(n,e),As.crossVectors(Es,Ki);let c=this.direction.dot(As),l;if(c>0){if(r)return null;l=1}else if(c<0)l=-1,c=-c;else return null;dn.subVectors(this.origin,e);let h=l*this.direction.dot(Ki.crossVectors(dn,Ki));if(h<0)return null;let d=l*this.direction.dot(Es.cross(dn));if(d<0||h+d>c)return null;let s=-l*dn.dot(As);return s<0?null:this.at(s/c,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},nt=class i{constructor(e,t,n,r,a,c,l,h,d,s,o,u,f,g,_,p){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,a,c,l,h,d,s,o,u,f,g,_,p)}set(e,t,n,r,a,c,l,h,d,s,o,u,f,g,_,p){let m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=r,m[1]=a,m[5]=c,m[9]=l,m[13]=h,m[2]=d,m[6]=s,m[10]=o,m[14]=u,m[3]=f,m[7]=g,m[11]=_,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,r=1/$n.setFromMatrixColumn(e,0).length(),a=1/$n.setFromMatrixColumn(e,1).length(),c=1/$n.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*a,t[5]=n[5]*a,t[6]=n[6]*a,t[7]=0,t[8]=n[8]*c,t[9]=n[9]*c,t[10]=n[10]*c,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,a=e.z,c=Math.cos(n),l=Math.sin(n),h=Math.cos(r),d=Math.sin(r),s=Math.cos(a),o=Math.sin(a);if(e.order==="XYZ"){let u=c*s,f=c*o,g=l*s,_=l*o;t[0]=h*s,t[4]=-h*o,t[8]=d,t[1]=f+g*d,t[5]=u-_*d,t[9]=-l*h,t[2]=_-u*d,t[6]=g+f*d,t[10]=c*h}else if(e.order==="YXZ"){let u=h*s,f=h*o,g=d*s,_=d*o;t[0]=u+_*l,t[4]=g*l-f,t[8]=c*d,t[1]=c*o,t[5]=c*s,t[9]=-l,t[2]=f*l-g,t[6]=_+u*l,t[10]=c*h}else if(e.order==="ZXY"){let u=h*s,f=h*o,g=d*s,_=d*o;t[0]=u-_*l,t[4]=-c*o,t[8]=g+f*l,t[1]=f+g*l,t[5]=c*s,t[9]=_-u*l,t[2]=-c*d,t[6]=l,t[10]=c*h}else if(e.order==="ZYX"){let u=c*s,f=c*o,g=l*s,_=l*o;t[0]=h*s,t[4]=g*d-f,t[8]=u*d+_,t[1]=h*o,t[5]=_*d+u,t[9]=f*d-g,t[2]=-d,t[6]=l*h,t[10]=c*h}else if(e.order==="YZX"){let u=c*h,f=c*d,g=l*h,_=l*d;t[0]=h*s,t[4]=_-u*o,t[8]=g*o+f,t[1]=o,t[5]=c*s,t[9]=-l*s,t[2]=-d*s,t[6]=f*o+g,t[10]=u-_*o}else if(e.order==="XZY"){let u=c*h,f=c*d,g=l*h,_=l*d;t[0]=h*s,t[4]=-o,t[8]=d*s,t[1]=u*o+_,t[5]=c*s,t[9]=f*o-g,t[2]=g*o-f,t[6]=l*s,t[10]=_*o+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Bu,e,zu)}lookAt(e,t,n){let r=this.elements;return Lt.subVectors(e,t),Lt.lengthSq()===0&&(Lt.z=1),Lt.normalize(),fn.crossVectors(n,Lt),fn.lengthSq()===0&&(Math.abs(n.z)===1?Lt.x+=1e-4:Lt.z+=1e-4,Lt.normalize(),fn.crossVectors(n,Lt)),fn.normalize(),ji.crossVectors(Lt,fn),r[0]=fn.x,r[4]=ji.x,r[8]=Lt.x,r[1]=fn.y,r[5]=ji.y,r[9]=Lt.y,r[2]=fn.z,r[6]=ji.z,r[10]=Lt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,a=this.elements,c=n[0],l=n[4],h=n[8],d=n[12],s=n[1],o=n[5],u=n[9],f=n[13],g=n[2],_=n[6],p=n[10],m=n[14],y=n[3],v=n[7],w=n[11],C=n[15],T=r[0],A=r[4],D=r[8],S=r[12],E=r[1],k=r[5],q=r[9],ee=r[13],L=r[2],B=r[6],V=r[10],X=r[14],W=r[3],G=r[7],J=r[11],Q=r[15];return a[0]=c*T+l*E+h*L+d*W,a[4]=c*A+l*k+h*B+d*G,a[8]=c*D+l*q+h*V+d*J,a[12]=c*S+l*ee+h*X+d*Q,a[1]=s*T+o*E+u*L+f*W,a[5]=s*A+o*k+u*B+f*G,a[9]=s*D+o*q+u*V+f*J,a[13]=s*S+o*ee+u*X+f*Q,a[2]=g*T+_*E+p*L+m*W,a[6]=g*A+_*k+p*B+m*G,a[10]=g*D+_*q+p*V+m*J,a[14]=g*S+_*ee+p*X+m*Q,a[3]=y*T+v*E+w*L+C*W,a[7]=y*A+v*k+w*B+C*G,a[11]=y*D+v*q+w*V+C*J,a[15]=y*S+v*ee+w*X+C*Q,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],a=e[12],c=e[1],l=e[5],h=e[9],d=e[13],s=e[2],o=e[6],u=e[10],f=e[14],g=e[3],_=e[7],p=e[11],m=e[15];return g*(+a*h*o-r*d*o-a*l*u+n*d*u+r*l*f-n*h*f)+_*(+t*h*f-t*d*u+a*c*u-r*c*f+r*d*s-a*h*s)+p*(+t*d*o-t*l*f-a*c*o+n*c*f+a*l*s-n*d*s)+m*(-r*l*s-t*h*o+t*l*u+r*c*o-n*c*u+n*h*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],a=e[3],c=e[4],l=e[5],h=e[6],d=e[7],s=e[8],o=e[9],u=e[10],f=e[11],g=e[12],_=e[13],p=e[14],m=e[15],y=o*p*d-_*u*d+_*h*f-l*p*f-o*h*m+l*u*m,v=g*u*d-s*p*d-g*h*f+c*p*f+s*h*m-c*u*m,w=s*_*d-g*o*d+g*l*f-c*_*f-s*l*m+c*o*m,C=g*o*h-s*_*h-g*l*u+c*_*u+s*l*p-c*o*p,T=t*y+n*v+r*w+a*C;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/T;return e[0]=y*A,e[1]=(_*u*a-o*p*a-_*r*f+n*p*f+o*r*m-n*u*m)*A,e[2]=(l*p*a-_*h*a+_*r*d-n*p*d-l*r*m+n*h*m)*A,e[3]=(o*h*a-l*u*a-o*r*d+n*u*d+l*r*f-n*h*f)*A,e[4]=v*A,e[5]=(s*p*a-g*u*a+g*r*f-t*p*f-s*r*m+t*u*m)*A,e[6]=(g*h*a-c*p*a-g*r*d+t*p*d+c*r*m-t*h*m)*A,e[7]=(c*u*a-s*h*a+s*r*d-t*u*d-c*r*f+t*h*f)*A,e[8]=w*A,e[9]=(g*o*a-s*_*a-g*n*f+t*_*f+s*n*m-t*o*m)*A,e[10]=(c*_*a-g*l*a+g*n*d-t*_*d-c*n*m+t*l*m)*A,e[11]=(s*l*a-c*o*a-s*n*d+t*o*d+c*n*f-t*l*f)*A,e[12]=C*A,e[13]=(s*_*r-g*o*r+g*n*u-t*_*u-s*n*p+t*o*p)*A,e[14]=(g*l*r-c*_*r-g*n*h+t*_*h+c*n*p-t*l*p)*A,e[15]=(c*o*r-s*l*r+s*n*h-t*o*h-c*n*u+t*l*u)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,a=e.z;return t[0]*=n,t[4]*=r,t[8]*=a,t[1]*=n,t[5]*=r,t[9]*=a,t[2]*=n,t[6]*=r,t[10]*=a,t[3]*=n,t[7]*=r,t[11]*=a,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),a=1-n,c=e.x,l=e.y,h=e.z,d=a*c,s=a*l;return this.set(d*c+n,d*l-r*h,d*h+r*l,0,d*l+r*h,s*l+n,s*h-r*c,0,d*h-r*l,s*h+r*c,a*h*h+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,a,c){return this.set(1,n,a,0,e,1,c,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,a=t._x,c=t._y,l=t._z,h=t._w,d=a+a,s=c+c,o=l+l,u=a*d,f=a*s,g=a*o,_=c*s,p=c*o,m=l*o,y=h*d,v=h*s,w=h*o,C=n.x,T=n.y,A=n.z;return r[0]=(1-(_+m))*C,r[1]=(f+w)*C,r[2]=(g-v)*C,r[3]=0,r[4]=(f-w)*T,r[5]=(1-(u+m))*T,r[6]=(p+y)*T,r[7]=0,r[8]=(g+v)*A,r[9]=(p-y)*A,r[10]=(1-(u+_))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements,a=$n.set(r[0],r[1],r[2]).length(),c=$n.set(r[4],r[5],r[6]).length(),l=$n.set(r[8],r[9],r[10]).length();this.determinant()<0&&(a=-a),e.x=r[12],e.y=r[13],e.z=r[14],kt.copy(this);let d=1/a,s=1/c,o=1/l;return kt.elements[0]*=d,kt.elements[1]*=d,kt.elements[2]*=d,kt.elements[4]*=s,kt.elements[5]*=s,kt.elements[6]*=s,kt.elements[8]*=o,kt.elements[9]*=o,kt.elements[10]*=o,t.setFromRotationMatrix(kt),n.x=a,n.y=c,n.z=l,this}makePerspective(e,t,n,r,a,c,l=sn){let h=this.elements,d=2*a/(t-e),s=2*a/(n-r),o=(t+e)/(t-e),u=(n+r)/(n-r),f,g;if(l===sn)f=-(c+a)/(c-a),g=-2*c*a/(c-a);else if(l===Er)f=-c/(c-a),g=-c*a/(c-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+l);return h[0]=d,h[4]=0,h[8]=o,h[12]=0,h[1]=0,h[5]=s,h[9]=u,h[13]=0,h[2]=0,h[6]=0,h[10]=f,h[14]=g,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(e,t,n,r,a,c,l=sn){let h=this.elements,d=1/(t-e),s=1/(n-r),o=1/(c-a),u=(t+e)*d,f=(n+r)*s,g,_;if(l===sn)g=(c+a)*o,_=-2*o;else if(l===Er)g=a*o,_=-1*o;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+l);return h[0]=2*d,h[4]=0,h[8]=0,h[12]=-u,h[1]=0,h[5]=2*s,h[9]=0,h[13]=-f,h[2]=0,h[6]=0,h[10]=_,h[14]=-g,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},$n=new I,kt=new nt,Bu=new I(0,0,0),zu=new I(1,1,1),fn=new I,ji=new I,Lt=new I,zo=new nt,ko=new bn,Cr=class i{constructor(e=0,t=0,n=0,r=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,a=r[0],c=r[4],l=r[8],h=r[1],d=r[5],s=r[9],o=r[2],u=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(Tt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-s,f),this._z=Math.atan2(-c,a)):(this._x=Math.atan2(u,d),this._z=0);break;case"YXZ":this._x=Math.asin(-Tt(s,-1,1)),Math.abs(s)<.9999999?(this._y=Math.atan2(l,f),this._z=Math.atan2(h,d)):(this._y=Math.atan2(-o,a),this._z=0);break;case"ZXY":this._x=Math.asin(Tt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-o,f),this._z=Math.atan2(-c,d)):(this._y=0,this._z=Math.atan2(h,a));break;case"ZYX":this._y=Math.asin(-Tt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(h,a)):(this._x=0,this._z=Math.atan2(-c,d));break;case"YZX":this._z=Math.asin(Tt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-s,d),this._y=Math.atan2(-o,a)):(this._x=0,this._y=Math.atan2(l,f));break;case"XZY":this._z=Math.asin(-Tt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(u,d),this._y=Math.atan2(l,a)):(this._x=Math.atan2(-s,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return zo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(zo,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ko.setFromEuler(this),this.setFromQuaternion(ko,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Cr.DEFAULT_ORDER="XYZ";var Lr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},ku=0,Ho=new I,Jn=new bn,jt=new nt,Qi=new I,Ti=new I,Hu=new I,Vu=new bn,Vo=new I(1,0,0),Go=new I(0,1,0),Wo=new I(0,0,1),Gu={type:"added"},Wu={type:"removed"},dt=class i extends Sn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ku++}),this.uuid=ki(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new I,t=new Cr,n=new bn,r=new I(1,1,1);function a(){n.setFromEuler(t,!1)}function c(){t.setFromQuaternion(n,void 0,!1)}t._onChange(a),n._onChange(c),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new nt},normalMatrix:{value:new Be}}),this.matrix=new nt,this.matrixWorld=new nt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Lr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Jn.setFromAxisAngle(e,t),this.quaternion.multiply(Jn),this}rotateOnWorldAxis(e,t){return Jn.setFromAxisAngle(e,t),this.quaternion.premultiply(Jn),this}rotateX(e){return this.rotateOnAxis(Vo,e)}rotateY(e){return this.rotateOnAxis(Go,e)}rotateZ(e){return this.rotateOnAxis(Wo,e)}translateOnAxis(e,t){return Ho.copy(e).applyQuaternion(this.quaternion),this.position.add(Ho.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Vo,e)}translateY(e){return this.translateOnAxis(Go,e)}translateZ(e){return this.translateOnAxis(Wo,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(jt.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Qi.copy(e):Qi.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Ti.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?jt.lookAt(Ti,Qi,this.up):jt.lookAt(Qi,Ti,this.up),this.quaternion.setFromRotationMatrix(jt),r&&(jt.extractRotation(r.matrixWorld),Jn.setFromRotationMatrix(jt),this.quaternion.premultiply(Jn.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Gu)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Wu)),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),jt.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),jt.multiply(e.parent.matrixWorld)),e.applyMatrix4(jt),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let c=this.children[n].getObjectByProperty(e,t);if(c!==void 0)return c}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let a=0,c=r.length;a<c;a++)r[a].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ti,e,Hu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ti,Vu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++){let a=t[n];(a.matrixWorldAutoUpdate===!0||e===!0)&&a.updateMatrixWorld(e)}}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){let r=this.children;for(let a=0,c=r.length;a<c;a++){let l=r[a];l.matrixWorldAutoUpdate===!0&&l.updateWorldMatrix(!1,!0)}}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(l=>({boxInitialized:l.boxInitialized,boxMin:l.box.min.toArray(),boxMax:l.box.max.toArray(),sphereInitialized:l.sphereInitialized,sphereRadius:l.sphere.radius,sphereCenter:l.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function a(l,h){return l[h.uuid]===void 0&&(l[h.uuid]=h.toJSON(e)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=a(e.geometries,this.geometry);let l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){let h=l.shapes;if(Array.isArray(h))for(let d=0,s=h.length;d<s;d++){let o=h[d];a(e.shapes,o)}else a(e.shapes,h)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let l=[];for(let h=0,d=this.material.length;h<d;h++)l.push(a(e.materials,this.material[h]));r.material=l}else r.material=a(e.materials,this.material);if(this.children.length>0){r.children=[];for(let l=0;l<this.children.length;l++)r.children.push(this.children[l].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let l=0;l<this.animations.length;l++){let h=this.animations[l];r.animations.push(a(e.animations,h))}}if(t){let l=c(e.geometries),h=c(e.materials),d=c(e.textures),s=c(e.images),o=c(e.shapes),u=c(e.skeletons),f=c(e.animations),g=c(e.nodes);l.length>0&&(n.geometries=l),h.length>0&&(n.materials=h),d.length>0&&(n.textures=d),s.length>0&&(n.images=s),o.length>0&&(n.shapes=o),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=r,n;function c(l){let h=[];for(let d in l){let s=l[d];delete s.metadata,h.push(s)}return h}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let r=e.children[n];this.add(r.clone())}return this}};dt.DEFAULT_UP=new I(0,1,0);dt.DEFAULT_MATRIX_AUTO_UPDATE=!0;dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ht=new I,Qt=new I,Ts=new I,en=new I,Kn=new I,jn=new I,Xo=new I,ws=new I,Rs=new I,Cs=new I,er=!1,ai=class i{constructor(e=new I,t=new I,n=new I){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Ht.subVectors(e,t),r.cross(Ht);let a=r.lengthSq();return a>0?r.multiplyScalar(1/Math.sqrt(a)):r.set(0,0,0)}static getBarycoord(e,t,n,r,a){Ht.subVectors(r,t),Qt.subVectors(n,t),Ts.subVectors(e,t);let c=Ht.dot(Ht),l=Ht.dot(Qt),h=Ht.dot(Ts),d=Qt.dot(Qt),s=Qt.dot(Ts),o=c*d-l*l;if(o===0)return a.set(0,0,0),null;let u=1/o,f=(d*h-l*s)*u,g=(c*s-l*h)*u;return a.set(1-f-g,g,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,en)===null?!1:en.x>=0&&en.y>=0&&en.x+en.y<=1}static getUV(e,t,n,r,a,c,l,h){return er===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),er=!0),this.getInterpolation(e,t,n,r,a,c,l,h)}static getInterpolation(e,t,n,r,a,c,l,h){return this.getBarycoord(e,t,n,r,en)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(a,en.x),h.addScaledVector(c,en.y),h.addScaledVector(l,en.z),h)}static isFrontFacing(e,t,n,r){return Ht.subVectors(n,t),Qt.subVectors(e,t),Ht.cross(Qt).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ht.subVectors(this.c,this.b),Qt.subVectors(this.a,this.b),Ht.cross(Qt).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,r,a){return er===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),er=!0),i.getInterpolation(e,this.a,this.b,this.c,t,n,r,a)}getInterpolation(e,t,n,r,a){return i.getInterpolation(e,this.a,this.b,this.c,t,n,r,a)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,a=this.c,c,l;Kn.subVectors(r,n),jn.subVectors(a,n),ws.subVectors(e,n);let h=Kn.dot(ws),d=jn.dot(ws);if(h<=0&&d<=0)return t.copy(n);Rs.subVectors(e,r);let s=Kn.dot(Rs),o=jn.dot(Rs);if(s>=0&&o<=s)return t.copy(r);let u=h*o-s*d;if(u<=0&&h>=0&&s<=0)return c=h/(h-s),t.copy(n).addScaledVector(Kn,c);Cs.subVectors(e,a);let f=Kn.dot(Cs),g=jn.dot(Cs);if(g>=0&&f<=g)return t.copy(a);let _=f*d-h*g;if(_<=0&&d>=0&&g<=0)return l=d/(d-g),t.copy(n).addScaledVector(jn,l);let p=s*g-f*o;if(p<=0&&o-s>=0&&f-g>=0)return Xo.subVectors(a,r),l=(o-s)/(o-s+(f-g)),t.copy(r).addScaledVector(Xo,l);let m=1/(p+_+u);return c=_*m,l=u*m,t.copy(n).addScaledVector(Kn,c).addScaledVector(jn,l)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},kl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},pn={h:0,s:0,l:0},tr={h:0,s:0,l:0};function Ls(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var we=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ut){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,We.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=We.workingColorSpace){return this.r=e,this.g=t,this.b=n,We.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=We.workingColorSpace){if(e=Iu(e,1),t=Tt(t,0,1),n=Tt(n,0,1),t===0)this.r=this.g=this.b=n;else{let a=n<=.5?n*(1+t):n+t-n*t,c=2*n-a;this.r=Ls(c,a,e+1/3),this.g=Ls(c,a,e),this.b=Ls(c,a,e-1/3)}return We.toWorkingColorSpace(this,r),this}setStyle(e,t=ut){function n(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let a,c=r[1],l=r[2];switch(c){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let a=r[1],c=a.length;if(c===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(c===6)return this.setHex(parseInt(a,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ut){let n=kl[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ui(e.r),this.g=ui(e.g),this.b=ui(e.b),this}copyLinearToSRGB(e){return this.r=vs(e.r),this.g=vs(e.g),this.b=vs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ut){return We.fromWorkingColorSpace(gt.copy(this),e),Math.round(Tt(gt.r*255,0,255))*65536+Math.round(Tt(gt.g*255,0,255))*256+Math.round(Tt(gt.b*255,0,255))}getHexString(e=ut){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=We.workingColorSpace){We.fromWorkingColorSpace(gt.copy(this),t);let n=gt.r,r=gt.g,a=gt.b,c=Math.max(n,r,a),l=Math.min(n,r,a),h,d,s=(l+c)/2;if(l===c)h=0,d=0;else{let o=c-l;switch(d=s<=.5?o/(c+l):o/(2-c-l),c){case n:h=(r-a)/o+(r<a?6:0);break;case r:h=(a-n)/o+2;break;case a:h=(n-r)/o+4;break}h/=6}return e.h=h,e.s=d,e.l=s,e}getRGB(e,t=We.workingColorSpace){return We.fromWorkingColorSpace(gt.copy(this),t),e.r=gt.r,e.g=gt.g,e.b=gt.b,e}getStyle(e=ut){We.fromWorkingColorSpace(gt.copy(this),e);let t=gt.r,n=gt.g,r=gt.b;return e!==ut?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(pn),this.setHSL(pn.h+e,pn.s+t,pn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(pn),e.getHSL(tr);let n=gs(pn.h,tr.h,t),r=gs(pn.s,tr.s,t),a=gs(pn.l,tr.l,t);return this.setHSL(n,r,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,a=e.elements;return this.r=a[0]*t+a[3]*n+a[6]*r,this.g=a[1]*t+a[4]*n+a[7]*r,this.b=a[2]*t+a[5]*n+a[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},gt=new we;we.NAMES=kl;var Xu=0,Rt=class extends Sn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Xu++}),this.uuid=ki(),this.name="",this.type="Material",this.blending=ci,this.side=Mn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Hs,this.blendDst=Vs,this.blendEquation=In,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new we(0,0,0),this.blendAlpha=0,this.depthFunc=vr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Po,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Wn,this.stencilZFail=Wn,this.stencilZPass=Wn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ci&&(n.blending=this.blending),this.side!==Mn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Hs&&(n.blendSrc=this.blendSrc),this.blendDst!==Vs&&(n.blendDst=this.blendDst),this.blendEquation!==In&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==vr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Po&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Wn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Wn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Wn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}if(t){let a=r(e.textures),c=r(e.images);a.length>0&&(n.textures=a),c.length>0&&(n.images=c)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let r=t.length;n=new Array(r);for(let a=0;a!==r;++a)n[a]=t[a].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Pr=class extends Rt{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new we(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=wa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var tt=new I,nr=new He,ht=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Io,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=gn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)nr.fromBufferAttribute(this,t),nr.applyMatrix3(e),this.setXY(t,nr.x,nr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)tt.fromBufferAttribute(this,t),tt.applyMatrix3(e),this.setXYZ(t,tt.x,tt.y,tt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)tt.fromBufferAttribute(this,t),tt.applyMatrix4(e),this.setXYZ(t,tt.x,tt.y,tt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)tt.fromBufferAttribute(this,t),tt.applyNormalMatrix(e),this.setXYZ(t,tt.x,tt.y,tt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)tt.fromBufferAttribute(this,t),tt.transformDirection(e),this.setXYZ(t,tt.x,tt.y,tt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=bi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=At(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=bi(t,this.array)),t}setX(e,t){return this.normalized&&(t=At(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=bi(t,this.array)),t}setY(e,t){return this.normalized&&(t=At(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=bi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=At(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=bi(t,this.array)),t}setW(e,t){return this.normalized&&(t=At(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=At(t,this.array),n=At(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=At(t,this.array),n=At(n,this.array),r=At(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,a){return e*=this.itemSize,this.normalized&&(t=At(t,this.array),n=At(n,this.array),r=At(r,this.array),a=At(a,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Io&&(e.usage=this.usage),e}};var Ir=class extends ht{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Dr=class extends ht{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var it=class extends ht{constructor(e,t,n){super(new Float32Array(e),t,n)}};var qu=0,Nt=new nt,Ps=new dt,Qn=new I,Pt=new On,wi=new On,lt=new I,It=class i extends Sn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:qu++}),this.uuid=ki(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(zl(e)?Dr:Ir)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let a=new Be().getNormalMatrix(e);n.applyNormalMatrix(a),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Nt.makeRotationFromQuaternion(e),this.applyMatrix4(Nt),this}rotateX(e){return Nt.makeRotationX(e),this.applyMatrix4(Nt),this}rotateY(e){return Nt.makeRotationY(e),this.applyMatrix4(Nt),this}rotateZ(e){return Nt.makeRotationZ(e),this.applyMatrix4(Nt),this}translate(e,t,n){return Nt.makeTranslation(e,t,n),this.applyMatrix4(Nt),this}scale(e,t,n){return Nt.makeScale(e,t,n),this.applyMatrix4(Nt),this}lookAt(e){return Ps.lookAt(e),Ps.updateMatrix(),this.applyMatrix4(Ps.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Qn).negate(),this.translate(Qn.x,Qn.y,Qn.z),this}setFromPoints(e){let t=[];for(let n=0,r=e.length;n<r;n++){let a=e[n];t.push(a.x,a.y,a.z||0)}return this.setAttribute("position",new it(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new On);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){let a=t[n];Pt.setFromBufferAttribute(a),this.morphTargetsRelative?(lt.addVectors(this.boundingBox.min,Pt.min),this.boundingBox.expandByPoint(lt),lt.addVectors(this.boundingBox.max,Pt.max),this.boundingBox.expandByPoint(lt)):(this.boundingBox.expandByPoint(Pt.min),this.boundingBox.expandByPoint(Pt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Bn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new I,1/0);return}if(e){let n=this.boundingSphere.center;if(Pt.setFromBufferAttribute(e),t)for(let a=0,c=t.length;a<c;a++){let l=t[a];wi.setFromBufferAttribute(l),this.morphTargetsRelative?(lt.addVectors(Pt.min,wi.min),Pt.expandByPoint(lt),lt.addVectors(Pt.max,wi.max),Pt.expandByPoint(lt)):(Pt.expandByPoint(wi.min),Pt.expandByPoint(wi.max))}Pt.getCenter(n);let r=0;for(let a=0,c=e.count;a<c;a++)lt.fromBufferAttribute(e,a),r=Math.max(r,n.distanceToSquared(lt));if(t)for(let a=0,c=t.length;a<c;a++){let l=t[a],h=this.morphTargetsRelative;for(let d=0,s=l.count;d<s;d++)lt.fromBufferAttribute(l,d),h&&(Qn.fromBufferAttribute(e,d),lt.add(Qn)),r=Math.max(r,n.distanceToSquared(lt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.array,r=t.position.array,a=t.normal.array,c=t.uv.array,l=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ht(new Float32Array(4*l),4));let h=this.getAttribute("tangent").array,d=[],s=[];for(let E=0;E<l;E++)d[E]=new I,s[E]=new I;let o=new I,u=new I,f=new I,g=new He,_=new He,p=new He,m=new I,y=new I;function v(E,k,q){o.fromArray(r,E*3),u.fromArray(r,k*3),f.fromArray(r,q*3),g.fromArray(c,E*2),_.fromArray(c,k*2),p.fromArray(c,q*2),u.sub(o),f.sub(o),_.sub(g),p.sub(g);let ee=1/(_.x*p.y-p.x*_.y);isFinite(ee)&&(m.copy(u).multiplyScalar(p.y).addScaledVector(f,-_.y).multiplyScalar(ee),y.copy(f).multiplyScalar(_.x).addScaledVector(u,-p.x).multiplyScalar(ee),d[E].add(m),d[k].add(m),d[q].add(m),s[E].add(y),s[k].add(y),s[q].add(y))}let w=this.groups;w.length===0&&(w=[{start:0,count:n.length}]);for(let E=0,k=w.length;E<k;++E){let q=w[E],ee=q.start,L=q.count;for(let B=ee,V=ee+L;B<V;B+=3)v(n[B+0],n[B+1],n[B+2])}let C=new I,T=new I,A=new I,D=new I;function S(E){A.fromArray(a,E*3),D.copy(A);let k=d[E];C.copy(k),C.sub(A.multiplyScalar(A.dot(k))).normalize(),T.crossVectors(D,k);let ee=T.dot(s[E])<0?-1:1;h[E*4]=C.x,h[E*4+1]=C.y,h[E*4+2]=C.z,h[E*4+3]=ee}for(let E=0,k=w.length;E<k;++E){let q=w[E],ee=q.start,L=q.count;for(let B=ee,V=ee+L;B<V;B+=3)S(n[B+0]),S(n[B+1]),S(n[B+2])}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ht(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);let r=new I,a=new I,c=new I,l=new I,h=new I,d=new I,s=new I,o=new I;if(e)for(let u=0,f=e.count;u<f;u+=3){let g=e.getX(u+0),_=e.getX(u+1),p=e.getX(u+2);r.fromBufferAttribute(t,g),a.fromBufferAttribute(t,_),c.fromBufferAttribute(t,p),s.subVectors(c,a),o.subVectors(r,a),s.cross(o),l.fromBufferAttribute(n,g),h.fromBufferAttribute(n,_),d.fromBufferAttribute(n,p),l.add(s),h.add(s),d.add(s),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(_,h.x,h.y,h.z),n.setXYZ(p,d.x,d.y,d.z)}else for(let u=0,f=t.count;u<f;u+=3)r.fromBufferAttribute(t,u+0),a.fromBufferAttribute(t,u+1),c.fromBufferAttribute(t,u+2),s.subVectors(c,a),o.subVectors(r,a),s.cross(o),n.setXYZ(u+0,s.x,s.y,s.z),n.setXYZ(u+1,s.x,s.y,s.z),n.setXYZ(u+2,s.x,s.y,s.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)lt.fromBufferAttribute(e,t),lt.normalize(),e.setXYZ(t,lt.x,lt.y,lt.z)}toNonIndexed(){function e(l,h){let d=l.array,s=l.itemSize,o=l.normalized,u=new d.constructor(h.length*s),f=0,g=0;for(let _=0,p=h.length;_<p;_++){l.isInterleavedBufferAttribute?f=h[_]*l.data.stride+l.offset:f=h[_]*s;for(let m=0;m<s;m++)u[g++]=d[f++]}return new ht(u,s,o)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,r=this.attributes;for(let l in r){let h=r[l],d=e(h,n);t.setAttribute(l,d)}let a=this.morphAttributes;for(let l in a){let h=[],d=a[l];for(let s=0,o=d.length;s<o;s++){let u=d[s],f=e(u,n);h.push(f)}t.morphAttributes[l]=h}t.morphTargetsRelative=this.morphTargetsRelative;let c=this.groups;for(let l=0,h=c.length;l<h;l++){let d=c[l];t.addGroup(d.start,d.count,d.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let h=this.parameters;for(let d in h)h[d]!==void 0&&(e[d]=h[d]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let h in n){let d=n[h];e.data.attributes[h]=d.toJSON(e.data)}let r={},a=!1;for(let h in this.morphAttributes){let d=this.morphAttributes[h],s=[];for(let o=0,u=d.length;o<u;o++){let f=d[o];s.push(f.toJSON(e.data))}s.length>0&&(r[h]=s,a=!0)}a&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let c=this.groups;c.length>0&&(e.data.groups=JSON.parse(JSON.stringify(c)));let l=this.boundingSphere;return l!==null&&(e.data.boundingSphere={center:l.center.toArray(),radius:l.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let r=e.attributes;for(let d in r){let s=r[d];this.setAttribute(d,s.clone(t))}let a=e.morphAttributes;for(let d in a){let s=[],o=a[d];for(let u=0,f=o.length;u<f;u++)s.push(o[u].clone(t));this.morphAttributes[d]=s}this.morphTargetsRelative=e.morphTargetsRelative;let c=e.groups;for(let d=0,s=c.length;d<s;d++){let o=c[d];this.addGroup(o.start,o.count,o.materialIndex)}let l=e.boundingBox;l!==null&&(this.boundingBox=l.clone());let h=e.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},qo=new nt,Cn=new Ii,ir=new Bn,Yo=new I,ei=new I,ti=new I,ni=new I,Is=new I,rr=new I,sr=new He,ar=new He,or=new He,Zo=new I,$o=new I,Jo=new I,lr=new I,cr=new I,_t=class extends dt{constructor(e=new It,t=new Pr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,c=r.length;a<c;a++){let l=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=a}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,a=n.morphAttributes.position,c=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let l=this.morphTargetInfluences;if(a&&l){rr.set(0,0,0);for(let h=0,d=a.length;h<d;h++){let s=l[h],o=a[h];s!==0&&(Is.fromBufferAttribute(o,e),c?rr.addScaledVector(Is,s):rr.addScaledVector(Is.sub(t),s))}t.add(rr)}return t}raycast(e,t){let n=this.geometry,r=this.material,a=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ir.copy(n.boundingSphere),ir.applyMatrix4(a),Cn.copy(e.ray).recast(e.near),!(ir.containsPoint(Cn.origin)===!1&&(Cn.intersectSphere(ir,Yo)===null||Cn.origin.distanceToSquared(Yo)>(e.far-e.near)**2))&&(qo.copy(a).invert(),Cn.copy(e.ray).applyMatrix4(qo),!(n.boundingBox!==null&&Cn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Cn)))}_computeIntersections(e,t,n){let r,a=this.geometry,c=this.material,l=a.index,h=a.attributes.position,d=a.attributes.uv,s=a.attributes.uv1,o=a.attributes.normal,u=a.groups,f=a.drawRange;if(l!==null)if(Array.isArray(c))for(let g=0,_=u.length;g<_;g++){let p=u[g],m=c[p.materialIndex],y=Math.max(p.start,f.start),v=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let w=y,C=v;w<C;w+=3){let T=l.getX(w),A=l.getX(w+1),D=l.getX(w+2);r=ur(this,m,e,n,d,s,o,T,A,D),r&&(r.faceIndex=Math.floor(w/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{let g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let p=g,m=_;p<m;p+=3){let y=l.getX(p),v=l.getX(p+1),w=l.getX(p+2);r=ur(this,c,e,n,d,s,o,y,v,w),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(h!==void 0)if(Array.isArray(c))for(let g=0,_=u.length;g<_;g++){let p=u[g],m=c[p.materialIndex],y=Math.max(p.start,f.start),v=Math.min(h.count,Math.min(p.start+p.count,f.start+f.count));for(let w=y,C=v;w<C;w+=3){let T=w,A=w+1,D=w+2;r=ur(this,m,e,n,d,s,o,T,A,D),r&&(r.faceIndex=Math.floor(w/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{let g=Math.max(0,f.start),_=Math.min(h.count,f.start+f.count);for(let p=g,m=_;p<m;p+=3){let y=p,v=p+1,w=p+2;r=ur(this,c,e,n,d,s,o,y,v,w),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}};function Yu(i,e,t,n,r,a,c,l){let h;if(e.side===wt?h=n.intersectTriangle(c,a,r,!0,l):h=n.intersectTriangle(r,a,c,e.side===Mn,l),h===null)return null;cr.copy(l),cr.applyMatrix4(i.matrixWorld);let d=t.ray.origin.distanceTo(cr);return d<t.near||d>t.far?null:{distance:d,point:cr.clone(),object:i}}function ur(i,e,t,n,r,a,c,l,h,d){i.getVertexPosition(l,ei),i.getVertexPosition(h,ti),i.getVertexPosition(d,ni);let s=Yu(i,e,t,n,ei,ti,ni,lr);if(s){r&&(sr.fromBufferAttribute(r,l),ar.fromBufferAttribute(r,h),or.fromBufferAttribute(r,d),s.uv=ai.getInterpolation(lr,ei,ti,ni,sr,ar,or,new He)),a&&(sr.fromBufferAttribute(a,l),ar.fromBufferAttribute(a,h),or.fromBufferAttribute(a,d),s.uv1=ai.getInterpolation(lr,ei,ti,ni,sr,ar,or,new He),s.uv2=s.uv1),c&&(Zo.fromBufferAttribute(c,l),$o.fromBufferAttribute(c,h),Jo.fromBufferAttribute(c,d),s.normal=ai.getInterpolation(lr,ei,ti,ni,Zo,$o,Jo,new I),s.normal.dot(n.direction)>0&&s.normal.multiplyScalar(-1));let o={a:l,b:h,c:d,normal:new I,materialIndex:0};ai.getNormal(ei,ti,ni,o.normal),s.face=o}return s}var Di=class i extends It{constructor(e=1,t=1,n=1,r=1,a=1,c=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:a,depthSegments:c};let l=this;r=Math.floor(r),a=Math.floor(a),c=Math.floor(c);let h=[],d=[],s=[],o=[],u=0,f=0;g("z","y","x",-1,-1,n,t,e,c,a,0),g("z","y","x",1,-1,n,t,-e,c,a,1),g("x","z","y",1,1,e,n,t,r,c,2),g("x","z","y",1,-1,e,n,-t,r,c,3),g("x","y","z",1,-1,e,t,n,r,a,4),g("x","y","z",-1,-1,e,t,-n,r,a,5),this.setIndex(h),this.setAttribute("position",new it(d,3)),this.setAttribute("normal",new it(s,3)),this.setAttribute("uv",new it(o,2));function g(_,p,m,y,v,w,C,T,A,D,S){let E=w/A,k=C/D,q=w/2,ee=C/2,L=T/2,B=A+1,V=D+1,X=0,W=0,G=new I;for(let J=0;J<V;J++){let Q=J*k-ee;for(let le=0;le<B;le++){let H=le*E-q;G[_]=H*y,G[p]=Q*v,G[m]=L,d.push(G.x,G.y,G.z),G[_]=0,G[p]=0,G[m]=T>0?1:-1,s.push(G.x,G.y,G.z),o.push(le/A),o.push(1-J/D),X+=1}}for(let J=0;J<D;J++)for(let Q=0;Q<A;Q++){let le=u+Q+B*J,H=u+Q+B*(J+1),Y=u+(Q+1)+B*(J+1),ae=u+(Q+1)+B*J;h.push(le,H,ae),h.push(H,Y,ae),W+=6}l.addGroup(f,W,S),f+=W,u+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function mi(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function Mt(i){let e={};for(let t=0;t<i.length;t++){let n=mi(i[t]);for(let r in n)e[r]=n[r]}return e}function Zu(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Hl(i){return i.getRenderTarget()===null?i.outputColorSpace:We.workingColorSpace}var $u={clone:mi,merge:Mt},Ju=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ku=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ln=class extends Rt{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ju,this.fragmentShader=Ku,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=mi(e.uniforms),this.uniformsGroups=Zu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let c=this.uniforms[r].value;c&&c.isTexture?t.uniforms[r]={type:"t",value:c.toJSON(e).uuid}:c&&c.isColor?t.uniforms[r]={type:"c",value:c.getHex()}:c&&c.isVector2?t.uniforms[r]={type:"v2",value:c.toArray()}:c&&c.isVector3?t.uniforms[r]={type:"v3",value:c.toArray()}:c&&c.isVector4?t.uniforms[r]={type:"v4",value:c.toArray()}:c&&c.isMatrix3?t.uniforms[r]={type:"m3",value:c.toArray()}:c&&c.isMatrix4?t.uniforms[r]={type:"m4",value:c.toArray()}:t.uniforms[r]={value:c}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Ur=class extends dt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new nt,this.projectionMatrix=new nt,this.projectionMatrixInverse=new nt,this.coordinateSystem=sn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},bt=class extends Ur{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Zs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ms*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Zs*2*Math.atan(Math.tan(ms*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,r,a,c){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=a,this.view.height=c,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ms*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,a=-.5*r,c=this.view;if(this.view!==null&&this.view.enabled){let h=c.fullWidth,d=c.fullHeight;a+=c.offsetX*r/h,t-=c.offsetY*n/d,r*=c.width/h,n*=c.height/d}let l=this.filmOffset;l!==0&&(a+=e*l/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},ii=-90,ri=1,js=class extends dt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new bt(ii,ri,e,t);r.layers=this.layers,this.add(r);let a=new bt(ii,ri,e,t);a.layers=this.layers,this.add(a);let c=new bt(ii,ri,e,t);c.layers=this.layers,this.add(c);let l=new bt(ii,ri,e,t);l.layers=this.layers,this.add(l);let h=new bt(ii,ri,e,t);h.layers=this.layers,this.add(h);let d=new bt(ii,ri,e,t);d.layers=this.layers,this.add(d)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,a,c,l,h]=t;for(let d of t)this.remove(d);if(e===sn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),c.up.set(0,0,1),c.lookAt(0,-1,0),l.up.set(0,1,0),l.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(e===Er)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),c.up.set(0,0,-1),c.lookAt(0,-1,0),l.up.set(0,-1,0),l.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let d of t)this.add(d),d.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[a,c,l,h,d,s]=this.children,o=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,a),e.setRenderTarget(n,1,r),e.render(t,c),e.setRenderTarget(n,2,r),e.render(t,l),e.setRenderTarget(n,3,r),e.render(t,h),e.setRenderTarget(n,4,r),e.render(t,d),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,r),e.render(t,s),e.setRenderTarget(o,u,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Nr=class extends Xt{constructor(e,t,n,r,a,c,l,h,d,s){e=e!==void 0?e:[],t=t!==void 0?t:di,super(e,t,n,r,a,c,l,h,d,s),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Qs=class extends on{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];t.encoding!==void 0&&(Ri("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Fn?ut:Ot),this.texture=new Nr(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Ft}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Di(5,5,5),a=new ln({name:"CubemapFromEquirect",uniforms:mi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:wt,blending:vn});a.uniforms.tEquirect.value=t;let c=new _t(r,a),l=t.minFilter;return t.minFilter===Li&&(t.minFilter=Ft),new js(1,10,this).update(e,c),t.minFilter=l,c.geometry.dispose(),c.material.dispose(),this}clear(e,t,n,r){let a=e.getRenderTarget();for(let c=0;c<6;c++)e.setRenderTarget(this,c),e.clear(t,n,r);e.setRenderTarget(a)}},Ds=new I,ju=new I,Qu=new Be,rn=class{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Ds.subVectors(n,t).cross(ju.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Ds),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return a<0||a>1?null:t.copy(e.start).addScaledVector(n,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Qu.getNormalMatrix(e),r=this.coplanarPoint(Ds).applyMatrix4(e),a=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ln=new Bn,hr=new I,Ui=class{constructor(e=new rn,t=new rn,n=new rn,r=new rn,a=new rn,c=new rn){this.planes=[e,t,n,r,a,c]}set(e,t,n,r,a,c){let l=this.planes;return l[0].copy(e),l[1].copy(t),l[2].copy(n),l[3].copy(r),l[4].copy(a),l[5].copy(c),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=sn){let n=this.planes,r=e.elements,a=r[0],c=r[1],l=r[2],h=r[3],d=r[4],s=r[5],o=r[6],u=r[7],f=r[8],g=r[9],_=r[10],p=r[11],m=r[12],y=r[13],v=r[14],w=r[15];if(n[0].setComponents(h-a,u-d,p-f,w-m).normalize(),n[1].setComponents(h+a,u+d,p+f,w+m).normalize(),n[2].setComponents(h+c,u+s,p+g,w+y).normalize(),n[3].setComponents(h-c,u-s,p-g,w-y).normalize(),n[4].setComponents(h-l,u-o,p-_,w-v).normalize(),t===sn)n[5].setComponents(h+l,u+o,p+_,w+v).normalize();else if(t===Er)n[5].setComponents(l,o,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ln.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ln.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ln)}intersectsSprite(e){return Ln.center.set(0,0,0),Ln.radius=.7071067811865476,Ln.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ln)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(hr.x=r.normal.x>0?e.max.x:e.min.x,hr.y=r.normal.y>0?e.max.y:e.min.y,hr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(hr)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Vl(){let i=null,e=!1,t=null,n=null;function r(a,c){t(a,c),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){i=a}}}function eh(i,e){let t=e.isWebGL2,n=new WeakMap;function r(d,s){let o=d.array,u=d.usage,f=o.byteLength,g=i.createBuffer();i.bindBuffer(s,g),i.bufferData(s,o,u),d.onUploadCallback();let _;if(o instanceof Float32Array)_=i.FLOAT;else if(o instanceof Uint16Array)if(d.isFloat16BufferAttribute)if(t)_=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=i.UNSIGNED_SHORT;else if(o instanceof Int16Array)_=i.SHORT;else if(o instanceof Uint32Array)_=i.UNSIGNED_INT;else if(o instanceof Int32Array)_=i.INT;else if(o instanceof Int8Array)_=i.BYTE;else if(o instanceof Uint8Array)_=i.UNSIGNED_BYTE;else if(o instanceof Uint8ClampedArray)_=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+o);return{buffer:g,type:_,bytesPerElement:o.BYTES_PER_ELEMENT,version:d.version,size:f}}function a(d,s,o){let u=s.array,f=s._updateRange,g=s.updateRanges;if(i.bindBuffer(o,d),f.count===-1&&g.length===0&&i.bufferSubData(o,0,u),g.length!==0){for(let _=0,p=g.length;_<p;_++){let m=g[_];t?i.bufferSubData(o,m.start*u.BYTES_PER_ELEMENT,u,m.start,m.count):i.bufferSubData(o,m.start*u.BYTES_PER_ELEMENT,u.subarray(m.start,m.start+m.count))}s.clearUpdateRanges()}f.count!==-1&&(t?i.bufferSubData(o,f.offset*u.BYTES_PER_ELEMENT,u,f.offset,f.count):i.bufferSubData(o,f.offset*u.BYTES_PER_ELEMENT,u.subarray(f.offset,f.offset+f.count)),f.count=-1),s.onUploadCallback()}function c(d){return d.isInterleavedBufferAttribute&&(d=d.data),n.get(d)}function l(d){d.isInterleavedBufferAttribute&&(d=d.data);let s=n.get(d);s&&(i.deleteBuffer(s.buffer),n.delete(d))}function h(d,s){if(d.isGLBufferAttribute){let u=n.get(d);(!u||u.version<d.version)&&n.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}d.isInterleavedBufferAttribute&&(d=d.data);let o=n.get(d);if(o===void 0)n.set(d,r(d,s));else if(o.version<d.version){if(o.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");a(o.buffer,d,s),o.version=d.version}}return{get:c,remove:l,update:h}}var Ni=class i extends It{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let a=e/2,c=t/2,l=Math.floor(n),h=Math.floor(r),d=l+1,s=h+1,o=e/l,u=t/h,f=[],g=[],_=[],p=[];for(let m=0;m<s;m++){let y=m*u-c;for(let v=0;v<d;v++){let w=v*o-a;g.push(w,-y,0),_.push(0,0,1),p.push(v/l),p.push(1-m/h)}}for(let m=0;m<h;m++)for(let y=0;y<l;y++){let v=y+d*m,w=y+d*(m+1),C=y+1+d*(m+1),T=y+1+d*m;f.push(v,w,T),f.push(w,C,T)}this.setIndex(f),this.setAttribute("position",new it(g,3)),this.setAttribute("normal",new it(_,3)),this.setAttribute("uv",new it(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},th=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,nh=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,ih=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,rh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,sh=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,ah=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,oh=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,lh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ch=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,uh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,hh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,dh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,fh=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,ph=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,mh=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,gh=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,_h=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,vh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,xh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,yh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Mh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Sh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,bh=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Eh=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Ah=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Th=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,wh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Rh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ch=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Lh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ph="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ih=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,Dh=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Uh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Nh=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Fh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Oh=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Bh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,zh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,kh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Hh=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Vh=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Gh=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Wh=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Xh=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,qh=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Yh=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Zh=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,$h=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Jh=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Kh=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,jh=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Qh=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,ed=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,td=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,nd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,id=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,rd=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,sd=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ad=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,od=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,ld=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,cd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ud=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,hd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,dd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,fd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,pd=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,md=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,gd=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,_d=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,vd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,xd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,yd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Md=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Sd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,bd=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Ed=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ad=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Td=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,wd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Rd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Cd=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Ld=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Pd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Id=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Dd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ud=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Nd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Fd=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Od=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Bd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,zd=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,kd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Hd=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Vd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Gd=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Wd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Xd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,qd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Yd=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Zd=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,$d=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Jd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Kd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,jd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Qd=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,ef=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,tf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,af=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,of=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,lf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,cf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,uf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,hf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,df=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ff=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,pf=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,mf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,gf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_f=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,yf=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mf=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Sf=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,bf=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ef=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Af=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Tf=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wf=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Rf=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cf=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Lf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Pf=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,If=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Df=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Uf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ie={alphahash_fragment:th,alphahash_pars_fragment:nh,alphamap_fragment:ih,alphamap_pars_fragment:rh,alphatest_fragment:sh,alphatest_pars_fragment:ah,aomap_fragment:oh,aomap_pars_fragment:lh,batching_pars_vertex:ch,batching_vertex:uh,begin_vertex:hh,beginnormal_vertex:dh,bsdfs:fh,iridescence_fragment:ph,bumpmap_pars_fragment:mh,clipping_planes_fragment:gh,clipping_planes_pars_fragment:_h,clipping_planes_pars_vertex:vh,clipping_planes_vertex:xh,color_fragment:yh,color_pars_fragment:Mh,color_pars_vertex:Sh,color_vertex:bh,common:Eh,cube_uv_reflection_fragment:Ah,defaultnormal_vertex:Th,displacementmap_pars_vertex:wh,displacementmap_vertex:Rh,emissivemap_fragment:Ch,emissivemap_pars_fragment:Lh,colorspace_fragment:Ph,colorspace_pars_fragment:Ih,envmap_fragment:Dh,envmap_common_pars_fragment:Uh,envmap_pars_fragment:Nh,envmap_pars_vertex:Fh,envmap_physical_pars_fragment:Zh,envmap_vertex:Oh,fog_vertex:Bh,fog_pars_vertex:zh,fog_fragment:kh,fog_pars_fragment:Hh,gradientmap_pars_fragment:Vh,lightmap_fragment:Gh,lightmap_pars_fragment:Wh,lights_lambert_fragment:Xh,lights_lambert_pars_fragment:qh,lights_pars_begin:Yh,lights_toon_fragment:$h,lights_toon_pars_fragment:Jh,lights_phong_fragment:Kh,lights_phong_pars_fragment:jh,lights_physical_fragment:Qh,lights_physical_pars_fragment:ed,lights_fragment_begin:td,lights_fragment_maps:nd,lights_fragment_end:id,logdepthbuf_fragment:rd,logdepthbuf_pars_fragment:sd,logdepthbuf_pars_vertex:ad,logdepthbuf_vertex:od,map_fragment:ld,map_pars_fragment:cd,map_particle_fragment:ud,map_particle_pars_fragment:hd,metalnessmap_fragment:dd,metalnessmap_pars_fragment:fd,morphcolor_vertex:pd,morphnormal_vertex:md,morphtarget_pars_vertex:gd,morphtarget_vertex:_d,normal_fragment_begin:vd,normal_fragment_maps:xd,normal_pars_fragment:yd,normal_pars_vertex:Md,normal_vertex:Sd,normalmap_pars_fragment:bd,clearcoat_normal_fragment_begin:Ed,clearcoat_normal_fragment_maps:Ad,clearcoat_pars_fragment:Td,iridescence_pars_fragment:wd,opaque_fragment:Rd,packing:Cd,premultiplied_alpha_fragment:Ld,project_vertex:Pd,dithering_fragment:Id,dithering_pars_fragment:Dd,roughnessmap_fragment:Ud,roughnessmap_pars_fragment:Nd,shadowmap_pars_fragment:Fd,shadowmap_pars_vertex:Od,shadowmap_vertex:Bd,shadowmask_pars_fragment:zd,skinbase_vertex:kd,skinning_pars_vertex:Hd,skinning_vertex:Vd,skinnormal_vertex:Gd,specularmap_fragment:Wd,specularmap_pars_fragment:Xd,tonemapping_fragment:qd,tonemapping_pars_fragment:Yd,transmission_fragment:Zd,transmission_pars_fragment:$d,uv_pars_fragment:Jd,uv_pars_vertex:Kd,uv_vertex:jd,worldpos_vertex:Qd,background_vert:ef,background_frag:tf,backgroundCube_vert:nf,backgroundCube_frag:rf,cube_vert:sf,cube_frag:af,depth_vert:of,depth_frag:lf,distanceRGBA_vert:cf,distanceRGBA_frag:uf,equirect_vert:hf,equirect_frag:df,linedashed_vert:ff,linedashed_frag:pf,meshbasic_vert:mf,meshbasic_frag:gf,meshlambert_vert:_f,meshlambert_frag:vf,meshmatcap_vert:xf,meshmatcap_frag:yf,meshnormal_vert:Mf,meshnormal_frag:Sf,meshphong_vert:bf,meshphong_frag:Ef,meshphysical_vert:Af,meshphysical_frag:Tf,meshtoon_vert:wf,meshtoon_frag:Rf,points_vert:Cf,points_frag:Lf,shadow_vert:Pf,shadow_frag:If,sprite_vert:Df,sprite_frag:Uf},ne={common:{diffuse:{value:new we(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Be}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Be}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Be}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Be},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Be},normalScale:{value:new He(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Be},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Be}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Be}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Be}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new we(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new we(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0},uvTransform:{value:new Be}},sprite:{diffuse:{value:new we(16777215)},opacity:{value:1},center:{value:new He(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}}},Zt={basic:{uniforms:Mt([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.fog]),vertexShader:Ie.meshbasic_vert,fragmentShader:Ie.meshbasic_frag},lambert:{uniforms:Mt([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,ne.lights,{emissive:{value:new we(0)}}]),vertexShader:Ie.meshlambert_vert,fragmentShader:Ie.meshlambert_frag},phong:{uniforms:Mt([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,ne.lights,{emissive:{value:new we(0)},specular:{value:new we(1118481)},shininess:{value:30}}]),vertexShader:Ie.meshphong_vert,fragmentShader:Ie.meshphong_frag},standard:{uniforms:Mt([ne.common,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.roughnessmap,ne.metalnessmap,ne.fog,ne.lights,{emissive:{value:new we(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ie.meshphysical_vert,fragmentShader:Ie.meshphysical_frag},toon:{uniforms:Mt([ne.common,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.gradientmap,ne.fog,ne.lights,{emissive:{value:new we(0)}}]),vertexShader:Ie.meshtoon_vert,fragmentShader:Ie.meshtoon_frag},matcap:{uniforms:Mt([ne.common,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,{matcap:{value:null}}]),vertexShader:Ie.meshmatcap_vert,fragmentShader:Ie.meshmatcap_frag},points:{uniforms:Mt([ne.points,ne.fog]),vertexShader:Ie.points_vert,fragmentShader:Ie.points_frag},dashed:{uniforms:Mt([ne.common,ne.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ie.linedashed_vert,fragmentShader:Ie.linedashed_frag},depth:{uniforms:Mt([ne.common,ne.displacementmap]),vertexShader:Ie.depth_vert,fragmentShader:Ie.depth_frag},normal:{uniforms:Mt([ne.common,ne.bumpmap,ne.normalmap,ne.displacementmap,{opacity:{value:1}}]),vertexShader:Ie.meshnormal_vert,fragmentShader:Ie.meshnormal_frag},sprite:{uniforms:Mt([ne.sprite,ne.fog]),vertexShader:Ie.sprite_vert,fragmentShader:Ie.sprite_frag},background:{uniforms:{uvTransform:{value:new Be},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ie.background_vert,fragmentShader:Ie.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ie.backgroundCube_vert,fragmentShader:Ie.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ie.cube_vert,fragmentShader:Ie.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ie.equirect_vert,fragmentShader:Ie.equirect_frag},distanceRGBA:{uniforms:Mt([ne.common,ne.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ie.distanceRGBA_vert,fragmentShader:Ie.distanceRGBA_frag},shadow:{uniforms:Mt([ne.lights,ne.fog,{color:{value:new we(0)},opacity:{value:1}}]),vertexShader:Ie.shadow_vert,fragmentShader:Ie.shadow_frag}};Zt.physical={uniforms:Mt([Zt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Be},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Be},clearcoatNormalScale:{value:new He(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Be},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Be},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Be},sheen:{value:0},sheenColor:{value:new we(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Be},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Be},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Be},transmissionSamplerSize:{value:new He},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Be},attenuationDistance:{value:0},attenuationColor:{value:new we(0)},specularColor:{value:new we(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Be},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Be},anisotropyVector:{value:new He},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Be}}]),vertexShader:Ie.meshphysical_vert,fragmentShader:Ie.meshphysical_frag};var dr={r:0,b:0,g:0};function Nf(i,e,t,n,r,a,c){let l=new we(0),h=a===!0?0:1,d,s,o=null,u=0,f=null;function g(p,m){let y=!1,v=m.isScene===!0?m.background:null;v&&v.isTexture&&(v=(m.backgroundBlurriness>0?t:e).get(v)),v===null?_(l,h):v&&v.isColor&&(_(v,1),y=!0);let w=i.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,c):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,c),(i.autoClear||y)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),v&&(v.isCubeTexture||v.mapping===Yr)?(s===void 0&&(s=new _t(new Di(1,1,1),new ln({name:"BackgroundCubeMaterial",uniforms:mi(Zt.backgroundCube.uniforms),vertexShader:Zt.backgroundCube.vertexShader,fragmentShader:Zt.backgroundCube.fragmentShader,side:wt,depthTest:!1,depthWrite:!1,fog:!1})),s.geometry.deleteAttribute("normal"),s.geometry.deleteAttribute("uv"),s.onBeforeRender=function(C,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(s.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(s)),s.material.uniforms.envMap.value=v,s.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,s.material.uniforms.backgroundBlurriness.value=m.backgroundBlurriness,s.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,s.material.toneMapped=We.getTransfer(v.colorSpace)!==Ze,(o!==v||u!==v.version||f!==i.toneMapping)&&(s.material.needsUpdate=!0,o=v,u=v.version,f=i.toneMapping),s.layers.enableAll(),p.unshift(s,s.geometry,s.material,0,0,null)):v&&v.isTexture&&(d===void 0&&(d=new _t(new Ni(2,2),new ln({name:"BackgroundMaterial",uniforms:mi(Zt.background.uniforms),vertexShader:Zt.background.vertexShader,fragmentShader:Zt.background.fragmentShader,side:Mn,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),Object.defineProperty(d.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(d)),d.material.uniforms.t2D.value=v,d.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,d.material.toneMapped=We.getTransfer(v.colorSpace)!==Ze,v.matrixAutoUpdate===!0&&v.updateMatrix(),d.material.uniforms.uvTransform.value.copy(v.matrix),(o!==v||u!==v.version||f!==i.toneMapping)&&(d.material.needsUpdate=!0,o=v,u=v.version,f=i.toneMapping),d.layers.enableAll(),p.unshift(d,d.geometry,d.material,0,0,null))}function _(p,m){p.getRGB(dr,Hl(i)),n.buffers.color.setClear(dr.r,dr.g,dr.b,m,c)}return{getClearColor:function(){return l},setClearColor:function(p,m=1){l.set(p),h=m,_(l,h)},getClearAlpha:function(){return h},setClearAlpha:function(p){h=p,_(l,h)},render:g}}function Ff(i,e,t,n){let r=i.getParameter(i.MAX_VERTEX_ATTRIBS),a=n.isWebGL2?null:e.get("OES_vertex_array_object"),c=n.isWebGL2||a!==null,l={},h=p(null),d=h,s=!1;function o(L,B,V,X,W){let G=!1;if(c){let J=_(X,V,B);d!==J&&(d=J,f(d.object)),G=m(L,X,V,W),G&&y(L,X,V,W)}else{let J=B.wireframe===!0;(d.geometry!==X.id||d.program!==V.id||d.wireframe!==J)&&(d.geometry=X.id,d.program=V.id,d.wireframe=J,G=!0)}W!==null&&t.update(W,i.ELEMENT_ARRAY_BUFFER),(G||s)&&(s=!1,D(L,B,V,X),W!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(W).buffer))}function u(){return n.isWebGL2?i.createVertexArray():a.createVertexArrayOES()}function f(L){return n.isWebGL2?i.bindVertexArray(L):a.bindVertexArrayOES(L)}function g(L){return n.isWebGL2?i.deleteVertexArray(L):a.deleteVertexArrayOES(L)}function _(L,B,V){let X=V.wireframe===!0,W=l[L.id];W===void 0&&(W={},l[L.id]=W);let G=W[B.id];G===void 0&&(G={},W[B.id]=G);let J=G[X];return J===void 0&&(J=p(u()),G[X]=J),J}function p(L){let B=[],V=[],X=[];for(let W=0;W<r;W++)B[W]=0,V[W]=0,X[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:V,attributeDivisors:X,object:L,attributes:{},index:null}}function m(L,B,V,X){let W=d.attributes,G=B.attributes,J=0,Q=V.getAttributes();for(let le in Q)if(Q[le].location>=0){let Y=W[le],ae=G[le];if(ae===void 0&&(le==="instanceMatrix"&&L.instanceMatrix&&(ae=L.instanceMatrix),le==="instanceColor"&&L.instanceColor&&(ae=L.instanceColor)),Y===void 0||Y.attribute!==ae||ae&&Y.data!==ae.data)return!0;J++}return d.attributesNum!==J||d.index!==X}function y(L,B,V,X){let W={},G=B.attributes,J=0,Q=V.getAttributes();for(let le in Q)if(Q[le].location>=0){let Y=G[le];Y===void 0&&(le==="instanceMatrix"&&L.instanceMatrix&&(Y=L.instanceMatrix),le==="instanceColor"&&L.instanceColor&&(Y=L.instanceColor));let ae={};ae.attribute=Y,Y&&Y.data&&(ae.data=Y.data),W[le]=ae,J++}d.attributes=W,d.attributesNum=J,d.index=X}function v(){let L=d.newAttributes;for(let B=0,V=L.length;B<V;B++)L[B]=0}function w(L){C(L,0)}function C(L,B){let V=d.newAttributes,X=d.enabledAttributes,W=d.attributeDivisors;V[L]=1,X[L]===0&&(i.enableVertexAttribArray(L),X[L]=1),W[L]!==B&&((n.isWebGL2?i:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](L,B),W[L]=B)}function T(){let L=d.newAttributes,B=d.enabledAttributes;for(let V=0,X=B.length;V<X;V++)B[V]!==L[V]&&(i.disableVertexAttribArray(V),B[V]=0)}function A(L,B,V,X,W,G,J){J===!0?i.vertexAttribIPointer(L,B,V,W,G):i.vertexAttribPointer(L,B,V,X,W,G)}function D(L,B,V,X){if(n.isWebGL2===!1&&(L.isInstancedMesh||X.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;v();let W=X.attributes,G=V.getAttributes(),J=B.defaultAttributeValues;for(let Q in G){let le=G[Q];if(le.location>=0){let H=W[Q];if(H===void 0&&(Q==="instanceMatrix"&&L.instanceMatrix&&(H=L.instanceMatrix),Q==="instanceColor"&&L.instanceColor&&(H=L.instanceColor)),H!==void 0){let Y=H.normalized,ae=H.itemSize,me=t.get(H);if(me===void 0)continue;let pe=me.buffer,Re=me.type,Le=me.bytesPerElement,Me=n.isWebGL2===!0&&(Re===i.INT||Re===i.UNSIGNED_INT||H.gpuType===Ll);if(H.isInterleavedBufferAttribute){let ke=H.data,U=ke.stride,vt=H.offset;if(ke.isInstancedInterleavedBuffer){for(let _e=0;_e<le.locationSize;_e++)C(le.location+_e,ke.meshPerAttribute);L.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ke.meshPerAttribute*ke.count)}else for(let _e=0;_e<le.locationSize;_e++)w(le.location+_e);i.bindBuffer(i.ARRAY_BUFFER,pe);for(let _e=0;_e<le.locationSize;_e++)A(le.location+_e,ae/le.locationSize,Re,Y,U*Le,(vt+ae/le.locationSize*_e)*Le,Me)}else{if(H.isInstancedBufferAttribute){for(let ke=0;ke<le.locationSize;ke++)C(le.location+ke,H.meshPerAttribute);L.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=H.meshPerAttribute*H.count)}else for(let ke=0;ke<le.locationSize;ke++)w(le.location+ke);i.bindBuffer(i.ARRAY_BUFFER,pe);for(let ke=0;ke<le.locationSize;ke++)A(le.location+ke,ae/le.locationSize,Re,Y,ae*Le,ae/le.locationSize*ke*Le,Me)}}else if(J!==void 0){let Y=J[Q];if(Y!==void 0)switch(Y.length){case 2:i.vertexAttrib2fv(le.location,Y);break;case 3:i.vertexAttrib3fv(le.location,Y);break;case 4:i.vertexAttrib4fv(le.location,Y);break;default:i.vertexAttrib1fv(le.location,Y)}}}}T()}function S(){q();for(let L in l){let B=l[L];for(let V in B){let X=B[V];for(let W in X)g(X[W].object),delete X[W];delete B[V]}delete l[L]}}function E(L){if(l[L.id]===void 0)return;let B=l[L.id];for(let V in B){let X=B[V];for(let W in X)g(X[W].object),delete X[W];delete B[V]}delete l[L.id]}function k(L){for(let B in l){let V=l[B];if(V[L.id]===void 0)continue;let X=V[L.id];for(let W in X)g(X[W].object),delete X[W];delete V[L.id]}}function q(){ee(),s=!0,d!==h&&(d=h,f(d.object))}function ee(){h.geometry=null,h.program=null,h.wireframe=!1}return{setup:o,reset:q,resetDefaultState:ee,dispose:S,releaseStatesOfGeometry:E,releaseStatesOfProgram:k,initAttributes:v,enableAttribute:w,disableUnusedAttributes:T}}function Of(i,e,t,n){let r=n.isWebGL2,a;function c(s){a=s}function l(s,o){i.drawArrays(a,s,o),t.update(o,a,1)}function h(s,o,u){if(u===0)return;let f,g;if(r)f=i,g="drawArraysInstanced";else if(f=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[g](a,s,o,u),t.update(o,a,u)}function d(s,o,u){if(u===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<u;g++)this.render(s[g],o[g]);else{f.multiDrawArraysWEBGL(a,s,0,o,0,u);let g=0;for(let _=0;_<u;_++)g+=o[_];t.update(g,a,1)}}this.setMode=c,this.render=l,this.renderInstances=h,this.renderMultiDraw=d}function Bf(i,e,t){let n;function r(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){let A=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function a(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext",l=t.precision!==void 0?t.precision:"highp",h=a(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let d=c||e.has("WEBGL_draw_buffers"),s=t.logarithmicDepthBuffer===!0,o=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),u=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),_=i.getParameter(i.MAX_VERTEX_ATTRIBS),p=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),m=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),v=u>0,w=c||e.has("OES_texture_float"),C=v&&w,T=c?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:c,drawBuffers:d,getMaxAnisotropy:r,getMaxPrecision:a,precision:l,logarithmicDepthBuffer:s,maxTextures:o,maxVertexTextures:u,maxTextureSize:f,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:p,maxVaryings:m,maxFragmentUniforms:y,vertexTextures:v,floatFragmentTextures:w,floatVertexTextures:C,maxSamples:T}}function zf(i){let e=this,t=null,n=0,r=!1,a=!1,c=new rn,l=new Be,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(o,u){let f=o.length!==0||u||n!==0||r;return r=u,n=o.length,f},this.beginShadows=function(){a=!0,s(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(o,u){t=s(o,u,0)},this.setState=function(o,u,f){let g=o.clippingPlanes,_=o.clipIntersection,p=o.clipShadows,m=i.get(o);if(!r||g===null||g.length===0||a&&!p)a?s(null):d();else{let y=a?0:n,v=y*4,w=m.clippingState||null;h.value=w,w=s(g,u,v,f);for(let C=0;C!==v;++C)w[C]=t[C];m.clippingState=w,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function d(){h.value!==t&&(h.value=t,h.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function s(o,u,f,g){let _=o!==null?o.length:0,p=null;if(_!==0){if(p=h.value,g!==!0||p===null){let m=f+_*4,y=u.matrixWorldInverse;l.getNormalMatrix(y),(p===null||p.length<m)&&(p=new Float32Array(m));for(let v=0,w=f;v!==_;++v,w+=4)c.copy(o[v]).applyMatrix4(y,l),c.normal.toArray(p,w),p[w+3]=c.constant}h.value=p,h.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,p}}function kf(i){let e=new WeakMap;function t(c,l){return l===Gs?c.mapping=di:l===Ws&&(c.mapping=fi),c}function n(c){if(c&&c.isTexture){let l=c.mapping;if(l===Gs||l===Ws)if(e.has(c)){let h=e.get(c).texture;return t(h,c.mapping)}else{let h=c.image;if(h&&h.height>0){let d=new Qs(h.height/2);return d.fromEquirectangularTexture(i,c),e.set(c,d),c.addEventListener("dispose",r),t(d.texture,c.mapping)}else return null}}return c}function r(c){let l=c.target;l.removeEventListener("dispose",r);let h=e.get(l);h!==void 0&&(e.delete(l),h.dispose())}function a(){e=new WeakMap}return{get:n,dispose:a}}var Fr=class extends Ur{constructor(e=-1,t=1,n=1,r=-1,a=.1,c=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=a,this.far=c,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,a,c){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=a,this.view.height=c,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,a=n-e,c=n+e,l=r+t,h=r-t;if(this.view!==null&&this.view.enabled){let d=(this.right-this.left)/this.view.fullWidth/this.zoom,s=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=d*this.view.offsetX,c=a+d*this.view.width,l-=s*this.view.offsetY,h=l-s*this.view.height}this.projectionMatrix.makeOrthographic(a,c,l,h,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},oi=4,Ko=[.125,.215,.35,.446,.526,.582],Dn=20,Us=new Fr,jo=new we,Ns=null,Fs=0,Os=0,Pn=(1+Math.sqrt(5))/2,si=1/Pn,Qo=[new I(1,1,1),new I(-1,1,1),new I(1,1,-1),new I(-1,1,-1),new I(0,Pn,si),new I(0,Pn,-si),new I(si,0,Pn),new I(-si,0,Pn),new I(Pn,si,0),new I(-Pn,si,0)],Or=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){Ns=this._renderer.getRenderTarget(),Fs=this._renderer.getActiveCubeFace(),Os=this._renderer.getActiveMipmapLevel(),this._setSize(256);let a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(e,n,r,a),t>0&&this._blur(a,0,0,t),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=nl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=tl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ns,Fs,Os),e.scissorTest=!1,fr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===di||e.mapping===fi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ns=this._renderer.getRenderTarget(),Fs=this._renderer.getActiveCubeFace(),Os=this._renderer.getActiveMipmapLevel();let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Ft,minFilter:Ft,generateMipmaps:!1,type:Pi,format:Wt,colorSpace:an,depthBuffer:!1},r=el(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=el(e,t,n);let{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Hf(a)),this._blurMaterial=Vf(a,e,t)}return r}_compileMaterial(e){let t=new _t(this._lodPlanes[0],e);this._renderer.compile(t,Us)}_sceneToCubeUV(e,t,n,r){let l=new bt(90,1,t,n),h=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],s=this._renderer,o=s.autoClear,u=s.toneMapping;s.getClearColor(jo),s.toneMapping=xn,s.autoClear=!1;let f=new Pr({name:"PMREM.Background",side:wt,depthWrite:!1,depthTest:!1}),g=new _t(new Di,f),_=!1,p=e.background;p?p.isColor&&(f.color.copy(p),e.background=null,_=!0):(f.color.copy(jo),_=!0);for(let m=0;m<6;m++){let y=m%3;y===0?(l.up.set(0,h[m],0),l.lookAt(d[m],0,0)):y===1?(l.up.set(0,0,h[m]),l.lookAt(0,d[m],0)):(l.up.set(0,h[m],0),l.lookAt(0,0,d[m]));let v=this._cubeSize;fr(r,y*v,m>2?v:0,v,v),s.setRenderTarget(r),_&&s.render(g,l),s.render(e,l)}g.geometry.dispose(),g.material.dispose(),s.toneMapping=u,s.autoClear=o,e.background=p}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===di||e.mapping===fi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=nl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=tl());let a=r?this._cubemapMaterial:this._equirectMaterial,c=new _t(this._lodPlanes[0],a),l=a.uniforms;l.envMap.value=e;let h=this._cubeSize;fr(t,0,0,3*h,2*h),n.setRenderTarget(t),n.render(c,Us)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){let a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),c=Qo[(r-1)%Qo.length];this._blur(e,r-1,r,a,c)}t.autoClear=n}_blur(e,t,n,r,a){let c=this._pingPongRenderTarget;this._halfBlur(e,c,t,n,r,"latitudinal",a),this._halfBlur(c,e,n,n,r,"longitudinal",a)}_halfBlur(e,t,n,r,a,c,l){let h=this._renderer,d=this._blurMaterial;c!=="latitudinal"&&c!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let s=3,o=new _t(this._lodPlanes[r],d),u=d.uniforms,f=this._sizeLods[n]-1,g=isFinite(a)?Math.PI/(2*f):2*Math.PI/(2*Dn-1),_=a/g,p=isFinite(a)?1+Math.floor(s*_):Dn;p>Dn&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Dn}`);let m=[],y=0;for(let A=0;A<Dn;++A){let D=A/_,S=Math.exp(-D*D/2);m.push(S),A===0?y+=S:A<p&&(y+=2*S)}for(let A=0;A<m.length;A++)m[A]=m[A]/y;u.envMap.value=e.texture,u.samples.value=p,u.weights.value=m,u.latitudinal.value=c==="latitudinal",l&&(u.poleAxis.value=l);let{_lodMax:v}=this;u.dTheta.value=g,u.mipInt.value=v-n;let w=this._sizeLods[r],C=3*w*(r>v-oi?r-v+oi:0),T=4*(this._cubeSize-w);fr(t,C,T,3*w,2*w),h.setRenderTarget(t),h.render(o,Us)}};function Hf(i){let e=[],t=[],n=[],r=i,a=i-oi+1+Ko.length;for(let c=0;c<a;c++){let l=Math.pow(2,r);t.push(l);let h=1/l;c>i-oi?h=Ko[c-i+oi-1]:c===0&&(h=0),n.push(h);let d=1/(l-2),s=-d,o=1+d,u=[s,s,o,s,o,o,s,s,o,o,s,o],f=6,g=6,_=3,p=2,m=1,y=new Float32Array(_*g*f),v=new Float32Array(p*g*f),w=new Float32Array(m*g*f);for(let T=0;T<f;T++){let A=T%3*2/3-1,D=T>2?0:-1,S=[A,D,0,A+2/3,D,0,A+2/3,D+1,0,A,D,0,A+2/3,D+1,0,A,D+1,0];y.set(S,_*g*T),v.set(u,p*g*T);let E=[T,T,T,T,T,T];w.set(E,m*g*T)}let C=new It;C.setAttribute("position",new ht(y,_)),C.setAttribute("uv",new ht(v,p)),C.setAttribute("faceIndex",new ht(w,m)),e.push(C),r>oi&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function el(i,e,t){let n=new on(i,e,t);return n.texture.mapping=Yr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function fr(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function Vf(i,e,t){let n=new Float32Array(Dn),r=new I(0,1,0);return new ln({name:"SphericalGaussianBlur",defines:{n:Dn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Pa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:vn,depthTest:!1,depthWrite:!1})}function tl(){return new ln({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Pa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:vn,depthTest:!1,depthWrite:!1})}function nl(){return new ln({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Pa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:vn,depthTest:!1,depthWrite:!1})}function Pa(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Gf(i){let e=new WeakMap,t=null;function n(l){if(l&&l.isTexture){let h=l.mapping,d=h===Gs||h===Ws,s=h===di||h===fi;if(d||s)if(l.isRenderTargetTexture&&l.needsPMREMUpdate===!0){l.needsPMREMUpdate=!1;let o=e.get(l);return t===null&&(t=new Or(i)),o=d?t.fromEquirectangular(l,o):t.fromCubemap(l,o),e.set(l,o),o.texture}else{if(e.has(l))return e.get(l).texture;{let o=l.image;if(d&&o&&o.height>0||s&&o&&r(o)){t===null&&(t=new Or(i));let u=d?t.fromEquirectangular(l):t.fromCubemap(l);return e.set(l,u),l.addEventListener("dispose",a),u.texture}else return null}}}return l}function r(l){let h=0,d=6;for(let s=0;s<d;s++)l[s]!==void 0&&h++;return h===d}function a(l){let h=l.target;h.removeEventListener("dispose",a);let d=e.get(h);d!==void 0&&(e.delete(h),d.dispose())}function c(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:c}}function Wf(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){let r=t(n);return r===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function Xf(i,e,t,n){let r={},a=new WeakMap;function c(o){let u=o.target;u.index!==null&&e.remove(u.index);for(let g in u.attributes)e.remove(u.attributes[g]);for(let g in u.morphAttributes){let _=u.morphAttributes[g];for(let p=0,m=_.length;p<m;p++)e.remove(_[p])}u.removeEventListener("dispose",c),delete r[u.id];let f=a.get(u);f&&(e.remove(f),a.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function l(o,u){return r[u.id]===!0||(u.addEventListener("dispose",c),r[u.id]=!0,t.memory.geometries++),u}function h(o){let u=o.attributes;for(let g in u)e.update(u[g],i.ARRAY_BUFFER);let f=o.morphAttributes;for(let g in f){let _=f[g];for(let p=0,m=_.length;p<m;p++)e.update(_[p],i.ARRAY_BUFFER)}}function d(o){let u=[],f=o.index,g=o.attributes.position,_=0;if(f!==null){let y=f.array;_=f.version;for(let v=0,w=y.length;v<w;v+=3){let C=y[v+0],T=y[v+1],A=y[v+2];u.push(C,T,T,A,A,C)}}else if(g!==void 0){let y=g.array;_=g.version;for(let v=0,w=y.length/3-1;v<w;v+=3){let C=v+0,T=v+1,A=v+2;u.push(C,T,T,A,A,C)}}else return;let p=new(zl(u)?Dr:Ir)(u,1);p.version=_;let m=a.get(o);m&&e.remove(m),a.set(o,p)}function s(o){let u=a.get(o);if(u){let f=o.index;f!==null&&u.version<f.version&&d(o)}else d(o);return a.get(o)}return{get:l,update:h,getWireframeAttribute:s}}function qf(i,e,t,n){let r=n.isWebGL2,a;function c(f){a=f}let l,h;function d(f){l=f.type,h=f.bytesPerElement}function s(f,g){i.drawElements(a,g,l,f*h),t.update(g,a,1)}function o(f,g,_){if(_===0)return;let p,m;if(r)p=i,m="drawElementsInstanced";else if(p=e.get("ANGLE_instanced_arrays"),m="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[m](a,g,l,f*h,_),t.update(g,a,_)}function u(f,g,_){if(_===0)return;let p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<_;m++)this.render(f[m]/h,g[m]);else{p.multiDrawElementsWEBGL(a,g,0,l,f,0,_);let m=0;for(let y=0;y<_;y++)m+=g[y];t.update(m,a,1)}}this.setMode=c,this.setIndex=d,this.render=s,this.renderInstances=o,this.renderMultiDraw=u}function Yf(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(a,c,l){switch(t.calls++,c){case i.TRIANGLES:t.triangles+=l*(a/3);break;case i.LINES:t.lines+=l*(a/2);break;case i.LINE_STRIP:t.lines+=l*(a-1);break;case i.LINE_LOOP:t.lines+=l*a;break;case i.POINTS:t.points+=l*a;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",c);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function Zf(i,e){return i[0]-e[0]}function $f(i,e){return Math.abs(e[1])-Math.abs(i[1])}function Jf(i,e,t){let n={},r=new Float32Array(8),a=new WeakMap,c=new ct,l=[];for(let d=0;d<8;d++)l[d]=[d,0];function h(d,s,o){let u=d.morphTargetInfluences;if(e.isWebGL2===!0){let f=s.morphAttributes.position||s.morphAttributes.normal||s.morphAttributes.color,g=f!==void 0?f.length:0,_=a.get(s);if(_===void 0||_.count!==g){let L=function(){q.dispose(),a.delete(s),s.removeEventListener("dispose",L)};_!==void 0&&_.texture.dispose();let y=s.morphAttributes.position!==void 0,v=s.morphAttributes.normal!==void 0,w=s.morphAttributes.color!==void 0,C=s.morphAttributes.position||[],T=s.morphAttributes.normal||[],A=s.morphAttributes.color||[],D=0;y===!0&&(D=1),v===!0&&(D=2),w===!0&&(D=3);let S=s.attributes.position.count*D,E=1;S>e.maxTextureSize&&(E=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);let k=new Float32Array(S*E*4*g),q=new Rr(k,S,E,g);q.type=gn,q.needsUpdate=!0;let ee=D*4;for(let B=0;B<g;B++){let V=C[B],X=T[B],W=A[B],G=S*E*4*B;for(let J=0;J<V.count;J++){let Q=J*ee;y===!0&&(c.fromBufferAttribute(V,J),k[G+Q+0]=c.x,k[G+Q+1]=c.y,k[G+Q+2]=c.z,k[G+Q+3]=0),v===!0&&(c.fromBufferAttribute(X,J),k[G+Q+4]=c.x,k[G+Q+5]=c.y,k[G+Q+6]=c.z,k[G+Q+7]=0),w===!0&&(c.fromBufferAttribute(W,J),k[G+Q+8]=c.x,k[G+Q+9]=c.y,k[G+Q+10]=c.z,k[G+Q+11]=W.itemSize===4?c.w:1)}}_={count:g,texture:q,size:new He(S,E)},a.set(s,_),s.addEventListener("dispose",L)}let p=0;for(let y=0;y<u.length;y++)p+=u[y];let m=s.morphTargetsRelative?1:1-p;o.getUniforms().setValue(i,"morphTargetBaseInfluence",m),o.getUniforms().setValue(i,"morphTargetInfluences",u),o.getUniforms().setValue(i,"morphTargetsTexture",_.texture,t),o.getUniforms().setValue(i,"morphTargetsTextureSize",_.size)}else{let f=u===void 0?0:u.length,g=n[s.id];if(g===void 0||g.length!==f){g=[];for(let v=0;v<f;v++)g[v]=[v,0];n[s.id]=g}for(let v=0;v<f;v++){let w=g[v];w[0]=v,w[1]=u[v]}g.sort($f);for(let v=0;v<8;v++)v<f&&g[v][1]?(l[v][0]=g[v][0],l[v][1]=g[v][1]):(l[v][0]=Number.MAX_SAFE_INTEGER,l[v][1]=0);l.sort(Zf);let _=s.morphAttributes.position,p=s.morphAttributes.normal,m=0;for(let v=0;v<8;v++){let w=l[v],C=w[0],T=w[1];C!==Number.MAX_SAFE_INTEGER&&T?(_&&s.getAttribute("morphTarget"+v)!==_[C]&&s.setAttribute("morphTarget"+v,_[C]),p&&s.getAttribute("morphNormal"+v)!==p[C]&&s.setAttribute("morphNormal"+v,p[C]),r[v]=T,m+=T):(_&&s.hasAttribute("morphTarget"+v)===!0&&s.deleteAttribute("morphTarget"+v),p&&s.hasAttribute("morphNormal"+v)===!0&&s.deleteAttribute("morphNormal"+v),r[v]=0)}let y=s.morphTargetsRelative?1:1-m;o.getUniforms().setValue(i,"morphTargetBaseInfluence",y),o.getUniforms().setValue(i,"morphTargetInfluences",r)}}return{update:h}}function Kf(i,e,t,n){let r=new WeakMap;function a(h){let d=n.render.frame,s=h.geometry,o=e.get(h,s);if(r.get(o)!==d&&(e.update(o),r.set(o,d)),h.isInstancedMesh&&(h.hasEventListener("dispose",l)===!1&&h.addEventListener("dispose",l),r.get(h)!==d&&(t.update(h.instanceMatrix,i.ARRAY_BUFFER),h.instanceColor!==null&&t.update(h.instanceColor,i.ARRAY_BUFFER),r.set(h,d))),h.isSkinnedMesh){let u=h.skeleton;r.get(u)!==d&&(u.update(),r.set(u,d))}return o}function c(){r=new WeakMap}function l(h){let d=h.target;d.removeEventListener("dispose",l),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:a,dispose:c}}var Br=class extends Xt{constructor(e,t,n,r,a,c,l,h,d,s){if(s=s!==void 0?s:Nn,s!==Nn&&s!==pi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&s===Nn&&(n=mn),n===void 0&&s===pi&&(n=Un),super(null,r,a,c,l,h,s,n,d),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=l!==void 0?l:St,this.minFilter=h!==void 0?h:St,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Gl=new Xt,Wl=new Br(1,1);Wl.compareFunction=Bl;var Xl=new Rr,ql=new Ks,Yl=new Nr,il=[],rl=[],sl=new Float32Array(16),al=new Float32Array(9),ol=new Float32Array(4);function xi(i,e,t){let n=i[0];if(n<=0||n>0)return i;let r=e*t,a=il[r];if(a===void 0&&(a=new Float32Array(r),il[r]=a),e!==0){n.toArray(a,0);for(let c=1,l=0;c!==e;++c)l+=t,i[c].toArray(a,l)}return a}function rt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function st(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function $r(i,e){let t=rl[e];t===void 0&&(t=new Int32Array(e),rl[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function jf(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Qf(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rt(t,e))return;i.uniform2fv(this.addr,e),st(t,e)}}function ep(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(rt(t,e))return;i.uniform3fv(this.addr,e),st(t,e)}}function tp(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rt(t,e))return;i.uniform4fv(this.addr,e),st(t,e)}}function np(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(rt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),st(t,e)}else{if(rt(t,n))return;ol.set(n),i.uniformMatrix2fv(this.addr,!1,ol),st(t,n)}}function ip(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(rt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),st(t,e)}else{if(rt(t,n))return;al.set(n),i.uniformMatrix3fv(this.addr,!1,al),st(t,n)}}function rp(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(rt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),st(t,e)}else{if(rt(t,n))return;sl.set(n),i.uniformMatrix4fv(this.addr,!1,sl),st(t,n)}}function sp(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function ap(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rt(t,e))return;i.uniform2iv(this.addr,e),st(t,e)}}function op(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(rt(t,e))return;i.uniform3iv(this.addr,e),st(t,e)}}function lp(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rt(t,e))return;i.uniform4iv(this.addr,e),st(t,e)}}function cp(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function up(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rt(t,e))return;i.uniform2uiv(this.addr,e),st(t,e)}}function hp(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(rt(t,e))return;i.uniform3uiv(this.addr,e),st(t,e)}}function dp(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rt(t,e))return;i.uniform4uiv(this.addr,e),st(t,e)}}function fp(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let a=this.type===i.SAMPLER_2D_SHADOW?Wl:Gl;t.setTexture2D(e||a,r)}function pp(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||ql,r)}function mp(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Yl,r)}function gp(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Xl,r)}function _p(i){switch(i){case 5126:return jf;case 35664:return Qf;case 35665:return ep;case 35666:return tp;case 35674:return np;case 35675:return ip;case 35676:return rp;case 5124:case 35670:return sp;case 35667:case 35671:return ap;case 35668:case 35672:return op;case 35669:case 35673:return lp;case 5125:return cp;case 36294:return up;case 36295:return hp;case 36296:return dp;case 35678:case 36198:case 36298:case 36306:case 35682:return fp;case 35679:case 36299:case 36307:return pp;case 35680:case 36300:case 36308:case 36293:return mp;case 36289:case 36303:case 36311:case 36292:return gp}}function vp(i,e){i.uniform1fv(this.addr,e)}function xp(i,e){let t=xi(e,this.size,2);i.uniform2fv(this.addr,t)}function yp(i,e){let t=xi(e,this.size,3);i.uniform3fv(this.addr,t)}function Mp(i,e){let t=xi(e,this.size,4);i.uniform4fv(this.addr,t)}function Sp(i,e){let t=xi(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function bp(i,e){let t=xi(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Ep(i,e){let t=xi(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Ap(i,e){i.uniform1iv(this.addr,e)}function Tp(i,e){i.uniform2iv(this.addr,e)}function wp(i,e){i.uniform3iv(this.addr,e)}function Rp(i,e){i.uniform4iv(this.addr,e)}function Cp(i,e){i.uniform1uiv(this.addr,e)}function Lp(i,e){i.uniform2uiv(this.addr,e)}function Pp(i,e){i.uniform3uiv(this.addr,e)}function Ip(i,e){i.uniform4uiv(this.addr,e)}function Dp(i,e,t){let n=this.cache,r=e.length,a=$r(t,r);rt(n,a)||(i.uniform1iv(this.addr,a),st(n,a));for(let c=0;c!==r;++c)t.setTexture2D(e[c]||Gl,a[c])}function Up(i,e,t){let n=this.cache,r=e.length,a=$r(t,r);rt(n,a)||(i.uniform1iv(this.addr,a),st(n,a));for(let c=0;c!==r;++c)t.setTexture3D(e[c]||ql,a[c])}function Np(i,e,t){let n=this.cache,r=e.length,a=$r(t,r);rt(n,a)||(i.uniform1iv(this.addr,a),st(n,a));for(let c=0;c!==r;++c)t.setTextureCube(e[c]||Yl,a[c])}function Fp(i,e,t){let n=this.cache,r=e.length,a=$r(t,r);rt(n,a)||(i.uniform1iv(this.addr,a),st(n,a));for(let c=0;c!==r;++c)t.setTexture2DArray(e[c]||Xl,a[c])}function Op(i){switch(i){case 5126:return vp;case 35664:return xp;case 35665:return yp;case 35666:return Mp;case 35674:return Sp;case 35675:return bp;case 35676:return Ep;case 5124:case 35670:return Ap;case 35667:case 35671:return Tp;case 35668:case 35672:return wp;case 35669:case 35673:return Rp;case 5125:return Cp;case 36294:return Lp;case 36295:return Pp;case 36296:return Ip;case 35678:case 36198:case 36298:case 36306:case 35682:return Dp;case 35679:case 36299:case 36307:return Up;case 35680:case 36300:case 36308:case 36293:return Np;case 36289:case 36303:case 36311:case 36292:return Fp}}var ea=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=_p(t.type)}},ta=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Op(t.type)}},na=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let a=0,c=r.length;a!==c;++a){let l=r[a];l.setValue(e,t[l.id],n)}}},Bs=/(\w+)(\])?(\[|\.)?/g;function ll(i,e){i.seq.push(e),i.map[e.id]=e}function Bp(i,e,t){let n=i.name,r=n.length;for(Bs.lastIndex=0;;){let a=Bs.exec(n),c=Bs.lastIndex,l=a[1],h=a[2]==="]",d=a[3];if(h&&(l=l|0),d===void 0||d==="["&&c+2===r){ll(t,d===void 0?new ea(l,i,e):new ta(l,i,e));break}else{let o=t.map[l];o===void 0&&(o=new na(l),ll(t,o)),t=o}}}var hi=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let a=e.getActiveUniform(t,r),c=e.getUniformLocation(t,a.name);Bp(a,c,this)}}setValue(e,t,n,r){let a=this.map[t];a!==void 0&&a.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let a=0,c=t.length;a!==c;++a){let l=t[a],h=n[l.id];h.needsUpdate!==!1&&l.setValue(e,h.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,a=e.length;r!==a;++r){let c=e[r];c.id in t&&n.push(c)}return n}};function cl(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var zp=37297,kp=0;function Hp(i,e){let t=i.split(`
`),n=[],r=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let c=r;c<a;c++){let l=c+1;n.push(`${l===e?">":" "} ${l}: ${t[c]}`)}return n.join(`
`)}function Vp(i){let e=We.getPrimaries(We.workingColorSpace),t=We.getPrimaries(i),n;switch(e===t?n="":e===br&&t===Sr?n="LinearDisplayP3ToLinearSRGB":e===Sr&&t===br&&(n="LinearSRGBToLinearDisplayP3"),i){case an:case Zr:return[n,"LinearTransferOETF"];case ut:case La:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function ul(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let c=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Hp(i.getShaderSource(e),c)}else return r}function Gp(i,e){let t=Vp(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Wp(i,e){let t;switch(e){case ou:t="Linear";break;case lu:t="Reinhard";break;case cu:t="OptimizedCineon";break;case uu:t="ACESFilmic";break;case du:t="AgX";break;case hu:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Xp(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(li).join(`
`)}function qp(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(li).join(`
`)}function Yp(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Zp(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){let a=i.getActiveAttrib(e,r),c=a.name,l=1;a.type===i.FLOAT_MAT2&&(l=2),a.type===i.FLOAT_MAT3&&(l=3),a.type===i.FLOAT_MAT4&&(l=4),t[c]={type:a.type,location:i.getAttribLocation(e,c),locationSize:l}}return t}function li(i){return i!==""}function hl(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function dl(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var $p=/^[ \t]*#include +<([\w\d./]+)>/gm;function ia(i){return i.replace($p,Kp)}var Jp=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Kp(i,e){let t=Ie[e];if(t===void 0){let n=Jp.get(e);if(n!==void 0)t=Ie[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return ia(t)}var jp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function fl(i){return i.replace(jp,Qp)}function Qp(i,e,t,n){let r="";for(let a=parseInt(e);a<parseInt(t);a++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function pl(i){let e="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function em(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Rl?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Ta?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===nn&&(e="SHADOWMAP_TYPE_VSM"),e}function tm(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case di:case fi:e="ENVMAP_TYPE_CUBE";break;case Yr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function nm(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case fi:e="ENVMAP_MODE_REFRACTION";break}return e}function im(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case wa:e="ENVMAP_BLENDING_MULTIPLY";break;case su:e="ENVMAP_BLENDING_MIX";break;case au:e="ENVMAP_BLENDING_ADD";break}return e}function rm(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function sm(i,e,t,n){let r=i.getContext(),a=t.defines,c=t.vertexShader,l=t.fragmentShader,h=em(t),d=tm(t),s=nm(t),o=im(t),u=rm(t),f=t.isWebGL2?"":Xp(t),g=qp(t),_=Yp(a),p=r.createProgram(),m,y,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(li).join(`
`),m.length>0&&(m+=`
`),y=[f,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(li).join(`
`),y.length>0&&(y+=`
`)):(m=[pl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+s:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(li).join(`
`),y=[f,pl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.envMap?"#define "+s:"",t.envMap?"#define "+o:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==xn?"#define TONE_MAPPING":"",t.toneMapping!==xn?Ie.tonemapping_pars_fragment:"",t.toneMapping!==xn?Wp("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ie.colorspace_pars_fragment,Gp("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(li).join(`
`)),c=ia(c),c=hl(c,t),c=dl(c,t),l=ia(l),l=hl(l,t),l=dl(l,t),c=fl(c),l=fl(l),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,y=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Do?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Do?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+y);let w=v+m+c,C=v+y+l,T=cl(r,r.VERTEX_SHADER,w),A=cl(r,r.FRAGMENT_SHADER,C);r.attachShader(p,T),r.attachShader(p,A),t.index0AttributeName!==void 0?r.bindAttribLocation(p,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(p,0,"position"),r.linkProgram(p);function D(q){if(i.debug.checkShaderErrors){let ee=r.getProgramInfoLog(p).trim(),L=r.getShaderInfoLog(T).trim(),B=r.getShaderInfoLog(A).trim(),V=!0,X=!0;if(r.getProgramParameter(p,r.LINK_STATUS)===!1)if(V=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,p,T,A);else{let W=ul(r,T,"vertex"),G=ul(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(p,r.VALIDATE_STATUS)+`

Program Info Log: `+ee+`
`+W+`
`+G)}else ee!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ee):(L===""||B==="")&&(X=!1);X&&(q.diagnostics={runnable:V,programLog:ee,vertexShader:{log:L,prefix:m},fragmentShader:{log:B,prefix:y}})}r.deleteShader(T),r.deleteShader(A),S=new hi(r,p),E=Zp(r,p)}let S;this.getUniforms=function(){return S===void 0&&D(this),S};let E;this.getAttributes=function(){return E===void 0&&D(this),E};let k=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return k===!1&&(k=r.getProgramParameter(p,zp)),k},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(p),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=kp++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=T,this.fragmentShader=A,this}var am=0,ra=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),a=this._getShaderStage(n),c=this._getShaderCacheForMaterial(e);return c.has(r)===!1&&(c.add(r),r.usedTimes++),c.has(a)===!1&&(c.add(a),a.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new sa(e),t.set(e,n)),n}},sa=class{constructor(e){this.id=am++,this.code=e,this.usedTimes=0}};function om(i,e,t,n,r,a,c){let l=new Lr,h=new ra,d=[],s=r.isWebGL2,o=r.logarithmicDepthBuffer,u=r.vertexTextures,f=r.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return S===0?"uv":`uv${S}`}function p(S,E,k,q,ee){let L=q.fog,B=ee.geometry,V=S.isMeshStandardMaterial?q.environment:null,X=(S.isMeshStandardMaterial?t:e).get(S.envMap||V),W=X&&X.mapping===Yr?X.image.height:null,G=g[S.type];S.precision!==null&&(f=r.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));let J=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,Q=J!==void 0?J.length:0,le=0;B.morphAttributes.position!==void 0&&(le=1),B.morphAttributes.normal!==void 0&&(le=2),B.morphAttributes.color!==void 0&&(le=3);let H,Y,ae,me;if(G){let xt=Zt[G];H=xt.vertexShader,Y=xt.fragmentShader}else H=S.vertexShader,Y=S.fragmentShader,h.update(S),ae=h.getVertexShaderID(S),me=h.getFragmentShaderID(S);let pe=i.getRenderTarget(),Re=ee.isInstancedMesh===!0,Le=ee.isBatchedMesh===!0,Me=!!S.map,ke=!!S.matcap,U=!!X,vt=!!S.aoMap,_e=!!S.lightMap,Ae=!!S.bumpMap,he=!!S.normalMap,Je=!!S.displacementMap,De=!!S.emissiveMap,b=!!S.metalnessMap,x=!!S.roughnessMap,F=S.anisotropy>0,K=S.clearcoat>0,$=S.iridescence>0,j=S.sheen>0,de=S.transmission>0,se=F&&!!S.anisotropyMap,ce=K&&!!S.clearcoatMap,ye=K&&!!S.clearcoatNormalMap,Ue=K&&!!S.clearcoatRoughnessMap,Z=$&&!!S.iridescenceMap,Ge=$&&!!S.iridescenceThicknessMap,ze=j&&!!S.sheenColorMap,Ee=j&&!!S.sheenRoughnessMap,ge=!!S.specularMap,ue=!!S.specularColorMap,Pe=!!S.specularIntensityMap,Ve=de&&!!S.transmissionMap,je=de&&!!S.thicknessMap,Fe=!!S.gradientMap,te=!!S.alphaMap,R=S.alphaTest>0,ie=!!S.alphaHash,re=!!S.extensions,Se=!!B.attributes.uv1,ve=!!B.attributes.uv2,Xe=!!B.attributes.uv3,qe=xn;return S.toneMapped&&(pe===null||pe.isXRRenderTarget===!0)&&(qe=i.toneMapping),{isWebGL2:s,shaderID:G,shaderType:S.type,shaderName:S.name,vertexShader:H,fragmentShader:Y,defines:S.defines,customVertexShaderID:ae,customFragmentShaderID:me,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:Le,instancing:Re,instancingColor:Re&&ee.instanceColor!==null,supportsVertexTextures:u,outputColorSpace:pe===null?i.outputColorSpace:pe.isXRRenderTarget===!0?pe.texture.colorSpace:an,map:Me,matcap:ke,envMap:U,envMapMode:U&&X.mapping,envMapCubeUVHeight:W,aoMap:vt,lightMap:_e,bumpMap:Ae,normalMap:he,displacementMap:u&&Je,emissiveMap:De,normalMapObjectSpace:he&&S.normalMapType===Eu,normalMapTangentSpace:he&&S.normalMapType===Ca,metalnessMap:b,roughnessMap:x,anisotropy:F,anisotropyMap:se,clearcoat:K,clearcoatMap:ce,clearcoatNormalMap:ye,clearcoatRoughnessMap:Ue,iridescence:$,iridescenceMap:Z,iridescenceThicknessMap:Ge,sheen:j,sheenColorMap:ze,sheenRoughnessMap:Ee,specularMap:ge,specularColorMap:ue,specularIntensityMap:Pe,transmission:de,transmissionMap:Ve,thicknessMap:je,gradientMap:Fe,opaque:S.transparent===!1&&S.blending===ci,alphaMap:te,alphaTest:R,alphaHash:ie,combine:S.combine,mapUv:Me&&_(S.map.channel),aoMapUv:vt&&_(S.aoMap.channel),lightMapUv:_e&&_(S.lightMap.channel),bumpMapUv:Ae&&_(S.bumpMap.channel),normalMapUv:he&&_(S.normalMap.channel),displacementMapUv:Je&&_(S.displacementMap.channel),emissiveMapUv:De&&_(S.emissiveMap.channel),metalnessMapUv:b&&_(S.metalnessMap.channel),roughnessMapUv:x&&_(S.roughnessMap.channel),anisotropyMapUv:se&&_(S.anisotropyMap.channel),clearcoatMapUv:ce&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:ye&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ue&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Z&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:Ge&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:ze&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&_(S.sheenRoughnessMap.channel),specularMapUv:ge&&_(S.specularMap.channel),specularColorMapUv:ue&&_(S.specularColorMap.channel),specularIntensityMapUv:Pe&&_(S.specularIntensityMap.channel),transmissionMapUv:Ve&&_(S.transmissionMap.channel),thicknessMapUv:je&&_(S.thicknessMap.channel),alphaMapUv:te&&_(S.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(he||F),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,vertexUv1s:Se,vertexUv2s:ve,vertexUv3s:Xe,pointsUvs:ee.isPoints===!0&&!!B.attributes.uv&&(Me||te),fog:!!L,useFog:S.fog===!0,fogExp2:L&&L.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:o,skinning:ee.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:Q,morphTextureStride:le,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&k.length>0,shadowMapType:i.shadowMap.type,toneMapping:qe,useLegacyLights:i._useLegacyLights,decodeVideoTexture:Me&&S.map.isVideoTexture===!0&&We.getTransfer(S.map.colorSpace)===Ze,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Vt,flipSided:S.side===wt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionDerivatives:re&&S.extensions.derivatives===!0,extensionFragDepth:re&&S.extensions.fragDepth===!0,extensionDrawBuffers:re&&S.extensions.drawBuffers===!0,extensionShaderTextureLOD:re&&S.extensions.shaderTextureLOD===!0,extensionClipCullDistance:re&&S.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:s||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:s||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:s||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()}}function m(S){let E=[];if(S.shaderID?E.push(S.shaderID):(E.push(S.customVertexShaderID),E.push(S.customFragmentShaderID)),S.defines!==void 0)for(let k in S.defines)E.push(k),E.push(S.defines[k]);return S.isRawShaderMaterial===!1&&(y(E,S),v(E,S),E.push(i.outputColorSpace)),E.push(S.customProgramCacheKey),E.join()}function y(S,E){S.push(E.precision),S.push(E.outputColorSpace),S.push(E.envMapMode),S.push(E.envMapCubeUVHeight),S.push(E.mapUv),S.push(E.alphaMapUv),S.push(E.lightMapUv),S.push(E.aoMapUv),S.push(E.bumpMapUv),S.push(E.normalMapUv),S.push(E.displacementMapUv),S.push(E.emissiveMapUv),S.push(E.metalnessMapUv),S.push(E.roughnessMapUv),S.push(E.anisotropyMapUv),S.push(E.clearcoatMapUv),S.push(E.clearcoatNormalMapUv),S.push(E.clearcoatRoughnessMapUv),S.push(E.iridescenceMapUv),S.push(E.iridescenceThicknessMapUv),S.push(E.sheenColorMapUv),S.push(E.sheenRoughnessMapUv),S.push(E.specularMapUv),S.push(E.specularColorMapUv),S.push(E.specularIntensityMapUv),S.push(E.transmissionMapUv),S.push(E.thicknessMapUv),S.push(E.combine),S.push(E.fogExp2),S.push(E.sizeAttenuation),S.push(E.morphTargetsCount),S.push(E.morphAttributeCount),S.push(E.numDirLights),S.push(E.numPointLights),S.push(E.numSpotLights),S.push(E.numSpotLightMaps),S.push(E.numHemiLights),S.push(E.numRectAreaLights),S.push(E.numDirLightShadows),S.push(E.numPointLightShadows),S.push(E.numSpotLightShadows),S.push(E.numSpotLightShadowsWithMaps),S.push(E.numLightProbes),S.push(E.shadowMapType),S.push(E.toneMapping),S.push(E.numClippingPlanes),S.push(E.numClipIntersection),S.push(E.depthPacking)}function v(S,E){l.disableAll(),E.isWebGL2&&l.enable(0),E.supportsVertexTextures&&l.enable(1),E.instancing&&l.enable(2),E.instancingColor&&l.enable(3),E.matcap&&l.enable(4),E.envMap&&l.enable(5),E.normalMapObjectSpace&&l.enable(6),E.normalMapTangentSpace&&l.enable(7),E.clearcoat&&l.enable(8),E.iridescence&&l.enable(9),E.alphaTest&&l.enable(10),E.vertexColors&&l.enable(11),E.vertexAlphas&&l.enable(12),E.vertexUv1s&&l.enable(13),E.vertexUv2s&&l.enable(14),E.vertexUv3s&&l.enable(15),E.vertexTangents&&l.enable(16),E.anisotropy&&l.enable(17),E.alphaHash&&l.enable(18),E.batching&&l.enable(19),S.push(l.mask),l.disableAll(),E.fog&&l.enable(0),E.useFog&&l.enable(1),E.flatShading&&l.enable(2),E.logarithmicDepthBuffer&&l.enable(3),E.skinning&&l.enable(4),E.morphTargets&&l.enable(5),E.morphNormals&&l.enable(6),E.morphColors&&l.enable(7),E.premultipliedAlpha&&l.enable(8),E.shadowMapEnabled&&l.enable(9),E.useLegacyLights&&l.enable(10),E.doubleSided&&l.enable(11),E.flipSided&&l.enable(12),E.useDepthPacking&&l.enable(13),E.dithering&&l.enable(14),E.transmission&&l.enable(15),E.sheen&&l.enable(16),E.opaque&&l.enable(17),E.pointsUvs&&l.enable(18),E.decodeVideoTexture&&l.enable(19),S.push(l.mask)}function w(S){let E=g[S.type],k;if(E){let q=Zt[E];k=$u.clone(q.uniforms)}else k=S.uniforms;return k}function C(S,E){let k;for(let q=0,ee=d.length;q<ee;q++){let L=d[q];if(L.cacheKey===E){k=L,++k.usedTimes;break}}return k===void 0&&(k=new sm(i,E,S,a),d.push(k)),k}function T(S){if(--S.usedTimes===0){let E=d.indexOf(S);d[E]=d[d.length-1],d.pop(),S.destroy()}}function A(S){h.remove(S)}function D(){h.dispose()}return{getParameters:p,getProgramCacheKey:m,getUniforms:w,acquireProgram:C,releaseProgram:T,releaseShaderCache:A,programs:d,dispose:D}}function lm(){let i=new WeakMap;function e(a){let c=i.get(a);return c===void 0&&(c={},i.set(a,c)),c}function t(a){i.delete(a)}function n(a,c,l){i.get(a)[c]=l}function r(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:r}}function cm(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function ml(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function gl(){let i=[],e=0,t=[],n=[],r=[];function a(){e=0,t.length=0,n.length=0,r.length=0}function c(o,u,f,g,_,p){let m=i[e];return m===void 0?(m={id:o.id,object:o,geometry:u,material:f,groupOrder:g,renderOrder:o.renderOrder,z:_,group:p},i[e]=m):(m.id=o.id,m.object=o,m.geometry=u,m.material=f,m.groupOrder=g,m.renderOrder=o.renderOrder,m.z=_,m.group=p),e++,m}function l(o,u,f,g,_,p){let m=c(o,u,f,g,_,p);f.transmission>0?n.push(m):f.transparent===!0?r.push(m):t.push(m)}function h(o,u,f,g,_,p){let m=c(o,u,f,g,_,p);f.transmission>0?n.unshift(m):f.transparent===!0?r.unshift(m):t.unshift(m)}function d(o,u){t.length>1&&t.sort(o||cm),n.length>1&&n.sort(u||ml),r.length>1&&r.sort(u||ml)}function s(){for(let o=e,u=i.length;o<u;o++){let f=i[o];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:r,init:a,push:l,unshift:h,finish:s,sort:d}}function um(){let i=new WeakMap;function e(n,r){let a=i.get(n),c;return a===void 0?(c=new gl,i.set(n,[c])):r>=a.length?(c=new gl,a.push(c)):c=a[r],c}function t(){i=new WeakMap}return{get:e,dispose:t}}function hm(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new I,color:new we};break;case"SpotLight":t={position:new I,direction:new I,color:new we,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new we,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new we,groundColor:new we};break;case"RectAreaLight":t={color:new we,position:new I,halfWidth:new I,halfHeight:new I};break}return i[e.id]=t,t}}}function dm(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var fm=0;function pm(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function mm(i,e){let t=new hm,n=dm(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let s=0;s<9;s++)r.probe.push(new I);let a=new I,c=new nt,l=new nt;function h(s,o){let u=0,f=0,g=0;for(let q=0;q<9;q++)r.probe[q].set(0,0,0);let _=0,p=0,m=0,y=0,v=0,w=0,C=0,T=0,A=0,D=0,S=0;s.sort(pm);let E=o===!0?Math.PI:1;for(let q=0,ee=s.length;q<ee;q++){let L=s[q],B=L.color,V=L.intensity,X=L.distance,W=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)u+=B.r*V*E,f+=B.g*V*E,g+=B.b*V*E;else if(L.isLightProbe){for(let G=0;G<9;G++)r.probe[G].addScaledVector(L.sh.coefficients[G],V);S++}else if(L.isDirectionalLight){let G=t.get(L);if(G.color.copy(L.color).multiplyScalar(L.intensity*E),L.castShadow){let J=L.shadow,Q=n.get(L);Q.shadowBias=J.bias,Q.shadowNormalBias=J.normalBias,Q.shadowRadius=J.radius,Q.shadowMapSize=J.mapSize,r.directionalShadow[_]=Q,r.directionalShadowMap[_]=W,r.directionalShadowMatrix[_]=L.shadow.matrix,w++}r.directional[_]=G,_++}else if(L.isSpotLight){let G=t.get(L);G.position.setFromMatrixPosition(L.matrixWorld),G.color.copy(B).multiplyScalar(V*E),G.distance=X,G.coneCos=Math.cos(L.angle),G.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),G.decay=L.decay,r.spot[m]=G;let J=L.shadow;if(L.map&&(r.spotLightMap[A]=L.map,A++,J.updateMatrices(L),L.castShadow&&D++),r.spotLightMatrix[m]=J.matrix,L.castShadow){let Q=n.get(L);Q.shadowBias=J.bias,Q.shadowNormalBias=J.normalBias,Q.shadowRadius=J.radius,Q.shadowMapSize=J.mapSize,r.spotShadow[m]=Q,r.spotShadowMap[m]=W,T++}m++}else if(L.isRectAreaLight){let G=t.get(L);G.color.copy(B).multiplyScalar(V),G.halfWidth.set(L.width*.5,0,0),G.halfHeight.set(0,L.height*.5,0),r.rectArea[y]=G,y++}else if(L.isPointLight){let G=t.get(L);if(G.color.copy(L.color).multiplyScalar(L.intensity*E),G.distance=L.distance,G.decay=L.decay,L.castShadow){let J=L.shadow,Q=n.get(L);Q.shadowBias=J.bias,Q.shadowNormalBias=J.normalBias,Q.shadowRadius=J.radius,Q.shadowMapSize=J.mapSize,Q.shadowCameraNear=J.camera.near,Q.shadowCameraFar=J.camera.far,r.pointShadow[p]=Q,r.pointShadowMap[p]=W,r.pointShadowMatrix[p]=L.shadow.matrix,C++}r.point[p]=G,p++}else if(L.isHemisphereLight){let G=t.get(L);G.skyColor.copy(L.color).multiplyScalar(V*E),G.groundColor.copy(L.groundColor).multiplyScalar(V*E),r.hemi[v]=G,v++}}y>0&&(e.isWebGL2?i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=ne.LTC_FLOAT_1,r.rectAreaLTC2=ne.LTC_FLOAT_2):(r.rectAreaLTC1=ne.LTC_HALF_1,r.rectAreaLTC2=ne.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=ne.LTC_FLOAT_1,r.rectAreaLTC2=ne.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=ne.LTC_HALF_1,r.rectAreaLTC2=ne.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=u,r.ambient[1]=f,r.ambient[2]=g;let k=r.hash;(k.directionalLength!==_||k.pointLength!==p||k.spotLength!==m||k.rectAreaLength!==y||k.hemiLength!==v||k.numDirectionalShadows!==w||k.numPointShadows!==C||k.numSpotShadows!==T||k.numSpotMaps!==A||k.numLightProbes!==S)&&(r.directional.length=_,r.spot.length=m,r.rectArea.length=y,r.point.length=p,r.hemi.length=v,r.directionalShadow.length=w,r.directionalShadowMap.length=w,r.pointShadow.length=C,r.pointShadowMap.length=C,r.spotShadow.length=T,r.spotShadowMap.length=T,r.directionalShadowMatrix.length=w,r.pointShadowMatrix.length=C,r.spotLightMatrix.length=T+A-D,r.spotLightMap.length=A,r.numSpotLightShadowsWithMaps=D,r.numLightProbes=S,k.directionalLength=_,k.pointLength=p,k.spotLength=m,k.rectAreaLength=y,k.hemiLength=v,k.numDirectionalShadows=w,k.numPointShadows=C,k.numSpotShadows=T,k.numSpotMaps=A,k.numLightProbes=S,r.version=fm++)}function d(s,o){let u=0,f=0,g=0,_=0,p=0,m=o.matrixWorldInverse;for(let y=0,v=s.length;y<v;y++){let w=s[y];if(w.isDirectionalLight){let C=r.directional[u];C.direction.setFromMatrixPosition(w.matrixWorld),a.setFromMatrixPosition(w.target.matrixWorld),C.direction.sub(a),C.direction.transformDirection(m),u++}else if(w.isSpotLight){let C=r.spot[g];C.position.setFromMatrixPosition(w.matrixWorld),C.position.applyMatrix4(m),C.direction.setFromMatrixPosition(w.matrixWorld),a.setFromMatrixPosition(w.target.matrixWorld),C.direction.sub(a),C.direction.transformDirection(m),g++}else if(w.isRectAreaLight){let C=r.rectArea[_];C.position.setFromMatrixPosition(w.matrixWorld),C.position.applyMatrix4(m),l.identity(),c.copy(w.matrixWorld),c.premultiply(m),l.extractRotation(c),C.halfWidth.set(w.width*.5,0,0),C.halfHeight.set(0,w.height*.5,0),C.halfWidth.applyMatrix4(l),C.halfHeight.applyMatrix4(l),_++}else if(w.isPointLight){let C=r.point[f];C.position.setFromMatrixPosition(w.matrixWorld),C.position.applyMatrix4(m),f++}else if(w.isHemisphereLight){let C=r.hemi[p];C.direction.setFromMatrixPosition(w.matrixWorld),C.direction.transformDirection(m),p++}}}return{setup:h,setupView:d,state:r}}function _l(i,e){let t=new mm(i,e),n=[],r=[];function a(){n.length=0,r.length=0}function c(o){n.push(o)}function l(o){r.push(o)}function h(o){t.setup(n,o)}function d(o){t.setupView(n,o)}return{init:a,state:{lightsArray:n,shadowsArray:r,lights:t},setupLights:h,setupLightsView:d,pushLight:c,pushShadow:l}}function gm(i,e){let t=new WeakMap;function n(a,c=0){let l=t.get(a),h;return l===void 0?(h=new _l(i,e),t.set(a,[h])):c>=l.length?(h=new _l(i,e),l.push(h)):h=l[c],h}function r(){t=new WeakMap}return{get:n,dispose:r}}var aa=class extends Rt{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Su,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},oa=class extends Rt{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},_m=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,vm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function xm(i,e,t){let n=new Ui,r=new He,a=new He,c=new ct,l=new aa({depthPacking:bu}),h=new oa,d={},s=t.maxTextureSize,o={[Mn]:wt,[wt]:Mn,[Vt]:Vt},u=new ln({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new He},radius:{value:4}},vertexShader:_m,fragmentShader:vm}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let g=new It;g.setAttribute("position",new ht(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new _t(g,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Rl;let m=this.type;this.render=function(T,A,D){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;let S=i.getRenderTarget(),E=i.getActiveCubeFace(),k=i.getActiveMipmapLevel(),q=i.state;q.setBlending(vn),q.buffers.color.setClear(1,1,1,1),q.buffers.depth.setTest(!0),q.setScissorTest(!1);let ee=m!==nn&&this.type===nn,L=m===nn&&this.type!==nn;for(let B=0,V=T.length;B<V;B++){let X=T[B],W=X.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;r.copy(W.mapSize);let G=W.getFrameExtents();if(r.multiply(G),a.copy(W.mapSize),(r.x>s||r.y>s)&&(r.x>s&&(a.x=Math.floor(s/G.x),r.x=a.x*G.x,W.mapSize.x=a.x),r.y>s&&(a.y=Math.floor(s/G.y),r.y=a.y*G.y,W.mapSize.y=a.y)),W.map===null||ee===!0||L===!0){let Q=this.type!==nn?{minFilter:St,magFilter:St}:{};W.map!==null&&W.map.dispose(),W.map=new on(r.x,r.y,Q),W.map.texture.name=X.name+".shadowMap",W.camera.updateProjectionMatrix()}i.setRenderTarget(W.map),i.clear();let J=W.getViewportCount();for(let Q=0;Q<J;Q++){let le=W.getViewport(Q);c.set(a.x*le.x,a.y*le.y,a.x*le.z,a.y*le.w),q.viewport(c),W.updateMatrices(X,Q),n=W.getFrustum(),w(A,D,W.camera,X,this.type)}W.isPointLightShadow!==!0&&this.type===nn&&y(W,D),W.needsUpdate=!1}m=this.type,p.needsUpdate=!1,i.setRenderTarget(S,E,k)};function y(T,A){let D=e.update(_);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new on(r.x,r.y)),u.uniforms.shadow_pass.value=T.map.texture,u.uniforms.resolution.value=T.mapSize,u.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(A,null,D,u,_,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(A,null,D,f,_,null)}function v(T,A,D,S){let E=null,k=D.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(k!==void 0)E=k;else if(E=D.isPointLight===!0?h:l,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){let q=E.uuid,ee=A.uuid,L=d[q];L===void 0&&(L={},d[q]=L);let B=L[ee];B===void 0&&(B=E.clone(),L[ee]=B,A.addEventListener("dispose",C)),E=B}if(E.visible=A.visible,E.wireframe=A.wireframe,S===nn?E.side=A.shadowSide!==null?A.shadowSide:A.side:E.side=A.shadowSide!==null?A.shadowSide:o[A.side],E.alphaMap=A.alphaMap,E.alphaTest=A.alphaTest,E.map=A.map,E.clipShadows=A.clipShadows,E.clippingPlanes=A.clippingPlanes,E.clipIntersection=A.clipIntersection,E.displacementMap=A.displacementMap,E.displacementScale=A.displacementScale,E.displacementBias=A.displacementBias,E.wireframeLinewidth=A.wireframeLinewidth,E.linewidth=A.linewidth,D.isPointLight===!0&&E.isMeshDistanceMaterial===!0){let q=i.properties.get(E);q.light=D}return E}function w(T,A,D,S,E){if(T.visible===!1)return;if(T.layers.test(A.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&E===nn)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,T.matrixWorld);let ee=e.update(T),L=T.material;if(Array.isArray(L)){let B=ee.groups;for(let V=0,X=B.length;V<X;V++){let W=B[V],G=L[W.materialIndex];if(G&&G.visible){let J=v(T,G,S,E);T.onBeforeShadow(i,T,A,D,ee,J,W),i.renderBufferDirect(D,null,ee,J,T,W),T.onAfterShadow(i,T,A,D,ee,J,W)}}}else if(L.visible){let B=v(T,L,S,E);T.onBeforeShadow(i,T,A,D,ee,B,null),i.renderBufferDirect(D,null,ee,B,T,null),T.onAfterShadow(i,T,A,D,ee,B,null)}}let q=T.children;for(let ee=0,L=q.length;ee<L;ee++)w(q[ee],A,D,S,E)}function C(T){T.target.removeEventListener("dispose",C);for(let D in d){let S=d[D],E=T.target.uuid;E in S&&(S[E].dispose(),delete S[E])}}}function ym(i,e,t){let n=t.isWebGL2;function r(){let R=!1,ie=new ct,re=null,Se=new ct(0,0,0,0);return{setMask:function(ve){re!==ve&&!R&&(i.colorMask(ve,ve,ve,ve),re=ve)},setLocked:function(ve){R=ve},setClear:function(ve,Xe,qe,at,xt){xt===!0&&(ve*=at,Xe*=at,qe*=at),ie.set(ve,Xe,qe,at),Se.equals(ie)===!1&&(i.clearColor(ve,Xe,qe,at),Se.copy(ie))},reset:function(){R=!1,re=null,Se.set(-1,0,0,0)}}}function a(){let R=!1,ie=null,re=null,Se=null;return{setTest:function(ve){ve?Le(i.DEPTH_TEST):Me(i.DEPTH_TEST)},setMask:function(ve){ie!==ve&&!R&&(i.depthMask(ve),ie=ve)},setFunc:function(ve){if(re!==ve){switch(ve){case jc:i.depthFunc(i.NEVER);break;case Qc:i.depthFunc(i.ALWAYS);break;case eu:i.depthFunc(i.LESS);break;case vr:i.depthFunc(i.LEQUAL);break;case tu:i.depthFunc(i.EQUAL);break;case nu:i.depthFunc(i.GEQUAL);break;case iu:i.depthFunc(i.GREATER);break;case ru:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}re=ve}},setLocked:function(ve){R=ve},setClear:function(ve){Se!==ve&&(i.clearDepth(ve),Se=ve)},reset:function(){R=!1,ie=null,re=null,Se=null}}}function c(){let R=!1,ie=null,re=null,Se=null,ve=null,Xe=null,qe=null,at=null,xt=null;return{setTest:function(Ye){R||(Ye?Le(i.STENCIL_TEST):Me(i.STENCIL_TEST))},setMask:function(Ye){ie!==Ye&&!R&&(i.stencilMask(Ye),ie=Ye)},setFunc:function(Ye,yt,Yt){(re!==Ye||Se!==yt||ve!==Yt)&&(i.stencilFunc(Ye,yt,Yt),re=Ye,Se=yt,ve=Yt)},setOp:function(Ye,yt,Yt){(Xe!==Ye||qe!==yt||at!==Yt)&&(i.stencilOp(Ye,yt,Yt),Xe=Ye,qe=yt,at=Yt)},setLocked:function(Ye){R=Ye},setClear:function(Ye){xt!==Ye&&(i.clearStencil(Ye),xt=Ye)},reset:function(){R=!1,ie=null,re=null,Se=null,ve=null,Xe=null,qe=null,at=null,xt=null}}}let l=new r,h=new a,d=new c,s=new WeakMap,o=new WeakMap,u={},f={},g=new WeakMap,_=[],p=null,m=!1,y=null,v=null,w=null,C=null,T=null,A=null,D=null,S=new we(0,0,0),E=0,k=!1,q=null,ee=null,L=null,B=null,V=null,X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),W=!1,G=0,J=i.getParameter(i.VERSION);J.indexOf("WebGL")!==-1?(G=parseFloat(/^WebGL (\d)/.exec(J)[1]),W=G>=1):J.indexOf("OpenGL ES")!==-1&&(G=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),W=G>=2);let Q=null,le={},H=i.getParameter(i.SCISSOR_BOX),Y=i.getParameter(i.VIEWPORT),ae=new ct().fromArray(H),me=new ct().fromArray(Y);function pe(R,ie,re,Se){let ve=new Uint8Array(4),Xe=i.createTexture();i.bindTexture(R,Xe),i.texParameteri(R,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(R,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let qe=0;qe<re;qe++)n&&(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)?i.texImage3D(ie,0,i.RGBA,1,1,Se,0,i.RGBA,i.UNSIGNED_BYTE,ve):i.texImage2D(ie+qe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ve);return Xe}let Re={};Re[i.TEXTURE_2D]=pe(i.TEXTURE_2D,i.TEXTURE_2D,1),Re[i.TEXTURE_CUBE_MAP]=pe(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Re[i.TEXTURE_2D_ARRAY]=pe(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Re[i.TEXTURE_3D]=pe(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),l.setClear(0,0,0,1),h.setClear(1),d.setClear(0),Le(i.DEPTH_TEST),h.setFunc(vr),De(!1),b($a),Le(i.CULL_FACE),he(vn);function Le(R){u[R]!==!0&&(i.enable(R),u[R]=!0)}function Me(R){u[R]!==!1&&(i.disable(R),u[R]=!1)}function ke(R,ie){return f[R]!==ie?(i.bindFramebuffer(R,ie),f[R]=ie,n&&(R===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=ie),R===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=ie)),!0):!1}function U(R,ie){let re=_,Se=!1;if(R)if(re=g.get(ie),re===void 0&&(re=[],g.set(ie,re)),R.isWebGLMultipleRenderTargets){let ve=R.texture;if(re.length!==ve.length||re[0]!==i.COLOR_ATTACHMENT0){for(let Xe=0,qe=ve.length;Xe<qe;Xe++)re[Xe]=i.COLOR_ATTACHMENT0+Xe;re.length=ve.length,Se=!0}}else re[0]!==i.COLOR_ATTACHMENT0&&(re[0]=i.COLOR_ATTACHMENT0,Se=!0);else re[0]!==i.BACK&&(re[0]=i.BACK,Se=!0);Se&&(t.isWebGL2?i.drawBuffers(re):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(re))}function vt(R){return p!==R?(i.useProgram(R),p=R,!0):!1}let _e={[In]:i.FUNC_ADD,[Oc]:i.FUNC_SUBTRACT,[Bc]:i.FUNC_REVERSE_SUBTRACT};if(n)_e[Qa]=i.MIN,_e[eo]=i.MAX;else{let R=e.get("EXT_blend_minmax");R!==null&&(_e[Qa]=R.MIN_EXT,_e[eo]=R.MAX_EXT)}let Ae={[zc]:i.ZERO,[kc]:i.ONE,[Hc]:i.SRC_COLOR,[Hs]:i.SRC_ALPHA,[Yc]:i.SRC_ALPHA_SATURATE,[Xc]:i.DST_COLOR,[Gc]:i.DST_ALPHA,[Vc]:i.ONE_MINUS_SRC_COLOR,[Vs]:i.ONE_MINUS_SRC_ALPHA,[qc]:i.ONE_MINUS_DST_COLOR,[Wc]:i.ONE_MINUS_DST_ALPHA,[Zc]:i.CONSTANT_COLOR,[$c]:i.ONE_MINUS_CONSTANT_COLOR,[Jc]:i.CONSTANT_ALPHA,[Kc]:i.ONE_MINUS_CONSTANT_ALPHA};function he(R,ie,re,Se,ve,Xe,qe,at,xt,Ye){if(R===vn){m===!0&&(Me(i.BLEND),m=!1);return}if(m===!1&&(Le(i.BLEND),m=!0),R!==Fc){if(R!==y||Ye!==k){if((v!==In||T!==In)&&(i.blendEquation(i.FUNC_ADD),v=In,T=In),Ye)switch(R){case ci:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ja:i.blendFunc(i.ONE,i.ONE);break;case Ka:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ja:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}else switch(R){case ci:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ja:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Ka:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ja:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}w=null,C=null,A=null,D=null,S.set(0,0,0),E=0,y=R,k=Ye}return}ve=ve||ie,Xe=Xe||re,qe=qe||Se,(ie!==v||ve!==T)&&(i.blendEquationSeparate(_e[ie],_e[ve]),v=ie,T=ve),(re!==w||Se!==C||Xe!==A||qe!==D)&&(i.blendFuncSeparate(Ae[re],Ae[Se],Ae[Xe],Ae[qe]),w=re,C=Se,A=Xe,D=qe),(at.equals(S)===!1||xt!==E)&&(i.blendColor(at.r,at.g,at.b,xt),S.copy(at),E=xt),y=R,k=!1}function Je(R,ie){R.side===Vt?Me(i.CULL_FACE):Le(i.CULL_FACE);let re=R.side===wt;ie&&(re=!re),De(re),R.blending===ci&&R.transparent===!1?he(vn):he(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),h.setFunc(R.depthFunc),h.setTest(R.depthTest),h.setMask(R.depthWrite),l.setMask(R.colorWrite);let Se=R.stencilWrite;d.setTest(Se),Se&&(d.setMask(R.stencilWriteMask),d.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),d.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),F(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?Le(i.SAMPLE_ALPHA_TO_COVERAGE):Me(i.SAMPLE_ALPHA_TO_COVERAGE)}function De(R){q!==R&&(R?i.frontFace(i.CW):i.frontFace(i.CCW),q=R)}function b(R){R!==Uc?(Le(i.CULL_FACE),R!==ee&&(R===$a?i.cullFace(i.BACK):R===Nc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Me(i.CULL_FACE),ee=R}function x(R){R!==L&&(W&&i.lineWidth(R),L=R)}function F(R,ie,re){R?(Le(i.POLYGON_OFFSET_FILL),(B!==ie||V!==re)&&(i.polygonOffset(ie,re),B=ie,V=re)):Me(i.POLYGON_OFFSET_FILL)}function K(R){R?Le(i.SCISSOR_TEST):Me(i.SCISSOR_TEST)}function $(R){R===void 0&&(R=i.TEXTURE0+X-1),Q!==R&&(i.activeTexture(R),Q=R)}function j(R,ie,re){re===void 0&&(Q===null?re=i.TEXTURE0+X-1:re=Q);let Se=le[re];Se===void 0&&(Se={type:void 0,texture:void 0},le[re]=Se),(Se.type!==R||Se.texture!==ie)&&(Q!==re&&(i.activeTexture(re),Q=re),i.bindTexture(R,ie||Re[R]),Se.type=R,Se.texture=ie)}function de(){let R=le[Q];R!==void 0&&R.type!==void 0&&(i.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function se(){try{i.compressedTexImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ce(){try{i.compressedTexImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ye(){try{i.texSubImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Ue(){try{i.texSubImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Z(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Ge(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ze(){try{i.texStorage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Ee(){try{i.texStorage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ge(){try{i.texImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ue(){try{i.texImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Pe(R){ae.equals(R)===!1&&(i.scissor(R.x,R.y,R.z,R.w),ae.copy(R))}function Ve(R){me.equals(R)===!1&&(i.viewport(R.x,R.y,R.z,R.w),me.copy(R))}function je(R,ie){let re=o.get(ie);re===void 0&&(re=new WeakMap,o.set(ie,re));let Se=re.get(R);Se===void 0&&(Se=i.getUniformBlockIndex(ie,R.name),re.set(R,Se))}function Fe(R,ie){let Se=o.get(ie).get(R);s.get(ie)!==Se&&(i.uniformBlockBinding(ie,Se,R.__bindingPointIndex),s.set(ie,Se))}function te(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},Q=null,le={},f={},g=new WeakMap,_=[],p=null,m=!1,y=null,v=null,w=null,C=null,T=null,A=null,D=null,S=new we(0,0,0),E=0,k=!1,q=null,ee=null,L=null,B=null,V=null,ae.set(0,0,i.canvas.width,i.canvas.height),me.set(0,0,i.canvas.width,i.canvas.height),l.reset(),h.reset(),d.reset()}return{buffers:{color:l,depth:h,stencil:d},enable:Le,disable:Me,bindFramebuffer:ke,drawBuffers:U,useProgram:vt,setBlending:he,setMaterial:Je,setFlipSided:De,setCullFace:b,setLineWidth:x,setPolygonOffset:F,setScissorTest:K,activeTexture:$,bindTexture:j,unbindTexture:de,compressedTexImage2D:se,compressedTexImage3D:ce,texImage2D:ge,texImage3D:ue,updateUBOMapping:je,uniformBlockBinding:Fe,texStorage2D:ze,texStorage3D:Ee,texSubImage2D:ye,texSubImage3D:Ue,compressedTexSubImage2D:Z,compressedTexSubImage3D:Ge,scissor:Pe,viewport:Ve,reset:te}}function Mm(i,e,t,n,r,a,c){let l=r.isWebGL2,h=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,d=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),s=new WeakMap,o,u=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(b,x){return f?new OffscreenCanvas(b,x):Ar("canvas")}function _(b,x,F,K){let $=1;if((b.width>K||b.height>K)&&($=K/Math.max(b.width,b.height)),$<1||x===!0)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap){let j=x?$s:Math.floor,de=j($*b.width),se=j($*b.height);o===void 0&&(o=g(de,se));let ce=F?g(de,se):o;return ce.width=de,ce.height=se,ce.getContext("2d").drawImage(b,0,0,de,se),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+b.width+"x"+b.height+") to ("+de+"x"+se+")."),ce}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+b.width+"x"+b.height+")."),b;return b}function p(b){return Uo(b.width)&&Uo(b.height)}function m(b){return l?!1:b.wrapS!==Gt||b.wrapT!==Gt||b.minFilter!==St&&b.minFilter!==Ft}function y(b,x){return b.generateMipmaps&&x&&b.minFilter!==St&&b.minFilter!==Ft}function v(b){i.generateMipmap(b)}function w(b,x,F,K,$=!1){if(l===!1)return x;if(b!==null){if(i[b]!==void 0)return i[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let j=x;if(x===i.RED&&(F===i.FLOAT&&(j=i.R32F),F===i.HALF_FLOAT&&(j=i.R16F),F===i.UNSIGNED_BYTE&&(j=i.R8)),x===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&(j=i.R8UI),F===i.UNSIGNED_SHORT&&(j=i.R16UI),F===i.UNSIGNED_INT&&(j=i.R32UI),F===i.BYTE&&(j=i.R8I),F===i.SHORT&&(j=i.R16I),F===i.INT&&(j=i.R32I)),x===i.RG&&(F===i.FLOAT&&(j=i.RG32F),F===i.HALF_FLOAT&&(j=i.RG16F),F===i.UNSIGNED_BYTE&&(j=i.RG8)),x===i.RGBA){let de=$?Mr:We.getTransfer(K);F===i.FLOAT&&(j=i.RGBA32F),F===i.HALF_FLOAT&&(j=i.RGBA16F),F===i.UNSIGNED_BYTE&&(j=de===Ze?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT_4_4_4_4&&(j=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&(j=i.RGB5_A1)}return(j===i.R16F||j===i.R32F||j===i.RG16F||j===i.RG32F||j===i.RGBA16F||j===i.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function C(b,x,F){return y(b,F)===!0||b.isFramebufferTexture&&b.minFilter!==St&&b.minFilter!==Ft?Math.log2(Math.max(x.width,x.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?x.mipmaps.length:1}function T(b){return b===St||b===to||b===ls?i.NEAREST:i.LINEAR}function A(b){let x=b.target;x.removeEventListener("dispose",A),S(x),x.isVideoTexture&&s.delete(x)}function D(b){let x=b.target;x.removeEventListener("dispose",D),k(x)}function S(b){let x=n.get(b);if(x.__webglInit===void 0)return;let F=b.source,K=u.get(F);if(K){let $=K[x.__cacheKey];$.usedTimes--,$.usedTimes===0&&E(b),Object.keys(K).length===0&&u.delete(F)}n.remove(b)}function E(b){let x=n.get(b);i.deleteTexture(x.__webglTexture);let F=b.source,K=u.get(F);delete K[x.__cacheKey],c.memory.textures--}function k(b){let x=b.texture,F=n.get(b),K=n.get(x);if(K.__webglTexture!==void 0&&(i.deleteTexture(K.__webglTexture),c.memory.textures--),b.depthTexture&&b.depthTexture.dispose(),b.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(F.__webglFramebuffer[$]))for(let j=0;j<F.__webglFramebuffer[$].length;j++)i.deleteFramebuffer(F.__webglFramebuffer[$][j]);else i.deleteFramebuffer(F.__webglFramebuffer[$]);F.__webglDepthbuffer&&i.deleteRenderbuffer(F.__webglDepthbuffer[$])}else{if(Array.isArray(F.__webglFramebuffer))for(let $=0;$<F.__webglFramebuffer.length;$++)i.deleteFramebuffer(F.__webglFramebuffer[$]);else i.deleteFramebuffer(F.__webglFramebuffer);if(F.__webglDepthbuffer&&i.deleteRenderbuffer(F.__webglDepthbuffer),F.__webglMultisampledFramebuffer&&i.deleteFramebuffer(F.__webglMultisampledFramebuffer),F.__webglColorRenderbuffer)for(let $=0;$<F.__webglColorRenderbuffer.length;$++)F.__webglColorRenderbuffer[$]&&i.deleteRenderbuffer(F.__webglColorRenderbuffer[$]);F.__webglDepthRenderbuffer&&i.deleteRenderbuffer(F.__webglDepthRenderbuffer)}if(b.isWebGLMultipleRenderTargets)for(let $=0,j=x.length;$<j;$++){let de=n.get(x[$]);de.__webglTexture&&(i.deleteTexture(de.__webglTexture),c.memory.textures--),n.remove(x[$])}n.remove(x),n.remove(b)}let q=0;function ee(){q=0}function L(){let b=q;return b>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+r.maxTextures),q+=1,b}function B(b){let x=[];return x.push(b.wrapS),x.push(b.wrapT),x.push(b.wrapR||0),x.push(b.magFilter),x.push(b.minFilter),x.push(b.anisotropy),x.push(b.internalFormat),x.push(b.format),x.push(b.type),x.push(b.generateMipmaps),x.push(b.premultiplyAlpha),x.push(b.flipY),x.push(b.unpackAlignment),x.push(b.colorSpace),x.join()}function V(b,x){let F=n.get(b);if(b.isVideoTexture&&Je(b),b.isRenderTargetTexture===!1&&b.version>0&&F.__version!==b.version){let K=b.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ae(F,b,x);return}}t.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+x)}function X(b,x){let F=n.get(b);if(b.version>0&&F.__version!==b.version){ae(F,b,x);return}t.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+x)}function W(b,x){let F=n.get(b);if(b.version>0&&F.__version!==b.version){ae(F,b,x);return}t.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+x)}function G(b,x){let F=n.get(b);if(b.version>0&&F.__version!==b.version){me(F,b,x);return}t.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+x)}let J={[Xs]:i.REPEAT,[Gt]:i.CLAMP_TO_EDGE,[qs]:i.MIRRORED_REPEAT},Q={[St]:i.NEAREST,[to]:i.NEAREST_MIPMAP_NEAREST,[ls]:i.NEAREST_MIPMAP_LINEAR,[Ft]:i.LINEAR,[fu]:i.LINEAR_MIPMAP_NEAREST,[Li]:i.LINEAR_MIPMAP_LINEAR},le={[Au]:i.NEVER,[Pu]:i.ALWAYS,[Tu]:i.LESS,[Bl]:i.LEQUAL,[wu]:i.EQUAL,[Lu]:i.GEQUAL,[Ru]:i.GREATER,[Cu]:i.NOTEQUAL};function H(b,x,F){if(F?(i.texParameteri(b,i.TEXTURE_WRAP_S,J[x.wrapS]),i.texParameteri(b,i.TEXTURE_WRAP_T,J[x.wrapT]),(b===i.TEXTURE_3D||b===i.TEXTURE_2D_ARRAY)&&i.texParameteri(b,i.TEXTURE_WRAP_R,J[x.wrapR]),i.texParameteri(b,i.TEXTURE_MAG_FILTER,Q[x.magFilter]),i.texParameteri(b,i.TEXTURE_MIN_FILTER,Q[x.minFilter])):(i.texParameteri(b,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(b,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(b===i.TEXTURE_3D||b===i.TEXTURE_2D_ARRAY)&&i.texParameteri(b,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(x.wrapS!==Gt||x.wrapT!==Gt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(b,i.TEXTURE_MAG_FILTER,T(x.magFilter)),i.texParameteri(b,i.TEXTURE_MIN_FILTER,T(x.minFilter)),x.minFilter!==St&&x.minFilter!==Ft&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),x.compareFunction&&(i.texParameteri(b,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(b,i.TEXTURE_COMPARE_FUNC,le[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){let K=e.get("EXT_texture_filter_anisotropic");if(x.magFilter===St||x.minFilter!==ls&&x.minFilter!==Li||x.type===gn&&e.has("OES_texture_float_linear")===!1||l===!1&&x.type===Pi&&e.has("OES_texture_half_float_linear")===!1)return;(x.anisotropy>1||n.get(x).__currentAnisotropy)&&(i.texParameterf(b,K.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,r.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy)}}function Y(b,x){let F=!1;b.__webglInit===void 0&&(b.__webglInit=!0,x.addEventListener("dispose",A));let K=x.source,$=u.get(K);$===void 0&&($={},u.set(K,$));let j=B(x);if(j!==b.__cacheKey){$[j]===void 0&&($[j]={texture:i.createTexture(),usedTimes:0},c.memory.textures++,F=!0),$[j].usedTimes++;let de=$[b.__cacheKey];de!==void 0&&($[b.__cacheKey].usedTimes--,de.usedTimes===0&&E(x)),b.__cacheKey=j,b.__webglTexture=$[j].texture}return F}function ae(b,x,F){let K=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(K=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(K=i.TEXTURE_3D);let $=Y(b,x),j=x.source;t.bindTexture(K,b.__webglTexture,i.TEXTURE0+F);let de=n.get(j);if(j.version!==de.__version||$===!0){t.activeTexture(i.TEXTURE0+F);let se=We.getPrimaries(We.workingColorSpace),ce=x.colorSpace===Ot?null:We.getPrimaries(x.colorSpace),ye=x.colorSpace===Ot||se===ce?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye);let Ue=m(x)&&p(x.image)===!1,Z=_(x.image,Ue,!1,r.maxTextureSize);Z=De(x,Z);let Ge=p(Z)||l,ze=a.convert(x.format,x.colorSpace),Ee=a.convert(x.type),ge=w(x.internalFormat,ze,Ee,x.colorSpace,x.isVideoTexture);H(K,x,Ge);let ue,Pe=x.mipmaps,Ve=l&&x.isVideoTexture!==!0&&ge!==Fl,je=de.__version===void 0||$===!0,Fe=C(x,Z,Ge);if(x.isDepthTexture)ge=i.DEPTH_COMPONENT,l?x.type===gn?ge=i.DEPTH_COMPONENT32F:x.type===mn?ge=i.DEPTH_COMPONENT24:x.type===Un?ge=i.DEPTH24_STENCIL8:ge=i.DEPTH_COMPONENT16:x.type===gn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),x.format===Nn&&ge===i.DEPTH_COMPONENT&&x.type!==Ra&&x.type!==mn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),x.type=mn,Ee=a.convert(x.type)),x.format===pi&&ge===i.DEPTH_COMPONENT&&(ge=i.DEPTH_STENCIL,x.type!==Un&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),x.type=Un,Ee=a.convert(x.type))),je&&(Ve?t.texStorage2D(i.TEXTURE_2D,1,ge,Z.width,Z.height):t.texImage2D(i.TEXTURE_2D,0,ge,Z.width,Z.height,0,ze,Ee,null));else if(x.isDataTexture)if(Pe.length>0&&Ge){Ve&&je&&t.texStorage2D(i.TEXTURE_2D,Fe,ge,Pe[0].width,Pe[0].height);for(let te=0,R=Pe.length;te<R;te++)ue=Pe[te],Ve?t.texSubImage2D(i.TEXTURE_2D,te,0,0,ue.width,ue.height,ze,Ee,ue.data):t.texImage2D(i.TEXTURE_2D,te,ge,ue.width,ue.height,0,ze,Ee,ue.data);x.generateMipmaps=!1}else Ve?(je&&t.texStorage2D(i.TEXTURE_2D,Fe,ge,Z.width,Z.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,Z.width,Z.height,ze,Ee,Z.data)):t.texImage2D(i.TEXTURE_2D,0,ge,Z.width,Z.height,0,ze,Ee,Z.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Ve&&je&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Fe,ge,Pe[0].width,Pe[0].height,Z.depth);for(let te=0,R=Pe.length;te<R;te++)ue=Pe[te],x.format!==Wt?ze!==null?Ve?t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,0,ue.width,ue.height,Z.depth,ze,ue.data,0,0):t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,te,ge,ue.width,ue.height,Z.depth,0,ue.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ve?t.texSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,0,ue.width,ue.height,Z.depth,ze,Ee,ue.data):t.texImage3D(i.TEXTURE_2D_ARRAY,te,ge,ue.width,ue.height,Z.depth,0,ze,Ee,ue.data)}else{Ve&&je&&t.texStorage2D(i.TEXTURE_2D,Fe,ge,Pe[0].width,Pe[0].height);for(let te=0,R=Pe.length;te<R;te++)ue=Pe[te],x.format!==Wt?ze!==null?Ve?t.compressedTexSubImage2D(i.TEXTURE_2D,te,0,0,ue.width,ue.height,ze,ue.data):t.compressedTexImage2D(i.TEXTURE_2D,te,ge,ue.width,ue.height,0,ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ve?t.texSubImage2D(i.TEXTURE_2D,te,0,0,ue.width,ue.height,ze,Ee,ue.data):t.texImage2D(i.TEXTURE_2D,te,ge,ue.width,ue.height,0,ze,Ee,ue.data)}else if(x.isDataArrayTexture)Ve?(je&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Fe,ge,Z.width,Z.height,Z.depth),t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,ze,Ee,Z.data)):t.texImage3D(i.TEXTURE_2D_ARRAY,0,ge,Z.width,Z.height,Z.depth,0,ze,Ee,Z.data);else if(x.isData3DTexture)Ve?(je&&t.texStorage3D(i.TEXTURE_3D,Fe,ge,Z.width,Z.height,Z.depth),t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,ze,Ee,Z.data)):t.texImage3D(i.TEXTURE_3D,0,ge,Z.width,Z.height,Z.depth,0,ze,Ee,Z.data);else if(x.isFramebufferTexture){if(je)if(Ve)t.texStorage2D(i.TEXTURE_2D,Fe,ge,Z.width,Z.height);else{let te=Z.width,R=Z.height;for(let ie=0;ie<Fe;ie++)t.texImage2D(i.TEXTURE_2D,ie,ge,te,R,0,ze,Ee,null),te>>=1,R>>=1}}else if(Pe.length>0&&Ge){Ve&&je&&t.texStorage2D(i.TEXTURE_2D,Fe,ge,Pe[0].width,Pe[0].height);for(let te=0,R=Pe.length;te<R;te++)ue=Pe[te],Ve?t.texSubImage2D(i.TEXTURE_2D,te,0,0,ze,Ee,ue):t.texImage2D(i.TEXTURE_2D,te,ge,ze,Ee,ue);x.generateMipmaps=!1}else Ve?(je&&t.texStorage2D(i.TEXTURE_2D,Fe,ge,Z.width,Z.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,ze,Ee,Z)):t.texImage2D(i.TEXTURE_2D,0,ge,ze,Ee,Z);y(x,Ge)&&v(K),de.__version=j.version,x.onUpdate&&x.onUpdate(x)}b.__version=x.version}function me(b,x,F){if(x.image.length!==6)return;let K=Y(b,x),$=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,b.__webglTexture,i.TEXTURE0+F);let j=n.get($);if($.version!==j.__version||K===!0){t.activeTexture(i.TEXTURE0+F);let de=We.getPrimaries(We.workingColorSpace),se=x.colorSpace===Ot?null:We.getPrimaries(x.colorSpace),ce=x.colorSpace===Ot||de===se?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ce);let ye=x.isCompressedTexture||x.image[0].isCompressedTexture,Ue=x.image[0]&&x.image[0].isDataTexture,Z=[];for(let te=0;te<6;te++)!ye&&!Ue?Z[te]=_(x.image[te],!1,!0,r.maxCubemapSize):Z[te]=Ue?x.image[te].image:x.image[te],Z[te]=De(x,Z[te]);let Ge=Z[0],ze=p(Ge)||l,Ee=a.convert(x.format,x.colorSpace),ge=a.convert(x.type),ue=w(x.internalFormat,Ee,ge,x.colorSpace),Pe=l&&x.isVideoTexture!==!0,Ve=j.__version===void 0||K===!0,je=C(x,Ge,ze);H(i.TEXTURE_CUBE_MAP,x,ze);let Fe;if(ye){Pe&&Ve&&t.texStorage2D(i.TEXTURE_CUBE_MAP,je,ue,Ge.width,Ge.height);for(let te=0;te<6;te++){Fe=Z[te].mipmaps;for(let R=0;R<Fe.length;R++){let ie=Fe[R];x.format!==Wt?Ee!==null?Pe?t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,R,0,0,ie.width,ie.height,Ee,ie.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,R,ue,ie.width,ie.height,0,ie.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Pe?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,R,0,0,ie.width,ie.height,Ee,ge,ie.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,R,ue,ie.width,ie.height,0,Ee,ge,ie.data)}}}else{Fe=x.mipmaps,Pe&&Ve&&(Fe.length>0&&je++,t.texStorage2D(i.TEXTURE_CUBE_MAP,je,ue,Z[0].width,Z[0].height));for(let te=0;te<6;te++)if(Ue){Pe?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Z[te].width,Z[te].height,Ee,ge,Z[te].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,ue,Z[te].width,Z[te].height,0,Ee,ge,Z[te].data);for(let R=0;R<Fe.length;R++){let re=Fe[R].image[te].image;Pe?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,R+1,0,0,re.width,re.height,Ee,ge,re.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,R+1,ue,re.width,re.height,0,Ee,ge,re.data)}}else{Pe?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Ee,ge,Z[te]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,ue,Ee,ge,Z[te]);for(let R=0;R<Fe.length;R++){let ie=Fe[R];Pe?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,R+1,0,0,Ee,ge,ie.image[te]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,R+1,ue,Ee,ge,ie.image[te])}}}y(x,ze)&&v(i.TEXTURE_CUBE_MAP),j.__version=$.version,x.onUpdate&&x.onUpdate(x)}b.__version=x.version}function pe(b,x,F,K,$,j){let de=a.convert(F.format,F.colorSpace),se=a.convert(F.type),ce=w(F.internalFormat,de,se,F.colorSpace);if(!n.get(x).__hasExternalTextures){let Ue=Math.max(1,x.width>>j),Z=Math.max(1,x.height>>j);$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?t.texImage3D($,j,ce,Ue,Z,x.depth,0,de,se,null):t.texImage2D($,j,ce,Ue,Z,0,de,se,null)}t.bindFramebuffer(i.FRAMEBUFFER,b),he(x)?h.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,$,n.get(F).__webglTexture,0,Ae(x)):($===i.TEXTURE_2D||$>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,K,$,n.get(F).__webglTexture,j),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Re(b,x,F){if(i.bindRenderbuffer(i.RENDERBUFFER,b),x.depthBuffer&&!x.stencilBuffer){let K=l===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(F||he(x)){let $=x.depthTexture;$&&$.isDepthTexture&&($.type===gn?K=i.DEPTH_COMPONENT32F:$.type===mn&&(K=i.DEPTH_COMPONENT24));let j=Ae(x);he(x)?h.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,j,K,x.width,x.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,j,K,x.width,x.height)}else i.renderbufferStorage(i.RENDERBUFFER,K,x.width,x.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,b)}else if(x.depthBuffer&&x.stencilBuffer){let K=Ae(x);F&&he(x)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,K,i.DEPTH24_STENCIL8,x.width,x.height):he(x)?h.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,K,i.DEPTH24_STENCIL8,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,b)}else{let K=x.isWebGLMultipleRenderTargets===!0?x.texture:[x.texture];for(let $=0;$<K.length;$++){let j=K[$],de=a.convert(j.format,j.colorSpace),se=a.convert(j.type),ce=w(j.internalFormat,de,se,j.colorSpace),ye=Ae(x);F&&he(x)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ye,ce,x.width,x.height):he(x)?h.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ye,ce,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,ce,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Le(b,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,b),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(x.depthTexture).__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),V(x.depthTexture,0);let K=n.get(x.depthTexture).__webglTexture,$=Ae(x);if(x.depthTexture.format===Nn)he(x)?h.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0);else if(x.depthTexture.format===pi)he(x)?h.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function Me(b){let x=n.get(b),F=b.isWebGLCubeRenderTarget===!0;if(b.depthTexture&&!x.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");Le(x.__webglFramebuffer,b)}else if(F){x.__webglDepthbuffer=[];for(let K=0;K<6;K++)t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[K]),x.__webglDepthbuffer[K]=i.createRenderbuffer(),Re(x.__webglDepthbuffer[K],b,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer=i.createRenderbuffer(),Re(x.__webglDepthbuffer,b,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function ke(b,x,F){let K=n.get(b);x!==void 0&&pe(K.__webglFramebuffer,b,b.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&Me(b)}function U(b){let x=b.texture,F=n.get(b),K=n.get(x);b.addEventListener("dispose",D),b.isWebGLMultipleRenderTargets!==!0&&(K.__webglTexture===void 0&&(K.__webglTexture=i.createTexture()),K.__version=x.version,c.memory.textures++);let $=b.isWebGLCubeRenderTarget===!0,j=b.isWebGLMultipleRenderTargets===!0,de=p(b)||l;if($){F.__webglFramebuffer=[];for(let se=0;se<6;se++)if(l&&x.mipmaps&&x.mipmaps.length>0){F.__webglFramebuffer[se]=[];for(let ce=0;ce<x.mipmaps.length;ce++)F.__webglFramebuffer[se][ce]=i.createFramebuffer()}else F.__webglFramebuffer[se]=i.createFramebuffer()}else{if(l&&x.mipmaps&&x.mipmaps.length>0){F.__webglFramebuffer=[];for(let se=0;se<x.mipmaps.length;se++)F.__webglFramebuffer[se]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(j)if(r.drawBuffers){let se=b.texture;for(let ce=0,ye=se.length;ce<ye;ce++){let Ue=n.get(se[ce]);Ue.__webglTexture===void 0&&(Ue.__webglTexture=i.createTexture(),c.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(l&&b.samples>0&&he(b)===!1){let se=j?x:[x];F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let ce=0;ce<se.length;ce++){let ye=se[ce];F.__webglColorRenderbuffer[ce]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[ce]);let Ue=a.convert(ye.format,ye.colorSpace),Z=a.convert(ye.type),Ge=w(ye.internalFormat,Ue,Z,ye.colorSpace,b.isXRRenderTarget===!0),ze=Ae(b);i.renderbufferStorageMultisample(i.RENDERBUFFER,ze,Ge,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ce,i.RENDERBUFFER,F.__webglColorRenderbuffer[ce])}i.bindRenderbuffer(i.RENDERBUFFER,null),b.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),Re(F.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if($){t.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),H(i.TEXTURE_CUBE_MAP,x,de);for(let se=0;se<6;se++)if(l&&x.mipmaps&&x.mipmaps.length>0)for(let ce=0;ce<x.mipmaps.length;ce++)pe(F.__webglFramebuffer[se][ce],b,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+se,ce);else pe(F.__webglFramebuffer[se],b,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0);y(x,de)&&v(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(j){let se=b.texture;for(let ce=0,ye=se.length;ce<ye;ce++){let Ue=se[ce],Z=n.get(Ue);t.bindTexture(i.TEXTURE_2D,Z.__webglTexture),H(i.TEXTURE_2D,Ue,de),pe(F.__webglFramebuffer,b,Ue,i.COLOR_ATTACHMENT0+ce,i.TEXTURE_2D,0),y(Ue,de)&&v(i.TEXTURE_2D)}t.unbindTexture()}else{let se=i.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(l?se=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(se,K.__webglTexture),H(se,x,de),l&&x.mipmaps&&x.mipmaps.length>0)for(let ce=0;ce<x.mipmaps.length;ce++)pe(F.__webglFramebuffer[ce],b,x,i.COLOR_ATTACHMENT0,se,ce);else pe(F.__webglFramebuffer,b,x,i.COLOR_ATTACHMENT0,se,0);y(x,de)&&v(se),t.unbindTexture()}b.depthBuffer&&Me(b)}function vt(b){let x=p(b)||l,F=b.isWebGLMultipleRenderTargets===!0?b.texture:[b.texture];for(let K=0,$=F.length;K<$;K++){let j=F[K];if(y(j,x)){let de=b.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,se=n.get(j).__webglTexture;t.bindTexture(de,se),v(de),t.unbindTexture()}}}function _e(b){if(l&&b.samples>0&&he(b)===!1){let x=b.isWebGLMultipleRenderTargets?b.texture:[b.texture],F=b.width,K=b.height,$=i.COLOR_BUFFER_BIT,j=[],de=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,se=n.get(b),ce=b.isWebGLMultipleRenderTargets===!0;if(ce)for(let ye=0;ye<x.length;ye++)t.bindFramebuffer(i.FRAMEBUFFER,se.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,se.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,se.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,se.__webglFramebuffer);for(let ye=0;ye<x.length;ye++){j.push(i.COLOR_ATTACHMENT0+ye),b.depthBuffer&&j.push(de);let Ue=se.__ignoreDepthValues!==void 0?se.__ignoreDepthValues:!1;if(Ue===!1&&(b.depthBuffer&&($|=i.DEPTH_BUFFER_BIT),b.stencilBuffer&&($|=i.STENCIL_BUFFER_BIT)),ce&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,se.__webglColorRenderbuffer[ye]),Ue===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[de]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[de])),ce){let Z=n.get(x[ye]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Z,0)}i.blitFramebuffer(0,0,F,K,0,0,F,K,$,i.NEAREST),d&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,j)}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ce)for(let ye=0;ye<x.length;ye++){t.bindFramebuffer(i.FRAMEBUFFER,se.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.RENDERBUFFER,se.__webglColorRenderbuffer[ye]);let Ue=n.get(x[ye]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,se.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.TEXTURE_2D,Ue,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,se.__webglMultisampledFramebuffer)}}function Ae(b){return Math.min(r.maxSamples,b.samples)}function he(b){let x=n.get(b);return l&&b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function Je(b){let x=c.render.frame;s.get(b)!==x&&(s.set(b,x),b.update())}function De(b,x){let F=b.colorSpace,K=b.format,$=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||b.format===Ys||F!==an&&F!==Ot&&(We.getTransfer(F)===Ze?l===!1?e.has("EXT_sRGB")===!0&&K===Wt?(b.format=Ys,b.minFilter=Ft,b.generateMipmaps=!1):x=Tr.sRGBToLinear(x):(K!==Wt||$!==yn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),x}this.allocateTextureUnit=L,this.resetTextureUnits=ee,this.setTexture2D=V,this.setTexture2DArray=X,this.setTexture3D=W,this.setTextureCube=G,this.rebindTextures=ke,this.setupRenderTarget=U,this.updateRenderTargetMipmap=vt,this.updateMultisampleRenderTarget=_e,this.setupDepthRenderbuffer=Me,this.setupFrameBufferTexture=pe,this.useMultisampledRTT=he}function Sm(i,e,t){let n=t.isWebGL2;function r(a,c=Ot){let l,h=We.getTransfer(c);if(a===yn)return i.UNSIGNED_BYTE;if(a===Pl)return i.UNSIGNED_SHORT_4_4_4_4;if(a===Il)return i.UNSIGNED_SHORT_5_5_5_1;if(a===pu)return i.BYTE;if(a===mu)return i.SHORT;if(a===Ra)return i.UNSIGNED_SHORT;if(a===Ll)return i.INT;if(a===mn)return i.UNSIGNED_INT;if(a===gn)return i.FLOAT;if(a===Pi)return n?i.HALF_FLOAT:(l=e.get("OES_texture_half_float"),l!==null?l.HALF_FLOAT_OES:null);if(a===gu)return i.ALPHA;if(a===Wt)return i.RGBA;if(a===_u)return i.LUMINANCE;if(a===vu)return i.LUMINANCE_ALPHA;if(a===Nn)return i.DEPTH_COMPONENT;if(a===pi)return i.DEPTH_STENCIL;if(a===Ys)return l=e.get("EXT_sRGB"),l!==null?l.SRGB_ALPHA_EXT:null;if(a===xu)return i.RED;if(a===Dl)return i.RED_INTEGER;if(a===yu)return i.RG;if(a===Ul)return i.RG_INTEGER;if(a===Nl)return i.RGBA_INTEGER;if(a===cs||a===us||a===hs||a===ds)if(h===Ze)if(l=e.get("WEBGL_compressed_texture_s3tc_srgb"),l!==null){if(a===cs)return l.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(a===us)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(a===hs)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(a===ds)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(l=e.get("WEBGL_compressed_texture_s3tc"),l!==null){if(a===cs)return l.COMPRESSED_RGB_S3TC_DXT1_EXT;if(a===us)return l.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(a===hs)return l.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(a===ds)return l.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(a===no||a===io||a===ro||a===so)if(l=e.get("WEBGL_compressed_texture_pvrtc"),l!==null){if(a===no)return l.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(a===io)return l.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(a===ro)return l.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(a===so)return l.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(a===Fl)return l=e.get("WEBGL_compressed_texture_etc1"),l!==null?l.COMPRESSED_RGB_ETC1_WEBGL:null;if(a===ao||a===oo)if(l=e.get("WEBGL_compressed_texture_etc"),l!==null){if(a===ao)return h===Ze?l.COMPRESSED_SRGB8_ETC2:l.COMPRESSED_RGB8_ETC2;if(a===oo)return h===Ze?l.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:l.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(a===lo||a===co||a===uo||a===ho||a===fo||a===po||a===mo||a===go||a===_o||a===vo||a===xo||a===yo||a===Mo||a===So)if(l=e.get("WEBGL_compressed_texture_astc"),l!==null){if(a===lo)return h===Ze?l.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:l.COMPRESSED_RGBA_ASTC_4x4_KHR;if(a===co)return h===Ze?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:l.COMPRESSED_RGBA_ASTC_5x4_KHR;if(a===uo)return h===Ze?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:l.COMPRESSED_RGBA_ASTC_5x5_KHR;if(a===ho)return h===Ze?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:l.COMPRESSED_RGBA_ASTC_6x5_KHR;if(a===fo)return h===Ze?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:l.COMPRESSED_RGBA_ASTC_6x6_KHR;if(a===po)return h===Ze?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:l.COMPRESSED_RGBA_ASTC_8x5_KHR;if(a===mo)return h===Ze?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:l.COMPRESSED_RGBA_ASTC_8x6_KHR;if(a===go)return h===Ze?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:l.COMPRESSED_RGBA_ASTC_8x8_KHR;if(a===_o)return h===Ze?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:l.COMPRESSED_RGBA_ASTC_10x5_KHR;if(a===vo)return h===Ze?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:l.COMPRESSED_RGBA_ASTC_10x6_KHR;if(a===xo)return h===Ze?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:l.COMPRESSED_RGBA_ASTC_10x8_KHR;if(a===yo)return h===Ze?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:l.COMPRESSED_RGBA_ASTC_10x10_KHR;if(a===Mo)return h===Ze?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:l.COMPRESSED_RGBA_ASTC_12x10_KHR;if(a===So)return h===Ze?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:l.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(a===fs||a===bo||a===Eo)if(l=e.get("EXT_texture_compression_bptc"),l!==null){if(a===fs)return h===Ze?l.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:l.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(a===bo)return l.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(a===Eo)return l.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(a===Mu||a===Ao||a===To||a===wo)if(l=e.get("EXT_texture_compression_rgtc"),l!==null){if(a===fs)return l.COMPRESSED_RED_RGTC1_EXT;if(a===Ao)return l.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(a===To)return l.COMPRESSED_RED_GREEN_RGTC2_EXT;if(a===wo)return l.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return a===Un?n?i.UNSIGNED_INT_24_8:(l=e.get("WEBGL_depth_texture"),l!==null?l.UNSIGNED_INT_24_8_WEBGL:null):i[a]!==void 0?i[a]:null}return{convert:r}}var la=class extends bt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},_n=class extends dt{constructor(){super(),this.isGroup=!0,this.type="Group"}},bm={type:"move"},Ci=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _n,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _n,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _n,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,a=null,c=null,l=this._targetRay,h=this._grip,d=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(d&&e.hand){c=!0;for(let _ of e.hand.values()){let p=t.getJointPose(_,n),m=this._getHandJoint(d,_);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}let s=d.joints["index-finger-tip"],o=d.joints["thumb-tip"],u=s.position.distanceTo(o.position),f=.02,g=.005;d.inputState.pinching&&u>f+g?(d.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!d.inputState.pinching&&u<=f-g&&(d.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else h!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,n),a!==null&&(h.matrix.fromArray(a.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,a.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(a.linearVelocity)):h.hasLinearVelocity=!1,a.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(a.angularVelocity)):h.hasAngularVelocity=!1));l!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&a!==null&&(r=a),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,this.dispatchEvent(bm)))}return l!==null&&(l.visible=r!==null),h!==null&&(h.visible=a!==null),d!==null&&(d.visible=c!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new _n;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},ca=class extends Sn{constructor(e,t){super();let n=this,r=null,a=1,c=null,l="local-floor",h=1,d=null,s=null,o=null,u=null,f=null,g=null,_=t.getContextAttributes(),p=null,m=null,y=[],v=[],w=new He,C=null,T=new bt;T.layers.enable(1),T.viewport=new ct;let A=new bt;A.layers.enable(2),A.viewport=new ct;let D=[T,A],S=new la;S.layers.enable(1),S.layers.enable(2);let E=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(H){let Y=y[H];return Y===void 0&&(Y=new Ci,y[H]=Y),Y.getTargetRaySpace()},this.getControllerGrip=function(H){let Y=y[H];return Y===void 0&&(Y=new Ci,y[H]=Y),Y.getGripSpace()},this.getHand=function(H){let Y=y[H];return Y===void 0&&(Y=new Ci,y[H]=Y),Y.getHandSpace()};function q(H){let Y=v.indexOf(H.inputSource);if(Y===-1)return;let ae=y[Y];ae!==void 0&&(ae.update(H.inputSource,H.frame,d||c),ae.dispatchEvent({type:H.type,data:H.inputSource}))}function ee(){r.removeEventListener("select",q),r.removeEventListener("selectstart",q),r.removeEventListener("selectend",q),r.removeEventListener("squeeze",q),r.removeEventListener("squeezestart",q),r.removeEventListener("squeezeend",q),r.removeEventListener("end",ee),r.removeEventListener("inputsourceschange",L);for(let H=0;H<y.length;H++){let Y=v[H];Y!==null&&(v[H]=null,y[H].disconnect(Y))}E=null,k=null,e.setRenderTarget(p),f=null,u=null,o=null,r=null,m=null,le.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(w.width,w.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(H){a=H,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(H){l=H,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||c},this.setReferenceSpace=function(H){d=H},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return o},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(H){if(r=H,r!==null){if(p=e.getRenderTarget(),r.addEventListener("select",q),r.addEventListener("selectstart",q),r.addEventListener("selectend",q),r.addEventListener("squeeze",q),r.addEventListener("squeezestart",q),r.addEventListener("squeezeend",q),r.addEventListener("end",ee),r.addEventListener("inputsourceschange",L),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(w),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){let Y={antialias:r.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:a};f=new XRWebGLLayer(r,t,Y),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),m=new on(f.framebufferWidth,f.framebufferHeight,{format:Wt,type:yn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let Y=null,ae=null,me=null;_.depth&&(me=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Y=_.stencil?pi:Nn,ae=_.stencil?Un:mn);let pe={colorFormat:t.RGBA8,depthFormat:me,scaleFactor:a};o=new XRWebGLBinding(r,t),u=o.createProjectionLayer(pe),r.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),m=new on(u.textureWidth,u.textureHeight,{format:Wt,type:yn,depthTexture:new Br(u.textureWidth,u.textureHeight,ae,void 0,void 0,void 0,void 0,void 0,void 0,Y),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});let Re=e.properties.get(m);Re.__ignoreDepthValues=u.ignoreDepthValues}m.isXRRenderTarget=!0,this.setFoveation(h),d=null,c=await r.requestReferenceSpace(l),le.setContext(r),le.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function L(H){for(let Y=0;Y<H.removed.length;Y++){let ae=H.removed[Y],me=v.indexOf(ae);me>=0&&(v[me]=null,y[me].disconnect(ae))}for(let Y=0;Y<H.added.length;Y++){let ae=H.added[Y],me=v.indexOf(ae);if(me===-1){for(let Re=0;Re<y.length;Re++)if(Re>=v.length){v.push(ae),me=Re;break}else if(v[Re]===null){v[Re]=ae,me=Re;break}if(me===-1)break}let pe=y[me];pe&&pe.connect(ae)}}let B=new I,V=new I;function X(H,Y,ae){B.setFromMatrixPosition(Y.matrixWorld),V.setFromMatrixPosition(ae.matrixWorld);let me=B.distanceTo(V),pe=Y.projectionMatrix.elements,Re=ae.projectionMatrix.elements,Le=pe[14]/(pe[10]-1),Me=pe[14]/(pe[10]+1),ke=(pe[9]+1)/pe[5],U=(pe[9]-1)/pe[5],vt=(pe[8]-1)/pe[0],_e=(Re[8]+1)/Re[0],Ae=Le*vt,he=Le*_e,Je=me/(-vt+_e),De=Je*-vt;Y.matrixWorld.decompose(H.position,H.quaternion,H.scale),H.translateX(De),H.translateZ(Je),H.matrixWorld.compose(H.position,H.quaternion,H.scale),H.matrixWorldInverse.copy(H.matrixWorld).invert();let b=Le+Je,x=Me+Je,F=Ae-De,K=he+(me-De),$=ke*Me/x*b,j=U*Me/x*b;H.projectionMatrix.makePerspective(F,K,$,j,b,x),H.projectionMatrixInverse.copy(H.projectionMatrix).invert()}function W(H,Y){Y===null?H.matrixWorld.copy(H.matrix):H.matrixWorld.multiplyMatrices(Y.matrixWorld,H.matrix),H.matrixWorldInverse.copy(H.matrixWorld).invert()}this.updateCamera=function(H){if(r===null)return;S.near=A.near=T.near=H.near,S.far=A.far=T.far=H.far,(E!==S.near||k!==S.far)&&(r.updateRenderState({depthNear:S.near,depthFar:S.far}),E=S.near,k=S.far);let Y=H.parent,ae=S.cameras;W(S,Y);for(let me=0;me<ae.length;me++)W(ae[me],Y);ae.length===2?X(S,T,A):S.projectionMatrix.copy(T.projectionMatrix),G(H,S,Y)};function G(H,Y,ae){ae===null?H.matrix.copy(Y.matrixWorld):(H.matrix.copy(ae.matrixWorld),H.matrix.invert(),H.matrix.multiply(Y.matrixWorld)),H.matrix.decompose(H.position,H.quaternion,H.scale),H.updateMatrixWorld(!0),H.projectionMatrix.copy(Y.projectionMatrix),H.projectionMatrixInverse.copy(Y.projectionMatrixInverse),H.isPerspectiveCamera&&(H.fov=Zs*2*Math.atan(1/H.projectionMatrix.elements[5]),H.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(u===null&&f===null))return h},this.setFoveation=function(H){h=H,u!==null&&(u.fixedFoveation=H),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=H)};let J=null;function Q(H,Y){if(s=Y.getViewerPose(d||c),g=Y,s!==null){let ae=s.views;f!==null&&(e.setRenderTargetFramebuffer(m,f.framebuffer),e.setRenderTarget(m));let me=!1;ae.length!==S.cameras.length&&(S.cameras.length=0,me=!0);for(let pe=0;pe<ae.length;pe++){let Re=ae[pe],Le=null;if(f!==null)Le=f.getViewport(Re);else{let ke=o.getViewSubImage(u,Re);Le=ke.viewport,pe===0&&(e.setRenderTargetTextures(m,ke.colorTexture,u.ignoreDepthValues?void 0:ke.depthStencilTexture),e.setRenderTarget(m))}let Me=D[pe];Me===void 0&&(Me=new bt,Me.layers.enable(pe),Me.viewport=new ct,D[pe]=Me),Me.matrix.fromArray(Re.transform.matrix),Me.matrix.decompose(Me.position,Me.quaternion,Me.scale),Me.projectionMatrix.fromArray(Re.projectionMatrix),Me.projectionMatrixInverse.copy(Me.projectionMatrix).invert(),Me.viewport.set(Le.x,Le.y,Le.width,Le.height),pe===0&&(S.matrix.copy(Me.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),me===!0&&S.cameras.push(Me)}}for(let ae=0;ae<y.length;ae++){let me=v[ae],pe=y[ae];me!==null&&pe!==void 0&&pe.update(me,Y,d||c)}J&&J(H,Y),Y.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Y}),g=null}let le=new Vl;le.setAnimationLoop(Q),this.setAnimationLoop=function(H){J=H},this.dispose=function(){}}};function Em(i,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,Hl(i)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function r(p,m,y,v,w){m.isMeshBasicMaterial||m.isMeshLambertMaterial?a(p,m):m.isMeshToonMaterial?(a(p,m),o(p,m)):m.isMeshPhongMaterial?(a(p,m),s(p,m)):m.isMeshStandardMaterial?(a(p,m),u(p,m),m.isMeshPhysicalMaterial&&f(p,m,w)):m.isMeshMatcapMaterial?(a(p,m),g(p,m)):m.isMeshDepthMaterial?a(p,m):m.isMeshDistanceMaterial?(a(p,m),_(p,m)):m.isMeshNormalMaterial?a(p,m):m.isLineBasicMaterial?(c(p,m),m.isLineDashedMaterial&&l(p,m)):m.isPointsMaterial?h(p,m,y,v):m.isSpriteMaterial?d(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function a(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===wt&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===wt&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);let y=e.get(m).envMap;if(y&&(p.envMap.value=y,p.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap){p.lightMap.value=m.lightMap;let v=i._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=m.lightMapIntensity*v,t(m.lightMap,p.lightMapTransform)}m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function l(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function h(p,m,y,v){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*y,p.scale.value=v*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function d(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function s(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function o(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function u(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),e.get(m).envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,y){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===wt&&p.clearcoatNormalScale.value.negate())),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=y.texture,p.transmissionSamplerSize.value.set(y.width,y.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function _(p,m){let y=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(y.matrixWorld),p.nearDistance.value=y.shadow.camera.near,p.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function Am(i,e,t,n){let r={},a={},c=[],l=t.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function h(y,v){let w=v.program;n.uniformBlockBinding(y,w)}function d(y,v){let w=r[y.id];w===void 0&&(g(y),w=s(y),r[y.id]=w,y.addEventListener("dispose",p));let C=v.program;n.updateUBOMapping(y,C);let T=e.render.frame;a[y.id]!==T&&(u(y),a[y.id]=T)}function s(y){let v=o();y.__bindingPointIndex=v;let w=i.createBuffer(),C=y.__size,T=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,C,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,w),w}function o(){for(let y=0;y<l;y++)if(c.indexOf(y)===-1)return c.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){let v=r[y.id],w=y.uniforms,C=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let T=0,A=w.length;T<A;T++){let D=Array.isArray(w[T])?w[T]:[w[T]];for(let S=0,E=D.length;S<E;S++){let k=D[S];if(f(k,T,S,C)===!0){let q=k.__offset,ee=Array.isArray(k.value)?k.value:[k.value],L=0;for(let B=0;B<ee.length;B++){let V=ee[B],X=_(V);typeof V=="number"||typeof V=="boolean"?(k.__data[0]=V,i.bufferSubData(i.UNIFORM_BUFFER,q+L,k.__data)):V.isMatrix3?(k.__data[0]=V.elements[0],k.__data[1]=V.elements[1],k.__data[2]=V.elements[2],k.__data[3]=0,k.__data[4]=V.elements[3],k.__data[5]=V.elements[4],k.__data[6]=V.elements[5],k.__data[7]=0,k.__data[8]=V.elements[6],k.__data[9]=V.elements[7],k.__data[10]=V.elements[8],k.__data[11]=0):(V.toArray(k.__data,L),L+=X.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,q,k.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(y,v,w,C){let T=y.value,A=v+"_"+w;if(C[A]===void 0)return typeof T=="number"||typeof T=="boolean"?C[A]=T:C[A]=T.clone(),!0;{let D=C[A];if(typeof T=="number"||typeof T=="boolean"){if(D!==T)return C[A]=T,!0}else if(D.equals(T)===!1)return D.copy(T),!0}return!1}function g(y){let v=y.uniforms,w=0,C=16;for(let A=0,D=v.length;A<D;A++){let S=Array.isArray(v[A])?v[A]:[v[A]];for(let E=0,k=S.length;E<k;E++){let q=S[E],ee=Array.isArray(q.value)?q.value:[q.value];for(let L=0,B=ee.length;L<B;L++){let V=ee[L],X=_(V),W=w%C;W!==0&&C-W<X.boundary&&(w+=C-W),q.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),q.__offset=w,w+=X.storage}}}let T=w%C;return T>0&&(w+=C-T),y.__size=w,y.__cache={},this}function _(y){let v={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(v.boundary=4,v.storage=4):y.isVector2?(v.boundary=8,v.storage=8):y.isVector3||y.isColor?(v.boundary=16,v.storage=12):y.isVector4?(v.boundary=16,v.storage=16):y.isMatrix3?(v.boundary=48,v.storage=48):y.isMatrix4?(v.boundary=64,v.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),v}function p(y){let v=y.target;v.removeEventListener("dispose",p);let w=c.indexOf(v.__bindingPointIndex);c.splice(w,1),i.deleteBuffer(r[v.id]),delete r[v.id],delete a[v.id]}function m(){for(let y in r)i.deleteBuffer(r[y]);c=[],r={},a={}}return{bind:h,update:d,dispose:m}}var Fi=class{constructor(e={}){let{canvas:t=Du(),context:n=null,depth:r=!0,stencil:a=!0,alpha:c=!1,antialias:l=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:d=!1,powerPreference:s="default",failIfMajorPerformanceCaveat:o=!1}=e;this.isWebGLRenderer=!0;let u;n!==null?u=n.getContextAttributes().alpha:u=c;let f=new Uint32Array(4),g=new Int32Array(4),_=null,p=null,m=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ut,this._useLegacyLights=!1,this.toneMapping=xn,this.toneMappingExposure=1;let v=this,w=!1,C=0,T=0,A=null,D=-1,S=null,E=new ct,k=new ct,q=null,ee=new we(0),L=0,B=t.width,V=t.height,X=1,W=null,G=null,J=new ct(0,0,B,V),Q=new ct(0,0,B,V),le=!1,H=new Ui,Y=!1,ae=!1,me=null,pe=new nt,Re=new He,Le=new I,Me={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function ke(){return A===null?X:1}let U=n;function vt(M,P){for(let O=0;O<M.length;O++){let z=M[O],N=t.getContext(z,P);if(N!==null)return N}return null}try{let M={alpha:!0,depth:r,stencil:a,antialias:l,premultipliedAlpha:h,preserveDrawingBuffer:d,powerPreference:s,failIfMajorPerformanceCaveat:o};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Aa}`),t.addEventListener("webglcontextlost",te,!1),t.addEventListener("webglcontextrestored",R,!1),t.addEventListener("webglcontextcreationerror",ie,!1),U===null){let P=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&P.shift(),U=vt(P,M),U===null)throw vt(P)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&U instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),U.getShaderPrecisionFormat===void 0&&(U.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let _e,Ae,he,Je,De,b,x,F,K,$,j,de,se,ce,ye,Ue,Z,Ge,ze,Ee,ge,ue,Pe,Ve;function je(){_e=new Wf(U),Ae=new Bf(U,_e,e),_e.init(Ae),ue=new Sm(U,_e,Ae),he=new ym(U,_e,Ae),Je=new Yf(U),De=new lm,b=new Mm(U,_e,he,De,Ae,ue,Je),x=new kf(v),F=new Gf(v),K=new eh(U,Ae),Pe=new Ff(U,_e,K,Ae),$=new Xf(U,K,Je,Pe),j=new Kf(U,$,K,Je),ze=new Jf(U,Ae,b),Ue=new zf(De),de=new om(v,x,F,_e,Ae,Pe,Ue),se=new Em(v,De),ce=new um,ye=new gm(_e,Ae),Ge=new Nf(v,x,F,he,j,u,h),Z=new xm(v,j,Ae),Ve=new Am(U,Je,Ae,he),Ee=new Of(U,_e,Je,Ae),ge=new qf(U,_e,Je,Ae),Je.programs=de.programs,v.capabilities=Ae,v.extensions=_e,v.properties=De,v.renderLists=ce,v.shadowMap=Z,v.state=he,v.info=Je}je();let Fe=new ca(v,U);this.xr=Fe,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let M=_e.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){let M=_e.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(M){M!==void 0&&(X=M,this.setSize(B,V,!1))},this.getSize=function(M){return M.set(B,V)},this.setSize=function(M,P,O=!0){if(Fe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}B=M,V=P,t.width=Math.floor(M*X),t.height=Math.floor(P*X),O===!0&&(t.style.width=M+"px",t.style.height=P+"px"),this.setViewport(0,0,M,P)},this.getDrawingBufferSize=function(M){return M.set(B*X,V*X).floor()},this.setDrawingBufferSize=function(M,P,O){B=M,V=P,X=O,t.width=Math.floor(M*O),t.height=Math.floor(P*O),this.setViewport(0,0,M,P)},this.getCurrentViewport=function(M){return M.copy(E)},this.getViewport=function(M){return M.copy(J)},this.setViewport=function(M,P,O,z){M.isVector4?J.set(M.x,M.y,M.z,M.w):J.set(M,P,O,z),he.viewport(E.copy(J).multiplyScalar(X).floor())},this.getScissor=function(M){return M.copy(Q)},this.setScissor=function(M,P,O,z){M.isVector4?Q.set(M.x,M.y,M.z,M.w):Q.set(M,P,O,z),he.scissor(k.copy(Q).multiplyScalar(X).floor())},this.getScissorTest=function(){return le},this.setScissorTest=function(M){he.setScissorTest(le=M)},this.setOpaqueSort=function(M){W=M},this.setTransparentSort=function(M){G=M},this.getClearColor=function(M){return M.copy(Ge.getClearColor())},this.setClearColor=function(){Ge.setClearColor.apply(Ge,arguments)},this.getClearAlpha=function(){return Ge.getClearAlpha()},this.setClearAlpha=function(){Ge.setClearAlpha.apply(Ge,arguments)},this.clear=function(M=!0,P=!0,O=!0){let z=0;if(M){let N=!1;if(A!==null){let oe=A.texture.format;N=oe===Nl||oe===Ul||oe===Dl}if(N){let oe=A.texture.type,fe=oe===yn||oe===mn||oe===Ra||oe===Un||oe===Pl||oe===Il,xe=Ge.getClearColor(),be=Ge.getClearAlpha(),Ne=xe.r,Te=xe.g,Ce=xe.b;fe?(f[0]=Ne,f[1]=Te,f[2]=Ce,f[3]=be,U.clearBufferuiv(U.COLOR,0,f)):(g[0]=Ne,g[1]=Te,g[2]=Ce,g[3]=be,U.clearBufferiv(U.COLOR,0,g))}else z|=U.COLOR_BUFFER_BIT}P&&(z|=U.DEPTH_BUFFER_BIT),O&&(z|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",te,!1),t.removeEventListener("webglcontextrestored",R,!1),t.removeEventListener("webglcontextcreationerror",ie,!1),ce.dispose(),ye.dispose(),De.dispose(),x.dispose(),F.dispose(),j.dispose(),Pe.dispose(),Ve.dispose(),de.dispose(),Fe.dispose(),Fe.removeEventListener("sessionstart",xt),Fe.removeEventListener("sessionend",Ye),me&&(me.dispose(),me=null),yt.stop()};function te(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function R(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;let M=Je.autoReset,P=Z.enabled,O=Z.autoUpdate,z=Z.needsUpdate,N=Z.type;je(),Je.autoReset=M,Z.enabled=P,Z.autoUpdate=O,Z.needsUpdate=z,Z.type=N}function ie(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function re(M){let P=M.target;P.removeEventListener("dispose",re),Se(P)}function Se(M){ve(M),De.remove(M)}function ve(M){let P=De.get(M).programs;P!==void 0&&(P.forEach(function(O){de.releaseProgram(O)}),M.isShaderMaterial&&de.releaseShaderCache(M))}this.renderBufferDirect=function(M,P,O,z,N,oe){P===null&&(P=Me);let fe=N.isMesh&&N.matrixWorld.determinant()<0,xe=Sc(M,P,O,z,N);he.setMaterial(z,fe);let be=O.index,Ne=1;if(z.wireframe===!0){if(be=$.getWireframeAttribute(O),be===void 0)return;Ne=2}let Te=O.drawRange,Ce=O.attributes.position,et=Te.start*Ne,Ct=(Te.start+Te.count)*Ne;oe!==null&&(et=Math.max(et,oe.start*Ne),Ct=Math.min(Ct,(oe.start+oe.count)*Ne)),be!==null?(et=Math.max(et,0),Ct=Math.min(Ct,be.count)):Ce!=null&&(et=Math.max(et,0),Ct=Math.min(Ct,Ce.count));let ot=Ct-et;if(ot<0||ot===1/0)return;Pe.setup(N,z,xe,O,be);let $t,Ke=Ee;if(be!==null&&($t=K.get(be),Ke=ge,Ke.setIndex($t)),N.isMesh)z.wireframe===!0?(he.setLineWidth(z.wireframeLinewidth*ke()),Ke.setMode(U.LINES)):Ke.setMode(U.TRIANGLES);else if(N.isLine){let Oe=z.linewidth;Oe===void 0&&(Oe=1),he.setLineWidth(Oe*ke()),N.isLineSegments?Ke.setMode(U.LINES):N.isLineLoop?Ke.setMode(U.LINE_LOOP):Ke.setMode(U.LINE_STRIP)}else N.isPoints?Ke.setMode(U.POINTS):N.isSprite&&Ke.setMode(U.TRIANGLES);if(N.isBatchedMesh)Ke.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else if(N.isInstancedMesh)Ke.renderInstances(et,ot,N.count);else if(O.isInstancedBufferGeometry){let Oe=O._maxInstanceCount!==void 0?O._maxInstanceCount:1/0,is=Math.min(O.instanceCount,Oe);Ke.renderInstances(et,ot,is)}else Ke.render(et,ot)};function Xe(M,P,O){M.transparent===!0&&M.side===Vt&&M.forceSinglePass===!1?(M.side=wt,M.needsUpdate=!0,Gi(M,P,O),M.side=Mn,M.needsUpdate=!0,Gi(M,P,O),M.side=Vt):Gi(M,P,O)}this.compile=function(M,P,O=null){O===null&&(O=M),p=ye.get(O),p.init(),y.push(p),O.traverseVisible(function(N){N.isLight&&N.layers.test(P.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),M!==O&&M.traverseVisible(function(N){N.isLight&&N.layers.test(P.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),p.setupLights(v._useLegacyLights);let z=new Set;return M.traverse(function(N){let oe=N.material;if(oe)if(Array.isArray(oe))for(let fe=0;fe<oe.length;fe++){let xe=oe[fe];Xe(xe,O,N),z.add(xe)}else Xe(oe,O,N),z.add(oe)}),y.pop(),p=null,z},this.compileAsync=function(M,P,O=null){let z=this.compile(M,P,O);return new Promise(N=>{function oe(){if(z.forEach(function(fe){De.get(fe).currentProgram.isReady()&&z.delete(fe)}),z.size===0){N(M);return}setTimeout(oe,10)}_e.get("KHR_parallel_shader_compile")!==null?oe():setTimeout(oe,10)})};let qe=null;function at(M){qe&&qe(M)}function xt(){yt.stop()}function Ye(){yt.start()}let yt=new Vl;yt.setAnimationLoop(at),typeof self<"u"&&yt.setContext(self),this.setAnimationLoop=function(M){qe=M,Fe.setAnimationLoop(M),M===null?yt.stop():yt.start()},Fe.addEventListener("sessionstart",xt),Fe.addEventListener("sessionend",Ye),this.render=function(M,P){if(P!==void 0&&P.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),P.parent===null&&P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),Fe.enabled===!0&&Fe.isPresenting===!0&&(Fe.cameraAutoUpdate===!0&&Fe.updateCamera(P),P=Fe.getCamera()),M.isScene===!0&&M.onBeforeRender(v,M,P,A),p=ye.get(M,y.length),p.init(),y.push(p),pe.multiplyMatrices(P.projectionMatrix,P.matrixWorldInverse),H.setFromProjectionMatrix(pe),ae=this.localClippingEnabled,Y=Ue.init(this.clippingPlanes,ae),_=ce.get(M,m.length),_.init(),m.push(_),Yt(M,P,0,v.sortObjects),_.finish(),v.sortObjects===!0&&_.sort(W,G),this.info.render.frame++,Y===!0&&Ue.beginShadows();let O=p.state.shadowsArray;if(Z.render(O,M,P),Y===!0&&Ue.endShadows(),this.info.autoReset===!0&&this.info.reset(),Ge.render(_,M),p.setupLights(v._useLegacyLights),P.isArrayCamera){let z=P.cameras;for(let N=0,oe=z.length;N<oe;N++){let fe=z[N];za(_,M,fe,fe.viewport)}}else za(_,M,P);A!==null&&(b.updateMultisampleRenderTarget(A),b.updateRenderTargetMipmap(A)),M.isScene===!0&&M.onAfterRender(v,M,P),Pe.resetDefaultState(),D=-1,S=null,y.pop(),y.length>0?p=y[y.length-1]:p=null,m.pop(),m.length>0?_=m[m.length-1]:_=null};function Yt(M,P,O,z){if(M.visible===!1)return;if(M.layers.test(P.layers)){if(M.isGroup)O=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(P);else if(M.isLight)p.pushLight(M),M.castShadow&&p.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||H.intersectsSprite(M)){z&&Le.setFromMatrixPosition(M.matrixWorld).applyMatrix4(pe);let fe=j.update(M),xe=M.material;xe.visible&&_.push(M,fe,xe,O,Le.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||H.intersectsObject(M))){let fe=j.update(M),xe=M.material;if(z&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Le.copy(M.boundingSphere.center)):(fe.boundingSphere===null&&fe.computeBoundingSphere(),Le.copy(fe.boundingSphere.center)),Le.applyMatrix4(M.matrixWorld).applyMatrix4(pe)),Array.isArray(xe)){let be=fe.groups;for(let Ne=0,Te=be.length;Ne<Te;Ne++){let Ce=be[Ne],et=xe[Ce.materialIndex];et&&et.visible&&_.push(M,fe,et,O,Le.z,Ce)}}else xe.visible&&_.push(M,fe,xe,O,Le.z,null)}}let oe=M.children;for(let fe=0,xe=oe.length;fe<xe;fe++)Yt(oe[fe],P,O,z)}function za(M,P,O,z){let N=M.opaque,oe=M.transmissive,fe=M.transparent;p.setupLightsView(O),Y===!0&&Ue.setGlobalState(v.clippingPlanes,O),oe.length>0&&Mc(N,oe,P,O),z&&he.viewport(E.copy(z)),N.length>0&&Vi(N,P,O),oe.length>0&&Vi(oe,P,O),fe.length>0&&Vi(fe,P,O),he.buffers.depth.setTest(!0),he.buffers.depth.setMask(!0),he.buffers.color.setMask(!0),he.setPolygonOffset(!1)}function Mc(M,P,O,z){if((O.isScene===!0?O.overrideMaterial:null)!==null)return;let oe=Ae.isWebGL2;me===null&&(me=new on(1,1,{generateMipmaps:!0,type:_e.has("EXT_color_buffer_half_float")?Pi:yn,minFilter:Li,samples:oe?4:0})),v.getDrawingBufferSize(Re),oe?me.setSize(Re.x,Re.y):me.setSize($s(Re.x),$s(Re.y));let fe=v.getRenderTarget();v.setRenderTarget(me),v.getClearColor(ee),L=v.getClearAlpha(),L<1&&v.setClearColor(16777215,.5),v.clear();let xe=v.toneMapping;v.toneMapping=xn,Vi(M,O,z),b.updateMultisampleRenderTarget(me),b.updateRenderTargetMipmap(me);let be=!1;for(let Ne=0,Te=P.length;Ne<Te;Ne++){let Ce=P[Ne],et=Ce.object,Ct=Ce.geometry,ot=Ce.material,$t=Ce.group;if(ot.side===Vt&&et.layers.test(z.layers)){let Ke=ot.side;ot.side=wt,ot.needsUpdate=!0,ka(et,O,z,Ct,ot,$t),ot.side=Ke,ot.needsUpdate=!0,be=!0}}be===!0&&(b.updateMultisampleRenderTarget(me),b.updateRenderTargetMipmap(me)),v.setRenderTarget(fe),v.setClearColor(ee,L),v.toneMapping=xe}function Vi(M,P,O){let z=P.isScene===!0?P.overrideMaterial:null;for(let N=0,oe=M.length;N<oe;N++){let fe=M[N],xe=fe.object,be=fe.geometry,Ne=z===null?fe.material:z,Te=fe.group;xe.layers.test(O.layers)&&ka(xe,P,O,be,Ne,Te)}}function ka(M,P,O,z,N,oe){M.onBeforeRender(v,P,O,z,N,oe),M.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),N.onBeforeRender(v,P,O,z,M,oe),N.transparent===!0&&N.side===Vt&&N.forceSinglePass===!1?(N.side=wt,N.needsUpdate=!0,v.renderBufferDirect(O,P,z,N,M,oe),N.side=Mn,N.needsUpdate=!0,v.renderBufferDirect(O,P,z,N,M,oe),N.side=Vt):v.renderBufferDirect(O,P,z,N,M,oe),M.onAfterRender(v,P,O,z,N,oe)}function Gi(M,P,O){P.isScene!==!0&&(P=Me);let z=De.get(M),N=p.state.lights,oe=p.state.shadowsArray,fe=N.state.version,xe=de.getParameters(M,N.state,oe,P,O),be=de.getProgramCacheKey(xe),Ne=z.programs;z.environment=M.isMeshStandardMaterial?P.environment:null,z.fog=P.fog,z.envMap=(M.isMeshStandardMaterial?F:x).get(M.envMap||z.environment),Ne===void 0&&(M.addEventListener("dispose",re),Ne=new Map,z.programs=Ne);let Te=Ne.get(be);if(Te!==void 0){if(z.currentProgram===Te&&z.lightsStateVersion===fe)return Va(M,xe),Te}else xe.uniforms=de.getUniforms(M),M.onBuild(O,xe,v),M.onBeforeCompile(xe,v),Te=de.acquireProgram(xe,be),Ne.set(be,Te),z.uniforms=xe.uniforms;let Ce=z.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Ce.clippingPlanes=Ue.uniform),Va(M,xe),z.needsLights=Ec(M),z.lightsStateVersion=fe,z.needsLights&&(Ce.ambientLightColor.value=N.state.ambient,Ce.lightProbe.value=N.state.probe,Ce.directionalLights.value=N.state.directional,Ce.directionalLightShadows.value=N.state.directionalShadow,Ce.spotLights.value=N.state.spot,Ce.spotLightShadows.value=N.state.spotShadow,Ce.rectAreaLights.value=N.state.rectArea,Ce.ltc_1.value=N.state.rectAreaLTC1,Ce.ltc_2.value=N.state.rectAreaLTC2,Ce.pointLights.value=N.state.point,Ce.pointLightShadows.value=N.state.pointShadow,Ce.hemisphereLights.value=N.state.hemi,Ce.directionalShadowMap.value=N.state.directionalShadowMap,Ce.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Ce.spotShadowMap.value=N.state.spotShadowMap,Ce.spotLightMatrix.value=N.state.spotLightMatrix,Ce.spotLightMap.value=N.state.spotLightMap,Ce.pointShadowMap.value=N.state.pointShadowMap,Ce.pointShadowMatrix.value=N.state.pointShadowMatrix),z.currentProgram=Te,z.uniformsList=null,Te}function Ha(M){if(M.uniformsList===null){let P=M.currentProgram.getUniforms();M.uniformsList=hi.seqWithValue(P.seq,M.uniforms)}return M.uniformsList}function Va(M,P){let O=De.get(M);O.outputColorSpace=P.outputColorSpace,O.batching=P.batching,O.instancing=P.instancing,O.instancingColor=P.instancingColor,O.skinning=P.skinning,O.morphTargets=P.morphTargets,O.morphNormals=P.morphNormals,O.morphColors=P.morphColors,O.morphTargetsCount=P.morphTargetsCount,O.numClippingPlanes=P.numClippingPlanes,O.numIntersection=P.numClipIntersection,O.vertexAlphas=P.vertexAlphas,O.vertexTangents=P.vertexTangents,O.toneMapping=P.toneMapping}function Sc(M,P,O,z,N){P.isScene!==!0&&(P=Me),b.resetTextureUnits();let oe=P.fog,fe=z.isMeshStandardMaterial?P.environment:null,xe=A===null?v.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:an,be=(z.isMeshStandardMaterial?F:x).get(z.envMap||fe),Ne=z.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,Te=!!O.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Ce=!!O.morphAttributes.position,et=!!O.morphAttributes.normal,Ct=!!O.morphAttributes.color,ot=xn;z.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(ot=v.toneMapping);let $t=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Ke=$t!==void 0?$t.length:0,Oe=De.get(z),is=p.state.lights;if(Y===!0&&(ae===!0||M!==S)){let Ut=M===S&&z.id===D;Ue.setState(z,M,Ut)}let Qe=!1;z.version===Oe.__version?(Oe.needsLights&&Oe.lightsStateVersion!==is.state.version||Oe.outputColorSpace!==xe||N.isBatchedMesh&&Oe.batching===!1||!N.isBatchedMesh&&Oe.batching===!0||N.isInstancedMesh&&Oe.instancing===!1||!N.isInstancedMesh&&Oe.instancing===!0||N.isSkinnedMesh&&Oe.skinning===!1||!N.isSkinnedMesh&&Oe.skinning===!0||N.isInstancedMesh&&Oe.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Oe.instancingColor===!1&&N.instanceColor!==null||Oe.envMap!==be||z.fog===!0&&Oe.fog!==oe||Oe.numClippingPlanes!==void 0&&(Oe.numClippingPlanes!==Ue.numPlanes||Oe.numIntersection!==Ue.numIntersection)||Oe.vertexAlphas!==Ne||Oe.vertexTangents!==Te||Oe.morphTargets!==Ce||Oe.morphNormals!==et||Oe.morphColors!==Ct||Oe.toneMapping!==ot||Ae.isWebGL2===!0&&Oe.morphTargetsCount!==Ke)&&(Qe=!0):(Qe=!0,Oe.__version=z.version);let An=Oe.currentProgram;Qe===!0&&(An=Gi(z,P,N));let Ga=!1,Mi=!1,rs=!1,pt=An.getUniforms(),Tn=Oe.uniforms;if(he.useProgram(An.program)&&(Ga=!0,Mi=!0,rs=!0),z.id!==D&&(D=z.id,Mi=!0),Ga||S!==M){pt.setValue(U,"projectionMatrix",M.projectionMatrix),pt.setValue(U,"viewMatrix",M.matrixWorldInverse);let Ut=pt.map.cameraPosition;Ut!==void 0&&Ut.setValue(U,Le.setFromMatrixPosition(M.matrixWorld)),Ae.logarithmicDepthBuffer&&pt.setValue(U,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&pt.setValue(U,"isOrthographic",M.isOrthographicCamera===!0),S!==M&&(S=M,Mi=!0,rs=!0)}if(N.isSkinnedMesh){pt.setOptional(U,N,"bindMatrix"),pt.setOptional(U,N,"bindMatrixInverse");let Ut=N.skeleton;Ut&&(Ae.floatVertexTextures?(Ut.boneTexture===null&&Ut.computeBoneTexture(),pt.setValue(U,"boneTexture",Ut.boneTexture,b)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}N.isBatchedMesh&&(pt.setOptional(U,N,"batchingTexture"),pt.setValue(U,"batchingTexture",N._matricesTexture,b));let ss=O.morphAttributes;if((ss.position!==void 0||ss.normal!==void 0||ss.color!==void 0&&Ae.isWebGL2===!0)&&ze.update(N,O,An),(Mi||Oe.receiveShadow!==N.receiveShadow)&&(Oe.receiveShadow=N.receiveShadow,pt.setValue(U,"receiveShadow",N.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(Tn.envMap.value=be,Tn.flipEnvMap.value=be.isCubeTexture&&be.isRenderTargetTexture===!1?-1:1),Mi&&(pt.setValue(U,"toneMappingExposure",v.toneMappingExposure),Oe.needsLights&&bc(Tn,rs),oe&&z.fog===!0&&se.refreshFogUniforms(Tn,oe),se.refreshMaterialUniforms(Tn,z,X,V,me),hi.upload(U,Ha(Oe),Tn,b)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(hi.upload(U,Ha(Oe),Tn,b),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&pt.setValue(U,"center",N.center),pt.setValue(U,"modelViewMatrix",N.modelViewMatrix),pt.setValue(U,"normalMatrix",N.normalMatrix),pt.setValue(U,"modelMatrix",N.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){let Ut=z.uniformsGroups;for(let as=0,Ac=Ut.length;as<Ac;as++)if(Ae.isWebGL2){let Wa=Ut[as];Ve.update(Wa,An),Ve.bind(Wa,An)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return An}function bc(M,P){M.ambientLightColor.needsUpdate=P,M.lightProbe.needsUpdate=P,M.directionalLights.needsUpdate=P,M.directionalLightShadows.needsUpdate=P,M.pointLights.needsUpdate=P,M.pointLightShadows.needsUpdate=P,M.spotLights.needsUpdate=P,M.spotLightShadows.needsUpdate=P,M.rectAreaLights.needsUpdate=P,M.hemisphereLights.needsUpdate=P}function Ec(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(M,P,O){De.get(M.texture).__webglTexture=P,De.get(M.depthTexture).__webglTexture=O;let z=De.get(M);z.__hasExternalTextures=!0,z.__hasExternalTextures&&(z.__autoAllocateDepthBuffer=O===void 0,z.__autoAllocateDepthBuffer||_e.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),z.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(M,P){let O=De.get(M);O.__webglFramebuffer=P,O.__useDefaultFramebuffer=P===void 0},this.setRenderTarget=function(M,P=0,O=0){A=M,C=P,T=O;let z=!0,N=null,oe=!1,fe=!1;if(M){let be=De.get(M);be.__useDefaultFramebuffer!==void 0?(he.bindFramebuffer(U.FRAMEBUFFER,null),z=!1):be.__webglFramebuffer===void 0?b.setupRenderTarget(M):be.__hasExternalTextures&&b.rebindTextures(M,De.get(M.texture).__webglTexture,De.get(M.depthTexture).__webglTexture);let Ne=M.texture;(Ne.isData3DTexture||Ne.isDataArrayTexture||Ne.isCompressedArrayTexture)&&(fe=!0);let Te=De.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Te[P])?N=Te[P][O]:N=Te[P],oe=!0):Ae.isWebGL2&&M.samples>0&&b.useMultisampledRTT(M)===!1?N=De.get(M).__webglMultisampledFramebuffer:Array.isArray(Te)?N=Te[O]:N=Te,E.copy(M.viewport),k.copy(M.scissor),q=M.scissorTest}else E.copy(J).multiplyScalar(X).floor(),k.copy(Q).multiplyScalar(X).floor(),q=le;if(he.bindFramebuffer(U.FRAMEBUFFER,N)&&Ae.drawBuffers&&z&&he.drawBuffers(M,N),he.viewport(E),he.scissor(k),he.setScissorTest(q),oe){let be=De.get(M.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+P,be.__webglTexture,O)}else if(fe){let be=De.get(M.texture),Ne=P||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,be.__webglTexture,O||0,Ne)}D=-1},this.readRenderTargetPixels=function(M,P,O,z,N,oe,fe){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xe=De.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&fe!==void 0&&(xe=xe[fe]),xe){he.bindFramebuffer(U.FRAMEBUFFER,xe);try{let be=M.texture,Ne=be.format,Te=be.type;if(Ne!==Wt&&ue.convert(Ne)!==U.getParameter(U.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let Ce=Te===Pi&&(_e.has("EXT_color_buffer_half_float")||Ae.isWebGL2&&_e.has("EXT_color_buffer_float"));if(Te!==yn&&ue.convert(Te)!==U.getParameter(U.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Te===gn&&(Ae.isWebGL2||_e.has("OES_texture_float")||_e.has("WEBGL_color_buffer_float")))&&!Ce){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}P>=0&&P<=M.width-z&&O>=0&&O<=M.height-N&&U.readPixels(P,O,z,N,ue.convert(Ne),ue.convert(Te),oe)}finally{let be=A!==null?De.get(A).__webglFramebuffer:null;he.bindFramebuffer(U.FRAMEBUFFER,be)}}},this.copyFramebufferToTexture=function(M,P,O=0){let z=Math.pow(2,-O),N=Math.floor(P.image.width*z),oe=Math.floor(P.image.height*z);b.setTexture2D(P,0),U.copyTexSubImage2D(U.TEXTURE_2D,O,0,0,M.x,M.y,N,oe),he.unbindTexture()},this.copyTextureToTexture=function(M,P,O,z=0){let N=P.image.width,oe=P.image.height,fe=ue.convert(O.format),xe=ue.convert(O.type);b.setTexture2D(O,0),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,O.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,O.unpackAlignment),P.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,z,M.x,M.y,N,oe,fe,xe,P.image.data):P.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,z,M.x,M.y,P.mipmaps[0].width,P.mipmaps[0].height,fe,P.mipmaps[0].data):U.texSubImage2D(U.TEXTURE_2D,z,M.x,M.y,fe,xe,P.image),z===0&&O.generateMipmaps&&U.generateMipmap(U.TEXTURE_2D),he.unbindTexture()},this.copyTextureToTexture3D=function(M,P,O,z,N=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let oe=M.max.x-M.min.x+1,fe=M.max.y-M.min.y+1,xe=M.max.z-M.min.z+1,be=ue.convert(z.format),Ne=ue.convert(z.type),Te;if(z.isData3DTexture)b.setTexture3D(z,0),Te=U.TEXTURE_3D;else if(z.isDataArrayTexture||z.isCompressedArrayTexture)b.setTexture2DArray(z,0),Te=U.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,z.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,z.unpackAlignment);let Ce=U.getParameter(U.UNPACK_ROW_LENGTH),et=U.getParameter(U.UNPACK_IMAGE_HEIGHT),Ct=U.getParameter(U.UNPACK_SKIP_PIXELS),ot=U.getParameter(U.UNPACK_SKIP_ROWS),$t=U.getParameter(U.UNPACK_SKIP_IMAGES),Ke=O.isCompressedTexture?O.mipmaps[N]:O.image;U.pixelStorei(U.UNPACK_ROW_LENGTH,Ke.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Ke.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,M.min.x),U.pixelStorei(U.UNPACK_SKIP_ROWS,M.min.y),U.pixelStorei(U.UNPACK_SKIP_IMAGES,M.min.z),O.isDataTexture||O.isData3DTexture?U.texSubImage3D(Te,N,P.x,P.y,P.z,oe,fe,xe,be,Ne,Ke.data):O.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),U.compressedTexSubImage3D(Te,N,P.x,P.y,P.z,oe,fe,xe,be,Ke.data)):U.texSubImage3D(Te,N,P.x,P.y,P.z,oe,fe,xe,be,Ne,Ke),U.pixelStorei(U.UNPACK_ROW_LENGTH,Ce),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,et),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Ct),U.pixelStorei(U.UNPACK_SKIP_ROWS,ot),U.pixelStorei(U.UNPACK_SKIP_IMAGES,$t),N===0&&z.generateMipmaps&&U.generateMipmap(Te),he.unbindTexture()},this.initTexture=function(M){M.isCubeTexture?b.setTextureCube(M,0):M.isData3DTexture?b.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?b.setTexture2DArray(M,0):b.setTexture2D(M,0),he.unbindTexture()},this.resetState=function(){C=0,T=0,A=null,he.reset(),Pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return sn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=e===La?"display-p3":"srgb",t.unpackColorSpace=We.workingColorSpace===Zr?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===ut?Fn:Ol}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Fn?ut:an}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}},ua=class extends Fi{};ua.prototype.isWebGL1Renderer=!0;var zr=class extends dt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}};var zn=class extends Rt{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new we(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},vl=new I,xl=new I,yl=new nt,zs=new Ii,pr=new Bn,ha=class extends dt{constructor(e=new It,t=new zn){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let r=1,a=t.count;r<a;r++)vl.fromBufferAttribute(t,r-1),xl.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=vl.distanceTo(xl);e.setAttribute("lineDistance",new it(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,a=e.params.Line.threshold,c=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),pr.copy(n.boundingSphere),pr.applyMatrix4(r),pr.radius+=a,e.ray.intersectsSphere(pr)===!1)return;yl.copy(r).invert(),zs.copy(e.ray).applyMatrix4(yl);let l=a/((this.scale.x+this.scale.y+this.scale.z)/3),h=l*l,d=new I,s=new I,o=new I,u=new I,f=this.isLineSegments?2:1,g=n.index,p=n.attributes.position;if(g!==null){let m=Math.max(0,c.start),y=Math.min(g.count,c.start+c.count);for(let v=m,w=y-1;v<w;v+=f){let C=g.getX(v),T=g.getX(v+1);if(d.fromBufferAttribute(p,C),s.fromBufferAttribute(p,T),zs.distanceSqToSegment(d,s,u,o)>h)continue;u.applyMatrix4(this.matrixWorld);let D=e.ray.origin.distanceTo(u);D<e.near||D>e.far||t.push({distance:D,point:o.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}else{let m=Math.max(0,c.start),y=Math.min(p.count,c.start+c.count);for(let v=m,w=y-1;v<w;v+=f){if(d.fromBufferAttribute(p,v),s.fromBufferAttribute(p,v+1),zs.distanceSqToSegment(d,s,u,o)>h)continue;u.applyMatrix4(this.matrixWorld);let T=e.ray.origin.distanceTo(u);T<e.near||T>e.far||t.push({distance:T,point:o.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,c=r.length;a<c;a++){let l=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=a}}}}},Ml=new I,Sl=new I,Oi=class extends ha{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let r=0,a=t.count;r<a;r+=2)Ml.fromBufferAttribute(t,r),Sl.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+Ml.distanceTo(Sl);e.setAttribute("lineDistance",new it(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var En=class extends Rt{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new we(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},bl=new nt,da=new Ii,mr=new Bn,gr=new I,gi=class extends dt{constructor(e=new It,t=new En){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,a=e.params.Points.threshold,c=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),mr.copy(n.boundingSphere),mr.applyMatrix4(r),mr.radius+=a,e.ray.intersectsSphere(mr)===!1)return;bl.copy(r).invert(),da.copy(e.ray).applyMatrix4(bl);let l=a/((this.scale.x+this.scale.y+this.scale.z)/3),h=l*l,d=n.index,o=n.attributes.position;if(d!==null){let u=Math.max(0,c.start),f=Math.min(d.count,c.start+c.count);for(let g=u,_=f;g<_;g++){let p=d.getX(g);gr.fromBufferAttribute(o,p),El(gr,p,h,r,e,t,this)}}else{let u=Math.max(0,c.start),f=Math.min(o.count,c.start+c.count);for(let g=u,_=f;g<_;g++)gr.fromBufferAttribute(o,g),El(gr,g,h,r,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,c=r.length;a<c;a++){let l=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=a}}}}};function El(i,e,t,n,r,a,c){let l=da.distanceSqToPoint(i);if(l<t){let h=new I;da.closestPointToPoint(i,h),h.applyMatrix4(n);let d=r.ray.origin.distanceTo(h);if(d<r.near||d>r.far)return;a.push({distance:d,distanceToRay:Math.sqrt(l),point:h,index:e,face:null,object:c})}}var kr=class extends Rt{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new we(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}};var Hr=class extends Rt{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new we(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new we(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ca,this.normalScale=new He(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var Vr=class extends Rt{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new we(16777215),this.specular=new we(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new we(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ca,this.normalScale=new He(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=wa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};function _r(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Tm(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var _i=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],a=t[n-1];n:{e:{let c;t:{i:if(!(e<r)){for(let l=n+2;;){if(r===void 0){if(e<a)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===l)break;if(a=r,r=t[++n],e<r)break e}c=t.length;break t}if(!(e>=a)){let l=t[1];e<l&&(n=2,a=l);for(let h=n-2;;){if(a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===h)break;if(r=a,a=t[--n-1],e>=a)break e}c=n,n=0;break t}break n}for(;n<c;){let l=n+c>>>1;e<t[l]?c=l:n=l+1}if(r=t[n],a=t[n-1],a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,a,r)}return this.interpolate_(n,a,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,a=e*r;for(let c=0;c!==r;++c)t[c]=n[a+c];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},fa=class extends _i{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ro,endingEnd:Ro}}intervalChanged_(e,t,n){let r=this.parameterPositions,a=e-2,c=e+1,l=r[a],h=r[c];if(l===void 0)switch(this.getSettings_().endingStart){case Co:a=e,l=2*t-n;break;case Lo:a=r.length-2,l=t+r[a]-r[a+1];break;default:a=e,l=n}if(h===void 0)switch(this.getSettings_().endingEnd){case Co:c=e,h=2*n-t;break;case Lo:c=1,h=n+r[1]-r[0];break;default:c=e-1,h=t}let d=(n-t)*.5,s=this.valueSize;this._weightPrev=d/(t-l),this._weightNext=d/(h-n),this._offsetPrev=a*s,this._offsetNext=c*s}interpolate_(e,t,n,r){let a=this.resultBuffer,c=this.sampleValues,l=this.valueSize,h=e*l,d=h-l,s=this._offsetPrev,o=this._offsetNext,u=this._weightPrev,f=this._weightNext,g=(n-t)/(r-t),_=g*g,p=_*g,m=-u*p+2*u*_-u*g,y=(1+u)*p+(-1.5-2*u)*_+(-.5+u)*g+1,v=(-1-f)*p+(1.5+f)*_+.5*g,w=f*p-f*_;for(let C=0;C!==l;++C)a[C]=m*c[s+C]+y*c[d+C]+v*c[h+C]+w*c[o+C];return a}},pa=class extends _i{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let a=this.resultBuffer,c=this.sampleValues,l=this.valueSize,h=e*l,d=h-l,s=(n-t)/(r-t),o=1-s;for(let u=0;u!==l;++u)a[u]=c[d+u]*o+c[h+u]*s;return a}},ma=class extends _i{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},qt=class{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=_r(t,this.TimeBufferType),this.values=_r(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:_r(e.times,Array),values:_r(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new ma(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new pa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new fa(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case xr:t=this.InterpolantFactoryMethodDiscrete;break;case yr:t=this.InterpolantFactoryMethodLinear;break;case ps:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return xr;case this.InterpolantFactoryMethodLinear:return yr;case this.InterpolantFactoryMethodSmooth:return ps}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,a=0,c=r-1;for(;a!==r&&n[a]<e;)++a;for(;c!==-1&&n[c]>t;)--c;if(++c,a!==0||c!==r){a>=c&&(c=Math.max(c,1),a=c-1);let l=this.getValueSize();this.times=n.slice(a,c),this.values=this.values.slice(a*l,c*l)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,r=this.values,a=n.length;a===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let c=null;for(let l=0;l!==a;l++){let h=n[l];if(typeof h=="number"&&isNaN(h)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,l,h),e=!1;break}if(c!==null&&c>h){console.error("THREE.KeyframeTrack: Out of order keys.",this,l,h,c),e=!1;break}c=h}if(r!==void 0&&Tm(r))for(let l=0,h=r.length;l!==h;++l){let d=r[l];if(isNaN(d)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,l,d),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===ps,a=e.length-1,c=1;for(let l=1;l<a;++l){let h=!1,d=e[l],s=e[l+1];if(d!==s&&(l!==1||d!==e[0]))if(r)h=!0;else{let o=l*n,u=o-n,f=o+n;for(let g=0;g!==n;++g){let _=t[o+g];if(_!==t[u+g]||_!==t[f+g]){h=!0;break}}}if(h){if(l!==c){e[c]=e[l];let o=l*n,u=c*n;for(let f=0;f!==n;++f)t[u+f]=t[o+f]}++c}}if(a>0){e[c]=e[a];for(let l=a*n,h=c*n,d=0;d!==n;++d)t[h+d]=t[l+d];++c}return c!==e.length?(this.times=e.slice(0,c),this.values=t.slice(0,c*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};qt.prototype.TimeBufferType=Float32Array;qt.prototype.ValueBufferType=Float32Array;qt.prototype.DefaultInterpolation=yr;var kn=class extends qt{};kn.prototype.ValueTypeName="bool";kn.prototype.ValueBufferType=Array;kn.prototype.DefaultInterpolation=xr;kn.prototype.InterpolantFactoryMethodLinear=void 0;kn.prototype.InterpolantFactoryMethodSmooth=void 0;var ga=class extends qt{};ga.prototype.ValueTypeName="color";var _a=class extends qt{};_a.prototype.ValueTypeName="number";var va=class extends _i{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let a=this.resultBuffer,c=this.sampleValues,l=this.valueSize,h=(n-t)/(r-t),d=e*l;for(let s=d+l;d!==s;d+=4)bn.slerpFlat(a,0,c,d-l,c,d,h);return a}},Bi=class extends qt{InterpolantFactoryMethodLinear(e){return new va(this.times,this.values,this.getValueSize(),e)}};Bi.prototype.ValueTypeName="quaternion";Bi.prototype.DefaultInterpolation=yr;Bi.prototype.InterpolantFactoryMethodSmooth=void 0;var Hn=class extends qt{};Hn.prototype.ValueTypeName="string";Hn.prototype.ValueBufferType=Array;Hn.prototype.DefaultInterpolation=xr;Hn.prototype.InterpolantFactoryMethodLinear=void 0;Hn.prototype.InterpolantFactoryMethodSmooth=void 0;var xa=class extends qt{};xa.prototype.ValueTypeName="vector";var Al={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}},ya=class{constructor(e,t,n){let r=this,a=!1,c=0,l=0,h,d=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(s){l++,a===!1&&r.onStart!==void 0&&r.onStart(s,c,l),a=!0},this.itemEnd=function(s){c++,r.onProgress!==void 0&&r.onProgress(s,c,l),c===l&&(a=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(s){r.onError!==void 0&&r.onError(s)},this.resolveURL=function(s){return h?h(s):s},this.setURLModifier=function(s){return h=s,this},this.addHandler=function(s,o){return d.push(s,o),this},this.removeHandler=function(s){let o=d.indexOf(s);return o!==-1&&d.splice(o,2),this},this.getHandler=function(s){for(let o=0,u=d.length;o<u;o+=2){let f=d[o],g=d[o+1];if(f.global&&(f.lastIndex=0),f.test(s))return g}return null}}},wm=new ya,vi=class{constructor(e){this.manager=e!==void 0?e:wm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,a){n.load(e,r,t,a)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};vi.DEFAULT_MATERIAL_NAME="__DEFAULT";var tn={},Ma=class extends Error{constructor(e,t){super(e),this.response=t}},Gr=class extends vi{constructor(e){super(e)}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let a=Al.get(e);if(a!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(a),this.manager.itemEnd(e)},0),a;if(tn[e]!==void 0){tn[e].push({onLoad:t,onProgress:n,onError:r});return}tn[e]=[],tn[e].push({onLoad:t,onProgress:n,onError:r});let c=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),l=this.mimeType,h=this.responseType;fetch(c).then(d=>{if(d.status===200||d.status===0){if(d.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||d.body===void 0||d.body.getReader===void 0)return d;let s=tn[e],o=d.body.getReader(),u=d.headers.get("Content-Length")||d.headers.get("X-File-Size"),f=u?parseInt(u):0,g=f!==0,_=0,p=new ReadableStream({start(m){y();function y(){o.read().then(({done:v,value:w})=>{if(v)m.close();else{_+=w.byteLength;let C=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:f});for(let T=0,A=s.length;T<A;T++){let D=s[T];D.onProgress&&D.onProgress(C)}m.enqueue(w),y()}})}}});return new Response(p)}else throw new Ma(`fetch for "${d.url}" responded with ${d.status}: ${d.statusText}`,d)}).then(d=>{switch(h){case"arraybuffer":return d.arrayBuffer();case"blob":return d.blob();case"document":return d.text().then(s=>new DOMParser().parseFromString(s,l));case"json":return d.json();default:if(l===void 0)return d.text();{let o=/charset="?([^;"\s]*)"?/i.exec(l),u=o&&o[1]?o[1].toLowerCase():void 0,f=new TextDecoder(u);return d.arrayBuffer().then(g=>f.decode(g))}}}).then(d=>{Al.add(e,d);let s=tn[e];delete tn[e];for(let o=0,u=s.length;o<u;o++){let f=s[o];f.onLoad&&f.onLoad(d)}}).catch(d=>{let s=tn[e];if(s===void 0)throw this.manager.itemError(e),d;delete tn[e];for(let o=0,u=s.length;o<u;o++){let f=s[o];f.onError&&f.onError(d)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}};var zi=class extends dt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new we(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}},Wr=class extends zi{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(dt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new we(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},ks=new nt,Tl=new I,wl=new I,Sa=class{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new He(512,512),this.map=null,this.mapPass=null,this.matrix=new nt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ui,this._frameExtents=new He(1,1),this._viewportCount=1,this._viewports=[new ct(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Tl.setFromMatrixPosition(e.matrixWorld),t.position.copy(Tl),wl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(wl),t.updateMatrixWorld(),ks.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ks),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ks)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var ba=class extends Sa{constructor(){super(new Fr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Xr=class extends zi{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(dt.DEFAULT_UP),this.updateMatrix(),this.target=new dt,this.shadow=new ba}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},qr=class extends zi{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var Ia="\\[\\]\\.:\\/",Rm=new RegExp("["+Ia+"]","g"),Da="[^"+Ia+"]",Cm="[^"+Ia.replace("\\.","")+"]",Lm=/((?:WC+[\/:])*)/.source.replace("WC",Da),Pm=/(WCOD+)?/.source.replace("WCOD",Cm),Im=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Da),Dm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Da),Um=new RegExp("^"+Lm+Pm+Im+Dm+"$"),Nm=["material","materials","bones","map"],Ea=class{constructor(e,t,n){let r=n||$e.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,a=n.length;r!==a;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},$e=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Rm,"")}static parseTrackName(e){let t=Um.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let a=n.nodeName.substring(r+1);Nm.indexOf(a)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=a)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(a){for(let c=0;c<a.length;c++){let l=a[c];if(l.name===t||l.uuid===t)return l;let h=n(l.children);if(h)return h}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,a=n.length;r!==a;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,a=n.length;r!==a;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,a=n.length;r!==a;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,a=n.length;r!==a;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,r=t.propertyName,a=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let d=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let s=0;s<e.length;s++)if(e[s].name===d){d=s;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(d!==void 0){if(e[d]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[d]}}let c=e[r];if(c===void 0){let d=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+d+"."+r+" but it wasn't found.",e);return}let l=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?l=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(l=this.Versioning.MatrixWorldNeedsUpdate);let h=this.BindingType.Direct;if(a!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[a]!==void 0&&(a=e.morphTargetDictionary[a])}h=this.BindingType.ArrayElement,this.resolvedProperty=c,this.propertyIndex=a}else c.fromArray!==void 0&&c.toArray!==void 0?(h=this.BindingType.HasFromToArray,this.resolvedProperty=c):Array.isArray(c)?(h=this.BindingType.EntireArray,this.resolvedProperty=c):this.propertyName=r;this.getValue=this.GetterByBindingType[h],this.setValue=this.SetterByBindingTypeAndVersioning[h][l]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};$e.Composite=Ea;$e.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};$e.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};$e.prototype.GetterByBindingType=[$e.prototype._getValue_direct,$e.prototype._getValue_array,$e.prototype._getValue_arrayElement,$e.prototype._getValue_toArray];$e.prototype.SetterByBindingTypeAndVersioning=[[$e.prototype._setValue_direct,$e.prototype._setValue_direct_setNeedsUpdate,$e.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[$e.prototype._setValue_array,$e.prototype._setValue_array_setNeedsUpdate,$e.prototype._setValue_array_setMatrixWorldNeedsUpdate],[$e.prototype._setValue_arrayElement,$e.prototype._setValue_arrayElement_setNeedsUpdate,$e.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[$e.prototype._setValue_fromArray,$e.prototype._setValue_fromArray_setNeedsUpdate,$e.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var eg=new Float32Array(1);typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Aa}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Aa);var Om=/^[og]\s*(.+)?/,Bm=/^mtllib /,zm=/^usemtl /,km=/^usemap /,Zl=/\s+/,$l=new I,Ua=new I,Jl=new I,Kl=new I,Bt=new I,Jr=new we;function Hm(){let i={objects:[],object:{},vertices:[],normals:[],colors:[],uvs:[],materials:{},materialLibraries:[],startObject:function(e,t){if(this.object&&this.object.fromDeclaration===!1){this.object.name=e,this.object.fromDeclaration=t!==!1;return}let n=this.object&&typeof this.object.currentMaterial=="function"?this.object.currentMaterial():void 0;if(this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0),this.object={name:e||"",fromDeclaration:t!==!1,geometry:{vertices:[],normals:[],colors:[],uvs:[],hasUVIndices:!1},materials:[],smooth:!0,startMaterial:function(r,a){let c=this._finalize(!1);c&&(c.inherited||c.groupCount<=0)&&this.materials.splice(c.index,1);let l={index:this.materials.length,name:r||"",mtllib:Array.isArray(a)&&a.length>0?a[a.length-1]:"",smooth:c!==void 0?c.smooth:this.smooth,groupStart:c!==void 0?c.groupEnd:0,groupEnd:-1,groupCount:-1,inherited:!1,clone:function(h){let d={index:typeof h=="number"?h:this.index,name:this.name,mtllib:this.mtllib,smooth:this.smooth,groupStart:0,groupEnd:-1,groupCount:-1,inherited:!1};return d.clone=this.clone.bind(d),d}};return this.materials.push(l),l},currentMaterial:function(){if(this.materials.length>0)return this.materials[this.materials.length-1]},_finalize:function(r){let a=this.currentMaterial();if(a&&a.groupEnd===-1&&(a.groupEnd=this.geometry.vertices.length/3,a.groupCount=a.groupEnd-a.groupStart,a.inherited=!1),r&&this.materials.length>1)for(let c=this.materials.length-1;c>=0;c--)this.materials[c].groupCount<=0&&this.materials.splice(c,1);return r&&this.materials.length===0&&this.materials.push({name:"",smooth:this.smooth}),a}},n&&n.name&&typeof n.clone=="function"){let r=n.clone(0);r.inherited=!0,this.object.materials.push(r)}this.objects.push(this.object)},finalize:function(){this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0)},parseVertexIndex:function(e,t){let n=parseInt(e,10);return(n>=0?n-1:n+t/3)*3},parseNormalIndex:function(e,t){let n=parseInt(e,10);return(n>=0?n-1:n+t/3)*3},parseUVIndex:function(e,t){let n=parseInt(e,10);return(n>=0?n-1:n+t/2)*2},addVertex:function(e,t,n){let r=this.vertices,a=this.object.geometry.vertices;a.push(r[e+0],r[e+1],r[e+2]),a.push(r[t+0],r[t+1],r[t+2]),a.push(r[n+0],r[n+1],r[n+2])},addVertexPoint:function(e){let t=this.vertices;this.object.geometry.vertices.push(t[e+0],t[e+1],t[e+2])},addVertexLine:function(e){let t=this.vertices;this.object.geometry.vertices.push(t[e+0],t[e+1],t[e+2])},addNormal:function(e,t,n){let r=this.normals,a=this.object.geometry.normals;a.push(r[e+0],r[e+1],r[e+2]),a.push(r[t+0],r[t+1],r[t+2]),a.push(r[n+0],r[n+1],r[n+2])},addFaceNormal:function(e,t,n){let r=this.vertices,a=this.object.geometry.normals;$l.fromArray(r,e),Ua.fromArray(r,t),Jl.fromArray(r,n),Bt.subVectors(Jl,Ua),Kl.subVectors($l,Ua),Bt.cross(Kl),Bt.normalize(),a.push(Bt.x,Bt.y,Bt.z),a.push(Bt.x,Bt.y,Bt.z),a.push(Bt.x,Bt.y,Bt.z)},addColor:function(e,t,n){let r=this.colors,a=this.object.geometry.colors;r[e]!==void 0&&a.push(r[e+0],r[e+1],r[e+2]),r[t]!==void 0&&a.push(r[t+0],r[t+1],r[t+2]),r[n]!==void 0&&a.push(r[n+0],r[n+1],r[n+2])},addUV:function(e,t,n){let r=this.uvs,a=this.object.geometry.uvs;a.push(r[e+0],r[e+1]),a.push(r[t+0],r[t+1]),a.push(r[n+0],r[n+1])},addDefaultUV:function(){let e=this.object.geometry.uvs;e.push(0,0),e.push(0,0),e.push(0,0)},addUVLine:function(e){let t=this.uvs;this.object.geometry.uvs.push(t[e+0],t[e+1])},addFace:function(e,t,n,r,a,c,l,h,d){let s=this.vertices.length,o=this.parseVertexIndex(e,s),u=this.parseVertexIndex(t,s),f=this.parseVertexIndex(n,s);if(this.addVertex(o,u,f),this.addColor(o,u,f),l!==void 0&&l!==""){let g=this.normals.length;o=this.parseNormalIndex(l,g),u=this.parseNormalIndex(h,g),f=this.parseNormalIndex(d,g),this.addNormal(o,u,f)}else this.addFaceNormal(o,u,f);if(r!==void 0&&r!==""){let g=this.uvs.length;o=this.parseUVIndex(r,g),u=this.parseUVIndex(a,g),f=this.parseUVIndex(c,g),this.addUV(o,u,f),this.object.geometry.hasUVIndices=!0}else this.addDefaultUV()},addPointGeometry:function(e){this.object.geometry.type="Points";let t=this.vertices.length;for(let n=0,r=e.length;n<r;n++){let a=this.parseVertexIndex(e[n],t);this.addVertexPoint(a),this.addColor(a)}},addLineGeometry:function(e,t){this.object.geometry.type="Line";let n=this.vertices.length,r=this.uvs.length;for(let a=0,c=e.length;a<c;a++)this.addVertexLine(this.parseVertexIndex(e[a],n));for(let a=0,c=t.length;a<c;a++)this.addUVLine(this.parseUVIndex(t[a],r))}};return i.startObject("",!1),i}var Kr=class extends vi{constructor(e){super(e),this.materials=null}load(e,t,n,r){let a=this,c=new Gr(this.manager);c.setPath(this.path),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{t(a.parse(l))}catch(h){r?r(h):console.error(h),a.manager.itemError(e)}},n,r)}setMaterials(e){return this.materials=e,this}parse(e){let t=new Hm;e.indexOf(`\r
`)!==-1&&(e=e.replace(/\r\n/g,`
`)),e.indexOf(`\\
`)!==-1&&(e=e.replace(/\\\n/g,""));let n=e.split(`
`),r=[];for(let l=0,h=n.length;l<h;l++){let d=n[l].trimStart();if(d.length===0)continue;let s=d.charAt(0);if(s!=="#")if(s==="v"){let o=d.split(Zl);switch(o[0]){case"v":t.vertices.push(parseFloat(o[1]),parseFloat(o[2]),parseFloat(o[3])),o.length>=7?(Jr.setRGB(parseFloat(o[4]),parseFloat(o[5]),parseFloat(o[6])).convertSRGBToLinear(),t.colors.push(Jr.r,Jr.g,Jr.b)):t.colors.push(void 0,void 0,void 0);break;case"vn":t.normals.push(parseFloat(o[1]),parseFloat(o[2]),parseFloat(o[3]));break;case"vt":t.uvs.push(parseFloat(o[1]),parseFloat(o[2]));break}}else if(s==="f"){let u=d.slice(1).trim().split(Zl),f=[];for(let _=0,p=u.length;_<p;_++){let m=u[_];if(m.length>0){let y=m.split("/");f.push(y)}}let g=f[0];for(let _=1,p=f.length-1;_<p;_++){let m=f[_],y=f[_+1];t.addFace(g[0],m[0],y[0],g[1],m[1],y[1],g[2],m[2],y[2])}}else if(s==="l"){let o=d.substring(1).trim().split(" "),u=[],f=[];if(d.indexOf("/")===-1)u=o;else for(let g=0,_=o.length;g<_;g++){let p=o[g].split("/");p[0]!==""&&u.push(p[0]),p[1]!==""&&f.push(p[1])}t.addLineGeometry(u,f)}else if(s==="p"){let u=d.slice(1).trim().split(" ");t.addPointGeometry(u)}else if((r=Om.exec(d))!==null){let o=(" "+r[0].slice(1).trim()).slice(1);t.startObject(o)}else if(zm.test(d))t.object.startMaterial(d.substring(7).trim(),t.materialLibraries);else if(Bm.test(d))t.materialLibraries.push(d.substring(7).trim());else if(km.test(d))console.warn('THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.');else if(s==="s"){if(r=d.split(" "),r.length>1){let u=r[1].trim().toLowerCase();t.object.smooth=u!=="0"&&u!=="off"}else t.object.smooth=!0;let o=t.object.currentMaterial();o&&(o.smooth=t.object.smooth)}else{if(d==="\0")continue;console.warn('THREE.OBJLoader: Unexpected line: "'+d+'"')}}t.finalize();let a=new _n;if(a.materialLibraries=[].concat(t.materialLibraries),!(t.objects.length===1&&t.objects[0].geometry.vertices.length===0)===!0)for(let l=0,h=t.objects.length;l<h;l++){let d=t.objects[l],s=d.geometry,o=d.materials,u=s.type==="Line",f=s.type==="Points",g=!1;if(s.vertices.length===0)continue;let _=new It;_.setAttribute("position",new it(s.vertices,3)),s.normals.length>0&&_.setAttribute("normal",new it(s.normals,3)),s.colors.length>0&&(g=!0,_.setAttribute("color",new it(s.colors,3))),s.hasUVIndices===!0&&_.setAttribute("uv",new it(s.uvs,2));let p=[];for(let y=0,v=o.length;y<v;y++){let w=o[y],C=w.name+"_"+w.smooth+"_"+g,T=t.materials[C];if(this.materials!==null){if(T=this.materials.create(w.name),u&&T&&!(T instanceof zn)){let A=new zn;Rt.prototype.copy.call(A,T),A.color.copy(T.color),T=A}else if(f&&T&&!(T instanceof En)){let A=new En({size:10,sizeAttenuation:!1});Rt.prototype.copy.call(A,T),A.color.copy(T.color),A.map=T.map,T=A}}T===void 0&&(u?T=new zn:f?T=new En({size:1,sizeAttenuation:!1}):T=new Vr,T.name=w.name,T.flatShading=!w.smooth,T.vertexColors=g,t.materials[C]=T),p.push(T)}let m;if(p.length>1){for(let y=0,v=o.length;y<v;y++){let w=o[y];_.addGroup(w.groupStart,w.groupCount,y)}u?m=new Oi(_,p):f?m=new gi(_,p):m=new _t(_,p)}else u?m=new Oi(_,p[0]):f?m=new gi(_,p[0]):m=new _t(_,p[0]);m.name=d.name,a.add(m)}else if(t.vertices.length>0){let l=new En({size:1,sizeAttenuation:!1}),h=new It;h.setAttribute("position",new it(t.vertices,3)),t.colors.length>0&&t.colors[0]!==void 0&&(h.setAttribute("color",new it(t.colors,3)),l.vertexColors=!0);let d=new gi(h,l);a.add(d)}return a}};function jl(i,e=1e-4){e=Math.max(e,Number.EPSILON);let t={},n=i.getIndex(),r=i.getAttribute("position"),a=n?n.count:r.count,c=0,l=Object.keys(i.attributes),h={},d={},s=[],o=["getX","getY","getZ","getW"],u=["setX","setY","setZ","setW"];for(let y=0,v=l.length;y<v;y++){let w=l[y],C=i.attributes[w];h[w]=new ht(new C.array.constructor(C.count*C.itemSize),C.itemSize,C.normalized);let T=i.morphAttributes[w];T&&(d[w]=new ht(new T.array.constructor(T.count*T.itemSize),T.itemSize,T.normalized))}let f=e*.5,g=Math.log10(1/e),_=Math.pow(10,g),p=f*_;for(let y=0;y<a;y++){let v=n?n.getX(y):y,w="";for(let C=0,T=l.length;C<T;C++){let A=l[C],D=i.getAttribute(A),S=D.itemSize;for(let E=0;E<S;E++)w+=`${~~(D[o[E]](v)*_+p)},`}if(w in t)s.push(t[w]);else{for(let C=0,T=l.length;C<T;C++){let A=l[C],D=i.getAttribute(A),S=i.morphAttributes[A],E=D.itemSize,k=h[A],q=d[A];for(let ee=0;ee<E;ee++){let L=o[ee],B=u[ee];if(k[B](c,D[L](v)),S)for(let V=0,X=S.length;V<X;V++)q[V][B](c,S[V][L](v))}}t[w]=c,s.push(c),c++}}let m=i.clone();for(let y in i.attributes){let v=h[y];if(m.setAttribute(y,new ht(v.array.slice(0,c*v.itemSize),v.itemSize,v.normalized)),y in d)for(let w=0;w<d[y].length;w++){let C=d[y][w];m.morphAttributes[y][w]=new ht(C.array.slice(0,c*C.itemSize),C.itemSize,C.normalized)}}return m.setIndex(s),m}var Vn,Hi,Gn,cn=null,jr=!1,Na=0;function Ql(){let i=document.querySelector(".header-bg");if(!i)return;Vn=new zr;let e=i.getBoundingClientRect();Hi=new bt(75,e.width/e.height,.1,1e3),Hi.position.set(0,2,5),Gn=new Fi({canvas:i,alpha:!0,antialias:!0}),Gn.setSize(e.width,e.height),Gn.setPixelRatio(window.devicePixelRatio),Gn.shadowMap.enabled=!0,Gn.shadowMap.type=Ta;let t=new qr(16777215,.5);Vn.add(t);let n=new Wr(16777215,4473924,.4);n.position.set(0,20,0),Vn.add(n);let r=new Xr(16777215,1.2);r.position.set(10,20,15),r.castShadow=!0,r.shadow.mapSize.width=2048,r.shadow.mapSize.height=2048,r.shadow.radius=8;let a=r.shadow.camera;a.left=-10,a.right=10,a.top=10,a.bottom=-10,a.near=.5,a.far=50,Vn.add(r);let c=new Ni(10,10),l=new kr({opacity:.5}),h=new _t(c,l);h.rotation.x=-Math.PI/2,h.receiveShadow=!0,Vn.add(h);let d=new Kr;d.setPath("/static/app/docs/"),d.load("estilografica.obj",s=>{cn=s;let o=new Hr({color:8947848,metalness:.3,roughness:.5,side:Vt,transparent:!1,opacity:1,depthWrite:!0,depthTest:!0});cn.traverse(u=>{u instanceof _t&&(u.castShadow=!0,u.receiveShadow=!0,u.material=o,u.geometry&&(u.geometry=jl(u.geometry),u.geometry.computeVertexNormals()))}),cn.position.set(3,0,0),cn.scale.set(.5,.5,.5),Vn.add(cn)}),window.addEventListener("mousedown",Gm),window.addEventListener("mouseup",Wm),window.addEventListener("mousemove",Xm),window.addEventListener("resize",()=>qm(i)),ec()}function Gm(i){jr=!0,Na=i.clientX}function Wm(){jr=!1}function Xm(i){if(jr&&cn){let e=i.clientX-Na;cn.rotation.y+=e*.01,Na=i.clientX}}function qm(i){i.style.width="",i.style.height="";let e=i.getBoundingClientRect();Hi.aspect=e.width/e.height,Hi.updateProjectionMatrix(),Gn.setSize(e.width,e.height)}function ec(){requestAnimationFrame(ec),cn&&!jr&&(cn.rotation.y+=.003),Gn.render(Vn,Hi)}function tc(){let i=document.getElementById("navbar");if(!i)return;let e=i.querySelector(".navbar-hamburger");e&&(e.addEventListener("click",()=>{let t=i.classList.toggle("is-open");e.setAttribute("aria-expanded",String(t))}),document.addEventListener("click",t=>{i.contains(t.target)||(i.classList.remove("is-open"),e.setAttribute("aria-expanded","false"))}),i.querySelectorAll(".navbar-mobile-menu .navbar-btn").forEach(t=>{t.closest(".dropdown-wrapper")||t.addEventListener("click",()=>{i.classList.remove("is-open"),e.setAttribute("aria-expanded","false")})}))}function nc(){document.querySelectorAll('a[href^="#"]').forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();let n=e.getAttribute("href")?.slice(1);if(n){let r=document.getElementById(n);r&&(r.scrollIntoView({behavior:"smooth",block:"start"}),history.pushState(null,"",`#${n}`))}})})}function Ym(){return document.querySelector('meta[name="csrf-token"]')?.content??""}async function ft(i,e){return(await fetch(i,{method:"POST",headers:{"X-CSRFToken":Ym()},body:e})).json()}var Et=null,Fa=null,Qr="",ic=null;function rc(i){if(ic=i,Et=document.getElementById("task-discard-modal"),!Et)return;let e=Et.querySelector("#modal-backdrop"),t=Et.querySelector("#modal-cancel"),n=Et.querySelector("#modal-confirm"),r=Et.querySelector("#modal-reason"),a=Et.querySelector("#modal-error"),c=()=>{Et.setAttribute("hidden",""),Fa=null,Qr="",r&&(r.value=""),a&&a.setAttribute("hidden","")};t?.addEventListener("click",c),e?.addEventListener("click",c),document.addEventListener("keydown",l=>{l.key==="Escape"&&Et&&!Et.hasAttribute("hidden")&&c()}),n?.addEventListener("click",async()=>{if(!Fa||!Qr)return;let l=r?.value.trim()??"";if(!l){a&&(a.textContent="Cal un motiu.",a.removeAttribute("hidden")),r?.focus();return}n.disabled=!0;let h=await ft(Qr,new URLSearchParams({reason:l}));n.disabled=!1,h.ok?(ic?.(h.affected_ids),c()):a&&(a.textContent=h.error??"Error.",a.removeAttribute("hidden"))})}function sc(i,e,t){if(!Et)return;Fa=i,Qr=t;let n=Et.querySelector("#modal-task-title");n&&(n.textContent=e);let r=Et.querySelector("#modal-reason");r&&(r.value="");let a=Et.querySelector("#modal-error");a&&a.setAttribute("hidden",""),Et.removeAttribute("hidden"),r?.focus()}function Oa(){try{return JSON.parse(document.getElementById("task-groups-data")?.textContent??"[]")}catch{return[]}}var Dt=null;function Zm(){let i=new Date;return i.setDate(i.getDate()+1),i.toISOString().slice(0,10)}function oc(){let i=document.getElementById("task-popover"),e=document.getElementById("popover-box"),t=document.getElementById("popover-groups"),n=document.getElementById("popover-discard"),r=document.getElementById("popover-reschedule"),a=document.getElementById("popover-reschedule-form"),c=document.getElementById("popover-reschedule-date"),l=document.getElementById("popover-reschedule-confirm");if(!(!i||!e)){if(t){let h=document.createElement("button");h.type="button",h.className="group-pick-btn group-pick-none js-swatch",h.title="Sense grup",h.textContent="Cap",h.dataset.groupId="",h.addEventListener("click",()=>ac(null)),t.appendChild(h);for(let d of Oa()){let s=document.createElement("button");s.type="button",s.className="group-pick-btn js-swatch",s.style.setProperty("--group-color",d.color),s.title=d.name,s.textContent=d.name,s.dataset.groupId=String(d.id),s.addEventListener("click",()=>ac(d.id)),t.appendChild(s)}}n?.addEventListener("click",()=>{if(Dt===null)return;let h=document.querySelector(`[data-task-id="${Dt}"]`),d=h?.querySelector(".task-title")?.textContent??"",s=h?.getAttribute("data-discard-url")??"";yi(),sc(Dt,d,s)}),r?.addEventListener("click",()=>{if(!a||!c)return;a.hasAttribute("hidden")?(c.value=Zm(),a.removeAttribute("hidden"),c.focus()):a.setAttribute("hidden","")}),l?.addEventListener("click",async()=>{if(Dt===null||!c)return;let h=c.value;if(!h)return;let s=document.querySelector(`[data-task-id="${Dt}"]`)?.getAttribute("data-reschedule-url")??"";if(!s)return;let o=Dt;yi(),(await ft(s,new URLSearchParams({to_date:h}))).ok&&document.querySelector(`[data-task-id="${o}"]`)?.remove()}),document.addEventListener("click",h=>{if(i.hasAttribute("hidden"))return;let d=h.target;!i.contains(d)&&!d.closest?.(".js-edit-trigger")&&yi()})}}function Ba(i,e){let t=document.getElementById("task-popover"),n=document.getElementById("popover-box"),r=document.getElementById("popover-groups");if(!t||!n)return;Dt=i;let a=document.querySelector(`[data-task-id="${i}"]`);if(!a)return;let c=a.dataset.groupId??"";r?.querySelectorAll(".js-swatch").forEach(f=>{f.classList.toggle("active",f.dataset.groupId===c)}),t.removeAttribute("hidden");let l,h;if(e instanceof HTMLElement){let f=e.getBoundingClientRect();l=f.left,h=f.bottom+6}else l=e.x,h=e.y+4;let d=n.offsetWidth||180,s=n.offsetHeight||120,o=l,u=h;o+d>window.innerWidth-8&&(o=window.innerWidth-d-8),u+s>window.innerHeight-8&&(u=h-s-4),n.style.top=`${u+window.scrollY}px`,n.style.left=`${o}px`}function yi(){document.getElementById("task-popover")?.setAttribute("hidden",""),document.getElementById("popover-reschedule-form")?.setAttribute("hidden",""),Dt=null}function $m(i,e){i.dataset.groupId=e!==null?String(e):"";let t=i.querySelector(".task-group-badge");if(e!==null){let n=Oa().find(r=>r.id===e);if(n)if(t)t.style.setProperty("--group-color",n.color),t.textContent=n.name;else{let r=document.createElement("span");r.className="task-group-badge",r.style.setProperty("--group-color",n.color),r.textContent=n.name,i.querySelector(".task-title")?.insertAdjacentElement("beforebegin",r)}}else t?.remove()}async function ac(i){if(Dt===null)return;let e=document.querySelector(`[data-task-id="${Dt}"]`);if(!e||!(await ft(e.getAttribute("data-update-url")??"",new URLSearchParams({group:i!==null?String(i):""}))).ok)return;$m(e,i),document.getElementById("popover-groups")?.querySelectorAll(".js-swatch").forEach(r=>{r.classList.toggle("active",r.dataset.groupId===(i!==null?String(i):""))})}function es(i,e){for(let t of i){let n=document.querySelector(`[data-task-id="${t}"]`);if(!n)continue;n.classList.add("task-done"),n.querySelector(".task-actions")?.remove();let r=e==="completed"?"\u2713":"\u2717",a=e==="completed"?"task-status-completed":"task-status-discarded",c=n.querySelector(".task-title");c?.removeAttribute("contenteditable"),c?.classList.remove("js-editable-title"),c?.insertAdjacentHTML("afterend",`<span class="task-status-badge ${a}">${r}</span>`);let l=n.querySelector(".task-checkbox");l&&(l.checked=!0,l.disabled=!0,l.classList.remove("js-complete-check"))}}function lc(i){i.querySelector(".task-empty-state")?.remove()}function cc(){let i=document.getElementById("task-tree");i&&lc(i)}function uc(i,e,t){if(lc(t),e!==null&&t.dataset.granularity==="day"){let n=Array.from(t.querySelectorAll(`[data-parent-id="${e}"]`)),r=n[n.length-1];if(r){r.insertAdjacentHTML("afterend",i);return}let a=t.querySelector(`[data-task-id="${e}"]`);if(a){a.insertAdjacentHTML("afterend",i);return}}t.insertAdjacentHTML("beforeend",i),t.dataset.granularity==="day"&&ts(t)}function ts(i){let e=0;i.querySelectorAll("[data-task-id]").forEach(t=>{let n=t.querySelector(".task-order-num");n&&(e++,n.textContent=String(e))})}function hc(){document.querySelectorAll(".task-quick-add").forEach(i=>{i.addEventListener("submit",async e=>{e.preventDefault();let t=i.querySelector("input[name='title']");if(!t?.value.trim()){t?.focus();return}let n=new FormData(i),r=i.dataset.granularity??"day";n.set("granularity",r),r==="day"&&n.set("scheduled_date",i.dataset.scheduledDate??"");let a=i.querySelector("[type='submit']");a&&(a.disabled=!0);let c=await ft(i.dataset.createUrl,n);if(a&&(a.disabled=!1),c.ok){let l=i.dataset.treeId??"task-tree",h=document.getElementById(l);h&&uc(c.html,c.parent_id,h),t.value="",t.focus()}})})}function dc(i,e,t){let n=document.createElement("form");return n.className="task-inline-add",n.innerHTML=`
    <input type="text" name="title" class="form-input task-quick-input" placeholder="Subtasca\u2026" autocomplete="off">
    <button type="submit" class="btn-link btn-small" title="Afegir">+</button>
    <button type="button" class="btn-link btn-small btn-secondary js-cancel-inline" title="Cancel\xB7lar">\u2715</button>
  `,n.addEventListener("submit",async r=>{r.preventDefault();let a=n.querySelector("input[name='title']");if(!a?.value.trim()){a?.focus();return}let c=new URLSearchParams({title:a.value.trim(),parent:String(i),scheduled_date:e}),l=await ft(t,c);l.ok&&(n.insertAdjacentHTML("beforebegin",l.html),n.remove(),cc())}),n.querySelector(".js-cancel-inline")?.addEventListener("click",()=>n.remove()),n}function fc(i){if(i.hasAttribute("contenteditable"))return;let e=i.textContent??"";i.setAttribute("contenteditable","true"),i.focus();let t=document.createRange();t.selectNodeContents(i),window.getSelection()?.removeAllRanges(),window.getSelection()?.addRange(t);let n=async()=>{let r=i.textContent?.trim()??"";if(i.removeAttribute("contenteditable"),!r||r===e){i.textContent=e;return}let a=i.closest("[data-task-id]");if(!a)return;(await ft(a.getAttribute("data-update-url")??"",new URLSearchParams({title:r}))).ok||(i.textContent=e)};i.addEventListener("blur",n,{once:!0}),i.addEventListener("keydown",r=>{r.key==="Enter"?(r.preventDefault(),i.blur()):r.key==="Escape"&&(i.textContent=e,i.removeAttribute("contenteditable"))},{once:!0})}function pc(){document.addEventListener("contextmenu",i=>{let e=i.target.closest("[data-task-id]");if(!e||!e.closest(".task-tree")||!e.querySelector(".js-edit-trigger"))return;i.preventDefault();let t=Number(e.dataset.taskId);if(Dt===t){yi();return}Ba(t,{x:i.clientX,y:i.clientY})}),document.addEventListener("click",async i=>{let e=i.target;if(e.closest(".task-tree")){if(e.classList.contains("js-complete-check")){let t=e.closest("[data-task-id]");if(!t)return;let n=t.getAttribute("data-complete-url");if(!n){e.checked=!1;return}e.disabled=!0;let r=await ft(n,new URLSearchParams);r.ok?es(r.affected_ids,"completed"):(e.checked=!1,e.disabled=!1);return}if(e.classList.contains("js-edit-trigger")){let t=Number(e.getAttribute("data-task-id"));if(Dt===t){yi();return}Ba(t,e);return}if(e.classList.contains("js-editable-title")){fc(e);return}if(e.classList.contains("js-add-subtask")){let t=Number(e.getAttribute("data-task-id")),n=e.getAttribute("data-date")??"",r=document.getElementById("task-quick-add")?.dataset.createUrl??"",c=document.getElementById("task-tree")?.querySelector(`[data-task-id="${t}"]`);if(!c)return;let l=c.nextElementSibling;if(l?.classList.contains("task-inline-add")){l.remove();return}let h=dc(t,n,r);c.insertAdjacentElement("afterend",h),h.querySelector("input")?.focus();return}}})}var _c=!1;function mc(i,e){let t=[];function n(r){i.querySelectorAll(`[data-parent-id="${r}"]`).forEach(a=>{t.push(a),n(Number(a.dataset.taskId))})}return n(e),t}function ns(){return Array.from(document.querySelectorAll(".task-tree"))}function gc(){ns().forEach(i=>{i.querySelectorAll(".drop-before, .drop-into, .drop-after").forEach(e=>{e.classList.remove("drop-before","drop-into","drop-after")})})}function vc(){let i=ns();if(i.length){document.addEventListener("mousedown",e=>{_c=!!e.target.closest(".task-drag-handle")});for(let e of i)Jm(e)}}function Jm(i){let e=i.dataset.granularity==="day",t=i.dataset.reorderUrl??"";i.addEventListener("dragstart",n=>{if(!_c){n.preventDefault();return}let r=n.target.closest("[data-task-id]");if(!r){n.preventDefault();return}n.dataTransfer.effectAllowed="move",n.dataTransfer.setData("text/plain",r.dataset.taskId??""),r.classList.add("dragging")}),i.addEventListener("dragend",()=>{ns().forEach(n=>{n.querySelectorAll(".dragging, .drop-before, .drop-into, .drop-after").forEach(r=>{r.classList.remove("dragging","drop-before","drop-into","drop-after")})})}),i.addEventListener("dragover",n=>{n.preventDefault(),n.dataTransfer.dropEffect="move";let r=n.target.closest("[data-task-id]");if(!r)return;gc();let a=r.getBoundingClientRect(),c=(n.clientY-a.top)/a.height;c<.3?r.classList.add("drop-before"):e&&c<.7?r.classList.add("drop-into"):r.classList.add("drop-after")}),i.addEventListener("dragleave",n=>{i.contains(n.relatedTarget)||i.querySelectorAll(".drop-before, .drop-into, .drop-after").forEach(r=>{r.classList.remove("drop-before","drop-into","drop-after")})}),i.addEventListener("drop",async n=>{n.preventDefault();let r=Number(n.dataTransfer.getData("text/plain"));if(!r)return;let a=ns();gc();let c=n.target.closest("[data-task-id]");if(c&&Number(c.dataset.taskId)===r)return;let l=null,h=null;for(let A of a){let D=A.querySelector(`[data-task-id="${r}"]`);if(D){l=D,h=A;break}}if(!l||!h)return;if(h!==i){let A=i.dataset.granularity??"day",D=i.dataset.movePeriodUrl??"";if(!D)return;(await ft(D,new URLSearchParams({task_id:String(r),granularity:A}))).ok&&(l.dataset.granularity=A,A!=="day"&&(l.style.paddingLeft="0",l.dataset.parentId="",l.querySelector(".task-order-num")?.remove()),c?i.insertBefore(l,c.nextSibling):i.appendChild(l),ts(h));return}let d=c?.classList.contains("drop-before"),s=c?.classList.contains("drop-into"),o=s?c.dataset.taskId??"":c?.dataset.parentId??"",u=l.dataset.parentId??"",f=o!==u,g=Math.round((parseFloat(l.style.paddingLeft)||0)/1.5),_=c?Math.round((parseFloat(c.style.paddingLeft)||0)/1.5):0,p=s?_+1:_,m=p-g,y=mc(i,r),v=new Set(y.map(A=>Number(A.dataset.taskId)));if(c&&v.has(Number(c.dataset.taskId)))return;let w=[l,...y],C=document.createDocumentFragment();if(w.forEach(A=>C.appendChild(A)),!c)i.appendChild(C);else if(d)i.insertBefore(C,c);else{let A=mc(i,Number(c.dataset.taskId)),D=A.length?A[A.length-1]:c;i.insertBefore(C,D.nextSibling)}if(f||m!==0){l.dataset.parentId=o,l.style.paddingLeft=`${Math.max(0,p*1.5)}rem`,y.forEach(D=>{let S=parseFloat(D.style.paddingLeft)||0;D.style.paddingLeft=`${Math.max(0,S+m*1.5)}rem`});let A=l.querySelector(".task-order-num");if(!o&&!A){let D=document.createElement("span");D.className="task-order-num",D.textContent="0",l.querySelector(".task-drag-handle")?.insertAdjacentElement("afterend",D)}else o&&A&&A.remove()}ts(i);let T=Array.from(i.querySelectorAll("[data-task-id]")).map((A,D)=>{let S={id:Number(A.dataset.taskId),order:D};return A===l&&f&&(S.parent_id=o?Number(o):null),S});await ft(t,new URLSearchParams({items:JSON.stringify(T)}))})}function xc(){document.addEventListener("click",i=>{let e=i.target.closest(".js-notes-toggle");if(!e)return;let t=e.closest("[data-task-id]");if(!t)return;let n=t.querySelector(".task-notes-area");if(!n)return;if(n.hasAttribute("hidden")){let a=n.querySelector(".task-notes-input");a&&(a.value=t.dataset.notes??""),n.removeAttribute("hidden"),n.querySelector(".task-notes-input")?.focus()}else n.setAttribute("hidden","")}),document.addEventListener("blur",async i=>{let e=i.target;if(!e.classList.contains("task-notes-input"))return;let t=e.closest("[data-task-id]");if(!t)return;let n=t.getAttribute("data-update-url");if(!n)return;let r=e.value;if(r===(t.dataset.notes??""))return;(await ft(n,new URLSearchParams({notes:r}))).ok&&(t.dataset.notes=r)},!0),document.addEventListener("keydown",i=>{if(i.key!=="Escape")return;let e=i.target;if(!e.classList.contains("task-notes-input"))return;let t=e.closest("[data-task-id]");t&&(e.value=t.dataset.notes??"",t.querySelector(".task-notes-area")?.setAttribute("hidden",""),e.blur())})}function yc(){rc(i=>es(i,"discarded")),oc(),hc(),pc(),vc(),xc()}document.addEventListener("DOMContentLoaded",()=>{nc(),tc(),Za(),yc(),document.body.classList.contains("home")&&Ql()});})();
/*! Bundled license information:

howler/dist/howler.js:
  (*!
   *  howler.js v2.2.4
   *  howlerjs.com
   *
   *  (c) 2013-2020, James Simpson of GoldFire Studios
   *  goldfirestudios.com
   *
   *  MIT License
   *)
  (*!
   *  Spatial Plugin - Adds support for stereo and 3D audio where Web Audio is supported.
   *  
   *  howler.js v2.2.4
   *  howlerjs.com
   *
   *  (c) 2013-2020, James Simpson of GoldFire Studios
   *  goldfirestudios.com
   *
   *  MIT License
   *)

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2023 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
//# sourceMappingURL=main.js.map
