import React, { useContext } from 'react';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import '@reach/dialog/styles.css';
import { ModalContext } from '../../context/ModalContext';
import './Modal.css';
import closeIcon from '../../assets/icons/close.svg';

const Modal = ({ imageSrc, imageAlt }) => {
  const { showModal, setShowModal } = useContext(ModalContext);

  const close = () => setShowModal(false);

  return (
    <DialogOverlay
      className='dialog_overlay'
      isOpen={showModal}
      onDismiss={close}
    >
      <DialogContent className='dialog_content'>
        <button onClick={close} className='dialog_close_btn'>
          <img src={closeIcon} alt='close' className='dialog_close_icon' />
        </button>
        <img
          src={imageSrc}
          className='dialog_image'
          alt={imageAlt}
          loading='eager'
        />
      </DialogContent>
    </DialogOverlay>
  );
};

export default Modal;
