import Header from "./components/layout/Header";
import MainLayout from "./components/layout/MainLayout";
import AllCars from "./features/cars/components/AllCars";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      <Header />

      <MainLayout>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Available Cars</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Browse our collection of premium vehicles
          </p>
        </div>
        <AllCars />
      </MainLayout>
    </div>
  );
}

export default App;
