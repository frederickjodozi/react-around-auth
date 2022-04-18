import { useEffect } from 'react';

function Popup({
  type, isOpen, card, onClose, children,
}) {
  // Close Popup by pressing Escape //
  useEffect(() => {
    if (!isOpen && !card) return;

    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', closeByEscape);
    return () => document.removeEventListener('keydown', closeByEscape);
  }, [isOpen, card, onClose]);

  // Close Popup by clicking the Overlay //
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={`modal modal_type_${type} ${card || isOpen ? 'modal_open' : ''}`} onClick={handleOverlay}>
      {children}
    </div>
  );
}

export default Popup;
