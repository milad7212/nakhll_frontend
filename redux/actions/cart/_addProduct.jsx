import { ApiRegister } from "../../../services/apiRegister/ApiRegister";

import { successMessage } from "../../../containers/utils/message";
export const _addProduct = (productId) => {
  return async (dispatch) => {
    try {
      let token = localStorage.getItem("accessToken");
      let params = {};
      let loadData = null;
      let dataUrl = `/cart2/api/cart_items/${productId}/add/`;
      let response = await ApiRegister().apiRequest(
        loadData,
        "get",
        dataUrl,
        token ? true : false,
        params
      );

      if (response.status === 200) {
        await dispatch({
          type: "ADD_PRODUCT",
          payload: response.data,
        });
        successMessage("داده ها با موفقیت ثبت شده اند");
      }
    } catch (e) {}
  };
};
