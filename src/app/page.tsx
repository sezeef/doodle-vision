// TODO: add nav bar with logo and dark-light-mode toggle
// TODO: disable divider and stack form and results on mobile
// TODO: make the transition to results animated (on desktop) / smooth-scroll on mobile

import { PanesContextProvider } from "@/store/PanesContext";
import { OutputContextProvider } from "@/store/OutputContext";
import Divider from "@/components/Divider";
import LeftPane from "@/components/LeftPane";
import RightPane from "@/components/RightPane";
import AiForm from "@/components/AiForm";
import Results from "@/components/Results";

export default function Home() {
  return (
    <PanesContextProvider>
      <OutputContextProvider>
        <main className="flex h-screen w-screen flex-row overflow-hidden bg-[#101010] text-white">
          <LeftPane>
            <AiForm />
          </LeftPane>
          <Divider />
          <RightPane>
            <Results />
          </RightPane>
        </main>
      </OutputContextProvider>
    </PanesContextProvider>
  );
}
