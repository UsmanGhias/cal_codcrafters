"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as RadioGroup from "@radix-ui/react-radio-group";
import classNames from "classnames";
import { useCallback, useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { z } from "zod";

import { useLocale } from "@calcom/lib/hooks/useLocale";
import type { RouterInputs, RouterOutputs } from "@calcom/trpc/react";
import { trpc } from "@calcom/trpc/react";
import { Button } from "@calcom/ui/components/button";

type LicenseSelectionFormValues = {
  licenseKey: string;
  signatureToken?: string;
};

type LicenseOption = "FREE" | "EXISTING";

const LicenseSelection = (
  props: {
    value: LicenseOption;
    onChange: (value: LicenseOption) => void;
    onSubmit: (value: LicenseSelectionFormValues) => void;
    onSuccess?: (
      data: RouterOutputs["viewer"]["deploymentSetup"]["update"],
      variables: RouterInputs["viewer"]["deploymentSetup"]["update"]
    ) => void;
    onPrevStep: () => void;
    onNextStep: () => void;
  } & Omit<JSX.IntrinsicElements["form"], "onSubmit" | "onChange">
) => {
  const {
    value: initialValue = "FREE",
    onChange,
    onSubmit,
    onSuccess,
    onPrevStep,
    onNextStep,
    ...rest
  } = props;
  const [value, setValue] = useState<LicenseOption>(initialValue);
  const { t } = useLocale();
  const mutation = trpc.viewer.deploymentSetup.update.useMutation({
    onSuccess,
  });

  const [licenseKeyInput, setLicenseKeyInput] = useState("");
  const [licenseTouched, setLicenseTouched] = useState(false);

  // Use TRPC query for validation
  const { data: licenseValidation, isLoading: checkLicenseLoading } =
    trpc.viewer.deploymentSetup.validateLicense.useQuery(
      { licenseKey: licenseKeyInput },
      {
        enabled: licenseTouched && licenseKeyInput.trim().length > 0,
      }
    );

  const schemaLicenseKey = useCallback(
    () =>
      z.object({
        licenseKey: z
          .string()
          .min(1, t("license_key_required"))
          .refine(() => !licenseTouched || (licenseValidation ? licenseValidation.valid : true), {
            message: licenseValidation?.message || t("invalid_license_key"),
          }),
        signatureToken: z.string().optional(),
      }),
    [licenseValidation, licenseTouched, t]
  );

  const formMethods = useForm<LicenseSelectionFormValues>({
    defaultValues: {
      licenseKey: "",
      signatureToken: "",
    },
    resolver: zodResolver(schemaLicenseKey()),
  });

  const handleSubmit = formMethods.handleSubmit((values) => {
    onSubmit(values);
    if (value === "EXISTING" && values.licenseKey) {
      mutation.mutate(values);
    }
  });

  const { isDirty, errors } = useFormState(formMethods);

  const handleRadioChange = (newValue: LicenseOption) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <form
      {...rest}
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        if (value === "FREE") {
          onSubmit({ licenseKey: "", signatureToken: "" });
        } else {
          handleSubmit();
        }
      }}>
      <RadioGroup.Root
        defaultValue={initialValue}
        value={value}
        aria-label={t("choose_a_license")}
        className="grid grid-rows-1 gap-4 md:grid-cols-1 md:grid-rows-1">
        <RadioGroup.Item value="FREE" className="h-full">
          <div
            className={classNames(
              "bg-default h-full cursor-pointer space-y-2 rounded-md border p-4 hover:border-black",
              value === "FREE" && "ring-2 ring-black"
            )}>
            <h2 className="font-cal text-emphasis text-xl">{t("agplv3_license")}</h2>
            <p className="font-medium text-green-800">{t("free_license_fee")}</p>
            <p className="text-subtle">{t("forever_open_and_free")}</p>
            <ul className="text-subtle ml-4 list-disc text-left text-xs">
              <li>{t("required_to_keep_your_code_open_source")}</li>
              <li>{t("cannot_repackage_and_resell")}</li>
              <li>{t("no_enterprise_features")}</li>
            </ul>
          </div>
        </RadioGroup.Item>
      </RadioGroup.Root>

      <div className="flex justify-end gap-2">
        <Button type="button" color="secondary" onClick={onPrevStep}>
          {t("prev_step")}
        </Button>
        <Button color="primary" onClick={onNextStep} type="button">
          {t("next_step")}
        </Button>
      </div>
    </form>
  );
};

export default LicenseSelection;
