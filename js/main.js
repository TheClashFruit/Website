const $ = _ => document.querySelector(_);

const toggleNavBar = () => {
  const navBarCollapse = $('.navCollapse');
  const navBar         = $('.navBar');

  navBar.classList.toggle('navBarScrolled');

  if(navBarCollapse.classList.contains('open')) {
    navBarCollapse.style.opacity = '0%';
    setTimeout(_ => navBarCollapse.classList.toggle('open'), 200);
  } else {
    navBarCollapse.classList.toggle('open')
    navBarCollapse.style.opacity = '100%';
  }
}

document.addEventListener('scroll', function(e) {
  console.log(window.scrollY);

  if(window.scrollY <= 30) {
    $('.navBar').setAttribute('class', 'navBar');
  } else {
    $('.navBar').setAttribute('class', 'navBar navBarScrolled');
  }
});