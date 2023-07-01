import { PanesContextProvider } from "@/store/PanesContext";
import Divider from "@/components/Divider";
import LeftPane from "@/components/LeftPane";
import RightPane from "@/components/RightPane";
import AiForm from "@/components/AiForm";

export default function Home() {
  return (
    <PanesContextProvider>
      <main className="flex h-screen w-screen flex-row overflow-hidden bg-[#101010] text-white">
        <LeftPane>
          <AiForm />
        </LeftPane>
        <Divider />
        <RightPane>Results</RightPane>
      </main>
    </PanesContextProvider>
  );
}
