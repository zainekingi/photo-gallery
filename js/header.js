/* =====================================================
 FILE: header.js
 ----------------------------------------------------
 Author: Zaine Kingi
 Date: 29-07-16
 Version: 1.0a
 Description: JS file for the sticky header functionality.
 -------------------------------------------------------- */

/* --------------------------------------------------------
 Problem:	Header covers images when the user scrolls down
 			to view more images.
 Solution:	Reorder and size the header and elements within
 			the header container when the gallery container
 			has reached the top of the viewport.
 ----------------------------------------------------------*/

function sticky() {
	// set the header element.
	var h = document.getElementById('header');

	// set the header elements to be edited.
	var sbar, tagline;
	sbar = document.getElementById('search');
	tagline = document.getElementById('title').children; //console.log(tagline);

	// add a scroll event listener on the window.
	window.addEventListener('scroll', function() {

		// check the offset Y position of the window is greater 80.
		if (window.pageYOffset > 80) {

			// if true, resize the header and reorder the header elements.
			// edit the css properties of the header and header elements to fit within the resized smaller header:
			h.style.transition = 'all .2s ease-in-out';	// animate the header changes.
			h.style.padding = '10px 0';					// reduce the padding of the header container.
			sbar.style.marginTop = '5px';				// reduce the top margin of the search bar element.
			tagline[0].style.lineHeight = '0';			// reduce the line-height of the H1 element.
			tagline[1].style.display = 'none';			// remove the gallery tagline.

		} else {

			// restore base styling of the header and header elements:
			h.style.padding = '50px 0';				// restore header padding.
			h.style.height = '90px';				// restore the header height.
			sbar.style.margin = 'auto';             // restore the search bar margins.
			tagline[0].style.lineHeight = 'normal';	// set the H1 line-height to normal.
			tagline[1].style.display = 'block';     // show the gallery tagline.

		}
	});
}