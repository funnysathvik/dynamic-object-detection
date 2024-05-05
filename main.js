video = "";
status = "";
objects = [];
function preload(){
    video = createVideo("video.mp4");
    video.hide();
}
function setup(){
    canvas = createCanvas(300,300);
    canvas.center();
}

function start(){
    detector = ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("se").innerHTML = "status is deetection objects";
}

function modelloaded(){
    console.log("model is loaded");
    video.volume(0);
    video.speed(1);
    status = true;
    video.loop();
}
function gotresults(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}
function draw(){
image(video,0,0,300,300);
    if(status != ""){
        for(i=0;i<objects.length;i++){
            dectector.detect(video,gotresults);
            document.getElementById("se").innerHTML = "status:objecct Detected";
            document.getElementById("es").innerHTML = "number of objects detected are:" + objects.length;
            percent = floor(objects[i].confidence*100);
            fill("red");
            text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}