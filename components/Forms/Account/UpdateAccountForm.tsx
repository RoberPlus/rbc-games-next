"use client";

import { useToast } from "@/hooks/use-toast";
import { getCookie } from "cookies-next";
import { useActionState, useEffect } from "react";
import FormInput from "@/components/Forms/FormInput";
import { SubmitButton } from "@/components/Forms/SubmitButton";
import { actionFunction } from "@/components/Forms/Account/AddressForm";

const initialState = {
  message: "",
};

type UpdateAccountFormProps = {
  action: actionFunction;
};

const UpdateAccountForm = ({ action }: UpdateAccountFormProps) => {
  const [state, formAction] = useActionState(action, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      toast({ description: state.message });
    }
  }, [state, toast]);

  const rawUser = getCookie("user") as any;
  const user = JSON.parse(rawUser) as any;

  return (
    <>
      <form action={formAction}>
        <div className="grid gap-4 md:grid-cols-2">
          <FormInput
            type="text"
            name="firstName"
            label="First Name"
            defaultValue={user?.firstName}
            required={false}
          />
          <FormInput
            type="text"
            name="lastName"
            label="Last Name"
            defaultValue={user?.lastName}
            required={false}
          />
          <FormInput
            type="email"
            name="email"
            label="New email"
            required={false}
          />
          <FormInput
            type="email"
            name="repeatEmail"
            label="Repeat email"
            required={false}
          />
          <FormInput
            type="password"
            name="password"
            label="New password"
            required={false}
          />
          <FormInput
            type="password"
            name="repeatPassword"
            label="Repeat password"
            required={false}
          />
        </div>
        <SubmitButton text="Update Profile" className="w-full" />
      </form>
    </>
  );
};

export default UpdateAccountForm;
