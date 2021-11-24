import { FC, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ButtonClose from "shared/ButtonClose/ButtonClose";

export interface ModalPhotosProps {
  onClose: () => void;
  isOpen: boolean;
  initFocus: string;
  contentExtraClass?: string;
  contentPaddingClass?: string;
}

const ModalBus: FC<ModalPhotosProps> = ({
  isOpen,
  onClose,
  initFocus,
  contentExtraClass = "max-w-screen-xl",
  contentPaddingClass = "py-4 px-6 md:py-5",
}) => {
  const renderContent = () => {
    return <div>Bus {initFocus}</div>;
  };

  return (
    <div className="nc-NcModal">
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={onClose}
        >
          <div className="min-h-screen px-1 text-center md:px-4">
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
            {/* <div className="absolute left-2 top-2 md:top-4 md:left-4">
                <ButtonClose className=" w-11 h-11" onClick={onClose} />
              </div> */}
            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-75"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-75"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div
                className={`inline-block w-full my-5 overflow-hidden text-left align-middle transition-all transform bg-white border border-black border-opacity-5 shadow-xl rounded-2xl sm:my-8 dark:bg-neutral-800 dark:border-neutral-700 text-neutral-900 dark:text-neutral-300 ${contentExtraClass}`}
              >
                <div className="py-4 px-6 text-center relative border-b border-neutral-100 dark:border-neutral-700 md:py-5">
                  <ButtonClose
                    onClick={onClose}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 sm:left-4"
                  />

                  <Dialog.Title
                    as="h3"
                    className="text-base font-semibold text-neutral-900 lg:text-xl dark:text-neutral-200 mx-10"
                  >
                    Please! Select Bus Seats
                  </Dialog.Title>
                </div>
                <div className={contentPaddingClass}>{renderContent()}</div>
              </div>
            </Transition.Child>

            {/* <div className="relative inline-block w-full max-w-5xl my-8 align-middle ">
                Bus Bus Bus
                {initFocus}
              </div> */}
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ModalBus;
