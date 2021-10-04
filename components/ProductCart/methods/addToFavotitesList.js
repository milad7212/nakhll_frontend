import { ApiRegister } from '../../../services/apiRegister/ApiRegister';
import { errorMessage, successMessage } from '../../../containers/utils/message';
// api favorites list
export const addToFavoritesList = async (idProduct) => {
    let response = await ApiRegister().apiRequest(
        null,
        "POST",
        `/api/v1/lists/favotites/${idProduct}/add/`,
        true,
        {}
    );
    if (response.status === 200) {
        successMessage("محصول با موفقیت به لیست علاقه مندی های شما اضافه شد");
    } else {
        errorMessage("خطایی رخ داده است");
    }
};