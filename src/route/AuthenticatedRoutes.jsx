import { Suspense, lazy, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import NavigationBottom from "../components/navigation/NavigationBottom";
import UpperBanner from "../components/banner/UpperBanner";
import AuthenticationLogin from "../pages/authentication/AuthenticationLogin";
import LoadingPage from "../pages/loading/LoadingPage";
import DepositElement from "../pages/stripe/DepositElement";
const AuthenticatedRoutes = () => {
  const ConsumerInitialForm = lazy(() =>
    import("../pages/Consumer/ConsumerInitialForm")
  );
  const DeviceSelection = lazy(() => import("../pages/device/DeviceSelection"));
  const Home = lazy(() => import("../pages/home/Home"));
  const InstructionsMainPage = lazy(() =>
    import("../pages/instructions/MainPage")
  );
  const SingleInstruction = lazy(() =>
    import("../pages/instructions/SingleInstructionPage")
  );
  const Profile = lazy(() => import("../pages/profile/Profile"));
  const DisplayQRCode = lazy(() =>
    import("../pages/display-qr-code/DisplayQRCode")
  );
  const DeviceMainPage = lazy(() =>
    import("../pages/device-options/OptionsMainPage")
  );
  const listPageNotAllowForNavigation = [
    "/initial-form",
    "/deviceSelection",
    "/payment",
    "/",
  ];
  const pathRef = useMemo(
    () => window.location.pathname,
    [window.location.pathname]
  );
  return (
    <>
      <header style={{
          height: "5svh",
          height: "5dvh",
        }}>
        <UpperBanner />
      </header>
      <main
        style={{
          minHeight: "80svh",
          minHeight: "80dvh",
        }}
      >
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              exact
              path="/initial-form"
              element={<ConsumerInitialForm />}
            />
            <Route
              exact
              path="/authentication/:event/:company/:uid"
              element={<AuthenticationLogin />}
            />
            <Route
              exact
              path="/deviceSelection"
              element={<DeviceSelection />}
            />
            <Route exact path="/payment" element={<DepositElement />} />
            <Route path="/qr-code-generation" element={<DisplayQRCode />} />
            <Route exact path="/device" element={<DeviceMainPage />} />
            <Route
              exact
              path="/information"
              element={<InstructionsMainPage />}
            />
            <Route
              exact
              path="/information/:id"
              element={<SingleInstruction />}
            />
            <Route exact path="/profile" element={<Profile />} />
          </Routes>
        </Suspense>
      </main>
      <footer
        style={{
          height: "15svh",
          height: "15dvh",
          display: `${
            listPageNotAllowForNavigation.includes(pathRef) && "none"
          }`,
        }}
      >
        <NavigationBottom />
      </footer>
    </>
  );
};

export default AuthenticatedRoutes;
