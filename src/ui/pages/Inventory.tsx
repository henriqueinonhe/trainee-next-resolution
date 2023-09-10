import { InventoryItem } from "../components/InventoryItem";
import { InventoryItem as DomainInventoryItem } from "@/domain/models/InventoryItem";
import cx from "./Inventory.module.scss";
import { NavigationOverlay } from "../components/NavigationOverlay";
import { useIsNavigating } from "../hooks/useIsNavigating";

export type InventoryProps = {
  inventory: Array<DomainInventoryItem>;
};

export const Inventory = ({ inventory }: InventoryProps) => {
  const { isNavigating } = useIsNavigating();

  return (
    <div>
      {isNavigating && <NavigationOverlay />}

      <ul className={cx.list}>
        {inventory.map((item) => (
          <InventoryItem key={item.id} item={item} />
        ))}

        <div className={cx.spacing} />
      </ul>
    </div>
  );
};
