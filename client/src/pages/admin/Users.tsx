import { useEffect, useState } from "react";
import { Search, Shield, ShieldOff, Trash2, ChevronDown } from "lucide-react";
import type { UserType } from "../../types";
import { useApp } from "../../context/AppContext";
import toast from "react-hot-toast";
import Spinner from "../../components/Spinner";

type RoleFilter = "all" | "admin" | "user";
type StatusFilter = "all" | "active" | "blocked";

const Users = () => {
  const { axios, user } = useApp();
  const [users, setUsers] = useState<UserType[]>([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


  const fetchUser = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get("/api/admin/users");
      if (data.success) {
        const filtered = data.users.filter((u) => u._id !== user!._id);

        setUsers(filtered);
      } else {
        toast.error(data.message)
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUser();
  }, [])

  if (loading) {
    return <Spinner />
  }

  // --- Actions ---
  const toggleBlock = async (id: string) => {

    try {
      const { data } = await axios.patch(`/api/admin/user/${id}/toggle`);

      if (data.success) {
        setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, isBlocked: !u.isBlocked } : u)))
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }

    } catch (error: any) {
      console.error(error.message);

    }
  }

  // const toggleRole = (id: string) =>
  //   setUsers((prev) =>
  //     (prev || []).map((u) =>
  //       u._id === id ? { ...u, role: u.role === "admin" ? "user" : "admin" } : u
  //     )
  //   );

  const deleteUser = async (id: string) => {

    try {

      const { data } = await axios.delete(`/api/admin/user/${id}`);
    } catch (error: any) {
      console.error(error.message);

    }


    setUsers((prev) => (prev || []).filter((u) => u._id !== id));
    setDeleteConfirm(null);
  };

  // --- Filters ---
  const filtered = users.filter((u) => {
    const fullName = `${u.firstName} ${u.lastName}`.toLowerCase();
    const matchSearch =
      fullName.includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.location?.toLowerCase().includes(search.toLowerCase()) ||
      String(u.phone).includes(search);
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    const matchStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && !u.isBlocked) ||
      (statusFilter === "blocked" && u.isBlocked);
    return matchSearch && matchRole && matchStatus;
  });

  const totalAdmins = users.filter((u) => u.role === "admin").length;
  const totalBlocked = users.filter((u) => u.isBlocked).length;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Users</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Manage all registered users on the platform.
        </p>
      </div>

      {/* Summary Pills */}
      <div className="flex flex-wrap gap-3 mb-6">
        {[
          { label: "Total", value: users.length, color: "bg-primary" },
          { label: "Admins", value: totalAdmins, color: "bg-violet-500" },
          { label: "Blocked", value: totalBlocked, color: "bg-red-400" },
          { label: "Active", value: users.length - totalBlocked, color: "bg-green-400" },
        ].map((pill) => (
          <div
            key={pill.label}
            className="bg-white border border-gray-100 rounded-xl px-4 py-2.5 shadow-sm flex items-center gap-2"
          >
            <span className={`w-2 h-2 rounded-full ${pill.color}`} />
            <span className="text-sm text-gray-500">{pill.label}</span>
            <span className="text-sm font-bold text-gray-800">{pill.value}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, phone or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white"
          />
        </div>

        <div className="relative">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as RoleFilter)}
            className="appearance-none pl-4 pr-8 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 text-gray-600"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className="appearance-none pl-4 pr-8 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 text-gray-600"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <p className="text-xs text-gray-400 mb-3">
        Showing {filtered.length} of {users.length} users
      </p>

      {/* Table — Desktop */}
      <div className="hidden md:block bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50 text-xs text-gray-400 uppercase tracking-wider">
              <th className="text-left px-5 py-3 font-semibold">User</th>
              <th className="text-left px-5 py-3 font-semibold">Phone</th>
              <th className="text-left px-5 py-3 font-semibold">Location</th>
              <th className="text-left px-5 py-3 font-semibold">Joined</th>
              <th className="text-left px-5 py-3 font-semibold">Role</th>
              <th className="text-left px-5 py-3 font-semibold">Status</th>
              <th className="text-right px-5 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-12 text-gray-400">
                  <div className="text-3xl mb-2">👤</div>
                  <p className="text-sm">No users found</p>
                </td>
              </tr>
            ) : (
              filtered.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50/60 transition">
                  {/* User */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.imageUrl}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="w-9 h-9 rounded-full border border-gray-100 shrink-0 bg-gray-100"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Phone */}
                  <td className="px-5 py-3.5 text-gray-500 text-xs">
                    +91 {String(user.phone).replace(/(\d{5})(\d{5})/, "$1 $2")}
                  </td>

                  {/* Location */}
                  <td className="px-5 py-3.5 text-gray-500 text-xs">{user.location}</td>

                  {/* Joined */}
                  <td className="px-5 py-3.5 text-gray-400 text-xs">
                    {new Date(user.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  {/* Role */}
                  <td className="px-5 py-3.5">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${user.role === "admin"
                        ? "bg-violet-50 text-violet-600"
                        : "bg-gray-100 text-gray-500"
                        }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-3.5">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${user.isBlocked
                        ? "bg-red-50 text-red-500"
                        : "bg-green-50 text-green-600"
                        }`}
                    >
                      {user.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      {/* <button
                        onClick={() => toggleRole(user._id)}
                        title={user.role === "admin" ? "Demote to User" : "Promote to Admin"}
                        className="p-2 rounded-lg hover:bg-violet-50 text-gray-400 hover:text-violet-500 transition"
                      >
                        <UserCog className="w-4 h-4" />
                      </button> */}
                      <button
                        onClick={() => toggleBlock(user._id)}
                        title={user.isBlocked ? "Unblock" : "Block"}
                        className={`p-2 rounded-lg transition ${user.isBlocked
                          ? "hover:bg-green-50 text-green-400 hover:text-green-600"
                          : "hover:bg-amber-50 text-gray-400 hover:text-amber-500"
                          }`}
                      >
                        {user.isBlocked ? (
                          <Shield className="w-4 h-4" />
                        ) : (
                          <ShieldOff className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(user._id)}
                        title="Delete user"
                        className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Cards — Mobile */}
      <div className="md:hidden flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <div className="text-3xl mb-2">👤</div>
            <p className="text-sm">No users found</p>
          </div>
        ) : (
          filtered.map((user) => (
            <div
              key={user._id}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden"
            >
              <div
                className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                onClick={() =>
                  setExpandedUser(expandedUser === user._id ? null : user._id)
                }
              >
                <img
                  src={user.imageUrl}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-10 h-10 rounded-full border border-gray-100 bg-gray-100 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm truncate">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-gray-400 truncate">{user.email}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${user.isBlocked ? "bg-red-50 text-red-500" : "bg-green-50 text-green-600"
                      }`}
                  >
                    {user.isBlocked ? "Blocked" : "Active"}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform ${expandedUser === user._id ? "rotate-180" : ""
                      }`}
                  />
                </div>
              </div>

              {expandedUser === user._id && (
                <div className="border-t border-gray-100 px-4 py-3 bg-gray-50">
                  <div className="flex flex-col gap-1.5 text-xs text-gray-500 mb-4">
                    <p>📞 +91 {String(user.phone).replace(/(\d{5})(\d{5})/, "$1 $2")}</p>
                    <p>📍 {user.location}</p>
                    <p>
                      📅 Joined{" "}
                      {new Date(user.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    <p>
                      🔑 Role:{" "}
                      <span
                        className={`font-semibold ${user.role === "admin" ? "text-violet-600" : "text-gray-600"
                          }`}
                      >
                        {user.role}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {/* <button
                      onClick={() => toggleRole(user._id)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold border border-violet-200 text-violet-600 hover:bg-violet-50 transition"
                    >
                      <UserCog className="w-3.5 h-3.5" />
                      {user.role === "admin" ? "Demote" : "Promote"}
                    </button> */}
                    <button
                      onClick={() => toggleBlock(user._id)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold border transition ${user.isBlocked
                        ? "border-green-200 text-green-600 hover:bg-green-50"
                        : "border-amber-200 text-amber-600 hover:bg-amber-50"
                        }`}
                    >
                      {user.isBlocked ? (
                        <Shield className="w-3.5 h-3.5" />
                      ) : (
                        <ShieldOff className="w-3.5 h-3.5" />
                      )}
                      {user.isBlocked ? "Unblock" : "Block"}
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(user._id)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold border border-red-200 text-red-500 hover:bg-red-50 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Delete Confirm Modal */}
      {deleteConfirm && (() => {
        const u = users.find((u) => u._id === deleteConfirm);
        return (
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20 z-50">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-7 w-[320px] flex flex-col items-center text-center">
              <img
                src={u?.imageUrl}
                alt=""
                className="w-14 h-14 rounded-full border border-gray-100 mb-3 bg-gray-100"
              />
              <h2 className="text-base font-bold text-gray-800">Delete User?</h2>
              <p className="text-sm text-gray-500 mt-1 font-medium">
                {u?.firstName} {u?.lastName}
              </p>
              <p className="text-xs text-gray-400 mt-1 mb-6">
                This action cannot be undone. The user will be permanently removed.
              </p>
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-500 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteUser(deleteConfirm)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition active:scale-95"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default Users;