import ItemDetail from "../ItemDetail/ItemDetail";
import ItemsList from "../ItemsList/ItemsList";
import "./Main.css";

type propsType = {};

const Main = ({}: propsType) => {
  return (
    <div className="Main">
      <ItemsList />
      <ItemDetail />
    </div>
  );
};

export default Main;
