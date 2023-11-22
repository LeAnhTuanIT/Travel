export const getCookie = (cookieName: string) => {
  // var name = cookieName + "=";
  // var ca = document.cookie.split(";");
  // console.log(document.cookie)
  // for (var i = 0; i < ca.length; i++) {
  //   var c = ca[i].trim();
  //   if (c.indexOf(name) == 0) {
  //     return c.substr(name.length);
  //   }
  // }
  return localStorage.getItem(cookieName);
};

export const deleteCookie = (name: string, path: string = "/") => {
  if (getCookie(name)) {
    localStorage.removeItem(name);
    // document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
  }
};

export const isAdmin = (user: any = { role: "user" }) => {
  if (user == undefined) {
    return;
  }
  if (user?.role != "admin") {
    return false;
  }
  return true;
};
export const validatePhoneNumber = (phone: any) => {
  var phonePattern = /^\d{3}\d{3}\d{4}$/;

  console.log(phonePattern.test(phone));
  // Kiểm tra chuỗi theo biểu thức chính quy
  if (phonePattern.test(phone)) {
    return true; // Chuỗi là số điện thoại hợp lệ
  } else {
    return false; // Chuỗi không phải số điện thoại hợp lệ
  }
};

export const capitalizeFirstLetter = (str: String) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const moneyFormatter = () => {
  let formatter = new Intl.NumberFormat("en-US");
  // , {
  //   style: "currency",
  //   currency: "USD",
  // });

  return formatter;
};
