import { errorHandling } from "./error-handling";
import { fileUpload } from "./file-upload";
import { formValidation } from "./form-validation";
import { hello } from "./hello";
import { add, multiply } from "./math";
import { shuffleEmail } from "./shuffle-email";

// Combined ORPC routers
export const orpcRouters = {
  hello,
  add,
  multiply,
  shuffleEmail,
  errorHandling,
  formValidation,
  fileUpload,
};
