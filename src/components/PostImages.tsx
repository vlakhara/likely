import React, { useState } from "react";

const PostImages: React.FC<{ images: string[]; isLastPage?: boolean }> = ({
  images,
  isLastPage = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full h-[350px] max-w-2xl mx-auto overflow-hidden">
      <div
        className="h-full flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((slide, index) => (
          <div
            key={index}
            className="flex-none w-full h-full px-2 flex items-center justify-center"
          >
            <img
              src={slide}
              alt={index + slide}
              className="object-contain w-full rounded-[12px] h-[90%] mx-auto shadow-md"
            />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <p
          className={`text-white bg-black bg-opacity-50 text-xs absolute px-2 rounded-[12px] tracking-widest ${
            isLastPage ? "top-2" : "bottom-2"
          } right-2 z-[100]`}
        >
          {`${currentIndex + 1}/${images.length}`}
        </p>
      )}
      {currentIndex > 0 && (
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full focus:outline-none"
        >
          ❮
        </button>
      )}
      {currentIndex < images.length - 1 && (
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full focus:outline-none"
        >
          ❯
        </button>
      )}
    </div>
  );
};

export default PostImages;
