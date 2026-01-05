import { users } from "@/lib/data/users";

export default function UsersPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Users</h1>

      <table className="w-full bg-white border rounded">
        <thead className="bg-neutral-100">
          <tr>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border">{u.role}</td>
              <td className="p-2 border">{u.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
