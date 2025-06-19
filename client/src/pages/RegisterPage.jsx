export default function RegisterPage() {
  return (
    <div className="p-8 max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form className="space-y-4">
        <input type="text" placeholder="Name" className="w-full p-2 border rounded" required />
        <input type="email" placeholder="Email" className="w-full p-2 border rounded" required />
        <input type="password" placeholder="Password" className="w-full p-2 border rounded" required />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">Sign Up</button>
      </form>
    </div>
  );
}
