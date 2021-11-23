import { FC, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import GallerySlider from "components/GallerySlider/GallerySlider";
import Badge from "shared/Badge/Badge";
import moment from "moment";

import OneWayIcon from "images/extra/one-way.svg";

export interface PropertyCardHProps {
  className?: string;
  data?: any;
}

const BusReturnDateProperty: FC<PropertyCardHProps> = ({
  className = "",
  data,
}) => {
  const { _id, images, AC, model, numOfSeats, name, fare, depTime, arrTime } =
    data;

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const renderSliderGallery = () => {
    return (
      <div className="flex-shrink-0 p-3 w-full h-full sm:w-64 ">
        <GallerySlider
          ratioClass="aspect-w-1 aspect-h-1"
          galleryImgs={images}
          className="w-full h-full rounded-2xl overflow-hidden"
        />
      </div>
    );
  };

  const renderTienIch = () => {
    return (
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <span className="hidden sm:inline-block">
            <i className="las la-bed text-lg"></i>
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            <div className="text-center font-semibold">Departure</div>
            {moment(depTime).format("h:mm a")}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            <img src={OneWayIcon} alt="One Way Icon" className="w-10 h-auto" />
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="hidden sm:inline-block">
            <i className="las la-expand-arrows-alt text-lg"></i>
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            <div className="text-center font-semibold">Arrival</div>
            {moment(arrTime).format("h:mm a")}
          </span>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className="flex-grow p-3 sm:pr-6 flex flex-col items-start">
        <div className="space-y-4 w-full">
          <div className="inline-flex space-x-3">
            <Badge
              name={
                <div className="flex items-center">
                  <i className="text-sm las la-user-friends"></i>
                  <span className="ml-1">{model}</span>
                </div>
              }
              color="yellow"
            />
            <Badge
              name={
                <div className="flex items-center">
                  <i className="text-sm las la-share-alt"></i>
                  <span className="ml-1">{numOfSeats} Seats</span>
                </div>
              }
            />

            {AC && (
              <Badge
                name={
                  <div className="flex items-center">
                    <i className="text-sm las la-user-friends"></i>
                    <span className="ml-1">AC</span>
                  </div>
                }
                color="yellow"
              />
            )}
          </div>
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-medium capitalize">
              <span className="line-clamp-2">{name}</span>
            </h2>
          </div>
          {renderTienIch()}
          <div className="w-14 border-b border-neutral-100 dark:border-neutral-800 "></div>
          <div className="flex w-full justify-between items-end">
            <span className="flex items-center justify-center px-3 py-2 border border-primary-6000 rounded leading-none text-base font-medium text-primary-6000">
              {`BDT ${fare}.000`}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-PropertyCardH group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-3xl overflow-hidden hover:shadow-xl transition-shadow ${className}`}
      data-nc-id="PropertyCardH"
    >
      <div className="h-full w-full flex flex-col sm:flex-row sm:items-center cursor-pointer">
        {renderSliderGallery()}
        <div onClick={openModal} className="cursor-pointer">
          {renderContent()}
        </div>
      </div>

      {/* These codes are used for modal */}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
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
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Payment successful
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Your payment has been successfully submitted. We’ve sent you
                    an email with all of the details of your order.
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Got it, thanks!
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default BusReturnDateProperty;
