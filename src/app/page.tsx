import { PanesContextProvider } from "@/store/PanesContext";
import Divider from "@/components/Divider";
import LeftPane from "@/components/LeftPane";
import RightPane from "@/components/RightPane";

export default function Home() {
  return (
    <PanesContextProvider>
      <main className="flex h-screen w-screen flex-row bg-[#000028] text-white">
        <LeftPane>Drawing Screen</LeftPane>
        <Divider />
        <RightPane>Results</RightPane>
      </main>
    </PanesContextProvider>
  );
}
