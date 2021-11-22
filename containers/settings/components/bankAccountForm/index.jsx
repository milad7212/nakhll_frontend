import { Form, Formik } from "formik";
import { useState } from "react";
import { callBankAccount } from "../../../../api/settings";
import { VALIDATION_HESAB } from "../../methods/Validation";
import FieldCus from "../field";
import SubButton from "../subButton";
import styles from "./bankAccountForm.module.scss";

function BankAccountForm({ apiSetting, activeHojreh }) {
  const [IsLoadingHesab, setIsLoadingHesab] = useState(false);
  const [showMessageHesab, setShowMessageHesab] = useState(0);
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          iban: apiSetting.bank_account && apiSetting.bank_account.iban,
          owner: apiSetting.bank_account && apiSetting.bank_account.owner,
        }}
        validationSchema={VALIDATION_HESAB}
        onSubmit={async (data) => {
          // setIsLoadingHesab(true);
          setShowMessageHesab(0);

          const dataForSend = {
            bank_account: {
              iban: data.iban,
              owner: data.owner,
            },
          };

          const response = await callBankAccount(dataForSend, activeHojreh);

          if (response.status == 200) {
            setIsLoadingHesab(false);
            setShowMessageHesab(1);

            setClicked((pre) => !pre);
          } else {
            setIsLoadingHesab(false);
            setShowMessageHesab(2);
          }
        }}
      >
        {(props) => (
          <Form>
            <FieldCus name="iban" type="text" text="IR-" title="شماره شبا" />
            <FieldCus name="owner" type="text" title="صاحب حساب" />
            {/* ‌Buttons */}
            {IsLoadingHesab && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className={styles.loader}>
                  <Image
                    src="/image/LOGO_500.png"
                    alt="Picture of the author"
                    width={50}
                    height={50}
                  />
                </div>
                <h3
                  className={styles.nameLoding}
                  style={{
                    fontSize: "15px",
                    color: "hsl(211deg 100% 50%)",
                  }}
                >
                  {" "}
                  در حال بروزرسانی ...
                </h3>
              </div>
            )}
            {showMessageHesab == 1 && (
              <div>
                <h3 style={{ color: "green", marginTop: "15px" }}>
                  به روز رسانی با موفقیت انجام شد.
                </h3>
              </div>
            )}
            {showMessageHesab == 2 && (
              <div>
                <h3 style={{ color: "red", marginTop: "15px" }}>
                  عملیات به روز رسانی موفقیت آمیز نبود.لطفا باری دیگر اقدام
                  کنید.
                </h3>
              </div>
            )}
            <SubButton title="به روز رسانی" />
          </Form>
        )}
      </Formik>
    </>
  );
}

export default BankAccountForm;
