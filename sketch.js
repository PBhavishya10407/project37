//Create variables here
var dog,dogImage,happydog;
var database;
var food,foodStock;
var feedPet,addFood;
var fedTime,lastFed;
var foodObj,feedDog;
var bedroom,garden,washroom,dogfood,deaddog,dogvaccination,injection,lazydog,livingroom,runningrightside,runningleftside,vaccination;
var changingGameState,readingGameState;

function preload()
{
  //load images here
  dogImage = loadImage("Dog.png");
  happydog = loadImage("Happy.png");
  bedroom = loadImage("Bed Room.png");
  garden = loadImage("Garden.png");
  washroom = loadImage("Wash Room.png");
  dogfood = loadImage("Food Stock.png");
  deaddog = loadImage("deadDog.png");
  dogvaccination = loadImage("dogVaccination.png");
  injection = loadImage("Injection.png");
  lazydog = loadImage("Lazy.png");
  livingroom = loadImage("Living Room.png");
  runningrightside = loadImage("running.png");
  runningleftside = loadImage("runningLeft.png");
  vaccination = loadImage("Vaccination.jpg");
}

function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(1000,400);

  foodStock=database.ref('foodStock');
  foodStock.on("value",readStock);
  dog = createSprite(850,200);
  dog.addImage(dogImage);
  dog.scale=0.3;

  feed =createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feed);

  add_Food=createButton("Add Food");
  add_Food.position(800,95);
  add_Food.mousePressed(add_Food);

  readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();
  })

  foodObj = new Food();
  
}


function draw() {  
  background(46,139,87);

  fedTime=database.ref('FedTime');
  fedTime.on("value",function(data)
  {
    lastFed=data.val();
  })

  fill("red");
  strokeWeight(4);
  stroke("yellow");
  textSize(40);
  if(lastFed>=12)
  {
    text("Lastfed: "+lastFed%12 + " PM",350,30);
  }
  else if(lastFed === 0)
  {
    text("LastFed: 12 AM",350,30);
  }
  else
  {
    text("LastFed: "+lastFed+" AM",350,30);
  }
  foodObj.display();

  currentTime = hour();
  if(currentTime==(lastFed+1))
  {
    update("playing");
    foodObj.garden();
  }
  else if(currentTime==(lastFed+2))
  {
    update("sleeping");
    foodObj.bedroom();
  }
  else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4))
  {
    update("bathing");
    foodObj.washroom();
  }
  else if(currentTime>(lastFed+4))
  {
    update("hungry");
    foodObj.display();
  }

  if(dog!="hungry")
  {
    feed.hide();
    addFood.hide();
    dog.remove();
  }
  else
  {
    feed.show();
    addFood.show();
    dog.addImage(lazydog);
  }

  drawSprites();
}

function feedDog()
    {
        dog.addImage(happydog);
        foodObj.updateFoodStock(foodObj.getFoodStock()-1);
        database.ref('/').update({
            Food : foodObj.getFoodStock(),
            FeedTime : Hour()
        })
    }
function addFood()
    {
       foodS++;
       database.ref('/').update({
           Food : foodS
       })
    }

    function readStock(data)
    {
      foodStock = data.val();
      foodObj.updatefoodStock(foodStock);
    }
    
    function feedPet()
    {
        dog.addImage(happydog);
        dog.scale(0.5);
        foodObj.updatefoodStock(foodObj.getfoodStock()-1);
        database.ref('/').update({
        foodStock : foodObj.getfoodStock(),
        FeedTime : hour()
        })
    }
    function  addFood(foodS)
    {
        foodStock++;
        database.ref('/').update({
        foodStock : foodS
        })
    }