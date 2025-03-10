import { useEffect, useState } from "react";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await fetch("http://localhost:5000/api/items");
    const data = await response.json();
    setItems(data);
  };

  const deleteItem = async (id) => {
    await fetch(`http://localhost:5000/api/items/${id}`, { method: "DELETE" });
    setItems(items.filter((item) => item._id !== id));
  };

  const startEdit = (item) => {
    setEditItem(item._id);
    setEditName(item.name);
  };

  const saveEdit = async () => {
    const response = await fetch(`http://localhost:5000/api/items/${editItem}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editName }),
    });

    if (response.ok) {
      setEditItem(null);
      fetchItems();
    }
  };

  return (
    <div className="mt-6">
      {items.map((item) => (
        <div
          key={item._id}
          className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md mb-3"
        >
          {editItem === item._id ? (
            <>
              <input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400 flex-1"
              />
              <button
                onClick={saveEdit}
                className="ml-2 bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Save
              </button>
              <button
                onClick={() => setEditItem(null)}
                className="ml-2 bg-gray-500 text-white px-3 py-2 rounded-lg hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <span className="flex-1">{item.name}</span>
              <button
                onClick={() => startEdit(item)}
                className="ml-2 bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => deleteItem(item._id)}
                className="ml-2 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ItemList;
