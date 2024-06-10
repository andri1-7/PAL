
import { useEffect, useState } from "react";
import FormInput from "./base-component/form-input";
import Logo from "../../public/logo.jpeg"
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { db } from "@/lib/firebase";
import SelectComponent from "./base-component/dropdown";
import { useRouter } from "next/router";
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
import Button from "./base-component/button";
import dayjs from "dayjs";
import { makeid } from "@/helpers/hooks";

export default function Example() {
  const router = useRouter();
  const [nama, setNama] = useState('')
  const [nim, setNim] = useState('')
  const [tanggalPeminjaman, setTanggalPeminjaman] = useState(new Date())
  const [tanggalPengembalian, setTanggalPengembalian] = useState(new Date())
  const [dataPeminjaman, setDataPeminjaman] = useState([])
  const [selectDataPeminjaman, setSelectDataPeminjaman]= useState(null)

  useEffect(() => {
    getKdpt()
  }, [])

  const getKdpt = async () => {
    const querys = query(
      collection(db, "KDPK"),
      where("delete", "==", false)
    );
    const querySnapshot = await getDocs(querys);
    querySnapshot.forEach((doc) => {
      setDataPeminjaman((prev) => [
        ...prev,
        {
          id: doc.id,
          label: doc.data().label + " ("+doc.data().jumlah+")",
          labelSave: doc.data().label,
          jumlah: doc.data().jumlah,
          value: doc.data().jumlah
        },
      ]);
    });
  }

  const submit = async () => {
    if(selectDataPeminjaman != null && nama != '' && nim != '') {
      const param = {
        jumlah : selectDataPeminjaman.jumlah - 1,
      }
  
      await updateDoc(doc(db, "KDPK", selectDataPeminjaman.id), param)
      .then(() => {
       
      })
      .catch(() => {
      });

      const paramPeminjamanAlat = {
        kdpk_id : selectDataPeminjaman.id,
        kdpk : selectDataPeminjaman.labelSave,
        id: makeid(15),
        nama: nama,
        nim: nim,
        tanggal_pengembalian: dayjs(tanggalPengembalian).format("YYYY-MM-DD"),
        tanggal_pinjam: dayjs(tanggalPeminjaman).format("YYYY-MM-DD"), 
      }


      await setDoc(doc(db, "peminjaman_alat", paramPeminjamanAlat.id), paramPeminjamanAlat)
        .then(() => {
          alert("Peminjaman berhasil disubmit");
          router.reload();
        })
        .catch(() => {
          alert("Peminjaman gagal disubmit");
        });

    }else {
      alert("Gagal Silahkan isi semua form");
    }
    
  }

  return (
    <div className="h-screen w-full bg-white container mx-auto items-center justify-center px-4 py-4 relative text-black overflow-auto">
      <div className="w-full flex flex-col container mx-auto items-center mt-3">
        <Image src={Logo} width={200} height={80} />
        <div className="mt-3 w-64">
          <FormInput
            value={nama}
            label="Nama Mahasiswa"
            onChange={(e) => setNama(e.target.value)}
            className={"h-9"}
            placeholder="Nama Mahasiswa"
          />
        </div>
        <div className="mt-3 w-64">
          <FormInput
            value={nim}
            label="NIM Mahasiswa"
            onChange={(e) => setNim(e.target.value)}
            className={"h-9"}
            placeholder="NIM Mahasiswa"
          />
        </div>
       <div className="mt-3 flex flex-col">
        <label className="ml-1 text-sm text-[#333333]">
            Tanggal Peminjaman
          </label>
          <DatePicker
            selected={tanggalPeminjaman}
            className="border-2 border-gray-300 rounded-md p-2 w-64 mt-2"
            onChange={(date) => setTanggalPeminjaman(date)}
          />
       </div>
       <div className="mt-3 flex flex-col">
        <label className="ml-1 text-sm text-[#333333]">
            Tanggal Pengembalian
          </label>
          <DatePicker
            selected={tanggalPengembalian}
            className="border-2 border-gray-300 rounded-md p-2 w-64 mt-2"
            onChange={(date) => setTanggalPengembalian(date)}
          />
       </div>
       <div className="mt-3 flex flex-col w-64">
        <label className="ml-1 text-sm text-[#333333]">
            KDPK
        </label>
        <SelectComponent
          data={dataPeminjaman}
          value={selectDataPeminjaman}
          className="mt-2"
          onChange={(e) => {
            setSelectDataPeminjaman(e)
          }}
          placeholder="Cari KDPK"
        />
       </div>
       <div className="mt-3 w-64">
          <Button color={"primary"} size={"lg"} onClick={() => submit()}>Sumbit</Button>
       </div>
      </div>
    </div>
  );
}
