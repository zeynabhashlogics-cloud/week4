import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-[#6591a6]  border rounded-lg  p-25 w-[900px] text-center">
        
        <h1 className="text-5xl font-bold mb-4 text-white">
          Plan Less.
        </h1>
        <h1 className="text-5xl font-bold mb-12 text-white">
          Finish More.
        </h1>

        <div className="flex justify-center gap-6">
          
          <Link
            href="/about"
            className="border px-10 py-3 rounded-md bg-[#b2c7d1] text-black"
          >
            About the project.
          </Link>

          <Link
            href="/tasks"
            className="border px-6 py-3 rounded-md bg-[#b2c7d1] text-black"
          >
            Tasks
          </Link>

        </div>
      </div>
    </main>
  );
}