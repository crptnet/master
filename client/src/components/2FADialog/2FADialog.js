import React, { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

const TwoFADialog = ({triggerElement, content, title, open, setOpen, onSubmit, onCancel }) => {
  
  
  return (<Dialog.Root open={open} onOpenChange={setOpen}>
    <Dialog.Trigger asChild>
        {triggerElement}
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="DialogOverlay" />
      <Dialog.Content className="DialogContent">
        <header className="dialog-title">
          <Dialog.Title></Dialog.Title>
        </header>
        {
          
        }
        <footer className='submit-buttons'>
          <Dialog.Close asChild>
            <button className="submit red" onClick={onCancel}>Close</button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <div>
              <button className="submit green" type="submit" onClick={onSubmit}>Save</button>
            </div>
          </Dialog.Close>
        </footer>
        <Dialog.Close asChild>
          <button className="IconButton" aria-label="Close" onClick={onCancel}>
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>)
};


export default TwoFADialog;
