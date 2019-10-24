let nav = document.querySelector('nav') ;
let mobileNav = nav.querySelector('#mobileNav') ;
let mobileNavTrigger = mobileNav.querySelector('.fa-bars');
let mobileNavMenu = mobileNav.querySelector('ul') ;
let mobileNavLis = mobileNavMenu.querySelectorAll('li') ;
let mobileSubMenus = mobileNavMenu.querySelectorAll('.menu') ;
let currMenu = null ;
mobileNavTrigger.addEventListener('click',toggleMobileNav) ;
function toggleMobileNav(e){
    e.stopPropagation();
    mobileNavMenu.classList.toggle('show');
    if(!mobileNavMenu.classList.contains('show')){
        if(currMenu) currMenu.classList.remove('show');
    }
    document.addEventListener('click',mobileDocHandler);
}
function mobileDocHandler(e){
    e.stopPropagation();
    let clickedElm = e.target ;
    if(!mobileNavMenu.contains(clickedElm)){
        mobileNavMenu.classList.remove('show');
        if(currMenu) currMenu.classList.remove('show');
        document.removeEventListener('click',mobileDocHandler);
    }
}
mobileNavLis.forEach(li => {
    li.addEventListener('click',toggleMobileLi);
})
function toggleMobileLi(e){
    e.stopPropagation() ;
    currMenu = this.querySelector('.menu');
    mobileSubMenus.forEach(sub => {
        if(sub!=currMenu) sub.classList.remove('show');
    })
    currMenu.classList.toggle('show') ;
    document.addEventListener('click',mobileDocSub) ;
}
function mobileDocSub(e){
    e.stopPropagation();
    let clickedElm = e.target ;
    if(!currMenu.contains(clickedElm)){
        currMenu.classList.remove('show');
        document.removeEventListener('click',mobileDocSub) ;
    }
}