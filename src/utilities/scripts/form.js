//form validation------------------------------
//form validation------------------------------
//form validation------------------------------
function FormValidate(form,submit,inputs,send){
    this.form = form ;
    this.inputs = inputs ;
    this.submit = submit ;
    this.send = send ;
    this.submit.addEventListener('click',this.formSubmit.bind(this)) ;
    this.validate = false ;
}
FormValidate.prototype.formSubmit = function(e){
    e.preventDefault() ;
    if(this.allValidate())  {
        this.validate = true ;
        if(this.send) this.form.submit() ;
    }
}
FormValidate.prototype.allValidate = function(){
    let validate = true ;
    for(let i=0 ; i<this.inputs.length ; i++){
        let input = this.inputs[i] ;
        if(!this.validateInput(input)){
            this.validate = false ;
            validate = false ;
            break ;
        }
    }
    return validate ;
}
FormValidate.prototype.validateInput = function(input){   
    let msg = input.parentElement.querySelector('.msg') ;
    input.msg = msg ;
    if(input.readOnly){
        if(input.value!=''){
            this.isValid(input) ;
            return true ;
        }
        else this.isNotValid(input) ;      
    }
    else{
        if(input.getAttribute('id')=='passwordRepeat'){//password repeat handler
            let password = this.form.querySelector('input[type="password"]#password') ;
            input.password = password ;
            if(password.value == input.value){
                this.isValid(input) ;
                input.removeEventListener('input',this) ;     
                return true ;
            }
            else{
                this.isNotValid(input) ;
                input.addEventListener('input',this) ;
            }
        }
        else if(input.getAttribute('id')=='mobile'){
            if(input.value.length == 11 && input.value.startsWith('09')){
                this.isValid(input) ;
                input.removeEventListener('input',this) ;     
                return true ;
            }
            else{
                this.isNotValid(input) ;
                input.addEventListener('input',this) ;
            }
        }
        else{
            if(input.checkValidity()){
                this.isValid(input) ;
                input.removeEventListener('input',this) ;     
                return true ;
            }
            else{
                this.isNotValid(input) ;
                input.addEventListener('input',this) ;
            }
        }
    }  
}
FormValidate.prototype.isValid = function(input){
    if(input.msg) input.msg.classList.remove('show') ;
    input.classList.remove('error') ;  
}
FormValidate.prototype.isNotValid = function(input){
    if(input.msg) input.msg.classList.add('show') ;
    input.classList.add('error') ;   
}
FormValidate.prototype.handleEvent = function(e){
    if(e.type === 'input'){
        let input = e.currentTarget ;
        if(input.getAttribute('id')=='passwordRepeat'){
            if(input.password.value == input.value) this.isValid(input) ;     
            else this.isNotValid(input) ;        
        }
        else if(input.getAttribute('id')=='mobile'){
            if(input.value.length == 11 && input.value.startsWith('09')) this.isValid(input) ;     
            else this.isNotValid(input) ;        
        }
        else{
            if(input.checkValidity()) this.isValid(input) ;       
            else this.isNotValid(input) ;        
        }       
    }
}
//select/option------------------------------------------
//select/option------------------------------------------
//select/option------------------------------------------
function Select(wrapper,otherSelects){
    this.wrapper = wrapper ;
    this.input = this.wrapper.querySelector('input:not([type="hidden"])') ;
    this.hiddenInput = this.wrapper.querySelector('input[type="hidden"]')
    this.label = this.wrapper.querySelector('label') ;
    this.ul = this.wrapper.querySelector('ul') ;
    this.lis = this.ul.querySelectorAll('li') ; 
    this.otherSelects = otherSelects ;
    this.input.addEventListener('click',this.openMenu.bind(this)) ;
}
Select.prototype.openMenu = function(e){
    e.stopPropagation() ;
    this.otherSelects.forEach(select => {
        if(select != this.wrapper) select.querySelector('ul').classList.remove('show') ;
    })
    this.ul.classList.add('show') ;
    this.lis.forEach(li => {
        li.addEventListener('click',this) ;
    }) ;
    document.addEventListener('click',this) ;
}
Select.prototype.handleEvent = function(e){
    e.stopPropagation() ;
    if(e.currentTarget != document){ //click on one the 'lis'
        let li = e.currentTarget ;
        this.ul.classList.remove('show') ;
        this.input.value = li.textContent ;
        this.hiddenInput.value = li.getAttribute('data-value') ;
        this.input.classList.remove('error') ;
        this.label.classList.add('top') ;
        this.lis.forEach(li => {
            li.removeEventListener('click',this) ;
        })
        document.removeEventListener('click',this) ;
    }
    else{//click on document     
        let clickedElm = e.target ;
        if(!this.ul.contains(clickedElm)){
            this.ul.classList.remove('show');
            this.lis.forEach(li => {
                li.removeEventListener('click',this) ;
            })
            document.removeEventListener('click',this) ;
        }
    }
    
}
//selectSearch/option------------------------------------------
//selectSearch/option------------------------------------------
//selectSearch/option------------------------------------------
function SelectSearch(wrapper,otherSelects){
    this.wrapper = wrapper ;
    this.input = this.wrapper.querySelector('input:not([type="hidden"])') ;
    this.hiddenInput = this.wrapper.querySelector('input[type="hidden"]')
    this.label = this.wrapper.querySelector('label') ;
    this.ul = this.wrapper.querySelector('ul') ;
    this.lis = this.ul.querySelectorAll('li') ; 
    this.initLis = [...this.lis] ;
    this.otherSelects = otherSelects ;
    this.input.addEventListener('click',this.openMenu.bind(this)) ;
    this.input.addEventListener('input',this.search.bind(this)) ;
    this.input.addEventListener('blur',this.loseFocus.bind(this)) ;
}
SelectSearch.prototype.openMenu = function(e){
    e.stopPropagation() ;
    this.createList(this.initLis) ;
    this.otherSelects.forEach(select => {
        if(select != this.wrapper) select.querySelector('ul').classList.remove('show') ;
    })
    this.ul.classList.add('show') ;
    this.lis.forEach(li => {
        li.addEventListener('click',this) ;
    }) ;
    document.addEventListener('click',this) ;
}
SelectSearch.prototype.handleEvent = function(e){
    e.stopPropagation() ;
    if(e.currentTarget != document){ //click on one the 'lis'
        let li = e.currentTarget ;
        this.ul.classList.remove('show') ;
        this.input.value = li.textContent ;
        this.hiddenInput.value = li.getAttribute('data-value') ;
        this.input.classList.remove('error') ;
        this.label.classList.add('top') ;
        this.lis.forEach(li => {
            li.removeEventListener('click',this) ;
        })
        document.removeEventListener('click',this) ;
    }
    else{//click on document     
        let clickedElm = e.target ;
        if(!this.ul.contains(clickedElm)){
            this.ul.classList.remove('show');
            this.lis.forEach(li => {
                li.removeEventListener('click',this) ;
            })
            document.removeEventListener('click',this) ;
        }
    }
    
}
SelectSearch.prototype.search = function(e){
   let val = this.input.value ;
   //if we enter anything rather than white-space
    //if we have any result we enter this block
   if(val.match(/\S{1,}/gi)){      
        this.lis = this.initLis.filter(li => {
            if(li.textContent.startsWith(val)) return li ;
        })      
    }
    //if we don't have any result we enter this block
    else this.lis = [...this.initLis] ;  
    this.createList(this.lis) ;
}
SelectSearch.prototype.loseFocus = function(e){
    let val = this.input.value ;
    let find = false ;
    for(let i=0 ; i<this.lis.length ; i++){
        let li = this.lis[i] ;
        if(li.textContent == val){
            find = true ;
            break ;
        }
    }
    if(!find) {
        this.input.value = '' ;  
        this.label.classList.remove('top') ;
    } 
    else this.label.classList.add('top') ;  
}
SelectSearch.prototype.createList = function(lis){
    this.ul.innerHTML = '' ;
    lis.forEach(li => {
        this.ul.appendChild(li) ;
    })
}
//label handlers-------------------------------------
//label handlers-------------------------------------
//label handlers-------------------------------------
function LabelHandler(input){
    this.input = input ;
    this.label = this.input.parentElement.querySelector('label') ;
    this.input.addEventListener('blur',this.focusLost.bind(this)) ;
}
LabelHandler.prototype.focusLost = function(e){
    if(this.input.value.length!=0) this.label.classList.add('top');
    else this.label.classList.remove('top');
}
//just number on input[type="number"]---------------
//just number on input[type="number"]---------------
//just number on input[type="number"]---------------
function NumberInput(input){
    this.input = input ;
    this.input.addEventListener('keypress',this.justNumber.bind(this)) ;
}
NumberInput.prototype.justNumber = function(e){
    if(e.key =='e' || e.key=='E') e.preventDefault(); 
}
//input with increase/decrease---------------------
//input with increase/decrease---------------------
//input with increase/decrease---------------------
function NumberHandler(wrapper){
    this.wrapper = wrapper ;
    this.increase = this.wrapper.querySelector('.increase') ;
    this.decrease = this.wrapper.querySelector('.decrease') ;
    this.input = this.wrapper.querySelector('input') ;
    this.max = parseFloat(this.input.getAttribute('data-max')) ;
    this.min = parseFloat(this.input.getAttribute('data-min')) ;
    this.step = parseFloat(this.input.getAttribute('data-step')) ;
    this.increase.addEventListener('click',this.add.bind(this)) ;
    this.decrease.addEventListener('click',this.minus.bind(this)) ;
}
NumberHandler.prototype.add = function(e){
    let val = parseFloat(this.input.value) ;
    this.input.value = val+this.step<=this.max?val+this.step:val ;
}
NumberHandler.prototype.minus = function(e){
    let val = parseFloat(this.input.value) ;
    this.input.value = val-this.step>=this.min?val-this.step:val ;
}
//textarea autoExpand-------------------------
//textarea autoExpand-------------------------
//textarea autoExpand-------------------------
function AutoExpand(textarea){
    this.textarea = textarea ;
    this.textarea.addEventListener('input',this.setHeight.bind(this)) ;
}
AutoExpand.prototype.setHeight = function(e){
    this.textarea.style.height = 'auto' ;
    if(this.textarea.value != ''){
        let height = this.textarea.scrollHeight + 
            parseFloat(window.getComputedStyle(this.textarea,null).getPropertyValue('border-bottom')) ;
        this.textarea.style.height = `${height}px` ;
    }
    else {
        this.textarea.style.height = `4em` ;
    }
}
//toggle ------------------------------------
//toggle ------------------------------------
//toggle ------------------------------------
function Toggle(wrapper){
    this.wrapper = wrapper ;
    this.switch = this.wrapper.querySelector('.switch') ;
    this.circle = this.switch.querySelector('.circle') ;
    this.rightText = this.wrapper.querySelector('.toggleText.right') ;
    this.leftText = this.wrapper.querySelector('.toggleText.left') ;
    this.hiddenInput = this.wrapper.querySelector('input[type="hidden"]') ;
    this.switch.addEventListener('click',this.toggle.bind(this)) ;
    this.init() ;
}
Toggle.prototype.init = function(){
    if(this.rightText.classList.contains('active')) this.hiddenInput.value = this.rightText.getAttribute('data-value') ;
    else this.hiddenInput.value = this.leftText.getAttribute('data-value') ;
}
Toggle.prototype.toggle = function(e){
    this.circle.classList.toggle('right') ;
    this.circle.classList.toggle('left') ;
    this.rightText.classList.toggle('active') ;
    this.leftText.classList.toggle('active') ;
    if(this.rightText.classList.contains('active')) this.hiddenInput.value = this.rightText.getAttribute('data-value') ;
    else this.hiddenInput.value = this.leftText.getAttribute('data-value') ;
}
//ranger ------------------------------------
//ranger ------------------------------------
//ranger ------------------------------------
function Ranger(wrapper){
    this.wrapper = wrapper;
    this.ranger = this.wrapper.querySelector('.ranger') ;
    this.min = parseFloat(this.ranger.getAttribute('data-min')) ;
    this.max = parseFloat(this.ranger.getAttribute('data-max')) ;
    this.step = parseFloat(this.ranger.getAttribute('data-step')) ;
    this.minHidden = this.wrapper.querySelector('input[type="hidden"].min') ;
    this.maxHidden = this.wrapper.querySelector('input[type="hidden"].max') ;
    this.text = this.wrapper.querySelector('.text') ;
    this.createRanger() ;
    this.init() ;
}
Ranger.prototype.init = function(){
    this.ranger.style.border = "none" ;
    let handlers = this.ranger.querySelectorAll('.noUi-handle') ;
    handlers.forEach((handler,i) => {
        handler.classList.add('circle') ;
        switch(i){
            case 0 :
                handler.classList.add('right') ;
                break ;
            case 1 :
                handler.classList.add('left') ;
                break ;
        }
        
    })
    this.minHidden.value = this.min ;
    this.maxHidden.value = this.max ;   
    this.text.textContent = `${this.min}تومان - ${this.max}تومان` ;
}
Ranger.prototype.createRanger = function(){
    noUiSlider.create(this.ranger,{
        orientation: 'horizontal' ,
        direction: 'rtl',
        animate: true,
        animationDuration: 300,
        behaviour: 'tap', 
        margin: this.step ,
        range: {
            'min': [this.min],
            'max': [this.max]
        },
        start: [this.min,this.max],
        connect: [false,true,false],
        step: this.step,
        tooltips: [
            wNumb({
                decimals: 0, 
                thousand: '.', 
                // suffix: ' تومان' 
            }) ,
            wNumb({
                decimals: 0, 
                thousand: '.', 
                // suffix: ' تومان' 
            })      
        ] ,
        format: wNumb({ 
            decimals: 0, 
            thousand: '' 
        })
    });
    this.ranger.noUiSlider.on('update',()=>{
        this.minHidden.value = this.ranger.noUiSlider.get()[0];
        this.maxHidden.value = this.ranger.noUiSlider.get()[1];   
        this.text.textContent = `${this.minHidden.value}تومان - ${this.maxHidden.value}تومان` ;
    })
};
//exports-----------------------------------------------------
//exports-----------------------------------------------------
//exports-----------------------------------------------------
export default {
	FormValidate,
	Select,
	SelectSearch,
	LabelHandler,
	NumberInput,
	NumberHandler,
	AutoExpand,
	Toggle,
	Ranger
}