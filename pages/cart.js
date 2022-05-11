import { useDispatch, useSelector } from "react-redux";
import { RE_CALCULATE_ORDER_PRICE } from "./../src/constants/index";
import {
  decreaseQuantityFromCartAction,
  increaseQuantityFromCartAction,
  removeItemFromCartAction,
} from "../src/actions/OrderingCartAction";
import { useEffect, useState } from "react";
import SingleItemCart from "../src/components/cartComponent/singleCartItem";
import { useRouter } from "next/router";
import { Money } from "../src/utils/money";
import { ToastContainer, Toast, Spinner } from "react-bootstrap";
import Link from "next/link";
import { checkOutTTOSAction } from "./../src/actions/OrderingCartAction";

const CartPage = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const qrInfo = useSelector((state) => state.QrReducer);

  const orderingCart = useSelector((state) => state.orderingCartReducer);
  const promotions = useSelector((state) => state.appReducer?.promotions);
  const storeConfig = useSelector((state) => state.appReducer?.storeConfig);
  const taxConfig = useSelector((state) => state.appReducer?.taxConfig);
  const paymentConfig = useSelector((state) => state.appReducer?.paymentMethod);
  const user = useSelector((store) => store.userReducer);

  const [showErrorToast, setShowErrorToast] = useState(false);
  const [showTableQrErrorToast, setShowTableQrErrorToast] = useState(false);
  const [qtyInCart, setQtyInCart] = useState(0);

  const [gotoUserInfoPage, setGotoUserInfoPage] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch({ type: RE_CALCULATE_ORDER_PRICE });
  }, [promotions, storeConfig, taxConfig, paymentConfig]);

  useEffect(() => {
    if (orderingCart) {
      if (
        orderingCart.customerName &&
        orderingCart.customerPhone &&
        orderingCart.customerEmail
      ) {
        setGotoUserInfoPage(false);
      } else {
        setGotoUserInfoPage(true);
      }
    }
  }, [orderingCart]);

  const onPlaceOrder = async () => {
    if (!qrInfo.tableId || !qrInfo.qrId) {
      setShowTableQrErrorToast(true);
      return;
    }
    setLoading(true);
    const {
      customerName,
      customerPhone,
      customerEmail,
      orderItems,
      subTotal,
      discount,
      total,
      totalTax,
    } = orderingCart;
    const data = {
      customerName,
      customerPhone,
      customerEmail,
      customerPassword: customerEmail,
      deliveryPostalCode: "101010",
      deliveryAddress1: "address 2",
      deliveryAddress2: "address 1",
      orderItems,
      subTotal,
      discount,
      total,
      totalTax,
      tableNr: qrInfo.tableId,
      qrId: qrInfo.qrId,
      paymentMethod: "COD",
    };
    const response = await dispatch(checkOutTTOSAction(data));
    if (response.status) {
      router.replace("/orderPlacedSuccessfully");
      setLoading(false);
    } else {
      setLoading(false);
      setShowErrorToast(true);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      if (router.query?.failed === "true") {
        setShowErrorToast(true);
      }
      if (router.query?.TableQRfailed === "true") {
        setShowTableQrErrorToast(true);
      }
    }
    calculateQty();
  }, [router, orderingCart]);

  const calculateQty = () => {
    if (orderingCart.orderItems.length > 0) {
      let tempQty = 0;
      const { orderItems } = orderingCart;
      for (let i = 0; i < orderItems.length; i++) {
        tempQty += orderItems[i].qty;
      }
      setQtyInCart(tempQty);
    } else {
      setQtyInCart(0);
    }
  };

  return (
    <>
      {loading ? (
        <>
          <div className="container d-flex justify-content-center align-items-center vh-100">
            <Spinner animation="border" variant="secondary" />
          </div>
        </>
      ) : (
        <></>
      )}
      {/* Table Number */}
      <div className="mb-2">
        <div className="text-center text-white table_strip">
          TABLE {qrInfo.tableId}
        </div>
      </div>
      <div className="container p0">
        <div className="d-flex p-cart mt10 mb20">
          <h1 className="cart_title mr-auto">Your Cart ({qtyInCart})</h1>
          <img src="/bag.svg" alt="cart" />
        </div>
      </div>

      <div className="container">
        {orderingCart.orderItems.length > 0 ? (
          <>
            <div className="cart_quantity">
              {orderingCart.orderItems.map((item, itemIndex) => {
                return <SingleItemCart key={itemIndex} item={item} />;
              })}
            </div>

            <div className="bottom_block mt80 mb60">
              <div className="bg-white p_bottom">
                <div className="d-flex mb4">
                  <p className="medium_para mr-auto mb0">Sub Total:</p>
                  <p className="medium_para mb0">
                    {Money.moneyFormat(orderingCart.subTotal)}
                  </p>
                </div>
                <>
                  {orderingCart?.taxObj?.map((tax, idx) => {
                    return (
                      <div className="d-flex mb4">
                        <p className="medium_para mr-auto mb0">{tax.taxName}</p>
                        <p className="medium_para mb0">
                          {Money.moneyFormat(tax.totalTax)}
                        </p>
                      </div>
                    );
                  })}
                </>
                <div className="d-flex">
                  <p className="medium_font font-bold mr-auto mb0">Total:</p>
                  <p className="medium_font font-bold mb0">
                    {Money.moneyFormat(orderingCart.total)}
                  </p>
                </div>
                {/* <Link href="/userInfoForOrder"> */}
                <button
                  className="btn red-btn w100 mt15 medium_sizebtn"
                  onClick={() => {
                    onPlaceOrder();
                  }}
                >
                  CONFIRM ORDER
                </button>
                {/* </Link> */}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="empty_cart thankyou_cart text-center h-80 mt95">
              <div className="top_thank">
                <img src="/bigcart.svg" className="mb40" />
                <p className="big_font red_font font-bold mb10">
                  Your cart is empty
                </p>
                <h4 className="grey_text">
                  Looks like you haven&lsquo;t made your choice yet
                </h4>
              </div>
              <Link href="/">
                <button className="btn red-btn big_btn bottom_btn">
                  ORDER FOOD
                </button>
              </Link>
            </div>
          </>
        )}
      </div>

      {showTableQrErrorToast && (
        <ToastContainer position="top-center" className="mt-5">
          <Toast onClose={() => setShowTableQrErrorToast(false)}>
            <Toast.Header>
              <strong className="me-auto">Error</strong>
            </Toast.Header>
            <Toast.Body>
              QR ID or Table ID Not Found.
              <br />
              Please Scan the QR and Order food.
            </Toast.Body>
          </Toast>
        </ToastContainer>
      )}

      {showErrorToast && (
        <ToastContainer position="top-center" className="mt-5">
          <Toast onClose={() => setShowErrorToast(false)}>
            <Toast.Header>
              <strong className="me-auto">Error</strong>
            </Toast.Header>
            <Toast.Body>Something Went Wrong</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </>
  );
};

export default CartPage;
