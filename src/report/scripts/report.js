import form from '../../utilities/scripts/form.js' ;
let reportForm = document.querySelector('form#report') ;
let reportSubmit = reportForm.querySelector('button[type="submit"]') ;
let reportInputs = reportForm.querySelectorAll('.validate') ;
new form.FormValidate(reportForm,reportSubmit,reportInputs,true,null) ;
reportForm.querySelectorAll('.labelHandler').forEach(labelHandler=>new form.LabelHandler(labelHandler)) ;