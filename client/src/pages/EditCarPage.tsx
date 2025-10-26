import EmptyResults from "@/components/layout/EmptyResults";
import ErrorResults from "@/components/layout/ErrorResults";
import { Spinner } from "@/components/ui/spinner";
import CarFormular from "@/features/cars/components/CarFormular";
import { useCar } from "@/features/cars/hooks/useCar";
import { useParams } from "react-router";

const EditCarPage = () => {
  const { id } = useParams();
  const { car, isPending, error } = useCar(+id!);

  if (isPending) return <Spinner />;
  if (error) return <ErrorResults message={error.message} />;
  if (!car) return <EmptyResults type="cars" message="Try again later" />;

  return (
    <>
      <h1 className="text-3xl font-bold mb-2">Edit Car</h1>
      <CarFormular initialValues={car} />
    </>
  );
};

export default EditCarPage;
