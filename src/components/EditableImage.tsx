import { useState, useRef } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { ImageIcon, X, Upload, Link } from "lucide-react";

interface Props {
  src: string;
  alt: string;
  onSave: (url: string) => void;
  className?: string;
  buttonMode?: boolean;
}

const ImageModal = ({ src, onSave, onClose }: { src: string; onSave: (url: string) => void; onClose: () => void }) => {
  const [url, setUrl] = useState(src);
  const [preview, setPreview] = useState(src);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setUrl(dataUrl);
      setPreview(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" />
      <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 p-2 hover:bg-muted rounded-full"><X size={18} /></button>
        <h3 className="font-display font-bold text-lg text-foreground mb-4">Change Image</h3>

        <button
          onClick={() => fileRef.current?.click()}
          className="w-full border-2 border-dashed border-primary/30 rounded-xl p-6 mb-3 flex flex-col items-center gap-2 hover:bg-primary/5 transition-colors cursor-pointer"
        >
          <Upload size={28} className="text-primary" />
          <span className="text-sm font-semibold text-foreground">Upload from device</span>
          <span className="text-xs text-muted-foreground">JPG, PNG, WebP supported</span>
        </button>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />

        <div className="flex items-center gap-3 mb-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">or paste URL</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="relative mb-3">
          <Link size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="url"
            value={url.startsWith("data:") ? "" : url}
            onChange={(e) => { setUrl(e.target.value); setPreview(e.target.value); }}
            placeholder="https://example.com/image.jpg"
            className="w-full bg-muted rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {preview && <img src={preview} alt="Preview" className="w-full h-40 object-cover rounded-xl mb-3" />}
        <button onClick={() => { onSave(url); onClose(); }} className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-xl hover:brightness-110 transition-all">Save Image</button>
      </div>
    </div>
  );
};

const EditableImage = ({ src, alt, onSave, className = "", buttonMode = false }: Props) => {
  const { isEditing } = useAdmin();
  const [showModal, setShowModal] = useState(false);

  if (!isEditing) return <img src={src} alt={alt} className={className} loading="lazy" />;

  if (buttonMode) {
    return (
      <>
        <button onClick={() => setShowModal(true)} className="absolute top-4 right-4 z-20 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-lg hover:brightness-110 transition-all">
          <ImageIcon size={16} /> Change Hero Image
        </button>
        {showModal && <ImageModal src={src} onSave={onSave} onClose={() => setShowModal(false)} />}
      </>
    );
  }

  return (
    <>
      <div className="relative group/img cursor-pointer" onClick={() => setShowModal(true)}>
        <img src={src} alt={alt} className={className} loading="lazy" />
        <div className="absolute inset-0 bg-foreground/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-primary text-primary-foreground px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
            <ImageIcon size={16} /> Change Image
          </div>
        </div>
      </div>
      {showModal && <ImageModal src={src} onSave={onSave} onClose={() => setShowModal(false)} />}
    </>
  );
};

export default EditableImage;
