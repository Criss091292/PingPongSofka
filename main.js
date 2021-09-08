//clase Board que es el tablero de juego y seria el modelo
(function(){
    self.Board = function(width,height){
        this.width=width;
        this.height=height;
        this.playing=false;
        this.game_over=false;
        this.bars =[];
        this.ball=null;
        this.playing=false; 
    }

    self.Board.prototype ={
        get elements(){
            //se crea copia para que el recolector de basura pueda eliminarla y no estalle la memoria
            var elements  = this.bars.map(function(bar){return  bar;});
            elements.push(this.ball);
            return elements;
        }
    }
})();
(function (){
    self.Ball = function(x,y,radius,board){
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.speed_y=0;
        this.speed_x=3;
        this.board=board;
        this.direction=1;
        board.ball=this;
        this.kind="circle";

        
    }
    self.Ball.prototype={
        move: function(){
            this.x += (this.speed_x * this.direction);
            this.y += (this.speed_y);
        }
    }
})();

(function(){
    self.Bar = function(x,y,width,height,board){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.board=board;
        this.board.bars.push(this);
        this.kind= "rectangle";
        this.speed= 20;
    }

    self.Bar.prototype = {
        down: function(){
            this.y += this.speed;
        },
        up: function(){
            this.y -= this.speed;
        },
        toString: function(){
            return "x: " + this.x + " y: " + this.y;
        }
    }
})();
//clase BoardView que es la vista del tablero,
(function(){
    self.BoardView = function(canvas, board){
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.ctx = canvas.getContext("2d");
    }
    //se crea funcion draw  que dibuja elementos en la vista
    self.BoardView.prototype = {        
        clean: function(){
            this.ctx.clearRect(0,0,this.board.width,this.board.height);
        },
        draw: function(){
            for (var i = this.board.elements.length-1;i>=0;i--){
                var el = this.board.elements[i];
                draw(this.ctx, el);
            };
        },
        play: function(){
            if(this.board.playing){
                this.clean();
                this.draw();
                this.board.ball.move();
            }
            
        }
    }
    function draw(ctx,element){
        //if(element !== null && element.hasOwnProperty("kind")){
            switch(element.kind){
                case "rectangle":
                    ctx.fillRect(element.x,element.y,element.width,element.height);
                    break;
                    case "circle":
                        ctx.beginPath();
                        ctx.arc(element.x,element.y,element.radius,0,7);
                        ctx.fill();
                        ctx.closePath();
                        break;
            }
        //}
        
    }
})();

//ejecuta el metodo main tan pronto cargue la ventana
var board = new Board(800,400);
var bar = new Bar(20,100,40,100,board);
var bar_2 = new Bar(700,100,40,100,board);
var canvas = document.getElementById('canvas');
var board_view = new BoardView(canvas,board );
var ball = new Ball(350,100,10,board)
//setInterval(main,100);

document.addEventListener("keydown",function(ev){
    //evita el movimiento de las barras de desplazamiento en la ventana
        //tecla == flecha arrib
    if(ev.keyCode == 38){   
        ev.preventDefault();
        bar.up();
    }
    //tecla == flecha abajo
    else if(ev.keyCode  ==40){
        ev.preventDefault();
        bar.down();
    }
    //tecla == w
    else if(ev.keyCode  ==87){
        ev.preventDefault();
        bar_2.up();
    }
    //tecla == s
    else if(ev.keyCode  ==83){
        ev.preventDefault();
        bar_2.down();
    }
    //barra espaciadora
    else if(ev.keyCode  ==32){
        ev.preventDefault();
        board.playing = !board.playing;;
    }
});
board_view.draw();
window.requestAnimationFrame(controller);
setTimeout(function(){
    ball.direction = ball.direction*-1;
},2500);
//window.addEventListener("load",main);

//funcion que hace de controller
function controller(){
    board_view.play();
    window.requestAnimationFrame(controller);
}