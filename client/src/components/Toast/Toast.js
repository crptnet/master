import * as Toast from '@radix-ui/react-toast';
/**
 * 
 * 
 * 
 */
const ShowToast = ({open, setOpen, message, type}) => {
    return (
        <>
        {type == 'error' ? 
            <Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
            <div className="toast error-toast">
                <div className="toast-icon error-toast">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 2a10 10 0 0 0-9.95 9H2v2h.05A10 10 0 0 0 12 22a10 10 0 0 0 9.95-9h.05v-2h-.05A10 10 0 0 0 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
                </div>
                <div className="toast-content">
                <p>Error</p>
                <Toast.Title className="ToastTitle" as="p">{message}</Toast.Title>
                </div>
            </div>
            </Toast.Root>
            :
            (<Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
            <div className="toast success">
                <div className="toast-icon success">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green">
                    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                </svg>
                </div>
                <div className="toast-content">
                <p>Success</p>
                <Toast.Title className="ToastTitle" as="p">{message}</Toast.Title>
                {/* <p class="toast-message">Success! Your action was completed.</p> */}
                </div>
            </div>
            </Toast.Root>
            )
            }
            <Toast.Viewport className="ToastViewport" />
        </>
    )
}

export {ShowToast}