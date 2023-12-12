import { Suspense } from "react";
import LoadingPage from "../loading/LoadingPage";
import SingleSelection from "./SinglSelection";

const DeviceSelection = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <SingleSelection />
    </Suspense>

  );
};

export default DeviceSelection;
