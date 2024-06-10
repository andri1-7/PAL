
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
  const [selectRadio, setSelecRadio] = useState('')

  useEffect(() => {
    if(selectRadio != ''){
      getKdpt(selectRadio)
    }
  }, [selectRadio])

  const getKdpt = async (collect) => {
    console.log('sele', collect)
    setDataPeminjaman([])
    const querys = query(
      collection(db, collect),
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
        <div className="mt-4 font-semibold text-2xl">Form Peminjaman Alat Laboratorium Kebidanan</div>
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
          Prasat
        </label>
        <div className="flex flex-col justify-start ml-1">
          <div className="flex flex-row">
            <input
              className="mt-1"
              type="radio"
              checked={selectRadio == 'KDPK' ? true : false}
              onChange={() => setSelecRadio('KDPK')}
            />
            <div className="ml-2 ">KDPK</div>
           
          </div>
          <div className="flex flex-row">
            <input
              className=" mt-1"
              type="radio"
              checked={selectRadio == 'ANC' ? true : false}
              onChange={() => setSelecRadio('ANC')}
            />
            <div className="ml-2">ANC</div>
            
          </div>
          <div className="flex flex-row">
            <input
              className=" mt-1"
              type="radio"
              checked={selectRadio == 'INC' ? true : false}
              onChange={() => setSelecRadio('INC')}
            />
            <div className="ml-2">INC</div>
            
          </div>
          <div className="flex flex-row">
          <input
              className="mt-1"
              type="radio"
              checked={selectRadio == 'Asneo' ? true : false}
              onChange={() => setSelecRadio('Asneo')}
            />
            <div className="ml-2">ASNEO</div>
            
          </div>
          <div className="flex flex-row">
            <input
              className=" mt-1"
              type="radio"
              checked={selectRadio == 'KB' ? true : false}
              onChange={() => setSelecRadio('KB')}
            />
            <div className="ml-2">KB</div>
           
          </div>
          <div className="flex flex-row">
            <input
              className=" mt-1"
              type="radio"
              checked={selectRadio == 'Kegawatdaruratan' ? true : false}
              onChange={() => setSelecRadio('Kegawatdaruratan')}
            />
            <div className="ml-2">KEGAWATDARURATAN</div>
            
          </div>
        </div>
        {
          selectRadio != '' && (
            <SelectComponent
              data={dataPeminjaman}
              value={selectDataPeminjaman}
              className="mt-4"
              onChange={(e) => {
                setSelectDataPeminjaman(e)
              }}
              placeholder={"Cari " + selectRadio}
            />
          )
        }
       </div>
       <div className="mt-3 w-64">
          <Button color={"primary"} size={"lg"} onClick={() => submit()}>Sumbit</Button>
       </div>
      </div>
    </div>
  );
}
