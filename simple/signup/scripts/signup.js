//import form from '../../utilities/scripts/form.js' ;
let signupForm = document.querySelector('form#signup') ;
let signupSubmit = signupForm.querySelector('button[type="submit"]') ;
let signupInputs = signupForm.querySelectorAll('.validate') ;
new FormValidate(signupForm,signupSubmit,signupInputs,true,null) ;
signupForm.querySelectorAll('.labelHandler').forEach(labelHandler => {
    new LabelHandler(labelHandler) ;
})