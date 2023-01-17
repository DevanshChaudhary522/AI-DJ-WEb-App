song = ""
scoreleft = 0;
scoreright=0;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload(){
song= loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet= ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = "+leftWristX);
    console.log("leftWristY = "+leftWristY);
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = "+rightWristX);
    console.log("rightWristY = "+rightWristY);
    scoreleft = results[0].pose.keypoints[9].score;
    console.log("scoreleft = "+ scoreleft);
    scoreright = results[0].pose.keypoints[10].score;
    console.log("scoreright = "+ scoreright);

    }

}

function modelLoaded(){
     console.log("pose Net Is Initialized");
     
}

function draw(){
    image(video,0,0,600,500);

    fill("#7d49d6");
    stroke("#000000");
     
    if(scoreright>0.2){
        circle(rightWristX,rightWristY,20);
        if(rightWristY >0 && rightWristY <=100){
            document.getElementById("speed").innerHTML="speed = 0.5";
            song.rate(0.5); 
        }
        else if(rightWristY >100 && rightWristY <=200){
            document.getElementById("speed").innerHTML="speed = 1";
            song.rate(1);
        }
        else if(rightWristY >200 && rightWristY <=300){
            document.getElementById("speed").innerHTML="speed = 1.5";
            song.rate(1.5);
        }
        else if(rightWristY >300 && rightWristY <=400){
            document.getElementById("speed").innerHTML="speed = 2";
            song.rate(2);
        }
        else if(rightWristY >400 && rightWristY <=500){
            document.getElementById("speed").innerHTML="speed = 2.5";
            song.rate(2.5);
        }
    }

 if(scoreleft>0.2){
        circle(leftWristX,leftWristY,20);
        points = Number(leftWristY);
        roundoff1 = floor(points);
        volume = roundoff1/500;
        console.log(volume);
         document.getElementById("volume").innerHTML="volume =" + volume;
         song.setVolume(volume);
    }
}

function Play_song(){
    song.play();
    song.setVolume(0.5);
    song.rate(1);

}
