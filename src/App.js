import './App.css';
import Button from './button';
import Modal from './modal';
import React, { useState } from 'react';
import Segment from './segment';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClick}>Save Segment</Button>
      {isModalOpen && (
        <Modal onBack={handleCloseModal} title="Saving Segment">
          <Segment closeModal={handleCloseModal}/>
        </Modal>
      )}
    </div>
  );
}

export default App;
