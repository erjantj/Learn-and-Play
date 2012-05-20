goog.provide('rb.About');

goog.require('lime.Label');
goog.require('lime.RoundedRect');
goog.require('lime.Scene');
goog.require('lime.Sprite');
goog.require('rb.Button');

/**
 * Help scene
 * @constructor
 * @extends lime.Scene
 */
rb.About = function() {
    lime.Scene.call(this);


    var btn = new rb.Button('Back').setPosition(360, 870).setSize(300, 90);
    goog.events.listen(btn, 'click', function() {rb.loadMenu()});
    this.appendChild(btn);

    var contents = new lime.RoundedRect().setRadius(30).setFill('#fff').setSize(700, 560).setPosition(360, 420);
    this.appendChild(contents);

    var img1 = new lime.Sprite().setFill('assets/developer1.jpg').setPosition(0, 0).setScale(.9);
    contents.appendChild(img1);

    var txt3 = new lime.Label().setFontSize(18).setSize(550, 40).setPosition(0, 220).setAlign('center');
    txt3.setText('Tulegenov Maksat 3D04');
    contents.appendChild(txt3);

    var txt3 = new lime.Label().setFontSize(18).setSize(550, 40).setPosition(0, 240).setAlign('center');
    txt3.setText('Suleyman Demirel University');
    contents.appendChild(txt3);

};
goog.inherits(rb.About, lime.Scene);
