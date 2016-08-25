var gl;

function init(){
	var canvas = document.getElementById('webgl');


	 gl = getWebGLContext(canvas, false);
	 requestAnimationFrame(draw);

}

function draw(){

	var r = document.getElementById('rSlider').value;
	var g = document.getElementById('gSlider').value;
	var b = document.getElementById('bSlider').value;

	console.log(r, g, b);

	gl.clearColor(r, g, b, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);


}

function slider(){
	requestAnimationFrame(draw);


}