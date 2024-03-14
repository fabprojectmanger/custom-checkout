import {
  DatePicker,
  useApplyMetafieldsChange,
  useMetafield,
  Checkbox,
  reactExtension,
} from "@shopify/ui-extensions-react/checkout";

import { useState } from "react";

export default reactExtension(
  "purchase.checkout.delivery-address.render-after",
  () => <Extension />
);

function Extension() {

  const deliveryDate = useMetafield({
    namespace: "custom",
    key: "delivery_date",
  });

  const [showCalander, setShowCalender] = useState(false);

  const setDeliveryDate = useApplyMetafieldsChange();

  return (
    <>
      <Checkbox
        onChange={() => setShowCalender(!showCalander)}
        id="checkbox1"
        name="checkboxchoices"
        checked={showCalander}
      >
        Select Shipping Address Book
      </Checkbox>
      {showCalander && (
       <DatePicker
       onChange={(value) => {
         setDeliveryDate({
           type: "updateMetafield",
           namespace: "custom",
           key: "delivery_date",
           valueType: "string",
           value,
         });
       }}
       selected={deliveryDate?.value}
     />
      )}
    </>
  );
}
