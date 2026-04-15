import { useAdmin } from "@/contexts/AdminContext";
import { Pencil, Eye, LogOut, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminBar = () => {
  const { isAdmin, isEditing, toggleEditing, logout } = useAdmin();
  const navigate = useNavigate();

  if (!isAdmin) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[150] bg-card border border-border shadow-2xl rounded-2xl px-4 py-2.5 flex items-center gap-3">
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Admin</span>
      <button
        onClick={() => navigate("/admin")}
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-muted text-foreground hover:bg-primary/10 transition-all"
      >
        <LayoutDashboard size={16} /> Dashboard
      </button>
      <button
        onClick={toggleEditing}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
          isEditing ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-primary/10"
        }`}
      >
        {isEditing ? <><Eye size={16} /> Preview Mode</> : <><Pencil size={16} /> Edit Mode</>}
      </button>
      <button onClick={logout} className="p-2 text-muted-foreground hover:text-destructive transition-colors" title="Logout">
        <LogOut size={18} />
      </button>
    </div>
  );
};

export default AdminBar;
