import { Button } from "@/components/ui/button";
import SingleCarDetails from "@/features/cars/components/SingleCarDetails";
import navigationRoutes from "@/providers/router/routes";
import { Link, useParams } from "react-router";

const SingleCarPage = () => {
  const { id } = useParams();
  return (
    <>
      <SingleCarDetails />
      <div className="flex gap-5">
        <Button variant="outline" asChild>
          <Link to={navigationRoutes.editCar.path.replace(":id", id!)}>
            Edit
          </Link>
        </Button>
        <Button variant="destructive" asChild>
          <Link to="/">Delete</Link>
        </Button>
      </div>
    </>
  );
};

export default SingleCarPage;
