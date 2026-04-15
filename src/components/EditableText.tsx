import { useState, useRef, useEffect } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { Pencil } from "lucide-react";

interface Props {
  value: string;
  onSave: (value: string) => void;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4";
  className?: string;
  multiline?: boolean;
}

const EditableText = ({ value, onSave, as: Tag = "span", className = "", multiline = false }: Props) => {
  const { isEditing } = useAdmin();
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(value);
  const ref = useRef<HTMLTextAreaElement | HTMLInputElement>(null);

  useEffect(() => { setText(value); }, [value]);
  useEffect(() => { if (editing && ref.current) ref.current.focus(); }, [editing]);

  if (!isEditing) return <Tag className={className}>{value}</Tag>;

  if (editing) {
    const handleDone = () => {
      setEditing(false);
      if (text.trim() !== value) onSave(text.trim());
    };

    return multiline ? (
      <textarea
        ref={ref as React.RefObject<HTMLTextAreaElement>}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleDone}
        onKeyDown={(e) => { if (e.key === "Escape") handleDone(); }}
        className={`${className} bg-primary/5 border-2 border-primary/30 rounded-lg px-2 py-1 w-full resize-y focus:outline-none focus:ring-2 focus:ring-primary/30`}
        rows={3}
      />
    ) : (
      <input
        ref={ref as React.RefObject<HTMLInputElement>}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleDone}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === "Escape") handleDone(); }}
        className={`${className} bg-primary/5 border-2 border-primary/30 rounded-lg px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-primary/30`}
      />
    );
  }

  return (
    <div className="relative group/edit inline-block cursor-pointer" onClick={() => setEditing(true)}>
      <Tag className={className}>{value}</Tag>
      <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-1 opacity-0 group-hover/edit:opacity-100 transition-opacity shadow-md">
        <Pencil size={10} />
      </span>
    </div>
  );
};

export default EditableText;
