import sliderMove from '../../utilities/scripts/sliderMove' ;
import util from '../../utilities/utilities.js' ;
let grid = document.querySelector('#grid') ;
let popularWrapper = grid.querySelector('#popularWrapper') ;
popularWrapper.querySelectorAll('.ellipse').forEach(ellipse=>new util.Ellipse(ellipse));
let sliderMoveWrapper = grid.querySelector('#sliderMoveWrapper') ;
new sliderMove.SliderMove(sliderMoveWrapper.querySelector('.sliderMove'),3000);