import form from '../../utilities/scripts/form.js' ;
let newsLetters = document.querySelector('form#newsLetters') ;
let newsLettersSubmit = newsLetters.querySelector('button[type="submit"]') ;
let newsLettersInputs = newsLetters.querySelectorAll('input.validate') ;
new form.FormValidate(newsLetters,newsLettersSubmit,newsLettersInputs,true) ;
