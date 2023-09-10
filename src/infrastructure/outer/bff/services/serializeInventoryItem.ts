import { InventoryItem } from "@/domain/models/InventoryItem";
import { SerializedInventoryItem } from "../models/SerializedInventoryItem";

export const serializeInventoryItem = (
  inventoryItem: InventoryItem,
): SerializedInventoryItem => {
  return {
    ...inventoryItem,
    lastMaintenance: inventoryItem.lastMaintenance.toISOString(),
  };
};
