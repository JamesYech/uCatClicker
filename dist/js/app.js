//revision 4 (mvo version)

$(function() {

	//global variables go here
	var allCats=[];
	var catNum=7;  //max ten
	var lastID;  //used when highlighting click cat name



	//octopus - find another term  ;)
	var octo =  {
		init: function() {
			cats.init();
			view1.init();
			view2.init();
		},

		getCats: function() {
			return(allCats);
		},

		clickHandler: function(cat) {
			cats.updateClicks(cat);
			return( cat.clicks);
		},

		updateLastID: function(ndx) {
	    	lastID=ndx;
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
		},

		updateClicks: function(cat) {
			cat.clicks+=1;
		}
	};

	//View 1 - list of cat names
	var view1 =  {
		init: function() {
	        this.render();
	    },

	    render: function() {
            // Cache for use in forEach() callback (performance)
            let $nameList = $('.menu'),
            	$catTemplate = $('script[data-template="cat-list"]').html();

            octo.getCats().forEach(function(cat) {
                let thisTemplate = $catTemplate.replace(/{{id}}/g, cat.ndx)
                							  .replace(/{{name}}/g, cat.name);
                $nameList.append(thisTemplate);
                //attach listener to each entry
                view1.addListClick(cat);
            });
        },

	    addListClick: function(cat) {
	    	//cached for performance
	    	let $selectedCat=$('#'+cat.ndx);

	    	$selectedCat.on('click', function(e){
	    		$('#'+lastID).toggleClass('menu__content--active',false);
	    		$selectedCat.addClass('menu__content--active');
	    		octo.updateLastID(cat.ndx);
	    		view2.render(cat);
	    	});
	    }
	};

	var view2 = {
		init: function() {

			let cat=allCats[0];  //so src attrib can be set

			$('.display__name').textContent=cat.name;

			let newImg = document.createElement('img');
			newImg.setAttribute('src',cat.img);
			newImg.setAttribute('alt',cat.name);
			newImg.setAttribute('id','catPic');
			$('.display__img').append(newImg);

			//default activation of first cat in list
			$('#'+cat.ndx).trigger('click');
		},

		render: function(cat) {
			$('#catPic').off();
			$('#catPic').attr({	src: cat.img, alt: cat.name	});
			$('.display__name').html(cat.name);
			$('.display__clicks').html('This cat has been clicked '+cat.clicks+' times.');

			view2.addDisplayClick(cat);
		},

		addDisplayClick: function(cat) {
				$('#catPic').click(function() {
				let clicks=octo.clickHandler(cat);
				$('.display__clicks').html('This cat has been clicked '+clicks+' times.');
			});
		}
	};

	//Initialize page
	octo.init();

});