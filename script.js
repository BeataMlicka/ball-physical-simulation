size(1200,550);


//*********************** PLAYER ****************************

var forceGravitation = new PVector();


var Mover = function() {
    this.position = new PVector(width/2, height/2); 
    this.velocity = new PVector(0,0);
    this.acceleration = new PVector(0,0);
    this.friction = new PVector(0,0);
    this.air = new PVector(0,0);
    this.gravitation = new PVector(0,0);
    this.leaf = new PVector(0,0);
    this.mass = 15;
};


Mover.prototype.display = function() {
    noStroke();
    fill(255, 255, 255);
    ellipse(this.position.x, this.position.y, 30, 30);
};


Mover.prototype.update = function() {

    text('air - x', 10,20);
    text(this.air.x, 10,40);
    text('air - y', 10,60);
    text(this.air.y, 10,80);
    this.acceleration.add(this.air);
    text('acceleration - x', 10,100);
    text(this.acceleration.x, 10,120);
    text('acceleration - y', 10,140);
    text(this.acceleration.y, 10,160);
    this.acceleration.add(this.friction);
    text('friction - x', 10,180);
    text(this.friction.x, 10,200);
    text('friction - y', 10,220);
    text(this.friction.y, 10,240);
    this.acceleration.add(this.gravitation);
    text('gravitation - x', 10,260);
    text(this.gravitation.x, 10,280);
    text('gravitation - y', 10,300);
    text(this.gravitation.y, 10,320);
    this.velocity.add(this.acceleration);
    text('acceleration - x', 10,340);
    text(this.acceleration.x, 10,360);
    text('acceleration - y', 10,380);
    text(this.acceleration.y, 10,400);
    this.position.add(this.velocity);
    text('velocity - x', 10,420);
    text(this.velocity.x, 10,440);
    text('velocity - y', 10,460);
    text(this.velocity.y, 10,480);
    this.acceleration.mult(0);
    this.air.mult(0);
    this.friction.mult(0);
};

//************************************** GRAVITATION FUNCTION ************************************************

Mover.prototype.gravitationForce = function() {
    this.gravitation.x = 0;
    this.gravitation.y = 0.1;
};

//************************************************ FRICTION FORCE ******************************************************

Mover.prototype.frictionForce = function(){
    this.friction.x = 0.001;
    this.friction.y = 0;
}

//****************************************** AERODYNAMIC FORCE **********************************************

Mover.prototype.airForce = function() {
    var c = 0.01;
    var speed = this.velocity.mag();
    var airMagnitude = c * speed * speed;

    this.air = this.velocity.get();
    this.air.normalize();
    this.air.mult(-1);

    this.air.mult(airMagnitude);
};

// ************************************** CHECK EDGES ***********************************************

Mover.prototype.checkEdges = function(){
    if(this.position.y > 500){
        this.position.y = 500;
        this.velocity.y = 0;
    }
};


// ******************************  main  ***************************************

var mover = new Mover();

draw = function() {

    background(0, 0, 0);


    // ************* controllers *******************

    if (keyPressed && keyCode === LEFT) {
        mover.velocity.x -= 0.02;
        mover.acceleration.x -= 0.05;
    }
    if (keyPressed && keyCode === RIGHT) {
        mover.velocity.x += 0.02;
        mover.acceleration.x += 0.05;
    }
    text(mover.position.y, 10, 500);
    if(mover.position.y > 499 && keyPressed && keyCode === UP){
        mover.velocity.y -= 0.02;
        mover.acceleration.y -= 10;
    }

    else {
    }

    //mover.velocity.y = constrain(mover.velocity.y, -2, 2);

    //friction
    if(mover.position.y === 500){
        mover.frictionForce();
    }
    
    mover.airForce();

    mover.gravitationForce();
    mover.update();
    mover.checkEdges();
    mover.display();

};