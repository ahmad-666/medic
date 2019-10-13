import form from '../../utilities/scripts/form.js' ;
import util from '../../utilities/utilities.js' ;
let commentsWrapper = document.querySelector('#comments') ;
commentsWrapper.querySelectorAll('.labelHandler').forEach(labelHandler => {
    new form.LabelHandler(labelHandler) ;
})
commentsWrapper.querySelectorAll('form.validate').forEach(myForm => {
    let submit = myForm.querySelector('button[type="submit"]') ;
    let inputs = myForm.querySelectorAll('input.validate,textarea.validate') ;
    new form.FormValidate(myForm,submit,inputs,true) ;
})
commentsWrapper.querySelectorAll('textarea.autoExpand').forEach(textarea => {
    new form.AutoExpand(textarea,'3em','15em') ;
})
