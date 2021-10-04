import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";

import styles from "../../../styles/pages/cart/payment/payment.module.scss";
import ShopLayout from "../../../components/shopLayout";

import { ApiRegister } from "../../../services/apiRegister/ApiRegister";
import { errorMessage } from "../../../containers/utils/message";
import Assistent from "zaravand-assistent-number";





const _asist = new Assistent();

export default function Cart() {
  const [msgCoupon, setMsgCoupon] = useState([]);
  const [isLoadInvoice, setIsLoadInvoice] = useState(true);
  const [listInvoice, setListInvoice] = useState([]);
  const [logisticPrice, setLogisticPrice] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [finalPrice, setFinalPrice] = useState(null);
  const [addressReceiver, setAddressReceiver] = useState({});
  const [resultCoupon, setResultCoupon] = useState(null);
  // const [listMsgCoupon, setlistMsgCoupon] = useState(null)

  let item = [
    {
      id: 53,
      cart: 10,
      product: {
        image_thumbnail_url:
          "https://nakhll.com/media/CACHE/images/media/Pictures/Markets/SubMarkets/Shops/Products/6FDT9m/6a34047cff3a249326a8d4419ff3ba3f.jpg",
        url: "/product/kilm_darestan/h30_30_2/",
        old_price: 4100000,
        price: 3500000,
        slug: "h30_30_2",
        title: "گليم ( فرش دستباف ) 30 * 30 سانتي متري طرح یک",
        status: "تولید بعد از سفارش",
        discount: 14,
        id: "01b85eb9-46fb-4726-959c-59def8200745",
        shop: {
          slug: "kilm_darestan",
          title: "گليم شیریکی پیچ (فرش دستباف) دارستان",
          url: "/kilm_darestan/",
          image_thumbnail_url:
            "https://nakhll.com/media/CACHE/images/media/Pictures/Markets/SubMarkets/Shops/xm8aDL/e1cf7fca21d746f7629150c04a7bd4b3.jpg",
          state: "کرمان",
          show_contact_info: false,

          publish: true,
          available: true,
        },
      },
      total_price: 3500000,
      total_old_price: 4100000,
      count: 1,
      added_datetime: "2021-08-15T10:34:07.210799+04:30",
    },
    {
      id: 52,
      cart: 10,
      product: {
        image_thumbnail_url:
          "https://nakhll.com/media/CACHE/images/media/Pictures/Markets/SubMarkets/Shops/Products/Xwy0Is/7dca6b5390898fb9b7d49721aef7a213.jpg",
        url: "/product/kilm_darestan/h0_0_1/",
        old_price: 6100000,
        price: 5800000,
        slug: "h0_0_1",
        title: "گليم ( فرش دستباف ) جعبه دستمال کاغذي",
        status: "تولید بعد از سفارش",
        discount: 4,
        id: "b8cbfae0-b008-4c7f-93ad-8fe077b51a74",
        shop: {
          slug: "kilm_darestan",
          title: "گليم شیریکی پیچ (فرش دستباف) دارستان",
          url: "/kilm_darestan/",
          image_thumbnail_url:
            "https://nakhll.com/media/CACHE/images/media/Pictures/Markets/SubMarkets/Shops/xm8aDL/e1cf7fca21d746f7629150c04a7bd4b3.jpg",
          state: "کرمان",
          show_contact_info: false,
          publish: true,
          available: true,
        },
      },
      total_price: 5800000,
      total_old_price: 6100000,
      count: 5,
      added_datetime: "2021-08-15T10:34:02.161705+04:30",
    },
  ];

  useEffect(() => {
    _getListInvoice();
  }, []);

  const _getListInvoice = async () => {
    let dataUrl = "/accounting_new/api/invoice/active_invoice/";
    let response = await ApiRegister().apiRequest(
      null,
      "GET",
      dataUrl,
      true,
      {}
    );
    let data = response.data;
    if (response.status === 200) {
      setListInvoice(data.cart.ordered_items);
      setLogisticPrice(data.logistic_price);
      setTotalPrice(data.cart.total_price);
      setFinalPrice(data.final_price);
      setAddressReceiver(data.address);
      setResultCoupon(data.coupons_total_price);
      setMsgCoupon(data.coupon_usages);
      setIsLoadInvoice(false);
    }
  };

  const _addCoupon = async (e) => {
    e.preventDefault();
    let valueCoupon = e.target[0].value;
    if (valueCoupon) {
      setIsLoadInvoice(true);
      let params = {};
      let loadData = { coupon: valueCoupon };
      let dataUrl = `/accounting_new/api/invoice/set_coupon/`;
      try {
        let response = await ApiRegister().apiRequest(
          loadData,
          "PATCH",
          dataUrl,
          true,
          params
        );
        let data = response.data;
        if (response.status === 200) {
          if (data.result) {
            await _getListInvoice()
            setIsLoadInvoice(false);

          } else {
            data.errors.map((item) => {
              errorMessage(item);
            });
            setIsLoadInvoice(false);
          }
          // setIsLoadInvoice(false);
        }
      } catch (e) {
        console.log(`error>>>>>>>>>>>>>>>>>>`, e.response)
        let errorData = e.response.data
        errorData.coupon.map((item) => {
          errorMessage(item);
        });
        // setMsgCoupon("adkaslkdjksa");
      }
    }
  };

  const _deleteCoupon = async (coupon) => {
    setIsLoadInvoice(true);
    let params = {};
    let loadData = { coupon };
    let dataUrl = `/accounting_new/api/invoice/unset_coupon/`;
    let response = await ApiRegister().apiRequest(
      loadData,
      "PATCH",
      dataUrl,
      true,
      params
    );
    if (response.status === 200) {
      await _getListInvoice()
      setIsLoadInvoice(false);
    }

  };

  const invoicePay = async () => {
    try {
      setIsLoadInvoice(true);
      let params = {};
      let loadData = null;
      let dataUrl = `/accounting_new/api/invoice/pay/`;
      let response = await ApiRegister().apiRequest(
        loadData,
        "GET",
        dataUrl,
        true,
        params
      );
      let data = response.data;
      if (response.status === 200) {
      }


    } catch (error) {
    }
  }

  console.log(`addressReceiver.receiver_full_name`, resultCoupon)
  return (
    <div className={styles.steps_wrapper}>
      <Head>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
        />
      </Head>

      <div className="col-12 col-lg-5 px-0 mb-3">
        <div className="box box-sm bg-white" style={{ minHeight: "14rem" }}>
          <div
            className="cart-head d-flex align-items-center py-3 px-3 text-right mb-0 bg-gray-100"
            style={{ borderRadius: "5px 5px 0px 0px" }}
          >
            <Link href="/cart/address">
              <a
                className="font-size-8 text-muted"
                style={{ flexBasis: "43.33%" }}
              >
                <i
                  className="bi fas fa-arrow-right"
                  style={{ marginLeft: "10px", fontSize: "12.8px" }}
                ></i>
                بازگشت
              </a>
            </Link>

            <h2
              style={{
                fontSize: "20px",
                marginBottom: "0.5rem",
                fontWeight: "500",
                lineHeight: "1.7",
              }}
              className="font-weight-bold  m-0"
            >
              {" "}
              پرداخت{" "}
            </h2>
          </div>
          <div className={styles.steps_body}>


            {/* کد تخفیف */}
            <div>
              <h3
                style={{
                  marginBottom: "0.5rem",
                  fontWeight: "500",
                  lineHeight: "1.7",
                }}
                className="font-size1 text-dark"
              >
                کد تخفیف
              </h3>
              <form
                style={{ borderRadius: "5px" }}
                className={`input-group ${styles.input_group__box}`}
                onSubmit={(e) => _addCoupon(e)}
              >
                <input
                  type="text"
                  name="coupon-code"
                  placeholder="اگر کد تخفیف دارید، وارد کنید"
                  className={`form-control ${styles.boxShadowNot}`}
                />

                <div className="input-group-append">
                  <button
                    type="submit"
                    className={`btn rounded-pill px-3 ${styles.btnCheckCoupon}`}
                    style={{
                      backgroundColor: "rgb(27,62,104)",
                      color: "#fff",
                    }}
                  >
                    بررسی
                  </button>
                </div>
                <div className={`${styles.input_group_bg} rounded-pill`}></div>
              </form>
              {msgCoupon && (
                msgCoupon.map((item) => {
                  return (
                    <div className="border border-success bg-white font-size-9 py-2 pr-3 mt-3 rounded d-flex flex-wrap justify-content-between align-items-center">
                      <span className=" text-success ml-3">کوپن شما با مبلغ {item.price_applied / 10
                      } تومان برای شما فعال گردید.</span>
                      {/* <strong className="text-success ml-3">61,000 تومان</strong> */}
                      <button onClick={() => _deleteCoupon(item.coupon)} className="btn btn-link text-danger btn-sm mr-auto">
                        <i className="fas fa-times" ></i>
                      </button>
                    </div>
                  )
                })

              )}
            </div>

            {/* استفاده از اعتبار*/}
            {/* <div className="mt-3">
                            <div className="use-credit-box">
                                <div className="toggle-btn">
                                    <label data-v-25adc6c0 className="vue-js-switch">
                                        <input data-v-25adc6c0 type="checkbox" className="v-switch-input" style={{ opacity: 0, position: "absolute", width: "1px", height: "1px" }} />
                                        <div
                                            data-v-25adc6c0
                                            className="v-switch-core"
                                            style={{
                                                width: 45,
                                                height: 25,
                                                backgroundColor: "rgb(191, 203, 217)",
                                                borderRadius: 13
                                            }}
                                        >
                                            <div
                                                data-v-25adc6c0
                                                className="v-switch-button"
                                                style={{
                                                    width: 19,
                                                    height: 19,
                                                    transition: "transform 300ms ease 0s",
                                                    transform: "translate3d(3px, 3px, 0px)",
                                                    background: "rgb(255, 255, 255)"
                                                }}
                                            />
                                        </div>
                                    </label>
                                    <span className="toggle-btn-text pointer">استفاده از اعتبار</span>
                                </div>
                                <span className="text-success mr-auto">اعتبار شما 11,000 تومان</span>
                            </div>
                        </div> */}

            <h3
              style={{
                marginBottom: "0.5rem",
                fontWeight: "500",
                lineHeight: "1.7",
              }}
              className="font-size1 text-dark mt-3"
            >
              فاکتور سفارش
            </h3>

            <div className="mt-3 position-relative">
              {/**/}
              {isLoadInvoice && (
                <div className={styles.loading_box}>
                  <div className={`${styles.spinner} ${styles.spinner__tiny}`}></div>
                </div>
              )}
              {item &&
                listInvoice.map((itemProduct) => {
                  return (
                    <div className="font-size-sm border-bottom pb-3 mt-3">
                      <div className="title font-weight-500">
                        از غرفه {itemProduct.product.shop.title}
                      </div>
                      <div className="d-flex align-items-center mt-3">
                        <div className={`${styles.picItemInvoice}`}>
                          <a href="/pestehkerman/product/175903" className>
                            <img
                              src={itemProduct.product.image_thumbnail_url}
                              alt={itemProduct.product.title}
                            />
                          </a>
                        </div>
                        <div className="mr-3" style={{ minWidth: "1%", marginRight: "1rem" }}>
                          <a
                            href={itemProduct.product.url}
                            className="link-body"
                          >
                            {itemProduct.product.title}
                          </a>
                          <div className="mt-2">{itemProduct.count}عدد</div>
                        </div>
                        <div className="mr-auto" style={{ marginRight: "auto" }}>
                          {_asist.PSeparator(itemProduct.total_price / 10)}{" "}
                          تومان
                        </div>
                      </div>


                    </div>
                  );
                })}


              <div className="font-size-sm border-bottom py-3">
                <div className="d-flex py-1">
                  <span>جمع بهای سفارش:</span>
                  <span className="mr-auto" style={{ marginRight: "auto" }}>
                    {_asist.PSeparator(totalPrice / 10)} تومان
                  </span>
                </div>
                <div className="d-flex py-1">
                  <span>هزینه ارسال:</span>{" "}
                  <span className="mr-auto" style={{ marginRight: "auto" }}>
                    {_asist.PSeparator(logisticPrice / 10)} تومان
                  </span>
                </div>
                {resultCoupon !== 0 && (
                  <div className="d-flex py-1 text-danger">
                    <span>تخفیف قیمت محصولات (-) :</span>
                    <span className="mr-auto" style={{ marginRight: "auto" }}>{_asist.PSeparator(resultCoupon / 10)} تومان</span>
                  </div>
                )}
                {/**/} {/**/}
                <div className="d-flex py-1 font-weight-500 ">
                  <span style={{ color: "rgb(27,62,104)" }}>
                    مبلغ قابل پرداخت:
                  </span>
                  <span className="mr-auto" style={{ color: "rgb(27,62,104)", marginRight: "auto" }}>
                    {_asist.PSeparator(finalPrice / 10)} تومان
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-3 p-3 border rounded font-size-sm my-3 line-height-normal">
              <div className="mx-auto" style={{ textAlign: "center" }}>
                تمامی بسته‌های پستی به آقا/خانم
                <strong> {addressReceiver.receiver_full_name} </strong>
                به آدرس
                <strong className="font-size-8"> {addressReceiver.address} </strong>
                تحویل داده می‌شوند.
              </div>
              <div className="text-left line-height-1 mb-5 mb-md-0">
                <Link
                  href={`/cart/address/update/${addressReceiver.id}?prev=payment`}
                  className="font-size-8 link-body"
                >
                  ویرایش
                </Link>
              </div>
              {/* <div className="toggle-btn mt-2">
                                <label data-v-25adc6c0 className="vue-js-switch toggled">
                                    <input data-v-25adc6c0 type="checkbox" className="v-switch-input" style={{ opacity: 0, position: "absolute", width: "1px", height: "1px" }} />
                                    <div
                                        data-v-25adc6c0
                                        className="v-switch-core"
                                        style={{
                                            width: 45,
                                            height: 25,
                                            backgroundColor: "rgb(0, 96, 96)",
                                            borderRadius: 13
                                        }}
                                    >
                                        <div
                                            data-v-25adc6c0
                                            className="v-switch-button"
                                            style={{
                                                width: 19,
                                                height: 19,
                                                transition: "transform 300ms ease 0s",
                                                transform: "translate3d(23px, 3px, 0px)",
                                                background: "rgb(255, 255, 255)"
                                            }}
                                        />
                                    </div>
                                </label>
                                <span className="toggle-btn-text pointer">
                                    ارسال شماره من به غرفه دار
                                    <div className="text-secondary font-size-9 d-block d-lg-inline-block mr-lg-2">
                                        (برای هماهنگی دریافت سفارش)
                                    </div>
                                </span>
                            </div> */}
            </div>

            <div className="d-none d-md-flex justify-content-between mt-4">
              <span
                className="font-size1  font-weight-bold"
                style={{ color: "rgb(27,62,104)" }}
              >
                مبلغ قابل‌پرداخت:
              </span>
              <span className=" font-size1" style={{ color: "rgb(27,62,104)" }}>
                <strong className="payableAmount splitNumber font-size1-2">
                  {_asist.PSeparator(finalPrice / 10)}
                </strong>
                تومان
              </span>
            </div>

            <div className={`${styles.buttonPayment} mt-3`} >
              <div className="d-md-none mb-2 font-size-sm text-success d-flex">
                <span
                  className="font-weight-bold"
                  style={{ color: "rgb(27,62,104)" }}
                >
                  مبلغ قابل‌پرداخت:
                </span>
                <strong
                  className="mr-auto ml-1"
                  style={{ color: "rgb(27,62,104)" }}
                >
                  {_asist.PSeparator(finalPrice / 10)}
                </strong>
                تومان
              </div>
              <button
                style={{ backgroundColor: "rgb(27,62,104)", color: "#fff" }}
                className={`${styles.cart_button} btn w-100 d-flex justify-content-between align-items-center px-4`}
                onClick={invoicePay}
              >
                <span className="d-inline-block w-100 text-center font-size1">
                  پرداخت آنلاین
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

Cart.Layout = ShopLayout;