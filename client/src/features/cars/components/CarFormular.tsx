import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/customComponents/CustomInput";
import { CustomTextarea } from "@/components/customComponents/CustomTextarea";
import {
  addCarSchema,
  editCarSchema,
  type AddCarForm,
  type EditCarForm,
} from "../schemas/car";
import { useNavigate } from "react-router";
import { useAddNewCar } from "../hooks/useAddNewCar";

const CarFormular = ({ initialValues }: { initialValues?: AddCarForm }) => {
  const editMode = !!initialValues;
  const navigate = useNavigate();
  const {
    addNewCarMutation,
    isPending: isAddingCar,
    error: addingCarError,
  } = useAddNewCar();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddCarForm | EditCarForm>({
    resolver: zodResolver(editMode ? editCarSchema : addCarSchema),
    defaultValues: initialValues || {},
  });

  const handleFormSubmit = (data: AddCarForm | EditCarForm) => {
    console.log(data);

    if (editMode) {
      navigate(`/cars/${(data as EditCarForm).id}`);
    } else {
      addNewCarMutation(data as AddCarForm, {
        onSuccess: () => {
          reset();
          navigate("/");
        },
        onError: (error) => {
          console.error(error);
        },
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="max-w-md space-y-3 my-8"
      >
        <CustomInput
          {...register("car_name")}
          label="Car Name"
          type="text"
          placeholder="Enter car name"
          error={errors.car_name?.message}
          required
        />

        <CustomInput
          {...register("brand")}
          label="Brand"
          type="text"
          placeholder="Enter brand"
          error={errors.brand?.message}
          required
        />

        <CustomInput
          {...register("price", { valueAsNumber: true })}
          label="Price"
          type="number"
          placeholder="Enter price"
          error={errors.price?.message}
          required
        />

        <CustomTextarea
          {...register("description")}
          label="Description"
          placeholder="Enter description"
          error={errors.description?.message}
          required
        />

        {addingCarError && (
          <div className="text-destructive">{addingCarError.message}</div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-1/2 cursor-pointer my-4"
        >
          {isSubmitting || isAddingCar
            ? "Processing..."
            : editMode
            ? "Edit Car"
            : "Add Car"}
        </Button>
      </form>
    </>
  );
};

export default CarFormular;
