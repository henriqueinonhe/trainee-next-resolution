import { fetchInventory } from "@/infrastructure/inner/services/fetchInventory";
import { SerializedInventoryItem } from "@/infrastructure/outer/bff/models/SerializedInventoryItem";
import { deserializeInventoryItem } from "@/infrastructure/outer/bff/services/deserializeInventoryItem";
import { serializeInventoryItem } from "@/infrastructure/outer/bff/services/serializeInventoryItem";
import { Inventory } from "@/ui/pages/Inventory";
import { GetStaticProps } from "next";
import Head from "next/head";

export type InventoryPageProps = {
  serializedInventory: Array<SerializedInventoryItem>;
};

export default function InventoryPage({
  serializedInventory,
}: InventoryPageProps) {
  const inventory = serializedInventory.map(deserializeInventoryItem);

  return (
    <>
      <Head>
        <title>Inventory</title>
      </Head>

      <Inventory inventory={inventory} />
    </>
  );
}

export const getStaticProps: GetStaticProps<InventoryPageProps> = async () => {
  const inventory = await fetchInventory();

  const serializedInventory = inventory.map(serializeInventoryItem);

  return {
    props: {
      serializedInventory,
    },
    revalidate: 300,
  };
};
