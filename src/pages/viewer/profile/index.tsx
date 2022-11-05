import { useState } from "react";
import { Layout, List, Spin } from "antd";
import { useDispatch } from "react-redux";
import { DonationItem, donationsModel } from "../../../entities/donation";
import { viewerModel } from "../../../entities/viewer";
import { NewDonationButton } from "../../../features/new-donation-button";
import { useSocket } from "../../../shared/api/hooks/use-socket";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const token = viewerModel.useToken();

  const donations = donationsModel.useDonations();

  const { socket } = useSocket(token, {
    connect: (_socket) => {
      _socket.emit("donations:get");
    },
    "donations:set": (_socket,msg) => {
      dispatch(donationsModel.setDonations(msg.data));
      setIsLoading(false);
    },
    "donations:updated": (_socket,msg) => {
      dispatch(donationsModel.updateDonation(msg.data));
    },
    "donations:timer:updated": (_socket,msg) => {
      dispatch(donationsModel.updateDonationTimer(msg.data));
    },
  });

  const onSkip = (id: number) => {
    if (socket) socket.emit("donations:skip", { id });
  };

  if (isLoading) return <Spin size="large" />;

  return (
    <Layout.Content>
      <NewDonationButton />
      <List>
        {[...donations]
          .reverse()
          .map((donation) =>
            donation ? (
              <DonationItem key={donation.id} item={donation} onSkip={onSkip} />
            ) : null
          )}
      </List>
    </Layout.Content>
  );
};

export default ProfilePage;
