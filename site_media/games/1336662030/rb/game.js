goog.provide('rb.Game');

rb.Game = function(size) {
    lime.Scene.call(this);

    //empty layer for contents
    var layer = new lime.Layer();
    this.appendChild(layer);
    
    var line = new lime.Sprite().setSize(1000, 2).setFill('#295081').setPosition(720 * .5, 148);
    layer.appendChild(line);
    line = new lime.Sprite().setSize(1000, 2).setFill('#295081').setPosition(720 * .5, 885);
    layer.appendChild(line);
    line = new lime.Sprite().setSize(2, 735).setFill('#295081').setPosition(720 * .5, 515);
    layer.appendChild(line);
    
    var clickItem = new rb.Button('Click pictures to hear there sound').setSize(440, 40).setPosition(360, 170);
    layer.appendChild(clickItem);
    
        var cowSound = new Audio("assets/cow.wav");
    	var cow = new lime.Sprite().setFill('assets/cow.jpg').setPosition(100,280).setSize(80,120);
	cow.qualityRenderer = true;
	layer.appendChild(cow);

        cowText = new lime.Sprite().setSize(120, 30).setFill('#295081').setPosition(100, 360);
        layer.appendChild(cowText);
        
        goog.events.listen(cow,['mousedown','touchstart'],function(e){
	    cowSound.play();
	});

        var bearSound = new Audio("assets/bear.wav");
    	var bear = new lime.Sprite().setFill('assets/bear.jpg').setPosition(280,280).setSize(80,120);
	bear.qualityRenderer = true;
	layer.appendChild(bear);

        bearText = new lime.Sprite().setSize(120, 30).setFill('#295081').setPosition(280, 360);
        layer.appendChild(bearText);
        
        goog.events.listen(bear,['mousedown','touchstart'],function(e){
	    bearSound.play();
	});
        
        var dogSound = new Audio("assets/dog.wav");
    	var dog = new lime.Sprite().setFill('assets/dog.jpg').setPosition(100,440).setSize(80,120);
	dog.qualityRenderer = true;
	layer.appendChild(dog);

        dogText = new lime.Sprite().setSize(120, 30).setFill('#295081').setPosition(100, 520);
        layer.appendChild(dogText);
        
        goog.events.listen(dog,['mousedown','touchstart'],function(e){
	    dogSound.play();
	});

        var monkeySound = new Audio("assets/monkey.wav");
    	var monkey = new lime.Sprite().setFill('assets/monkey.jpg').setPosition(280,440).setSize(80,120);
	monkey.qualityRenderer = true;
	layer.appendChild(monkey);

        monkeyText = new lime.Sprite().setSize(120, 30).setFill('#295081').setPosition(280, 520);
        layer.appendChild(monkeyText);
        
        goog.events.listen(monkey,['mousedown','touchstart'],function(e){
	    monkeySound.play();
	});
        
        var horseSound = new Audio("assets/horse.wav");
    	var horse = new lime.Sprite().setFill('assets/horse.jpg').setPosition(100,600).setSize(80,120);
	horse.qualityRenderer = true;
	layer.appendChild(horse);

        horseText = new lime.Sprite().setSize(120, 30).setFill('#295081').setPosition(100, 680);
        layer.appendChild(horseText);
        
        goog.events.listen(horse,['mousedown','touchstart'],function(e){
	    horseSound.play();
	});
        
        var sheepSound = new Audio("assets/sheep.wav");
    	var sheep = new lime.Sprite().setFill('assets/sheep.jpg').setPosition(280,600).setSize(80,120);
	sheep.qualityRenderer = true;
	layer.appendChild(sheep);

        sheepText = new lime.Sprite().setSize(120, 30).setFill('#295081').setPosition(280, 680);
        layer.appendChild(sheepText);
        
        goog.events.listen(sheep,['mousedown','touchstart'],function(e){
	    sheepSound.play();
	});
        
        var catSound = new Audio("assets/cat.wav");
    	var cat = new lime.Sprite().setFill('assets/cat.jpg').setPosition(100,760).setSize(80,120);
	cat.qualityRenderer = true;
	layer.appendChild(cat);

        catText = new lime.Sprite().setSize(120, 30).setFill('#295081').setPosition(100, 840);
        layer.appendChild(catText);
        
        goog.events.listen(cat,['mousedown','touchstart'],function(e){
	    catSound.play();
	});
        
        var chickenSound = new Audio("assets/chicken.wav");
    	var chicken = new lime.Sprite().setFill('assets/chicken.jpg').setPosition(280,760).setSize(80,120);
	chicken.qualityRenderer = true;
	layer.appendChild(chicken);

        chickenText = new lime.Sprite().setSize(120, 30).setFill('#295081').setPosition(280, 840);
        layer.appendChild(chickenText);
        
        goog.events.listen(chicken,['mousedown','touchstart'],function(e){
	    chickenSound.play();
	});
        
        lbl = new lime.Label().setSize(120,40).setFontSize(20).setText('CAT').setPosition(500,250),
        title = new lime.Label().setSize(800,70).setFontSize(60).setText('Now move me to the text under the picture!')
            .setOpacity(0).setPosition(512,80).setFontColor('#999').setFill(200,100,0,.1);
        
        layer.appendChild(lbl);
        this.appendChild(title);
        
        goog.events.listen(lbl,['mousedown','touchstart'],function(e){

        //animate
        lbl.runAction(new lime.animation.Spawn(
            new lime.animation.FadeTo(.5).setDuration(.2),
            new lime.animation.ScaleTo(1.5).setDuration(.8)
        ));

        title.runAction(new lime.animation.FadeTo(1));

        //let target follow the mouse/finger
        e.startDrag();

        //listen for end event
        var lastPosition = lbl.getPosition();
        e.swallow(['mouseup','touchend'],function(){
            var pos = lbl.getPosition();
            if (Math.abs(pos.x - 100) <= 20 && Math.abs(pos.y - 840) <= 20) {
                lbl.runAction(new lime.animation.Spawn(
                new lime.animation.FadeTo(1),
                new lime.animation.ScaleTo(1),
                new lime.animation.MoveTo(100,850)
            ));       
            } else {
            lbl.runAction(new lime.animation.Spawn(
                new lime.animation.FadeTo(1),
                new lime.animation.ScaleTo(1),
                new lime.animation.MoveTo(lastPosition)
            ));
            }
            title.runAction(new lime.animation.FadeTo(0));
        });


    });
        
    // Dog
        lblDog = new lime.Label().setSize(120,40).setFontSize(20).setText('DOG').setPosition(500,300),
        layer.appendChild(lblDog);
        
        goog.events.listen(lblDog,['mousedown','touchstart'],function(e){

        //animate
        lblDog.runAction(new lime.animation.Spawn(
            new lime.animation.FadeTo(.5).setDuration(.2),
            new lime.animation.ScaleTo(1.5).setDuration(.8)
        ));

        title.runAction(new lime.animation.FadeTo(1));

        //let target follow the mouse/finger
        e.startDrag();

        //listen for end event
        var lastPosition = lblDog.getPosition();
        e.swallow(['mouseup','touchend'],function(){
            var pos = lblDog.getPosition();
            if (Math.abs(pos.x - 100) <= 20 && Math.abs(pos.y - 520) <= 20) {
                lblDog.runAction(new lime.animation.Spawn(
                new lime.animation.FadeTo(1),
                new lime.animation.ScaleTo(1),
                new lime.animation.MoveTo(100,530)
            ));       
            } else {
            lblDog.runAction(new lime.animation.Spawn(
                new lime.animation.FadeTo(1),
                new lime.animation.ScaleTo(1),
                new lime.animation.MoveTo(lastPosition)
            ));
            }
            title.runAction(new lime.animation.FadeTo(0));
        });


    });
        
        // Cow
        lblCow = new lime.Label().setSize(120,40).setFontSize(20).setText('COW').setPosition(500,350),
        layer.appendChild(lblCow);
        
        goog.events.listen(lblCow,['mousedown','touchstart'],function(e){

        //animate
        lblCow.runAction(new lime.animation.Spawn(
            new lime.animation.FadeTo(.5).setDuration(.2),
            new lime.animation.ScaleTo(1.5).setDuration(.8)
        ));

        title.runAction(new lime.animation.FadeTo(1));

        //let target follow the mouse/finger
        e.startDrag();

        //listen for end event
        var lastPosition = lblCow.getPosition();
        e.swallow(['mouseup','touchend'],function(){
            var pos = lblCow.getPosition();
            if (Math.abs(pos.x - 100) <= 20 && Math.abs(pos.y - 360) <= 20) {
                lblCow.runAction(new lime.animation.Spawn(
                new lime.animation.FadeTo(1),
                new lime.animation.ScaleTo(1),
                new lime.animation.MoveTo(100,370)
            ));       
            } else {
            lblCow.runAction(new lime.animation.Spawn(
                new lime.animation.FadeTo(1),
                new lime.animation.ScaleTo(1),
                new lime.animation.MoveTo(lastPosition)
            ));
            }
            title.runAction(new lime.animation.FadeTo(0));
        });


    });    

    // Horse
        lblHorse = new lime.Label().setSize(120,40).setFontSize(20).setText('HORSE').setPosition(500,400),
        layer.appendChild(lblHorse);
        
        goog.events.listen(lblHorse,['mousedown','touchstart'],function(e){

        //animate
        lblHorse.runAction(new lime.animation.Spawn(
            new lime.animation.FadeTo(.5).setDuration(.2),
            new lime.animation.ScaleTo(1.5).setDuration(.8)
        ));

        title.runAction(new lime.animation.FadeTo(1));

        //let target follow the mouse/finger
        e.startDrag();

        //listen for end event
        var lastPosition = lblHorse.getPosition();
        e.swallow(['mouseup','touchend'],function(){
            var pos = lblHorse.getPosition();
            if (Math.abs(pos.x - 100) <= 20 && Math.abs(pos.y - 680) <= 20) {
                lblHorse.runAction(new lime.animation.Spawn(
                new lime.animation.FadeTo(1),
                new lime.animation.ScaleTo(1),
                new lime.animation.MoveTo(100,690)
            ));       
            } else {
            lblHorse.runAction(new lime.animation.Spawn(
                new lime.animation.FadeTo(1),
                new lime.animation.ScaleTo(1),
                new lime.animation.MoveTo(lastPosition)
            ));
            }
            title.runAction(new lime.animation.FadeTo(0));
        });


    });
        
    // Bear
        lblBear = new lime.Label().setSize(120,40).setFontSize(20).setText('BEAR').setPosition(500,450),
        layer.appendChild(lblBear);
        
        goog.events.listen(lblBear,['mousedown','touchstart'],function(e){

        //animate
        lblBear.runAction(new lime.animation.Spawn(
            new lime.animation.FadeTo(.5).setDuration(.2),
            new lime.animation.ScaleTo(1.5).setDuration(.8)
        ));

        title.runAction(new lime.animation.FadeTo(1));

        //let target follow the mouse/finger
        e.startDrag();

        //listen for end event
        var lastPosition = lblBear.getPosition();
        e.swallow(['mouseup','touchend'],function(){
            var pos = lblBear.getPosition();
            if (Math.abs(pos.x - 280) <= 20 && Math.abs(pos.y - 360) <= 20) {
                lblBear.runAction(new lime.animation.Spawn(
                new lime.animation.FadeTo(1),
                new lime.animation.ScaleTo(1),
                new lime.animation.MoveTo(280,370)
            ));       
            } else {
            lblBear.runAction(new lime.animation.Spawn(
                new lime.animation.FadeTo(1),
                new lime.animation.ScaleTo(1),
                new lime.animation.MoveTo(lastPosition)
            ));
            }
            title.runAction(new lime.animation.FadeTo(0));
        });


    });
        
        
    // Monkey
        lblMonkey = new lime.Label().setSize(120,40).setFontSize(20).setText('MONKEY').setPosition(500,500),
        layer.appendChild(lblMonkey);
        
        goog.events.listen(lblMonkey,['mousedown','touchstart'],function(e){

        //animate
        lblMonkey.runAction(new lime.animation.Spawn(
            new lime.animation.FadeTo(.5).setDuration(.2),
            new lime.animation.ScaleTo(1.5).setDuration(.8)
        ));

        title.runAction(new lime.animation.FadeTo(1));

        //let target follow the mouse/finger
        e.startDrag();

        //listen for end event
        var lastPosition = lblMonkey.getPosition();
        e.swallow(['mouseup','touchend'],function(){
            var pos = lblMonkey.getPosition();
            if (Math.abs(pos.x - 280) <= 20 && Math.abs(pos.y - 520) <= 20) {
                lblMonkey.runAction(new lime.animation.Spawn(
                new lime.animation.FadeTo(1),
                new lime.animation.ScaleTo(1),
                new lime.animation.MoveTo(280,530)
            ));       
            } else {
            lblMonkey.runAction(new lime.animation.Spawn(
                new lime.animation.FadeTo(1),
                new lime.animation.ScaleTo(1),
                new lime.animation.MoveTo(lastPosition)
            ));
            }
            title.runAction(new lime.animation.FadeTo(0));
        });


    });
        
    // Sheep
        lblSheep = new lime.Label().setSize(120,40).setFontSize(20).setText('SHEEP').setPosition(500,550),
        layer.appendChild(lblSheep);
        
        goog.events.listen(lblSheep,['mousedown','touchstart'],function(e){

        //animate
        lblSheep.runAction(new lime.animation.Spawn(
            new lime.animation.FadeTo(.5).setDuration(.2),
            new lime.animation.ScaleTo(1.5).setDuration(.8)
        ));

        title.runAction(new lime.animation.FadeTo(1));

        //let target follow the mouse/finger
        e.startDrag();

        //listen for end event
        var lastPosition = lblSheep.getPosition();
        e.swallow(['mouseup','touchend'],function(){
            var pos = lblSheep.getPosition();
            if (Math.abs(pos.x - 280) <= 20 && Math.abs(pos.y - 680) <= 20) {
                lblSheep.runAction(new lime.animation.Spawn(
                new lime.animation.FadeTo(1),
                new lime.animation.ScaleTo(1),
                new lime.animation.MoveTo(280,690)
            ));       
            } else {
            lblSheep.runAction(new lime.animation.Spawn(
                new lime.animation.FadeTo(1),
                new lime.animation.ScaleTo(1),
                new lime.animation.MoveTo(lastPosition)
            ));
            }
            title.runAction(new lime.animation.FadeTo(0));
        });


    });

    // Chicken
        lblChicken = new lime.Label().setSize(120,40).setFontSize(20).setText('CHICKEN').setPosition(500,600),
        layer.appendChild(lblChicken);
        
        goog.events.listen(lblChicken,['mousedown','touchstart'],function(e){

        //animate
        lblChicken.runAction(new lime.animation.Spawn(
            new lime.animation.FadeTo(.5).setDuration(.2),
            new lime.animation.ScaleTo(1.5).setDuration(.8)
        ));

        title.runAction(new lime.animation.FadeTo(1));

        //let target follow the mouse/finger
        e.startDrag();

        //listen for end event
        var lastPosition = lblChicken.getPosition();
        e.swallow(['mouseup','touchend'],function(){
            var pos = lblChicken.getPosition();
            if (Math.abs(pos.x - 280) <= 20 && Math.abs(pos.y - 840) <= 20) {
                lblChicken.runAction(new lime.animation.Spawn(
                new lime.animation.FadeTo(1),
                new lime.animation.ScaleTo(1),
                new lime.animation.MoveTo(280,850)
            ));       
            } else {
            lblChicken.runAction(new lime.animation.Spawn(
                new lime.animation.FadeTo(1),
                new lime.animation.ScaleTo(1),
                new lime.animation.MoveTo(lastPosition)
            ));
            }
            title.runAction(new lime.animation.FadeTo(0));
        });


    });            
        


        
    // Menu button
    this.btn_menu = new rb.Button('Menu').setSize(140, 70).setPosition(100, 945);
    goog.events.listen(this.btn_menu, 'click', function() {
        rb.loadMenu();
    });
    this.appendChild(this.btn_menu);


     rb.builtWithLime(this);
};
goog.inherits(rb.Game, lime.Scene);

