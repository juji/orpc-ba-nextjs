import { errorHandling } from "./error-handling";
import { fileUpload } from "./file-upload";
import { formValidation } from "./form-validation";
import { hello } from "./hello";
import { add, multiply } from "./math";
import { shuffleEmail } from "./shuffle-email";

// Combined ORPC contract
export const orpcContract = {
  hello,
  add,
  multiply,
  shuffleEmail,
  errorHandling,
  formValidation,
  fileUpload,
};
