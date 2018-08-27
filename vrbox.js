// Set the scene size.
const WIDTH = 800;
const HEIGHT = 450;

// Set some camera attributes.
const VIEW_ANGLE = 45;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;

var mouse = new THREE.Vector2(),
  INTERSECTED;

var previousIndex;

// Get the DOM element to attach to
const container =
  document.querySelector('#VRBoxHolder');

// setSize(500,500);
var goonce = true;
var goonceForStop = true;
var clock = new THREE.Clock();
var time = 0;
var delta = 0;
// Create a WebGL renderer, camera
// and a scene
const renderer = new THREE.WebGLRenderer();
const camera =
  new THREE.PerspectiveCamera(
    VIEW_ANGLE,
    ASPECT,
    NEAR,
    FAR
  );

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xEB6357);


// Add the camera to the scene.
scene.add(camera);

// Start the renderer.
renderer.setSize(WIDTH, HEIGHT);

// Attach the renderer-supplied
// DOM element.
container.appendChild(renderer.domElement);

// create a point light
const pointLight =
  new THREE.PointLight(0xFFFFFF);

// set its position
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;

// add to the scene
scene.add(pointLight);

var light = new THREE.DirectionalLight(0xffffff);
light.position.set(1, 1, 1).normalize();

scene.add(light);

var raycaster = new THREE.Raycaster();


var sizeOfCubeX = 3;
var sizeOfCubeY = 3;
var sizeOfCubeZ = 3;
var resize = false;
var resizeEnds = false;

//-----------------------
//     MATERIALS
//-----------------------

var video0 = document.getElementById('video0'); //This is guggenheim OG Demo
var video2 = document.getElementById('video2'); //This is guggenheim OG Demo
var video3 = document.getElementById('video3'); //This is the Perfect Heist

var vt0 = new THREE.VideoTexture(video0);
var vt2 = new THREE.VideoTexture(video2);
var vt3 = new THREE.VideoTexture(video3);

vt0.minFilter = THREE.LinearFilter;
vt0.magFilter = THREE.LinearFilter;
vt0.format = THREE.RGBFormat;

vt2.minFilter = THREE.LinearFilter;
vt2.magFilter = THREE.LinearFilter;
vt2.format = THREE.RGBFormat;

vt3.minFilter = THREE.LinearFilter;
vt3.magFilter = THREE.LinearFilter;
vt3.format = THREE.RGBFormat;
// var m3 = new THREE.M

var m1 = new THREE.MeshPhongMaterial({
  map: vt0
});

var m3 = new THREE.MeshPhongMaterial({
  map: vt2
});
// var m3 = new THREE.MeshPhongMaterial({color: 0x00FF00});
var m4 = new THREE.MeshPhongMaterial({
  map: vt3
});

var interactiveProject = new THREE.TextureLoader().load("interactive-project.png");
var m5 = new THREE.MeshPhongMaterial({
  map: interactiveProject
});


var ap_picture = new THREE.TextureLoader().load("alternatePlatform.png");
var m6 = new THREE.MeshPhongMaterial({
  map: ap_picture
});

var rediscovr = new THREE.TextureLoader().load("rediscovr.png");
var m2 = new THREE.MeshPhongMaterial({
  map: rediscovr
});

//var textureBC = new THREE.TextureLoader().load( "bc.png" );
//var materialSide = new THREE.MeshPhongMaterial( { map: textureBC });
// var materialBottom = new THREE.MeshPhongMaterial({color: 0xF7931A}); //Change this side

var materialsArray = [];
materialsArray.push(m1);
materialsArray.push(m2);
materialsArray.push(m3);
// materialsArray.push(texture);
materialsArray.push(m4);
materialsArray.push(m5);
materialsArray.push(m6);

//-----------------------
var objects = [];

var geometry = new THREE.BoxGeometry(3, 3, 3);
// var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
var cube = new THREE.Mesh(geometry, materialsArray);
// scene.add( cube );



// Move the Sphere back in Z so we
// can see it.
cube.position.z = -12;

cube.name = "Cube";

