//product slider------------------------------
//product slider------------------------------
//product slider------------------------------
function productSlider(wrapper){
    this.wrapper = wrapper ;
    this.currWrapper = this.wrapper.querySelector('.curr_wrapper') ;
    this.currSlides = this.currWrapper.querySelectorAll('.curr') ;
    this.nextBtn = this.wrapper.querySelector('.arrow.next') ;
    this.prevBtn = this.wrapper.querySelector('.arrow.prev') ;
    this.slidesWrapper = this.wrapper.querySelector('.slider') ;
    this.slides = this.slidesWrapper.querySelectorAll('.slide') ;
    this.slidesNum = this.slides.length ;
    this.prevIndex = null ;
    this.currIndex = 0 ;
    this.offset = this.slides[this.currIndex].offsetWidth + parseFloat(getStyle(this.slides[this.currIndex],'margin-right')) + parseFloat(getStyle(this.slides[this.currIndex],'margin-left'));
    this.viewportSlides = Math.floor(this.slidesWrapper.offsetWidth/this.offset) ;
    this.nextBtn.addEventListener('click',this.nextSlide.bind(this)) ;
    this.prevBtn.addEventListener('click',this.prevSlide.bind(this)) ;
    this.threshold = {
        min:0 ,
        max: this.offset*(Math.abs(this.slidesNum-this.viewportSlides)) 
    }
    this.slides.forEach(slide => {
        slide.addEventListener('click',this.slideClick.bind(this)) ;
    });
    this.fixSlider = new fixSlider(document.querySelector('.fix_productSlider')) ;
    this.currWrapper.addEventListener('click',this.openFixSlider.bind(this)) ;
}
productSlider.prototype.openFixSlider = function(e){
    this.fixSlider.wrapper.classList.add('show') ;
    document.body.classList.add('disableScroll') ;
}
productSlider.prototype.slideClick = function(e){
    this.changeSlide('none',e.currentTarget) ;
}
productSlider.prototype.nextSlide = function(e){
    this.changeSlide('forward',null) ;
}
productSlider.prototype.prevSlide = function(e){
    this.changeSlide('backward',null) ;
}
productSlider.prototype.changeSlide = function(dir,slide){
    this.currSlides[this.currIndex].classList.remove('active') ;
    this.slides[this.currIndex].classList.remove('active') ;
    this.prevIndex = this.currIndex ;
    if(dir == 'forward') this.currIndex = this.currIndex+1<=this.slidesNum-1 ? this.currIndex+1 : 0 ; 
    else if(dir == 'backward') this.currIndex = this.currIndex-1>=0 ? this.currIndex-1 : this.slidesNum-1 ;
    else if(dir == 'none') this.currIndex = getChildIndex(this.slidesWrapper,slide) ;
    this.currSlides[this.currIndex].classList.add('active') ;
    this.slides[this.currIndex].classList.add('active') ;
    this.fixSlider.currIndex = this.currIndex ;
    this.fixSlider.moveSlider('none') ;
    this.moveSlider(dir) ;
}
productSlider.prototype.moveSlider = function(dir){
    let currPos = parseFloat(this.slidesWrapper.style.right) ;
    let movement = null ;
    if(dir == 'forward'){    
        if(this.currIndex == 0) movement = 0 ;
        else if(this.currIndex<=this.slidesNum-this.viewportSlides) movement = currPos - this.offset ;
        else {
            if(Math.abs(currPos - this.offset) <= this.threshold.max) movement = currPos - this.offset ;
            else  movement = currPos ;
        }
    }
    else if(dir == 'backward'){
        if(this.currIndex == this.slidesNum-1) movement = -1*(this.offset*(this.slidesNum-this.viewportSlides)) ;
        else if(this.currIndex>=this.viewportSlides-1) movement = currPos + this.offset ;
        else if(this.currIndex<this.viewportSlides-1){
            if(currPos + this.offset<=this.threshold.min) movement = currPos + this.offset ;
            else movement = currPos ;
            //if(this.prevIndex<this.currIndex) movement = currPos ;
            //else movement = currPos + this.offset ; 
        }
    }
    this.slidesWrapper.style.right = `${movement}px` ; 
}
//fix slider------------------------------
//fix slider------------------------------
//fix slider------------------------------
function fixSlider(wrapper){
    this.wrapper = wrapper ;
    this.close = this.wrapper.querySelector('.close') ;
    this.nextBtn = this.wrapper.querySelector('.arrow.next') ;
    this.prevBtn = this.wrapper.querySelector('.arrow.prev') ;
    this.slider = this.wrapper.querySelector('.slider') ;
    this.slidesNum = this.slider.querySelectorAll('.slide').length ;
    this.currIndex = 0 ;
    this.offset = this.slider.offsetWidth ;
    this.close.addEventListener('click',this.closeSlider.bind(this)) ;
    this.nextBtn.addEventListener('click',this.nextSlide.bind(this)) ;
    this.prevBtn.addEventListener('click',this.prevSlide.bind(this)) ;
}
fixSlider.prototype.closeSlider = function(e){
    this.wrapper.classList.remove('show') ;
    document.body.classList.remove('disableScroll') ;
}
fixSlider.prototype.nextSlide = function(e){
    this.currIndex = this.currIndex+1<=this.slidesNum-1 ? this.currIndex+1 : 0 ;
    this.moveSlider('forward') ;
}
fixSlider.prototype.prevSlide = function(e){
    this.currIndex = this.currIndex-1>=0 ? this.currIndex-1 : this.slidesNum-1 ;
    this.moveSlider('backward') ;
}
fixSlider.prototype.moveSlider = function(dir){
    let currPos = parseFloat(this.slider.style.right) ;
    let movement = null ;
    if(dir == 'forward') movement = this.currIndex!=0 ? currPos - this.offset : 0 ;
    else if(dir == 'backward') movement = this.currIndex!=this.slidesNum-1 ? currPos + this.offset : -1*(this.offset*(this.slidesNum-1)) ;
    else if(dir == 'none') movement = -this.currIndex*this.offset ;
    this.slider.style.right = `${movement}px` ;
}
//init productSlider------------------------------
//init productSlider------------------------------
//init productSlider------------------------------
//new productSlider(document.querySelector('.productSlider')) ;
export default{
	productSlider
}
