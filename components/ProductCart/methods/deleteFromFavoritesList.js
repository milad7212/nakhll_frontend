import { ApiRegister } from '../../../services/apiRegister/ApiRegister';
import { errorMessage, successMessage } from '../../../containers/utils/message';
// api favorites list
export const deleteFromFavoritesList = async (idProduct) => {
    let response = await ApiRegister().apiRequest(
        null,
        "DELETE",
        `/api/v1/lists/favotites/${idProduct}/remove/`,
        true,
        {}
    );
    if (response.status === 200) {
        successMessage("محصول مورد نظر از لیست علاقه مندی ها حذف شد");
    } else {
        errorMessage("خطایی رخ داده است");
    }
};