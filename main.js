import './style.css'

// Fetch Data
const servicesButtons = document.querySelectorAll('.services_item'); 
const serviceDetails = document.querySelector('.services_right');

const getService = (category) => { 
    const details = servicesData.find(item => item.category === category); 
    serviceDetails.innerHTML = `
        <h3>${details.title}</h3>
        ${details.description.map(paragraph => "<p>" + paragraph + "</p>").join('')}
        <div class="skills">
            ${details.skills.map(skill => `
                <div class="skill">
                    <i class="${skill.icon}"></i>
                </div>
            `).join('')}
        </div>
    `
}

const removeActiveClass = () => {
    servicesButtons.forEach(button => {
        button.classList.remove('active');
    })
}

servicesButtons.forEach(item => {
    item.addEventListener('click', () => { 
        removeActiveClass();
        const serviceClass = item.classList[1]; 
        getService(serviceClass)
        item.classList.add('active')
    })
})

// Mixitup
const container = document.querySelector('.projects_container');
let mixer = mixitup(container,{
    animation:{
        enable: false,
    }
});
mixer.filter('*');

// Nav Toggler
const navMenu = document.querySelector('.nav_menu');
const navOpenBtn = document.querySelector('.nav_toggle-open');
const navCloseBtn = document.querySelector('.nav_toggle-close');

const openNavHandler = () => {
    navMenu.style.display = 'flex';
    navOpenBtn.style.display='none';
    navCloseBtn.style.display='inline-block';
}

const closeNavHandler = () => {
    navMenu.style.display = 'none';
    navOpenBtn.style.display='inline-block';
    navCloseBtn.style.display='none';
}

navOpenBtn.addEventListener('click', openNavHandler);
navCloseBtn.addEventListener('click', closeNavHandler);

// closeNav on click nav link 
const navItems = navMenu.querySelectorAll('a');
if(window.innerWidth < 768){
    navItems.forEach(item => {
        item.addEventListener('click',closeNavHandler)
    })
}

// Theme Toggle
const themeBtn = document.querySelector('.nav_theme-btn');
themeBtn.addEventListener('click', ()=>{
    let bodyClass = document.body.className;
    if(!bodyClass){
        bodyClass = 'dark';
        document.body.className = bodyClass;
        // change icon
        themeBtn.innerHTML = "<i class='uil uil-sun'></i>"
        // save to local storage
        window.localStorage.setItem('theme',bodyClass);
    }else{
        bodyClass = '';
        document.body.className = bodyClass;
        // change icon
        themeBtn.innerHTML = "<i class='uil uil-moon'></i>"
        // save to local storage
        window.localStorage.setItem('theme',bodyClass);
    }
})

// load theme from local storage 
window.addEventListener('load',()=>{
    document.body.className = window.localStorage.getItem('theme');
})
