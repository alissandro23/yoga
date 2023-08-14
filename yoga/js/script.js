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

class PriceCalculator {
    #peopleInput;
    #daysInput;
    #placeInput;

    placeRate = 1000;

    constructor ({
        peopleSelector, 
        daysSelector,
        placeSelector,
    }) {
        this.#peopleInput = document.querySelector(peopleSelector)
        this.#daysInput = document.querySelector(daysSelector)
        this.#placeInput = document.querySelector(placeSelector)
    }

    bindEvents(callback) {
        this.#peopleInput.addEventListener("change", callback);
        this.#daysInput.addEventListener("change", callback);
        this.#placeInput.addEventListener("change", callback);
    }

    calculatePrice() {
        return this.#peopleInput.value * this.#daysInput.value * this.#placeInput.value * this.placeRate 
        
    }
}

const calculator = new PriceCalculator({
    peopleSelector: "#people-count",
    daysSelector: "#days-count",
    placeSelector: "#place-select",
});

calculator.bindEvents(() => {
    document.querySelector("#total").innerText = calculator.calculatePrice()
})

class Modal {
    #trigger;
    #modal;

    content;
    title;

    constructor({
        trigger,
        content,
        title = "Modal"
    }) {
        this.#trigger = document.querySelector(trigger);
        this.content = content;
        this.title = title;

        this.bind();
    }

    bind() {
        this.#trigger.addEventListener('click', this.openModal.bind(this));
    }

    openModal() {
        if (!this.#modal) {
            this.#modal = this.#generateModal();
        }

        this.#modal.style.display = 'flex';
    }

    closeModal() {
        if (this.#modal) {
            this.#modal.style.display = 'none';
        }
    }

    #generateModal() {
        const modal = document.createElement("div");

        modal.className = "modal-wrapper";
        modal.innerHTML = `
            <div class="modal-body">
                <button data-close class="modal-close">&times;</button>
                <h4 class="modal-title">${this.title}</h4>
                <div class="modal-content">
                    ${this.content}
                </div>
            </div>
        `;

        document.body.append(modal);

        modal.querySelector("[data-close]").addEventListener('click', this.closeModal.bind(this));

        return modal;
    }
}

const modal1 = new Modal({
    trigger: ".more",
    title: "More Info",
    content: "More information here..."
});