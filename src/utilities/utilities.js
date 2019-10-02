let getStyle = (elm,prop) => window.getComputedStyle(elm,null).getPropertyValue(prop) ;
let getChildIndex = (parent,targetChild) => {
    let index = null ;
    let children = parent.children ;
    children = [...children] ;
    for(let i=0 ; i<children.length ; i++){
        let child = children[i] ;
        if(child == targetChild) {
            index = i ;
            break ;
        }
    }
    return index ;
}
let getActiveIndex = parent => {
    let activeIndex = null ;
    let children = parent.children ;
    children = [...children] ;
    for(let i=0 ; i<children.length ; i++){
        let child = children[i] ;
        if(child.classList.contains('active')){
            activeIndex= i ;
            break ;
        }
    }
    return activeIndex ;
}
function docHandler(container,others){
    //others are elements like BlackFilter,BarsMenu,... that we want to change
    //their css classes if we click outside of container
    document.container = container ;
    document.others = [] ;
    others.forEach(other => {
        document.others.push(other) ;
    });
    document.addEventListener('click',docClick);
}
function docClick(e){
    e.stopPropagation();  
    let container = document.container ;
    let clickedElm = e.target ;
    if(!container.contains(clickedElm)){
        container.classList.remove('show') ;
        document.others.forEach(other => {
            other.classList.remove('show') ;
        })
        document.body.classList.remove('disableScroll') ;
        document.removeEventListener('click',docClick);
    }
}
function checkEllipse(ellipse,textAlign){
    let parent = ellipse.parentElement ;
    let threshold = parseInt(window.getComputedStyle(parent,null).getPropertyValue('max-height'));
    if(parent.scrollHeight > threshold) ellipse.classList.add('show') ;  
    else parent.style.textAlign = textAlign ;  
}
function fixMenu(menu,imgChange,img,beforeFixImg,afterFixImg){
    //we should set imgChange to true if we want to change imgAddress when we have fix Menu
    window.addEventListener('scroll',checkFixMenu) ;
    function checkFixMenu(){
        if(window.scrollY>menu.offsetHeight) {
            menu.classList.add('fix') ;
            if(imgChange) img.setAttribute('src',beforeFixImg) ;
        }
        else{
            menu.classList.remove('fix') ;
            if(imgChange) img.setAttribute('src',afterFixImg) ;
        }
    }
}
function AnimateCounter(elm){
    this.elm = elm ;
    this.min = parseInt(this.elm.getAttribute('data-min')); 
    this.max = parseInt(this.elm.getAttribute('data-max')); 
    this.interval = parseInt(this.elm.getAttribute('data-interval')) ;
    this.time = parseInt(this.elm.getAttribute('data-time')); 
    this.stepsNum = Math.ceil(this.time/this.interval);
    this.step = Math.floor((this.max-this.min)/this.stepsNum) ;
    this.animate() ;
}
AnimateCounter.prototype.animate = function(){
    let currentVal = this.min ;
    let currStep = 0 ;
    let clear = setInterval(()=>{
        currStep++ ;
        if(currStep<this.stepsNum){
            if(currStep == this.stepsNum-1){
                currentVal=this.max;
            }
            else{
                currentVal+=this.step;
            }
            this.elm.textContent = currentVal ;
        }
        else clearInterval(clear) ;      
    },this.interval) ;
}
export default{
    getStyle,
    getChildIndex,
    getActiveIndex,
    docHandler,
    checkEllipse,
    fixMenu,
    AnimateCounter,
}