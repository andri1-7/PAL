import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import FormInput from "../base-component/form-input";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { currency } from "@/helpers/hooks";
import { useSelector, useDispatch } from "react-redux";
import thumbnail from "../../../public/thumbnail.svg";
import Image from "next/image";
import dayjs from "dayjs";

export default function kasir() {
  const allTransaksi = useSelector((state) => state.data_transaksi.value);
  const router = useRouter();
  const [searchProduct, setSearchProduct] = useState("");
  const [product, setProduct] = useState([]);
  const [produksearch, setProdukSearch] = useState([]);
  const [omset, setOmset] = useState(0);
  const [keuntungan, setKeuntungan] = useState(0);

  const categoryList = [
    { value: 1, label: "Makanan" },
    { value: 2, label: "Minuman" },
    { value: 3, label: "Sembako" },
    { value: 4, label: "Lainnya" },
    { value: 5, label: "kelapa muda" },
    { value: 6, label: "kelapa tua" },
    { value: 7, label: "kelapa parut" },
  ];

  const getTransaksi = async () => {
    const querys = query(
      collection(db, "transaksi_item"),
      where("createdAt", "==", dayjs().format("YYYY-MM-DD"))
    );

    const querySnapshot = await getDocs(querys);
    if (querySnapshot.docs.length > 0) {
      const dataTransaksi = querySnapshot.docs.map((doc) => doc.data());
      let omset = calcPriceOmset(dataTransaksi);
      let keuntungan = calcKeuntungan(dataTransaksi);
      setOmset(omset);
      setKeuntungan(keuntungan);
    }
  };

  const getProduct = async () => {
    const querys = query(
      collection(db, "produk"),
      where("delete", "==", false)
    );
    const querySnapshot = await getDocs(querys);
    querySnapshot.forEach((doc) => {
      setProduct((prev) => [
        ...prev,
        {
          ...doc.data(),
          id: doc.id,
          qty: 0,
          jumlah_beli: 0,
        },
      ]);
    });
    querySnapshot.forEach((doc) => {
      setProdukSearch((prev) => [
        ...prev,
        {
          ...doc.data(),
          id: doc.id,
          qty: 0,
          jumlah_beli: 0,
        },
      ]);
    });
  };

  const calcPriceOmset = (item) => {
    const totalPrice = item.reduce(
      (total, currentItem) => total + currentItem.harga,
      0
    );

    return currency(totalPrice);
  };

  const calcKeuntungan = (item) => {
    const totalPrice = item.reduce(
      (total, currentItem) => total + currentItem.keuntungan,
      0
    );

    return currency(totalPrice);
  };

  const calcPrice = (item) => {
    const totalPrice = item.reduce(
      (total, currentItem) => total + currentItem.payload.harga,
      0
    );

    return currency(totalPrice);
  };

  useEffect(() => {
    getProduct();
    getTransaksi();
  }, []);

  const searchProduk = (value) => {
    if (value) {
      const search = product.filter((c) =>
        c.nama_produk.toLowerCase().includes(value.toLowerCase())
      );
      setProdukSearch(search.map((v, i) => ({ ...v, no: i + 1 })));
      setSearchProduct(value);
    } else {
      setProdukSearch(product);
      setSearchProduct(value);
    }
  };

  return (
    <div className="h-full w-full bg-[#FFFFFF] text-black font-mono relative">
      <div className="px-4 py-4 pb-24 flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="text-xs font-semibold">Kasir</div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <div>Pendapatan</div>
            <div>{omset}</div>
          </div>
          <div className="flex flex-col">
            <div>Keuntungan</div>
            <div>{keuntungan}</div>
          </div>
        </div>
        <FormInput
          className="mt-2 h-10"
          placeholder="Cari Produk"
          onChange={(e) => searchProduk(e.target.value)}
          value={searchProduct}
        />
        <div className="grid grid-cols-2  overflow-x-auto">
          {produksearch.map((item) => {
            let harga = Number(item.harga_beli) + Number(item.keuntungan);
            return (
              <div
                onClick={() => {
                  router.push({
                    pathname: "/produk/detail/",
                    query: {
                      id: item.id,
                    },
                  });
                }}
                className="flex flex-col justify-between mt-4 boxShadow py-3 px-2 rounded-md"
              >
                <Image
                  alt="thumbnail"
                  src={thumbnail}
                  className="w-full object-cover"
                />
                <div className="flex flex-col">
                  <div className="text-sm text-[#2A3256]">
                    {item.nama_produk} - {item.variant.label} -{" "}
                    {item.kode_produk}
                  </div>
                  <div className="text-xs text-[#2A3256] mt-1">
                    Stok {item.stok}
                  </div>
                  <div className="text-base text-[#1A72DD]">
                    {currency(harga)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div
        onClick={() => router.push("/kasir/checkout")}
        className="fixed bottom-3 w-full text-white px-3"
      >
        <div
          className="flex py-4 px-4 bg-blue-primary-500
         rounded-md"
        >
          Total : {calcPrice(allTransaksi)}
        </div>
      </div>
    </div>
  );
}
