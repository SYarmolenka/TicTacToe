import React, {Component} from 'react';
import {connect} from 'react-redux';
import throttle from '../../game/throttle';

class Canvas extends Component {
  constructor (props) {
    super(props);
    this.width = 1 + this.props.field[0].length * (this.props.cell + 1);
    this.height = 1 + this.props.field.length * (this.props.cell + 1);
    this.offsetX = (document.documentElement.clientWidth - this.width) / 2;
    this.offsetY = (document.documentElement.clientHeight - this.height) / 2;
  };
  componentDidMount () {
    this.ctx = this.refs.canvas.getContext('2d');
    this.coords = this.refs.canvas.getBoundingClientRect();
    this.refs.canvas.onmousedown = this.canvasClick;
    this.drawCanvas();
  };
  componentWillUpdate (nextProps) {
    this.width = 1 + nextProps.field[0].length * (nextProps.cell + 1);
    this.height = 1 + nextProps.field.length * (nextProps.cell + 1);
    this.moveField(nextProps);
  };
  componentDidUpdate () {
    this.coords = this.refs.canvas.getBoundingClientRect();
    this.drawCanvas();
    this.offsetField(this.props.lastCell[0], this.props.lastCell[1]);
  };
  canvasClick = (e) => {
    this.coords = this.refs.canvas.getBoundingClientRect();
    const mouse = {
      x: e.clientX,
      y: e.clientY
    };
    const move = throttle(e => {
      this.offsetY = this.coords.top + e.clientY - mouse.y;
      this.offsetX = this.coords.left + e.clientX - mouse.x;
      this.refs.canvas.style.top = `${this.offsetY}px`;
      this.refs.canvas.style.left = `${this.offsetX}px`;
    }, 50)
    e.target.onmousemove = (e) => {
      if (this.props.AI) return false
      if (Math.abs(e.clientX - mouse.x) > this.props.cell || Math.abs(e.clientY - mouse.y) > this.props.cell) mouse.move = true;
      mouse.move ? move(e) : 0;
    };
    e.target.onmouseup  = (e) => {
      e.target.onmousemove = false;
      if (mouse.move) return;
      let x = Math.floor((e.clientX - 1 - this.coords.left) / (this.props.cell + 1));
      let y = Math.floor((e.clientY - 1 - this.coords.top) / (this.props.cell + 1));
      x = x >= 0 ? x : 0;
      y = y >= 0 ? y : 0;
      this.props.clickHandler(x, y);
    };
  };
  drawCanvas () {
    const $ = this.ctx;
    $.clearRect(0, 0, this.width, this.height);
    $.fillStyle = 'gray';
    $.fillRect(0, 0, this.width, this.height);
    this.props.field.forEach((el, i) => {
      el.forEach((cell, j) => {
        let last;
        if (j === this.props.lastCell[0] && i === this.props.lastCell[1]) last = 1;
        let x = 1 + j * (this.props.cell + 1);
        let y = 1 + i * (this.props.cell + 1);
        this.createCell(x, y);
        y += this.props.cell + 1;
        if (cell === `X`) this.writeX(x, y, last);
        if (cell === `O`) this.writeO(x, y, last);
      });
    });
    if (this.props.gameOver) this.writeLine(this.props.gameOver);
  };
  createCell (x, y) {
    this.ctx.fillStyle = '#DEDEDE';
    this.ctx.fillRect(x, y, this.props.cell, this.props.cell);
  };
  writeX (x, y, last) {
    this.ctx.font = '40px arial';
    this.ctx.fillStyle = last ? '#007' : 'blue';
    this.ctx.fillText(`X`, x + 1, y - 1);
  };
  writeO (x, y, last) {
    this.ctx.font = '40px arial';
    this.ctx.fillStyle = last ?  '#700' : 'red';
    this.ctx.fillText(`O`, x - 1, y - 1);
  };
  writeLine (arr) {
    arr.forEach(elem => {
      let x = 1 + elem[1] * (this.props.cell + 1);
      let y = 1 + elem[0] * (this.props.cell + 1);
      this.ctx.fillStyle = 'rgba(208,255,0,0.7)';
      this.ctx.fillRect(x, y, this.props.cell, this.props.cell);
    });
  };
  offsetField (x, y) {
    if (x === undefined || y === undefined) return;
    x = x * (this.props.cell + 1);
    y = y * (this.props.cell + 1);
    let top = 0;
    let left = 0;
    if (this.offsetX + x < 2 * this.props.cell) {
      left = 2 * this.props.cell;
    };
    if (x + this.offsetX > document.documentElement.clientWidth - this.props.cell * 2) {
      left = -2 * this.props.cell;
    };
    if (this.offsetY + y < 2 * this.props.cell) {
      top = 2 * this.props.cell;
    };
    if (y + this.offsetY > document.documentElement.clientHeight - this.props.cell * 2) {
      top = -2 * this.props.cell;
    };
    if (left !== 0 || top !== 0) {
      this.refs.canvas.classList.add('transition');
      this.offsetY = this.coords.top + top;
      this.offsetX = this.coords.left + left;
      this.refs.canvas.style.top = `${this.offsetY}px`;
      this.refs.canvas.style.left = `${this.offsetX}px`;
      setTimeout(elem => (elem.classList.remove('transition')), 450, this.refs.canvas);
    };
  };
  moveField (props) {
    if (props.offset[0] > 0 || props.offset[1] > 0) {
      this.offsetY -= props.offset[1] * (props.cell + 1);
      this.offsetX -= props.offset[0] * (props.cell + 1);
    };
  };
  render () {
    return (
      <canvas
        ref='canvas'
        width={this.width}
        height={this.height}
        style={{
          top: `${this.offsetY}px`,
          left: `${this.offsetX}px`
        }} />
    );
  };
};

export default connect(
  state => ({
    field: state.game.field,
    cell: state.game.cell,
    lastCell: state.game.lastCell,
    offset: state.game.offsetField,
    gameOver: state.game.gameOver,
    AI: state.game.AI1 && state.game.AI2
  })
)(Canvas);
