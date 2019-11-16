//import form from '../../utilities/scripts/form.js' ;
let contactForm = document.querySelector('form#contact') ;
let contactSubmit = contactForm.querySelector('button[type="submit"]') ;
let contactInputs = contactForm.querySelectorAll('.validate') ;
new FormValidate(contactForm,contactSubmit,contactInputs,true,null) ;
contactForm.querySelectorAll('.labelHandler').forEach(labelHandler => {
    new LabelHandler(labelHandler) ;
})