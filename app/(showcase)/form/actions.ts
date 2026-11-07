"use server";

import type { FormProps } from "@/components/own/independant/form";

export interface RegistrationState {
  errors?: FormProps["errors"];
  acceptedCode?: string;
}

export async function checkTeamCode(
  _previousState: RegistrationState,
  formData: FormData,
): Promise<RegistrationState> {
  const rawCode = formData.get("teamCode");
  const code = typeof rawCode === "string" ? rawCode.trim().toLowerCase() : "";

  if (!/^turno-[0-9]{2}$/.test(code)) {
    return { errors: { teamCode: "Usa turno- seguido de dos cifras." } };
  }
  if (code === "turno-01") {
    return { errors: { teamCode: "El código turno-01 ya está asignado." } };
  }
  return { acceptedCode: code };
}
