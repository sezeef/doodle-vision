import { PanesContextProvider } from "@/store/PanesContext";
import Divider from "@/components/Divider";
import LeftPane from "@/components/LeftPane";
import RightPane from "@/components/RightPane";
import Canvas from "@/components/Canvas";

export default function Home() {
  return (
    <PanesContextProvider>
      <main className="flex h-screen w-screen flex-row bg-[#000028] text-white">
        <LeftPane>
          <h1>Drawing Screen</h1>
          <Canvas />
        </LeftPane>
        <Divider />
        <RightPane>Results</RightPane>
      </main>
    </PanesContextProvider>
  );
}
