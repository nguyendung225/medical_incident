import { FC, Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";
import { getCSSVariableValue } from "../../_metronic/assets/ts/_utils";
import { WithChildren } from "../../_metronic/helpers";
import { MasterLayout } from "../../_metronic/layout/MasterLayout";
import { PERMISSIONS, PERMISSION_ABILITY } from "../Constant";
import { HomePage } from "../pages/Homepage/HomePage";
import { MenuTestPage } from "../pages/MenuTestPage";
import KhaiBaoTruongHopBenh from "../modules/quan-ly-truong-hop-benh/khai-bao-truong-hop-benh/KhaiBaoTruongHopBenh";
import BaoCaoSCYK from "../modules/bao-cao-su-co-y-khoa/BaoCaoSCYK";

interface PrivateRouteProps {
  auth: string;
  ability: string;
  component: React.ComponentType<any>;
  redirect: string;
}


interface PrivateRouteProps {
  auth: string;
  ability: string;
  component: React.ComponentType<any>;
  redirect: string;
}

const PrivateRoutes = () => {

  const PrivateRoute: React.FC<PrivateRouteProps> = ({ auth, ability, component: Component, redirect, }) => {
    //khi có phân quyền sẽ check
    // return hasAuthority(auth, ability) ? (<Component />) : (<Navigate to={redirect} />);
    return true ? (<Component />) : (<Navigate to={redirect} />);
  };

  return (
    <Routes>
      <Route index element={<Navigate to="/home" />} />
      <Route path="/*" element={<HomePage />} />
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path="auth/*" element={<Navigate to="quan-ly-ca-benh" />} />
        {/* Pages */}
        <Route path="menu-test" element={<MenuTestPage />} />
        <Route path="/ds-bao-cao-scyk" element={<PrivateRoute auth={PERMISSIONS.TONG_QUAN} ability={PERMISSION_ABILITY.VIEW} component={BaoCaoSCYK} redirect="/ds-bao-cao-scyk" />} />
        <Route path="bien-ban-xac-minh" element={<PrivateRoute auth={PERMISSIONS.TONG_QUAN} ability={PERMISSION_ABILITY.VIEW} component={KhaiBaoTruongHopBenh} redirect="/ds-bao-cao-scyk" />} />
        <Route path="phan-tich-scyk" element={<PrivateRoute auth={PERMISSIONS.TONG_QUAN} ability={PERMISSION_ABILITY.VIEW} component={KhaiBaoTruongHopBenh} redirect="/ds-bao-cao-scyk" />} />
        <Route path="bien-ban-hop" element={<PrivateRoute auth={PERMISSIONS.TONG_QUAN} ability={PERMISSION_ABILITY.VIEW} component={KhaiBaoTruongHopBenh} redirect="/ds-bao-cao-scyk" />} />
        <Route path="bao-cao" element={<PrivateRoute auth={PERMISSIONS.TONG_QUAN} ability={PERMISSION_ABILITY.VIEW} component={KhaiBaoTruongHopBenh} redirect="/ds-bao-cao-scyk" />} />
        <Route path="*" element={<Navigate to="/error/404" />} />
      </Route>
    </Routes>
  );
};

export const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue("--kt-primary");
  TopBarProgress.config({
    barColors: {
      "0": baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };

