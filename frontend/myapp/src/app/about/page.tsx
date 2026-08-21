export default function About() {
  return (
    <main className="min-h-screen bg-[#b8ccd1] p-8">

      <div className="max-w-5xl mx-auto bg-[#176b4d] rounded-2xl p-10 mb-6">
        <h1 className="text-4xl font-bold text-white mb-8">
          A calm task workspace
          <br />
          built to learn full-stack flow.
        </h1>
<p className="text-white font-bold">Taskline is a Week 4 practice project: a Next.js frontend talking to an 
    Express API. It is small on purpose - so every create, read, update, 
    and delete feels clear and intentional.</p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-2 gap-6 mb-6">

        <div className="bg-[#d3d6d2] rounded-xl p-6 ">
          <h2 className="text-2xl font-bold text-[#176b4d] mb-3">
            Simple CRUD
          </h2>

          <p className="text-gray-700">
            Create, read, update, and delete tasks through
            a simple interface.
          </p>
        </div>

        <div className="bg-[#d3d6d2] rounded-xl p-6">
          <h2 className="text-2xl font-bold text-[#176b4d] mb-3">
            CRUD + Integration
          </h2>

          <p className="text-gray-700">
            Clean routes, useful error messages, and a UI
            that updates after every action.
          </p>
        </div>

      </div>

      <div className="max-w-5xl mx-auto">

        <h2 className="text-2xl font-bold mb-4 text-[#176b4d]">
          What this project includes
        </h2>

        <div className="grid grid-cols-3 gap-6">

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-xl mb-2">
              Frontend
            </h3>
<ul className="list-disc pl-5 text-gray-700">
  <li>Next.js app router</li>
  <li>react and typescript</li>
  <li>tailwind css</li>
  <li>fetch api integration</li>
</ul>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-xl mb-2">
              Backend
            </h3>

           <ul className="list-disc pl-5 text-gray-700">
  <li>node.js + express.js</li>
  <li>REST crud routes</li>
  <li>dot env + cors</li>
  <li>in memory task data</li>
</ul>
          </div>
        </div>

      </div>

<div className="max-w-5xl mx-auto bg-[#176b4d] rounded-2xl p-10 mb-6 mt-6">
        <h1 className="text-2xl font-bold text-white mb-4">
        SKILLS BEHIND THE SCREEN
        </h1>
        <div className="flex flex-col gap-3">

    <div className="bg-[#c4cfbe] rounded-lg p-4 w-full">
      <p>How front and backend talk
        through HTTP methods
      </p>
    </div>
    <div className="bg-[#c4cfbe] rounded-lg p-4 w-full">
      <p >Why validation matters on both client
         and server</p>
    </div>
    <div className="bg-[#c4cfbe] rounded-lg p-4 w-full">
      <p >How react state stays in sync after update, 
        create and delete.
      </p>
    </div>
 <div className="bg-[#c4cfbe] rounded-lg p-4 w-full">
      <p>How environmental variable Keep API URLs
        configurable
      </p>
    </div>
    
        </div>
 </div>
    </main>
  );
}

