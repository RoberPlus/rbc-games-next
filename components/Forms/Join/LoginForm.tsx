"use client";

import { actionFunction } from "@/components/Forms/Account/AddressForm";
import FormInput from "@/components/Forms/FormInput";
import { SubmitButton } from "@/components/Forms/SubmitButton";
import { useToast } from "@/hooks/use-toast";
import { useActionState, useEffect } from "react";

const initialState = {
  message: "",
};

type LoginFormProps = {
  action: actionFunction;
};

export function LoginForm({ action }: LoginFormProps) {
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
          <FormInput type="text" name="identifier" label="Email" />
          <FormInput type="password" name="password" label="Password" />
        </div>
        <SubmitButton text="Log In" className="w-full" />
      </form>
    </>
  );
}
