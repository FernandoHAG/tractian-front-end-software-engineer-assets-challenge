import React, { useEffect, useState } from "react";
import "./ItemTree.css";
import CompaniesService, {
  AssetsResponse,
  LocationsResponse,
} from "../../services/companies.service";
import { useSelector } from "react-redux";
import { dataType } from "../../redux/dataSlice";
import { useTranslation } from "react-i18next";

type TreeNode = {
  id: string;
  name: string;
  type: "location" | "asset" | "component";
  children?: TreeNode[];
  parentId?: string | null;
  locationId?: string | null;
  status?: string | null;
  sensorType?: string | null;
  sensorId?: string | null;
};

const ItemTree: React.FC = () => {
  const { t } = useTranslation();
  const selectedCompanyId = useSelector(
    (state: { data: dataType }) => state.data.selectedCompanyId
  );
  const [treeData, setTreeData] = useState<TreeNode[]>([]);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (selectedCompanyId) {
      Promise.all([
        CompaniesService.getCompanyLocations(selectedCompanyId),
        CompaniesService.getCompanyAssets(selectedCompanyId),
      ])
        .then(([locations, assets]) => {
          setTreeData(buildTree(locations, assets));
        })
        .catch((error) => {
          console.error("Erro ao obter dados da empresa:", error);
        });
    }
  }, [selectedCompanyId]);

  const buildTree = (
    locations: LocationsResponse,
    assets: AssetsResponse
  ): TreeNode[] => {
    const itemsMap = new Map<string, TreeNode>();

    locations.forEach((location) => {
      const locationNode: TreeNode = {
        id: location.id,
        name: location.name,
        type: "location",
        parentId: location.parentId || null,
        children: [],
      };
      itemsMap.set(location.id, locationNode);
    });

    assets.forEach((asset) => {
      const nodeType = asset.sensorType ? "component" : "asset";
      const assetNode: TreeNode = {
        id: asset.id,
        name: asset.name,
        type: nodeType,
        parentId: asset.parentId || null,
        locationId: asset.locationId || null,
        status: asset.status || null,
        children: nodeType === "asset" ? [] : undefined,
        sensorType: asset.sensorType || null,
        sensorId: asset.sensorId || null,
      };
      itemsMap.set(asset.id, assetNode);
    });

    itemsMap.forEach((node) => {
      if (node.type === "location" && node.parentId) {
        const parentLocation = itemsMap.get(node.parentId);
        parentLocation?.children?.push(node);
      } else if (node.type === "asset") {
        if (node.locationId) {
          const parentLocation = itemsMap.get(node.locationId);
          parentLocation?.children?.push(node);
        } else if (node.parentId) {
          const parentAsset = itemsMap.get(node.parentId);
          parentAsset?.children?.push(node);
        }
      } else if (node.type === "component") {
        if (node.parentId) {
          const parentAsset = itemsMap.get(node.parentId);
          parentAsset?.children?.push(node);
        } else if (node.locationId) {
          const parentLocation = itemsMap.get(node.locationId);
          parentLocation?.children?.push(node);
        }
      }
    });

    const rootNodes: TreeNode[] = [];
    itemsMap.forEach((node) => {
      if (!node.parentId && !node.locationId) {
        rootNodes.push(node);
      }
    });

    return rootNodes;
  };

  const toggleNode = (id: string) => {
    setExpandedNodes((prev) => {
      const newExpandedNodes = new Set(prev);
      if (newExpandedNodes.has(id)) {
        newExpandedNodes.delete(id);
      } else {
        newExpandedNodes.add(id);
      }
      return newExpandedNodes;
    });
  };

  const getSelectionIcon = (type: "location" | "asset" | "component") => {
    switch (type) {
      case "location":
        return (
          <img
            className="icon"
            src={
              "https://raw.githubusercontent.com/tractian/challenges/refs/heads/main/assets/location.png"
            }
            alt="location icon"
          />
        );
      case "asset":
        return (
          <img
            className="icon"
            src={
              "https://raw.githubusercontent.com/tractian/challenges/refs/heads/main/assets/asset.png"
            }
            alt="asset icon"
          />
        );
      case "component":
        return (
          <img
            className="icon"
            src={
              "https://raw.githubusercontent.com/tractian/challenges/refs/heads/main/assets/component.png"
            }
            alt="component icon"
          />
        );
      default:
        return "";
    }
  };

  const onCLickItem = (node: TreeNode) => {
    if (node.type !== "component") {
      toggleNode(node.id);
    } else {
      // setSelectedComponentId(node.id);
      console.log("Selected component:", node);
    }
  };

  const renderTree = (nodes: TreeNode[]) => {
    return nodes.map((node) => (
      <div
        key={node.id + "-" + node.type + "-tree-node"}
        id={node.id + "-" + node.type + "-tree-node"}
        className={`tree-node ${node.type}`}
      >
        <div
          className="node-label"
          key={node.id + "-" + node.type + "-node-label"}
          id={node.id + "-" + node.type + "-node-label"}
          onClick={() => onCLickItem(node)}
        >
          {node.type !== "component" && (
            <button
              className="toggle-button"
              key={node.id + "-" + node.type + "-toggle-button"}
              id={node.id + "-" + node.type + "-toggle-button"}
            >
              {expandedNodes.has(node.id) ? "▲" : "▼"}
            </button>
          )}
          <p
            key={node.id + "-" + node.type + "-node-name"}
            id={node.id + "-" + node.type + "-node-name"}
          >
            {getSelectionIcon(node.type)} {node.name}
          </p>
        </div>
        {node.children &&
          node.children.length > 0 &&
          expandedNodes.has(node.id) && (
            <div
              className="tree-children"
              key={node.id + "-tree-children"}
              id={node.id + "-tree-children"}
            >
              {renderTree(node.children)}
            </div>
          )}
      </div>
    ));
  };

  return (
    <div className="ItemTree">
      <div>
        {selectedCompanyId ? (
          renderTree(treeData)
        ) : (
          <p className="no-company-selected">{t("no-company-selected")}</p>
        )}
      </div>
    </div>
  );
};

export default ItemTree;