// Finally, add the sphere to the scene.
scene.add(cube);

objects.push(cube);

function update() {
  // Draw!


  renderer.render(scene, camera);

  // if (GoGLOBAL) {
  //
  //   delta = clock.getDelta();
  //   time += delta;
  //   // console.log(time);
  //   if (time < 1.6) {
  //     // console.log("in: ");
  //     var deltaRotationQuaternion = new THREE.Quaternion()
  //       .setFromEuler(new THREE.Euler(
  //         0, -1 * Math.PI / 180,
  //         0,
  //         'XYZ'
  //       ));
  //
  //     cube.quaternion.multiplyQuaternions(deltaRotationQuaternion, cube.quaternion);
  //   }
  //   if (time >= 5.5 && goonce) {
  //     normalizeCube();
  //     straightenCubeIAG();
  //     resize = true;
  //     goonce = false;
  //     video0.play();
  //   }
  //
  //   if (time >= 8.5 && goonceForStop) {
  //     // normalizeCube();
  //     // straightenCubeIAG();
  //     resize = true;
  //     goonceForStop = false;
  //     video0.pause();
  //   }
  //
  // }

  // Schedule the next frame.
  requestAnimationFrame(update);
  // console.log("x: " + cube.rotation.x + " y: " + cube.rotation.y + " z: " + cube.rotation.z);

  cube.geometry = new THREE.BoxGeometry(sizeOfCubeX, sizeOfCubeY, sizeOfCubeZ);
  if (resize) {
    sizeOfCubeX += 0.5;
    sizeOfCubeY += 0.1;
    if (sizeOfCubeX >= 9) { //6 6 3.6
      sizeOfCubeX = 9;
      sizeOfCubeZ = 5.4;
      resize = false;
    }
  }
  if (resizeEnds) {
    sizeOfCubeZ += 0.5;
    sizeOfCubeY += 0.1;
    if (sizeOfCubeZ >= 9) {
      sizeOfCubeZ = 9;
      sizeOfCubeY = 5.4;
      resizeEnds = false;
    }
  }

console.log("isDragging: " + isDragging);
}

// Schedule the first frame.
requestAnimationFrame(update);


/* */
var isDragging = false;
var previousMousePosition = {
  x: 0,
  y: 0
};


