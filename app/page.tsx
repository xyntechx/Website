import Canvas from "./game/canvas";
import Chat from "./game/chat";

export default function Home() {
  return (
    <main className="w-full flex flex-col justify-center items-center p-4">
      {/* <h1>Nyx</h1> */}
      <Canvas />
      <Chat />
    </main>
  );
}
