//revision 3
'use strict';
var allCats=[];
var catNum=7;  //up to ten
//this var is set to $('#catCounts').  This is what solved clicks being
//counted more than once when fired in quick succession.  Not sure why
//but it worked.
var catCountsEl;


class Cat {
	constructor(img, name, index) {
		this.img=img;
		this.name=name;
		this.index=index;
		this.clicks=0;
	};

	addListListener(cat) {
		$('#catLink'+cat.index).click(function() {
			$('#catPic').attr({	src: cat.img,alt: cat.name	});
			$('.catName').html(cat.name);
			$('#catCounts').html('This cat has been clicked '+cat.clicks+' times.');

			for(let i=0; i<=catNum-1; i++) {
				$('#catLink'+i).toggleClass('grid__cat-list--active',false);
			}
			$('#catLink'+cat.index).addClass('grid__cat-list--active');

			$('#catPic').off();
			cat.addDisplayListener(cat);
		});
	};

	addDisplayListener(cat) {
		$('#catPic').click(function() {
			cat.clicks+=1;
			catCountsEl.html('This cat has been clicked '+cat.clicks+' times.');
		});
	};

};  // end class cat


function createCats(num) {
	allCats=[];
	for(let i=0; i<=num-1; i++) {
		let newCat=new Cat('img/cat'+(i+1)+'.jpg','cat #'+(i+1), i);
		allCats.push(newCat);
	}
}

//This builds out the framework for the cat list and the cat image
//also adds the listeners to the cat list.
function buildHTML(cat) {
	//build cat-list
	let newDiv=createEl('div',['grid__cat-list']);
	$('.main').append(newDiv);

	newDiv=createEl('div',['row']);
	newDiv.setAttribute('id','cat-ul');
	$('.grid__cat-list').append(newDiv);

	let newHTML='<ul>';
	for(let i=0; i<=catNum-1; i++) {
		newHTML+='<li id="catLink'+allCats[i].index+'">'+allCats[i].name+'</li>';
	}
	newHTML+='</ul>';
	$('#cat-ul').append(newHTML);

	//add listener to cat list entries
	for(let i=0; i<=(catNum-1); i++) {
		cat.addListListener(allCats[i]);
	};

	//build cat-display container
	let newFrame=createEl('div',['grid__cat-display']);
	let newName=createEl('div',['catName','row']);
	newName.textContent=cat.name;
	newFrame.appendChild(newName);

	let newImgDiv=createEl('div',['catImg','row']);

	let newImg = document.createElement('img');
	newImg.setAttribute('src',cat.img);
	newImg.setAttribute('alt',cat.name);
	newImg.setAttribute('id','catPic');

	newImgDiv.appendChild(newImg);
	newFrame.appendChild(newImgDiv);

	let newClicks=createEl('div',['catClicks','row']);
	let newClicksP = document.createElement('p');
	newClicksP.setAttribute('id','catCounts');
	newClicks.appendChild(newClicksP);
	newFrame.appendChild(newClicks);

	$('.main').append(newFrame);
	catCountsEl=$('#catCounts');    //needed to do this to eliminate multiple clicks
	$('#catLink0').trigger('click');

	//creates elements and adds classes - cleans up the build code above
	function createEl(elType, classes=[]) {
		let el=document.createElement(elType);
		for(let i=0; i<classes.length; i++) {
			el.classList.add(classes[i]);
		}
		return(el);
	}
};

document.body.onload=createCats(catNum);
//when done - call buildHTML with default cat 0
setTimeout(buildHTML(allCats[0]), 100);