import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-green-600 text-white px-6 py-4 shadow-md">

      <ul className="flex gap-6 items-center">

        <li>
          <Link 
            href="/"
            className="font-semibold hover:text-gray-200"
          >
            Home
          </Link>
        </li>

        <li>
          <Link 
            href="/about"
            className="font-semibold hover:text-gray-200"
          >
            About
          </Link>
        </li>

        <li>
          <Link 
            href="/tasks"
            className="font-semibold hover:text-gray-200"
          >
            Tasks
          </Link>
        </li>

      </ul>

    </header>
  );
}