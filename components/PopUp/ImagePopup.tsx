import React, { useState } from 'react';
import Modal from 'react-modal';

interface ImagePopupProps {
  imageUrl: string;
}

const ImagePopup: React.FC<ImagePopupProps> = ({ imageUrl }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpen}>ARで見る</button>
      <Modal
        isOpen={isOpen}
        onRequestClose={handleClose}
        contentLabel="Image Popup"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: 'none',
            border: 'none'
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }
        }}
      >
        <img src={imageUrl} alt="ポップアップ画像" style={{ maxWidth: '100%', maxHeight: '80vh' }} />
        <button onClick={handleClose}>閉じる</button>
      </Modal>
    </div>
  );
};

export default ImagePopup;
