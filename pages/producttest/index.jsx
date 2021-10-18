import React, { useState } from "react";
import { useRouter } from "next/router";

import ListWitOutFilters from "../../containers/listProduct/ListWithOutFilters";
import ListProductCus from "../../containers/listProduct/listProductCus";

function product({ word, category, ap, data }) {
  const router = useRouter();

  const [cat, setCat] = useState(category);
  return (
    <>
      {ap !== "" && (
        <>
          <ListWitOutFilters api={ap} />
        </>
      )}

      {ap === "" && (
        <ListProductCus
          data={data}
          searchWord={word}
          categoryIn={router.query.cat}
        />
      )}
    </>
  );
}

export default product;

// function server side
export async function getServerSideProps(context) {
  console.log("context.query :>> ", context.query);
  return {
    props: {
      data: context.query,
      id: context.query.id || "",
      category: context.query.cat || "",
      word: context.query.word || "",
      ap: context.query.ap || "",
    },
  };
}
