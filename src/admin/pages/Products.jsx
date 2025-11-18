import React, { useState } from "react";
import { X, Plus, Upload, GripVertical } from "lucide-react";

export default function Products() {
  const [showAddModal, setShowAddModal] = useState(false);

  // ---------- Image Upload State ----------
  const [images, setImages] = useState([]);
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const fileURLs = files.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...fileURLs]);
  };
  const removeImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };
  

  // Drag reorder
  const handleDrag = (e, index) => {
    e.dataTransfer.setData("index", index);
  };
  const handleDrop = (e, index) => {
    const draggedIndex = e.dataTransfer.getData("index");
    if (draggedIndex === null) return;
    const newOrder = [...images];
    const draggedItem = newOrder.splice(draggedIndex, 1)[0];
    newOrder.splice(index, 0, draggedItem);
    setImages(newOrder);
  };

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="space-y-6">
        {/* ------------------- HEADER ------------------- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-xl font-semibold">Products</h1>
            <p className="text-gray-600">Manage your product inventory</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-black text-white rounded-md px-4 py-2 flex items-center gap-2 text-sm hover:bg-gray-800 transition"
          >
            <Plus className="w-4 h-4" />
            Add New Product
          </button>
        </div>

        {/* ------------------- TABLE CARD ------------------- */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 pt-6 pb-3 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <input
                className="border border-gray-200 w-full rounded-md px-3 py-2 pl-10"
                placeholder="Search products by name or SKU..."
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-3 top-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <select className="border border-gray-200 rounded-md px-3 py-2 w-full md:w-[200px]">
              <option>All Categories</option>
              <option>Plates</option>
              <option>Bowls</option>
              <option>Cups</option>
              <option>Dinner Sets</option>
              <option>Glassware</option>
            </select>
          </div>

          {/* ------------- STATIC TABLE ------------- */}
          <div className="px-6 pb-6 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 text-left text-gray-600">Image</th>
                  <th className="py-3 px-4 text-left text-gray-600">
                    Product Name
                  </th>
                  <th className="py-3 px-4 text-left text-gray-600">SKU</th>
                  <th className="py-3 px-4 text-left text-gray-600">
                    Category
                  </th>
                  <th className="py-3 px-4 text-left text-gray-600">Price</th>
                  <th className="py-3 px-4 text-left text-gray-600">Stock</th>
                  <th className="py-3 px-4 text-left text-gray-600">Status</th>
                  <th className="py-3 px-4 text-left text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200  hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <img
                      src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=100&h=100&fit=crop"
                      className="w-12 h-12 rounded object-cover"
                    />
                  </td>
                  <td className="py-3 px-4">Classic White Dinner Plates</td>
                  <td className="py-3 px-4">CRK-DIN-001</td>
                  <td className="py-3 px-4">Plates</td>
                  <td className="py-3 px-4">$39.99</td>
                  <td className="py-3 px-4">120</td>
                  <td className="py-3 px-4">
                    <span className="bg-green-100 text-green-800 px-2 py-1 text-xs rounded">
                      Active
                    </span>
                  </td>
                  <td className="py-3 px-4 flex gap-2">
                    <button className="p-1 hover:bg-gray-200 rounded">View</button>
                    <button className="p-1 hover:bg-gray-200 rounded">Edit</button>
                    <button className="p-1 hover:bg-gray-200 rounded text-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ------------------- MODAL ------------------- */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-h-[90vh] overflow-y-auto w-full max-w-5xl relative">
              {/* Close button */}
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-3 right-3 bg-gray-200 hover:bg-gray-300 p-1 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6 space-y-6">
                <h2 className="text-lg font-semibold">Add New Product</h2>
                <p className="text-sm text-gray-600">
                  Create a new product in your inventory
                </p>

                {/* ---------- FORM START ---------- */}
                <form className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* LEFT SIDE – 2 columns */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* PRODUCT INFORMATION */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">
                        Product Information
                      </h4>

                      {/* Product Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Product Name *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Classic White Dinner Plates"
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-black focus:ring-black"
                        />
                      </div>

                      {/* SKU + Category */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            SKU *
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., CRK-DIN-001"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-black focus:ring-black"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Category *
                          </label>
                          <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:ring-black">
                            <option>Select category</option>
                            <option>Plates</option>
                            <option>Bowls</option>
                            <option>Cups</option>
                            <option>Dinner Sets</option>
                            <option>Glassware</option>
                          </select>
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Product description..."
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-black focus:ring-black"
                        />
                      </div>
                    </div>

                    {/* PRODUCT IMAGES */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">
                        Product Images
                      </h4>

                      {/* Dropzone */}
                      <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <Upload className="w-10 h-10 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>

                      {/* Thumbnails */}
                      <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mt-4">
                        {images.map((img, idx) => (
                          <div
                            key={img.id}
                            className="relative group"
                            draggable
                            onDragStart={(e) => handleDrag(e, idx)}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => handleDrop(e, idx)}
                          >
                            <img
                              src={img.preview}
                              alt="preview"
                              className="w-full h-24 object-cover rounded border"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(img.id)}
                              className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition"
                            >
                              <X className="w-3 h-3" />
                            </button>
                            <div className="absolute bottom-1 left-1 bg-black/40 text-white text-xs px-1 py-0.5 rounded flex items-center gap-0.5">
                              <GripVertical className="w-3 h-3" />
                              Drag
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT SIDE – 1 column */}
                  <div className="space-y-6">
                    {/* PRICING */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Pricing</h4>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Price *
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:ring-black"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Sale Price
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:ring-black"
                        />
                      </div>
                    </div>

                    {/* INVENTORY */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Inventory</h4>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Stock Quantity *
                        </label>
                        <input
                          type="number"
                          placeholder="0"
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:ring-black"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Status
                        </label>
                        <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:ring-black">
                          <option>Active</option>
                          <option>Inactive</option>
                        </select>
                      </div>
                    </div>

                    {/* BUTTONS */}
                    <div className="flex flex-col gap-2">
                      <button
                        type="submit"
                        className="w-full bg-black text-white rounded-md py-2 font-medium hover:bg-gray-800 transition"
                      >
                        Add Product
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddModal(false)}
                        className="w-full border border-gray-300 rounded-md py-2 font-medium hover:bg-gray-100 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
                {/* ---------- FORM END ---------- */}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}