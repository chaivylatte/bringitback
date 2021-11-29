/*** AUTO-CLAIMS THREAD CODE BY ESSI
//sourced.jcink.net
***/

$(document).ready(function(){

var fhold =$("#faceclaims overflow");

//input group numbers you don't want counted with a space between numbers here. if there are no numbers you want excluded, don't place anything here.

var ex = '1 2 3 4 5 6';
var exArray = ex.split(' ');
exArray = exArray.map(i => '.group-' + i);

$.get("/index.php?act=Members&max_results=1000", function(data) {

$('.mem-info',data).not(exArray.join(',')).each(function(){
 fhold.append($(this));


});

 var items = fhold.children('.mem-info').get();

 items.sort(function(a, b) {
  return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
});

 fhold.append(items);

});
});
