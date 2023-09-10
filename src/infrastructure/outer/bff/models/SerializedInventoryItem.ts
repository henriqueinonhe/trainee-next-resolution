import { InventoryItem } from "@/domain/models/InventoryItem";
import { Override } from "@/utils/types";

export type SerializedInventoryItem = Override<
  InventoryItem,
  { lastMaintenance: string }
>;
