import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import fact1 from '../assets/fact1.jpg';
import fact2 from '../assets/fact2.jpg';
import fact3 from '../assets/fact3.jpg';
const ImageCarousel = () => {
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      drag: true,
      rtl: true,
      slides: {
        perView: 1,
        spacing: 20,
      },
      breakpoints: {
        '(min-width: 1100px)': {
            slides: {
                perView: 2,
                spacing: 20,
            },
        },
      },
    },
    [
      (slider) => {
        let timeout
        let mouseOver = false
        function clearNextTimeout() {
          clearTimeout(timeout)
        }
        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 15000)
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on("dragStarted", clearNextTimeout)
        slider.on("animationEnded", nextTimeout)
        slider.on("updated", nextTimeout)
      },
    ]
  )

  return (
    <>
        <div ref={sliderRef} className="keen-slider overflow-hidden">
            <img className="keen-slider__slide number-slide1 object-cover rounded-lg" src={fact1} alt="" />
            <img className="keen-slider__slide number-slide2 object-cover rounded-lg"  src={fact2} alt="" />
            <img className="keen-slider__slide number-slide3 object-cover rounded-lg" src={fact3} alt="" />
        </div>
      
    </>
  )
};

export default ImageCarousel;