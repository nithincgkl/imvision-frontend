import type { NextPage } from "next";
import { useState, useCallback } from "react";
import style from "./style.module.css";
import ImagePopup from "../modals/ImagePopup";

interface Image {
  id: number;
  url: string;
  title: string;
  height?: number;
}

const EventGallery: NextPage = () => {
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState<Image[]>([
    { id: 1, url: "assets/images/events-details/01.jpg", title: "Title 1" },
    { id: 2, url: "assets/images/events-details/02.jpg", title: "Title 2" },
    { id: 3, url: "assets/images/events-details/03.jpg", title: "Title 3" },
    { id: 4, url: "assets/images/events-details/04.jpg", title: "Title 4" },
    { id: 5, url: "assets/images/events-details/05.jpg", title: "Title 5" },
    { id: 6, url: "assets/images/events-details/01.jpg", title: "Title 6" },
    { id: 7, url: "assets/images/events-details/02.jpg", title: "Title 7" },
    { id: 8, url: "assets/images/events-details/03.jpg", title: "Title 8" },
    { id: 9, url: "assets/images/events-details/04.jpg", title: "Title 9" },
  ]);

  const handleImageLoad = useCallback((id: number, height: number) => {
    setImages((prevImages) =>
      prevImages.map((img) => (img.id === id ? { ...img, height } : img))
    );
  }, []);

  const handleImagePopup = useCallback((index: number) => {
    setPhotoIndex(index);
    setIsOpen(true);
  }, []);

  const imageUrls = images.map((image) => image.url);

  return (
    <div className={style.pageWrapper}>
      <div className={style.galleryContainer}>
        <div className={style.masonryContainer}>
          <div className={style.masonryGrid}>
            {images.map((image, index) => (
              <button
                key={image.id}
                className={style.masonryItem}
                onClick={() => handleImagePopup(index)}
                aria-label={`Open image ${image.title}`}
              >
                <div className={style.masonryContent}>
                  <img
                    src={image.url}
                    alt={image.title}
                    className={style.masonryImage}
                    loading="lazy"
                    onLoad={(e) => {
                      const img = e.target as HTMLImageElement;
                      handleImageLoad(image.id, img.naturalHeight);
                    }}
                    onError={(e) =>
                      ((e.target as HTMLImageElement).src =
                        "assets/images/fallback.jpg")
                    }
                  />
                  <div className={style.overlay}>
                    <h4>{image.title}</h4>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {isOpen && photoIndex !== null && (
        <ImagePopup
          images={imageUrls}
          photoIndex={photoIndex}
          setPhotoIndex={setPhotoIndex}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
};

export default EventGallery;
