import sliderMove from '../../utilities/scripts/sliderMove' ;
import util from '../../utilities/utilities.js' ;
new sliderMove.SliderMove(document.querySelector('.sliderWrapperMove'));
document.querySelectorAll('.ellipse').forEach(ellipse => {
    new util.Ellipse(ellipse) ;
})