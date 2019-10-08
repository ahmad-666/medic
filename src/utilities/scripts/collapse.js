function Collapse(wrapper,others){
    this.wrapper = wrapper ;
    this.others = others ;
    this.trigger = this.wrapper.querySelector('.collapseTrigger') ;
    this.collapse =this.wrapper.querySelector('.collapse') ;
    this.targetHeight = this.collapse.scrollHeight;
    this.collapse.classList.add('close') ;
    this.trigger.addEventListener('click',this.toggleCollapse.bind(this)) ;
}
Collapse.prototype.toggleCollapse = function(e){
    this.collapse.classList.add('addTransition') ;
    this.collapse.classList.toggle('open') ;
    if(this.collapse.classList.contains('open')) {
        this.collapse.style.height = `${this.targetHeight}px` ;
        this.others.forEach(other=>{
            let collapse = other.querySelector('.collapse') ;
            let trigger = other.querySelector('.collapseTrigger');
            collapse.classList.add('addTransition')
            collapse.style.height = `0px` ;
            collapse.classList.remove('open');
            trigger.classList.add('fa-plus') ;
            trigger.classList.remove('fa-times') ;
        });        
    }
    else this.collapse.style.height = `0px` ;
    this.trigger.classList.toggle('fa-plus') ;
    this.trigger.classList.toggle('fa-times') ;
}
//document.querySelectorAll('.withCollapse').forEach((collapse,i,all) => {
//    all = [...all] ;
//    let others = all.filter(elm =>elm!=collapse);
//    let font = new FontFaceObserver('iranSans');
//    font.load().then(()=>new Collapse(collapse,others));
//})
export default{
	Collapse
}