import util from '../../utilities/utilities.js' ;
import form from '../../utilities/scripts/form.js' ;
import modal from '../../utilities/scripts/modal.js' ;
let adminApproveTriggers = document.querySelectorAll('.modalTrigger[data-modal="adminApprove"]') ;
let adminApproveModal = new modal.Modal([...adminApproveTriggers],[],true) ;
let commentsWrapper = document.querySelector('#comments') ;
commentsWrapper.querySelectorAll('.labelHandler').forEach(labelHandler => {
    new form.LabelHandler(labelHandler) ;
})
commentsWrapper.querySelectorAll('form.validate').forEach(myForm => {
    let submit = myForm.querySelector('button[type="submit"]') ;
    let inputs = myForm.querySelectorAll('input.validate,textarea.validate') ;
    new form.FormValidate(myForm,submit,inputs,false,adminApproveModal) ;
})
commentsWrapper.querySelectorAll('textarea.autoExpand').forEach(textarea => {
    new form.AutoExpand(textarea,'2.7em','15em') ;
})

