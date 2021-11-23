import { FC, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ButtonClose from "shared/ButtonClose/ButtonClose";

export interface ModalPhotosProps {
  onClose: () => void;
  isOpen: boolean;
  initFocus: string;
}

const ModalBus: FC<ModalPhotosProps> = ({ isOpen, onClose, initFocus }) => {
  //   useEffect(() => {
  //     setindexActive(initFocus);
  //   }, [initFocus]);

  const renderModalPhotos = () => {
    return (
      <Transition
        appear
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        show={isOpen}
        as={Fragment}
      >
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={onClose}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-white dark:bg-neutral-800" />
            </Transition.Child>
            <div className="absolute left-2 top-2 md:top-4 md:left-4">
              <ButtonClose className=" w-11 h-11" onClick={onClose} />
            </div>
            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="relative inline-block w-full max-w-5xl my-8 align-middle ">
              Bus Bus Bus
              {initFocus}
            </div>
          </div>
        </Dialog>
      </Transition>
    );
  };

  return renderModalPhotos();
};

export default ModalBus;
