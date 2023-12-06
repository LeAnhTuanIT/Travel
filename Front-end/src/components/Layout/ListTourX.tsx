import React from "react";
import { backend_url } from "../../server";
import { moneyFormatter } from "../../shared/GlobalFunction";

const ListTourX = (data: any) => {
  const items = data.data;
  const formatter = moneyFormatter();
  return (
    <>
    <div className="main-footer-list mb-12 m-10 flex-3">
      {items.map((item: any, index: any) => {
        return (
          <div key={index} className="main-footer-item">
            <a
              href={`/search/${item._id}`}
              style={{
                backgroundImage: `url("${item.images[0]}")`,
              }}
              className="main-item-img"
            ></a>

            <div className="main-item-content">
              <div className="main-item-header text-capitalize">{item.destination}</div>
              <div className="main-item-text " style={{textTransform: "capitalize"}}>{item.description.replace(/<[^>]+>/g, '')} </div>
            </div>

            <a
              href="/search/{{slug}}"
              style={{ backgroundColor: item.color }}
              className="main-item-price"
            >
              <div className="main-price-number"  style={{fontSize: "26px"}}>    {formatter.format(item.price)} VND</div>
              <div className="main-price-detail d-flex justify-content-center">DETAILS</div>
            </a>
          </div>
          
        );
      })}
    </div>
    </>
  );
};

export default ListTourX;
