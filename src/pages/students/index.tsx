import { GetServerSideProps } from "next";
import { fetchReservations } from "@/infrastructure/inner/services/fetchReservations";
import { getStudentsFromReservations } from "@/domain/services/getStudentsFromReservations";

export default function StudentsIndex() {
  return <></>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const reservations = await fetchReservations();

  const students = getStudentsFromReservations(reservations);
  const [firstStudent] = students;

  return {
    redirect: {
      destination: `/students/${firstStudent.id}`,
      permanent: false,
    },
  };
};
