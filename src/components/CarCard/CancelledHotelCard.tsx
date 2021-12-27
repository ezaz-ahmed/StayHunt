import { useState, Fragment } from 'react'
import { useAppSelector } from 'app/hook';
import moment from 'moment';
import { Dialog, Transition, Tab } from '@headlessui/react'
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import Label from "components/Label/Label";
import Input from "shared/Input/Input";
import Textarea from "shared/Textarea/Textarea";
import ButtonSecondary from 'shared/Button/ButtonSecondary';

interface CancelledHotelCardProps {
    bookingId: string;
    bookingDate: string;
    payAmount: string;
    hotelName: string;
    hotelAddress: string;
    numOfRooms: string;
    numOfPersons: string;
    numOfNights: string;
    roomType: string;
    refundStatus?: undefined;
}

const CancelledHotelCard = ({
    bookingId,
    bookingDate,
    payAmount,
    hotelName,
    hotelAddress,
    numOfRooms,
    numOfPersons,
    numOfNights,
    roomType,
    refundStatus,
}: CancelledHotelCardProps) => {

    let [isOpen, setIsOpen] = useState(false)
    const { token } = useAppSelector(state => state.user)


    const closeModal = () => {
        setIsOpen(false)
    }

    const openModal = () => {
        setIsOpen(true)
    }

    const cancelBooking = async () => {
        closeModal()
        // await fetchCancelBooking(bookingId, token)
    }


    return (
        <div className='w-96 mx-auto sm:border border-neutral-200 dark:border-neutral-700 shadow-xl hover:shadow rounded-xl'>
            <div className='text-center text-blue-600 my-2 text-xl font-medium'>
                Booking ID: {bookingId.substr(bookingId.length - 7)}
            </div>
            <hr className='mt-2 border-neutral-200 dark:border-neutral-700' />
            <div className='flex justify-between mx-3 my-2'>
                <div className='text-center mt-2 text-lg pl-2 font-normal'>
                    {moment(bookingDate).format('DD MMMM')}
                </div>
                <div className='text-center mt-2 text-lg pr-2 font-normal'>
                    BDT {payAmount}.00
                </div>
            </div>

            <div className='text-center font-semibold text-lg'>{hotelName}</div>
            <div className='text-center'>
                <p className='px-6 text-center mt-2 font-light text-sm'>{hotelAddress}</p>

                <div className='mt-4'>Number of Room: {numOfRooms}</div>
                <div>Number of Nights: {numOfNights}</div>
                <div>Room Type: {roomType}</div>
                <div className='mb-4'>Number of Person: {numOfPersons}</div>
            </div>

            <hr className='border-neutral-200 dark:border-neutral-700' />

            <div className='flex justify-center p-2'>
                {refundStatus ?
                    <ButtonSecondary>{refundStatus}</ButtonSecondary> :
                    <ButtonPrimary onClick={openModal}>Request A Refund</ButtonPrimary>
                }

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
                                                            {/* <img className="w-8" src={visaPng} alt="" />
                                                            <img className="w-8" src={mastercardPng} alt="" /> */}
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
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </div>
    );
};

export default CancelledHotelCard;
