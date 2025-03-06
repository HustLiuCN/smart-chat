import type React from "react";
import "./style.less";
import { MenuOutlined, FormOutlined } from "@ant-design/icons";

interface IProps {
  onDrawerOpen: () => void;
  onEdit: () => void;
}

export const Header: React.FC<IProps> = ({ onDrawerOpen, onEdit }) => {
  return (
    <div className="header">
      <div className="header-menu">
        <MenuOutlined onClick={onDrawerOpen} />
      </div>
      <div className="header-title">个人助手</div>
      <div className="header-edit">
        <FormOutlined onClick={onEdit} />
      </div>
    </div>
  );
};
