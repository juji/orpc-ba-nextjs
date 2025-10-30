import { implement } from "@orpc/server";
import { contracts } from "../contracts/form-validation";

// Create implementer for form validation contract
const os = implement(contracts);

// Form validation procedure implementation
export const formValidation = os.formValidation.handler(({ input }) => {
  // The input is already validated by the contract schema
  // If we reach here, the data is valid
  return {
    message: "Form data validated successfully",
    success: true,
    validatedData: input,
  };
});
