import React from "react";
import InputPicture from "../../../containers/liveEdit/InputPicture";
import InputUrl from "../../../containers/liveEdit/InputUrl";

import styles from "./Sm_LinerTwoImg.module.scss";

function Sm_LinerTwoImg({ setImageSrc, id, data }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.right}>
        <div className={styles.icon_change_pic}>
          <InputPicture setImageSrc={setImageSrc} id={id} order={0} />
        </div>
        <div className={styles.icon_change_url}>
          <InputUrl id={id} order={0} />
        </div>
        <a href="">
          <img
            src={data[0].image ? data[0].image : "/image/sample/main.jpg"}
            alt=""
          />
        </a>
      </div>
      <div className={styles.left}>
        <div className={styles.icon_change_pic}>
          <InputPicture setImageSrc={setImageSrc} id={id} order={1} />
        </div>
        <div className={styles.icon_change_url}>
          <InputUrl id={id} order={1} />
        </div>
        <a href="">
          <img
            src={data[1].image ? data[1].image : "/image/sample/main.jpg"}
            alt=""
          />
        </a>
      </div>
    </div>
  );
}

export default Sm_LinerTwoImg;
