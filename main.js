
status = "";
objects = [];

function preload() {

}

function setup() {
  video = createCapture(VIDEO);
  video.hide();
  canvas = createCanvas(450,350);
  canvas.center();
}
function start() {
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Object Detected"
}


function gotResult(error,results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}
function draw() {
  image(video,0,0,450,350);
  if(status != "") {
      objectDetector.detect(video, gotResult);
    for (i = 0; i < objects.length; i++) {
      document.getElementById("status").innerHTML = "Status : Object Detected";
      document.getElementById("number_of_objects").innerHTML = "Number of Objects: " + objects.length;
      fill("#FF0000");
      percent = floor(objects[i].confidence * 100);
      text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
      noFill();
      stroke("#FF0000");
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
      }
  }
}


function modelLoaded() {
  console.log("model loaded");
  status = true;
}