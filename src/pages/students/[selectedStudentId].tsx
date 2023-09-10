import { GetStaticPaths, GetStaticProps } from "next";
import { SerializedReservation } from "@/infrastructure/outer/bff/models/SerializedReservation";
import Head from "next/head";
import { fetchReservations } from "@/infrastructure/inner/services/fetchReservations";
import { serializeReservation } from "@/infrastructure/outer/bff/services/serializeReservation";
import { deserializeReservation } from "@/infrastructure/outer/bff/services/deserializeReservation";
import { Students } from "@/ui/pages/Students";
import { getStudentsFromReservations } from "@/domain/services/getStudentsFromReservations";

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

export const getStaticProps: GetStaticProps<
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
    revalidate: 300,
  };
};

export const getStaticPaths: GetStaticPaths<{
  selectedStudentId: string;
}> = async () => {
  const reservations = await fetchReservations();

  const students = getStudentsFromReservations(reservations);

  const paths = students.map((student) => ({
    params: {
      selectedStudentId: String(student.id),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
