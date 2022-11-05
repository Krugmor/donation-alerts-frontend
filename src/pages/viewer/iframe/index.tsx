import { useEffect, useState } from "react";
import { Layout } from "antd";
import { useDispatch } from "react-redux";
import { donationsModel } from "../../../entities/donation";
import { viewerModel } from "../../../entities/viewer";
import { useSocket } from "../../../shared/api/hooks/use-socket";
import { useInterval } from "../../../shared/api/hooks/use-interval";

const DEFAULT_TIMER = 5;

const IframePage = () => {
  const dispatch = useDispatch();
  const [time, setTime] = useState<number>(DEFAULT_TIMER);
  const token = viewerModel.useToken();
  const activeDonation = donationsModel.useActiveDonation();

  const { socket } = useSocket(token, {
    connect: (_socket) => {
      _socket.emit("donations:get");
    },
    "donations:set": (_socket, msg) => {
      dispatch(donationsModel.setDonations(msg.data));
    },
    "donations:updated": (_socket, msg) => {
      dispatch(donationsModel.updateDonation(msg.data));
    },
    "donations:timer:updated": (_socket, msg) => {
      dispatch(donationsModel.updateDonationTimer(msg.data));
    },
  });

  useInterval(
    () => {
      setTime((prevTime) => {
        if (socket && activeDonation) {
          socket.emit("donations:timer:update", {
            id: activeDonation.id,
            time: prevTime,
          });
        }
        return --prevTime;
      });
    },
    time >= 0 ? 1000 : null
  );

  useEffect(() => {
    if (activeDonation) {
      setTime(DEFAULT_TIMER);
    }
  }, [activeDonation?.id]);

  return (
    <Layout.Content>
      {activeDonation && (
        <>
          <div>{activeDonation.name}</div>
          <div>{activeDonation.text}</div>
        </>
      )}
    </Layout.Content>
  );
};
export default IframePage;
