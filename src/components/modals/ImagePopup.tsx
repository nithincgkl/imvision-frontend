import React from "react";
import Lightbox from "react-18-image-lightbox";
import { Dispatch, SetStateAction } from "react";

interface ImagePopupProps {
  images: string[];
  photoIndex: number;
  setPhotoIndex: Dispatch<SetStateAction<number | null>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ImagePopup: React.FC<ImagePopupProps> = ({
  images,
  setIsOpen,
  photoIndex,
  setPhotoIndex,
  isOpen,
}) => {
  return (
    <React.Fragment>
      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
        />
      )}
    </React.Fragment>
  );
};

export default ImagePopup;