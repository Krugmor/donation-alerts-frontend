import { Button } from "antd";
import { createDonation } from "../../shared/api/donations";

export const NewDonationButton = () => {
  const onClick = () => {
    createDonation({ user: 1, name: "Вован", text: `Держи бабки ${Math.random()}` });
  };

  return <Button onClick={onClick}>Новый донат</Button>;
};