function onDocumentMouseDown(event) {
  console.log(event.target.nodeName);
  if (event.target.nodeName == "CANVAS") {
    isDragging = true;


    event.preventDefault();

    mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

    console.log("mx: " + mouse.x + " my: " + mouse.y);

    raycaster.setFromCamera( mouse, camera );

    var intersects = raycaster.intersectObjects( objects );


    if (intersects.length > 0 && intersects[0].object.name == "Cube") {
      console.log("Intersects isnt 0 :" + mouse.x + " " + mouse.y + " cube pos: " + cube.position.x + " " + cube.position.y);
      var index = Math.floor(intersects[0].faceIndex / 2);




      // </video>

      var ray = new THREE.Raycaster(camera.position, cube.position.clone().sub(camera.position).normalize());
      var newIntersects = ray.intersectObjects(scene.children);
      // console.log(newIntersects[0].faceIndex);
      var whichVideo = Math.floor(newIntersects[0].faceIndex / 2);
      console.log("which face: " + whichVideo);

      switch (index) {
        case 0: //This is the Interactive Art Gallery
          var whichvid = "video" + index;
          console.log(whichvid);
          video = document.getElementById(whichvid);
          console.log("Pre: " + previousIndex + " index: " + index);
          if (index != previousIndex) {
            video.play();
            normalizeCube();
            straightenCubeIAG();
            resizeEnds = true;
            // console.log("Interactive Art Gallery");
          }
          //else no resize and pause
          else {
            if (!video.paused) {
              video.pause();
            }
            else{
              video.play();
            }
          }

          // title.innerHTML = "Interactive Art Gallery";
          // document.getElementById("newCreatedDiv").appendChild(title);
          // document.getElementById("newCreatedDiv").appendChild(video);
          // var source = document.createElement("source");
          // source.src = "artGalleryDocVideo.m4v";

          break;
        case 1:
          //This is a Link to RediscoVR
          window.open('https://github.com/njw275/ReDISCOVR', '_blank');
          //
          // var whichvid = "video" + index;
          // console.log(whichvid);
          // video = document.getElementById(whichvid);
          // console.log("Pre: " + previousIndex + " index: " + index);
          // if (index != previousIndex) {
          //   video.play();
          //   normalizeCube();
          //   straightenCubeHeistPhoto();
          //   resizeEnds = true;
          //   // console.log("Other Gallery (Ming video)");
          // }
          // //else no resize and pause
          // else {
          //   if (!video.paused) {
          //     video.pause();
          //   }
          //   else{
          //     video.play();
          //   }
          // }

          break;

        case 2: //this is the guggenheim first demo gallery

          //if click this for frist time, resize and play
          var whichvid = "video" + index;
          console.log(whichvid);
          video = document.getElementById(whichvid);
          console.log("Pre: " + previousIndex + " index: " + index);
          if (index != previousIndex) {
            video.play();
            normalizeCube();
            straightenCubeJen();
            resize = true;
          }
          //else no resize and pause
          else {
            if (!video.paused) {
              video.pause();
            }
            else{
              video.play();
            }
          }

          break;

        case 3: //This is the Perfect Heist

          console.log("Pre: " + previousIndex + " index: " + index);
          var whichvid = "video" + index;
          console.log(whichvid);
          video = document.getElementById(whichvid);
          if (index != previousIndex) {
            video.play();
            normalizeCube();
            straightenCubeBlue();
            resize = true;
            // console.log("Decoding Nature Midterm");
          }
          //else no resize and pause
          else {
            if (!video.paused) {
              video.pause();
            }
            else{
              video.play();
            }
          }

          break;
        case 4:
        //This is a Link to My Interaction Project
        window.open('https://github.com/artintelclass/interactive-project-njw275', '_blank');

        //   console.log("Pre: " + previousIndex + " index: " + index);
        //   var whichvid = "video" + index;
        //   console.log(whichvid);
        //   video = document.getElementById(whichvid);
        //   if (index != previousIndex) {
        //     video.play();
        //     normalizeCube();
        //     straightenCubePurpleFront();
        //     resize = true;
        //     console.log("Alternate Platform");
        //   }
        //   //else no resize and pause
        //   else {
        //     if (!video.paused) {
        //       video.pause();
        //     }
        //     else{
        //       video.play();
        //     }
        //   }
          // title.innerHTML = "Alternate Platform";
          // document.getElementById("newCreatedDiv").appendChild(title);
          // document.getElementById("newCreatedDiv").appendChild(video);
          // var source = document.createElement("source");
          // source.src = "alternatePlatformDocVideo.m4v";
          break;
        case 5:
          //This is a Link to Alternate Platform
          // window.location.href = 'https://github.com/NYUAD-IM/alternate-platform';
          window.open('https://github.com/NYUAD-IM/alternate-platform', '_blank');

          // var whichvid = "video" + 2;
          // console.log(whichvid);
          // video = document.getElementById(whichvid);
          // console.log("Pre: " + previousIndex + " index: " + index);
          // if (index != previousIndex) {
          //   video.play();
          //   normalizeCube();
          //   straightenCubeYellow();
          //   resize = true;
          //   console.log("ReDISCOVR");
          // }
          // //else no resize and pause
          // else {
          //   if (!video.paused) {
          //     video.pause();
          //   }
          //   else{
          //     video.play();
          //   }
          // }

          break;
      }
      // source.type = "video/mov";
      // video.setAttribute("controls","controls");
      // document.getElementById("docVideo").appendChild(source);
      previousIndex = index;
    }
  }

}

function onDocumentMouseMove(event) {


  var deltaMove = {
    x: event.offsetX - previousMousePosition.x,
    y: event.offsetY - previousMousePosition.y
  };

  if (isDragging) {

    var deltaRotationQuaternion = new THREE.Quaternion()
      .setFromEuler(new THREE.Euler(
        deltaMove.y * Math.PI / 180,
        deltaMove.x * Math.PI / 180,
        0,
        'XYZ'
      ));

    cube.quaternion.multiplyQuaternions(deltaRotationQuaternion, cube.quaternion);
  }

  previousMousePosition = {
    x: event.offsetX,
    y: event.offsetY
  };
}

