var canvas	//initializing the canvas
var gl      //initializing gl


function flatten(a)	{
	return a.reduce(function (b,v) { b.push.apply(b, v); return b }, [])
}

function init()	{
	canvas = document.getElementById('webgl');
	gl = getWebGLContext(canvas, false);
	
	/*Initialize the program objects*/
	var vertexSource = document.getElementById('vertexShader').text;
	var fragmentSource = document.getElementById('fragmentShader').text;
	program = createProgram(gl, vertexSource, fragmentSource);
	gl.useProgram(program);

	var positions = [
		//0
		[   0.0 ,  0.8,  0.0  ], 

		//1
	    [  -0.45,  0.0,  0.0  ], 

		//2
	    [   0.45,  0.0,  0.0  ], 

	    //3
	    [  -0.9,  -0.8,  0.0  ],

	    //4 
	    [   0.0,  -0.8,  0.0  ],

	    //5
	    [   0.9,  -0.8,  0.0  ]
	];

	var triangles = [
	    [   0,     1,    2],
	    [   1,     3,    4],
	    [   2,     4 ,   5]
	];

	positionBuffer = gl.createBuffer();
	triangleBuffer = gl.createBuffer();

	positionArray = new Float32Array(flatten(positions));

	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, positionArray, gl.STATIC_DRAW);

	triangleArray = new Uint16Array(flatten(triangles));

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, triangleArray, gl.STATIC_DRAW);

	requestAnimationFrame(draw);
}

function draw()	{
	gl.clearColor(0.0, 0.49, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);

	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	var vertexPositionLocation = gl.getAttribLocation(program, 'vertexPosition');
	gl.vertexAttribPointer(vertexPositionLocation, 3, gl.FLOAT, false, 0,0);

	/*Enable the vertex attributes*/
	gl.enableVertexAttribArray(vertexPositionLocation);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleBuffer);

	/*Draw the triangle elements*/
	gl.drawElements(gl.TRIANGLES, triangleArray.length, gl.UNSIGNED_SHORT, 0);
}















