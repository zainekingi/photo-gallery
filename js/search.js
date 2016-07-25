/* =====================================================
 FILE: search.js
 ----------------------------------------------------
 Author: Zaine Kingi
 Date: 9-07-16
 Version: 1.0a
 Description: JS file to provide search functionality for the search field.
 -------------------------------------------------------- */

/* --------------------------------------------------------
 Problem:	Filter the page content depending on the text the user inputs into
 			the search field. The search will filter on title and alt text.
 Solution:	Real time filtering with jquery which will check the users input on key up and down events
 			and filter the results.
 ----------------------------------------------------------*/

function search() {
	// set the elements that will be searched.
	var li = $('.gallery-img');
	var img = $('#gallery-wrap img');
	var imgArr = [];
	for(var i = 0; i < img.length; i ++) imgArr.push(img[i]);
	// console.log(imgArr);

	// function to get the search field input element value on key-up presses.
	$('#search').keyup(function (){
		// assign the value to val converting the value to lowercase.
		var value = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase(); //console.log(val);

		// function to filter through the imgArr and show matches to 'val'.
		li.show().filter(function (){
			// assign the image element titles to text and convert to lowercase.
			var text = $(this).children().attr('title').replace(/\s+/g, ' ').toLowerCase();

			// return text.
			return !~text.indexOf(value);
		}).hide();

	});

}


