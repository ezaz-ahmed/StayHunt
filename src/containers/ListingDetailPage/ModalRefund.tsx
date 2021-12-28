import { FC, Fragment, useEffect, useState } from "react";
import { Dialog, Transition, Tab } from "@headlessui/react";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import Label from "components/Label/Label";
import Input from "shared/Input/Input";
import Textarea from "shared/Textarea/Textarea";
import ButtonPrimary from 'shared/Button/ButtonPrimary';


export interface ModalRefundProps {
    isOpen: boolean;
    bookingId: string;
    onClose: () => void;
    contentExtraClass?: string;
    contentPaddingClass?: string;
}

const ModalRefund: FC<ModalRefundProps> = ({
    isOpen,
    onClose,
    bookingId,
    contentExtraClass = "max-w-screen-md",
    contentPaddingClass = "py-4 px-6 md:py-5",
}) => {

    const renderSection1 = () => {
        return (
            <div>
                <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                >
                    Refund With
                </Dialog.Title>
                <div className="mt-6">
                    <Tab.Group>
                        <Tab.List className="flex">
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        className={`px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full focus:outline-none ${selected
                                            ? "bg-neutral-800 text-white"
                                            : "text-neutral-6000 dark:text-neutral-400"
                                            }`}
                                    >
                                        bKash
                                    </button>
                                )}
                            </Tab>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        className={`px-4 py-1.5 sm:px-6 sm:py-2.5  rounded-full flex items-center justify-center focus:outline-none  ${selected
                                            ? "bg-neutral-800 text-white"
                                            : " text-neutral-6000 dark:text-neutral-400"
                                            }`}
                                    >
                                        <span className="mr-2.5">Nagad</span>
                                    </button>
                                )}
                            </Tab>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        className={`px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full focus:outline-none ${selected
                                            ? "bg-neutral-800 text-white"
                                            : "text-neutral-6000 dark:text-neutral-400"
                                            }`}
                                    >
                                        Bank Transfer
                                    </button>
                                )}
                            </Tab>
                        </Tab.List>

                        <div className="w-14 border-b border-neutral-200 my-5"></div>
                        <Tab.Panels>
                            <Tab.Panel className="space-y-5">
                                <div className="space-y-1">
                                    <Label>Card number </Label>
                                    <Input defaultValue="111 112 222 999" />
                                </div>
                                <div className="space-y-1">
                                    <Label>Card holder </Label>
                                    <Input defaultValue="JOHN DOE" />
                                </div>
                                <div className="flex space-x-5  ">
                                    <div className="flex-1 space-y-1">
                                        <Label>Expiration date </Label>
                                        <Input type="date" defaultValue="MM/YY" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <Label>CVC </Label>
                                        <Input />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <Label>Messager for author </Label>
                                    <Textarea placeholder="..." />
                                    <span className="text-sm text-neutral-500 block">
                                        Write a few sentences about yourself.
                                    </span>
                                </div>
                                <div className="pt-4">
                                    <ButtonPrimary>Confirm and pay</ButtonPrimary>
                                </div>
                            </Tab.Panel>
                            <Tab.Panel className="space-y-5">
                                <div className="space-y-1">
                                    <Label>Email </Label>
                                    <Input type="email" defaultValue="example@gmail.com" />
                                </div>
                                <div className="space-y-1">
                                    <Label>Password </Label>
                                    <Input type="password" defaultValue="***" />
                                </div>
                                <div className="space-y-1">
                                    <Label>Messager for author </Label>
                                    <Textarea placeholder="..." />
                                    <span className="text-sm text-neutral-500 block">
                                        Write a few sentences about yourself.
                                    </span>
                                </div>
                                <div className="pt-4">
                                    <ButtonPrimary>Confirm and pay</ButtonPrimary>
                                </div>
                            </Tab.Panel>
                            <Tab.Panel className="space-y-5">
                                <div className="space-y-1">
                                    <Label>Card number </Label>
                                    <Input defaultValue="111 112 222 999" />
                                </div>
                                <div className="space-y-1">
                                    <Label>Card holder </Label>
                                    <Input defaultValue="JOHN DOE" />
                                </div>
                                <div className="flex space-x-5  ">
                                    <div className="flex-1 space-y-1">
                                        <Label>Expiration date </Label>
                                        <Input type="date" defaultValue="MM/YY" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <Label>CVC </Label>
                                        <Input />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <Label>Messager for author </Label>
                                    <Textarea placeholder="..." />
                                    <span className="text-sm text-neutral-500 block">
                                        Write a few sentences about yourself.
                                    </span>
                                </div>
                                <div className="pt-4">
                                    <ButtonPrimary>Confirm and pay</ButtonPrimary>
                                </div>
                            </Tab.Panel>                                            </Tab.Panels>
                    </Tab.Group>
                </div>
            </div>
        )
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
                        {/* This element is to trick the browser into centering the modal contents.  */}
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
                                        Refund For Booking ID: {bookingId.substr(bookingId.length - 7)}
                                    </Dialog.Title>
                                </div>
                                <div className={contentPaddingClass}>{renderSection1()}</div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default ModalRefund;
