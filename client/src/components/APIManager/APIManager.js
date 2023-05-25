import React from 'react';
import './APiManager.css';
import { serverLink } from '../..';
import * as Dialog from '@radix-ui/react-dialog';
import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon, Cross2Icon } from '@radix-ui/react-icons';

const selector = () => {
  // Unused variables, removed to fix the code
  return (
    <Select.Root>
      <Select.Trigger className="select-trigger" >
        <Select.Value placeholder="Select Exchange"/>
        <Select.Icon>
          <ChevronDownIcon/>
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className='exchange-selector-content' position="popper">
          <Select.ScrollUpButton>
            <ChevronUpIcon />  
            </Select.ScrollUpButton>
              <Select.Viewport className="SelectViewport">
                <Select.Item className='select-item'>
                  <Select.ItemText>Binance</Select.ItemText>
                </Select.Item>

                
              </Select.Viewport>
            <Select.ScrollDownButton />
          <Select.Arrow />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

const dialogView = () => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className="api-key-creation-button violet">Add API key</button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="DialogOverlay" />
      <Dialog.Content className="DialogContent">
        <header className="dialog-title">
          <Dialog.Title>API Keys</Dialog.Title>
        </header>
        <div className="dialog-description-container">
          <Dialog.Description className="dialog-description"> 
            If you are unfamiliar with the process, take a look at the <a target="_blank" href="/guide/binance">guide</a>
          </Dialog.Description>
        </div>
        <div className='exchange-selector-container'>
          {selector()}
        </div>

        <div className="field-set-container">
          <fieldset className='field-set'>
            <label className="Label" htmlFor="key">
              Public key
            </label>
            <input className="Input" id="input-api-key" placeholder="public key..." />
          </fieldset>
          <fieldset className='field-set'>
            <label className="Label" htmlFor="key">
              Private key
            </label>
            <input className="Input" id="input-api-key" placeholder="private key..." />
          </fieldset>
        </div>
        <footer className='submit-buttons'>
          <Dialog.Close asChild>
            <button className="submit red">Close</button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <button className="submit green">Save</button>
          </Dialog.Close>
        </footer>
        <Dialog.Close asChild>
          <button className="IconButton" aria-label="Close">
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

const APiManager = ({ onConfirm, onCancel }) => {
  const handleAPIKeyCreation = () => {
    // Function implementation
  };

  return (
    <div className='manager-container'>
      <div className='api-key-creation-container'>
        <div className='api-key-creation-text'>
          Would you like to add one?
        </div>
        <div className='api-key-creation'>
          {dialogView()}
        </div>
      </div>

    </div>
  );
};

export default APiManager;
