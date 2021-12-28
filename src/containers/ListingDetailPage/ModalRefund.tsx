import { FC, Fragment, useEffect, useState } from "react";
import { Dialog, Transition, Tab } from "@headlessui/react";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import Input from "shared/Input/Input";
import ButtonPrimary from 'shared/Button/ButtonPrimary';

import { useAppSelector } from 'app/hook';
import FormItem from 'containers/PageAddListing1/FormItem';
import Select from 'shared/Select/Select';
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

    const { userDetails: { name, phone, email } } = useAppSelector(state => state.user)

    const [bKashNumber, setBKashNumber] = useState('')
    const [nagadNumber, setNagadNumber] = useState('')
    const [bank, setBank] = useState('')

    const [bkashError, setBkashError] = useState('')
    const [nagadError, setNagadError] = useState('')
    const [bankError, setBankError] = useState('')

    const [refundName, setRefundName] = useState(name)
    const [refundPhone, setRefundPhone] = useState(phone)
    const [refundEmail, setRefundEmail] = useState(email)

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

                        {/* BKash */}

                        <Tab.Panels>
                            <Tab.Panel className="space-y-5">
                                <div className="space-y-1">
                                    <FormItem label="Bkash Number">
                                        <Input placeholder='Enter your bKash number' value={bKashNumber} onChange={(ev: any) => setBKashNumber(ev.target.value)} />
                                    </FormItem>
                                </div>

                                <div className="space-y-1">
                                    <FormItem label="Full Name ">
                                        <Input value={refundName} onChange={(ev: any) => setRefundName(ev.target.value)} />
                                    </FormItem>
                                </div>
                                <div className="space-y-1">
                                    <FormItem label="Contact Number">
                                        <Input value={refundPhone} onChange={(ev: any) => setRefundPhone(ev.target.value)} />
                                    </FormItem>
                                </div>

                                <div className="space-y-1">
                                    <FormItem label="Email Address ">
                                        <Input value={refundEmail} onChange={(ev: any) => setRefundEmail(ev.target.value)} />
                                    </FormItem>
                                </div>

                                <div className="pt-4">
                                    <ButtonPrimary>Apply For Refund</ButtonPrimary>
                                </div>

                                {bkashError && (
                                    <span className='text-red-400 dark:text-red-400'>{bkashError}</span>
                                )}

                            </Tab.Panel>

                            {/* Nagad */}

                            <Tab.Panel className="space-y-5">
                                <div className="space-y-1">
                                    <FormItem label="Nagad Number">
                                        <Input
                                            placeholder='Enter your Nagad number'
                                            value={nagadNumber}
                                            onChange={(ev: any) => setNagadNumber(ev.target.value)}
                                        />
                                    </FormItem>
                                </div>

                                <div className="space-y-1">
                                    <FormItem label="Full Name ">
                                        <Input value={refundName} onChange={(ev: any) => setRefundName(ev.target.value)} />
                                    </FormItem>
                                </div>
                                <div className="space-y-1">
                                    <FormItem label="Contact Number">
                                        <Input value={refundPhone} onChange={(ev: any) => setRefundPhone(ev.target.value)} />
                                    </FormItem>
                                </div>

                                <div className="space-y-1">
                                    <FormItem label="Email Address ">
                                        <Input value={refundEmail} onChange={(ev: any) => setRefundEmail(ev.target.value)} />
                                    </FormItem>
                                </div>

                                <div className="pt-4">
                                    <ButtonPrimary>Apply For Refund</ButtonPrimary>
                                </div>

                                {nagadError && (
                                    <span className='text-red-400 dark:text-red-400'>{nagadError}</span>
                                )}
                            </Tab.Panel>

                            {/* Bank */}

                            <Tab.Panel className="space-y-5">
                                <div className="space-y-1">
                                    <FormItem label="Bank Name">
                                        <Select
                                            value={bank}
                                            onChange={(ev: any) => setBank(ev.target.value)}
                                        >
                                            <option value="Dutch Bangla Bank Ltd">Dutch Bangla Bank Ltd.</option>
                                            <option value="Islami Bank Ltd">Islami Bank Ltd.</option>
                                            <option value="Agrani Bank Limited">Agrani Bank Limited</option>
                                        </Select>
                                    </FormItem>
                                </div>

                                <div className="space-y-1">
                                    <FormItem label="Account Holder Name">
                                        <Input value={refundName} onChange={(ev: any) => setRefundName(ev.target.value)} />
                                    </FormItem>
                                </div>
                                <div className="space-y-1">
                                    <FormItem label="Account Holder Number">
                                        <Input value={refundPhone} onChange={(ev: any) => setRefundPhone(ev.target.value)} />
                                    </FormItem>
                                </div>

                                <div className="space-y-1">
                                    <FormItem label="Email Address ">
                                        <Input value={refundEmail} onChange={(ev: any) => setRefundEmail(ev.target.value)} />
                                    </FormItem>
                                </div>

                                <div className="pt-4">
                                    <ButtonPrimary>Apply For Refund</ButtonPrimary>
                                </div>

                                {bankError && (
                                    <span className='text-red-400 dark:text-red-400'>{bankError}</span>
                                )}
                            </Tab.Panel>
                        </Tab.Panels>
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
