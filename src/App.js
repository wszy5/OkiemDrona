import React, { useState, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import ScrollToTop from "react-scroll-to-top";
import { photos } from "./pictures";

function App() {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState("Granowo");

  const filteredPhotos = photos.filter(photo => {
    // Assuming each photo object has a tag property
    return photo.tag === selectedTag;
  });

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const handleTagChange = (event) => {
    setSelectedTag(event.target.value);
  };

  return (
    <div>
      <header>
        <h3>Okiem Drona</h3>
        <form action="#">
          <label htmlFor="tag">Kategoria</label>
          <select name="tags" id="tag" value={selectedTag} onChange={handleTagChange}>
            <option value="Granowo">Granowo</option>
            <option value="Kotowo">Kotowo</option>
            <option value="Wozniki">Woźniki</option>
            <option value="Druzyn">Drużyń</option>
            <option value="Strykowo">Strykowo</option>
            <option value="Mrzezyno">Mrzeżyno</option>
          </select>
        </form>
        <img src="https://qklrjrnisciqjcayiznd.supabase.co/storage/v1/object/public/dron/dron.png"></img>
      </header>
      <Gallery photos={filteredPhotos} onClick={openLightbox} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={filteredPhotos.map(x => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
      <ScrollToTop smooth color="grey"/>
    </div>
  );
}

export default App;
