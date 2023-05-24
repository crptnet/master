import React from 'react';
import './APiManager.css'
import { serverLink } from '../..';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
const selector = () => {
    
    return   <Select.Root>
    <Select.Trigger>
      <Select.Value />
      <Select.Icon />
    </Select.Trigger>

    <Select.Portal>
      <Select.Content>
        <Select.ScrollUpButton />
        <Select.Viewport>
          <Select.Item>
            <Select.ItemText />
            <Select.ItemIndicator />
          </Select.Item>

          <Select.Group>
            <Select.Label />
            <Select.Item>
              <Select.ItemText />
              <Select.ItemIndicator />
            </Select.Item>
          </Select.Group>

          <Select.Separator />
        </Select.Viewport>
        <Select.ScrollDownButton />
        <Select.Arrow />
      </Select.Content>
    </Select.Portal>
  </Select.Root>

}

const dialogView = () => {
    return  <AlertDialog.Root>
    <AlertDialog.Trigger asChild>
        <button className="Button violet">Add API Key</button>
        </AlertDialog.Trigger>

        <AlertDialog.Portal>
        <AlertDialog.Overlay className="AlertDialogOverlay" />
        <AlertDialog.Content className="AlertDialogContent">
                <div className="x-button">
                    <AlertDialog.Title className="AlertDialogTitle">API key creation</AlertDialog.Title>
                    <AlertDialog.Cancel asChild>
                        <button><img src={`${serverLink}upload/x-square.svg`}></img></button>
                    </AlertDialog.Cancel>
                </div>
            <div style={{padding : '10px'}}>
                <AlertDialog.Description className="AlertDialogDescription">
                If you are unfamiliar with the process take a look at the <a className='guide-lines' target="_blank" href="/guide/binance">guide</a>
                </AlertDialog.Description>
            </div>
            <div>
                {selector()}
            </div>
            <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
                <AlertDialog.Cancel asChild>
                    <button className="Button mauve">Cancel</button>
                </AlertDialog.Cancel>
                <AlertDialog.Action asChild>
                    <button className="Button red">Yes, delete account</button>
                </AlertDialog.Action>
            </div>
        </AlertDialog.Content>
        </AlertDialog.Portal>
    </AlertDialog.Root>
}


const APiManager = ({ onConfirm, onCancel }) => {
    const handleAPIKeyCreation = () => {

    }

    return (
    <div className='manager-container'>
        <div className='container-label'></div>
        <div className='api-key-creation-container'>
            <div className='api-key-creation-text'>
                Would you like to add one?
            </div>
            <div className='api-key-creation-button'>
                {dialogView()}
            </div>
        </div>
        <div className='container-label'></div>
        <div className='api-keys-view'>
            <table className='api-keys-table'>

            </table>

        </div>
    </div>
  );
};

export default APiManager;
