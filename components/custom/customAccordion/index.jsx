import React from "react";
import styles from "./customAccordion.module.scss";
export const CustomAccordion = ({ children, title, item }) => {
  return (
    <div
      className="accordion"
      style={{
        background: "#fff",
        padding: ".4rem !important",
        // paddingBottom: ".5rem !important",
        // paddingBottom: " 0 !important",
        borderRadius: "1.2rem",
        margin: "1rem 0",
      }}
    >
      <div className="accordion-item" style={{ border: "none" }}>
        <h2 className="accordion-header" id="panelsStayOpen-headingOne">
          <button
            style={{
              padding: "11px",
            }}
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#panelsStayOpen-${item}`}
            aria-expanded="true"
            aria-controls={`#panelsStayOpen-${item}`}
          >
            <span
              className={styles.iconAccordin}
              style={{ marginLeft: "auto" }}
            >
              {" "}
              {title}
            </span>
          </button>
        </h2>
        <div
          id={`panelsStayOpen-${item}`}
          className="accordion-collapse collapse show"
          aria-labelledby="panelsStayOpen-headingOne"
        >
          <div className="accordion-body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default CustomAccordion;
