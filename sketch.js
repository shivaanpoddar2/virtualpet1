var dog, dogHappy;
var db, foodS, foodStock;

function preload(){
    dogImg = loadImage("images/Dog.png");
    dogImg2 = loadImage("images/happydog.png");
}
function setup() {
  createCanvas(500, 500);
  db = firebase.database();
  dog = createSprite(250, 350, 10, 10);
  dog.scale = 0.2
  dog.addImage(dogImg);

foodStock = db.ref('Food');
foodStock.on("value", readStock);
}
function draw() {  
  background(140, 210, 144);

  if (keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg2);
  }
  if (keyWentDown(DOWN_ARROW)){
 dog.addImage(dogImg)
  }
  drawSprites();
  textSize(20);
  text("Remaining Food : "+ foodS, 150, 150);
  textSize(15);
  text("PRESS THE UP ARROW TO FEED MILK TO 'FUDGE'", 50, 30)
} 
function readStock(data){
  foodS = data.val();
}
function writeStock(x){
  if(x <= 0){
  x = 0
  } else {
    x--
  }
  db.ref('/').update({
    Food:x
  })
}