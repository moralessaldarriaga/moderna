import $ from 'jquery';
import 'slick-carousel';

export const init = () => {
  $(document).ready(function() {

    const sliderBanner = () => {
        $('.banner__js').slick({
            dots: false,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 4000,
            infinite: true,
            speed: 500,
            fade: true,
            cssEase: 'linear'
        });
    }

    sliderBanner();
  });
}