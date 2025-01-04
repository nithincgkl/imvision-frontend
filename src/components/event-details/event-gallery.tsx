import type { NextPage } from "next";
import { useState, useEffect, useCallback } from "react";
import axios from "axios"; // Import axios
import style from "./style.module.css";
import ImagePopup from "../modals/ImagePopup";
import Loader from "../common/Loader";

interface Image {
  id: number;
  url: string;
  title: string;
  height?: number;
}
interface EventGalleryProps {
  slug?: string;
}
const EventGallery: NextPage<EventGalleryProps> = ({ slug }) => {
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}events?title=${slug}&limit=10`, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        });

        // Assuming the images are in response.data.data and you want to extract the images
        const fetchedImages = response.data.products.map((event: any) => ({
          id: event.id,
          url: event.thumbnail?.url || event.images[0]?.url || "assets/images/fallback.jpg", // Fallback if no image
          title: event.title,
        }));

        setImages(fetchedImages);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data.data || 'An error occurred');
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

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

  if (loading) return <div
    className="w-100 h-100 d-flex align-items-center justify-content-center"
  >
    <Loader size={100} />
  </div>;
  if (error) return <div>Error loading images: {error}</div>;

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