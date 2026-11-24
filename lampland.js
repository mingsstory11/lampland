// 히어로 자동 슬라이드
const heroSlides = document.querySelectorAll(".hero-slide");
const heroCaptions = document.querySelectorAll(".hero-copy .hero-caption");
const heroCopy = document.querySelector(".hero-copy");
const hero = document.querySelector(".hero");
const heroButtons = document.querySelectorAll(".hero-dots button");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let currentHero = 0;
let heroTimer;

function showHero(index) {
  currentHero = index;
  heroCopy.classList.toggle("is-left", index === 2 || index === 3); //위치변경//
  hero.classList.toggle("is-third", index === 2); //글자색변경//

  heroSlides.forEach((slide, slideIndex) => {
  heroCaptions.forEach((caption, captionIndex) => {
  caption.hidden = captionIndex !== index;
});
    slide.classList.toggle("is-active", slideIndex === index);
  });

  heroButtons.forEach((button, buttonIndex) => {
    const isCurrent = buttonIndex === index;

    if (isCurrent) {
      button.setAttribute("aria-current", "true");
    } else {
      button.removeAttribute("aria-current");
    }

    button.querySelector("img").src = isCurrent
      ? "images/hero-now.png"
      : "images/hero-next.png";
  });
}

function restartHeroTimer() {
  clearInterval(heroTimer);

  if (heroSlides.length < 2 || reduceMotion.matches) return;

  heroTimer = setInterval(() => {
    const nextHero = (currentHero + 1) % heroSlides.length;
    showHero(nextHero);
  }, 3500);
}

heroButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    showHero(index);
    restartHeroTimer();
  });
});

reduceMotion.addEventListener("change", restartHeroTimer);
restartHeroTimer();
// 히어로 끝






$(document).ready(function(){



  $(".tab-menu li").click(function(){
        let num = $(this).index();

        $(".tab-menu li").removeClass("active");
        $(this).addClass("active");

        $(".tab-content > li").hide();
        $(".tab-content > li").eq(num).show();


      });






  $(".cont5-tab li").click(function(){
        let num = $(this).index();

        $(".cont5-tab li").removeClass("active");
        $(this).addClass("active");

        $(".best-tab > li").hide();
        $(".best-tab > li").eq(num).show();


      });




          $(window).scroll(function(){
        let scrollTop = $(window).scrollTop(); //현재 스크롤된 양을 가져온다.

        if(scrollTop >= 100){
          $(".top-btn").stop().fadeIn(100);
        }else{
          $(".top-btn").stop().fadeOut(100);
        }
      });




      $(".top-btn").click(function(){
        $('html, body').stop().animate({scrollTop : 0}, 500);
      });








})

const moodCarousel = document.querySelector(".cont4 .carosel");
const moodTrack = document.querySelector(".cont4 .wrap");
const moodCards = [...moodTrack.querySelectorAll(".mood-card")];
const moodProgress = document.querySelector(".mood-progress > span");
const moodPrev = document.querySelector(".mood-prev");
const moodNext = document.querySelector(".mood-next");
const moodMobile = window.matchMedia("(max-width: 360px)");

let moodPages = [];
let moodPage = 0;

function showMoodPage() {
  const offset = moodMobile.matches ? 0 : -moodPage * 100;

  moodTrack.style.transform = `translateX(${offset}%)`;
  moodProgress.style.width =
    `${((moodPage + 1) / moodPages.length) * 100}%`;

  moodPrev.disabled = moodPage === 0;
  moodNext.disabled = moodPage === moodPages.length - 1;
}

function groupMoodCards() {
  const cardsPerPage = moodMobile.matches ? 2 : 3;
  moodPages = [];

  for (let i = 0; i < moodCards.length; i += cardsPerPage) {
    const page = document.createElement("li");
    const list = document.createElement("ul");

    page.className = "mood";
    list.append(...moodCards.slice(i, i + cardsPerPage));
    page.append(list);
    moodPages.push(page);
  }

  moodTrack.replaceChildren(...moodPages);
  moodCarousel.scrollLeft = 0;
  moodPage = 0;

  moodPrev.setAttribute("aria-label", `이전 카드 ${cardsPerPage}장`);
  moodNext.setAttribute("aria-label", `다음 카드 ${cardsPerPage}장`);

  showMoodPage();
}

moodNext.addEventListener("click", () => {
  moodPage = Math.min(moodPage + 1, moodPages.length - 1);
  showMoodPage();
});

moodPrev.addEventListener("click", () => {
  moodPage = Math.max(moodPage - 1, 0);
  showMoodPage();
});

moodMobile.addEventListener("change", groupMoodCards);

groupMoodCards();




