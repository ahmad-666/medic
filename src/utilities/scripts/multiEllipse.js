function Ellipse(ellipse){
    this.ellipse = ellipse ;
    this.parent = this.ellipse.parentElement ;
    this.textAlign = this.ellipse.getAttribute('data-align') ;
    this.checkThreshold() ;
}
Ellipse.prototype.checkThreshold = function(){
    let threshold = parseFloat(window.getComputedStyle(this.parent,null).getPropertyValue('max-height')) ;
    if(this.parent.scrollHeight > threshold) {
        this.ellipse.style.display = 'block' ;
        this.parent.style.textAlign = 'justify' ;
    }
    else{
        this.parent.style.textAlign = this.textAlign ;
    }
}
//document.querySelectorAll('.ellipse').forEach(ellipse => {
//    new Ellipse(ellipse) ;
//})
export default{
	Ellipse
}
