'use strict';

window.addEventListener('load', function() {
  setTimeout(function() {
  window.scrollTo({
    top:0,
    left:0,
    behavior: 'instant'
  });
}, 1);
});

const mediaQuery = window.matchMedia('(max-width: 1254px)');

document.addEventListener("DOMContentLoaded", function(){

  
// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
// ----------------------------HOME SECTION START-------------------------------  
// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

  // ---------------------------------------
  // modal reservation div scroll fx (start)
  // ---------------------------------------

  const divModal = document.getElementById('modal-reservation');

  // containerHeight = 700px
  let viewportHeight = window.innerHeight;
  let prevViewportTopScroll = window.scrollY;

  window.addEventListener('resize', function(){
      viewportHeight = window.innerHeight;
  });

  document.addEventListener('scroll', function(){
      if(viewportHeight < 700){
          let currentViewportTopScroll = window.scrollY;
          let viewportBottomScroll = currentViewportTopScroll + viewportHeight;

          let containerTopDistance = divModal.getBoundingClientRect().top + window.scrollY;
          let containerBottomDistance = containerTopDistance + 700;

          if(currentViewportTopScroll > prevViewportTopScroll){ // scroll down
              if(viewportBottomScroll >= containerBottomDistance){
                  divModal.style.position = 'fixed';
                  divModal.style.top = `${viewportHeight - 700}px`;
              } 
              else{
                  divModal.style.top = `${containerTopDistance}px`
                  divModal.style.position = 'absolute';
              }
          } 
          else if (currentViewportTopScroll < prevViewportTopScroll){// scroll up
              if(containerTopDistance >= currentViewportTopScroll){
                  divModal.style.position = 'fixed';
                  divModal.style.top = `${0}px`
              } 
              else{
                  divModal.style.top = `${containerTopDistance}px`
                  divModal.style.position = 'absolute';
              }
          }

          prevViewportTopScroll = currentViewportTopScroll;
      } else {
        divModal.style.position = 'fixed'
      };

  });

  const reservationBtn = document.getElementById('make-a-reservation-btn');
  const modalBtnClose = document.getElementById('modal-btn-close');
 
  reservationBtn.addEventListener('click', ()=>{
    divModal.style.display = 'inline-block';
    setTimeout(()=>divModal.style.opacity = 1, 10)
  })

  modalBtnClose.addEventListener('click',()=>{
    divModal.style.opacity = 0;
    setTimeout(()=>divModal.style.display = 'none', 300);
  })
  // ---------------------------------------
  // modal reservation div scroll fx (end)
  // ---------------------------------------

  // ---------------------------------------
  // modal reservation div form number(start)
  // ---------------------------------------

  const form = document.getElementById('modal-reservation-content');
  const phoneNumberInput = document.getElementById('phone-number');

  form.addEventListener('submit', function(event) {
    const phoneNumber = phoneNumberInput.value;

    if (!/^(?=[0-9\s\+]{6,20}$)(?:\+[0-9\s]*)?$/.test(phoneNumber) || phoneNumber.length < 4) {
      event.preventDefault(); 
      alert('Insert a valid phone number');
    }
  });

  // ---------------------------------------
  // modal reservation div form number (end)
  // ---------------------------------------


  // ----------------------------
  // hero background slide (start)
  // ----------------------------   

  const heroImage1= document.querySelector('.hero-image1')
  const heroImage2 = document.querySelector('.hero-image2')

  const heroImages=['home.jpg','menus.jpg','about-us.jpeg','jazz.jpg','contact.jpg','reservation.jpg']

  let currentIndex = 0;

  function changeImage(){
      currentIndex = (currentIndex + 1) % heroImages.length;

      if(heroImage1.classList.contains('hidden')){
          heroImage1.style.backgroundImage = `url('./src/img/hero-img/${heroImages[currentIndex]}')`;
          heroImage1.classList.remove('hidden');
          heroImage1.classList.add('zoom');

          heroImage2.classList.add('hidden');
          heroImage2.classList.remove('zoom');
      } 
      else {
          heroImage2.style.backgroundImage = `url('./src/img/hero-img/${heroImages[currentIndex]}')`;
          heroImage2.classList.remove('hidden');
          heroImage2.classList.add('zoom');

          heroImage1.classList.add('hidden'); 
          heroImage1.classList.remove('zoom');
      }
  }

  setInterval(changeImage, 10000);

  // ----------------------------
  // hero background slide (end)
  // ---------------------------- 


  // ----------------------------
  // header links scroll (start)
  // ---------------------------- 

  const allSection = document.querySelectorAll('.section');
  const allLink = document.querySelectorAll('.link-to-section');

  allLink.forEach(function(link){
    allSection.forEach(function(section){
      link.addEventListener("click",function(){
        if(section.getAttribute('data-section') === link.getAttribute('data-section')){
          section.scrollIntoView({
            behavior:'smooth'
          })
        }
      })
    })
  })

  // ----------------------------
  // header links scroll (end)
  // ---------------------------- 

  // ----------------------------
  // header show and hide (start)
  // ---------------------------- 

  const menuCheckboxLabelIcon = document.getElementById('menu-checkbox-label-icon')
  const menuCheckboxLabel = document.getElementById('menu-checkbox-label');
  const menuCheckbox = document.getElementById('menu-checkbox');

  const listMenuLinks = document.getElementById('links-menu-list');
  let spanLinks = document.querySelectorAll('.links-span')
  let headerMenu = document.querySelector('.header-menu');
  let headerMarker = document.querySelector('.header-marker');

  let prevScrollPos = window.scrollY;

  window.addEventListener('scroll', function() {
    const currentScrollPos = window.scrollY;

    if(currentScrollPos >= 50) { 
      headerMenu.style.backgroundColor = 'rgb(12, 12, 12)'
      headerMenu.style.position = 'fixed';
      headerMenu.style.marginTop = '-50px'

      if(!mediaQuery.matches){ // if (vw > 768px)
        prevScrollPos > currentScrollPos // if you scroll up
        ? headerMenu.classList.remove('hidden') & headerMarker.classList.add('hidden')  
        : headerMenu.classList.add('hidden') & headerMarker.classList.remove('hidden') 
      }
    }
    else{
      headerMenu.classList.remove('hidden');
      headerMarker.classList.add('hidden');
      
      headerMenu.style.backgroundColor = 'transparent'
      headerMenu.style.position = 'absolute';
      headerMenu.style.marginTop = '0px'
    }

    prevScrollPos = currentScrollPos;
  });

  document.addEventListener('click', function(event){
      if(!mediaQuery.matches && event.target !== headerMenu && event.target !== headerMarker && window.scrollY > 55){
        headerMenu.classList.add('hidden');
        headerMarker.classList.remove('hidden');
      }   
      else if(!Array.from(spanLinks).includes(event.target) && event.target !== listMenuLinks && event.target !== menuCheckboxLabelIcon && event.target !== menuCheckboxLabel && event.target !== menuCheckbox){
        menuCheckbox.checked = false
      }

  })

  headerMarker.addEventListener('click',function(){
    headerMenu.classList.remove('hidden');
    headerMarker.classList.add('hidden')
  })
  
  // ----------------------------
  // header show and hide (end)
  // ---------------------------- 

  // ----------------------------
  // header items active (start)
  // ---------------------------- 
  
  const observerOptions = {root: null, rootMargin: '0px', threshold: 0.5};
  
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.getAttribute('data-section');
        allLink.forEach(link => {
          if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);
  
  allSection.forEach(section => observer.observe(section));
  
  // ----------------------------
  // header items active (end)
  // ---------------------------- 
  
// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
// -----------------------------HOME SECTION END--------------------------------  
// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-


// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
// ----------------------------MENUS SECTION START-------------------------------  
// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

const previousMenuBtn = document.getElementById('previous-menu-btn');
const nextMenuBtn = document.getElementById('next-menu-btn');
const cardsContainerArr = document.querySelectorAll('.cards-container');

let currentMenuIndex = 1;

const menuTypeContainer = document.getElementById('menutype-slider-container');
const menuTypeArr = ['Breakfast','Beverage','Appetizers','Soups','Salads','Starters','Main Courses','Side Dishes','Desserts'];

function NextMenu(){
  const menuTitleArr = document.querySelectorAll('.menutype')
  const firstMenuTitle = menuTitleArr[0];
  const lastMenuTitle = menuTitleArr[menuTitleArr.length - 1];
  lastMenuTitle.querySelector('h3').textContent = menuTypeArr[currentMenuIndex];
  menuTypeContainer.style.transition = 'margin-left .3s'
  menuTypeContainer.style.marginLeft = '-100%'
  nextMenuBtn.disabled = true;
  previousMenuBtn.disabled = true;
  
  setTimeout(()=>{
    menuTypeContainer.insertAdjacentElement('beforeend', firstMenuTitle);
    menuTypeContainer.style.transition = 'none'
    menuTypeContainer.style.marginLeft = '0%'
    nextMenuBtn.disabled = false;
    previousMenuBtn.disabled = false;
  },300)
}

function PreviousMenu(){
  const menuTitleArr = document.querySelectorAll('.menutype')
  const lastMenuTitle = menuTitleArr[menuTitleArr.length - 1];
  
  lastMenuTitle.querySelector('h3').textContent = menuTypeArr[currentMenuIndex];

  menuTypeContainer.style.transition = 'none'
  menuTypeContainer.style.marginLeft = '-100%'
  menuTypeContainer.insertAdjacentElement('afterbegin', lastMenuTitle)
  nextMenuBtn.disabled = true;
  previousMenuBtn.disabled = true;

  setTimeout(()=>{
    menuTypeContainer.style.transition = 'margin-left .3s'
    menuTypeContainer.style.marginLeft = '0%'

    setTimeout(()=>{
      nextMenuBtn.disabled = false;
      previousMenuBtn.disabled = false;
    },300)
  },10)
  
}

function HideAllCards(){
  cardsContainerArr.forEach((cards)=>{
    cards.style.opacity = 0;
    cards.style.zIndex = '1';
  });
}

function ShowCard(index){
  HideAllCards();
  cardsContainerArr[index].style.opacity = 1;
  cardsContainerArr[index].style.zIndex = 2;
}

previousMenuBtn.addEventListener('click', ()=>{
  currentMenuIndex = (currentMenuIndex + cardsContainerArr.length - 1) % cardsContainerArr.length;
  ShowCard(currentMenuIndex);
  PreviousMenu();
})

nextMenuBtn.addEventListener('click', ()=>{
  currentMenuIndex = (currentMenuIndex + 1) % cardsContainerArr.length;
  ShowCard(currentMenuIndex);
  NextMenu();
});

ShowCard(currentMenuIndex);

// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
// -----------------------------MENUS SECTION END--------------------------------  
// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-


// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
// ----------------------------JAZZ SECTION START-------------------------------  
// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

  const jazzSlider = document.querySelector('.jazz-slider-container');
  const previousJazzBtn = document.getElementById('previous-jazz-btn');
  const nextJazzBtn = document.getElementById('next-jazz-btn'); 

  function Next(){
    const jazzTextArr = document.querySelectorAll('.jazz-text');
    const firstJazzText = jazzTextArr[0]

    jazzSlider.style.transition = 'margin-left .4s'
    jazzSlider.style.marginLeft = '-100%';
    nextJazzBtn.disabled = true;
    nextJazzBtn.disabled = true;

    setTimeout(()=>{
      jazzSlider.style.transition = 'none'
      jazzSlider.style.marginLeft='0'
      jazzSlider.insertAdjacentElement('beforeend', firstJazzText);
      nextJazzBtn.disabled = false;
      nextJazzBtn.disabled = false;
    },400)
  }

  function Previous(){
    let jazzTextArr = document.querySelectorAll('.jazz-text');
    let lastJazzText = jazzTextArr[jazzTextArr.length - 1];
    
    jazzSlider.style.transition = 'none'
    jazzSlider.style.marginLeft = '-100%';
    jazzSlider.insertAdjacentElement('afterbegin', lastJazzText);
    
    previousJazzBtn.disabled = true;
    nextJazzBtn.disabled = true;
    setTimeout(()=>{
      jazzSlider.style.transition = 'margin-left .4s';
      jazzSlider.style.marginLeft = '0';

       setTimeout(()=>{
          previousJazzBtn.disabled = false;
          nextJazzBtn.disabled = false;
       },400)

    },10)
  }
 
nextJazzBtn.addEventListener('click', Next)
previousJazzBtn.addEventListener('click', Previous)



// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
// -----------------------------JAZZ SECTION END--------------------------------  
// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

});


