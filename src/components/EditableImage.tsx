import { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { ImageIcon, X } from "lucide-react";

interface Props {
  src: string;
  alt: string;
  onSave: (url: string) => void;
  className?: string;
  buttonMode?: boolean;
}

const EditableImage = ({ src, alt, onSave, className = "", buttonMode = false }: Props) => {
  const { isEditing } = useAdmin();
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState(src);

  if (!isEditing) return <img src={src} alt={alt} className={className} loading="lazy" />;

  return (
    <>
      <div className="relative group/img cursor-pointer" onClick={() => setShowModal(true)}>
        <img src={src} alt={alt} className={className} loading="lazy" />
        <div className="absolute inset-0 bg-foreground/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center rounded-inherit">
          <div className="bg-primary text-primary-foreground px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
            <ImageIcon size={16} /> Change Image
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" />
          <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowModal(false)} className="absolute top-3 right-3 p-2 hover:bg-muted rounded-full">
              <X size={18} />
            </button>
            <h3 className="font-display font-bold text-lg text-foreground mb-4">Change Image</h3>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste image URL here..."
              className="w-full bg-muted rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 mb-3"
              autoFocus
            />
            {url && <img src={url} alt="Preview" className="w-full h-40 object-cover rounded-xl mb-3" />}
            <button
              onClick={() => { onSave(url); setShowModal(false); }}
              className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-xl hover:brightness-110 transition-all"
            >
              Save Image
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditableImage;
