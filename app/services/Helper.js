// import moment from "moment";

// import moment from "moment";

export const capitalizeWords = (str) => {
  return str?.replace(/\b\w/g, (char) => char.toUpperCase());
};

//   export const htmlChanger = (params) => {
//     const decoded = decode(params, { level: "html5" });
//     return decoded;
//   };

// export const getDateAgo = (params) => {
//   moment.locale("id");
//   const fromNow = moment.unix(params).fromNow();
//   return fromNow;
// };
export const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export const formatToRupiah = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumSignificantDigits: (value + "").replace(",", "").length,
  }).format(value);
