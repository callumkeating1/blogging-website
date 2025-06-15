export default function Topbar() {
  return (
    <div className="h-fit w-screen bg-gray-300 rounded-3xl p-6 grid grid-cols-9">
      <h1 className="text-8xl place-items-center col-start-4 col-span-3">blogging website</h1>
      <div className="col-start-8 col-span-2 self-center flex justify-end">
        <button className="text-4xl bg-gray-500 w-fit h-fit rounded-lg p-2">account</button>
      </div>
    </div>
  );
}
