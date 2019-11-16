//import form from '../../utilities/scripts/form.js' ;
let adForm = document.querySelector('form#requestAd') ;
let adFormSubmit = adForm.querySelector('button[type="submit"]') ;
let adFormInputs = adForm.querySelectorAll('.validate') ;
new FormValidate(adForm,adFormSubmit,adFormInputs,true,null) ;
adForm.querySelectorAll('.labelHandler').forEach(labelHandler => {
    new LabelHandler(labelHandler) ;
})