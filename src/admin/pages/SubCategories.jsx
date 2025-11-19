// src/admin/pages/SubCategories.jsx
import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Upload } from "lucide-react";
import BASE from "../../config";

const DEFAULT_IMG = "https://via.placeholder.com/300x300.png?text=No+Image";

export default function SubCategories() {
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [catLoading, setCatLoading] = useState(true);

  // Modal & Form States
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [offer, setOffer] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // NEW
  const [webImage, setWebImage] = useState(null);
  const [appImage, setAppImage] = useState(null);
  const [webPreview, setWebPreview] = useState(null);
  const [appPreview, setAppPreview] = useState(null);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Fetch Subcategories
  const fetchSubCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE.BASE_URL}/subcategory/getAllSubCategory`);
      const data = await res.json();

      if (res.ok && data.result) {
        const formatted = data.result.map((item) => ({
          id: item._id,
          name: item.name,
          description: item.description || "",
          price: item.price || 0,
          offer: item.offer || "",
          categoryId: item.categoryId,
          web_image: item.web_image?.[0],
          app_image: item.app_image?.[0],
          img: item.web_image?.[0] || item.app_image?.[0] || DEFAULT_IMG,
        }));
        setSubCategories(formatted);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Categories for Dropdown
  const fetchCategories = async () => {
    try {
      setCatLoading(true);
      const res = await fetch(`${BASE.BASE_URL}/category/getAllCategory`);
      const data = await res.json();

      if (res.ok && data.result) {
        const formatted = data.result.map((cat) => ({
          id: cat._id,
          name: (cat.name || "").split("\t")[0].trim(),
        }));
        setCategories(formatted);
        if (formatted.length > 0) {
          setSelectedCategory(formatted[0].id); // default first category
        }
      }
    } catch (err) {
      console.error("Failed to load categories", err);
    } finally {
      setCatLoading(false);
    }
  };

  useEffect(() => {
    fetchSubCategories();
    fetchCategories();
  }, []);

  // Open Add Modal
  const openAdd = () => {
    resetForm();
    setIsEdit(false);
    setModalOpen(true);
  };

  // Open Edit Modal
  const openEdit = (sub) => {
    setIsEdit(true);
    setCurrentId(sub.id);
    setName(sub.name);
    setDescription(sub.description);
    setPrice(sub.price);
    setOffer(sub.offer);
    setSelectedCategory(sub.categoryId || categories[0]?.id || "");
    setWebPreview(sub.web_image || DEFAULT_IMG);
    setAppPreview(sub.app_image || sub.web_image || DEFAULT_IMG);
    setWebImage(null);
    setAppImage(null);
    setModalOpen(true);
  };

  // Reset Form
  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setOffer("");
    setSelectedCategory(categories[0]?.id || "");
    setWebImage(null);
    setAppImage(null);
    setWebPreview(null);
    setAppPreview(null);
    setError("");
    setCurrentId(null);
  };

  // Close Modal
  const closeModal = () => {
    setModalOpen(false);
    resetForm();
  };

  // Handle Image
  const handleImage = (type, file) => {
    if (!file) return;
    if (type === "web") {
      setWebImage(file);
      setWebPreview(URL.createObjectURL(file));
    } else {
      setAppImage(file);
      setAppPreview(URL.createObjectURL(file));
    }
  };

  // ADD SUBCATEGORY
  const handleAdd = async () => {
    if (!name.trim()) return setError("Name is required!");
    if (!selectedCategory) return setError("Please select a category!");

    setSaving(true);
    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("description", description);
    formData.append("price", price || 0);
    formData.append("offer", offer);
    formData.append("categoryId", selectedCategory); // DYNAMIC CATEGORY
    formData.append("userType", "permanent");
    if (webImage) formData.append("web_image", webImage);
    if (appImage) formData.append("app_image", appImage);

    try {
      const res = await fetch(`${BASE.BASE_URL}/subcategory`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("Subcategory added successfully!");
        fetchSubCategories();
        closeModal();
      } else {
        const json = await res.json();
        setError(json.message || "Failed to add");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setSaving(false);
    }
  };

  // EDIT SUBCATEGORY
  const handleEdit = async () => {
    if (!name.trim()) return setError("Name is required!");
    if (!selectedCategory) return setError("Please select a category!");

    setSaving(true);
    setError("");

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("description", description);
    formData.append("price", price || 0);
    formData.append("offer", offer);
    formData.append("categoryId", selectedCategory); // DYNAMIC

    if (webImage) formData.append("web_image", webImage);
    if (appImage) formData.append("app_image", appImage);

    try {
      const res = await fetch(
        `${BASE.BASE_URL}/subcategory/editSubCategory/${currentId}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (res.ok) {
        alert("Subcategory updated!");
        fetchSubCategories();
        closeModal();
      } else {
        const json = await res.json();
        setError(json.message || "Update failed");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setSaving(false);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this subcategory permanently?")) return;

    try {
      const res = await fetch(
        `${BASE.BASE_URL}/subcategory/deleteSubCategory/${id}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        setSubCategories((prev) => prev.filter((s) => s.id !== id));
        alert("Deleted successfully!");
      }
    } catch (err) {
      alert("Network error");
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-xl text-gray-600">
        Loading subcategories...
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Subcategories</h1>
            <p className="text-gray-600 mt-1">Manage laundry & other subcategories</p>
          </div>
          <button
            onClick={openAdd}
            className="bg-black text-white px-8 py-4 rounded-xl flex items-center gap-3 hover:bg-gray-800 transition font-semibold shadow-lg"
          >
            <Plus size={24} /> Add Subcategory
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
          {subCategories.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 text-xl py-20">
              No subcategories found
            </p>
          ) : (
            subCategories.map((sub) => (
              <div
                key={sub.id}
                className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-200 group hover:shadow-2xl transition"
              >
                <div className="relative p-6 text-center">
                  <img
                    src={sub.img}
                    alt={sub.name}
                    className="w-32 h-32 mx-auto object-cover rounded-full border-4 border-white shadow-xl"
                    onError={(e) => (e.target.src = DEFAULT_IMG)}
                  />
                  {sub.offer && (
                    <span className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-600 text-white text-sm font-bold px-4 py-1.5 rounded-full">
                      {sub.offer} OFF
                    </span>
                  )}
                </div>

                <div className="px-6 pb-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900">{sub.name}</h3>
                  {sub.price > 0 && <p className="text-2xl font-bold text-black mt-2">₹{sub.price}</p>}
                  <p className="text-gray-500 text-sm mt-1">{sub.description}</p>
                </div>

                <div className="px-6 pb-8 flex gap-3">
                  <button
                    onClick={() => openEdit(sub)}
                    className="flex-1 bg-gray-100 hover:bg-black hover:text-white py-3 rounded-xl font-medium transition flex items-center justify-center gap-2"
                  >
                    <Pencil size={18} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(sub.id)}
                    className="flex-1 bg-red-100 hover:bg-red-600 text-red-600 hover:text-white py-3 rounded-xl font-medium transition flex items-center justify-center gap-2"
                  >
                    <Trash2 size={18} /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={closeModal}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b px-6 py-5 flex justify-between items-center">
              <h2 className="text-2xl font-bold">{isEdit ? "Edit Subcategory" : "Add New Subcategory"}</h2>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full"><X size={28} /></button>
            </div>

            <div className="p-6 space-y-6">
              {/* Category Dropdown */}
              <div>
                <label className="block text-lg font-medium mb-2">Select Category *</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 text-lg outline-none focus:ring-4 focus:ring-black/10"
                  disabled={catLoading}
                >
                  {catLoading ? (
                    <option>Loading categories...</option>
                  ) : categories.length === 0 ? (
                    <option>No categories found</option>
                  ) : (
                    categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Subcategory Name *" className="w-full border border-gray-300 rounded-xl px-5 py-4 text-lg outline-none focus:ring-4 focus:ring-black/10" />
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" rows={3} className="w-full border border-gray-300 rounded-xl px-5 py-4 resize-none outline-none focus:ring-4 focus:ring-black/10" />
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:ring-4 focus:ring-black/10" />
              <input value={offer} onChange={(e) => setOffer(e.target.value)} placeholder="Offer (e.g. 10%)" className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:ring-4 focus:ring-black/10" />

              {/* Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block font-bold text-lg mb-3">Web Image</label>
                  <label className="block border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer hover:border-black transition">
                    {webPreview ? <img src={webPreview} alt="web" className="mx-auto max-h-64 rounded-lg" /> : <div className="space-y-3"><Upload size={50} className="mx-auto text-gray-400" /><p className="text-gray-600 font-medium">Upload Web Image</p></div>}
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImage("web", e.target.files[0])} />
                  </label>
                </div>
                <div>
                  <label className="block font-bold text-lg mb-3">App Image (Optional)</label>
                  <label className="block border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer hover:border-black transition">
                    {appPreview ? <img src={appPreview} alt="app" className="mx-auto max-h-64 rounded-lg" /> : <div className="space-y-3"><Upload size={50} className="mx-auto text-gray-400" /><p className="text-gray-600 font-medium">Upload App Image</p></div>}
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImage("app", e.target.files[0])} />
                  </label>
                </div>
              </div>

              {error && <p className="text-red-600 bg-red-50 py-3 px-5 rounded-lg text-center font-medium">{error}</p>}

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button onClick={closeModal} disabled={saving} className="px-10 py-4 border-2 border-gray-300 rounded-xl font-bold hover:bg-gray-50">Cancel</button>
                <button onClick={isEdit ? handleEdit : handleAdd} disabled={saving || catLoading} className="px-12 py-4 bg-black text-white rounded-xl font-bold hover:bg-gray-800 disabled:opacity-60 shadow-lg">
                  {saving ? "Saving..." : isEdit ? "Update" : "Create"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}