import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";
import thumbnail from "../../../public/thumbnail.svg";
import { currency, makeid } from "@/helpers/hooks";
import {
  PlusCircleIcon,
  MinusCircleIcon,
  TrashIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import FormInput from "../base-component/form-input";
import Button from "../base-component/button";
import FormInputCurrency from "../base-component/form-input-currency";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import dayjs from "dayjs";
import { resetTransaksi } from "@/store/actions/DataTransaksi";

export default function checkout() {
  const router = useRouter();
  const dispatch = useDispatch();
  const allTransaksi = useSelector((state) => state.data_transaksi.value);
  const [produk, setProduk] = useState([]);
  const [jumlahUang, setJumlahUang] = useState(0);
  const [kembalian, setKembalian] = useState();
  const [totalHarga, setTotalHarga] = useState(0);

  useEffect(() => {
    if (allTransaksi.length > 0) {
      let produk = [];
      allTransaksi.map((item, index) => {
        produk.push({
          id: item.payload.id,
          produkName: item.payload.produkName,
          harga: item.payload.harga,
          qty: item.payload.qty,
          stok: item.payload.stok,
          variantProduk: item.payload.variantProduk,
          hargaProduk: item.payload.hargaProduk,
          stok: item.payload.stok,
          kode_produk: item.payload.kode_produk,
          keuntungan: item.payload.keuntungan,
        });
      });
      setProduk(produk);
    }
  }, [allTransaksi]);

  useEffect(() => {
    if (produk.length > 0) {
      calcPrice(produk);
    } else {
      setTotalHarga(0);
    }
  }, [produk]);

  const calcPrice = (item) => {
    const totalPrice = item.reduce(
      (total, currentItem) => total + currentItem.harga,
      0
    );

    setTotalHarga(totalPrice);
  };

  const tambahQty = (index) => {
    const produks = produk[index];
    if (produks.qty < Number(produks.stok)) {
      const updated = {
        ...produks[index],
        ...produks,
        qty: produks.qty + 1,
        harga: produks.hargaProduk * (produks.qty + 1),
      };
      const clone = [...produk];
      clone[index] = updated;
      setProduk(clone);
    } else {
      alert("Melebihin batas maksimum");
    }
  };

  const kurangQty = (index, qty) => {
    const produks = produk[index];
    if (produks.qty != 1) {
      const updated = {
        ...produks[index],
        ...produks,
        qty: produks.qty - 1,
        harga: produks.hargaProduk * qty,
      };
      const clone = [...produk];
      clone[index] = updated;
      setProduk(clone);
    } else {
      alert("Qty tidak boleh kosong");
    }
  };

  const hapusItem = (index) => {
    setProduk(produk.filter((item, i) => i !== index));
  };

  const process = async () => {
    produk.map(async (item) => {
      console.log("item", item);
      const param = {
        id: makeid(10),
        harga: item.harga,
        idProduk: item.id,
        hargaProduk: item.hargaProduk,
        produkName: item.produkName,
        qty: item.qty,
        keuntungan: Number(item.keuntungan),
        createdAt: dayjs().format("YYYY-MM-DD"),
      };

      console.log("param", param);

      await setDoc(doc(db, "transaksi_item", param.id), param);

      let qtyParam = {
        stok: Number(item.stok) - Number(item.qty),
      };

      await updateDoc(doc(db, "produk", item.id), qtyParam).then(() => {
        alert("Transaksi berhasil");
      });
    });

    let params = {
      produk: produk,
      bayar: jumlahUang,
      kembalian: kembalian,
      createdAt: dayjs().format("YYYY-MM-DD"),
      id: makeid(10),
    };

    await setDoc(doc(db, "transaksi", params.id), params);

    router.push("/kasir");
    dispatch(resetTransaksi());
  };

  return (
    <div className="min-h-screen flex flex-col relative w-full bg-white text-black">
      <div className="flex flex-row justify-between mt-3">
        <ArrowLeftIcon
          className="w-7 h-7 ml-4 text-black"
          onClick={() => {
            router.push("/kasir");
            // dispatch(resetTransaksi());
          }}
        />
        <div>Order</div>
        <div></div>
      </div>
      <div className="mt-3 pb-64 h-full">
        {produk.map((item, index) => (
          <div className="w-full py-3 flex flex-row justify-between items-center border-b-[0.5px]">
            <div className="flex flex-row">
              <Image src={thumbnail} width={100} height={50} />
              <div>
                <div className="font-semibold">
                  {item.produkName} - {item.variantProduk} - {item.kode_produk}
                </div>
                <div className="font-semibold text-blue-primary-500">
                  {currency(item.harga)}
                </div>
                <div className="bg-gray-300 rounded-md mt-2">
                  <div className="flex flex-row px-3 py-2 justify-between">
                    <MinusCircleIcon
                      onClick={() => kurangQty(index, item.qty - 1)}
                      className="w-6 h-6 text-black cursor-pointer"
                    />
                    <div className="text-black px-4 font-semibold">
                      {item.qty}
                    </div>
                    <PlusCircleIcon
                      onClick={() => tambahQty(index)}
                      className="w-6 h-6 text-black cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mr-5">
              <TrashIcon
                onClick={() => hapusItem(index)}
                className="w-6 h-6 text-black cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="w-full bottom-0 fixed text-white bg-blue-primary-500">
        <div className="flex flex-col px-4 py-3">
          <div className="flex flex-row justify-between">
            <div>Jumlah Uang</div>
            <div>
              <FormInputCurrency
                // label="Jumlah Uang"
                value={jumlahUang}
                className="text-black"
                onChange={(e) => {
                  setJumlahUang(e);
                  let kembalian = Number(e) - Number(totalHarga);
                  setKembalian(kembalian);
                }}
              />
            </div>
          </div>
          <div className="flex flex-row mt-4 justify-between">
            <div>Kembalian</div>
            <div>
              <FormInput
                value={currency(kembalian)}
                disabled={true}
                className="h-9"
              />
            </div>
          </div>
          <div className="flex flex-row mt-2 justify-between">
            <div>Total Harga</div>
            <div>{currency(totalHarga)}</div>
          </div>
          <div className="mt-4">
            <Button
              onClick={() => {
                process();
              }}
              color={"white"}
              size={"lg"}
            >
              Proses
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
