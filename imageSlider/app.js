const slides = document.querySelectorAll('.slide')
const next = document.querySelector('#next')
const prev = document.querySelector('#prev')
const auto = true
const interval = 3000
let slideInterval






const nextSlide = () => {
    const current = document.querySelector('.current');
    
    current.classList.remove('current')

    if(current.nextElementSibling){
        current.nextElementSibling.classList.add('current')
    }else{
        // go back
        slides[0].classList.add('current')
    }
    setTimeout(()=>{
        current.classList.remove('current')
    })
}
const prevSlide = () => {
    const current = document.querySelector('.current');
    
    current.classList.remove('current')

    if(current.previousElementSibling){
        current.previousElementSibling.classList.add('current')
    }else{
        // go back
        slides[slides.length-1].classList.add('current')
    }
    setTimeout(()=>{
        current.classList.remove('current')
    })
}

next.addEventListener('click',(e)=>{
    nextSlide()
    if(auto){
        clearInterval(slideInterval)
        slideInterval = setInterval(nextSlide, interval);
    }
})
prev.addEventListener('click',(e)=>{
    prevSlide()
    if(auto){
        clearInterval(slideInterval)
        slideInterval = setInterval(nextSlide, interval);
    }
})


// auto 

if(auto){
    slideInterval = setInterval(nextSlide, interval);
}