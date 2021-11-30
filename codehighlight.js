// CODE AREA SCRIPT BY NICOLE/THUNDERSTRUCK OF CTTW @ JCINK
// thank you to stackoverflow for the selectText function

$('table#CODE-WRAP').addClass('nicole-code');
$('table#CODE-WRAP').attr('cellpadding', '0');
$('table#CODE-WRAP #CODE').wrapInner('<div class="code-scroll"></div>');
$('table.nicole-code #CODE').parent('tr').prev('tr').children('td').html('<div class="code-top"><div class="code-title">Code <span class="code-toggle">• toggle height</span></div> <div class="code-highlight">click here to highlight code</div></div>');

$('table.nicole-code .code-scroll').each(function() {
if ($(this).height() < 250) {
    $(this).closest('tr').prev('tr').children('td').children('.code-top').children('.code-title').children('.code-toggle').hide();
} else {}
});

$('table.nicole-code .code-toggle').click( function () {
    if ($(this).closest('tr').next('tr').children('td').children('.code-scroll').hasClass('auto-code')) {
        $(this).closest('tr').next('tr').children('td').children('.code-scroll').removeClass('auto-code');
    } else {
        $(this).closest('tr').next('tr').children('td').children('.code-scroll').addClass('auto-code');
    }
});

jQuery.fn.selectText = function(){
var doc = document
    , element = this[0]
    , range, selection
;
if (doc.body.createTextRange) {
    range = document.body.createTextRange();
    range.moveToElementText(element);
    range.select();
} else if (window.getSelection) {
    selection = window.getSelection();        
    range = document.createRange();
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);
}
};

$(function() {
$('table.nicole-code .code-highlight').click(function() {
    $(this).closest('tr').next('tr').children('td').children('.code-scroll').selectText();
});
});

// END CODE AREA SCRIPT