let articleWrapper = document.querySelector('#article') ;
let likeTrigger = articleWrapper.querySelector('#userLike') ;
let likeIcon = likeTrigger.querySelector('i') ;
likeTrigger.addEventListener('click',toggleLike) ;
function toggleLike(e){
    likeIcon.classList.toggle('active') ;
}