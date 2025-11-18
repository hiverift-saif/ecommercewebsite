import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import BASE from '../../config';

const DEFAULT_SUB_IMG = "https://via.placeholder.com/300x300.png?text=No+Image";

const mainCategories = [
  "Decor", "Drinkware", "Tableware", "Home Essentials", "Sale", "Combo", "Women Accessories",
];

export default function SubCategories() {
  const [parentCategory, setParentCategory] = useState(mainCategories[0]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [newName, setNewName] = useState("");
  const [newPreview, setNewPreview] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  // Fetch from API
  useEffect(() => {
    fetchSubCategories();
  }, []);

  const fetchSubCategories = async () => {
    try {
      const res = await fetch(`${BASE.BASE_URL}/subcategory/getAllSubCategory`);
      const data = await res.json();
      if (res.ok) {
        const formatted = data.result.map(item => ({
          id: item._id,
          name: item.name,
          img: item.web_image?.[0] || DEFAULT_SUB_IMG,
          offer: item.offer || "",
          price: item.price || null,
        }));
        setSubCategories(formatted);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Add
  const addSubCategory = () => {
    if (!newName.trim()) return alert("Name is required");
    setSubCategories(prev => [{
      id: Date.now(),
      name: newName,
      img: newPreview || DEFAULT_SUB_IMG,
      offer: "",
      price: null,
    }, ...prev]);
    setAddOpen(false);
    setNewName("");
    setNewPreview(null);
  };

  // Edit
  const saveEdit = () => {
    if (!editItem?.name.trim()) return alert("Name required");
    setSubCategories(prev => prev.map(s => 
      s.id === editItem.id 
        ? { ...s, name: editItem.name, img: editItem.preview || s.img }
        : s
    ));
    setEditOpen(false);
    setEditItem(null);
  };

  // Delete
  const confirmDelete = () => {
    setSubCategories(prev => prev.filter(s => s.id !== deleteItem.id));
    setDeleteOpen(false);
    setDeleteItem(null);
  };

  if (loading) return <div className="p-6 text-center text-gray-600">Loading subcategories...</div>;

  return (
    <div className="p-6 space-y-6">

      {/* Header + Dropdown + Add Button */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <label className="font-medium">Select Category:</label>
          <select
            value={parentCategory}
            onChange={(e) => setParentCategory(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          >
            {mainCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setAddOpen(true)}
          className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          <Plus size={20} /> Add Subcategory
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {subCategories.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 py-12">
            No subcategories found
          </p>
        ) : (
          subCategories.map((sub) => (
            <div
              key={sub.id}
              className="relative p-5 border rounded-xl bg-white shadow hover:shadow-lg transition group text-center"
            >
              {sub.offer && (
                <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {sub.offer} OFF
                </span>
              )}

              <img
                src={sub.img}
                alt={sub.name}
                className="w-28 h-28 rounded-full object-cover mx-auto mb-4 border-4 border-gray-100"
                onError={(e) => e.target.src = DEFAULT_SUB_IMG}
              />

              <h3 className="font-semibold text-lg">{sub.name}</h3>
              {sub.price && <p className="text-gray-600">₹{sub.price}</p>}

              <div className="flex justify-center gap-3 mt-4 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => {
                    setEditItem({ ...sub, preview: sub.img });
                    setEditOpen(true);
                  }}
                  className="p-2 border rounded-lg hover:bg-gray-50"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => {
                    setDeleteItem(sub);
                    setDeleteOpen(true);
                  }}
                  className="p-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ADD MODAL */}
      {addOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add Subcategory</h2>
              <button onClick={() => setAddOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <input
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Subcategory Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setNewPreview(URL.createObjectURL(file));
              }}
              className="w-full mb-4"
            />

            {newPreview && (
              <img src={newPreview} alt="Preview" className="w-24 h-24 rounded-full object-cover mx-auto mb-4" />
            )}

            <div className="flex justify-end gap-3">
              <button onClick={() => setAddOpen(false)} className="px-5 py-2 border rounded-lg hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={addSubCategory} className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editOpen && editItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Subcategory</h2>
              <button onClick={() => setEditOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <input
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4"
              value={editItem.name}
              onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setEditItem({ ...editItem, preview: URL.createObjectURL(file) });
              }}
              className="w-full mb-4"
            />

            <img
              src={editItem.preview || editItem.img}
              alt="Preview"
              className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
            />

            <div className="flex justify-end gap-3">
              <button onClick={() => setEditOpen(false)} className="px-5 py-2 border rounded-lg">
                Cancel
              </button>
              <button onClick={saveEdit} className="px-6 py-2 bg-black text-white rounded-lg">
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteOpen && deleteItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm text-center">
            <h3 className="text-lg font-semibold mb-3">Delete "{deleteItem.name}"?</h3>
            <p className="text-gray-600 mb-6">This action cannot be undone.</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => setDeleteOpen(false)} className="px-5 py-2 border rounded-lg hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={confirmDelete} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}