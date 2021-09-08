//clase Board que es el tablero de juego
(function(){
    self.Board = function(width,height){
        this.width=width;
        this.height=height;
        this.playing=false;
        this.game_over=false;
        this.bars =[];
        this.ball=null;
    }

    self.Board.prototype ={
        get elements(){
            var elements  = this.bars;
            elements.push(ball);
            return elements;
        }
    }
})();

//clase BoardView que es la vista del tablero, ajusta el canvas al tamaño del tablero.
(function(){
    self.BoardView = function(canvas, board){
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.ctx = canvas.getContext("2d");
    }
})();

//ejecuta el metodo main tan pronto cargue la ventana
window.addEventListener("load",main);

//funcionque crea un tablero de 800 de ancho x 400 de alto, obtiene el canvas del html e instancia la vista del tabero
function main(){
    var board = new Board(800,400);
    var canvas = document.getElementById('canvas');
    var board_view = new BoardView(canvas,board );
}