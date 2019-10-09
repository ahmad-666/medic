function SliderMove(wrapper){
    this.wrapper = wrapper ;
    this.prevBth = this.wrapper.querySelector('.btn.prev');
    this.nextBth = this.wrapper.querySelector('.btn.next');
    this.slider = this.wrapper.querySelector('.slider') ;
    this.slidesNum = this.slider.querySelectorAll('.slide').length ;
    this.currIndex = 0 ;
    this.offset = this.slider.querySelector('.slide').offsetWidth ;
    this.prevBth.addEventListener('click',this.changeSlide.bind(this)) ;
    this.nextBth.addEventListener('click',this.changeSlide.bind(this)) ;
}
SliderMove.prototype.changeSlide = function(e){
    let currPos = parseFloat(this.slider.style.right) ;
    if(e.currentTarget.classList.contains('prev')){
        this.currIndex = this.currIndex-1>=0?this.currIndex-1:this.slidesNum-1;
        if(this.currIndex!=this.slidesNum-1) this.slider.style.right = `${currPos+this.offset}px`;  
        else this.slider.style.right = `-${(this.slidesNum-1)*this.offset}px` ;    
    }
    else if(e.currentTarget.classList.contains('next')){
        this.currIndex = this.currIndex+1<this.slidesNum?this.currIndex+1:0 ;
        if(this.currIndex!=0) this.slider.style.right = `-${Math.abs(currPos)+this.offset}px`;
        else this.slider.style.right = '0px' ;
    }
}
export default{
    SliderMove
}