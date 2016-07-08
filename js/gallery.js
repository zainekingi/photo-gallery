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

	// initiate the variables required for the gallery function.
	var galleryBg,
		imgLink, // store the current images href value.
		imgArray = [], // empty image array variable.
		curImg, // store the clicked image.
		topPos, // store the current top position of the browser window.
		lbClose, // store the gallery close element when the gallery is active.
		lbImg,	// store the gallery image || gallery video element.
		newHref, // store the new images href attribute.
		flag = false, // used to determine whether the image gallery is active or not.
		list = document.getElementById('gallery-wrap').children;	// create a list of the images.

	// create array of gallery images - takes 1 argument (a list of children).
	// returns an array object.
	function toArray(arr) {

		// loop through all the images in list incrementing the count.
		for(var i = 0, array = []; i < arr.length; i++)

			// for each image in the list, push into the array object.
			array.push(arr[i]);

		// return the array to the function.
		return array
	} // end of the toArray function.

	// assign the toArray function to the imgArray array - passing in the list variable as the list of objects.
	imgArray = toArray(list);

	// shutDwn function to close the image gallery.
	function shutDwn () {

		// change the css display property of the gallery background to 'none'.
		galleryBg.style.display = 'none';

		// enable body scrolling.
		document.body.style.overflowY = 'visible';

		// remove the element.
		document.body.removeChild(galleryBg);

	} // end of the shutDwn function.



	document.addEventListener('click', function (e){

		// check if the target element was an IMG.
		if (e.target && e.target.nodeName == 'IMG') {

			// prevent default anchor click behaviour.
			e.preventDefault();

			var target = e.target.nodeName || e.srcElement.nodeName; // console.log(target);

			// getCurImg function to get the position of the current image - takes 1 argument (the target element).
			function getCurImg(elem) {

				// initiate a count.
				var i = 0;

				// loop through the elements previous sibling elements until we get the parent.
				while ((elem = elem.previousElementSibling) != null) i++;

				// return the value of the count.
				return i;

			} // end of the getCurImg function.

			// get the parent li of the target img and assign to curImg variable.
			curImg = e.target.parentNode.parentNode;

			// assign the value return from the getCurImg function to the img_num variable, passing in the value of curImg to the function.
			var img_num = getCurImg(curImg); // console.log('target num is ' + img_num);

			// get the number of images from the imgArray variable and assign to the image_length variable.
			var image_length = imgArray.length - 1;


			// function to change the image when clicked ( increasing or decreasing by 1 ) depending on which button is clicked.
			function changeImg(num) {

				// assign the img_num value to itself plus the value passed in from the function argument (+1 || -1).
				img_num = img_num + num;

				// check if the current image is the last image in the gallery.
				if (img_num > image_length) {

					// go back to the start of the gallery.
					img_num = 0;
				}

				// check if the current image is the first image in the gallery.
				if (img_num < 0) {

					// go to the last image in the end of the gallery.
					img_num = image_length;
				}

				// assign the href value of the current images anchor href attribute.
				newHref = imgArray[img_num].children[0].getAttribute('href');

				// assign the value of newHref to the image - referencing the element by name.
				document.slide.src = newHref;

				// end the function.
				return false;

			} // end of the changeImg function.

			// check to see if the gallery has been created, if not create the gallery and set the flag.
			if (flag !== false || target === 'UL') {

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

				// disable vertical scrolling on the body.
				document.body.style.overflowY = 'hidden';

				// set the link to the hiRes image.
				imgLink = e.target.parentNode.href; // set the value of imgLink to the img that triggered the click events parent a tag's href value.
				var title = e.target.title; // instantiate a title variable and assign the title value of the img that triggered the click event.
				var caption = e.target.alt; // instantiate a caption variable and assign the alt value of the img that triggered the click event.

				// create the DOM elements for each needed element.
				var lbTitle = document.createElement('h2'),		// create the image title.
					lbCaption = document.createElement('p'),	// create the image caption.
					prevArrow = document.createElement('span'),	// create the left paddle navigation.
					nextArrow = document.createElement('span');	// create the right addle navigation.
				lbClose = document.createElement('div');	// create the gallery exit button.

				// check if we need a <img> || <iframe> element created.
				if (imgLink.split('.').pop() === 'jpg') {

					// build the image element (img).
					lbImg = document.createElement('img'); // create the img element assigning to the lbImg variable.
					lbImg.setAttribute('src', imgLink); // set the src attribute for the img element and setting the src value to the value of imgLink.
					lbImg.setAttribute('name', 'slide'); // set the name attribute and value for the img element, this is used to update the image information [src, title, description].

				} else {

					// build the video element (iframe).
					lbImg = document.createElement('iframe'); // create the iframe element assigning to the lbImg variable.
					lbImg.setAttribute('src', imgLink); //set the src attribute for the img element and setting the src value to the value of imgLink.
					lbImg.setAttribute('name', 'slide'); //set the name attribute and value for the img element, this is used to update the image information [src, title, description].
					lbImg.setAttribute('frameborder', '0'); // set extra iframe attribute to remove any borders.

				} // end of 'if' statement.

				// assign the values to each newly created element.
				lbTitle.innerHTML = title;
				lbCaption.innerHTML = caption;
				lbClose.innerHTML = '<h1 class="exit">X</h1>';

				// add a click event listener and pass in the changeImg function with 1 argument.
				nextArrow.addEventListener('click', function (e) {
					changeImg(1)
				});
				prevArrow.addEventListener('click', function (e) {
					changeImg(-1)
				});
				prevArrow.className = 'prevArrow';
				nextArrow.className = 'nextArrow';
				lbClose.setAttribute('id', 'close');
				lbClose.addEventListener('click', shutDwn);

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
		}
	});

}
