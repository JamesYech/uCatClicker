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
        this.self=this;

   	};

   	buildFrame() {
   		let frameWidth;

   		switch(catNum) {
   			case 1:
   				frameWidth='img__width-100';
   				break;
   			case 2:
   				frameWidth='img__width-50';
   				break;
   			case 3:
   				frameWidth='img__width-33';
   				break;
   			case 4:
   				frameWidth='img__width-25';
   				break
   			case 5:
   				frameWidth='img__width-20';
   				break;
   		}

   		let newFrame = document.createElement('div');
   		newFrame.classList.add('catFrame');
   		newFrame.classList.add(frameWidth);


   		let newName = document.createElement('span');
   		newName.classList.add('catName');
   		newName.classList.add('row');
   		newName.textContent=this.name;
   		newFrame.appendChild(newName);

   		let newImgDiv = document.createElement('div');
   		newImgDiv.classList.add('catImg');
   		newImgDiv.classList.add('row');


     	let newImg = document.createElement('img');
     	newImg.setAttribute('src',this.img);
     	newImg.setAttribute('alt',this.name);
     	newImg.setAttribute('id','cat'+this.index);

     	newImgDiv.appendChild(newImg);
        newFrame.appendChild(newImgDiv);


        let newClicks = document.createElement('div');
        newClicks.classList.add('catClicks');
        newClicks.classList.add('row');
        let newClicksP = document.createElement('p');
        newClicksP.setAttribute('id','catCounts'+this.index);
        newClicks.appendChild(newClicksP);
        newFrame.appendChild(newClicks);

        $('.main').append(newFrame);
   	};

  	addListener(cat) {
  		$('#cat'+cat.index).click(function() {
  			cat.clicks++;
  			$('#catCounts'+cat.index).html('This cat has been clicked '+cat.clicks+' times.');
  		});
  	};

    addDisplayListener(cat) {
      $('#catLink'+cat.index).click(function() {
        //change cat display info (name, img, clicks)
      });
    };

};  // class cat


function createCats(num) {
	allCats=[];
    for(let i=0; i<=num-1; i++) {
        let newCat=new Cat('img/cat'+(i+1)+'.jpg','cat #'+(i+1), i);
        allCats.push(newCat);
        //newCat.buildFrame();
        newCat.addListener(newCat);
    }
}

function buildHTML() {

	//build cat-list container
	let newHTML = document.createElement('div');
	newHTML.classList.add('grid__cat-list');
	$('.main').append(newHTML);

	//build cat list
	newHTML='<ul>';
	for(let i=0; i<=catNum-1; i++) {
		newHTML+='<li id="catLink'+allCats[i].index+'">'+allCats[i].name+'</li>';
	}
	newHTML+='</ul>';
	$('.grid__cat-list').append(newHTML);

	//add listener to cat list entries
	for(i=0; i<=catNum-1; i++) {
		cat.addDisplayListener(allCats[i]);
	}


    //build cat-display container

        //div plus three rows - name, image, clicks
        //child of main or sibling of cat-list?


      let newFrame = document.createElement('div');
      newFrame.classList.add('catFrame');
      newFrame.classList.add(frameWidth);


      let newName = document.createElement('span');
      newName.classList.add('catName');
      newName.classList.add('row');
      newName.textContent=this.name;
      newFrame.appendChild(newName);

      let newImgDiv = document.createElement('div');
      newImgDiv.classList.add('catImg');
      newImgDiv.classList.add('row');


      let newImg = document.createElement('img');
      newImg.setAttribute('src',this.img);
      newImg.setAttribute('alt',this.name);
      newImg.setAttribute('id','cat'+this.index);

      newImgDiv.appendChild(newImg);
        newFrame.appendChild(newImgDiv);


        let newClicks = document.createElement('div');
        newClicks.classList.add('catClicks');
        newClicks.classList.add('row');
        let newClicksP = document.createElement('p');
        newClicksP.setAttribute('id','catCounts'+this.index);
        newClicks.appendChild(newClicksP);
        newFrame.appendChild(newClicks);

        $('.main').append(newFrame);
    };

document.body.onload=createCats(catNum);
