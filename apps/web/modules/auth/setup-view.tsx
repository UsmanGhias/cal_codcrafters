"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import AdminAppsList from "@calcom/features/apps/AdminAppsList";
import { APP_NAME } from "@calcom/lib/constants";
import { useLocale } from "@calcom/lib/hooks/useLocale";
import type { inferSSRProps } from "@calcom/types/inferSSRProps";
import { WizardForm } from "@calcom/ui/components/form";
import type { WizardStep } from "@calcom/ui/components/form/wizard/WizardForm";

import { AdminUserContainer as AdminUser } from "@components/setup/AdminUser";

// import LicenseSelection from "@components/setup/LicenseSelection";
import type { getServerSideProps } from "@server/lib/setup/getServerSideProps";

const SETUP_VIEW_SETPS = {
  ADMIN_USER: 1,
  LICENSE: 2,
  APPS: 3,
} as const;

export type PageProps = inferSSRProps<typeof getServerSideProps>;
export function Setup(props: PageProps) {
  const [hasPickedAGPLv3, setHasPickedAGPLv3] = useState(true); // Set to true by default to skip license step
  const { t } = useLocale();
  const router = useRouter();
  const [licenseOption, setLicenseOption] = useState<"FREE" | "EXISTING">("FREE");

  const defaultStep = useMemo(() => {
    if (props.userCount > 0) {
      // Always skip to apps step since we're setting hasPickedAGPLv3 to true
      return SETUP_VIEW_SETPS.APPS;
    }
    return SETUP_VIEW_SETPS.ADMIN_USER;
  }, [props.userCount]);

  const steps: WizardStep[] = [
    {
      title: t("administrator_user"),
      description: t("lets_create_first_administrator_user"),
      customActions: true,
      content: (setIsPending, nav) => (
        <AdminUser
          onSubmit={() => {
            setIsPending(true);
          }}
          onSuccess={() => {
            // Skip directly to apps step since license step is disabled
            nav.onNext();
            nav.onNext(); // Skip license step
          }}
          onError={() => {
            setIsPending(false);
          }}
          userCount={props.userCount}
          nav={nav}
        />
      ),
    },
  ];

  // License selection step is completely removed - no longer needed

  steps.push({
    title: t("enable_apps"),
    description: t("enable_apps_description", { appName: APP_NAME }),
    contentClassname: "!pb-0 mb-[-1px]",
    customActions: true,
    content: (setIsPending, nav) => {
      return (
        <AdminAppsList
          id={`wizard-step-${steps.length}`}
          name={`wizard-step-${steps.length}`}
          classNames={{
            form: "mb-4 rounded-md bg-default px-0 pt-0 md:max-w-full",
            appCategoryNavigationContainer: "max-h-[400px] overflow-y-auto md:p-4",
            verticalTabsItem: "!w-48 md:p-4",
          }}
          baseURL={`/auth/setup?step=${steps.length}`}
          useQueryParam={true}
          onSubmit={() => {
            setIsPending(true);
            router.replace("/");
          }}
          nav={nav}
        />
      );
    },
  });

  return (
    <main className="bg-subtle flex items-center print:h-full md:h-screen">
      <WizardForm
        defaultStep={defaultStep}
        steps={steps}
        nextLabel={t("next_step_text")}
        finishLabel={t("finish")}
        prevLabel={t("prev_step")}
        stepLabel={(currentStep, maxSteps) => t("current_step_of_total", { currentStep, maxSteps })}
      />
    </main>
  );
}

Setup.isThemeSupported = false;

export default Setup;
