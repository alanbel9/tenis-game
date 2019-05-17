
//definicion de variables
// convertir canvas a objeto para trabajar con el
     var canvas = document.getElementById("myCanvas");
     var ctx = canvas.getContext("2d");
 // variables para la pelota
 var x = canvas.width/2;   // centro del cuadro
 var y = canvas.height - 30; 
 var dx = -4;
 var dy = -4; 
 var ballRadius = 10;
 // variables para la pala
 var paddleHeight = 10;
 var paddleWidth = 100;
 var paddleX =  (canvas.width-paddleWidth)/2;
 // variables para teclado
 var rightPressed = false;
 var leftPressed = false;
 // contador
 var score = 0;
 // variables ladrillos
 var brickRowCount = 4;
 var brickColumnCount = 5;
 var brickWidth = 75;
 var brickHeight = 20;
 var brickPadding = 10;
 var brickOffsetTop = 30;
 var brickOffsetLeft = 30;
 // variables de las vidas del jugador
 var lives = 3;

 var bricks = [];
 for (c = 0 ; c < brickColumnCount ; c++){
     bricks[c] = [];  // genera las columnas
     for(r=0; r < brickRowCount ; r++){
         bricks[c][r] = { x:0 , y:0 , status:1 };  // status 1 = SE VE EL LADRILLO   , status 2  = NO SE VE
     }
 }
     // EVENTOS
     document.addEventListener("keydown",keyDownHandler, false);
     document.addEventListener("keyup",keyUpHandler, false);
     document.addEventListener("mousemove",mouseMoveHandler,false);

     // funciones
     function mouseMoveHandler(e){
         var relativeX = e.clientX - canvas.offsetLeft;
         if(relativeX > 0 && relativeX < canvas.width){
             paddleX= relativeX - paddleWidth/2;
         }
     }

     function keyDownHandler(e) {
         // 39 es igual a la flecha derecha.
         if(e.keyCode == 39 )   rightPressed = true;
         if(e.keyCode == 37 )   leftPressed = true;
     }

     function keyUpHandler(e){
         if(e.keyCode == 39 )   rightPressed = false;
         if(e.keyCode == 37 )   leftPressed = false;
     }



     //funciones 
     function drawScore(){
         ctx.font = "16px Arial";
         ctx.fillStyle = "black";
         ctx.fillText("Score: " + score,8,20);
         
     }
     function drawLives(){
         ctx.font = "16px Arial";
         ctx.fillStyle = "black";
         ctx.fillText("Lifes: " + lives,canvas.width - 65,20);
         
     }

     function collisionDetection(){
         for(c=0 ; c<brickColumnCount ; c++){
             for(r=0; r< brickRowCount ; r++){
                 var b = bricks[c][r];
                 if(b.status == 1){
                     if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight  )
                     {
                         dy = -dy;
                         b.status=0;
                         score++;
                         if(score == brickRowCount * brickColumnCount)  {
                             alert("HAS GANADO!!!");
                             document.location.reload();
                             }
                     } 
                 }
                 
             }
         }
     }

     function drawBall(){
         ctx.beginPath();
         ctx.arc(x,y,ballRadius,0 , 2*Math.PI );
         ctx.fillStyle = "black";
         ctx.fill();
         ctx.closePath();
     }

     function drawPaddle(){
         ctx.beginPath();
         ctx.rect(paddleX, canvas.height - paddleHeight , paddleWidth, paddleHeight  );
         ctx.fillStyle = "red";
         ctx.fill();
         ctx.closePath();
     }

     function drawBricks(){
         for (c = 0 ; c < brickColumnCount ; c++){
             for(r=0; r < brickRowCount ; r++){
                 if(bricks[c][r].status == 1){
                     var brickX = (c * ( brickWidth + brickPadding ) ) + brickOffsetLeft;
                     var brickY = (r * ( brickHeight + brickPadding ) ) + brickOffsetTop;
                     bricks[c][r].x = brickX;
                     bricks[c][r].y = brickY;

                     ctx.beginPath();
                     ctx.rect(brickX , brickY , brickWidth , brickHeight  );
                      ctx.fillStyle = "black";
                      ctx.fill();
                     ctx.closePath();
                 }
                 
             }
         }
     }


     function draw(){
         ctx.clearRect(0,0,canvas.width , canvas.height);   // ir borrando el fotograma anterior
         drawPaddle();
         drawBall();
         drawBricks();
         collisionDetection();
         drawScore();
         drawLives();
         
         x += dx;
         y += dy;
         // collisions   ,   que rebote en todas menos la de abajo
         if(  (y + dy < ballRadius) ){ dy = -dy; }
        // if(  (y + dy > canvas.height -ballRadius  ) || (y + dy < ballRadius) ) dy = -dy; con esto rebota en todas
         if( (x+dx > canvas.width -ballRadius ) || (x+dx < ballRadius )  ) dx = -dx;  
         if( y + dy > canvas.height - ballRadius){
             if( x > paddleX && x < paddleX + paddleWidth)  dy = -dy;
             else{
                     lives--;
                     if(lives == 0){
                         //alert("game over");
                         document.location.reload();
                     }
                     else {
                         x = canvas.width/2;
                         Y = canvas.height -30;
                         dx = 2;
                         dy = -2;
                         paddleX = (canvas.width - paddleWidth)/2;

                     }
                     
             }
            
         }

         // mover pala
         if(leftPressed &&  (paddleX > 0) ) paddleX -= 13 ;
         if(rightPressed && (paddleX < canvas.width - paddleWidth) ) paddleX+=13;  // el (0,0)del rectangulo está arriba izq.

         requestAnimationFrame(draw);

     }
     draw();
     
     //setInterval(draw, 10); // cada 10 milisegundos refresca el dibujo

