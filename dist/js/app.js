//revision 4 (mvo version)

$(function() {

	//global variables go here
	var allCats=[];
	var adminActive=false;
	var currentCat;
	var catNum=10;  //max ten

	//octopus - find another term  ;)
	var octo =  {
		init: function() {
			cats.init();
			menuView.init();
			imgView.init();
			adminView.init();
		},

		getCats: function() {
			return(allCats);
		},

		clickHandler: function(cat) {
			cats.updateClicks(cat);
			return(cat.clicks);
		},

	    toggleAdminActive: function() {
	    	adminActive=!adminActive;
	    },

	    setCurrentCat: function(cat) {
	    	cats.setCurrent(cat);

	    },

	    saveNewInfo: function(newName,newImg,newClicks){
	    	cats.saveCurrent(octo.getCurrentCat(),newName,newImg,newClicks);
	    	adminView.renderInfo(octo.getCurrentCat());
	    },

	    getCurrentCat: function() {
	    	return(currentCat);
	    }
	};

	//model
	var cats =  {
		init: function() {
			allCats=[];
			for(let i=0; i<=catNum-1; i++) {
				allCats.push({
					img: 	'img/cat'+(i+1)+'.jpg',
					name: 	'cat #'+(i+1),
					ndx:    i,
					clicks: 0
				});
			}
			cats.setCurrent(allCats[0]);
		},

		setCurrent: function(cat) {
			currentCat=cat;
		},

		saveCurrent: function(cat,newName,newImg,newClicks) {
			cat.img=newImg;
			cat.name=newName;
			cat.clicks=parseInt(newClicks);
		},

		updateClicks: function(cat) {
			cat.clicks+=1;
		}
	};

	//View 1 - list of cat names
	var menuView =  {
		init: function() {
	        this.render();
	    },

	    render: function() {
            // Cache for use in forEach() callback (performance)
            let $nameList = $('.menu>ul'),
            	$catTemplate = $('script[data-template="cat-list"]').html();

            octo.getCats().forEach(function(cat) {
                let thisTemplate = $catTemplate.replace(/{{id}}/g, cat.ndx)
                							  .replace(/{{name}}/g, cat.name);
                $nameList.append(thisTemplate);
                //attach listener to each entry
                menuView.addListClick(cat);
            });
        },

	    addListClick: function(cat) {
	    	//cached for performance
	    	let $selectedCat=$('#'+cat.ndx);

	    	$selectedCat.on('click', function(e){
	       		$('#'+currentCat.ndx).toggleClass('menu__content--active',false);
	    		$selectedCat.addClass('menu__content--active');
	    		octo.setCurrentCat(cat);
	    		imgView.render(cat);
	    		adminView.renderInfo(cat);
	    	});
	    }
	};

	var imgView = {
		init: function() {
			//cache var for later use
			this.catImgEl=$('#catPic');
			this.catNameEl=$('.display__name');
			this.catClicksEl=$('.display__clicks');
			//default activation of first cat in list
			$('#0').trigger('click');
		},

		render: function(cat) {
			this.catImgEl.off();
			this.catImgEl.attr({src: cat.img, alt: cat.name});
			this.catNameEl.html(cat.name);
			this.catClicksEl.html('This cat has been clicked '+cat.clicks+' times.');
			imgView.addDisplayClick(cat);
		},

		addDisplayClick: function(cat) {
				this.catImgEl.click(function() {
				let clicks=octo.clickHandler(cat);
				$('.display__clicks').html('This cat has been clicked '+clicks+' times.');
				adminView.renderInfo(cat);
			});
		}
	};

	var adminView = {
		init: function() {
			this.btnAdmin = $('#btnAdmin');
			this.actionDiv = $('.action');
			this.btnCancel = $('#btnCancel');
			this.btnSave = $('#btnSave');
			adminView.setListeners();
		},

		setListeners: function() {
			this.btnAdmin.on('click', function(e){
	    		adminView.toggleAdmin();
	    	});

	    	this.btnCancel.on('click', function(e){
	    		adminView.cancel(octo.getCurrentCat());
	    	});

	    	this.btnSave.on('click', function(e){
	    		adminView.save(octo.getCurrentCat());
	    	});
		},

		toggleAdmin: function() {
			octo.toggleAdminActive();
			this.btnAdmin.text( (adminActive) ? 'Close' : 'Open' );
			this.actionDiv.toggleClass('hidden', !adminActive);
		},

		cancel: function(cat) {
			adminView.renderInfo(cat);
		},

		save: function(cat) {
			//should do some validation but not at this time
			let newName=$('#cname').val();
			let newImg=$('#cimg').val();
			let newClicks=$('#ccounts').val();
			octo.saveNewInfo(newName,newImg,newClicks);
		},

		renderInfo: function(cat) {
			$('#cname').val(cat.name);
			$('#cimg').val(cat.img);
			$('#ccounts').val(cat.clicks);
		},

		renderClicks: function(cat) {
			$('#ccounts').val(cat.clicks);
		}

	};

	//Initialize page
	octo.init();
});