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

interface LaunchDetailsPageProps {
  match?: any;
}

const LaunchDetailsPage: FC<LaunchDetailsPageProps> = ({ match }) => {
  const { launchUserInput, oneLaunch } = useAppSelector(
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
  const [selectedRooom, setSelectedRooom] = useState(0);
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

  const fetchOneLaunch = useCallback(() => {
    dispatch<any>(
      fetchSingleLaunchlAsync({
        id,
        depDate: selectedDate.startDate?.toISOString(),
        fromLocId: launchUserInput?.fromCity.locId,
        toLocId: launchUserInput?.toCity.locId,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    fetchOneLaunch();
  }, [id, oneLaunch]);

  return oneLaunch ? <h1>{JSON.stringify(oneLaunch)}</h1> : <SomethingWrong />;
};

export default LaunchDetailsPage;
