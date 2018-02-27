//revision 3
'use strict';
var allCats=[];
var catNum=4;  //up to ten



class Cat {
	constructor(img, name, index) {
		this.img=img;
		this.name=name;
		this.index=index;
		this.clicks=0;
		//this.self=this;

	};

	// buildFrame() {
	// 	let frameWidth;

	// 	switch(catNum) {
	// 		case 1:
	// 			frameWidth='img__width-100';
	// 			break;
	// 		case 2:
	// 			frameWidth='img__width-50';
	// 			break;
	// 		case 3:
	// 			frameWidth='img__width-33';
	// 			break;
	// 		case 4:
	// 			frameWidth='img__width-25';
	// 			break
	// 		case 5:
	// 			frameWidth='img__width-20';
	// 			break;
	// 	}

	// 	let newFrame = document.createElement('div');
	// 	newFrame.classList.add('catFrame');
	// 	newFrame.classList.add(frameWidth);


	// 	let newName = document.createElement('span');
	// 	newName.classList.add('catName');
	// 	newName.classList.add('row');
	// 	newName.textContent=this.name;
	// 	newFrame.appendChild(newName);

	// 	let newImgDiv = document.createElement('div');
	// 	newImgDiv.classList.add('catImg');
	// 	newImgDiv.classList.add('row');


	// 	let newImg = document.createElement('img');
	// 	newImg.setAttribute('src',this.img);
	// 	newImg.setAttribute('alt',this.name);
	// 	newImg.setAttribute('id','cat'+this.index);

	// 	newImgDiv.appendChild(newImg);
	// 	newFrame.appendChild(newImgDiv);


	// 	let newClicks = document.createElement('div');
	// 	newClicks.classList.add('catClicks');
	// 	newClicks.classList.add('row');
	// 	let newClicksP = document.createElement('p');
	// 	newClicksP.setAttribute('id','catCounts'+this.index);
	// 	newClicks.appendChild(newClicksP);
	// 	newFrame.appendChild(newClicks);

	// 	$('.main').append(newFrame);
	// };

	addDisplayListener(cat) {
		//change id to catPic - should work
		$('#catPic').click(function() {
			cat.clicks++;
			$('#catCounts').html('This cat has been clicked '+cat.clicks+' times.');
		});
	};

	addListListener() {
		console.log('fired');
	  $('#catLink'+this.index).click(function() {

	  	$('#catPic').attr({	src: this.img,alt: this.name	});

	  	$('.catName').html(this.name);

	  	$('#catCounts').html('This cat has been clicked '+this.clicks+' times.');

	  	for(let i=0; i<=catNum-1; i++) {
	  		$('#catLink'+i).toggleClass('grid__cat-list--active',false);
	  	}

	  	$('#catLink'+this.index).addClass('grid__cat-list--active');



	  });
	};

	setDisplay(cat) {
		//move most of lstlistenre to here
	};

};  // class cat


function createCats(num) {
	allCats=[];
	for(let i=0; i<=num-1; i++) {
		let newCat=new Cat('img/cat'+(i+1)+'.jpg','cat #'+(i+1), i);
		allCats.push(newCat);
		//newCat.buildFrame();
		//newCat.addListener(newCat);
	}

}

function buildHTML(cat) {

	//build cat-list container
	let newDiv = document.createElement('div');
	newDiv.classList.add('grid__cat-list');
	$('.main').append(newDiv);

	//build cat list

	newDiv=document.createElement('div');

	newDiv.classList.add('row');
	newDiv.setAttribute('id','cat-ul');


	$('.grid__cat-list').append(newDiv);

	let newHTML='<ul>';
	for(let i=0; i<=catNum-1; i++) {
		newHTML+='<li id="catLink'+allCats[i].index+'">'+allCats[i].name+'</li>';
	}
	newHTML+='</ul>';
	$('#cat-ul').append(newHTML);


	//add listener to cat list entries
	// for(let i=0; i<=(catNum-1); i++) {
	// 	cat.addListListener(allCats[i]);

	//[TODO] move to initialize function
	allCats.forEach(function(cat) {
		cat.addListListener();
	});

	$('#catLink0').addClass('grid__cat-list--active');

	//build cat-display container


	  let newFrame = document.createElement('div');
	  newFrame.classList.add('grid__cat-display');



	  let newName = document.createElement('div');
	  newName.classList.add('catName');
	  newName.classList.add('row');
	  newName.textContent=cat.name;
	  newFrame.appendChild(newName);

	  let newImgDiv = document.createElement('div');
	  newImgDiv.classList.add('catImg');
	  newImgDiv.classList.add('row');


	  let newImg = document.createElement('img');
	  newImg.setAttribute('src',cat.img);
	  newImg.setAttribute('alt',cat.name);
	  newImg.setAttribute('id','catPic');

	  newImgDiv.appendChild(newImg);
		newFrame.appendChild(newImgDiv);


		let newClicks = document.createElement('div');
		newClicks.classList.add('catClicks');
		newClicks.classList.add('row');
		let newClicksP = document.createElement('p');
		newClicksP.setAttribute('id','catCounts');
		newClicks.appendChild(newClicksP);
		newFrame.appendChild(newClicks);

		$('.main').append(newFrame);
		$('#catCounts').html('This cat has been clicked '+cat.clicks+' times.');
	};

document.body.onload=createCats(catNum);
//when done - call buildHTML with default cat 0
setTimeout(buildHTML(allCats[0]), 100);
