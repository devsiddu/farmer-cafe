import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import {
  Upload, X, Plus, ArrowLeft, Package,
  Tag, DollarSign, Hash, AlignLeft, Star,
  ImagePlus, Link as LinkIcon, FolderOpen,
} from "lucide-react";

const CATEGORIES = [
  "Fertilizer", "Pesticide", "Herbicide",
  "Seeds", "Organic", "Irrigation", "Tools", "Other",
];

interface ImageEntry {
  src: string;           // object URL (file) or pasted URL
  source: "file" | "url";
  file?: File;
  name?: string;         // original filename for display
}

interface FormData {
  name: string;
  category: string;
  price: string;
  quantity: string;
  description: string;
  images: ImageEntry[];
}

interface FormErrors {
  name?: string;
  category?: string;
  price?: string;
  quantity?: string;
  description?: string;
  images?: string;
}

const AddProduct = () => {
  const { user } = useApp();
  const navigate = useNavigate();

  const [form, setForm] = useState<FormData>({
    name: "", category: "", price: "", quantity: "", description: "", images: [],
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [urlInput, setUrlInput] = useState("");
  const [urlError, setUrlError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [tab, setTab] = useState<"upload" | "url">("upload");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Field change ──
  const handleChange = (field: keyof FormData, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: undefined }));
  };

  // ── File upload handler ──
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const remaining = 4 - form.images.length;
    if (remaining <= 0) return;

    const toAdd: ImageEntry[] = files.slice(0, remaining).map((file) => ({
      src: URL.createObjectURL(file),
      source: "file" as const,
      file,
      name: file.name,
    }));

    setForm((p) => ({ ...p, images: [...p.images, ...toAdd] }));
    setErrors((p) => ({ ...p, images: undefined }));
    // reset input so same file can be re-selected
    e.target.value = "";
  };

  // ── Drag & drop ──
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"));
    const remaining = 4 - form.images.length;
    const toAdd: ImageEntry[] = files.slice(0, remaining).map((file) => ({
      src: URL.createObjectURL(file),
      source: "file" as const,
      file,
      name: file.name,
    }));
    if (toAdd.length) {
      setForm((p) => ({ ...p, images: [...p.images, ...toAdd] }));
      setErrors((p) => ({ ...p, images: undefined }));
    }
  };

  // ── Add image URL ──
  const addImageUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) { setUrlError("Enter a URL"); return; }
    try { new URL(trimmed); } catch { setUrlError("Enter a valid URL"); return; }
    if (form.images.some((img) => img.src === trimmed)) { setUrlError("Already added"); return; }
    if (form.images.length >= 4) { setUrlError("Max 4 images allowed"); return; }
    setForm((p) => ({ ...p, images: [...p.images, { src: trimmed, source: "url" }] }));
    setUrlInput("");
    setUrlError("");
    setErrors((p) => ({ ...p, images: undefined }));
  };

  // ── Remove image ──
  const removeImage = (idx: number) => {
    const removed = form.images[idx];
    if (removed.source === "file") URL.revokeObjectURL(removed.src);
    setForm((p) => ({ ...p, images: p.images.filter((_, i) => i !== idx) }));
  };

  // ── Validation ──
  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Product name is required";
    if (!form.category) e.category = "Select a category";
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0)
      e.price = "Enter a valid price";
    if (!form.quantity || isNaN(Number(form.quantity)) || Number(form.quantity) < 0)
      e.quantity = "Enter a valid quantity";
    if (!form.description.trim()) e.description = "Description is required";
    if (form.images.length === 0) e.images = "Add at least one image";
    return e;
  };

  // ── Submit ──
  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => navigate("/admin-dashboard/products"), 1500);
    }, 1200);
  };

  // ── Success ──
  if (success) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh] flex-col gap-4">
        <div className="w-16 h-16 rounded-2xl bg-green-50 border-2 border-green-200 flex items-center justify-center text-3xl">✅</div>
        <h2 className="text-lg font-bold text-gray-800">Product Added!</h2>
        <p className="text-sm text-gray-400">Redirecting to products...</p>
      </div>
    );
  }

  return (
    <div className="flex-1  md:px-18 max-w-3xl w-full">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
          <p className="text-sm text-gray-400 mt-1">{user?.firstName}'s shop · Fill in the product details below</p>
        </div>
      </div>

      <div className="flex flex-col gap-5">

        {/* ── Image Section ── */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <ImagePlus className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-semibold text-gray-700">Product Images</h2>
            <span className="ml-auto text-xs text-gray-400">{form.images.length}/4</span>
          </div>

          {/* Preview grid */}
          {form.images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {form.images.map((img, i) => (
                <div key={i} className="relative group aspect-square rounded-xl overflow-hidden border border-gray-100">
                  <img src={img.src} alt={`img-${i}`} className="w-full h-full object-cover" />
                  {/* Badges */}
                  <div className="absolute top-1.5 left-1.5 flex gap-1">
                    {i === 0 && (
                      <span className="text-[9px] bg-primary text-white font-bold px-1.5 py-0.5 rounded-full">Main</span>
                    )}
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${img.source === "file" ? "bg-blue-500 text-white" : "bg-amber-400 text-white"
                      }`}>
                      {img.source === "file" ? "Local" : "URL"}
                    </span>
                  </div>
                  {/* Remove */}
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute top-1.5 right-1.5 w-5 h-5 bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  {/* File name tooltip */}
                  {img.source === "file" && img.name && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[9px] px-1.5 py-1 truncate opacity-0 group-hover:opacity-100 transition">
                      {img.name}
                    </div>
                  )}
                </div>
              ))}
              {/* Empty slots */}
              {Array.from({ length: 4 - form.images.length }).map((_, i) => (
                <div key={`e-${i}`} className="aspect-square rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center">
                  <Upload className="w-5 h-5 text-gray-300" />
                </div>
              ))}
            </div>
          )}

          {/* Tab switcher */}
          {form.images.length < 4 && (
            <>
              <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-3">
                <button
                  onClick={() => setTab("upload")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition ${tab === "upload" ? "bg-white text-primary shadow-sm" : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  <FolderOpen className="w-3.5 h-3.5" />
                  Upload from Computer
                </button>
                <button
                  onClick={() => setTab("url")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition ${tab === "url" ? "bg-white text-primary shadow-sm" : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                  Paste Image URL
                </button>
              </div>

              {/* Upload tab */}
              {tab === "upload" && (
                <>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className="border-2 border-dashed border-gray-200 hover:border-primary/40 hover:bg-primary/5 rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-primary/10 flex items-center justify-center transition">
                      <Upload className="w-5 h-5 text-gray-400 group-hover:text-primary transition" />
                    </div>
                    <p className="text-sm font-medium text-gray-600">
                      Click to browse or drag & drop
                    </p>
                    <p className="text-xs text-gray-400">PNG, JPG, WEBP · Max 4 images</p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </>
              )}

              {/* URL tab */}
              {tab === "url" && (
                <div className="flex gap-2">
                  <div className={`flex-1 flex items-center gap-2 border rounded-xl px-3 py-2.5 transition ${urlError ? "border-red-300 bg-red-50/30" : "border-gray-200 hover:border-gray-300"
                    }`}>
                    <LinkIcon className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <input
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={urlInput}
                      onChange={(e) => { setUrlInput(e.target.value); setUrlError(""); }}
                      onKeyDown={(e) => e.key === "Enter" && addImageUrl()}
                      className="flex-1 text-sm bg-transparent outline-none placeholder-gray-400"
                    />
                  </div>
                  <button
                    onClick={addImageUrl}
                    className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              )}

              {urlError && <p className="text-xs text-red-500 mt-1.5 ml-1">{urlError}</p>}
            </>
          )}

          {errors.images && <p className="text-xs text-red-500 mt-2 ml-1">{errors.images}</p>}
          <p className="text-[10px] text-gray-400 mt-2">First image is used as the main display. Max 4 images. You can mix local files and URLs.</p>
        </div>

        {/* ── Basic Info ── */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-semibold text-gray-700">Basic Information</h2>
          </div>
          <div className="flex flex-col gap-4">

            {/* Name */}
            <div>
              <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">Product Name *</label>
              <div className={`flex items-center gap-2 border rounded-xl px-4 py-3 transition ${errors.name ? "border-red-300 bg-red-50/30" : form.name ? "border-primary/40 bg-primary/5" : "border-gray-200 hover:border-gray-300"
                }`}>
                <Tag className="w-4 h-4 text-gray-400 shrink-0" />
                <input type="text" placeholder="e.g. Urea Fertilizer (50kg)" value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="flex-1 text-sm bg-transparent outline-none placeholder-gray-400" />
              </div>
              {errors.name && <p className="text-xs text-red-500 mt-1 ml-1">{errors.name}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">Category *</label>
              <div className={`flex items-center gap-2 border rounded-xl px-4 py-3 transition ${errors.category ? "border-red-300 bg-red-50/30" : form.category ? "border-primary/40 bg-primary/5" : "border-gray-200 hover:border-gray-300"
                }`}>
                <Star className="w-4 h-4 text-gray-400 shrink-0" />
                <select value={form.category} onChange={(e) => handleChange("category", e.target.value)}
                  className="flex-1 text-sm bg-transparent outline-none text-gray-700 cursor-pointer">
                  <option value="">Select a category</option>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              {errors.category && <p className="text-xs text-red-500 mt-1 ml-1">{errors.category}</p>}
            </div>

            {/* Price + Qty */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">Price (₹) *</label>
                <div className={`flex items-center gap-2 border rounded-xl px-4 py-3 transition ${errors.price ? "border-red-300 bg-red-50/30" : form.price ? "border-primary/40 bg-primary/5" : "border-gray-200 hover:border-gray-300"
                  }`}>
                  <DollarSign className="w-4 h-4 text-gray-400 shrink-0" />
                  <input type="number" placeholder="320" value={form.price} min={0}
                    onChange={(e) => handleChange("price", e.target.value)}
                    className="flex-1 text-sm bg-transparent outline-none placeholder-gray-400 w-0" />
                </div>
                {errors.price && <p className="text-xs text-red-500 mt-1 ml-1">{errors.price}</p>}
              </div>
              <div>
                <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">Quantity *</label>
                <div className={`flex items-center gap-2 border rounded-xl px-4 py-3 transition ${errors.quantity ? "border-red-300 bg-red-50/30" : form.quantity ? "border-primary/40 bg-primary/5" : "border-gray-200 hover:border-gray-300"
                  }`}>
                  <Hash className="w-4 h-4 text-gray-400 shrink-0" />
                  <input type="number" placeholder="40" value={form.quantity} min={0}
                    onChange={(e) => handleChange("quantity", e.target.value)}
                    className="flex-1 text-sm bg-transparent outline-none placeholder-gray-400 w-0" />
                </div>
                {errors.quantity && <p className="text-xs text-red-500 mt-1 ml-1">{errors.quantity}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* ── Description ── */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <AlignLeft className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-semibold text-gray-700">Description</h2>
            <span className="ml-auto text-xs text-gray-400">{form.description.length}/500</span>
          </div>
          <div className={`border rounded-xl p-3 transition ${errors.description ? "border-red-300 bg-red-50/30" : form.description ? "border-primary/40 bg-primary/5" : "border-gray-200 hover:border-gray-300"
            }`}>
            <textarea rows={4} maxLength={500} placeholder="Describe your product — features, usage, benefits..."
              value={form.description} onChange={(e) => handleChange("description", e.target.value)}
              className="w-full text-sm bg-transparent outline-none placeholder-gray-400 resize-none" />
          </div>
          {errors.description && <p className="text-xs text-red-500 mt-1 ml-1">{errors.description}</p>}
        </div>

        {/* ── Shop info ── */}
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Listing Under</p>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Package className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700">Kisan Agro Center</p>
              <p className="text-xs text-gray-400">Gokak, Belagavi · +91 98765 43210</p>
            </div>
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="flex gap-3 pb-6">
          <button onClick={() => navigate(-1)}
            className="flex-1 py-3 rounded-xl text-sm font-semibold border border-gray-200 text-gray-500 hover:bg-gray-50 transition active:scale-95">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={loading}
            className={`flex-2 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition active:scale-95 ${loading ? "bg-primary/60 text-white cursor-not-allowed" : "bg-primary text-white hover:bg-primary/90"
              }`}>
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                  <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                </svg>
                Adding Product...
              </>
            ) : (
              <><Plus className="w-4 h-4" /> Add Product</>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddProduct;