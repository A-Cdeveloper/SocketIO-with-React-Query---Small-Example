import { Link, useNavigate, useParams } from "react-router";
import { useCar } from "../hooks/useCar";
import EmptyResults from "@/components/layout/EmptyResults";
import ErrorResults from "@/components/layout/ErrorResults";
import { Spinner } from "@/components/ui/spinner";
import { priceFormat } from "@/lib/utils";
import useDeleteCar from "../hooks/useDeleteCar";
import { Button } from "@/components/ui/button";
import navigationRoutes from "@/providers/router/routes";

const SingleCarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { car, isPending, error } = useCar(Number(id));
  const {
    deleteCarMutation,
    isPending: isDeletingCar,
    error: deletingCarError,
  } = useDeleteCar();

  if (isPending || isDeletingCar) return <Spinner />;
  if (error || deletingCarError)
    return (
      <ErrorResults
        message={
          error?.message || deletingCarError?.message || "Something went wrong"
        }
      />
    );
  if (!car) return <EmptyResults type="cars" message="Try again later" />;

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4">
          {car.brand} {car.car_name}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {priceFormat(car.price)}
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {car.description}
        </p>
      </div>

      <div className="flex gap-5">
        <Button variant="outline" asChild>
          <Link to={navigationRoutes.editCar.path.replace(":id", id!)}>
            Edit
          </Link>
        </Button>
        <Button
          variant="destructive"
          className="cursor-pointer"
          onClick={() =>
            deleteCarMutation(Number(id), {
              onSuccess: () => {
                navigate("/");
              },
              onError: (error) => {
                console.error(error);
              },
            })
          }
          disabled={isDeletingCar}
        >
          {isDeletingCar ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </>
  );
};

export default SingleCarDetails;
