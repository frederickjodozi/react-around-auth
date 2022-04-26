import Popup from './Popup';
import authSuccessLogo from '../images/infoToolTip__success.svg';
import authFailureLogo from '../images/infoToolTip__fail.svg';

function InfoToolTip({ isOpen, onClose, status }) {
  return (
    <Popup type='form' isOpen={isOpen} onClose={onClose}>
      <div className='modal__box modal__box_type_info-tooltip'>
        { status === ('success') ? (
          <>
            <img className='modal__auth-logo' src={authSuccessLogo} alt='Authorization Success' />
            <p className='modal__auth-message'>Success! You have now been registered!</p>
          </>
        ) : (
          <>
            <img className='modal__auth-logo' src={authFailureLogo} alt='Authorization Failure' />
            <p className='modal__auth-message'>Oops, something went wrong! Please try again.</p>
          </>
        ) }
        <button className='modal__close-button modal__close-button_type_info-tooltip' type='button' aria-label='close' onClick={onClose}/>
      </div>
    </Popup>
  );
}

export default InfoToolTip;
