import Modal from '../Modal/Modal';
import { ModalContents } from './RulesModal.styled';

const RulesModal = ({ offSwitch, isOpen, ...props }) => {
  return (
    <div {...props}>
      {!!isOpen ? (
        <Modal
          title="Rules Modal"
          isOpen={isOpen}
          withClose
          onClose={offSwitch}
          width={window.innerWidth < 625 ? '100vw' : 625}
          height={window.innerWidth < 625 ? '100%' : 'auto'}
          borderRadius={window.innerWidth < 625 ? 0 : undefined}
        >
          <ModalContents>Something</ModalContents>
        </Modal>
      ) : null}
    </div>
  );
};

export default RulesModal;
