import { AuthCallback } from "@workspace/admin/authentication";
import { i18nProvider as defaultI18nProvider } from "@workspace/admin/lib/i18nProvider";
import { ThemeProvider } from "@workspace/admin/theme-provider";
import {
  CoreAdminContext,
  type CoreAdminContextProps,
  type CoreAdminProps,
  CoreAdminUI,
  type CoreAdminUIProps,
  localStorageStore,
} from "ra-core";
// *
import { LoginPage } from "@/resources/auth/login-page";

import { Layout } from "./layout";

const defaultStore = localStorageStore();

function AdminContext(props: CoreAdminContextProps) {
  return <CoreAdminContext {...props} />;
}

function AdminUi(props: CoreAdminUIProps) {
  return (
    <ThemeProvider>
      <CoreAdminUI
        authCallbackPage={AuthCallback}
        layout={Layout}
        loginPage={LoginPage}
        {...props}
      />
    </ThemeProvider>
  );
}

export function Admin(props: CoreAdminProps) {
  const {
    accessDenied,
    authCallbackPage = AuthCallback,
    authenticationError,
    authProvider,
    basename,
    catchAll,
    children,
    dashboard,
    dataProvider,
    disableTelemetry,
    error,
    i18nProvider = defaultI18nProvider,
    layout = Layout,
    loading,
    loginPage = LoginPage,
    queryClient,
    requireAuth,
    store = defaultStore,
    title = "Shadcn Admin",
  } = props;

  return (
    <AdminContext
      authProvider={authProvider}
      basename={basename}
      dataProvider={dataProvider}
      i18nProvider={i18nProvider}
      queryClient={queryClient}
      store={store}
    >
      <AdminUi
        accessDenied={accessDenied}
        authCallbackPage={authCallbackPage}
        authenticationError={authenticationError}
        catchAll={catchAll}
        dashboard={dashboard}
        disableTelemetry={disableTelemetry}
        error={error}
        layout={layout}
        loading={loading}
        loginPage={loginPage}
        requireAuth={requireAuth}
        title={title}
      >
        {children}
      </AdminUi>
    </AdminContext>
  );
}
