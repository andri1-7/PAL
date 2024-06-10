import { useEffect, useState } from "react";
import Admin from "../component/Admin";
import { Dialog, Transition } from "@headlessui/react";
import FormInput from "../base-component/form-input";
import Button from "../base-component/button";
import SelectComponent from "../base-component/dropdown";
import { useRouter } from "next/router";
import FormInputCurrency from "../base-component/form-input-currency";
import {
  addDoc,
  collection,
  setDoc,
  doc,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { currency, makeid } from "@/helpers/hooks";

export default function Produk() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [produk, setProduk] = useState([]);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [id, setId] = useState("");
  const [condition, setCondtion] = useState("");
  const [keuntungan, setKeuntungan] = useState("");
  const [category, setCategory] = useState({
    value: 0,
    label: "Pilih Category",
  });
  const [variant, setVariant] = useState({
    value: 0,
    label: "Pilih Variant",
  });
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [diskon, setDiskon] = useState("");
  const categoryList = [
    { value: 1, label: "Makanan" },
    { value: 2, label: "Minuman" },
    { value: 3, label: "Sembako" },
    { value: 4, label: "Lainnya" },
    { value: 5, label: "kelapa muda" },
    { value: 6, label: "kelapa tua" },
    { value: 7, label: "kelapa parut" },
    { value: 8, label: "Plastik" },
    { value: 9, label: "Bahan Kue" },
  ];
  const variantList = [
    { value: 1, label: "Kg" },
    { value: 2, label: "Dus" },
    { value: 3, label: "Satuan" },
    { value: 4, label: "Ml" },
    { value: 5, label: "Liter" },
    { value: 6, label: "Grm" },
    { value: 7, label: "Iket" },
    { value: 8, label: "Pack" },
  ];
  const [nameError, setNameError] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [varianrError, setVariantError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [stockError, setStockError] = useState(false);
  const [keuntunganError, setKeuntunganError] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");
  const [produksearch, setProdukSearch] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const searchProduk = (value) => {
    if (value) {
      const search = produk.filter((c) =>
        c.nama_produk.toLowerCase().includes(value.toLowerCase())
      );
      setProdukSearch(search.map((v, i) => ({ ...v, no: i + 1 })));
      setSearchProduct(value);
    } else {
      setProdukSearch(produk);
      setSearchProduct(value);
    }
  };

  const submit = async () => {
    if (name == "") {
      setNameError(true);
      setCodeError(false);
      setPriceError(false);
      setStockError(false);
      setCategoryError(false);
      setKeuntunganError(false);

      setVariantError(false);
    } else if (code == "") {
      setNameError(false);
      setCodeError(true);
      setPriceError(false);
      setStockError(false);
      setCategoryError(false);
      setKeuntunganError(false);

      setVariantError(false);
    } else if (price == "") {
      setNameError(false);
      setCodeError(false);
      setPriceError(true);
      setStockError(false);
      setCategoryError(false);
      setKeuntunganError(false);

      setVariantError(false);
    } else if (stock == "") {
      setNameError(false);
      setCodeError(false);
      setPriceError(false);
      setStockError(true);
      setCategoryError(false);
      setVariantError(false);
      setKeuntunganError(false);
    } else if (variant.value == 0) {
      setNameError(false);
      setCodeError(false);
      setPriceError(false);
      setStockError(false);
      setCategoryError(false);
      setVariantError(true);
      setKeuntunganError(false);
    } else if (category.value == 0) {
      setNameError(false);
      setCodeError(false);
      setPriceError(false);
      setStockError(false);
      setCategoryError(true);
      setVariantError(false);
      setKeuntunganError(false);
    } else if (keuntungan == "") {
      setNameError(false);
      setCodeError(false);
      setPriceError(false);
      setStockError(false);
      setCategoryError(false);
      setVariantError(false);
      setKeuntunganError(true);
    } else {
      const param = {
        nama_produk: name,
        stok: stock,
        harga_beli: price,
        kode_produk: code,
        kategori: category,
        diskon: diskon == "" ? 0 : diskon,
        variant: variant,
        id: makeid(10),
        delete: false,
        keuntungan: keuntungan,
      };

      await setDoc(doc(db, "produk", param.id), param)
        .then(() => {
          alert("Produk berhasil diinput");
          router.reload();
        })
        .catch(() => {
          alert("Produk gagal disimpan");
        });
    }
  };

  const editData = async () => {
    if (name == "") {
      setNameError(true);
      setCodeError(false);
      setPriceError(false);
      setStockError(false);
      setCategoryError(false);
      setVariantError(false);
    } else if (code == "") {
      setNameError(false);
      setCodeError(true);
      setPriceError(false);
      setStockError(false);
      setCategoryError(false);
      setVariantError(false);
    } else if (price == "") {
      setNameError(false);
      setCodeError(false);
      setPriceError(true);
      setStockError(false);
      setCategoryError(false);
      setVariantError(false);
    } else if (stock == "") {
      setNameError(false);
      setCodeError(false);
      setPriceError(false);
      setStockError(true);
      setCategoryError(false);
      setVariantError(false);
    } else if (variant.value == 0) {
      setNameError(false);
      setCodeError(false);
      setPriceError(false);
      setStockError(false);
      setCategoryError(false);
      setVariantError(true);
    } else if (category.value == 0) {
      setNameError(false);
      setCodeError(false);
      setPriceError(false);
      setStockError(false);
      setCategoryError(true);
      setVariantError(false);
    } else {
      const param = {
        nama_produk: name,
        stok: stock,
        harga_beli: price,
        kode_produk: code,
        kategori: category,
        diskon: diskon == "" ? 0 : diskon,
        variant: variant,
        keuntungan: keuntungan,
        delete: false,
      };

      await updateDoc(doc(db, "produk", id), param)
        .then(() => {
          alert("Produk berhasil diubah");
          router.reload();
        })
        .catch(() => {
          alert("Produk gagal disimpan");
        });
    }
  };

  const getData = async () => {
    const querys = query(
      collection(db, "produk"),
      where("delete", "==", false)
    );
    const querySnapshot = await getDocs(querys);
    querySnapshot.forEach((doc) => {
      setProduk((prev) => [
        ...prev,
        {
          ...doc.data(),
          id: doc.id,
        },
      ]);
    });
    querySnapshot.forEach((doc) => {
      setProdukSearch((prev) => [
        ...prev,
        {
          ...doc.data(),
          id: doc.id,
        },
      ]);
    });
  };

  return (
    <Admin>
      <div className="h-full mt-16">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">
                Produk
              </h1>
              <p className="mt-2 text-sm text-gray-700">list all produk</p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <Button
                color={"primary"}
                size={"lg"}
                onClick={() => setOpen(true)}
              >
                Add Produk
              </Button>
            </div>
            <FormInput
              className="mt-2 h-10 text-black "
              placeholder="Cari Produk"
              onChange={(e) => searchProduk(e.target.value)}
              value={searchProduct}
            />
          </div>
          <div className="flex lg:hidden h-full relative">
            <div className="grid grid-cols-2  overflow-x-auto">
              {produksearch.map((item) => {
                let harga = Number(item.harga_beli) + Number(item.keuntungan);
                return (
                  <div className="flex flex-col justify-between mt-4 boxShadow py-3 px-2 rounded-md">
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
                      <div className="w-full flex flex-row mt-2">
                        <Button
                          color={"primary"}
                          size={"lg"}
                          onClick={() => {
                            setCondtion("edit");
                            setName(item.nama_produk);
                            setCode(item.kode_produk);
                            setCategory(item.kategori);
                            setPrice(item.harga_beli);
                            setStock(item.stok);
                            setDiskon(item.diskon);
                            setVariant(item.variant);
                            setId(item.id);
                            setKeuntungan(item.keuntungan);
                            setOpen(true);
                          }}
                        >
                          Edit
                        </Button>
                        <div className="ml-2">
                          <Button
                            color={"white"}
                            size={"lg"}
                            onClick={() => {
                              updateDoc(doc(db, "produk", item.id), {
                                delete: true,
                              })
                                .then(() => {
                                  alert("produk berhasil dihapus");
                                  router.reload();
                                })
                                .catch(() => {
                                  alert("produk gagal dihapus");
                                });
                            }}
                          >
                            Hapus
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="-mx-4 mt-8 sm:-mx-0 hidden lg:flex">
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
                    Kode Produk
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                  >
                    category
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                  >
                    variant
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                  >
                    Harga Beli
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                  >
                    Keuntungan
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Stok
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Diskon
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {produksearch.map((person) => (
                  <tr key={person.email}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {person.nama_produk}
                    </td>
                    <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                      {person.kode_produk}
                    </td>
                    <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell">
                      {person.kategori.label}
                    </td>
                    <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell">
                      {person.variant.label}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {currency(person.harga_beli)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {currency(person.keuntungan)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person.stok}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {currency(person.diskon)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 flex flex-row">
                      <div
                        className="flex items-center cursor-pointer"
                        onClick={() => {
                          setCondtion("edit");
                          setName(person.nama_produk);
                          setCode(person.kode_produk);
                          setCategory(person.kategori);
                          setPrice(person.harga_beli);
                          setStock(person.stok);
                          setDiskon(person.diskon);
                          setVariant(person.variant);
                          setId(person.id);
                          setKeuntungan(person.keuntungan);
                          setOpen(true);
                        }}
                      >
                        Edit
                      </div>
                      <div
                        className="flex items-center ml-2 cursor-pointer"
                        onClick={() => {
                          updateDoc(doc(db, "produk", person.id), {
                            delete: true,
                          })
                            .then(() => {
                              alert("produk berhasil dihapus");
                              router.reload();
                            })
                            .catch(() => {
                              alert("produk gagal dihapus");
                            });
                        }}
                      >
                        Hapus
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {open && (
            <Transition.Root show={open}>
              <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
              <Dialog
                open={open}
                onClose={setOpen}
                as="div"
                className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto"
              >
                {/* Full-screen container to center the panel */}
                <div className="flex w-1/2 text-black flex-col rounded-lg bg-[#FFFFFF] py-3 px-[32px] font-montserrat">
                  {/* The actual dialog panel  */}
                  <Dialog.Panel>
                    <Dialog.Title className="text-2xl font-semibold">
                      Tambah Produk
                    </Dialog.Title>
                    <Dialog.Description className="mt-4">
                      <div>
                        <FormInput
                          label="Nama Produk"
                          className="h-9"
                          value={name}
                          error={nameError}
                          required={true}
                          errorText={
                            nameError == true ? "nama produk harus diisi" : ""
                          }
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="mt-3">
                        <FormInput
                          label="Kode Produk"
                          className="h-9"
                          value={code}
                          required={true}
                          error={codeError}
                          errorText={
                            codeError == true ? "code harus diisi" : ""
                          }
                          onChange={(e) => setCode(e.target.value)}
                        />
                      </div>
                      <div className="mt-4">
                        <SelectComponent
                          data={categoryList}
                          errorText={
                            categoryError == true ? "categori harus diiisi" : ""
                          }
                          onChange={(e) => setCategory(e)}
                          value={category}
                        />
                      </div>
                      <div className="mt-4">
                        <SelectComponent
                          data={variantList}
                          errorText={
                            varianrError == true ? "variant harus diisi" : ""
                          }
                          onChange={(e) => setVariant(e)}
                          value={variant}
                        />
                      </div>
                      <div className="mt-3">
                        <FormInputCurrency
                          label="Harga Beli"
                          className="h-9"
                          required={true}
                          error={priceError}
                          errorText={
                            priceError == true ? "harga harus diisi" : ""
                          }
                          value={price}
                          onChange={(e) => setPrice(e)}
                        />
                      </div>
                      <div className="mt-3">
                        <FormInputCurrency
                          label="Keuntungan"
                          className="h-9"
                          required={true}
                          error={keuntunganError}
                          errorText={
                            keuntunganError == true
                              ? "keuntungan harus diisi"
                              : ""
                          }
                          value={keuntungan}
                          onChange={(e) => setKeuntungan(e)}
                        />
                      </div>
                      <div className="mt-3">
                        <FormInput
                          label="Stok"
                          error={stockError}
                          errorText={
                            stockError == true ? "stok harus diisi" : ""
                          }
                          className="h-9"
                          required={true}
                          value={stock}
                          onChange={(e) => setStock(e.target.value)}
                        />
                      </div>
                      <div className="mt-3">
                        <FormInputCurrency
                          label="Diskon"
                          className="h-9"
                          value={diskon}
                          error={false}
                          onChange={(e) => setDiskon(e)}
                        />
                      </div>
                      <div className="w-full mt-4 flex justify-end">
                        <div>
                          <Button
                            color="primary"
                            size={"lg"}
                            onClick={() => {
                              if (condition == "") {
                                submit();
                              } else {
                                editData();
                              }
                            }}
                          >
                            Simpan
                          </Button>
                        </div>
                        <div className="ml-4">
                          <Button
                            color="white"
                            size={"lg"}
                            className="ml-4"
                            onClick={() => {
                              setOpen(false);
                              setCondtion("");
                            }}
                          >
                            Batal
                          </Button>
                        </div>
                      </div>
                    </Dialog.Description>
                  </Dialog.Panel>
                </div>
              </Dialog>
            </Transition.Root>
          )}
        </div>
      </div>
    </Admin>
  );
}
