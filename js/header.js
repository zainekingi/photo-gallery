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

	// get the current header height.
	var hycoords = h.offsetHeight; //189

	// set the gallery container element.
	var g = document.getElementById('gallery-wrap');

	// get the current Y position of the gallery container.
	var gycoords = g.offsetTop; // 180

	// get the browser viewport height.
	var viewporth = document.documentElement.clientHeight; //console.log(viewporth);

	var sbar, tagline;
	sbar = document.getElementById('search');
	tagline = document.getElementById('title').children; //console.log(tagline);

	// if the Y position of the gallery container is at 0:
	window.addEventListener('scroll', function() {

		if (window.pageYOffset > 80) {

			// edit the css properties of the header element:
			// height set to 50px and reduce opacity and padding.
			h.style.transition = 'all .2s ease-in-out';
			h.style.padding = '10px 0';
			//h.style.height = '50px';
			sbar.style.marginTop = '5px';
			tagline[0].style.lineHeight = '0';

			// gallery tagline removed.
			tagline[1].style.display = 'none';
			tagline[1].style.height = '0';

		} else {

			// edit the css properties of the header element:
			// height set to 50px and reduce opacity and padding.
			h.style.transition = 'all .2s ease-in-out';
			h.style.padding = '50px 0';
			h.style.height = '90px';
			sbar.style.margin = 'auto';
			tagline[0].style.lineHeight = 'normal';

			// gallery tagline removed.
			tagline[1].style.display = 'block';

		}
	});
}