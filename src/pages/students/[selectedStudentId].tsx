import { GetServerSideProps } from "next";
import { SerializedReservation } from "@/infrastructure/outer/bff/models/SerializedReservation";
import Head from "next/head";
import { fetchReservations } from "@/infrastructure/inner/services/fetchReservations";
import { serializeReservation } from "@/infrastructure/outer/bff/services/serializeReservation";
import { deserializeReservation } from "@/infrastructure/outer/bff/services/deserializeReservation";
import { Students } from "@/ui/pages/Students";

export type StudentsPageProps = {
  serializedReservations: Array<SerializedReservation>;
  selectedStudentId: number;
};

export default function StudentsPage({
  serializedReservations,
  selectedStudentId,
}: StudentsPageProps) {
  const reservations = serializedReservations.map(deserializeReservation);

  return (
    <>
      <Head>
        <title>Students</title>
      </Head>

      <Students
        reservations={reservations}
        selectedStudentId={selectedStudentId}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  StudentsPageProps,
  {
    selectedStudentId: string;
  }
> = async (context) => {
  const { selectedStudentId } = context.params!;

  const reservations = await fetchReservations();

  const serializedReservations = reservations.map(serializeReservation);

  return {
    props: {
      serializedReservations,
      selectedStudentId: Number(selectedStudentId),
    },
  };
};
