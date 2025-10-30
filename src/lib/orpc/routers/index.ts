import { errorHandling } from "./error-handling";
import { eventIterator } from "./event-iterator";
import { fileUpload } from "./file-upload";
import { formValidation } from "./form-validation";
import { hello } from "./hello";
import { add, multiply } from "./math";
import { serverAction } from "./server-action";
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
  eventIterator,
  serverAction,
};
