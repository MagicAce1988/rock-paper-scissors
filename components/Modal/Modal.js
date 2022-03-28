import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import SwipeListener from 'swipe-listener';
import { useCallback } from 'react';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { StyledIcon } from './Modal.styled';

const Modal = ({
  withClose,
  onClose,
  withTimeoutOnClose,
  isOpen,
  size,
  overflow,
  vertical,
  width,
  height,
  borderRadius,
  noPadding,
  noBorder,
  rightSide,
  ...props
}) => {
  const [notMounted, setNotMounted] = useState(true);

  const onRequestClose = useCallback(() => {
    setNotMounted(true);
    if (withTimeoutOnClose) {
      setTimeout(() => {
        onClose();
      }, 550);
    } else {
      onClose();
    }
  }, [onClose, withTimeoutOnClose]);

  const handlingSwipe = useCallback(
    (e) => {
      var directions = e.detail.directions;
      if (directions.left || directions.right) {
        onRequestClose();
      }
    },
    [onRequestClose]
  );

  useEffect(() => {
    SwipeListener(window, { mouse: false });
    window.addEventListener('swipe', handlingSwipe);
    setTimeout(() => {
      setNotMounted(false);
    });
    return () => {
      setNotMounted(true);
      window.removeEventListener('swipe', handlingSwipe);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const customStyles = (
    size,
    vertical,
    width,
    height,
    overflow,
    borderRadius
  ) => {
    const stringSize = size ? size : 'medium';
    const direction = vertical ? 'vertical' : 'horizontal';
    const sizes = {
      vertical: {
        small: {
          width: '200px',
          height: '300px',
        },
        medium: {
          width: '300px',
          height: '400px',
        },
        large: {
          width: '300px',
          height: '500px',
        },
      },
      horizontal: {
        small: {
          width: '300px',
          height: '200px',
        },
        medium: {
          width: '400px',
          height: '300px',
        },
        large: {
          width: '500px',
          height: '300px',
        },
      },
    };
    return {
      overlay: {
        zIndex: 10000000,
        width: '100vw',
        height: `100vh`,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        margin: 0,
        padding: 0,
        display: 'flex',
        justifyContent: rightSide ? 'flex-end' : 'center',
        alignItems: 'center',
      },
      content: {
        position: 'relative',
        boxSizing: 'border-box',
        width: width
          ? typeof width === 'string'
            ? width
            : `${width}px`
          : sizes[direction][stringSize].width,
        height: height
          ? typeof height === 'string'
            ? height
            : `${height}px`
          : sizes[direction][stringSize].height,
        top: 'initial',
        left: 'initial',
        right: 'initial',
        bottom: 'initial',
        transform:
          rightSide && notMounted ? `translateX(100%)` : `translateX(0)`,
        WebkitTransform:
          rightSide && notMounted
            ? `-webkit-translateX(100%)`
            : `-webkit-translateX(0)`,
        msTransform:
          rightSide && notMounted ? `translateX(100%)` : `translateX(0)`,
        MozTransform:
          rightSide && notMounted ? `translateX(100%)` : `translateX(0)`,
        OTransform:
          rightSide && notMounted ? `translateX(100%)` : `translateX(0)`,
        border: noBorder ? 'none' : `1px solid rgba(46, 71, 110, 0.09)`,
        overflow: overflow ? overflow : 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius:
          borderRadius || borderRadius === 0 ? `${borderRadius}px` : '8px',
        boxShadow: `0px 5px 15px rgba(0,0,0,0.09)`,
        outline: 'none',
        padding: noPadding ? 0 : '30px',
        transition: 'transform 0.4s ease-in-out',
      },
    };
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true}
      style={customStyles(
        size,
        vertical,
        width,
        height,
        overflow,
        borderRadius
      )}
      {...props}
    >
      {props.children}
      <StyledIcon icon={faClose} width={32} onClick={onRequestClose} />
    </ReactModal>
  );
};

export default Modal;
