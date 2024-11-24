"use client";

import { actionFunction } from "@/components/Forms/Account/AddressForm";
import FormInput from "@/components/Forms/FormInput";
import { SubmitButton } from "@/components/Forms/SubmitButton";
import { useToast } from "@/hooks/use-toast";
import { createUserAction } from "@/utils/actions";
import { useActionState, useEffect } from "react";

const initialState = {
  message: "",
};

type RegisterFormProps = {
  action: actionFunction;
};

export function RegisterForm({ action }: RegisterFormProps) {
  const [state, formAction] = useActionState(action, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      toast({ description: state.message });
    }
  }, [state, toast]);

  return (
    <>
      <form action={formAction}>
        <div>
          <FormInput type="text" name="username" label="Username" />
          <FormInput type="email" name="email" label="Email" />
          <FormInput type="password" name="password" label="Password" />
        </div>
        <SubmitButton text="Create Account" className="w-full" />
      </form>
    </>
  );
}
