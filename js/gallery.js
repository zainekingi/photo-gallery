/* =====================================================
	FILE: gallery.js
	----------------------------------------------------
	Author: Zaine Kingi
	Date: 9-06-16
	Version: 1.0a
	Description: JS file for the photo gallery functionality.
-------------------------------------------------------- */

/* --------------------------------------------------------

 Problem:	Display a large Hi-Res image when a user clicks
 			on any thumbnail images.

 Solution:	Create a lightbox function to add a black back
 			drop and style, resize and display the link hi-res
 			image, title and alt attributes of each image.

----------------------------------------------------------*/

// create a gallery function.
function gallery() {

	var galleryBg,
		flag = false;

	// get the element that receives that triggers a click.
	document.addEventListener("click", function(e){

		// prevent default anchor click behaviour.
		e.preventDefault()

		// check to see if the gallery has been created, if not create the gallery and set the flag.
		if ( flag === false ) {

			// create a black back drop when a click is triggered.
			galleryBg = document.createElement('div');
			galleryBg.className = 'gallery-bg';

			// assign galleryBg top positioning values.
			galleryBg.style.bottom = '0%';

			// append the gallery background to the body.
			document.body.appendChild(galleryBg);

			// disable scroll on the body.
			document.body.style.overflowY = 'hidden';

			// set the link to the hiRes image.
			var imgLink = e.target.parentNode.href,

			// set the title text for the image.
				title = e.target.title,

			// set the caption text for the image.
				caption = e.target.alt;

			// create the DOM elements for each needed element.
			var lbImg = document.createElement('img'),		// gallery image.
				lbTitle = document.createElement('h2'),		// image title.
				lbCaption = document.createElement('p'),	// image caption.
				lbClose = document.createElement('span');   // gallery exit button.

			// assign the values to each newly created element.
			lbImg.setAttribute('src', imgLink);
			lbTitle.innerHTML = title;
			lbCaption.innerHTML = caption;
			lbClose.innerHTML = '<h1 class="exit">X</h1>';

			// append to the gallery background element in order of display.
			galleryBg.appendChild(lbClose);
			galleryBg.appendChild(lbImg);
			galleryBg.appendChild(lbTitle);
			galleryBg.appendChild(lbCaption);

			// set the flag to true and return to the function.
			return flag = true;
		} else {
		// gallery already set, close it down.
			galleryBg.style.display = 'none';	// change the css display property of the gallery background to 'none'.
			document.body.style.overflowY = 'visible'; // enable body scrolling.
		}
	});

}
