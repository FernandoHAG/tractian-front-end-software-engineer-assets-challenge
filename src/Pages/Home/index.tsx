import { useEffect, useState } from "react";
import "./index.css";
import { useTranslation } from "react-i18next";
import TestComponent from "../../components/TestComponent/TestComponent";
import { changeIdiom } from "../../redux/configSlice";
import { useDispatch } from "react-redux";

export default function Home() {
  const { t } = useTranslation();
  const [count, setCount] = useState(0);
  const [idiom, setIdiom] = useState("us");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeIdiom(idiom));
  }, [dispatch, idiom]);

  return (
    <>
      {/* <Head /> */}
      <TestComponent children={<p>{t("test")} component children</p>} />
      <div className="card">
        <button onClick={() => setIdiom(idiom === "us" ? "br" : "us")}>
          Idioma
        </button>
        <button onClick={() => setCount((current) => current + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}
