import { Icon } from "@iconify/react";

const CreditCardIcons = ({props}) => {
  switch (props) {
    case "mastercard":
      return <Icon icon="logos:mastercard" width={25} />;
    case "visa":
      return <Icon icon="logos:visa" width={25} />;
    case "amex":
      return <Icon icon="logos:amex" width={25} />;
    case "discover":
      return <Icon icon="logos:discover" width={25} />;
    case "diners club":
      return <Icon icon="logos:dinersclub" width={25} />;
    case "unionpay":
      return <Icon icon="logos:unionpay" width={25} />;
    default:
      return <Icon icon="fxemoji:creditcard" width={25} />;
  }
};

export default CreditCardIcons;
