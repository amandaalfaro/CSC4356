//Initialize variables
var canvas;
var gl;

var positionBuffer;
var triangleBuffer;

var vertexPositionLocation;
var vertexColorLocation;

var modelMatrixLocation;
var viewMatrixLocation;
var projectionMatrixLocation;

var program;

var modelRotationX = 0;
var modelRotationY = 0;
var dragging = false;

var lastClientX;
var lastClientY;

var dirX;
var dirY;

function flatten(a) {
   return a.reduce(function (b, v) { b.push.apply(b, v); return b }, [])
}

function onmousedown(event){
   dragging    = true;
   lastClientX = event.clientX;
   lastClient  = event.clientY;
}
function onmouseup(event){
   dragging = false;
}

function onmousemove(event){
	if (dragging){
		  dirX = event.clientX - lastClientX;
		  dirY = event.clientY - lastClientY;

		  modelRotationY = modelRotationY + dirX;
		  modelRotationX = modelRotationX + dirY;

		  if (modelRotationX > 90.0)
			  modelRotationX = 90.0;
		  if (modelRotationX <- 90.0)
			  modelRotationX =- 90.0;

		  requestAnimationFrame(draw);
  	}

   lastClientX=event.clientX;
   lastClientY=event.clientY;
}

function init(){

    canvas = document.getElementById('webgl');
    gl = getWebGLContext(canvas, false);

    canvas.onmousemove = onmousemove;
    canvas.onmousedown = onmousedown;
    canvas.onmouseup = onmouseup;

	var vertexSource   = document.getElementById('vertexShader').text;
	var fragmentSource = document.getElementById('fragmentShader').text;

	program = createProgram(gl, vertexSource, fragmentSource);
	gl.useProgram(program);

	vertexPositionLocation = gl.getAttribLocation(program, 'vertexPosition');
	vertexColorLocation    = gl.getAttribLocation(program, 'vertexColor');

	gl.enableVertexAttribArray(vertexPositionLocation);
	gl.enableVertexAttribArray(vertexColorLocation);

	projectionMatrixLocation = gl.getUniformLocation(program, 'projectionMatrix');
	viewMatrixLocation       = gl.getUniformLocation(program, 'viewMatrix');
	modelMatrixLocation      = gl.getUniformLocation(program, 'modelMatrix');

	positionArray = new Float32Array(flatten(cube.positions));
	colorArray    = new Float32Array(flatten(cube.colors));
	triangleArray = new Uint16Array(flatten(cube.triangles));

	positionBuffer = gl.createBuffer();
	colorBuffer    = gl.createBuffer();
	triangleBuffer = gl.createBuffer();

	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, positionArray, gl.STATIC_DRAW);

	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, colorArray, gl.STATIC_DRAW);


	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, triangleArray, gl.STATIC_DRAW);

	gl.enable(gl.DEPTH_TEST);

	requestAnimationFrame(draw);
}

function draw() {

  var modelMatrix      = new Matrix4();
  var viewMatrix       = new Matrix4();
  var projectionMatrix = new Matrix4();

  projectionMatrix.perspective(45, 1, 1, 10);
  viewMatrix.translate(0, 0, -5);

  modelMatrix.rotate(modelRotationX, 1, 0, 0);
  modelMatrix.rotate(modelRotationY, 0, 1, 0);

  gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix.elements);
  gl.uniformMatrix4fv(viewMatrixLocation, false, viewMatrix.elements);
  gl.uniformMatrix4fv(modelMatrixLocation, false, modelMatrix.elements);

  // draw triangles
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.vertexAttribPointer(vertexPositionLocation, 3, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.vertexAttribPointer(vertexColorLocation, 3, gl.FLOAT, false, 0, 0);

  gl.clearColor(0.98, 0.3, 0.54, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleBuffer);
  gl.drawElements(gl.TRIANGLES, triangleArray.length, gl.UNSIGNED_SHORT, 0);

}














