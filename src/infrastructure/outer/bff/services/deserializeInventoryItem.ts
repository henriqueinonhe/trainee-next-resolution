import { InventoryItem } from "@/domain/models/InventoryItem";
import { SerializedInventoryItem } from "../models/SerializedInventoryItem";

export const deserializeInventoryItem = (
  serializedInventoryItem: SerializedInventoryItem,
): InventoryItem => {
  return {
    ...serializedInventoryItem,
    lastMaintenance: new Date(serializedInventoryItem.lastMaintenance),
  };
};
