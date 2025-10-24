import { useParams } from "react-router";
import { useCar } from "../hooks/useCar";
import EmptyResults from "@/components/layout/EmptyResults";
import ErrorResults from "@/components/layout/ErrorResults";
import { Spinner } from "@/components/ui/spinner";
import { priceFormat } from "@/lib/utils";

const SingleCarDetails = () => {
  const { id } = useParams();
  const { car, isPending, error } = useCar(Number(id));

  console.log(car);

  if (isPending) return <Spinner />;
  if (error) return <ErrorResults message={error.message} />;
  if (!car) return <EmptyResults type="cars" message="Try again later" />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        {car.brand} {car.car_name}
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        {priceFormat(car.price)}
      </p>
    </div>
  );
};

export default SingleCarDetails;
