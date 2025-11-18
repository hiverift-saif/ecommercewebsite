// src/admin/component/Categories.jsx
import React, { useEffect, useRef, useState } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";

/**
 * Upgraded / Pro-level Categories component
 * - Responsive grid (1/2/3/4 cols)
 * - Add / Edit / Delete modals with validation
 * - Image preview, file type + size check (10MB)
 * - Clean, smaller code and accessible markup
 * - Uses local state array (replace with API easily)
 */

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/gif"];

const defaultCategories = [
  {
    id: 1,
    name: "Decor",
    count: 120,
    img: "https://www.earthstore.in/cdn/shop/files/Peaceful_Buddha_-_The_Earth_Store_-_-_-2302726_400x.jpg",
  },
  {
    id: 2,
    name: "Drinkware",
    count: 85,
    img: "https://www.earthstore.in/cdn/shop/files/Solid_Multicolor_Coffee_Mug_Set_of_6_-_The_Earth_Store_-_-_-2304533_400x.jpg",
  },
  {
    id: 3,
    name: "Tableware",
    count: 98,
    img: "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300465_400x.jpg",
  },
  {
    id: 4,
    name: "Home Essentials",
    count: 52,
    img: "https://www.earthstore.in/cdn/shop/files/Peaceful_Buddha_-_The_Earth_Store_-_-_-2302729_400x.jpg",
  },
  {
    id: 5,
    name: "Sale",
    count: 40,
    img: "https://www.earthstore.in/cdn/shop/files/The_Earth_Store_Aroma_diffusers_550x.progressive.png.jpg",
  },
  {
    id: 6,
    name: "Combo",
    count: 18,
    img: "https://www.earthstore.in/cdn/shop/files/Solid_Multicolor_Coffee_Mug_Set_of_6_-_The_Earth_Store_-_-_-2304533_400x.jpg",
  },
  {
    id: 7,
    name: "Women Accessories",
    count: 60,
    img: "https://www.earthstore.in/cdn/shop/files/Peaceful_Buddha_-_The_Earth_Store_-_-_-2302726_400x.jpg",
  },
];


