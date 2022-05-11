import SingleOrderItem from "../src/components/orderComponents/singleOrderItem";
import { Money } from "./../src/utils/money";
import SingleOrder from "./../src/components/orderComponents/singleOrder";

const OrderPage = () => {
  /* const orderItems = [
    {
      additionalNote: "",
      catName: "A. Signatures",
      image: null,
      itemId: 361,
      modifierPriceSum: 0,
      modifiers: [
        {
          deliveryPrice: 0,
          disableItemList: null,
          enable: true,
          modifierId: 421,
          name: "No Veg 不要菜",
          posId: 102,
          price: 0,
          seq: 0,
          takeOutPrice: 0,
          type: 1,
        },
        {
          deliveryPrice: 0,
          disableItemList: null,
          enable: true,
          modifierId: 426,
          name: "Non Spicy 不要辣",
          posId: 99,
          price: 0,
          seq: 1,
          takeOutPrice: 0,
          type: 1,
        },
      ],
      name: "A2 Tomyum Mama Lobster Pot",
      price: 108,
      priceSum: 108,
      qty: 1,
      sequence: 1,
      tax1Id: null,
      tax2Id: null,
      tax3Id: null,
    },
  ]; */

  const orders = [
    {
      customerEmail: "asd@asd.com",
      customerName: "asd asd",
      customerPhone: "62241284",
      customerPassword: "asd@asd.com",
      deliveryPostalCode: "101010",
      deliveryAddress1: "address 2",
      deliveryAddress2: "address 1",
      discount: 0,
      orderItems: [
        {
          additionalNote: "",
          catName: "A. Signatures",
          image: null,
          itemId: 361,
          modifierPriceSum: 6,
          modifiers: [
            {
              deliveryPrice: 0,
              disableItemList: null,
              enable: true,
              modifierId: 623,
              name: "More Spicy 加辣",
              posId: 98,
              price: 0,
              seq: 0,
              takeOutPrice: 0,
              type: 1,
            },
            {
              deliveryPrice: 0,
              disableItemList: null,
              enable: true,
              modifierId: 626,
              name: "Less Salt 少盐",
              posId: 101,
              price: 0,
              seq: 1,
              takeOutPrice: 0,
              type: 1,
            },
            {
              deliveryPrice: 0,
              disableItemList: null,
              enable: true,
              modifierId: 666,
              name: "Add Mama Noodle",
              posId: 157,
              price: 3,
              seq: 2,
              takeOutPrice: 0,
              type: 1,
            },
            {
              deliveryPrice: 0,
              disableItemList: null,
              enable: true,
              modifierId: 667,
              name: "Add Tomyam Soup",
              posId: 158,
              price: 3,
              seq: 3,
              takeOutPrice: 0,
              type: 1,
            },
          ],
          name: "A2 Tomyum Mama Lobster Pot",
          price: 108,
          priceSum: 114,
          qty: 1,
          sequence: 1,
          tax1Id: null,
          tax2Id: null,
          tax3Id: null,
        },
        {
          additionalNote: "",
          catName: "A. Signatures",
          image: null,
          itemId: 368,
          modifierPriceSum: 27,
          modifiers: [
            {
              deliveryPrice: 0,
              disableItemList: null,
              enable: true,
              modifierId: 546,
              name: "300g",
              posId: 169,
              price: 27,
              seq: 0,
              takeOutPrice: 0,
              type: 1,
            },
          ],
          name: "A1 XO Crab Pot ",
          price: 30,
          priceSum: 57,
          qty: 1,
          sequence: 1,
          tax1Id: null,
          tax2Id: null,
          tax3Id: null,
        },
      ],
      paymentMethod: "COD",
      subTotal: 171,
      tableNr: "1",
      qrId: "8b88a101-8802-4349-b822-18ef4c972348",
      total: "171.00",
      totalTax: 0,
    },
    {
      customerEmail: "asd@asd.com",
      customerName: "asd asd",
      customerPhone: "62241284",
      customerPassword: "asd@asd.com",
      deliveryPostalCode: "101010",
      deliveryAddress1: "address 2",
      deliveryAddress2: "address 1",
      discount: 0,
      orderItems: [
        {
          additionalNote: "",
          catName: "A. Signatures",
          image: null,
          itemId: 368,
          modifierPriceSum: 27,
          modifiers: [
            {
              deliveryPrice: 0,
              disableItemList: null,
              enable: true,
              modifierId: 546,
              name: "300g",
              posId: 169,
              price: 27,
              seq: 0,
              takeOutPrice: 0,
              type: 1,
            },
          ],
          name: "A1 XO Crab Pot ",
          price: 30,
          priceSum: 57,
          qty: 1,
          sequence: 1,
          tax1Id: null,
          tax2Id: null,
          tax3Id: null,
        },
      ],
      paymentMethod: "COD",
      subTotal: 57,
      tableNr: "1",
      qrId: "8b88a101-8802-4349-b822-18ef4c972348",
      total: "57.00",
      totalTax: 0,
    },
    {
      customerEmail: "asd@asd.com",
      customerName: "asd asd",
      customerPassword: "asd@asd.com",
      customerPhone: "62241284",
      deliveryAddress1: "address 2",
      deliveryAddress2: "address 1",
      deliveryPostalCode: "101010",
      discount: 0,
      orderItems: [
        {
          additionalNote: "",
          catName: "A. Signatures",
          image: null,
          itemId: 381,
          modifierPriceSum: 27,
          modifiers: [
            {
              deliveryPrice: 0,
              disableItemList: null,
              enable: true,
              modifierId: 546,
              name: "300g",
              posId: 169,
              price: 27,
              seq: 0,
              takeOutPrice: 0,
              type: 1,
            },
          ],
          name: "A3 Yellow Curry Crab",
          price: 0,
          priceSum: 27,
          qty: 1,
          sequence: 1,
          tax1Id: null,
          tax2Id: null,
          tax3Id: null,
        },
      ],
      paymentMethod: "COD",
      qrId: "2121",
      subTotal: 27,
      tableNr: "21",
      total: "27.00",
      totalTax: 0,
    },
  ];

  return (
    <>
      <div className="order_quantity">
        <div className="container p0">
          <div className="d-flex p-cart mt10 mb20">
            <h1 className="cart_title mr-auto">My Orders</h1>
          </div>
        </div>
        <div className="order_quantity">
          {orders.length > 0 &&
            orders.map((order, idx) => {
              return <SingleOrder key={idx} order={order} />;
            })}
        </div>
      </div>
    </>
  );
};

export default OrderPage;
