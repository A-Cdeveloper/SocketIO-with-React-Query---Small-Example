import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import navigationRoutes from "@/providers/router/routes";
import useDeleteCar from "../hooks/useDeleteCar";
import ErrorResults from "@/components/layout/ErrorResults";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/store/authStore";

const EditButtonGroup = ({ id }: { id: string }) => {
  const navigate = useNavigate();
  const {
    deleteCarMutation,
    isPending: isDeletingCar,
    error: deletingCarError,
  } = useDeleteCar();

  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    navigate(navigationRoutes.login.path);
    return null;
  }

  if (isDeletingCar) return <Spinner />;

  if (deletingCarError)
    return (
      <ErrorResults
        message={deletingCarError.message || "Something went wrong"}
      />
    );
  return (
    <div className="flex gap-5">
      <Button variant="outline" asChild>
        <Link to={navigationRoutes.editCar.path.replace(":id", id!)}>Edit</Link>
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
  );
};

export default EditButtonGroup;
