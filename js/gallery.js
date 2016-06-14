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
		curImg,
		topPos,
		parent,
		firstImg,
		lastImg,
		nextSib,
		newA,
		newHref,
		newTitle,
		newAlt,
		prevSib,
		lbClose,
		newImg,
		lbImg,	// gallery image || gallery video.
		flag = false;

	// get the element that receives that triggers a click.
	document.addEventListener("click", function(e){

		// prevent default anchor click behaviour.
		var imgLink;
		e.preventDefault() && e.stopPropagation();

		// gallery already set, close it down.
		function shutDwn () {
			galleryBg.style.display = 'none';	// change the css display property of the gallery background to 'none'.
			document.body.style.overflowY = 'visible'; // enable body scrolling.
			document.body.removeChild(galleryBg);
		}

		// check to see if the gallery has been created, if not create the gallery and set the flag.
		if (flag !== false) {

			// gallery is already triggered, add the shutDwn function to the close button.
			lbClose.addEventListener('click', shutDwn);

		} else {

			// create a black back drop when a click is triggered.
			galleryBg = document.createElement('div');
			galleryBg.className = 'gallery-bg';

			// calculate the page top location by getting the users Y-offset position.
			topPos = window.pageYOffset;

			// assign galleryBg top positioning values.
			galleryBg.style.top = topPos + 'px';


			// append the gallery background to the body.
			document.body.appendChild(galleryBg);

			// disable scroll on the body.
			document.body.style.overflowY = 'hidden';

			// set the link to the hiRes image.
			imgLink = e.target.parentNode.href;
			var title = e.target.title;
			var caption = e.target.alt;

			// create the DOM elements for each needed element.
			var lbTitle = document.createElement('h2'),		// image title.
				lbCaption = document.createElement('p'),	// image caption.
				prevArrow = document.createElement('span'),	// left paddle navigation.
				nextArrow = document.createElement('span');	// right addle navigation.
			lbClose = document.createElement('div');	// gallery exit button.

			// check if we need a <img> || <video> element created.
			if (imgLink.split('.').pop() === 'jpg') {
				// build the image.
				lbImg = document.createElement('img');
				lbImg.setAttribute('src', imgLink);
			} else {
				// build the video.
				lbImg = document.createElement('iframe');
				lbImg.setAttribute('src', imgLink);
				lbImg.setAttribute('frameborder', '0');
				// lbImg.setAttributeNode('allowfullscreen');
			}

			// assign the values to each newly created element.
			lbTitle.innerHTML = title;
			lbCaption.innerHTML = caption;
			lbClose.innerHTML = '<h1 class="exit">X</h1>';

			// function to scroll to the next image.
			function nextImg() {

				// get the target elements parent [ img < a < *div ].
				parent = e.target.parentNode.parentNode;

				// the first sibling - if the nextSib === null.
				firstImg = document.getElementById('gallery-wrap').firstElementChild;

				// the last image.
				lastImg = document.getElementById('gallery-wrap').lastElementChild;

				// check if the last image was click.
				if (parent == lastImg) {
					// get the first image as the next sibling.
					nextSib = firstImg;
					// console.log(nextSib);
				} else {
					nextSib = parent.nextElementSibling;
					// console.log(nextSib);
				}

				// get the next anchor element.
				newA = nextSib.children[0];

				// get the href attribute [ *div ~ div > a(href) ]
				newHref = newA.getAttribute('href');

				// get the next images title and alt attributes [ div > a > img(title & alt) ]
				newTitle = newA.children[0].getAttribute('title');
				newAlt = newA.children[0].getAttribute('alt');

				// console.log(nextAlt);

				// construct the next image attributes.
				newImg = {
					imgLink: newHref,
					title: newTitle,
					caption: newAlt
				};


				// get the number of images in the gallery.
				var count = document.getElementById('gallery-wrap').children.length;

				console.log(count);

				lbImg.setAttribute('src', newImg.imgLink);
				lbTitle.innerHTML = newImg.title;
				lbCaption.innerHTML = newImg.caption;
			}

			// function to scroll to the previous image.
			function prevImg() {

				// get the target elements parent [ img < a < *div ].
				parent = e.target.parentNode.parentNode;

				// the first sibling - if the nextSib === null.
				firstImg = document.getElementById('gallery-wrap').firstElementChild;

				// the last image.
				lastImg = document.getElementById('gallery-wrap').lastElementChild;

				// check if the first image was click.
				if (parent == firstImg) {
					// get the last image as the next sibling.
					prevSib = firstImg;
					// console.log(prevSib);
				} else {
					prevSib = parent.previousElementSibling;
					// console.log(prevSib);
				}

				// get the previous anchor element.
				newA = prevSib.children[0];

				// get the href attribute [ *div ~ div > a(href) ]
				newHref = newA.getAttribute('href');

				// get the next images title and alt attributes [ div > a > img(title & alt) ]
				newTitle = newA.children[0].getAttribute('title');
				newAlt = newA.children[0].getAttribute('alt');

				// console.log(newAlt);

				// construct the next image attributes.
				newImg = {
					imgLink: newHref,
					title: newTitle,
					caption: newAlt
				};


				// get the number of images in the gallery.
				//var count = document.getElementById('gallery-wrap').children.length;
				// console.log(count);

				lbImg.setAttribute('src', newImg.imgLink);
				lbTitle.innerHTML = newImg.title;
				lbCaption.innerHTML = newImg.caption;
			}

			// add the onclick function nextImg to the next arrow.
			nextArrow.addEventListener('click', nextImg);
			prevArrow.addEventListener('click', prevImg);
			prevArrow.className = 'prevArrow';
			nextArrow.className = 'nextArrow';
			lbClose.setAttribute('id', 'close');

			// append to the gallery background element in order of display.
			galleryBg.appendChild(lbClose);
			galleryBg.appendChild(lbImg);
			galleryBg.appendChild(lbTitle);
			galleryBg.appendChild(lbCaption);
			galleryBg.appendChild(prevArrow);
			galleryBg.appendChild(nextArrow);

			// set the flag to true and return to the function.
			return flag = true;
		}

	});

}