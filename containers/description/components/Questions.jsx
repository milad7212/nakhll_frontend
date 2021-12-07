import styles from "./Questions.module.scss";

function Questions() {
  return (
    <>
      {/* pattern_question */}
      <div className={styles.pattern_question}>
        <h1 className={styles.header_qu}>سوالات متداول</h1>
        <div className={styles.parent_all_qu}>
          {/* <!-- Card 1 --> */}
          <div className={styles.parent_card}>
            {/* <!-- Dot Follwing the Left Vertical Line --> */}
            <div
              style={{ backgroundColor: "rgba(37, 99, 235, 1)" }}
              className={styles.left_circle}
            ></div>

            {/* <!-- Line that connecting the box with the vertical line --> */}
            <div
              style={{ backgroundColor: "rgba(37, 99, 235, 1)" }}
              className={styles.left_line}
            ></div>

            {/* <!-- Content that showing in the box --> */}
            <div className={styles.box_q}>
              <h1 className={styles.headear_box_qu}>
                چه کسی می‌تواند در نخل حجره‌دار شود؟
              </h1>
              <h3 className={styles.content_box_qu}>
                صاحبان کسب‌و‌کارهای در حال رشد در سراسر ایران می‌توانند بدون
                پرداخت هزینه، در بازار آنلاین نخل حجره ایجاد کنند و کسب‌و‌کار
                خود را توسعه دهند.
              </h3>
            </div>
          </div>

          {/* <!-- Card 2 --> */}
          <div
            style={{ backgroundColor: "rgba(219, 39, 119, 1)" }}
            className={styles.parent_card}
          >
            {/* <!-- Dot Follwing the Left Vertical Line --> */}
            <div
              style={{ backgroundColor: "rgba(219, 39, 119, 1)" }}
              className={styles.left_circle}
            ></div>

            {/* <!-- Line that connecting the box with the vertical line --> */}
            <div
              style={{ backgroundColor: "rgba(219, 39, 119, 1)" }}
              className={styles.left_line}
            ></div>

            {/* <!-- Content that showing in the box --> */}
            <div className={styles.box_q}>
              <h1 className={styles.headear_box_qu}>
                کارمزد نخل چند درصد است؟
              </h1>
              <h3 className={styles.content_box_qu}>
                کارمزد نخل از هر تراکنش ۳ الی ۷ درصد است
              </h3>
            </div>
          </div>

          {/* <!-- Card 3 --> */}
          <div
            style={{
              backgroundColor: "  rgba(5, 150, 105, 1)",
            }}
            className={styles.parent_card}
          >
            {/* <!-- Dot Follwing the Left Vertical Line --> */}
            <div
              style={{ backgroundColor: "rgba(5, 150, 105, 1)" }}
              className={styles.left_circle}
            ></div>

            {/* <!-- Line that connecting the box with the vertical line --> */}
            <div
              style={{ backgroundColor: "rgba(5, 150, 105, 1)" }}
              className={styles.left_line}
            ></div>

            {/* <!-- Content that showing in the box --> */}
            <div className={styles.box_q}>
              <h1 className={styles.headear_box_qu}>
                تسویه حساب نخل با حجره‌داران چگونه است؟
              </h1>
              <h3 className={styles.content_box_qu}>
                ‌پس از خرید از نخل و واریز پول توسط مشتری، سامانه شاپرک بعد از
                ۲۴ ساعت پول واریزی مشتری را به حساب نخل واریز می‌کند و مراحل
                پشتیبانی نخل شامل موارد ذیل است: ۱. پیگیری ارسال کالا توسط
                فروشنده ۲. پیگیری تحویل کالا و میزان رضایت خریدار ۳. واریز مبلغ
                دریافتی با کسر کارمزد نخل به حساب فروشنده نکته: در صورتی که
                حجره‌دار قرارداد تعهد ارسال را به امضا برساند، دریافت وجوه
                واریزی مشتری کمتر از ۷۲ ساعت به طول خواهد انجامید. نکته: اگر
                دسترسی به خریدار مقدور نباشد، طبق قانون تجارت الکترونیک، وجه
                واریزی بعد از گذشت ۷ روز به حساب فروشنده واریز خواهد شد.
              </h3>
            </div>
          </div>

          {/* <!-- Card 4 --> */}
          <div
            style={{
              backgroundColor: " rgba(124, 58, 237, 1)",
            }}
            className={styles.parent_card}
          >
            {/* <!-- Dot Follwing the Left Vertical Line --> */}
            <div
              style={{ backgroundColor: " rgba(124, 58, 237, 1)" }}
              className={styles.left_circle}
            ></div>

            {/* <!-- Line that connecting the box with the vertical line --> */}
            <div
              style={{ backgroundColor: "rgba(124, 58, 237, 1)" }}
              className={styles.left_line}
            ></div>

            {/* <!-- Content that showing in the box --> */}
            <div className={styles.box_q}>
              <h1 className={styles.headear_box_qu}>
                ارسال سفارش به چه طریقی انجام می‌شود؟
              </h1>
              <h3 className={styles.content_box_qu}>
                پس از اتمام فرآیند خرید مشتری، حجره‌دار سفارش را بسته‌بندی و از
                طریق پست ارسال می‌کند. تمامی مراحل ارسال توسط پنل مدیریت
                حجره‌دار اطلاع‌رسانی می‌گردد که توسط مشتری قابل مشاهده است.
                ضمناً هزینه ارسال نیز در هنگام تسویه حساب به حجره‌دار واریز
                می‌گردد.
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Questions;
