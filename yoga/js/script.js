const tabs = document.querySelectorAll('.info-header-tab');


function showTab(tabHeader) {
    const tabId = tabHeader.getAttribute('data-tab');

    const tabContents = document.querySelectorAll('.info-tabcontent');
    tabContents.forEach(function (content) {
        content.style.display = 'none';
    });

    const activeTabContent = document.getElementById(tabId);
    activeTabContent.style.display = 'flex';

    tabs.forEach(function (tab) {
        tab.classList.remove('active');
    });
    tabHeader.classList.add('active');
}

tabs.forEach(function (tab) {
    tab.addEventListener('click', function() {
        showTab(this)
    });
});

showTab(tabs[0])

class Timer {
    endTime;
    #timerElement;

    constructor(endTime, timerSelector) {
       this.endTime = endTime
       this.#timerElement = document.querySelector(timerSelector)
    }

    run() {
        this.rerender()
        setInterval(this.rerender.bind(this), 1000)
    }

    rerender() {
        let timeDelta = this.endTime - new Date()
        const hours = parseInt(timeDelta / 3600000)  
        timeDelta -= hours * 3600000

        const minutes = parseInt(timeDelta / 60000)  
        timeDelta -= minutes * 60000

        const seconds = parseInt(timeDelta / 1000) 
        
        this.#timerElement.querySelector(".hours").innerText = hours
        this.#timerElement.querySelector(".minutes").innerText = minutes
        this.#timerElement.querySelector(".seconds").innerText = seconds
    }
} 

const timer = new Timer(new Date(1690811563549), '#timer')
timer.run()


let slideIndex = 0;
	const slides = document.getElementsByClassName("slider-item");
	const dots = document.getElementsByClassName("dot");

showSlide(slideIndex);

function showSlide(index) {
    if (index >= slides.length) {
        slideIndex = 0;
    }
    if (index < 0) {
        slideIndex = slides.length - 1;
    }
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        dots[i].classList.remove("dot-active");
    }
    
    slides[slideIndex].style.display = "block";
    dots[slideIndex].classList.add("dot-active");
}

function nextSlide() {
    showSlide(slideIndex + 1);
}

function prevSlide() {
    showSlide(slideIndex - 1);
}

const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev");

nextButton.addEventListener("click", nextSlide);
prevButton.addEventListener("click", prevSlide);
