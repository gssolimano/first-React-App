import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

  //class Square extends React.Component {
  function Square(props) {
   /*  constructor(props) {
      super(props);
        this.state = {value: null,};
    }   */

    //render() {
      return (
        <button className="square" onClick={props.onClick}>
          {props.value}
        </button>
      );
    //}
  }
  
  class Board extends React.Component {
  /*   constructor(props){
      super(props);
      this.state = {
        squares: Array(9).fill(null),
        xIsNext: true,
      };
    } */

/*     
    handleClick(i){
      const squares = this.state.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return; 
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        squares: squares, 
        xIsNext: !this.state.xIsNext,
      });
 
    }
*/

    renderSquare(i) {
      return (
        <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />
      );
    }

    createBoard() {
      let board = [];
      let count = 0;

      for (let i=0; i < 3; i++) {
        board.push(<div className="board-row"></div>);
        for (let j=0; j < 3; j++) {
          board.push(this.renderSquare(count));
          count++;
        }
      }
      return board;
    }
  
    render() {
      //const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      /* const winner = calculateWinner(this.state.squares);
      let status; 
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      } */  
  
      return (
        <div> 
{/*           <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div> */
          this.createBoard()}
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
          col: 0, 
          row: 0, 
          step: 0
        }],
        stepNumber: 0,
        xIsNext: true, 
        order: 'ASC'
      };
    }

    handleClick(i){
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      
      let col = null;
      let row = null;

      if (calculateWinner(squares) || squares[i]) {
        return; 
      }

      //Identifico columna
      if ((i === 0) || (i === 3) || (i === 6)) {
          col = 1;
      } else if ((i === 1) || (i === 4) || (i === 7)) {
          col = 2;
      } else { 
        col = 3;
      } 

      //Identifico fila
      if ((i >= 0) && (i <= 2)) {
        row = 1;
      } else if ((i => 3) && (i <= 5)) {
          row = 2;
      } else { 
        row = 3;
      }

      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
          history: history.concat([{
            squares: squares,
            col: col, 
            row: row, 
            step: this.state.stepNumber + 1
          }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext
      });      
    }

    startOver() {
      this.setState({
        history: [{
          squares: Array(9).fill(null),
          col: 0, 
          row: 0, 
          step: 0
        }],
        stepNumber: 0,
        xIsNext: true, 
        order: 'ASC'
      });
    }

    jumpTo(step){
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
    }

    orderHistory(newOrder){
      // if is
      // this.setState(function(prevState) {
      //   return {isToggleOn: !prevState.isToggleOn};
      // });
      let history = this.state.history;
      let order = this.state.order;
      let newHistory = history;
    
      if (!(newOrder === order)) {
        newHistory = history.reverse();
      } 
      
      this.setState({
        
        history: newHistory,
        order: newOrder,
      });
    }

    doMoves (moves) {
      let order = this.state.order;

      if (order === 'DESC') { 
        return (
          <ol reversed>{moves}</ol>
        )
      } else {
        return (
          <ol>{moves}</ol>
        )
      }
    }

    render() {
      const history = this.state.history; 
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);

      const moves = history.map((step, move) => {
        const desc = move ? 
          'Go to move #' + history[move].step + ' (' + history[move].col + ',' + history[move].row +')':
          'Go to move #' + history[move].step + ' (' + history[move].col + ',' + history[move].row +')' ;
          
          return (
            <li key={move} style={{fontWeight: (move === this.state.stepNumber) ? 'bold' : 'normal'}}>
              <button class={(move === this.state.stepNumber) ? "buttonSelected" : "button"} onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>
            );
      });

      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player '  + (this.state.xIsNext ? 'X' : 'O');
      }

      const movesList = this.doMoves(moves);

      return (
          <div className="game">
          <div className="game-board">
            <Board 
                squares={current.squares}
                onClick={(i) => this.handleClick(i) }
            />

          </div>
          <div className="game-info">
            <div><button onClick={() => this.startOver()}>RESTART</button></div>
            <div>{status}</div>
            <div>Orden: 
              <button class={(this.state.order === 'ASC') ? "buttonSelected" : "button"} onClick={() => this.orderHistory('ASC')}>ASC</button>
              <button class={(this.state.order === 'DESC') ? "buttonSelected" : "button"} onClick={() => this.orderHistory('DESC')}>DESC</button>
            </div>
            <div>{movesList}</div>
          </div>
        </div>
      );
    }
  }
  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

  
  