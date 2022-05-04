import { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { Money } from "../../utils/money";
import ReorderOffcanvas from "./reorderOffcanvas";
import { useDispatch } from "react-redux";
import { createOrderingItemAction } from "../../actions/OrderingItemAction";

const SingleOrderItem = ({ item }) => {
  const [showAddToCartPopper, setShowAddToCartPopper] = useState(false);
  const dispatch = useDispatch();

  const offCanvasAddToCartOpen = () => {
    setShowAddToCartPopper(true);
  };

  const offCanvasAddToCartClose = () => {
    setShowAddToCartPopper(false);
  };

  return (
    <>
      <div className="bg-white border-gray p-block container-fluid">
        <div className="row justify-content-md-center">
          <div className="col-6">
            <h2 className="medium_para mb10">{item.name}</h2>
            <button
              className="reorder_btn"
              onClick={() => offCanvasAddToCartOpen()}
            >
              Reorder
            </button>
          </div>

          <div className="col-4 offset-2 text-right">
            <p className="medium_para font_semibold mt8">
              {Money.moneyFormat(item.priceSum)}
            </p>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <Offcanvas
          show={showAddToCartPopper}
          onHide={offCanvasAddToCartClose}
          placement="bottom"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <h3 className="line_clamp font-bold">{item.name}</h3>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <hr className="solid" />
            <ReorderOffcanvas
              itemFromOrderHistory={item}
              offCanvasAddToCartClose={offCanvasAddToCartClose}
            />
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
};

export default SingleOrderItem;
