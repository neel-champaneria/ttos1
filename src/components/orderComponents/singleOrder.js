import { Money } from "../../utils/money";
import SingleOrderItem from "./singleOrderItem";

const SingleOrder = ({ order }) => {
  return (
    <>
      {order.orderItems.map((item) => {
        return <SingleOrderItem item={item} />;
      })}
      <div className="bottom_block mb60">
        <div className="bg-white p_reorder_bottom">
          <div className="d-flex mb4">
            <p className="medium_para mr-auto mb0">Sub Total:</p>
            <p className="medium_para mb0">
              {Money.moneyFormat(order.subTotal)}
            </p>
          </div>
          <div className="d-flex mb10">
            <p className="medium_para mr-auto mb0">Tax:</p>
            <p className="medium_para mb0">
              {Money.moneyFormat(order.totalTax)}
            </p>
          </div>
          <div className="d-flex">
            <p className="medium_font font-bold mr-auto mb0">Total:</p>
            <p className="medium_font font-bold mb0">
              {Money.moneyFormat(order.total)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleOrder;
