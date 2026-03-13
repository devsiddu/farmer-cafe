import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import {
  Upload, X, Plus, Package,
  Tag, DollarSign, Hash, AlignLeft, Star, ImagePlus,
} from "lucide-react";
import toast from "react-hot-toast";

const CATEGORIES = [
  "Fertilizer", "Pesticide", "Herbicide",
  "Seeds", "Organic", "Irrigation", "Tools", "Other",
];

interface ImageEntry {
  src: string;
  file: File;
  name: string;
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
  const { user, axios, shop } = useApp();
  const navigate = useNavigate();

  const [form, setForm] = useState<FormData>({
    name: "", category: "", price: "", quantity: "", description: "", images: [],
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const remaining = 4 - form.images.length;
    const toAdd: ImageEntry[] = files.slice(0, remaining).map((file) => ({
      src: URL.createObjectURL(file),
      file,
      name: file.name,
    }));
    setForm((p) => ({ ...p, images: [...p.images, ...toAdd] }));
    setErrors((p) => ({ ...p, images: undefined }));
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"));
    const remaining = 4 - form.images.length;
    const toAdd: ImageEntry[] = files.slice(0, remaining).map((file) => ({
      src: URL.createObjectURL(file),
      file,
      name: file.name,
    }));
    if (toAdd.length) {
      setForm((p) => ({ ...p, images: [...p.images, ...toAdd] }));
      setErrors((p) => ({ ...p, images: undefined }));
    }
  };

  const removeImage = (idx: number) => {
    URL.revokeObjectURL(form.images[idx].src);
    setForm((p) => ({ ...p, images: p.images.filter((_, i) => i !== idx) }));
  };

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.name.trim())     e.name        = "Product name is required";
    if (!form.category)        e.category    = "Select a category";
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0)
                               e.price       = "Enter a valid price";
    if (!form.quantity || isNaN(Number(form.quantity)) || Number(form.quantity) < 0)
                               e.quantity    = "Enter a valid quantity";
    if (!form.description.trim()) e.description = "Description is required";
    if (form.images.length === 0) e.images   = "Add at least one image";
    return e;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("category", form.category);
    formData.append("price", form.price);
    formData.append("quantity", form.quantity);
    formData.append("description", form.description);
    formData.append("shopId", shop!._id);
    form.images.forEach((img) => formData.append("images", img.file));
    try {
      const { data } = await axios.post("/api/shop/add-product", formData);
      if (data.success) {
        toast.success(data.message);
        setSuccess(true);
        setTimeout(() => navigate("/shop-dashboard/products"), 1500);
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Upload failed");
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh] flex-col gap-4">
        <div className="w-16 h-16 rounded-2xl bg-green-50 border-2 border-green-200 flex items-center justify-center text-3xl">✅</div>
        <h2 className="text-lg font-bold text-gray-800">Product Added!</h2>
        <p className="text-sm text-gray-400">Redirecting to products...</p>
      </div>
    );
  }

  const inputClass = (err?: string, filled?: boolean) =>
    `flex items-center gap-2 border rounded-xl px-3 py-2.5 transition ${
      err ? "border-red-300 bg-red-50/30" : filled ? "border-primary/40 bg-primary/5" : "border-gray-200 hover:border-gray-300"
    }`;

  return (
    <div className="max-w-6xl mx-auto">

      {/* ── Header ── */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
        <p className="text-sm text-gray-400 mt-1">{user?.firstName}'s shop · Fill in the details below</p>
      </div>

      {/* ── Two-column grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-5 items-start">

        {/* ── LEFT: Images ── */}
        <div className="flex flex-col gap-4">

          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <ImagePlus className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-semibold text-gray-700">Images</h2>
              <span className="ml-auto text-xs text-gray-400">{form.images.length}/4</span>
            </div>

            {/* 2×2 image grid */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              {form.images.map((img, i) => (
                <div key={i} className="relative group aspect-square rounded-xl overflow-hidden border border-gray-100">
                  <img src={img.src} alt={`img-${i}`} className="w-full h-full object-cover" />
                  {i === 0 && (
                    <span className="absolute top-1 left-1 text-[8px] bg-primary text-white font-bold px-1.5 py-0.5 rounded-full">
                      Main
                    </span>
                  )}
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 w-5 h-5 bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                  <div className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-[8px] px-1.5 py-0.5 truncate opacity-0 group-hover:opacity-100 transition">
                    {img.name}
                  </div>
                </div>
              ))}
              {/* Empty slots */}
              {Array.from({ length: 4 - form.images.length }).map((_, i) => (
                <div
                  key={`e-${i}`}
                  onClick={() => form.images.length + i === 0 || true ? fileInputRef.current?.click() : null}
                  className="aspect-square rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:border-primary/30 hover:bg-primary/5 transition"
                >
                  <Plus className="w-4 h-4 text-gray-300" />
                </div>
              ))}
            </div>

            {/* Compact drop zone */}
            {form.images.length < 4 && (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="border border-dashed border-gray-200 hover:border-primary/40 hover:bg-primary/5 rounded-xl py-3 flex items-center justify-center gap-2 cursor-pointer transition group"
              >
                <Upload className="w-3.5 h-3.5 text-gray-400 group-hover:text-primary transition" />
                <span className="text-xs text-gray-500 group-hover:text-primary transition">Click or drag to upload</span>
              </div>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} />

            {errors.images && <p className="text-xs text-red-500 mt-1.5">{errors.images}</p>}
            <p className="text-[10px] text-gray-400 mt-2">PNG, JPG, WEBP · First image = main photo</p>
          </div>

          {/* Shop info card */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Listing Under</p>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Package className="w-3.5 h-3.5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-700 truncate">{shop?.shopName}</p>
                <p className="text-xs text-gray-400 truncate">{shop?.location} · {shop?.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Form ── */}
        <div className="flex flex-col gap-4">

          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-semibold text-gray-700">Product Details</h2>
            </div>

            <div className="flex flex-col gap-4">

              {/* Name */}
              <div>
                <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">Product Name *</label>
                <div className={inputClass(errors.name, !!form.name)}>
                  <Tag className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <input type="text" placeholder="e.g. Urea Fertilizer (50kg)" value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="flex-1 text-sm bg-transparent outline-none placeholder-gray-400" />
                </div>
                {errors.name && <p className="text-xs text-red-500 mt-1 ml-1">{errors.name}</p>}
              </div>

              {/* Category */}
              <div>
                <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">Category *</label>
                <div className={inputClass(errors.category, !!form.category)}>
                  <Star className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <select value={form.category} onChange={(e) => handleChange("category", e.target.value)}
                    className="flex-1 text-sm bg-transparent outline-none text-gray-700 cursor-pointer">
                    <option value="">Select a category</option>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                {errors.category && <p className="text-xs text-red-500 mt-1 ml-1">{errors.category}</p>}
              </div>

              {/* Price + Qty */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">Price (₹) *</label>
                  <div className={inputClass(errors.price, !!form.price)}>
                    <DollarSign className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <input type="number" placeholder="320" value={form.price} min={0}
                      onChange={(e) => handleChange("price", e.target.value)}
                      className="flex-1 text-sm bg-transparent outline-none placeholder-gray-400 w-0" />
                  </div>
                  {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">Quantity *</label>
                  <div className={inputClass(errors.quantity, !!form.quantity)}>
                    <Hash className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <input type="number" placeholder="40" value={form.quantity} min={0}
                      onChange={(e) => handleChange("quantity", e.target.value)}
                      className="flex-1 text-sm bg-transparent outline-none placeholder-gray-400 w-0" />
                  </div>
                  {errors.quantity && <p className="text-xs text-red-500 mt-1">{errors.quantity}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <AlignLeft className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-semibold text-gray-700">Description</h2>
              <span className="ml-auto text-xs text-gray-400">{form.description.length}/500</span>
            </div>
            <div className={`border rounded-xl p-3 transition ${
              errors.description ? "border-red-300 bg-red-50/30" : form.description ? "border-primary/40 bg-primary/5" : "border-gray-200 hover:border-gray-300"
            }`}>
              <textarea rows={5} maxLength={500}
                placeholder="Describe your product — features, usage, benefits..."
                value={form.description} onChange={(e) => handleChange("description", e.target.value)}
                className="w-full text-sm bg-transparent outline-none placeholder-gray-400 resize-none" />
            </div>
            {errors.description && <p className="text-xs text-red-500 mt-1 ml-1">{errors.description}</p>}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pb-6">
            <button onClick={() => navigate(-1)}
              className="flex-1 py-3 rounded-xl text-sm font-semibold border border-gray-200 text-gray-500 hover:bg-gray-50 transition active:scale-95">
              Cancel
            </button>
            <button onClick={handleSubmit} disabled={loading}
              className={`flex-2 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition active:scale-95 ${
                loading ? "bg-primary/60 text-white cursor-not-allowed" : "bg-primary text-white hover:bg-primary/90"
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
    </div>
  );
};

export default AddProduct;