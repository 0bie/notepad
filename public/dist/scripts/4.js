(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{PEZB:function(e,t,n){"use strict";n.r(t);var s=n("Rvax");document.getElementById("form_message").addEventListener("click",function(e){if(!e.target.closest("#btn_signup"))return!1;Object(s.d)({evt:e,cta:"#btn_signup",activeClassName:"form-content--active",inactiveClassName:"form-content--removed",parent:document.getElementById("form_fields")}),Array.prototype.slice.call(this.children).forEach(function(e){e.classList.contains("revealed")?(e.classList.remove("revealed"),e.classList.add("removed")):(e.classList.add("revealed"),e.classList.remove("removed"))}),this.classList.add("form-footer--removed")}),document.documentElement.classList.add("remove--menu")},Rvax:function(e,t,n){"use strict";function s(e){var t=document.querySelector(e);if(!t)throw new Error("No user id!");return t.dataset.id}function a(e){var t=e.target.closest("li");return t||console.error("No item element found!"),t}function o(e){var t=e.evt,n=e.parentClassName,s=e.activeClassName,a=document.querySelectorAll("[data-filter]");console.log("Filter: ",a),Array.prototype.slice.call(a).forEach(function(e){var a=e.closest(n);console.log("parent: ",a);var o=a.contains(t.target);console.log("init: ",o),o&&!a.classList.contains(s)&&a.classList.add(s),o||a.classList.remove(s)})}function r(e){var t=e.evt,n=e.parent,s=e.primaryClassName,a=e.disabledClassName;Array.prototype.slice.call(n.children).forEach(function(e){t.target.closest("button")&&(e.classList.contains(s)&&(e.classList.remove(s),e.classList.add(a)),e!==t.target.closest("button")&&(e.classList.remove(a),e.classList.add(s)))})}function c(e){return"true"===e.toLowerCase()}function i(e,t){var n=document.getElementById(e);document.getElementById(t).innerHTML=n.childElementCount-1,n.childElementCount-1==0&&(n.innerHTML="There's no published content yet.")}function l(e){var t=e.evt,n=e.parent,s=e.cta,a=e.activeClassName,o=e.inactiveClassName;Array.prototype.slice.call(n.children).forEach(function(e){t.target.closest(s)&&(e.classList.contains(a)?(e.classList.remove(a),e.classList.add(o)):(e.classList.add(a),e.classList.remove(o)))})}function d(e){var t=e.message,n=e.state,s=e.duration,a=document.getElementById("notice-block"),o=document.createElement("div"),r=document.createElement("div");return o.classList.add("notice-container"),r.classList.add("notice","notice--".concat(n)),r.innerHTML=t,o.appendChild(r),a.appendChild(o),setTimeout(function(){var e=document.querySelector(".notice-container");if(!e)return null;e.classList.add("notice-container--hidden"),e.addEventListener("transitionend",function(t){"visibility"===t.propertyName&&e.remove()})},s)}n.d(t,"b",function(){return s}),n.d(t,"a",function(){return a}),n.d(t,"f",function(){return o}),n.d(t,"g",function(){return r}),n.d(t,"e",function(){return c}),n.d(t,"h",function(){return i}),n.d(t,"d",function(){return l}),n.d(t,"c",function(){return d})}}]);