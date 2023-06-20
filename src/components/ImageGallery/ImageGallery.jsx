import ImageGalleryItem from 'components/ImageGalleryItem';
import { GalleryContainer } from './ImageGallery.styled';
import Modal from 'components/Modal/Modal';
import { useEffect, useRef, useState } from 'react';

function ImageGallery({ image, getRef }) {
  const [modal, setModal] = useState(false);
  const [urlImage, setUrlImage] = useState('');

  const ref = useRef();

  useEffect(() => {
    getRef(ref);
    return () => window.addEventListener('keydown', closeModal);
  }, [modal, getRef]);

  const openModal = ({ target }) => {
    const url = target.dataset.largeImg;
    setModal(true);
    setUrlImage(url);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = e => {
    const { target } = e;

    if (e.code === 'Escape') {
      setModal(false);
      document.body.style.overflow = 'visible';
      return;
    }

    if (!target.dataset.backdrop) {
      return;
    }

    setModal(false);
    document.body.style.overflow = 'visible';
  };

  return (
    <>
      <GalleryContainer ref={ref}>
        {image.map(item => (
          <ImageGalleryItem key={item.id} item={item} openModal={openModal} />
        ))}
      </GalleryContainer>
      {modal && <Modal urlImage={urlImage} closeModal={closeModal} />}
    </>
  );
}

export default ImageGallery;
