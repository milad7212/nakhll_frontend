// node libraries
import Image from "next/image";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Cropper from "react-easy-crop";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
// components
import MyLayout from "../../../../components/layout/Layout";
import Loading from "../../../../components/loading/index";
// methods
import { getCroppedImg } from "../../../../containers/product/create/canvasUtils";
import { ApiRegister } from "../../../../services/apiRegister/ApiRegister";
import { mapState } from "../../../../containers/product/methods/mapState";
// styles
import styles from "../../../../styles/pages/product/create.module.scss";
/**
 * component create product
 * @param {string} activeHojreh => it has slug of product
 */
const CreateProduct = ({ activeHojreh }) => {
  // useform
  const { setValue, clearErrors, register, setError, handleSubmit, watch, formState: { errors } } = useForm({
    criteriaMode: 'all',
  });
  // submit
  const onSubmit = async (data) => {
    let err = false
    if (!placeholderSubmarckets) {
      setError("submark", { type: "focus" }, { shouldFocus: true })
    } else {
      err = true
    }
    let product_status = document.querySelector("input[type=radio]:checked").value;

    if (err) {
      setshowMessage(0);
      setIsLoading(true);
      let confirm = {
        Title: data.Title,
        Inventory: Add,
        Slug: activeHojreh,
        Price: data.Price,
        OldPrice: data.OldPrice,
        Net_Weight: data.Net_Weight,
        Weight_With_Packing: data.Weight_With_Packing,
        Description: data.Description,
        Status: product_status,
        PostRangeType: 1,
        PreparationDays: AddPreparationDays,
        FK_Shop: activeHojreh,
      };
      let paramsProduct = {};
      let loadDataProduct = confirm;
      let dataUrlProduct = "/api/v1/landing/products/";
      let response = await ApiRegister().apiRequest(
        loadDataProduct,
        "post",
        dataUrlProduct,
        true,
        paramsProduct
      );
      var resultId = response.data.ID

      if (resultId) {
        let idProduct = {
          "product": resultId,
          "submarkets": [
            submarketId
          ]
        }

        let paramssubmarkets = {};
        let loadDatasubmarkets = idProduct;
        let dataUrlsubmarkets = "/api/v1/product/categories/";
        let responsesubmarkets = await ApiRegister().apiRequest(
          loadDatasubmarkets,
          "post",
          dataUrlsubmarkets,
          true,
          paramssubmarkets
        );

        let imagesProduct = {
          "product": resultId,
          "images":
            previewImage

        }

        let paramsImages = {};
        let loadDataImages = imagesProduct;
        let dataUrlImages = "/api/v1/product/images/";
        let responseImages = await ApiRegister().apiRequest(
          loadDataImages,
          "post",
          dataUrlImages,
          true,
          paramsImages
        );
        if (responseImages.status === 200) {
          setIsLoading(false);
          setshowMessage(1);
          setShowSuccessPage(true);
        }
      }
    }
  };
  // states
  const [placeholderSubmarckets, setPlaceholderSubmarckets] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [title, settitle] = useState("");
  const [subMarkets, setSubMarkets] = useState([]);
  const [dataChoice, setDataChoice] = useState({
    title: "",
    submarket: "",
  });
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [Add, setAdd] = useState(1);
  const [AddPreparationDays, setAddPreparationDays] = useState(1);
  const [isErrorWeight, setIsErrorWeight] = useState(false);
  const [isErrorPrice, setIsErrorPrice] = useState(false);
  const [submarketId, setSubmarketId] = useState(null);
  const [showSuccessPage, setShowSuccessPage] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const [showMessage, setshowMessage] = useState(0);
  const router = useRouter()
  const { id } = router.query
  // copy product
  const _editProduct = async () => {
    let params = null;
    let loadData = null;
    let dataUrl = `/api/v1/landing/products/${id}/`;
    let response = await ApiRegister().apiRequest(
      loadData,
      "get",
      dataUrl,
      true,
      params
    );
    if (response.status === 200) {
      setValue('Title', response.data.title)
      setValue('Net_Weight', response.data.net_weight)
      setValue('Weight_With_Packing', response.data.weight_with_packing)
      setValue('Price', response.data.price)
      setValue('OldPrice', response.data.old_price)
      setValue('Description', response.data.description)
      setPreviewImage(response.data.banners)
      setAdd(response.data.inventory)
      setAddPreparationDays(response.data.preparation_days)
      setIsLoad(true)
    }
  }
  // show success page
  if (showSuccessPage) {
    router.replace('/fp/product/create/successPageProduct')
  }
  // use effect
  useEffect(() => {

    window.localStorage.setItem("image", JSON.stringify([]));
    if (id) {
      _editProduct();
    }

    const _handleRequestApi = async () => {
      let params = null;
      let loadData = null;
      let dataUrl = "/api/v1/markets/";
      let response = await ApiRegister().apiRequest(
        loadData,
        "get",
        dataUrl,
        false,
        params
      );
      if (response.status === 200) {
        setIsLoad(true)
        setData(response.data); //==> output: {}
      }
    };
    _handleRequestApi();
  }, [activeHojreh]);

  // inputButton
  const mini = () => {
    if (Add == 0) {
      return;
    }
    setAdd(Add - 1);
  };
  const add = () => {
    setAdd(Add + 1);
  };
  // mini Preparation Days
  const miniPreparationDays = () => {
    if (AddPreparationDays == 0) {
      return;
    }
    setAddPreparationDays(AddPreparationDays - 1);
  };
  // Add Preparation Days
  const AddPreparationDayss = () => {
    setAddPreparationDays(AddPreparationDays + 1);
  };
  // submarket
  function clickButton(e) {
    setSubMarkets(e.submarkets);
    setDataChoice({ ...dataChoice, title: e.title });
    setPage(2);
    settitle(e.title);
  }
  // final Click
  function finalClick(e) {
    let element = document.getElementById("wrapperMarkets");
    element.style.display = "none";
    let elementProduct = document.getElementById("wrapper_product");
    elementProduct.style.display = "flex";
    setDataChoice({ ...dataChoice, submarket: e.title });
    setPlaceholderSubmarckets(e.title);
    setSubmarketId(e.id)
    setPage((page) => page - 1);
    clearErrors("submark")
  }
  // Go Back
  function GoBack() {
    if (page === 1) {
      let element = document.getElementById("wrapperMarkets");
      element.style.display = "none";
      let elementProduct = document.getElementById("wrapper_product");
      elementProduct.style.display = "flex";
    } else {
      setPage((page) => page - 1);
    }
  }
  // select Submarket
  const _selectSubmarket = () => {
    let element = document.getElementById("wrapperMarkets");
    element.style.display = "block";
    let elementProduct = document.getElementById("wrapper_product");
    elementProduct.style.display = "none";
  };
  // cropper
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  // on File Change
  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file)
      setImageSrc(imageDataUrl);
      let elementImageProduct = document.getElementById("crop_container");
      elementImageProduct.style.display = "block";
    }
  };
  // read File
  function readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.addEventListener('load', () => resolve(reader.result), false)
      reader.readAsDataURL(file)
    })
  }
  // on Close Cropper
  const _onCloseCropper = () => {
    let elementImageProduct = document.getElementById("crop_container");
    elementImageProduct.style.display = "none";
    setImageSrc(null);
    setValue("product_image_upload", null)
  };
  // show Cropped Image
  const showCroppedImage = async () => {
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
    if (croppedImage) {
      let listImage = window.localStorage.getItem("image");
      var prev = JSON.parse(listImage)
      setPreviewImage(prev);
    }
    let elementImageProduct = document.getElementById("crop_container");
    elementImageProduct.style.display = "none";
    if (prev.length === 5) {
      document.getElementById("product-image-upload").disabled = true;
    }
  };
  // validate check Weight
  const _checkWeight = () => {
    let Net_Weight = parseInt(document.getElementById("Net_Weight").value);
    let Weight_With_Packing = parseInt(document.getElementById("Weight_With_Packing").value);
    if (Net_Weight >= Weight_With_Packing) {
      setIsErrorWeight(true);
    } else {
      setIsErrorWeight(false);
    }
  };
  // validate check price
  const _checkPrice = () => {
    let Price = parseInt(document.getElementById("Price").value);
    let OldPrice = parseInt(document.getElementById("OldPrice").value);
    if (OldPrice > Price) {
      setIsErrorPrice(true);
    } else {
      setIsErrorPrice(false);
    }
  };
  // remove Image
  const _removeImage = (item) => {
    let listRemoveImage = window.localStorage.getItem("image");
    let removeImage = JSON.parse(listRemoveImage)
    let testt = removeImage.filter((itemRemove) => { return itemRemove.includes(item) ? "" : itemRemove });
    window.localStorage.setItem("image", JSON.stringify(testt));
    setPreviewImage(testt);
    if (testt.length == 0) {
      setValue("product_image_upload", null)
    }
  }

  if (isLoad) {
    return (
      <>
        <div className={styles.wrapper}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div id="wrapper_product" className={styles.wrapper_product}>
              <div className={styles.createProduct_lineRighte}>
                <div className="mt-4">
                  <div>
                    <h5 style={{ color: "#007aff", fontSize: "14px" }} className="mb-0 d-inline mr-20">
                      اطلاعات محصول
                    </h5>
                  </div>
                </div>
                <hr style={{ background: "#007aff", width: "100%" }} />
                {/* product name */}
                <div className={styles.wrapper_input}>
                  <label className={styles.lable_product} htmlFor="Title">
                    نام محصول
                  </label>
                  <input
                    className={styles.input_product}
                    id="Title"
                    type="text"
                    {...register("Title", { required: true })}
                  />
                  {errors.Title && <span style={{ color: "red", fontSize: "14px" }}>لطفا این گزینه را پر کنید</span>}
                </div>
                {/* category */}
                <div className={styles.wrapper_input}>
                  <label className={styles.lable_product} htmlFor="Title">
                    دسته بندی
                  </label>
                  <input className={styles.input_product} value={placeholderSubmarckets}
                    id="submark" name="submark" type="text" onClick={_selectSubmarket}
                    {...register("submark")}
                  />
                  {errors.submark && <span style={{ color: "red", fontSize: "14px" }}>لطفا این گزینه را پر کنید</span>}
                </div>
                {/* image */}
                <div id="imageProduct">
                  <div>
                    <p style={{ fontSize: "14px" }}>تصاویر</p>
                  </div>
                  <div style={{ color: "#5E7488", fontSize: "14px", marginBottom: "15px" }}
                    className="mt-3"
                  >
                    حداکثر تا 5 تصویر ، تصویر ابتدایی به عنوان تصویر اصلی نمایش
                    داده خواهد شد.
                  </div>
                  <div className="mt-4" name="mainPhoto">
                    <div className={styles.product_image_container}>
                      <label style={{ marginTop: 10, marginRight: 10 }} htmlFor="product-image-upload">
                        <div className={styles.add_image_container}>
                          <i style={{ fontSize: "25px" }}>+</i>
                          <p style={{ fontSize: "15px" }} className="mt-2">
                            افزودن تصویر
                          </p>
                        </div>
                      </label>
                      {/* input file */}
                      <input style={{ width: "0px", height: "0px", opacity: "0px" }}
                        type="file" id="product-image-upload"
                        {...register("product_image_upload", { required: true })}
                        onChange={onFileChange}
                      ></input>
                      {/* preview image */}
                      {previewImage && (previewImage.map((item, index) => {
                        return (
                          <div key={index} className={styles.product_image} style={{
                            backgroundImage: `url(${item})`
                          }}>
                            <div onClick={() => _removeImage(item)} className={styles.close_icon_container}>
                              <i style={{ fontSize: 14 }} className="fas fa-times"></i>
                            </div>
                          </div>
                        )
                      })
                      )}
                    </div>
                  </div>
                  {errors.product_image_upload && <span style={{ color: "red", fontSize: "14px" }}>لطفا این گزینه را پر کنید</span>}
                </div>
                {/* product detail */}
                <div className="mt-4">
                  <div>
                    <h5
                      style={{ color: "#007aff", fontSize: "14px" }}
                      className="mb-0 d-inline mr-20"
                    >
                      جزئیات محصول
                    </h5>
                  </div>
                </div>
                <hr style={{ background: "#007aff", width: "100%" }} />
                {/* weight */}
                <div className={styles.wrapper_input}>
                  <label className={styles.lable_product} htmlFor="Net_Weight">
                    وزن خالص محصول
                  </label>
                  <div className={styles.wrapper_input_suffixText}>
                    <input style={{ outline: "unset", border: "unset" }}
                      id="Net_Weight" name="Net_Weight" type="number"
                      {...register("Net_Weight", {
                        required: 'لطفا این گزینه را پرنمایید',
                        min: {
                          value: 0,
                          message: 'لطفا اعداد بزرگتر از صفر وارد نمایید'
                        }
                      })}
                      onChange={(e) => _checkWeight(e.target.value)}
                    />
                    <div>
                      <p>گرم</p>
                    </div>
                  </div>
                  {errors.Net_Weight && <span style={{ color: "red", fontSize: "14px" }}>{errors.Net_Weight.message}</span>}
                </div>
                {/* weight with packing */}
                <div className={styles.wrapper_input}>
                  <label className={styles.lable_product} htmlFor="Weight_With_Packing">
                    وزن با بسته بندی
                  </label>
                  <div className={styles.wrapper_input_suffixText}>
                    <input style={{ outline: "unset", border: "unset" }}
                      id="Weight_With_Packing" name="Weight_With_Packing" type="number"
                      {...register("Weight_With_Packing", {
                        required: 'لطفا این گزینه را پرنمایید',
                        min: {
                          value: 0,
                          message: 'لطفا اعداد بزرگتر از صفر وارد نمایید'
                        }
                      })}
                      onChange={(e) => _checkWeight(e.target.value)}
                    />
                    <div>
                      <p>گرم</p>
                    </div>
                  </div>
                  {errors.Weight_With_Packing && <span style={{ color: "red", fontSize: "14px" }}>{errors.Weight_With_Packing.message}</span>}
                  {isErrorWeight && (
                    <p style={{ color: "red", fontSize: "14px" }} className="text-danger">
                      وزن مشخص شده، می‌بایست بیشتر از وزن خالص محصول باشد
                    </p>
                  )}
                </div>
                {/* price */}
                <div className={styles.wrapper_input}>
                  <label className={styles.lable_product} htmlFor="Price">
                    قیمت محصول
                  </label>
                  <div className={styles.wrapper_input_suffixText}>
                    <input style={{ outline: "unset", border: "unset" }} id="Price"
                      name="Price" type="number"
                      {...register("Price", {
                        required: 'لطفا این گزینه را پرنمایید',
                        min: {
                          value: 500,
                          message: 'لطفا اعداد بزرگتر از 500 وارد نمایید'
                        }
                      })}
                      onChange={(e) => _checkPrice(e.target.value)}
                    />
                    <div>
                      <p>تومان</p>
                    </div>
                  </div>
                  {errors.Price && <span style={{ color: "red", fontSize: "14px" }}>{errors.Price.message}</span>}
                </div>
                {/* price with discount */}
                <div className={styles.wrapper_input}>
                  <label className={styles.lable_product} htmlFor="OldPrice">
                    قیمت محصول با تخفیف (اختیاری){" "}
                  </label>
                  <div className={styles.wrapper_input_suffixText}>
                    <input style={{ outline: "unset", border: "unset" }} id="OldPrice"
                      name="OldPrice" type="number" defaultValue={0}
                      {...register("OldPrice", {
                        min: {
                          value: 0,
                          message: 'لطفا اعداد بزرگتر از صفر وارد نمایید'
                        }
                      })}
                      onChange={(e) => _checkPrice(e.target.value)}
                    />
                    <div>
                      <p>تومان</p>
                    </div>
                  </div>
                  {errors.OldPrice && <span style={{ color: "red", fontSize: "14px" }}>{errors.OldPrice.message}</span>}
                  {isErrorPrice && (
                    <p style={{ color: "red", fontSize: "14px" }} className="text-danger">
                      قیمت مشخص شده برای تخفیف، می‌بایست کمتر از قیمت اصلی باشد
                    </p>
                  )}
                </div>
                {/* discription */}
                <div className={styles.wrapper_input}>
                  <label className={styles.lable_product} htmlFor="Description">
                    توضیحات محصول (اختیاری)
                  </label>
                  <textarea className={styles.input_product} id="Description"
                    name="Description" type="text"
                    placeholder="توضیحات خود را در صورت تمایل اینجا وارد کنید"
                  />
                </div>
                {/* inventory */}
                <div className={styles.twoCol}>
                  <div>
                    <p htmlFor="Inventory" style={{
                      marginBottom: "10px", color: "#364254",
                      fontSize: 14
                    }}
                    >
                      موجودی
                    </p>
                    <div className={styles.inputWidRtl}>
                      <button type="button" onClick={add}>
                        <span className="fas fa-plus"></span>
                      </button>
                      <div className={styles.center}>
                        <input type="number" min="0" max="500" value={Add} id="Inventory" name="Inventory"
                          onChange={(e) => {
                            setAdd(e.target.value);
                          }}
                        />
                        <h4>عدد</h4>
                      </div>
                      <button type="button" onClick={mini}>
                        <span className="fas fa-minus"></span>
                      </button>
                    </div>
                  </div>
                </div>
                {/* information  */}
                <div className="mt-4">
                  <div>
                    <h5 style={{ color: "#007aff", fontSize: "14px" }} className="mb-0 d-inline mr-20">
                      اطلاعات ارسال
                    </h5>
                  </div>
                </div>
                <hr style={{ background: "#007aff", width: "100%" }} />
                {/* Preparation Days */}
                <div className={styles.twoCol}>
                  <div>
                    <p htmlFor="PreparationDays" style={{
                      marginBottom: "10px", color: "#364254",
                      fontSize: 14
                    }}>
                      زمان آماده سازی
                    </p>
                    <div className={styles.inputWidRtl}>
                      <button type="button" onClick={AddPreparationDayss}>
                        <span className="fas fa-plus"></span>
                      </button>
                      <div className={styles.center}>
                        <input type="number" min="0" max="500" value={AddPreparationDays}
                          id="PreparationDays" name="PreparationDays"
                          onChange={(e) => {
                            setAddPreparationDays(e.target.value);
                          }}
                        />
                        <h4>روز</h4>
                      </div>
                      <button type="button" onClick={miniPreparationDays}>
                        <span className="fas fa-minus"></span>
                      </button>
                    </div>
                    <p style={{ fontSize: "13px", color: "#5E7488" }}>
                      زمان آماده سازی : آماده برای ارسال بعد از سفارش مستری
                    </p>
                  </div>
                </div>
                {/* product status */}
                <div style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
                  {/* Ready in stock */}
                  <label htmlFor="availbe" className="labels activeLabel"
                    onClick={(e) => {
                      let actives = document.getElementsByClassName("activeLabel");
                      for (let i = 0; i < actives.length; i++) {
                        actives[i].classList.remove("activeLabel");
                      }
                      e.currentTarget.classList.add("activeLabel");
                    }}
                  >
                    اماده در انبار
                  </label>
                  <input defaultChecked={true} value={1} type="radio" name="status_product"
                    id="availbe" className="radios" />
                  {/* Post ready production */}
                  <label htmlFor="stop" className="labels"
                    onClick={(e) => {
                      let actives = document.getElementsByClassName("activeLabel");
                      for (let i = 0; i < actives.length; i++) {
                        actives[i].classList.remove("activeLabel");
                      }
                      e.currentTarget.classList.add("activeLabel");
                    }}
                  >
                    تولید بعد از سفارش
                  </label>
                  <input value={2} type="radio" name="status_product" id="stop" className="radios" />
                  {/* Ordering */}
                  <label htmlFor="soon" className="labels"
                    onClick={(e) => {
                      let actives = document.getElementsByClassName("activeLabel");
                      for (let i = 0; i < actives.length; i++) {
                        actives[i].classList.remove("activeLabel");
                      }
                      e.currentTarget.classList.add("activeLabel");
                    }}
                  >
                    سفارشی سازی فروش
                  </label>
                  <input value={3} type="radio" name="status_product" id="soon" className="radios" />
                  {/* styles label */}
                  <style jsx>{`
                    .labels {
                      background: #ffffff;
                      border: 1px solid #e0e6e9;
                      box-sizing: border-box;
                      border-radius: 5px;
                      width: 250px;
                      height: 41px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      flex-direction: row;
                      font-size: 15px;
                      color: #a4aebb;
                      text-align: center;
                    }
                    .radios {
                      visibility: hidden;
                    }
                    .activeLabel {
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      flex-direction: row;
                      background: #ffffff;
                      border: 1px solid #007aff;
                      box-sizing: border-box;
                      border-radius: 5px;
                      width: 250px;
                      height: 41px;
                      font-size: 15px;
                      color: #007aff;
                    }
                  `}
                  </style>
                </div>
                {/* loading foe send api */}
                {IsLoading && (<div style={{ display: "flex", alignItems: "center" }}>
                  <div className={styles.loader}>
                    <Image src="/image/LOGO_500.png" alt="Picture of the author"
                      width={50} height={50} />
                  </div>
                  <h3 className={styles.nameLoding} style={{ fontSize: "15px", color: "hsl(211deg 100% 50%)" }}>
                    در حال بروزرسانی ...
                  </h3>
                </div>
                )}
                {/* success message */}
                {showMessage == 1 && (
                  <div>
                    <h3 style={{ color: "green" }}>
                      به روز رسانی با موفقیت انجام شد.
                    </h3>
                  </div>
                )}
                {/* error message */}
                {showMessage == 2 && (
                  <div>
                    <h3 style={{ color: "red" }}>
                      عملیات به روز رسانی موفقیت آمیز نبود.لطفا باری
                      دیگر اقدام کنید.
                    </h3>
                  </div>
                )}
                {/* button submit */}
                <div>
                  <button type="submit" className={styles.form_buttonSubmit}>
                    ثبت محصول
                  </button>
                </div>
              </div>
              {/* left side */}
              <div className={styles.createProduct_lineLeft}>
                <div className="mt-4">
                  <div>
                    <h5 style={{ color: "#007aff", fontSize: "14px" }} className="mb-0 d-inline mr-20"></h5>
                  </div>
                </div>
                <hr style={{ background: "#007aff" }} />
                <div>
                  <p style={{ color: "#5E7488", fontSize: "14px", marginTop: "90px" }}>
                    به عنوان مثال : برنج لاشه 10 کیلویی، کشت اول
                  </p>
                </div>
              </div>
            </div>
          </form>
          {/* category page */}
          <div style={{ position: "relative", gridColumn: "1/-1", gridRow: "1/-1", background: "#ffffff" }}>
            <div id="wrapperMarkets" className={styles.markets}>
              <div className={styles.wrapper}>
                <div className={styles.Header}>
                  <button style={{ outline: "unset" }} onClick={GoBack} className={styles.btn_icon}>
                    <span className="fas fa-arrow-right"
                      style={{ fontSize: "15px", color: "#5E7488", marginLeft: "20px", marginRight: "20px" }}
                    ></span>
                  </button>
                  {page === 1 && <h2>انتخاب دسته بندی</h2>}
                  {page !== 1 && <h2> انتخاب زیر دسته از {title} </h2>}
                </div>
                <div className={styles.content}>
                  {page === 1 ? (data?.map((e, index) => {
                    return (
                      <button key={index} style={{ outline: "unset" }} onClick={() => clickButton(e)} className={styles.btn}>
                        <div className={styles.in_btn}>
                          <h2 style={{ marginRight: "14px" }}>{e.title}</h2>
                          <span style={{ marginLeft: "14px" }} className="fas fa-chevron-left fa-2x"></span>
                        </div>
                      </button>
                    );
                  })
                  ) : page === 2 ? (
                    <>
                      {subMarkets?.map((e, index) => {
                        return (
                          <button key={index} style={{ outline: "unset" }} onClick={() => finalClick(e)}
                            className={styles.btn}>
                            <div className={styles.in_btn}>
                              <h2 style={{ marginRight: "14px" }}>{e.title}</h2>
                              <span style={{ marginLeft: "14px" }} className="fas fa-chevron-left fa-2x"
                              ></span>
                            </div>
                          </button>
                        );
                      })}
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          {/* croperProduct modal*/}
          <div id="crop_container" className={styles.wrapperIMageProduct}>
            <Cropper image={imageSrc} crop={crop} restrictPosition={true}
              zoom={zoom} aspect={1}
              classes={{
                containerClassName: "container_cropper_product",
                cropAreaClassName: "product_cropArea",
              }}
              onCropChange={setCrop} onCropComplete={onCropComplete} onZoomChange={setZoom}
            />
            <div className={styles.controls}>
              <input value={zoom} type="range" step="0.1" max="3" min="1"
                onChange={(e) => setZoom(e.target.value)}
              />
              <div className={styles.wrapperButton}>
                <div style={{ marginLeft: "10px" }}>
                  <button onClick={showCroppedImage} className="btn btn-success btn-lg">
                    تایید
                  </button>
                </div>
                <div>
                  <button onClick={_onCloseCropper} className="btn btn-secondary btn-lg">
                    لغو
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <Loading />)
  }
};
// exports
const connector = connect(mapState);
export default connector(CreateProduct);
CreateProduct.Layout = MyLayout;