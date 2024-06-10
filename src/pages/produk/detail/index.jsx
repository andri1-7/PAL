import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query as querys,
  where,
} from "firebase/firestore";
import { setDataTransaksi } from "@/store/actions/DataTransaksi";
import { db } from "@/lib/firebase";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import thumbnail from "../../../../public/thumbnail.svg";
import { currency } from "@/helpers/hooks";
import {
  MinusCircleIcon,
  PlusCircleIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

export default function detailProduk() {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [qty, setQty] = useState(0);

  const [produkDetail, setDetailProduk] = useState([]);

  const getDetailProduct = async () => {
    console.log("id", id);
    const getProdukRef = doc(db, "produk", id);
    const getProduk = await getDoc(getProdukRef);
    setDetailProduk(getProduk.data());
    console.log("data", getProduk.data(), id);
  };

  useEffect(() => {
    if (id) {
      getDetailProduct();
    } else {
      router.back();
    }
  }, []);

  return (
    <div className="h-screen flex flex-col w-full bg-[#FFFFFF] text-black font-mono relative">
      <div className="flex flex-row justify-between mt-3">
        <ArrowLeftIcon
          className="w-7 h-7 ml-4 text-black"
          onClick={() => {
            router.push("/kasir");
            // dispatch(resetTransaksi());
          }}
        />
        <div>Detail Produk</div>
        <div></div>
      </div>
      <div className="flex px-3 flex-col">
        <Image
          alt="thumbnail"
          src={thumbnail}
          className="object-cover w-full"
        />
        <div className="font-semibold">
          {produkDetail.nama_produk} - {produkDetail.variant?.label}
        </div>
        <div className="flex flex-row justify-between">
          <div className="font-semibold text-blue-primary-500">
            {currency(
              Number(produkDetail.harga_beli) + Number(produkDetail.keuntungan)
            )}
          </div>
          <div>Stok {produkDetail.stok}</div>
        </div>
      </div>
      <div className="w-full bottom-0 fixed text-white bg-blue-primary-500">
        <div className="flex items-center  px-3 py-4 flex-row justify-between">
          <div className="bg-gray-300 rounded-md">
            <div className="flex flex-row px-3 py-4 justify-between">
              <MinusCircleIcon
                onClick={() => {
                  if (qty != 0) {
                    setQty(qty - 1);
                  }
                }}
                className="w-6 h-6 text-black cursor-pointer"
              />
              <div className="text-black px-4 font-semibold">{qty}</div>
              <PlusCircleIcon
                onClick={() => {
                  if (qty == produkDetail.stok) {
                    alert("Stok Melebihi Batas");
                  } else {
                    setQty(qty + 1);
                  }
                }}
                className="w-6 h-6 text-black cursor-pointer"
              />
            </div>
          </div>
          <div
            onClick={() => {
              if (qty == 0) {
                alert("Silahkan isi qty terlebih dahulu");
              } else {
                let hargaAwal =
                  Number(produkDetail.harga_beli) +
                  Number(produkDetail.keuntungan);
                let item = {
                  id: produkDetail.id,
                  stok: produkDetail.stok,
                  qty: qty,
                  harga: hargaAwal * qty,
                  hargaProduk: hargaAwal,
                  produkName: produkDetail.nama_produk,
                  variantProduk: produkDetail.variant?.label,
                  kode_produk: produkDetail.kode_produk,
                  keuntungan: produkDetail.keuntungan,
                };
                dispatch(setDataTransaksi(item));
                router.push("/kasir");
              }
            }}
            className="text-black bg-gray-300 rounded-md px-3 py-4"
          >
            Tambah
          </div>
        </div>
      </div>
    </div>
  );
}
