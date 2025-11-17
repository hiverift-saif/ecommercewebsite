import React, { useState } from "react";
import { SquarePen, Trash2, Plus, Upload, X } from "lucide-react";

export default function Banners() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [form, setForm] = useState({
    title: "",
    type: "",
    link: "",
    status: "Active",
    image: null,
  });

  const [editForm, setEditForm] = useState({
    title: "",
    type: "",
    link: "",
    status: "Active",
    image: null,
  });

  // Dummy banners
  const [banners, setBanners] = useState([
    {
      id: 1,
      title: "Summer Sale - 30% Off",
      type: "Homepage Hero",
      status: "Active",
      img: "/banner-placeholder.jpg",
    },
    {
      id: 2,
      title: "New Dinner Set Collection",
      type: "Homepage Banner",
      status: "Active",
      img: "/banner-placeholder.jpg",
    },
  ]);

  // ADD BANNER
  const handleAdd = () => {
    if (!form.title || !form.type) {
      alert("Please fill all required fields!");
      return;
    }

    setBanners([
      ...banners,
      {
        id: Date.now(),
        title: form.title,
        type: form.type,
        link: form.link,
        status: form.status,
        img: form.image ? URL.createObjectURL(form.image) : "/banner-placeholder.jpg",
      },
    ]);

    setShowAddModal(false);
    setForm({
      title: "",
      type: "",
      link: "",
      status: "Active",
      image: null,
    });

    alert("Banner added successfully!");
  };

  // EDIT BANNER LOAD
  const openEdit = (b) => {
    setEditForm({
      title: b.title,
      type: b.type,
      link: b.link,
      status: b.status,
      image: null,
      oldImage: b.img
    });
    setShowEditModal(true);
  };

  // SAVE UPDATE
  const handleUpdate = () => {
    if (!editForm.title || !editForm.type) {
      alert("Please fill all required fields!");
      return;
    }

    alert("Banner updated!");
    setShowEditModal(false);
  };

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1>Banners</h1>
            <p className="text-gray-600">Manage homepage and promotional banners</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-black text-white px-4 py-2 rounded flex items-center gap-2 text-sm"
          >
            <Plus className="w-4 h-4" /> Add Banner
          </button>
        </div>

        {/* BANNER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {banners.map((b) => (
            <div key={b.id} className="bg-white rounded-xl border">
              <img
                src={b.img}
                className="w-full h-48 object-cover rounded-t-lg"
              />

              <div className="p-6 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3>{b.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{b.type}</p>
                  </div>

                  <span className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-700">
                    {b.status}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(b)}
                    className="border px-3 py-2 rounded flex items-center gap-2 text-sm w-full"
                  >
                    <SquarePen className="w-4 h-4" /> Edit
                  </button>

                  <button className="border px-3 py-2 rounded flex items-center gap-2 text-sm w-full">
                    <Trash2 className="w-4 h-4 text-red-500" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* ─────────────────────────────────────────────── */}
      {/* ADD BANNER MODAL */}
      {/* ─────────────────────────────────────────────── */}
      {showAddModal && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40" />
          <div className="fixed top-1/2 left-1/2 z-50 bg-white p-6 rounded-lg shadow-lg w-full max-w-lg -translate-x-1/2 -translate-y-1/2">

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Add New Banner</h2>
              <button onClick={() => setShowAddModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">

              {/* Title */}
              <div>
                <label className="text-sm">Banner Title</label>
                <input
                  className="border w-full rounded px-3 py-2 mt-1"
                  placeholder="e.g., Summer Sale - 30% Off"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

              {/* Type */}
              <div>
                <label className="text-sm">Banner Type</label>
                <input
                  className="border w-full rounded px-3 py-2 mt-1"
                  placeholder="Homepage Hero"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                />
              </div>

              {/* Link */}
              <div>
                <label className="text-sm">Link URL</label>
                <input
                  className="border w-full rounded px-3 py-2 mt-1"
                  placeholder="/sale"
                  value={form.link}
                  onChange={(e) => setForm({ ...form, link: e.target.value })}
                />
              </div>

              {/* Status */}
              <div>
                <label className="text-sm">Status</label>
                <select
                  className="border w-full rounded px-3 py-2 mt-1"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>

              {/* Image Upload */}
              <div>
                <label className="text-sm">Banner Image</label>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <img
                    src={
                      form.image
                        ? URL.createObjectURL(form.image)
                        : "/banner-placeholder.jpg"
                    }
                    className="w-full h-40 object-cover rounded mb-3"
                  />

                  <p className="text-xs text-gray-500">Recommended: 1920x600px</p>

                  <input
                    type="file"
                    className="mt-2"
                    accept="image/*"
                    onChange={(e) =>
                      setForm({ ...form, image: e.target.files[0] })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleAdd}
                className="bg-black text-white px-4 py-2 rounded"
              >
                Add Banner
              </button>
            </div>
          </div>
        </>
      )}


      {/* ─────────────────────────────────────────────── */}
      {/* EDIT BANNER MODAL */}
      {/* ─────────────────────────────────────────────── */}
      {showEditModal && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40" />
          <div className="fixed top-1/2 left-1/2 z-50 bg-white p-6 rounded-lg shadow-lg w-full max-w-lg -translate-x-1/2 -translate-y-1/2">

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Edit Banner</h2>
              <button onClick={() => setShowEditModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">

              {/* Title */}
              <div>
                <label className="text-sm">Banner Title</label>
                <input
                  className="border w-full rounded px-3 py-2 mt-1"
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm({ ...editForm, title: e.target.value })
                  }
                />
              </div>

              {/* Type */}
              <div>
                <label className="text-sm">Banner Type</label>
                <input
                  className="border w-full rounded px-3 py-2 mt-1"
                  value={editForm.type}
                  onChange={(e) =>
                    setEditForm({ ...editForm, type: e.target.value })
                  }
                />
              </div>

              {/* Link */}
              <div>
                <label className="text-sm">Link URL</label>
                <input
                  className="border w-full rounded px-3 py-2 mt-1"
                  value={editForm.link}
                  onChange={(e) =>
                    setEditForm({ ...editForm, link: e.target.value })
                  }
                />
              </div>

              {/* Status */}
              <div>
                <label className="text-sm">Status</label>
                <select
                  className="border w-full rounded px-3 py-2 mt-1"
                  value={editForm.status}
                  onChange={(e) =>
                    setEditForm({ ...editForm, status: e.target.value })
                  }
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>

              {/* Image */}
              <div>
                <label className="text-sm">Banner Image</label>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <img
                    src={
                      editForm.image
                        ? URL.createObjectURL(editForm.image)
                        : editForm.oldImage || "/banner-placeholder.jpg"
                    }
                    className="w-full h-40 object-cover rounded mb-3"
                  />

                  <input
                    type="file"
                    className="mt-2"
                    accept="image/*"
                    onChange={(e) =>
                      setEditForm({ ...editForm, image: e.target.files[0] })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="bg-black text-white px-4 py-2 rounded"
              >
                Update Banner
              </button>
            </div>

          </div>
        </>
      )}
    </main>
  );
}
