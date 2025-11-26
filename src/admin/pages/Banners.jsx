// src/admin/pages/Banners.jsx → FINAL VERSION (GET + POST + PUT + DELETE)

import React, { useState, useEffect } from "react";
import { Plus, SquarePen, Trash2, X } from "lucide-react";
import BASE from "../../config";

const DEFAULT_BANNER = "https://via.placeholder.com/1920x600.png?text=No+Image";

export default function Banners() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [form, setForm] = useState({
    title: "",
    type: "",
    linkUrl: "",
    status: "active",
    image: null,
  });

  const [editForm, setEditForm] = useState({
    id: "",
    title: "",
    type: "",
    linkUrl: "",
    status: "active",
    image: null,
    oldImage: "",
  });

  const token = localStorage.getItem("token") || localStorage.getItem("accessToken");

  // FETCH BANNERS
  const fetchBanners = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE.BASE_URL}/banner/getAllBanner`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (res.ok && data.result) {
        const formatted = data.result.map((b) => ({
          id: b._id,
          title: (b.title || "Untitled").replace(/^"|"$/g, ""), // Remove extra quotes
          type: b.type || "General",
          link: b.linkUrl || "#",
          status: b.status || "inactive",
          img: b.image || DEFAULT_BANNER,
        }));
        setBanners(formatted);
      } else {
        setBanners([]);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to load banners");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // ADD BANNER
  const handleAdd = async () => {
    if (!form.title.trim()) return alert("Title required!");
    if (!form.image) return alert("Image required!");

    setSaving(true);
    const formData = new FormData();
    formData.append("title", form.title.trim());
    formData.append("type", form.type || "General");
    if (form.linkUrl) formData.append("linkUrl", form.linkUrl);
    formData.append("status", form.status);
    formData.append("image", form.image);

    try {
      const res = await fetch(`${BASE.BASE_URL}/banner/createBanner`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const result = await res.json();

      if (res.ok) {
        alert("Banner added successfully!");
        setShowAddModal(false);
        setForm({ title: "", type: "", linkUrl: "", status: "active", image: null });
        fetchBanners();
      } else {
        alert(result.message || "Failed to add banner");
      }
    } catch (err) {
      alert("Network error");
    } finally {
      setSaving(false);
    }
  };

  // EDIT BANNER
  const openEdit = (banner) => {
    setEditForm({
      id: banner.id,
      title: banner.title,
      type: banner.type,
      linkUrl: banner.link,
      status: banner.status,
      image: null,
      oldImage: banner.img,
    });
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    if (!editForm.title.trim()) return alert("Title required!");

    setSaving(true);
    const formData = new FormData();
    formData.append("title", editForm.title.trim());
    formData.append("type", editForm.type || "General");
    if (editForm.linkUrl) formData.append("linkUrl", editForm.linkUrl);
    formData.append("status", editForm.status);
    if (editForm.image) formData.append("image", editForm.image);

    try {
      const res = await fetch(`${BASE.BASE_URL}/banner/editBanner/${editForm.id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const result = await res.json();

      if (res.ok) {
        alert("Banner updated successfully!");
        setShowEditModal(false);
        fetchBanners();
      } else {
        alert(result.message || "Update failed");
      }
    } catch (err) {
      alert("Network error");
    } finally {
      setSaving(false);
    }
  };

  // DELETE BANNER - FULLY WORKING
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this banner permanently?")) return;

    setDeleting(true);
    try {
      const res = await fetch(`${BASE.BASE_URL}/banner/deleteBanner/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();

      if (res.ok && result.statusCode === 200) {
        alert("Banner deleted successfully!");
        fetchBanners(); // Refresh list
      } else {
        alert(result.message || "Failed to delete banner");
      }
    } catch (err) {
      console.error(err);
      alert("Network error while deleting");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-8 border-black border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-6 text-2xl font-bold text-gray-700">Loading Banners...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1>Banners</h1>
            <p className="text-gray-600">Manage homepage and promotional banners</p>
          </div>
          <button onClick={() => setShowAddModal(true)} className="bg-black text-white px-4 py-2 rounded flex items-center gap-2 text-sm">
            <Plus className="w-4 h-4" /> Add Banner
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {banners.length === 0 ? (
            <div className="col-span-2 text-center py-20 text-gray-500">
              <p className="text-xl">No banners found</p>
              <button onClick={() => setShowAddModal(true)} className="mt-4 text-blue-600 underline">Add your first banner</button>
            </div>
          ) : (
            banners.map((b) => (
              <div key={b.id} className="bg-white rounded-xl border overflow-hidden">
                <img src={b.img} alt={b.title} className="w-full h-48 object-cover" onError={(e) => (e.target.src = DEFAULT_BANNER)} />
                <div className="p-6 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{b.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{b.type}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded ${b.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                      {b.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(b)} className="border px-3 py-2 rounded flex items-center gap-2 text-sm w-full justify-center hover:bg-gray-50">
                      <SquarePen className="w-4 h-4" /> Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(b.id)} 
                      disabled={deleting}
                      className="border border-red-300 text-red-600 px-3 py-2 rounded flex items-center gap-2 text-sm w-full justify-center hover:bg-red-50 disabled:opacity-60"
                    >
                      <Trash2 className="w-4 h-4" /> {deleting ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

  
      {/* ADD MODAL */}
    {showAddModal && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setShowAddModal(false)} />
          <div className="fixed top-1/2 left-1/2 z-50 bg-white p-6 rounded-lg shadow-lg w-full max-w-lg -translate-x-1/2 -translate-y-1/2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Add New Banner</h2>
              <button onClick={() => setShowAddModal(false)} className="hover:bg-gray-100 rounded-full p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Banner Title *</label>
                <input
                  placeholder="e.g. Summer Sale 50% Off"
                  className="border w-full rounded px-3 py-2 mt-1"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Banner Type</label>
                <input
                  placeholder="e.g. Homepage Hero"
                  className="border w-full rounded px-3 py-2 mt-1"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Link URL (optional)</label>
                <input
                  placeholder="https://example.com/offer"
                  className="border w-full rounded px-3 py-2 mt-1"
                  value={form.linkUrl}
                  onChange={(e) => setForm({ ...form, linkUrl: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Status</label>
                <select
                  className="border w-full rounded px-3 py-2 mt-1"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Banner Image *</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {form.image ? (
                    <img src={URL.createObjectURL(form.image)} alt="preview" className="w-full h-40 object-cover rounded mb-3" />
                  ) : (
                    <p className="text-gray-500">Click to upload image</p>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="mt-3 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-black file:text-white hover:file:bg-gray-800"
                    onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                  />
                  <p className="text-xs text-gray-500 mt-2">Recommended: 1920x600px</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowAddModal(false)} className="border px-4 py-2 rounded">
                Cancel
              </button>
              <button
                onClick={handleAdd}
                disabled={saving}
                className="bg-black text-white px-6 py-2 rounded disabled:opacity-60"
              >
                {saving ? "Creating..." : "Create Banner"}
              </button>
            </div>
          </div>
        </>
      )}
      {/* EDIT MODAL - NOW FULLY WORKING */}
      {showEditModal && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setShowEditModal(false)} />
          <div className="fixed top-1/2 left-1/2 z-50 bg-white p-6 rounded-lg shadow-lg w-full max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto max-h-screen">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Edit Banner</h2>
              <button onClick={() => setShowEditModal(false)} className="hover:bg-gray-100 rounded-full p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title *</label>
                <input className="border w-full rounded px-3 py-2 mt-1" value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium">Type</label>
                <input className="border w-full rounded px-3 py-2 mt-1" value={editForm.type} onChange={(e) => setEditForm({ ...editForm, type: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium">Link URL</label>
                <input className="border w-full rounded px-3 py-2 mt-1" value={editForm.linkUrl} onChange={(e) => setEditForm({ ...editForm, linkUrl: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium">Status</label>
                <select className="border w-full rounded px-3 py-2 mt-1" value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Banner Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <img src={editForm.image ? URL.createObjectURL(editForm.image) : editForm.oldImage} alt="preview" className="w-full h-40 object-cover rounded mb-3" />
                  <input
                    type="file"
                    accept="image/*"
                    className="mt-3 block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-black file:text-white"
                    onChange={(e) => setEditForm({ ...editForm, image: e.target.files[0] })}
                  />
                  <p className="text-xs text-gray-500 mt-2">Leave empty to keep current image</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowEditModal(false)} className="border px-4 py-2 rounded">Cancel</button>
              <button onClick={handleUpdate} disabled={saving} className="bg-black text-white px-6 py-2 rounded disabled:opacity-60">
                {saving ? "Updating..." : "Update Banner"}
              </button>
            </div>
          </div>
        </>
      )}

      {/* EDIT MODAL */}
      {showEditModal && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setShowEditModal(false)} />
          <div className="fixed top-1/2 left-1/2 z-50 bg-white p-6 rounded-lg shadow-lg w-full max-w-lg -translate-x-1/2 -translate-y-1/2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Edit Banner</h2>
              <button onClick={() => setShowEditModal(false)} className="hover:bg-gray-100 rounded-full p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <input className="border w-full rounded px-3 py-2" value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} placeholder="Title" />
              <input className="border w-full rounded px-3 py-2" value={editForm.type} onChange={(e) => setEditForm({ ...editForm, type: e.target.value })} placeholder="Type" />
              <input className="border w-full rounded px-3 py-2" value={editForm.linkUrl} onChange={(e) => setEditForm({ ...editForm, linkUrl: e.target.value })} placeholder="Link URL" />
              <select className="border w-full rounded px-3 py-2" value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <img src={editForm.image ? URL.createObjectURL(editForm.image) : editForm.oldImage} alt="preview" className="w-full h-40 object-cover rounded mb-3" />
                <input type="file" accept="image/*" className="mt-3 block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:bg-black file:text-white" onChange={(e) => setEditForm({ ...editForm, image: e.target.files[0] })} />
                <p className="text-xs text-gray-500 mt-2">Leave empty to keep current image</p>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowEditModal(false)} className="border px-4 py-2 rounded">Cancel</button>
              <button onClick={handleUpdate} disabled={saving} className="bg-black text-white px-6 py-2 rounded disabled:opacity-60">
                {saving ? "Updating..." : "Update Banner"}
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}