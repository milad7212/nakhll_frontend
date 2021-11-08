import React, { useEffect, useState } from "react";
import styles from "./SaveLanding.module.scss";
import Assistent from "zaravand-assistent-number";
import { useDispatch } from "react-redux";
import { _showSelect_url } from "../../../redux/actions/liveEdit/_showSelect_url";
import { _updateUrl } from "../../../redux/actions/liveEdit/_updateUrl";
import { ApiReference } from "../../../Api";
import { ApiRegister } from "../../../services/apiRegister/ApiRegister";

const _asist = new Assistent();
function SaveLanding({ setOpenSaveLanding }) {
  let apiCreateLanding = ApiReference.landing.creat.url;
  let ansapi = { id: 2, name: "milad", shop: "mamaneila", page_data: "" };
  const [idLanding, setIdLanding] = useState("4");
  const dispatch = useDispatch();

  const _handel_creat_landing = async () => {
    let params = {
      name: "milad",
      page_data: "",
      shop: "mamaneila",
    };
    let response = await ApiRegister().apiRequest(
      params,
      "post",
      apiCreateLanding,
      true,
      ""
    );

    console.log(`response`, response);
  };

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.content_wrapper}>
          <span className={styles.close}>
            <i
              className="far fa-times-circle"
              onClick={() => {
                setOpenSaveLanding(false);
              }}
            ></i>
          </span>

          <div className={styles.table}>
            <div className={styles.header}>ذخیره صفحه</div>
            <button onClick={_handel_creat_landing}>ایجاد</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SaveLanding;
