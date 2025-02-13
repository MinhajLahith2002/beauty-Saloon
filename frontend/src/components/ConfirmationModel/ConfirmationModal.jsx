import { FaCheckCircle } from 'react-icons/fa';
import './ConfirmationModal.css';

const ConfirmationModal = ({ onConfirm, onCancel, service, date, time }) => {
  return (
    <div className="modal-overlay">
      <div className="confirmation-modal">
        <div className="modal-header">
          <FaCheckCircle className="modal-icon" />
          <h2>Confirm Your Booking</h2>
        </div>
        
        <div className="modal-content">
          <p>Are you sure you want to book this appointment?</p>
          
          <div className="booking-details">
            <p><strong>Service:</strong> {service}</p>
            <p><strong>Date:</strong> {date} </p>
            <p><strong>Time:</strong> {time} </p>
          </div>

          <div className="modal-actions">
            <button 
              className="confirm-button"
              onClick={onConfirm}
              
            >
              Confirm
            </button>
            <button 
              className="cancel-button"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;