import React, { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getAllPayments } from "../redux/actions/payment";
import { AnyAction } from "redux";
import { aimData, destinationData } from "../static/data";
import {
  capitalizeFirstLetter,
  moneyFormatter,
} from "../shared/GlobalFunction";
capitalizeFirstLetter;
ChartJS.register(ArcElement, Tooltip, Legend);

const ChartPage = () => {
  const dispatch = useDispatch();
  const { payments } = useSelector((state: any) => state.payments);
  let totalIncome = 0;
  let monthlyIncome = 0;
  const formatter = moneyFormatter();
  // config aim pie chart
  let labelsIncomeByAim: any = [];
  let listDataAim: any = [];
  let listRgbaAim: any = [];
  let listBorderAim: any = [];

  // config destination pie chart
  let labelsIncomeByDestination: any = [];
  let listDataDestination: any = [];
  let listRgbaDestination: any = [];
  let listBorderDestination: any = [];

  // million
  const priceData = [1, 3, 5, 10];
  const status = [0, 2];
  let amountSuccessPayment = 0;
  // config price pie chart
  let labelsIncomeByPrice: any = [];
  let listDataPrice: any = [];
  let listRgbaPrice: any = [];
  let listBorderPrice: any = [];
  useEffect(() => {
    dispatch(getAllPayments() as unknown as AnyAction);
  }, [dispatch]);

  // Init label for aim chart
  aimData.map((aim: any) => {
    labelsIncomeByAim.push(capitalizeFirstLetter(aim.value));
    const listColor = getRandomRGBAColor();
    listDataAim.push(0);
    listRgbaAim.push(listColor[0]);
    listBorderAim.push(listColor[1]);
  });

  // Init label for destination chart
  destinationData.map((destinationData: any) => {
    labelsIncomeByDestination.push(
      capitalizeFirstLetter(destinationData.value)
    );
    const listColor = getRandomRGBAColor();
    listDataDestination.push(0);
    listRgbaDestination.push(listColor[0]);
    listBorderDestination.push(listColor[1]);
  });

  // Init label for price chart
  priceData.map((price: any, index) => {
    // convert to million
    const currentPrice = price * 1000000;
    const nextPrice = priceData[index + 1] * 1000000;
    if (nextPrice) {
      labelsIncomeByPrice.push(
        `${formatter.format(currentPrice)} - ${formatter.format(nextPrice)}`
      );
    } else {
      labelsIncomeByPrice.push(`> ${formatter.format(currentPrice)}`);
    }

    const listColor = getRandomRGBAColor();
    listDataPrice.push(0);
    listRgbaPrice.push(listColor[0]);
    listBorderPrice.push(listColor[1]);
  });

  // filter to pie chart
  payments.map((payment: any) => {
    totalIncome += payment.received;
    const currentDate = new Date();
    const paymentDate = new Date(payment.createAt);
    if (currentDate.getMonth() == paymentDate.getMonth()) {
      monthlyIncome += payment.received;
    }

    console.log(payment.status)
    if (payment.status == 2) amountSuccessPayment++;

    aimData.map((aim: any, index: any) => {
      if (payment.tour.aim == aim.value) {
        listDataAim[index] += payment.received;
      }
    });

    destinationData.map((destination: any, index: any) => {
      if (payment.tour.destination == destination.value) {
        listDataDestination[index] += payment.received;
      }
    });

    priceData.map((price: any, index: any) => {
      // convert to million
      const currentPrice = price * 1000000;
      const nextPrice = priceData[index + 1] * 1000000;

      if (nextPrice) {
        if (payment.received <= nextPrice && currentPrice <= payment.received) {
          listDataPrice[index] += payment.received;
        }
      } else {
        if (currentPrice <= payment.received) {
          listDataPrice[index] += payment.received;
        }
      }
    });
  });

  const dataPieAim = {
    labels: labelsIncomeByAim,
    datasets: [
      {
        label: "Income of Aim",
        data: listDataAim,
        backgroundColor: listRgbaAim,
        borderColor: listBorderAim,
        borderWidth: 1,
      },
    ],
  };

  const dataPieDestination = {
    labels: labelsIncomeByDestination,
    datasets: [
      {
        label: "Income of Destination",
        data: listDataDestination,
        backgroundColor: listRgbaDestination,
        borderColor: listBorderDestination,
        borderWidth: 1,
      },
    ],
  };

  const dataPiePrice = {
    labels: labelsIncomeByPrice,
    datasets: [
      {
        label: "Income of Price",
        data: listDataPrice,
        backgroundColor: listRgbaPrice,
        borderColor: listBorderPrice,
        borderWidth: 1,
      },
    ],
  };

  function getRandomRGBAColor() {
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);

    var rgbaColor =
      "rgba(" + red + ", " + green + ", " + blue + ", " + "0.2" + ")";
    var rgbaBorder =
      "rgba(" + red + ", " + green + ", " + blue + ", " + "1" + ")";
    const listColor = [rgbaColor, rgbaBorder];
    return listColor;
  }

  return (
    <>
      <div
        style={{ width: "80vw" }}
        className="mx-auto mb-5 mt-3 d-flex flex-column gap-4"
      >
        <div className="d-flex gap-5">
          {/* cart */}
          <div className="flex-1">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                      Total Income
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      {`${formatter.format(totalIncome)} VND `}
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-calendar fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* cart */}
          <div className="flex-1">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                      Earnings (Monthly)
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      {`${formatter.format(monthlyIncome)} VND `}
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-calendar fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* cart */}
          <div className="flex-1">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                      Total Amount Of Transactions
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800 text-center">
                      {payments.length}
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-calendar fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                      Successful Transaction Rate
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800 text-center">
                      {((amountSuccessPayment / payments.length  ) * 100).toFixed(0) + "%"}
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-calendar fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex">
          <div className="flex-1 d-flex justify-content-center">
            <Pie data={dataPieAim} />
          </div>
          <div className="flex-1 d-flex justify-content-center">
            <Pie data={dataPieDestination} />
          </div>
          <div className="flex-1 d-flex justify-content-center">
            <Pie data={dataPiePrice} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChartPage;
