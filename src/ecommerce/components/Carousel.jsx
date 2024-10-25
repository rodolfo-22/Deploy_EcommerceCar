import React, { useState, useEffect } from "react";

const Carousel = () => {
  const images = [
    "/img1.jpg", // Asegúrate de poner las rutas correctas de tus imágenes aquí
    "/img2.jpg",
    "/img3.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    const handleAutoPlay = () => {
      goToNext();
    };

    const interval = setInterval(handleAutoPlay, 2000); // Cambiar cada 3 segundos
    return () => {
      clearInterval(interval); // Limpiar intervalo para evitar duplicados
    };
  }, [currentIndex]); // Dependencia en el currentIndex para actualizarse correctamente

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setAutoPlay(false); // Detener autoplay al interactuar manualmente
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setAutoPlay(false); // Detener autoplay al interactuar manualmente
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setAutoPlay(false); // Detener autoplay al interactuar manualmente
  };

  return (
    <div className="relative w-full h-[60vh] max-w-full">
      {/* Imágenes del carrusel */}
      <div className="w-full h-full overflow-hidden">
        <img
          src={images[currentIndex]}
          alt="Slide"
          className="w-full h-full object-cover transition-opacity duration-500"
        />
      </div>

      {/* Botón izquierda */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        onClick={goToPrevious}
      >
        &#10094;
      </button>

      {/* Botón derecha */}
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        onClick={goToNext}
      >
        &#10095;
      </button>

      {/* Indicadores de imágenes */}
      <div className="flex justify-center mt-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 mx-2 rounded-full ${
              index === currentIndex ? "bg-red-500" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
