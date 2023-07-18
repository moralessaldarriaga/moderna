import $ from 'jquery';
import 'slick-carousel';
import 'simplelightbox/dist/simple-lightbox';
import 'simplelightbox/src/simple-lightbox.scss';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';

// window.SimpleLightbox = SimpleLightbox;

export const init = () => {
    $(function() {

        const input = document.querySelector("#phone");

        if (input !== null) {
            intlTelInput(input, {
                initialCountry: 'auto',
                separateDialCode: true,
                geoIpLookup: callback => {
                    fetch("https://ipapi.co/json")
                        .then(res => res.json())
                        .then(data => callback(data.country_code))
                        .catch(() => callback("us"));
                },
            });
        }

        const closeReferreds = () => {
            $('.form_custom_data').on('click', '.form_custom_data_close', function() {
                console.log($(this)); // $(this) se refiere al botón "x" que disparó el evento
                $(this).closest('.form_custom_data_item').remove(); // Eliminar el elemento padre que contiene el botón "x"
            });
        }

        const addReferreds = () => {
            const btn = $('#addCustomReferred');
            const targetElement = $('.form_custom_data');

            btn.on('click', (e) => {
                e.preventDefault();
                const name = $('#nameReferred').val();
                const fullName = $('#fullNameReferred').val();
                const nDocument = $('#numberDocumentReferred').val();

                const htmlReferred = `<div class="form_custom_data_item" data-name="${name}" data-fullname="${fullName}" data-document="${nDocument}">${name} ${fullName} <div class="form_custom_data_close">x</div></div>`;
                const htmlReferredElement = $(htmlReferred);

                $('.form_custom_label').removeClass('active');
                targetElement.addClass('active');
                htmlReferredElement.appendTo(targetElement);

            });
        }

        const validCustomInputs = () => {
            const $inputs = $('.form_control__custom');
            const $button = $('#addCustomReferred');
          
            const checkInputs = () => {
              let allFilled = true;
              $inputs.each((index, element) => {
                if ($(element).val() === '') {
                  allFilled = false;
                  return false; // Para salir del bucle each si algún campo está vacío
                }
              });
          
              // Agregar o eliminar la clase "disabled" en el botón según si todos los campos están llenos
              if (allFilled) {
                $button.addClass('active');
              } else {
                $button.removeClass('active');
              }
            };
          
            // Vincular el evento input a la función checkInputs
            $inputs.on('input', checkInputs);
        };

        const addInputsInForm = () => {
            const btnAddReferred = $('#addReferred');
        
            btnAddReferred.on('click', () => {
              $('.form_custom_label').addClass('active');
            //   validCustomInputs(); // Verificar los campos al mostrar el elemento
            //   addReferreds();
            });
        };
          
        const slickLightBox = () => {

            const gallery = $('.gallery__js');
            const galleryItem = $('.gallery_photo_item');

            gallery.slick({
                dots: false,
                arrow: true,
                infinite: false
            })

            galleryItem.each(function() {
                const imageUrl = $(this).find('.gallery_photo_item_src').attr('src');
                $(this).attr('data-src', imageUrl);
            });

            const lightbox = new SimpleLightbox('.gallery_photo_item', {
                sourceAttr: 'data-src',
            });

            // const lightbox = new SimpleLightbox('.gallery_photo_item', {
            //     // sourceAttr: 'data-src',
            //     captionsData: (el) => el.querySelector('img').src,
            // });

            let totalSlides = gallery.slick('getSlick').slideCount;

            const updateCounter = (currentSlide) => {
                const currentPosition = currentSlide + 1;
                $('.gallery_counter').text(`${currentPosition}/${totalSlides}`);
              };

            updateCounter(gallery.slick('slickCurrentSlide'));

            gallery.on('afterChange', (event, slick, currentSlide) => {
                updateCounter(currentSlide);
            });
        }

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

        const menu = () => {
            $('.menu_actions_open').on('click', () => {
                $('.menu_actions_open').addClass('menu_actions__hide');
                $('.menu_actions_close').removeClass('menu_actions__hide');

                $('.nav').fadeIn('slow');
            });

            $('.menu_actions_close').on('click', () => {
                $('.menu_actions_close').addClass('menu_actions__hide');
                $('.menu_actions_open').removeClass('menu_actions__hide');

                $('.nav').fadeOut('slow');
            });
        }

        slickLightBox();
        sliderBanner();
        addInputsInForm();
        validCustomInputs(); // Verificar los campos al mostrar el elemento
        addReferreds();
        closeReferreds();
        menu();
    });
}