// TODO: disable divider and stack form and results (mobile)
// TODO: animate transition to results (desktop) / smooth-scroll (mobile)

import { PanesContextProvider } from "@/store/PanesContext";
import { OutputContextProvider } from "@/store/OutputContext";
import Divider from "@/components/Divider";
import LeftPane from "@/components/LeftPane";
import RightPane from "@/components/RightPane";
import AiForm from "@/components/AiForm";
import Results from "@/components/Results";
import Nav from "@/components/Nav";

export default function Home() {
  return (
    <OutputContextProvider>
      <main className="h-screen w-screen overflow-hidden bg-white text-black dark:bg-[#101010] dark:text-white">
        <Nav />
        <section className="flex h-full">
          <PanesContextProvider>
            <LeftPane>
              <AiForm />
            </LeftPane>
            <Divider />
            <RightPane>
              <Results />
            </RightPane>
          </PanesContextProvider>
        </section>
      </main>
    </OutputContextProvider>
  );
}
