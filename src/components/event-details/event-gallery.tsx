import type { NextPage } from 'next'
import style from "./style.module.css";

interface Image {
  id: number
  url: string
  title: string
}

const EventGallery: NextPage = () => {
  // Reduced to just 3 images for a single row
  const images: Image[] = [
    { id: 1, url: "assets/images/post/01.jpg", title: "Title 1" },
    { id: 2, url: "assets/images/post/02.jpg", title: "Title 2" },
    { id: 3, url: "assets/images/post/03.jpg", title: "Title 3" },
    { id: 4, url: "assets/images/post/04.jpg", title: "Title 4" },
    { id: 5, url: "assets/images/post/05.jpg", title: "Title 5" },
    { id: 6, url: "assets/images/post/01.jpg", title: "Title 6" },
    { id: 7, url: "assets/images/post/02.jpg", title: "Title 7" },
    { id: 8, url: "assets/images/post/03.jpg", title: "Title 8" },
    { id: 8, url: "assets/images/post/04.jpg", title: "Title 8" },
  ]

  return (
    <div className="container py-4">
   
      
      <div className="row">
        {images.map((image) => (
          <div key={image.id} className="col-4">
            <div className={`card ${style.galleryCard}`}>
              <div className={style.imageContainer}>
                <img
                  src={image.url}
                  alt={image.title}
                  className={style.galleryImage}
                />
                <div className={style.overlay}>
                  <h className="text-white p-3">{image.title}</h>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EventGallery