export function formatDate(value: string) {
  const d = new Date(value);
  return d.toLocaleString();
}

export function formatPrice(price: number) {
  const p = Number(price).toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
  return p;
}

export function formatMoney(number: number) {
  const isNegative = number < 0;
  // Take the absolute value of the number for processing
  number = Math.abs(number);
  if (number < 1000) {
    return isNegative ? "-" + number.toString() : number.toString();
  } else if (number < 1000000) {
    return (isNegative ? "-" : "") + (number / 1000).toFixed(1) + " K";
  } else if (number < 1000000000) {
    return (isNegative ? "-" : "") + (number / 1000000).toFixed(1) + " TRIỆU";
  } else {
    return (isNegative ? "-" : "") + (number / 1000000000).toFixed(1) + " TỶ";
  }
}

export function formatPhoneNumber(phoneNumberString: string) {
  const cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }
  return phoneNumberString;
}
