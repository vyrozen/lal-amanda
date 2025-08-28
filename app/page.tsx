"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { auth, db } from "./config/firebase.config";
import { doc, DocumentData, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Home() {
  gsap.registerPlugin(ScrollTrigger);
  const [userData, setUserData] = useState<DocumentData | null>(null);
  const route = useRouter();
  useEffect(() => {
    const handleFetchData = async () => {
      const userRef = doc(db, `/laras/app`);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        //handle if user data exists
        setUserData(userSnap.data());
        return userSnap.data();
      }
    };
    if (typeof window !== "undefined") {
      handleFetchData();
    }
  });

  useGSAP(() => {
    // Animasi untuk image container (yang sudah ada)
    gsap
      .timeline()
      .fromTo(
        ".image",
        { translateX: "-100%" },
        {
          translateX: "0%",
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".image-container",
            start: "top top",
            end: "+=1000",
            scrub: true,
            pin: true,
            invalidateOnRefresh: true,
          },
        }
      )
      .fromTo(
        ".image-container",
        { scale: 1 },
        {
          scale: 0.8,
          scrollTrigger: {
            trigger: ".image-container",
            scrub: true,
            start: "top top",
            end: "+=1000",
          },
        }
      );

    // PERBAIKAN ANIMASI PARAGRAPH - Fade in satu per satu

    // Animasi tambahan untuk setiap paragraph saat scroll
    gsap.utils.toArray(".text-content").forEach((element, index) => {
      gsap.fromTo(
        element as HTMLElement,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,

          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element as HTMLElement,
            once: true,
            // markers: true,
            start: "top 85%",
            end: "bottom 75%",
          },
        }
      );
    });

    // Animasi untuk section terakhir (first-out)
    gsap.fromTo(
      ".first-out .text-slate-50",
      {
        opacity: 0,
        y: 50,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".first-out",
          once: true,
          // markers: true,
          start: "top+=50% 50%",
          end: "bottom 75%",
        },
      }
    );

    // Animasi untuk quote section (corsiva-monotype)
    gsap.fromTo(
      ".font-corsiva-monotype p",
      {
        opacity: 0,
        y: 30,
        rotationX: 15,
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".font-corsiva-monotype",
          start: "top 75%",
          end: "bottom 25%",
          once: true,
        },
      }
    );

    gsap.timeline().fromTo(
      ".video",
      { filter: "grayscale(0%)" },
      {
        ease: "sine.inOut",
        scale: 0.8,
        borderRadius: "3rem",
        filter: "grayscale(100%)",
        scrollTrigger: {
          trigger: ".video-canvas",
          start: "top top",
          end: "+=1000",
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
        },
      }
    );
  }, []);

  const handleAcceptButton = async () => {
    const updateDate = Timestamp.now();
    const docPath = doc(db, `/laras/app`);
    await setDoc(docPath, { updatedAt: updateDate, isAccepted: true, isFilledQuestion: true }, { merge: true }).then(() => {
      route.push("/accepted");
    });
  };
  const handleRejectButton = async () => {
    const updateDate = Timestamp.now();
    const docPath = doc(db, `/laras/app`);
    await setDoc(docPath, { updatedAt: updateDate, isAccepted: false, isFilledQuestion: true }, { merge: true }).then(() => {
      route.push("/rejected");
    });
  };

  return (
    <div className="relative z-0 font-sans items-center justify-items-center min-h-screen gap-16">
      <section className="flex bg-amber-100 h-screen w-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-brown-sugar font-bold text-gray-950">Laras Amanda</h1>
          <h2 className="text-xl font-kenao font-bold text-gray-950 -mt-3">Yogyakarta, 28 Agustus 2025</h2>
        </div>
      </section>

      <section className="bg-black min-h-screen w-screen text-black">
        <div className="min-h-screen w-screen items-center justify-center flex bg-black-100">
          <div className="h-screen w-screen grid grid-rows-3 bg-black overflow-clip image-container">
            <div className=" image relative">
              <Image
                src={"/image1.jpg"}
                style={{ objectPosition: "50% 35%" }}
                width={1080}
                height={1920}
                className="image w-full h-full object-cover"
                alt="Image 3"
              />
            </div>

            <div className=" image relative">
              <Image src={"/image2.jpg"} width={1080} height={1920} className="image w-full h-full object-cover" alt="Image 3" />
            </div>
            <div className=" image relative">
              <Image src={"/image3.jpg"} width={1080} height={1920} className="image w-full h-full object-cover" alt="Image 3" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black flex items-center justify-center h-[125vh] w-screen text-white"></section>

      <section className="bg-black min-h-screen w-screen paragraph-section">
        <div className="px-8 py-16 text-slate-50 font-cmunrm space-y-8 text-xl">
          <div className="">
            <h1 className="text-5xl font-handsome text-content">Untukmu,</h1>
            <h1 className="text-5xl font-handsome text-content">kekasihku</h1>
          </div>

          <p className="text-content">
            Aku kenal kamu belum cukup lama. Belum ada setengah umur hidupku mengenal mu. Bermula ketika kamu mengirim pesan padaku dulu
            waktu masa orientasi kampus. Lalu waktu berjalan beriringan dengan kita yang mulai mengisi cerita di kota nan-indah ini.
          </p>
          <p className="text-content">
            Kita mulai mengukir sebuah jalan kisah. Dimulai dari huruf, kata, kalimat, menjadi sebuah cerita yang ketika diceritakan ulang
            selalu timbul senyuman dari bibirmu yang tidak pernah gagal membuat aku tergila-gila.
          </p>
          <p className="text-content">
            <span className="font-bold">15 Juni 2025.</span> Kala itu aku sudah mantap untuk selesai dari masa lalu ku. Dan mulai
            menyuarakan rasa suka ku khusus untuk mu seorang. Aku ngga bisa bohong kepada diriku sendiri ketika jatuh cinta pada seseorang.
            Ketika di momen kamu mempertanyakan rasa kasih sayangku, rasanya aku ngga boleh menyiakan kesempatan itu di kala itu. Meskipun
            bukan di waktu yang tepat.
          </p>
          <p className="text-content">
            Kamu itu... Keras kepala. Meyakinimu setelah menerima suratmu untuk yang pertama kalinya adalah hal yang sulit bagiku. Untukku,
            memahami mu seperti sebuah rekayasa teknik – teknik yang rumus-rumusnya harus aku ciptakan sendiri. Mungkin aku yang terlalu
            sederhana dan naif untuk memahami cara mencintaimu. Layaknya seorang filsuf yang tengah mencoba membuktikan keberadaan Tuhan.
          </p>
          <p className="text-content">
            Aku benci ketika aku harus membuatmu melupakan semua cerita manis yang pernah kita ukir sebelumnya. Aku benci ketika aku harus
            tampil sebagai orang yang bodoh dan lemah di hadapanmu, berbeda dengan aku yang dahulu selalu tampil keren di depanmu. Aku benci
            ketika aku harus membawamu ke lubang yang sama, ke masalah yang sama untuk yang ke sekian kalinya. Hingga membuatmu merasa tidak
            layak untuk aku cintai lagi. Aku benci ketika aku membuat mu berdosa. Aku benci harus menerima salam pamitmu untuk yang ke
            sekian kalinya. Aku benci harus belajar lagi untuk menerima keadaan.
          </p>
          <p className="text-content">
            27 Agustus 2025. Hal yang sama terjadi lagi. Aku selalu mempertanyakan kepada diriku, kenapa kau berbuat demikian? Bukannya udah
            pernah janji? Maafkan aku yang telah mengingkari janji itu, dan sudah memperlakukanmu tidak semestinya.
          </p>
          <p className="text-content">
            Kehilanganmu? Meskipun eksistensimu di dunia ini masih ada, rasanya seperti dulu ketika aku mendengar nada dering telfon di pagi
            hari untuk menerima kabar kepergian mendiang Ayahku. Pagi hari ku rasanya aneh, hampa.
          </p>
          <p className="text-content">
            Egois? Sepertinya begitu. Aku belum pernah rasanya sehaus ini untuk berusaha tetap memiliki. Aku benci untuk mengatakan ini tapi
            aku yakin diriku masih mau untuk selalu jadi lebih baik untukmu. Itulah sebabnya aku selalu enggan menerima pamitmu. Aku belum
            pernah seberjuang ini untuk selalu mempertahankan apa yang sudah ku bangun.
          </p>
          <p className="text-content">
            Yas, aku tahu kamu sudah memilih dirimu sendiri. Aku bangga kamu masih bisa menjadi dirimu sendiri bahkan dikala aku sudah mulai
            mempertanyakan keberadaan diriku.
          </p>
          <p className="italic text-content">
            "Kereta ini akan selalu mengiringi perjalanan barumu, dan siap berhenti untuk menjemputmu kapan pun kau membutuhkan
            tumpangannya."
          </p>
          <p className="text-content">– Muhammad Zaki Reyansyah</p>
        </div>
      </section>

      <section className="bg-black flex items-center justify-center h-[30vh] w-screen text-white"></section>

      <section className="bg-black flex items-center justify-center min-h-screen w-screen text-white first-out">
        <div className="px-8 text-slate-50 font-cmunrm space-y-8 text-xl">
          <p>
            Aku selalu mencintai selera musik, makan, harum, dan segala tentangmu. Gingsul di dalam senyum-mu yang selalu aku rindukan,
            suara dan nasihat hangat-mu yang selalu aku tunggu di malam yang sunyi di kamar ku sebelum terlelap dalam tidur ku. Perhatian
            dan rasa kasih sayangmu yang tidak akan pernah bisa aku lupakan. Sungguh aku seorang manusia yang merugi telah menyia-nyiakan
            semua itu.
          </p>
        </div>
      </section>

      <section className="bg-black flex items-center justify-center min-h-screen w-screen text-white">
        <div className="px-8 text-slate-50 font-corsiva-monotype space-y-8 text-3xl">
          <p>Loving you is the finest art I have ever crafted, and this masterpiece will live forever in my heart.</p>
        </div>
      </section>

      <section className="bg-black flex items-center justify-center h-[40vh] w-screen text-white"></section>

      <section className="bg-black video-canvas flex items-center justify-center min-h-screen w-screen text-white">
        <video
          autoPlay
          playsInline
          muted
          loop
          preload="auto"
          className="object-cover video h-screen w-screen sm:object-center object-[70%_70%]"
          src="/edits.mp4"
        ></video>
      </section>

      <section className="bg-black flex items-center justify-center min-h-screen w-screen text-white">
        <div className="px-8 text-slate-50 space-y-4 text-3xl">
          <h1 className="text-center font-cmunrm text-xl font-bold">DEMON SLAYER -KIMETSU NO YAIBA- THE MOVIE: INFINITY CASTLE</h1>
          <Image src="/poster.jpeg" width={1080} height={1920} className="scale-75 rounded-4xl" alt="Poster Movie" />
          <p className="font-corsiva-monotype text-2xl">Sunday, 31 August 2025. at CGV Jwalk Mall</p>
          <p className="font-cmunrm text-xl">Nonton bareng yuk?</p>
          <div className="font-cmunrm text-xl gap-x-4 flex">
            <button
              className="px-8 py-2 outline-[0.01px] hover:text-black hover:bg-white disabled:hover:bg-black cursor-pointer disabled:cursor-not-allowed disabled:text-green-500"
              disabled={userData?.isAccepted}
              onClick={() => {
                handleAcceptButton();
              }}
            >
              {userData?.isFilledQuestion ? (userData?.isAccepted ? "Kan udah ngisi wle" : "Yuk") : "Yuk"}
            </button>
            <button
              className="px-8 py-2 outline-[0.01px] text-red-600 disabled:cursor-not-allowed disabled:text-gray-400 cursor-pointer"
              disabled={userData?.isAccepted}
              onClick={() => {
                handleRejectButton();
              }}
            >
              Ngga dulu
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
