const headerEl = document.querySelector("header");
const scrollToTop = document.querySelector(".scrollToTop");
window.addEventListener("scroll", () => {
  let height = headerEl.getBoundingClientRect().height;
  if (window.pageYOffset - height > 800) {
    // 向下滑动距离-本身高度
    if (!headerEl.classList.contains("sticky")) {
      headerEl.classList.add("sticky");
    }
  } else {
    headerEl.classList.remove("sticky");
  }
  if (window.pageYOffset > 2000) {
    scrollToTop.style.display = "block";
  } else {
    scrollToTop.style.display = "none";
  }
});

const glide = new Glide(".glide");
const captionsEl = document.querySelectorAll(".slide-caption");
glide.on(["mount.after", "run.after"], () => {
  const caption = captionsEl[glide.index];
  anime({
    targets: caption.children,
    opacity: [0, 1],
    duration: 400 /*动画执行时间*/,
    easing: "linear",
    delay: anime.stagger(400, {
      start: 300,
    }) /*交错动画，每个元素的延迟增加400毫秒*/,
    translateY: [anime.stagger([40, 10]), 0],
  });
});
glide.on("run.before", () => {
  document.querySelectorAll(".slide-caption >*").forEach((el) => {
    el.style.opacity = 0;
  });
});
glide.mount(); /*加载定义好的轮播组件*/

/* */
const isotope = new Isotope(".cases", {
  layoutMode: "fitRows" /* 行模式布局*/,
  itemSelector: ".case-item",
});
const filterBtns = document.querySelector(".filter-btns");
filterBtns.addEventListener("click", (e) => {
  let { target } = e;
  const filterOption = target.getAttribute("data-filter");
  if (filterOption) {
    document
      .querySelectorAll(".filter-btn.active")
      .forEach((btn) => btn.classList.remove("active"));
    target.classList.add("active");
    isotope.arrange({ filter: filterOption });
  }
});
// 配置项
const staggeringOption = {
  delay: 300,
  distance: "50px",
  duration: 500,
  easing: "ease-in-out",
  origin: "bottom",
};
ScrollReveal().reveal(".feature", { ...staggeringOption, interval: 350 });
const dataSectionEl = document.querySelector(".data-section");

ScrollReveal().reveal(".data-section", {
  beforeReveal: () => {
    anime({
      targets: ".data-piece .num",
      innerHTML: (el) => {
        return [0, el.innerHTML];
      },
      duration: 2000,
      round: 1,
      easing: "easeInExpo", //越来越快
    });
    dataSectionEl.style.backgroundPosition = `center cal(50%-${
      dataSectionEl.getBoundingClientRect().bottom / 5
    }px)`;
  },
});
const scroll = new SmoothScroll('nav a[href*="#"],.scrollToTop a[href*="#"]', {
  header: "header",
  offset: 80,
});
document.addEventListener("scrollStart", () => {
  if (headerEl.classList.contains("open")) {
    headerEl.classList.remove("open");
  }
});
const exploreBtns = document.querySelectorAll(".explore-btn");
exploreBtns.forEach((exploreBtn) => {
  exploreBtn.addEventListener("click", () => {
    scroll.animateScroll(document.querySelector("#about-us"));
  });
});

window.addEventListener("scroll", () => {
  const bottom = dataSectionEl.getBoundingClientRect().bottom;
  const top = dataSectionEl.getBoundingClientRect().top;
  if (bottom >= 0 && top <= window.innerHeight) {
    dataSectionEl.style.backgroundPosition = `center cal(50%-${bottom / 5}px)`;
  }
});
// 折叠按钮
const burgerEl = document.querySelector(".burger");
burgerEl.addEventListener("click", () => {
  headerEl.classList.toggle("open");
});
