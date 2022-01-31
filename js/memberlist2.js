/********** HEAVY EDITS TO THIS CODE WERE DONE BY ME, ALEXEI, PLEASE DO NOT DIRECTLY COPY/PASTE THIS SCRIPT WITHOUT INCLUDING CREDITS FOR MY EDITS. THERE WERE TRULY COUNTLESS DAYS THAT WENT INTO FRANKENSTEINING ALL THESE DIFFERENT PARTS TOGETHER INTO SOMETHING THAT WORKS, SO PLEASE IF YOU'RE GOING TO COPY/PASTE THIS DIRECTLY, INCLUDE THAT I MADE EDITS TO IT. I'M MORE THAN HAPPY FOR IT TO BE USED! JUST PLEASE CREDIT ME !! ************/






/********** automatic alias additions by LUX ************/

var members = []; //this is the array of names
var membersNS = []; //this is the array of names without spaces
$('.memlcharsur').each(function() {
   var member = $(this).find('.mem-alias span').html().toLowerCase().trim();
   var memberArray = member.split(' ');
   var memberNS = ''; //set an empty variable for now
   if (member != '') { //if the member alias isn't empty, run the loop
       for (var i = 0; i < memberArray.length; i++) { //for each word in the member's alias, add the word to the empty variable so that it's a version without spaces
           memberNS = memberNS + memberArray[i];
       }
       if (jQuery.inArray(member, members) == -1) { //if it's not a duplicate, add the version WITH spaces to the members array for the label text
           members.push(member);
       }
       if (jQuery.inArray(memberNS, membersNS) == -1) { //same as above, but the no space version to the array to be used for data filter calls
           membersNS.push(memberNS);
       }
   }
$(this).addClass(memberNS);

});
const sortedMembers = members.sort();
const sortedMembersNS = membersNS.sort();
//for each member in the array, add them to the html inside the filtergroup with a class of ml-memberlist
for (var i = 0; i < sortedMembers.length; i++) {
   if (sortedMembers[i] != undefined) {
let filter = "." + sortedMembersNS[i];
       $('[data-filter-group=aliases] overflow').append('<button class="button" data-filter=".' + membersNS[i] + '">' + members[i] + '</button>');
   }
}

/****** isotope filtering ******/
// store filter for each group
var buttonFilters = {};
var buttonFilter = '*:not(.group-1, .group-3, .group-4)';

// face claim quick search regex
var fcRegex;

// quick search regex
var qsRegex;

// Store # parameter and add "." before hash
    var hashID = "." + window.location.hash.substring(1);

// init Isotope
if(window.location.hash) { //If we have a hash filter by it, if not don't try
var $grid = $('.memlsur').isotope({
  percentPosition: true,
  itemSelector: '.memlcharsur',
  layoutMode: 'fitRows',
  getSortData: {
    name: '.memlcharname span a',
    faceclaim: '.memlfc span',
    mostposts: '.mem-tp parseInt',
    membergroup: '[data-category]'
  },
  sortAscending: {
    name: true,
    mostposts: false,
    membergroup: true
  },
   filter: function() {
    var $this = $(this);
    var searchResult = qsRegex ? $(this).find('.memlcharname').text().match( qsRegex ) : true;
    var fcResult = fcRegex ? $(this).find('. memlfc').text().match( fcRegex ) : true;
    var buttonResult = buttonFilter ? $this.is( buttonFilter ) : true;
    var hashResult = hashID ? $this.is( hashID ) : true;
    return searchResult && fcResult && buttonResult && hashResult;
  }
  });
 } else {
var $grid = $('.memlsur').isotope({
  percentPosition: true,
  itemSelector: '.memlcharsur',
  layoutMode: 'fitRows',
  getSortData: {
    name: '.memlcharname',
    mostposts: '.mem-tp parseInt',
    leastposts: '.mem-tp parseInt',
    membergroup: '[data-category]'
  },
  sortAscending: {
    name: true,
    mostposts: false,
    leastposts: true,
    membergroup: true
  },
  filter: function() {
    var $this = $(this);
    var searchResult = qsRegex ? $(this).find('.memlcharname').text().match( qsRegex ) : true;
    var fcResult = fcRegex ? $(this).find('.memlfc').text().match( fcRegex ) : true;
    var buttonResult = buttonFilter ? $this.is( buttonFilter ) : true;
    return searchResult && fcResult && buttonResult;
  }
});
}

var iso = $grid.data('isotope');
var $filterCount = $('.filter-count');

// store filter for each group
var filters = {};

// bind filter button click
$('.memlfilters').on( 'click', '.button', function() {
  var $this = $(this);
  // get group key
  var $buttonGroup = $this.parents('.button-group');
  var filterGroup = $buttonGroup.attr('data-filter-group');
  // set filter for group
  buttonFilters[ filterGroup ] = $this.attr('data-filter');
  // combine filters
  buttonFilter = concatValues( buttonFilters );
  // Isotope arrange
  $grid.isotope();
  updateFilterCount();
});

// bind sort button click
$('.memlfilters').on( 'click', 'button', function() {
  var sortByValue = $(this).attr('data-sort-by');
  $grid.isotope({ sortBy: sortByValue });
});

// use value of search field to filter
var $quicksearch = $('.quicksearch').keyup( debounce( function() {
  qsRegex = new RegExp( $quicksearch.val(), 'gi' );
  $grid.isotope();
}) );

// use value of search field to filter
var $fcquicksearch = $('.fcquicksearch').keyup( debounce( function() {
  fcRegex = new RegExp( $fcquicksearch.val(), 'gi' );
  $grid.isotope();
}) );

function updateFilterCount() {
  $filterCount.text( iso.filteredItems.length + ' characters' );
}

updateFilterCount();

// change is-checked class on buttons
$('.button-group').each( function( i, buttonGroup ) {
  var $buttonGroup = $( buttonGroup );
  $buttonGroup.on( 'click', 'button', function() {
    $buttonGroup.find('.is-checked').removeClass('is-checked');
    $( this ).addClass('is-checked');
  });
});

// flatten object by concatting values
function concatValues( obj ) {
  var value = '';
  for ( var prop in obj ) {
    value += obj[ prop ];
  }
  return value;
}

// debounce so filtering doesn't happen every millisecond
function debounce( fn, threshold ) {
  var timeout;
  threshold = threshold || 100;
  return function debounced() {
    clearTimeout( timeout );
    var args = arguments;
    var _this = this;
    function delayed() {
      fn.apply( _this, args );
    }
    timeout = setTimeout( delayed, threshold );
  };
}
