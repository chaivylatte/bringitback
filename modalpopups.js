/***************
MULTIPLE MODAL POP-UPS SCRIPT BY ESSI
https://sourced.jcink.net/
****************/

function modal(n) {
 $("#modalback"+n).addClass('fadein');
 $(".modalclosebg").click(function() {
     $("#modalback"+n).removeClass('fadein');
});
 $(".modalclose").click(function() {
     $("#modalback"+n).removeClass('fadein');
});
//<![CDATA[
$('.modalinn:contains([/)').each(function() {
   $(this).html($(this).html().replace(/\[b\](.+?)\[\/b\]/ig, '<strong>$1</strong>').replace(/\[u\](.+?)\[\/u\]/ig, '<span style="text-decoration: underline">$1</span>').replace(/\[i\](.+?)\[\/i\]/ig, '<em>$1</em>').replace(/\[color=(.+?)\](.+?)\[\/color\]/ig, '<span style="color: $1">$2</span>'));
});
$('.modalinn:contains([/)').each(function() {
   $(this).html($(this).html().replace(/\n/g, '<br />').replace(/\[code\](.+?)\[\/code\]/ig, '<table id="CODE-WRAP"><tr><td></td></tr><tr><td id="CODE"><style type="text/plain" style="display: block; white-space: pre-wrap">$1</style></td></tr></table>').replace(/<br\s*[\/]?>/gi, '\r\n'));
});
//]]>
$.getScript("https://dl.dropbox.com/s/m4qyuc52nmqwi3d/codehighlight.js", function() {
});
};