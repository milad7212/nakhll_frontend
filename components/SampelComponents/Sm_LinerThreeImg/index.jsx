import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Sm_LinerThreeImg.module.scss";
import InputPicture from "../../../containers/liveEdit/InputPicture";
import InputUrl from "../../../containers/liveEdit/InputUrl";

// type====================4
// aspect ratio======6/1  && 3/1
function Sm_LinerThreeImg({ setImageSrc, id, data }) {
  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.icon_change_pic}>
          <InputPicture setImageSrc={setImageSrc} id={id} order={0} ratio={6} />
        </div>
        <div className={styles.icon_change_url}>
          <InputUrl id={id} order={0} />
        </div>
        {data[0].title && (
          <div className={styles.titleUrl}>
            <span>{data[0].title}</span>
          </div>
        )}
        <Image
          layout="responsive"
          height={100}
          width={600}
          src={data[0].image ? data[0].image : "/image/sample/6_1.jpg"}
          alt=""
        />
      </div>
      <div className={styles.wrap}>
        <div className={styles.right}>
          <div className={styles.icon_change_pic}>
            <InputPicture
              setImageSrc={setImageSrc}
              id={id}
              order={1}
              ratio={3}
            />
          </div>
          <div className={styles.icon_change_url}>
            <InputUrl id={id} order={1} />
          </div>
          {data[1].title && (
            <div className={styles.titleUrl}>
              <span>{data[1].title}</span>
            </div>
          )}
          <Image
            layout="responsive"
            height={100}
            width={300}
            src={data[1].image ? data[1].image : "/image/sample/3_1.jpg"}
            alt=""
          />
        </div>
        <div className={styles.left}>
          <div className={styles.icon_change_pic}>
            <InputPicture
              setImageSrc={setImageSrc}
              id={id}
              order={2}
              ratio={3}
            />
          </div>
          <div className={styles.icon_change_url}>
            <InputUrl id={id} order={2} />
          </div>
          {data[2].title && (
            <div className={styles.titleUrl}>
              <span>{data[2].title}</span>
            </div>
          )}
          <Image
            layout="responsive"
            height={100}
            width={300}
            src={data[2].image ? data[2].image : "/image/sample/3_1.jpg"}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Sm_LinerThreeImg;
