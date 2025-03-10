import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import { useState } from "react";

const App = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-700">CRUD with MongoDB</h1>
      <ItemForm onAdd={() => setRefresh(!refresh)} />
      <ItemList key={refresh} />
    </div>
  );
};

export default App;
