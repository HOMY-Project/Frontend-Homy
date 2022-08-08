import React, { useState, useEffect } from "react";
import axios from "axios";
import { Menu } from "antd";
import './index.css';

const Subnav = () => {
  const [category, setCategories] = useState([]);
  const [subcategory, setSubcategories] = useState([]);

  const handelSubCategory = async (id) => {
    try {
      const {
        data: { data },
      } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/subCategories/${id}`
      );
      setSubcategories(data);
    } catch ({
      response: {
        data: { message: msg },
      },
    }) {}
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getCategories = async () => {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/v1/categories`;
      try {
        const {
          data: { data },
        } = await axios.get(url, { cancelToken: source.token });
        setCategories(data);
      } catch ({
        response: {
          data: { message: msg },
        },
      }) {}
    };
    getCategories();
    return () => {
      source.cancel();
    };
  }, []);

  return (
    <div className="subNav">
      <Menu theme="dark" mode="horizontal">
        {category.map((item, index) => {
          return (
            <Menu.SubMenu
                  key={"SubMenu" + index}
                  theme="light"
                  title={item.name}
                  onMouseOver={() => handelSubCategory(item.id)}
              >
                  {subcategory.length > 0 && subcategory.map((subitem, index) => {
                      return (
                          <Menu.Item key={index}>{subitem.name}</Menu.Item>
                      );
                  })}
              </Menu.SubMenu>
          );
        })}
      </Menu>
    </div>
  );
};

export default Subnav;
