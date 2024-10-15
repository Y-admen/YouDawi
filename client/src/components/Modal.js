import React from "react";

const Modal = ({ isVisible, onClose, content, title }) => {
  // Close the modal when clicking outside of it
  const handleOverlayClick = (e) => {
    if (e.target.id === "modalOverlay") {
      onClose();
    }
  };

  if (!isVisible) return null; // If modal is not visible, return null

  return (
    <div
      id="modalOverlay"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full relative p-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>

        {/* Modal Title */}
        <h2 className="text-2xl font-semibold mb-4">
          {title || 'Default Modal Title'}
        </h2>

        {/* Modal Content */}
        <div className="modal-content">
          {content || <p>This is the default content of the modal.</p>}
        </div>
      </div>
    </div>
  );
};

export default Modal;
