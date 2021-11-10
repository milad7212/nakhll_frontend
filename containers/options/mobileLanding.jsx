// node libraries
import Link from 'next/link';
import Assistent from "zaravand-assistent-number";
// components
import MobileHeader from '../../components/mobileHeader';
import CustomLabel from '../../components/custom/customLabel';
import CustomSwitch from '../../components/custom/customSwitch';
// scss
import styles from './scss/mobileLanding.module.scss';

const _asist = new Assistent();

const MobileLanding = ({ landingList, id }) => {

    return (
        <div>
            <MobileHeader type="search" title="فرودها" />
            <div className={styles.wrapper_cart}>
                <div className={styles.wrapper_links}>
                    <Link href="/liveEdit">
                        <a className={styles.link_add}>
                            {/* <i className="fa fa-plus ms-2"></i> */}
                            افزودن فرود
                        </a>
                    </Link>
                    <Link href={`/fp/options/landing/orders?id=${id}`}>
                        <a className={styles.link_add}>
                            {/* <i className="fa fa-plus ms-2"></i> */}
                            سفارشات
                        </a>
                    </Link>
                </div>
                {landingList.length > 0 && landingList.map((value, index) => {
                    return (
                        <div className={styles.cart_item} key={index}>
                            <div className="d-flex justify-content-between align-items-center">
                                <CustomLabel type="normal" value={_asist.number(index + 1)} label="شماره" />
                                <CustomSwitch defaultChecked={value.status === "active" ? true : false} id="active" />
                            </div>
                            <CustomLabel type="normal" value={value.name} label="نام" />
                            <CustomLabel type="normal" value={_asist.number(value.created_at)} label="تاریخ ثبت" />
                            <div className="d-flex justify-content-end align-items-center">
                                <i className="fas fa-eye mx-3"></i>
                                <i className="far fa-trash-alt"></i>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
// export
export default MobileLanding;