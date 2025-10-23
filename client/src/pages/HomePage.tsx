import AllCars from "@/features/cars/components/AllCars";

const HomePage = () => {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Available Cars</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Browse our collection of premium vehicles
        </p>
      </div>
      <AllCars />
    </>
  );
};

export default HomePage;
