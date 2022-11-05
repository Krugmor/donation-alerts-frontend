import { Button, List } from "antd";
import { Donation } from "../../model";

export type DonationItemProps = {
  item: Donation;
  onSkip: (id: number) => void;
};

export const DonationItem = ({ item, onSkip }: DonationItemProps) => {
  return (
    <List.Item
      actions={[
        !item.shown ? (
          <Button onClick={() => onSkip(item.id)}>Пропустить</Button>
        ) : null,
      ]}
    >
      <List.Item.Meta title={item.name} description={item.text} />
      {!item.shown && item.time > 0 && <div>{item.time}сек</div>}
    </List.Item>
  );
};
