import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import dayjs from "dayjs";
import { currency } from "@/helpers/hooks";

export default function ListSale() {
  const [startDate, setStartDate] = useState(new Date());
  const [transaksi, setTransaksi] = useState([]);

  useEffect(() => {
    getTransaksi();
  }, [startDate]);

  const getTransaksi = async () => {
    const querys = query(
      collection(db, "transaksi_item"),
      where(
        "createdAt",
        "==",
        dayjs().format(
          startDate
            ? dayjs(startDate).format("YYYY-MM-DD")
            : dayjs().format("YYYY-MM-DD")
        )
      )
    );

    const querySnapshot = await getDocs(querys);
    if (querySnapshot.docs.length > 0) {
      const dataTransaksi = querySnapshot.docs.map((doc) => doc.data());
      setTransaksi(dataTransaksi);
    }
  };

  return (
    <div className="h-screen relative w-full bg-white text-black">
      <div className="overflow-x-auto h-full w-full px-4 py-2">
        <div className="font-semibold text-lg">List Sale</div>
        <DatePicker
          selected={startDate}
          className="border-2 border-gray-300 rounded-md p-2 w-full mt-2 ml-5"
          onChange={(date) => setStartDate(date)}
        />
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Nama Produk
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Harga Produk
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Qty
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Harga
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Created At
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {transaksi.map((item) => (
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {item.produkName}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {currency(item.hargaProduk)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {item.qty}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {currency(item.harga)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {item.createdAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
