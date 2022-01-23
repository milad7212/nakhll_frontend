import { useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import InputUseForm from "../../../../../creat/component/inputUseForm";
import BtnSetting from "../../components/btnSetting";
import st from "./selectIcon.module.scss";

const ICONS = [
  { src: "/icons/settings/pishtaz.svg", id: 1 },
  { src: "/icons/settings/sefareshi.svg", id: 2 },
  { src: "/icons/settings/peik.svg", id: 3 },
  { src: "/icons/settings/pasKeraieh.svg", id: 4 },
  { src: "/icons/settings/free.svg", id: 5 },
  // { src: "/icons/settings/plus.svg", id: 6 },
];

function SelectIcon({ pageController, _handle_send_info_scope }) {
  const [idselectedIcon, setIdselectedIcon] = useState(1);
  const {
    setValue,
    getValues,
    clearErrors,
    register,
    setError,

    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
    mode: "all",
  });
  return (
    <>
      {/* name: data.name ? data.name : "بدون نام" */}
      <form
        onSubmit={handleSubmit((data) =>
          _handle_send_info_scope({
            name: data.name ? data.name : "بدون نام",
            logo_type: idselectedIcon,
          })
        )}
      >
        <InputUseForm title="عنوان روش ارسال" error={errors.name}>
          <input {...register("name")} />
        </InputUseForm>

        <div className={st.header}>
          <span>لوگو روش ارسال</span>
        </div>
        {/* icones */}
        <div className={st.warpperIcons}>
          {ICONS.map((icon, index) => (
            <div
              key={index}
              className={st.wrappIcon}
              style={{
                backgroundColor:
                  icon.id == idselectedIcon
                    ? "#D09600"
                    : "rgba(34, 78, 130, 0.1)",
              }}
              onClick={() => setIdselectedIcon(icon.id)}
            >
              <Image
                src={icon.src}
                layout="fixed"
                height={50}
                width={50}
                alt="banner"
              />
            </div>
          ))}
        </div>
        <BtnSetting type="submit" title="ثبت" />
      </form>
    </>
  );
}

export default SelectIcon;