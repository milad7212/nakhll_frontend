import { errorMessage } from "../../containers/utils/message";
import { ApiRegister } from "../../services/apiRegister/ApiRegister";
// get address of user
export async function addAddress(data) {
  let response = await ApiRegister().apiRequest(
    data,
    "POST",
    "/logistic/api/address/",
    true,
    ""
  );
  if (response.status === 201) {
    return true;
  } else {
    errorMessage("خطایی در دریافت داده ها پیش آمده است");
  }
}
