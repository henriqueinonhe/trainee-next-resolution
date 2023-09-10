import { GetServerSideProps } from "next";
import { SerializedReservation } from "@/infrastructure/outer/bff/models/SerializedReservation";
import Head from "next/head";
import { Rooms } from "@/ui/pages/Rooms";
import { fetchReservations } from "@/infrastructure/inner/services/fetchReservations";
import { serializeReservation } from "@/infrastructure/outer/bff/services/serializeReservation";
import { deserializeReservation } from "@/infrastructure/outer/bff/services/deserializeReservation";

export type RoomsPageProps = {
  serializedReservations: Array<SerializedReservation>;
  selectedRoomId: number;
};

export default function RoomsPage({
  serializedReservations,
  selectedRoomId,
}: RoomsPageProps) {
  const reservations = serializedReservations.map(deserializeReservation);

  return (
    <>
      <Head>
        <title>Rooms</title>
      </Head>

      <Rooms reservations={reservations} selectedRoomId={selectedRoomId} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  RoomsPageProps,
  {
    selectedRoomId: string;
  }
> = async (context) => {
  const { selectedRoomId } = context.params!;

  const reservations = await fetchReservations();

  const serializedReservations = reservations.map(serializeReservation);

  return {
    props: {
      serializedReservations,
      selectedRoomId: Number(selectedRoomId),
    },
  };
};
