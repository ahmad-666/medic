import FontFaceObserver from 'fontfaceobserver' ;
import collapse from '../../utilities/scripts/collapse.js' ;
let faqWrapper = document.querySelector('#faq') ;
faqWrapper.querySelectorAll('.faq').forEach(faq => {
   faq.querySelectorAll('.withCollapse').forEach((withCollapse,i,all) => {
      all = [...all] ;
      let others = all.filter(elm =>elm!=withCollapse);
      let font = new FontFaceObserver('iranSans');
      font.load().then(()=>new collapse.Collapse(withCollapse,others));
   })
})
