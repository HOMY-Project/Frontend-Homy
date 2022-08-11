import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import { Card, message } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSubTotal } from "../../Redux/features/singleOrderSlice";

const OrderProduct = ({ product }) => {
    const { Meta } = Card;
    const [prod, setProduct ] = useState([])
    const [orderSubTotal , setProSubTotal] = useState(0);
    const dispatch = useDispatch();
    console.log(orderSubTotal, 'order sub total')

    useEffect(() => {
        const source = axios.CancelToken.source(); 
        const getProduct = async () => {
          try {
            const {
              data: { data },
            } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/${product[0]}`, {
              cancelToken: source.token,
            });
            setProduct(data);
            setProSubTotal( (prev) => prev + (data[0].price * product[1]));
            // console.log(orderSubTotal, 'order sub total')
            dispatch(setSubTotal(orderSubTotal));
          } catch ({
            response: {
              data: { message: msg },
            },
          }) {
            message.warning(msg);
          }
        };
        getProduct();
        return () => {
          source.cancel();
        };
      }, []);
  return (
      <Col lg="5" md="6" sm="12" style={{ marginBottom: "2%" }}>
        <Card bordered={false} cover={<img alt="example" src={prod[0]?.image} />}>
          <Meta
            title={prod[0]?.name}
            description={prod[0]?.brand}
            style={{ marginBottom: "2%" , fontWeight: "bold"}}
          />
          <div className="price-holder">
            <p className="price" style={{ fontWeight: "bold" }}>{prod[0]?.price} KWD</p>
            <p className="Qun">Qty: {product[1]}</p>
          </div>
        </Card>
      </Col>
  );
};

export default OrderProduct;