export default function Categories() {
  // categories state (replace with fetching from API)
  const [categories, setCategories] = useState(defaultCategories);

  // modal states
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // add form
  const [addName, setAddName] = useState("");
  const [addFile, setAddFile] = useState(null);
  const [addPreview, setAddPreview] = useState(null);
  const addInputRef = useRef(null);

  // edit form
  const [editingIndex, setEditingIndex] = useState(null);
  const [editName, setEditName] = useState("");
  const [editFile, setEditFile] = useState(null);
  const [editPreview, setEditPreview] = useState(null);
  const editInputRef = useRef(null);

  // delete index
  const [deleteIndex, setDeleteIndex] = useState(null);

  // validation errors
  const [formError, setFormError] = useState("");

  // cleanup object URLs on unmount or change
  useEffect(() => {
    return () => {
      if (addPreview) URL.revokeObjectURL(addPreview);
      if (editPreview) URL.revokeObjectURL(editPreview);
    };
  }, [addPreview, editPreview]);

  // ---------- helpers ----------
  const validateFile = (file) => {
    if (!file) return null;
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return "Invalid file type. Use PNG / JPG / GIF.";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "File too large. Max 10MB.";
    }
    return null;
  };

  // ---------- ADD ----------
  const openAdd = () => {
    setFormError("");
    setAddName("");
    setAddFile(null);
    if (addPreview) {
      URL.revokeObjectURL(addPreview);
      setAddPreview(null);
    }
    setAddOpen(true);
    // focus input after open
    setTimeout(() => addInputRef.current?.focus(), 50);
  };

  const onAddFile = (e) => {
    const file = e.target.files?.[0];
    const err = validateFile(file);
    if (err) {
      setFormError(err);
      return;
    }
    setFormError("");
    if (addPreview) URL.revokeObjectURL(addPreview);
    setAddFile(file);
    setAddPreview(file ? URL.createObjectURL(file) : null);
  };

  const submitAdd = (e) => {
    e.preventDefault();
    setFormError("");
    if (!addName.trim()) {
      setFormError("Category name is required.");
      return;
    }
    const id = Date.now();
    const newCat = {
      id,
      name: addName.trim(),
      count: 0,
      img:
        addPreview ||
        `https://via.placeholder.com/400?text=${encodeURIComponent(addName.trim())}`,
    };
    setCategories((s) => [newCat, ...s]);
    // cleanup & close
    if (addPreview) URL.revokeObjectURL(addPreview);
    setAddPreview(null);
    setAddFile(null);
    setAddOpen(false);
  };

  const closeAdd = () => {
    setAddOpen(false);
    setFormError("");
    if (addPreview) URL.revokeObjectURL(addPreview);
    setAddPreview(null);
    setAddFile(null);
  };

  // ---------- EDIT ----------
  const openEdit = (index) => {
    const cat = categories[index];
    setEditingIndex(index);
    setEditName(cat.name);
    setEditPreview(null);
    setEditFile(null);
    setFormError("");
    setEditOpen(true);
    setTimeout(() => editInputRef.current?.focus(), 50);
  };

  const onEditFile = (e) => {
    const file = e.target.files?.[0];
    const err = validateFile(file);
    if (err) {
      setFormError(err);
      return;
    }
    setFormError("");
    if (editPreview) URL.revokeObjectURL(editPreview);
    setEditFile(file);
    setEditPreview(file ? URL.createObjectURL(file) : null);
  };

  const submitEdit = (e) => {
    e.preventDefault();
    setFormError("");
    if (editingIndex === null) return;
    if (!editName.trim()) {
      setFormError("Category name is required.");
      return;
    }

    setCategories((prev) => {
      const next = [...prev];
      const current = { ...next[editingIndex] };
      current.name = editName.trim();
      if (editPreview) current.img = editPreview; // in real app replace with server url
      next[editingIndex] = current;
      return next;
    });

    // cleanup & close
    if (editPreview) URL.revokeObjectURL(editPreview);
    setEditPreview(null);
    setEditFile(null);
    setEditingIndex(null);
    setEditOpen(false);
  };

  const closeEdit = () => {
    setEditOpen(false);
    setEditingIndex(null);
    setFormError("");
    if (editPreview) URL.revokeObjectURL(editPreview);
    setEditPreview(null);
    setEditFile(null);
  };

  // ---------- DELETE ----------
  const openDelete = (index) => {
    setDeleteIndex(index);
    setDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (deleteIndex === null) return;
    setCategories((prev) => prev.filter((_, i) => i !== deleteIndex));
    setDeleteOpen(false);
    setDeleteIndex(null);
  };

  const closeDelete = () => {
    setDeleteOpen(false);
    setDeleteIndex(null);
  };

  // ---------- Accessibility: close modals with Esc ----------
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (addOpen) closeAdd();
        if (editOpen) closeEdit();
        if (deleteOpen) closeDelete();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [addOpen, editOpen, deleteOpen]);

  // small presentational helpers
  const circleClass = "w-24 h-24 object-cover rounded-full mb-4 border border-gray-200";

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="space-y-6">
        {/* header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-xl font-semibold">Categories</h1>
            <p className="text-gray-600">Manage product categories</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={openAdd}
              className="inline-flex items-center gap-2 rounded-md text-sm font-medium bg-black text-white hover:bg-gray-800 h-9 px-4"
            >
              <Plus className="w-4 h-4" />
              Add Category
            </button>
          </div>
        </div>

        {/* grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <article
              key={cat.id}
              className="bg-white flex flex-col gap-6 rounded-xl border border-gray-200"
              aria-label={`${cat.name} category`}
            >
              <div className="p-6">
                <div className="flex flex-col items-center text-center">
                  <img src={cat.img} alt={cat.name} className={circleClass} />
                  <h3 className="text-lg font-medium">{cat.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{cat.count} Products</p>

                  <div className="flex gap-2 w-full">
                    <button
                      onClick={() => openEdit(idx)}
                      className="flex-1 border rounded-md px-3 h-8 flex items-center justify-center hover:bg-gray-50 transition"
                      aria-label={`Edit ${cat.name}`}
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => openDelete(idx)}
                      className="flex-1 border rounded-md px-3 h-8 flex items-center justify-center hover:bg-gray-50 transition"
                      aria-label={`Delete ${cat.name}`}
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ========== ADD MODAL ========== */}
      {addOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeAdd}
            aria-hidden
          />

          <div className="relative z-10 w-full max-w-lg rounded-lg bg-white border border-gray-200 shadow-xl">
            <header className="p-4 border-b border-gray-100 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold">Add New Category</h2>
                <p className="text-sm text-gray-600">Create a new product category.</p>
              </div>
              <button
                onClick={closeAdd}
                className="p-2 rounded hover:bg-gray-100"
                aria-label="Close add dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </header>

            <form onSubmit={submitAdd} className="p-4 space-y-4 max-h-[70vh] overflow-auto">
              <div>
                <label className="text-sm font-medium block">Category Name</label>
                <input
                  ref={addInputRef}
                  value={addName}
                  onChange={(e) => setAddName(e.target.value)}
                  className="mt-1 h-9 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-black focus:ring-black"
                  placeholder="e.g., Dinner Sets"
                  required
                  aria-required
                />
              </div>

              <div>
                <label className="text-sm font-medium block">Category Image</label>
                <div className="mt-2 flex items-start gap-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-200 flex items-center justify-center bg-gray-50">
                    {addPreview ? (
                      <img src={addPreview} alt="preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs text-gray-500">No image</span>
                    )}
                  </div>

                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={onAddFile}
                      aria-label="Upload category image"
                      className=" border border-gray-200 rounded-md w-40 text-sm outline-none focus:border-black focus:ring-black"
                    />
                    <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>

              {formError && <p className="text-sm text-red-600">{formError}</p>}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeAdd}
                  className="inline-flex items-center justify-center gap-2 rounded-md text-sm border bg-white text-gray-700 h-9 px-4"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-md text-sm bg-black text-white h-9 px-4"
                >
                  Add Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========== EDIT MODAL ========== */}
      {editOpen && editingIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeEdit}
            aria-hidden
          />

          <div className="relative z-10 w-full max-w-lg rounded-lg bg-white border border-gray-200 shadow-xl">
            <header className="p-4 border-b border-gray-100 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold">Edit Category</h2>
                <p className="text-sm text-gray-600">Update the category details below.</p>
              </div>
              <button
                onClick={closeEdit}
                className="p-2 rounded hover:bg-gray-100"
                aria-label="Close edit dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </header>

            <form onSubmit={submitEdit} className="p-4 space-y-4 max-h-[70vh] overflow-auto">
              <div>
                <label className="text-sm font-medium block">Category Name</label>
                <input
                  ref={editInputRef}
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="mt-1 h-9 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-black focus:ring-black"
                  placeholder="e.g., Dinner Sets"
                  required
                  aria-required
                />
              </div>

              <div>
                <label className="text-sm font-medium block">Category Image</label>
                <div className="mt-2 flex items-start gap-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-200 flex items-center justify-center bg-gray-50">
                    <img
                      src={
                        editPreview ||
                        categories[editingIndex]?.img ||
                        "https://via.placeholder.com/400?text=No+Image"
                      }
                      alt="category preview"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <input type="file" accept="image/*" onChange={onEditFile} className="border border-gray-300 rounded-md w-40 text-sm outline-none focus:border-black focus:ring-black" />
                    <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>

              {formError && <p className="text-sm text-red-600">{formError}</p>}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeEdit}
                  className="inline-flex items-center justify-center gap-2 rounded-md text-sm border bg-white text-gray-700 h-9 px-4"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-md text-sm bg-black text-white h-9 px-4"
                >
                  Update Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========== DELETE CONFIRM ========== */}
      {deleteOpen && deleteIndex !== null && (
        <div
          role="alertdialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeDelete}
            aria-hidden
          />

          <div className="relative z-10 w-full max-w-md rounded-lg bg-white border border-gray-200 shadow-xl p-6">
            <h3 className="text-lg font-semibold mb-2">Are you sure?</h3>
            <p className="text-sm text-gray-600 mb-4">
              This action cannot be undone. This will permanently delete the category.
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={closeDelete}
                className="inline-flex items-center justify-center gap-2 rounded-md text-sm border bg-white text-gray-700 h-9 px-4"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="inline-flex items-center justify-center gap-2 rounded-md text-sm bg-black text-white h-9 px-4"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
