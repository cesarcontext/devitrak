import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import UpperBanner from "../components/banner/UpperBanner";
import NavigationBottom from "../components/navigation/NavigationBottom";
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
  const pathRef = useLocation()
  return (
    <div style={{width:"100%"}}>
      <header style={{
        height: "5dvh",
      }}>
        <UpperBanner />
      </header>
      <main
        style={{
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
        key={pathRef.key}
        style={{
          height: "20dvh",
          display: `${listPageNotAllowForNavigation.includes(pathRef.pathname) && "none"
            }`,
        }}
      >
        <NavigationBottom />
      </footer>
    </div>
  );
};

export default AuthenticatedRoutes;
