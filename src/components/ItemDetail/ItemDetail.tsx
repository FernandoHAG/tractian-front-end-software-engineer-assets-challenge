import { useTranslation } from "react-i18next";
import "./ItemDetail.css";
import { dataType } from "../../redux/dataSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { assetType } from "../../services/companies.service";
import wifiIcon from "../../assets/wifi_tethering.svg";
import router from "../../assets/router.svg";
import addItem from "../../assets/add_item.svg";

type propsType = {};

const ItemDetail = ({}: propsType) => {
  const { t } = useTranslation();
  const selectedComponentId = useSelector(
    (state: { data: dataType }) => state.data.selectedComponentId
  );
  const assets = useSelector((state: { data: dataType }) => state.data.assets);
  const [selectedAsset, setSelectedAsset] = useState<assetType>();

  useEffect(() => {
    if (selectedComponentId) {
      const asset = assets.find((asset) => {
        return asset.id === selectedComponentId;
      });
      setSelectedAsset(asset);
    }
  }, [selectedComponentId]);

  return (
    <div className="ItemDetail">
      {selectedAsset ? (
        <>
          <p className="title">{selectedAsset.name}</p>
          <div className="content">
            {selectedAsset.imageUrl ? (
              <img
                className="image"
                src={selectedAsset.imageUrl}
                alt="product image"
              />
            ) : (
              <div className="image no-image">
                <img src={addItem} alt="add image icon" />
                <p>{t("add-image")}</p>
              </div>
            )}
            <div className="info">
              <div>
                <h2>{t("equipment-type")}</h2>
                <h3>{selectedAsset.sensorType}</h3>
              </div>
              <div>
                <h2>{t("responsible")}</h2>
                <h3>Pessoa 1</h3>
              </div>
            </div>
          </div>
          <div className="extra-info">
            <div>
              <h2>{t("sensor")}</h2>
              <h3>
                <img src={wifiIcon} alt="wifi icon" />
                {selectedAsset.sensorId}
              </h3>
            </div>
            <div>
              <h2>{t("receptor")}</h2>
              <h3>
                <img src={router} alt="wifi icon" />
                {selectedAsset.gatewayId}
              </h3>
            </div>
          </div>
        </>
      ) : (
        <div className="no-company-selected"></div>
      )}
    </div>
  );
};

export default ItemDetail;
