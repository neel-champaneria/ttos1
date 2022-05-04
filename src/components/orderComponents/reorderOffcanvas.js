import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  createOrderingItemAction,
  decreaseQuantityAction,
  increaseQuantityAction,
} from "./../../actions/OrderingItemAction";
import { addToCartAction } from "./../../actions/OrderingCartAction";
import { Form, Button, ToastContainer, Toast } from "react-bootstrap";
import { Money } from "../../utils/money";
import ReorderModGrpListComp from "./reorderModGrpListComp";
import { sortModifierGroupItems, sortModifiers } from "../../utils/utils";

const ReorderOffcanvas = ({
  itemFromOrderHistory,
  offCanvasAddToCartClose,
}) => {
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.menuReducer) || [];
  const orderingItem = useSelector((state) => state.orderingItemReducer);

  const [itemFromMenu, setItemFromMenu] = useState(null);
  const [loading, setLoading] = useState(false);
  const [itemFoundInMenu, setItemFoundInMenu] = useState(false);
  const [availableSelectedModifiers, setAvailableSelectedModifiers] = useState(
    []
  );

    const [showAddedToCartToast, setShowAddedToCartToast] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (menu.length > 0 && itemFromOrderHistory) {
      for (let i = 0; i < menu.length; i++) {
        for (let j = 0; j < menu[i].items.length; j++) {
          if (menu[i].items[j].id === itemFromOrderHistory.itemId) {
            if (menu[i].items[j].enable) {
              setItemFromMenu(menu[i].items[j]);
              setItemFoundInMenu(true);
              break;
            }
          }
        }
      }
    }
    setLoading(false);
  }, [menu, itemFromOrderHistory]);

  useEffect(() => {
    if (itemFromMenu !== null) {
      const tempOrderingItem = {
        name: itemFromMenu.name,
        image: itemFromMenu.image,
        itemId: itemFromMenu.id,
        priceSum: itemFromMenu.price,
        price: itemFromMenu.price,
        tax1Id: itemFromMenu.tax1Id,
        tax2Id: itemFromMenu.tax2Id,
        tax3Id: itemFromMenu.tax3Id,
        qty: 1,
        sequence: 1,
        catName: itemFromOrderHistory.catName,
        modifiers: [],
      };
      // setAvailableSelectedModifiers([...tempOrderingItem.modifiers]);
      const currentlyAvailableModifiers = [];

      const sortedModifierGroupItems = sortModifierGroupItems(
        itemFromMenu.modifierGroupItems,
        "asc",
        "sequence"
      );
      console.log("sortedMdifierGroupItems: ", sortedModifierGroupItems);

      for (let i = 0; i < sortedModifierGroupItems.length; i++) {
        const {
          minQty,
          maxQty = 0,
          modifierGroup: modGroup,
        } = sortedModifierGroupItems[i];

        let isModGroupEnable = false;

        for (let j = 0; j < modGroup.modifiers.length; j++) {
          const disableItemList = modGroup.modifiers[j]?.disableItemList || "";
          if (!disableItemList.includes(itemFromMenu.id + ",")) {
            isModGroupEnable = true;
            break;
          }
        }

        if (isModGroupEnable) {
          const sortedModifiers = sortModifiers(
            modGroup.modifiers,
            "asc",
            "price"
          );
          for (let k = 0; k < sortedModifiers.length; k++) {
            const disableItemList = sortedModifiers[k].disableItemList || "";
            if (disableItemList.includes(itemFromMenu.id + ",")) {
            } else {
              currentlyAvailableModifiers.push(sortedModifiers[k]);
            }
          }
        }
      }

      const tempAvilableSelectedModifiers = [];
      for (let i = 0; i < itemFromOrderHistory.modifiers.length; i++) {
        for (let j = 0; j < currentlyAvailableModifiers.length; j++) {
          if (
            itemFromOrderHistory.modifiers[i].modifierId ==
            currentlyAvailableModifiers[j].id
          ) {
            let tempObj = {
              ...currentlyAvailableModifiers[j],
              seq: j,
              modifierId: currentlyAvailableModifiers[j].id,
            };
            delete tempObj.id;
            tempAvilableSelectedModifiers.push({ ...tempObj });
          }
        }
      }

      console.log(
        "itemFromOrderHistory.modifiers",
        itemFromOrderHistory.modifiers
      );
      console.log(
        "tempAvilableSelectedModifiers: ",
        tempAvilableSelectedModifiers
      );
      console.log("currentlyAvailableModifiers: ", currentlyAvailableModifiers);
      setAvailableSelectedModifiers([...tempAvilableSelectedModifiers]);
      tempOrderingItem.modifiers = [...tempAvilableSelectedModifiers];
      dispatch(createOrderingItemAction(tempOrderingItem));
    }
  }, [itemFromMenu]);

  const [
    isModifiersWithMinQtySelectedProperly,
    setIsModifiersWithMinQtySelectedProperly,
  ] = useState(false);

  const [
    modifierGroupObjectWithMinQty_isRequired,
    setModifierGroupObjectWithMinQty_isRequired,
  ] = useState([]);

  const [additionalNote, setAdditionalNote] = useState("");

  const [showValidationMsg, setShowValidationMsg] = useState(false);

  const [requireModifierGroupsName, setRequireModifierGroupName] = useState([]);

  const onIncreaseQuantity = () => {
    dispatch(increaseQuantityAction());
  };

  const onDecreaseQuantity = () => {
    dispatch(decreaseQuantityAction());
  };

  const checkModifiersWithMinQtySelected = (
    isSelected,
    modifierGroupObjectWithMinQty_isRequired
  ) => {
    setIsModifiersWithMinQtySelectedProperly(isSelected);
    setModifierGroupObjectWithMinQty_isRequired(
      modifierGroupObjectWithMinQty_isRequired
    );
    const tempRequireModifierGroupsName =
      modifierGroupObjectWithMinQty_isRequired.map((modGroup) => modGroup.name);
  };

  const onAddToCart = () => {
    if (!isModifiersWithMinQtySelectedProperly) {
      setShowValidationMsg(true);
      const tempRequireModifierGroupsName =
        modifierGroupObjectWithMinQty_isRequired.map(
          (modGroup) => modGroup.name
        );
      setRequireModifierGroupName(tempRequireModifierGroupsName);
      console.log("not modifying");
      return;
    }
    dispatch(addToCartAction(orderingItem));
    dispatch(createOrderingItemAction({}));
    setShowAddedToCartToast(true);
    offCanvasAddToCartClose();
    console.log("modifying");
  };

  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : !itemFoundInMenu ? (
        <h1>Item Currently Not Available In Menu</h1>
      ) : (
        itemFromMenu && (
          <>
            <ReorderModGrpListComp
              itemFromOrderHistory={itemFromOrderHistory}
              itemFromMenu={itemFromMenu}
              checkModifiersWithMinQtySelected={
                checkModifiersWithMinQtySelected
              }
              availableSelectedModifiers={availableSelectedModifiers}
            />
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Special Instructions</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={additionalNote}
                  onChange={(e) => setAdditionalNote(e.target.value)}
                />
              </Form.Group>
            </Form>

            <div className="offcanvas_bottom light_pink d-flex">
              <div className="p-d-flex quantity-increase-decrease-container mr-auto">
                <Button
                  className="btn right-border-radius left_quantity h-46"
                  variant="danger"
                  onClick={() => onDecreaseQuantity()}
                >
                  <i className="fa fa-minus"></i>
                </Button>

                <input
                  type="number"
                  pInputText
                  id="quantity"
                  name="quantity"
                  className="input p-text-center p-ml-1 p-mr-1 h-46"
                  autoComplete="off"
                  required
                  value={orderingItem.qty}
                />

                <Button
                  className="btn left-border-radius right_quantity h-46"
                  variant="danger"
                  onClick={() => onIncreaseQuantity()}
                >
                  <i className="fa fa-plus"></i>
                </Button>
              </div>
              <Button
                className="btn red-btn h-46 w100 ml10"
                onClick={() => onAddToCart()}
              >
                Confirm - {Money.moneyFormat(orderingItem.priceSum)}
              </Button>
            </div>

            {showValidationMsg && requireModifierGroupsName && (
              <ToastContainer position="top-center" className="mt-5">
                <Toast
                  onClose={() => setShowValidationMsg(false)}
                  delay={3000}
                  autohide
                >
                  <Toast.Header>
                    <strong>Required Modifiers</strong>
                  </Toast.Header>
                  <Toast.Body>
                    {requireModifierGroupsName.map((groupName) => (
                      <li key={groupName}>{groupName}</li>
                    ))}
                  </Toast.Body>
                </Toast>
              </ToastContainer>
            )}

            {showAddedToCartToast && (
              <ToastContainer position="top-center" className="mt-5">
              <Toast
                onClose={() => setShowAddedToCartToast(false)}
                delay={3000}
                autohide
              >
                <Toast.Header>
                  <strong>Added in the cart</strong>
                </Toast.Header>
                <Toast.Body>
                  <p>{itemFromOrderHistory.name}</p>
                </Toast.Body>
              </Toast>
            </ToastContainer>
            )}
          </>
        )
      )}
    </>
  );
};

export default ReorderOffcanvas;
