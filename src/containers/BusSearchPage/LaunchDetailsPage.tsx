import { FC, Fragment, useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import moment from "moment";
import { useAppSelector, useAppDispatch } from "app/hook";
import BusDateSingleInput from "components/HeroSearchForm/BusDateSingleInput";
import { DateRage } from "components/HeroSearchForm/BusSearchForm";
import useWindowSize from "hooks/useWindowResize";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import NcImage from "shared/NcImage/NcImage";
import ModalPhotos from "containers/ListingDetailPage/ModalPhotos";
import Badge from "shared/Badge/Badge";
import {
  fetchSingleLaunchlAsync,
  addFinalInput,
} from "app/feature/launch/launchSlice";
import SomethingWrong from "containers/Page404/SomethingWrong";
import Page404 from "containers/Page404/Page404";

import LauchCardH from "./LaunchCardH";

interface LaunchDetailsPageProps {
  match?: any;
}

const LaunchDetailsPage: FC<LaunchDetailsPageProps> = ({ match }) => {
  const { launchUserInput, oneLaunch, status } = useAppSelector(
    (state) => state.launch
  );
  const { isLogged } = useAppSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [selectedSeat, setSelectedSeat] = useState<string[]>([]);
  const [boardingPoint, setBoardingPoint] = useState(
    oneLaunch?.boardingPoints[0]
  );
  const [droppingPoint, setDroppingPoint] = useState(
    oneLaunch?.droppingPoints[0]
  );

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCabin, setSelectedCabin] = useState(0);
  const [openFocusIndex, setOpenFocusIndex] = useState(0);
  let night = 2;

  const [selectedDate, setSelectedDate] = useState<DateRage>({
    startDate: launchUserInput?.journeyDate
      ? moment(launchUserInput.journeyDate)
      : moment().add(1, "days"),
    endDate: launchUserInput?.returnDate
      ? moment(launchUserInput.returnDate)
      : moment().add(3, "days"),
  });

  const { id } = match.params;

  useEffect(() => {
    dispatch<any>(
      fetchSingleLaunchlAsync({
        id: match.params.id,
        depDate: selectedDate.startDate?.toISOString(),
        fromLocId: launchUserInput?.fromCity.locId,
        toLocId: launchUserInput?.toCity.locId,
      })
    );
  }, [dispatch]);

  const serviceCharge = 50;
  let vat = 0;
  let totalAmount = 0;
  let changableAmount = 0;

  if (oneLaunch) {
    changableAmount = oneLaunch.cabins[selectedCabin].price * 1;
    vat = Math.ceil(changableAmount * 0.15);
    totalAmount = changableAmount + serviceCharge + vat;
  }

  const handleOpenModal = (index: number) => {
    setIsOpen(true);
    setOpenFocusIndex(index);
  };

  const handleCloseModal = () => setIsOpen(false);
  const windowSize = useWindowSize();

  const reserveBtnClick = () => {
    return console.log("😹");
  };

  const renderPhotoSection = () => {
    let PHOTOS: string[] = [];

    if (oneLaunch?.images) {
      PHOTOS = oneLaunch?.images;
    }

    return (
      <Fragment>
        <header className="container 2xl:px-14 rounded-md sm:rounded-xl">
          <div className="relative grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2">
            <div
              className="col-span-2 row-span-3 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
              onClick={() => handleOpenModal(0)}
            >
              <NcImage
                containerClassName="absolute inset-0"
                className="object-cover w-full h-full rounded-md sm:rounded-xl"
                src={PHOTOS[0]}
                prevImageHorizontal
              />
              <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
            </div>
            {PHOTOS.filter((_, i) => i >= 1 && i < 5).map((item, index) => (
              <div
                key={index}
                className={`relative rounded-md sm:rounded-xl overflow-hidden ${
                  index >= 3 ? "hidden sm:block" : ""
                }`}
              >
                <NcImage
                  containerClassName="aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5"
                  className="object-cover w-full h-full rounded-md sm:rounded-xl "
                  src={item || ""}
                  prevImageHorizontal
                />

                <div
                  className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={() => handleOpenModal(index + 1)}
                />
              </div>
            ))}

            <div
              className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 cursor-pointer hover:bg-neutral-200 z-10"
              onClick={() => handleOpenModal(0)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              <span className="ml-2 text-neutral-800 text-sm font-medium">
                Show all photos
              </span>
            </div>
          </div>
        </header>

        <ModalPhotos
          imgs={PHOTOS}
          isOpen={isOpen}
          onClose={handleCloseModal}
          initFocus={openFocusIndex}
        />
      </Fragment>
    );
  };

  const renderSection1 = () => {
    return oneLaunch ? (
      <div className="listingSection__wrap !space-y-6">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
          {oneLaunch.name}
        </h2>

        <div className="flex items-center space-x-4">
          <span>
            <i className="las la-sync"></i>
            <span className="ml-1">{oneLaunch.companyName}</span>
          </span>

          <span>·</span>

          <span>
            <span className="ml-1">
              {oneLaunch.startingPoint} to {oneLaunch.endingPoint}
            </span>
          </span>
        </div>

        <div className="w-full border-b border-neutral-100 dark:border-neutral-700 py-1" />

        <h2 className="text-2xl font-semibold">Launch information</h2>

        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        <div className="text-neutral-6000 dark:text-neutral-300">
          {oneLaunch.description}
        </div>
      </div>
    ) : (
      <Fragment></Fragment>
    );
  };

  const renderCabin = () => {
    return (
      <div className="listingSection__wrap shadow-xl">
        <h2 className="text-2xl font-semibold">Select Your Room</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {oneLaunch?.cabins.map((item: any, index: any) => (
          <div key={item._id}>
            <LauchCardH
              index={index}
              data={item}
              selected={selectedCabin}
              onSelectedChange={setSelectedCabin}
            />
          </div>
        ))}
      </div>
    );
  };

  const renderSidebar = () => {
    return (
      <div className="listingSection__wrap shadow-xl">
        <span className="font-semibold text-3xl">
          {oneLaunch?.cabins[selectedCabin].type}
        </span>
        <div className="flex justify-between">
          <div className="flex justify-between">
            <span className="text-2xl">
              BDT {oneLaunch?.cabins[selectedCabin].price}.00
            </span>
          </div>
        </div>

        {/* FORM */}
        <form className="flex justify-center align-middle border divide-x divide-neutral-200 dark:divide-neutral-700 border-neutral-200 dark:border-neutral-700 rounded-3xl ">
          <div className="flex-1">
            <BusDateSingleInput
              defaultValue={selectedDate.startDate}
              onFocusChange={() => {}}
              onChange={(date) =>
                setSelectedDate({ startDate: date, endDate: null })
              }
              dateFormat="DD-MMM"
              anchorDirection={windowSize.width > 1400 ? "left" : "right"}
              fieldClassName="p-4"
            />
          </div>

          <div className="flex-1 grid place-items-center">
            <span className="text-center text-lg font-semibold">
              Max {oneLaunch.cabins[selectedCabin].maxAdults} People
            </span>
          </div>
        </form>

        <div className="flex flex-col space-y-4">
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Boarding Point</span>
            <span>{boardingPoint}</span>
          </div>

          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Dropping Point</span>
            <span>{droppingPoint}</span>
          </div>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>
              {oneLaunch.cabins[selectedCabin].price} x {1} cabins
            </span>
            <span>BDT {changableAmount}.00</span>
          </div>

          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>VAT(15%)</span>
            <span>BDT {vat}</span>
          </div>

          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Service charge</span>
            <span>BDT {serviceCharge}</span>
          </div>

          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>BDT {totalAmount}</span>
          </div>
        </div>

        <ButtonPrimary onClick={reserveBtnClick}>Book Now</ButtonPrimary>
      </div>
    );
  };

  return status === "loading" ? (
    <h1>Loading...</h1>
  ) : status === "idle" ? (
    oneLaunch ? (
      <div
        className={`nc-ListingStayDetailPage pb-20`}
        data-nc-id="ListingStayDetailPage"
      >
        {renderPhotoSection()}

        <main className="container mt-11 flex ">
          <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pr-10">
            {renderSection1()}
            {renderCabin()}
            {/* {renderSection2()} */}
          </div>

          <div className="hidden lg:block flex-grow">
            <div className="sticky top-24">{renderSidebar()}</div>
          </div>
        </main>
      </div>
    ) : (
      <SomethingWrong />
    )
  ) : (
    <Page404 />
  );
};

export default LaunchDetailsPage;
