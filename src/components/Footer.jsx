export default function Footer() {
  return (
    <footer className="relative z-10 py-8 text-center border-t border-white/[0.04]">
      <p className="text-gray-700 text-xs tracking-wider">
        © {new Date().getFullYear()} Gita AI — Divine wisdom for modern life
      </p>
    </footer>
  );
}
