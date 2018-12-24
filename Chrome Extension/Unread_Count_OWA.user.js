// ==UserScript==
// @name          Display Unread Count in Tab for OWA
// @namespace     www.jaredpavan.com
// @description   This will check for unread messages and put the unread count in the Outlook Web App tinycon.
// @include       */owa/*
// ==/UserScript==

//Read in tinycon.min.js
/*!
 * Tinycon - A small library for manipulating the Favicon
 * Tom Moor, http://tommoor.com
 * Copyright (c) 2012 Tom Moor
 * MIT Licensed
 * @version 0.6.1
 */
!function(){var a={},b=null,c=null,d=null,e=null,f={},g=Math.ceil(window.devicePixelRatio)||1,h=16*g,i={width:7,height:9,font:10*g+"px arial",color:"#ffffff",background:"#F03D25",fallback:!0,crossOrigin:!0,abbreviate:!0},j=function(){var a=navigator.userAgent.toLowerCase();return function(b){return a.indexOf(b)!==-1}}(),k={ie:j("trident"),chrome:j("chrome"),webkit:j("chrome")||j("safari"),safari:j("safari")&&!j("chrome"),mozilla:j("mozilla")&&!j("chrome")&&!j("safari")},l=function(){for(var a=document.getElementsByTagName("link"),b=0,c=a.length;b<c;b++)if((a[b].getAttribute("rel")||"").match(/\bicon\b/i))return a[b];return!1},m=function(){for(var a=document.getElementsByTagName("link"),b=0,c=a.length;b<c;b++){void 0!==a[b]&&(a[b].getAttribute("rel")||"").match(/\bicon\b/i)&&a[b].parentNode.removeChild(a[b])}},n=function(){if(!c||!b){var a=l();b=a?a.getAttribute("href"):"/favicon.ico",c||(c=b)}return b},o=function(){return e||(e=document.createElement("canvas"),e.width=h,e.height=h),e},p=function(a){if(a){m();var b=document.createElement("link");b.type="image/x-icon",b.rel="icon",b.href=a,document.getElementsByTagName("head")[0].appendChild(b)}},q=function(a,b){if(!o().getContext||k.ie||k.safari||"force"===f.fallback)return r(a);var c=o().getContext("2d"),b=b||"#000000",e=n();d=document.createElement("img"),d.onload=function(){c.clearRect(0,0,h,h),c.drawImage(d,0,0,d.width,d.height,0,0,h,h),(a+"").length>0&&s(c,a,b),t()},!e.match(/^data/)&&f.crossOrigin&&(d.crossOrigin="anonymous"),d.src=e},r=function(a){if(f.fallback){var b=document.title;"("===b[0]&&(b=b.slice(b.indexOf(" "))),(a+"").length>0?document.title="("+a+") "+b:document.title=b}},s=function(a,b,c){"number"==typeof b&&b>99&&f.abbreviate&&(b=u(b));var d=(b+"").length-1,e=f.width*g+6*g*d,i=f.height*g,j=h-i,l=h-e-g,m=16*g,n=16*g,o=2*g;a.font=(k.webkit?"bold ":"")+f.font,a.fillStyle=f.background,a.strokeStyle=f.background,a.lineWidth=g,a.beginPath(),a.moveTo(l+o,j),a.quadraticCurveTo(l,j,l,j+o),a.lineTo(l,m-o),a.quadraticCurveTo(l,m,l+o,m),a.lineTo(n-o,m),a.quadraticCurveTo(n,m,n,m-o),a.lineTo(n,j+o),a.quadraticCurveTo(n,j,n-o,j),a.closePath(),a.fill(),a.beginPath(),a.strokeStyle="rgba(0,0,0,0.3)",a.moveTo(l+o/2,m),a.lineTo(n-o/2,m),a.stroke(),a.fillStyle=f.color,a.textAlign="right",a.textBaseline="top",a.fillText(b,2===g?29:15,k.mozilla?7*g:6*g)},t=function(){o().getContext&&p(o().toDataURL())},u=function(a){for(var b=[["G",1e9],["M",1e6],["k",1e3]],c=0;c<b.length;++c)if(a>=b[c][1]){a=v(a/b[c][1])+b[c][0];break}return a},v=function(a,b){return new Number(a).toFixed(b)};a.setOptions=function(a){f={},a.colour&&(a.color=a.colour);for(var b in i)f[b]=a.hasOwnProperty(b)?a[b]:i[b];return this},a.setImage=function(a){return b=a,t(),this},a.setBubble=function(a,b){return a=a||"",q(a,b),this},a.reset=function(){b=c,p(c)},a.setOptions(i),"function"==typeof define&&define.amd?define(a):"undefined"!=typeof module?module.exports=a:window.Tinycon=a}();

//Set Tinycon preferences
Tinycon.setOptions({
	fallback: false
});

function update_unread() {
	//This madness climbs up the DOM to find the value for the # of unread messages. If there are no unread messages then we will receive an error, catch it, and note set unread messages to 0
	try
	{
		var CurrVal = parseInt(document.getElementById('MailFolderPane.FavoritesFolders').getElementsByClassName('nowrap')[0].childNodes[1].childNodes[3].childNodes[1].innerHTML, 10);
	}
	catch(err)
	{
		var CurrVal = 0;
	}

	if (CurrVal) {
		if (CurrVal <=99) {
			Tinycon.setBubble(CurrVal);
		}
		if (CurrVal > 99) {
			Tinycon.setBubble("99+");
		}
	}
	if (CurrVal == 0 && MasterTitle.substring(0,8) != 'Untitled') {
		Tinycon.setBubble(0);
	}
}

var MasterTitle = document.title;
window.setInterval(update_unread, 2000);
