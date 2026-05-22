import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { Award, Upload, Trash2, ImageIcon, Plus } from "lucide-react";

const Card = ({ children, className = "" }) => (
  <div className={`relative group ${className}`}>
    {/* Glow effect diubah ke warna Teal & Emerald */}
    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#14b8a6] to-[#10b981] rounded-2xl blur opacity-5 group-hover:opacity-25 transition duration-500" />
    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl h-full">
      {children}
    </div>
  </div>
);

const SkeletonCard = () => (
  <div className="relative">
    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#14b8a6] to-[#10b981] rounded-2xl blur opacity-10" />
    <div className="relative bg-white/5 border border-white/12 rounded-2xl overflow-hidden">
      <div className="w-full aspect-[16/11.5] bg-white/5 animate-pulse" />
    </div>
  </div>
);

const CertCard = ({ cert, onDelete }) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#14b8a6] to-[#10b981] rounded-2xl blur opacity-10 group-hover:opacity-30 transition duration-500" />
      <div className="relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        {!imgLoaded && (
          <div className="w-full aspect-[16/11.5] bg-white/5 animate-pulse" />
        )}
        <img
          src={cert.img || cert.img} // Fleksibilitas jika nama field di DB menggunakan huruf kecil 'img'
          alt="Certificate"
          onLoad={() => setImgLoaded(true)}
          className={`w-full aspect-[16/11.5] object-cover group-hover:scale-105 transition-transform duration-500 ${imgLoaded ? "block" : "hidden"}`}
        />
        {imgLoaded && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
            <button
              onClick={() => onDelete(cert.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-xs w-full justify-center hover:bg-red-500/30 transition-colors"
            >
              <Trash2 className="w-3 h-3" /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function Certificates() {
  const [certs, setCerts] = useState([]);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchCerts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCerts(data || []);
    } catch (err) {
      console.error("Gagal mengambil data sertifikat:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCerts();
  }, []);

  const handleFile = (f) => {
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const uploadImage = async () => {
    if (!file) return;
    setUploading(true);

    // Tambahkan log untuk memudahkan tracking di konsol lokal
    console.log("Memulai proses upload untuk file:", file.name);

    try {
      const fileName = `cert-${Date.now()}-${file.name.replace(/\s+/g, "_")}`;

      // 1. Proses upload ke Storage Bucket
      const { error: storageError } = await supabase.storage
        .from("certificate-images")
        .upload(fileName, file);

      if (storageError) {
        console.error("Error pada Supabase Storage:", storageError);
        throw new Error(`Gagal upload ke Storage: ${storageError.message}`);
      }

      // 2. Ambil Publik URL dari file yang di-upload
      const { data } = supabase.storage
        .from("certificate-images")
        .getPublicUrl(fileName);
      if (!data?.publicUrl)
        throw new Error("Gagal mendapatkan Public URL dari berkas.");

      // 3. Insert ke Table database sertifikat (Mendukung fallback 'Img' dan 'img' jika case sensitif)
      const { error: dbError } = await supabase.from("certificates").insert({
        img: data.publicUrl,
        img: data.publicUrl, // Mengirim dua variasi sekaligus sebagai bentuk pertahanan aman dari bug penamaan kolom
      });

      if (dbError) {
        console.error("Error pada Supabase Database Table:", dbError);
        throw new Error(
          `Gagal menyimpan url ke tabel database: ${dbError.message}`,
        );
      }

      alert("Sertifikat berhasil ditambahkan!");
      setFile(null);
      setPreview(null);
      fetchCerts();
    } catch (err) {
      alert(err.message);
      console.error("Detail Error Upload:", err);
    } finally {
      setUploading(false);
    }
  };

  const deleteCert = async (id) => {
    if (!confirm("Hapus sertifikat profesional ini?")) return;
    try {
      const { error } = await supabase
        .from("certificates")
        .delete()
        .eq("id", id);
      if (error) throw error;
      fetchCerts();
    } catch (err) {
      console.error("Gagal menghapus sertifikat:", err.message);
    }
  };

  return (
    <div className="space-y-6 text-sm font-light">
      {/* Header Section */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#14b8a6] to-[#10b981] rounded-xl blur opacity-50" />
          <div className="relative w-9 h-9 bg-[#031411] rounded-xl border border-white/15 flex items-center justify-center">
            <Award className="w-4 h-4 text-teal-400" />
          </div>
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Certificates
          </h1>
          <p className="text-gray-500 text-xs font-normal">
            {loading ? "Loading..." : `${certs.length} certificates total`}
          </p>
        </div>
      </div>

      {/* Upload Card Container */}
      <Card>
        <div className="p-5 sm:p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-teal-400" /> Upload Professional
            Certificate
          </h2>

          <label
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              handleFile(e.dataTransfer.files[0]);
            }}
            className={`flex flex-col items-center justify-center w-full min-h-[160px] rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 ${
              dragOver
                ? "border-teal-400/60 bg-teal-500/10"
                : "border-white/10 bg-white/5 hover:border-teal-500/40 hover:bg-white/10"
            }`}
          >
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="max-h-40 object-contain rounded-lg p-2"
              />
            ) : (
              <div className="text-center space-y-1.5 p-6">
                <div className="w-11 h-11 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mx-auto">
                  <ImageIcon className="w-5 h-5 text-teal-400" />
                </div>
                <p className="text-sm text-gray-300 font-normal">
                  Drag & drop or click to upload certificate
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, WEBP supported
                </p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFile(e.target.files[0])}
              className="hidden"
            />
          </label>

          {file && (
            <div className="flex items-center justify-between gap-3 flex-wrap pt-1">
              <p className="text-xs text-gray-400 truncate flex-1 max-w-[200px] sm:max-w-none">
                {file.name}
              </p>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => {
                    setFile(null);
                    setPreview(null);
                  }}
                  className="px-3 py-1.5 rounded-xl border border-white/10 text-gray-400 hover:text-white text-xs transition-colors"
                >
                  Clear
                </button>
                <button
                  onClick={uploadImage}
                  disabled={uploading}
                  className="relative group/u"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0d9488] to-[#059669] rounded-xl opacity-70 blur group-hover/u:opacity-100 transition duration-300" />
                  <div className="relative flex items-center gap-2 px-4 py-1.5 bg-[#031411] rounded-xl border border-white/10">
                    {uploading ? (
                      <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Upload className="w-3.5 h-3.5 text-teal-400" />
                    )}
                    <span className="text-xs text-gray-200 font-medium">
                      {uploading ? "Uploading..." : "Upload"}
                    </span>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Main Grid List Section */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : certs.length === 0 ? (
        <Card>
          <div className="p-16 text-center">
            <Award className="w-10 h-10 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500 text-sm font-normal">
              No certificates added yet.
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {certs.map((cert) => (
            <CertCard key={cert.id} cert={cert} onDelete={deleteCert} />
          ))}
        </div>
      )}
    </div>
  );
}