function onDocumentMouseUp(event) {
  isDragging = false;
}

document.addEventListener('mousedown', onDocumentMouseDown, false);
document.addEventListener('mousemove', onDocumentMouseMove, false);
document.addEventListener('mouseup', onDocumentMouseUp, false);


function normalizeCube() {

  // cube.geometry = new THREE.BoxGeometry( 3,3,3);
  // if(resize){
  sizeOfCubeX = 3;
  sizeOfCubeY = 3;
  sizeOfCubeZ = 3;
  //   if(sizeOfCubeX >= 6){
  //     sizeOfCubeX=6;
  //     sizeOfCubeY=3.6;
  //     resize = false;
  //   }
  // }
}

function straightenCubePurpleFront() {
  cube.rotation.x = 0;
  cube.rotation.y = 0;
  cube.rotation.z = 0;
}

function straightenCubeBlue() {
  cube.rotation.x = -Math.PI / 2;
  cube.rotation.y = 0;
  cube.rotation.z = 0;
}

function straightenCubeYellow() {
  cube.rotation.x = Math.PI;
  cube.rotation.y = 0;
  cube.rotation.z = 0;
}

function straightenCubeJen() {
  cube.rotation.x = Math.PI / 2;
  cube.rotation.y = 0;
  cube.rotation.z = 0;
}

function straightenCubeIAG() {
  cube.rotation.x = -Math.PI;
  cube.rotation.y = -Math.PI / 2;
  cube.rotation.z = Math.PI;
}

function straightenCubeHeistPhoto() {
  cube.rotation.x = Math.PI / 2;
  cube.rotation.y = Math.PI / 2;
  cube.rotation.z = -Math.PI / 2;
}




//Extras



// POP UP DIV for clicking on the Cube
// -----------------------------------

// var div = document.createElement("div");
// div.style.width = "500px";
// div.style.height = "400px";
// div.style.overflow = "auto";
// div.style.textAlign = "center";
// div.style.backgroundColor = "rgba(51, 51, 51, 0.5)";
// div.style.color = "white";
// // div.style.opacity = "0.5";
// // div.innerHTML = "Hello";
// // div.style.top = "0px";
// // div.style.zindex = "100";
// div.style.position = "fixed";
// div.style.top =  "50%";
// div.style.left =  "50%";
// div.style.zIndex = "499"
// div.style.transform = "translate(-50%,-50%)";
// div.id = "newCreatedDiv";
//
//
// document.getElementById("projects").appendChild(div);
//
//   var buttonHolder = document.createElement("div");
//   buttonHolder.id = "buttonHolder";
//   buttonHolder.style.textAlign = "left";
//   buttonHolder.style.height = "20px";
//   // buttonHolder.style.display = "inline-block";
//   buttonHolder.style.zIndex = "505";
//
// var x = document.createElement("button");
// x.style.width = "20px";
// x.style.height = "20px";
// x.style.borderRadius = "75%";
// x.style.background = "lightblue";
// x.style.zIndex = "510";
// // x.style.
// x.id = "closeWindow";
// x.innerHTML = "X";
// document.getElementById("newCreatedDiv").appendChild(buttonHolder);
// document.getElementById("buttonHolder").appendChild(x);
// // getElementById("body").appendChild(div);
//
// // console.log(event.target.nodeName );
//
// // document.getElementById("projects").appendChild(div);
//
// var title = document.createElement("h2");
// title.style.opacity = "1";
// // title.style.height = "20px";
// // title.style.borderRadius = "75%";
// title.style.color = "black";
// title.style.zIndex = "505"
// title.id = "boxTitle";
//
// var video = document.createElement("video");
// video.style.width = "320px";
// video.style.height = "240px";
// video.id = "docVideo";
//

//---------------
// END POP UP DIV
