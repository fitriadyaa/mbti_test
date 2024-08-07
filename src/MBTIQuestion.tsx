import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";

interface MBTIQuestion {
  id: number;
  text: string;
  category: "EI" | "SN" | "TF" | "JP";
  options: [string, string];
}

interface MBTIQuestionProps {
  onComplete: (result: string) => void;
}

const mbtiQuestions: MBTIQuestion[] = [
  // Extraversion (E) vs. Introversion (I)
  {
    id: 1,
    text: "Pada pesta, Anda cenderung:",
    category: "EI",
    options: [
      "Berinteraksi dengan banyak orang, termasuk yang belum dikenal",
      "Berinteraksi dengan beberapa orang yang sudah dikenal",
    ],
  },
  {
    id: 2,
    text: "Anda merasa lebih energik setelah:",
    category: "EI",
    options: [
      "Menghabiskan waktu dengan orang lain",
      "Menghabiskan waktu sendirian",
    ],
  },
  {
    id: 3,
    text: "Ketika menghadapi masalah, Anda lebih suka:",
    category: "EI",
    options: ["Mendiskusikannya dengan orang lain", "Memikirkannya sendiri"],
  },
  {
    id: 4,
    text: "Dalam situasi kerja, Anda lebih produktif ketika:",
    category: "EI",
    options: ["Bekerja dalam tim", "Bekerja secara mandiri"],
  },
  {
    id: 5,
    text: "Anda lebih menikmati:",
    category: "EI",
    options: [
      "Berbicara daripada mendengarkan",
      "Mendengarkan daripada berbicara",
    ],
  },
  {
    id: 6,
    text: "Ketika belajar sesuatu yang baru, Anda lebih suka:",
    category: "EI",
    options: [
      "Mencobanya langsung dan berdiskusi",
      "Membaca dan memikirkannya terlebih dahulu",
    ],
  },
  {
    id: 7,
    text: "Anda cenderung:",
    category: "EI",
    options: [
      "Memiliki lingkaran pertemanan yang luas",
      "Memiliki beberapa teman dekat",
    ],
  },
  {
    id: 8,
    text: "Dalam menghadapi konflik, Anda lebih suka:",
    category: "EI",
    options: [
      "Mendiskusikannya secara langsung",
      "Merefleksikannya terlebih dahulu",
    ],
  },
  {
    id: 9,
    text: "Anda lebih menikmati aktivitas:",
    category: "EI",
    options: [
      "Yang melibatkan banyak orang",
      "Yang bisa dilakukan sendiri atau dengan sedikit orang",
    ],
  },
  {
    id: 10,
    text: "Ketika berada di tempat baru, Anda cenderung:",
    category: "EI",
    options: [
      "Mencari tahu dengan bertanya pada orang lain",
      "Mengamati dan mencari tahu sendiri",
    ],
  },

  // Sensing (S) vs. Intuition (N)
  {
    id: 11,
    text: "Anda lebih tertarik pada:",
    category: "SN",
    options: ["Fakta dan detail konkret", "Teori dan konsep abstrak"],
  },
  {
    id: 12,
    text: "Anda lebih menghargai:",
    category: "SN",
    options: ["Pengalaman praktis", "Imajinasi dan kreativitas"],
  },
  {
    id: 13,
    text: "Anda lebih cenderung mempercayai:",
    category: "SN",
    options: ["Pengalaman langsung dan observasi", "Intuisi dan firasat"],
  },
  {
    id: 14,
    text: "Dalam menyelesaikan tugas, Anda lebih fokus pada:",
    category: "SN",
    options: ["Langkah-langkah praktis", "Gambaran besar dan kemungkinan"],
  },
  {
    id: 15,
    text: "Anda lebih tertarik untuk belajar tentang:",
    category: "SN",
    options: ["Fakta dan data spesifik", "Pola dan hubungan antar konsep"],
  },
  {
    id: 16,
    text: "Dalam mengambil keputusan, Anda lebih memprioritaskan:",
    category: "SN",
    options: [
      "Informasi faktual dan terukur",
      "Potensi dan kemungkinan masa depan",
    ],
  },
  {
    id: 17,
    text: "Anda lebih menikmati pekerjaan yang:",
    category: "SN",
    options: [
      "Memiliki instruksi dan prosedur yang jelas",
      "Memberikan kebebasan untuk berinovasi",
    ],
  },
  {
    id: 18,
    text: "Dalam memecahkan masalah, Anda cenderung:",
    category: "SN",
    options: [
      "Menggunakan metode yang sudah terbukti",
      "Mencoba pendekatan baru dan kreatif",
    ],
  },
  {
    id: 19,
    text: "Anda lebih tertarik pada diskusi tentang:",
    category: "SN",
    options: [
      "Realitas dan fakta saat ini",
      "Kemungkinan dan potensi masa depan",
    ],
  },
  {
    id: 20,
    text: "Dalam mendeskripsikan sesuatu, Anda cenderung:",
    category: "SN",
    options: ["Memberikan detail spesifik", "Menggunakan analogi dan metafora"],
  },

  // Thinking (T) vs. Feeling (F)
  {
    id: 21,
    text: "Dalam membuat keputusan, Anda lebih mengandalkan:",
    category: "TF",
    options: ["Logika dan analisis", "Perasaan dan nilai-nilai personal"],
  },
  {
    id: 22,
    text: "Anda lebih menghargai:",
    category: "TF",
    options: ["Keadilan dan konsistensi", "Harmoni dan empati"],
  },
  {
    id: 23,
    text: "Dalam argumen, Anda cenderung fokus pada:",
    category: "TF",
    options: ["Mencari kebenaran objektif", "Menjaga perasaan orang lain"],
  },
  {
    id: 24,
    text: "Anda lebih suka pemimpin yang:",
    category: "TF",
    options: ["Tegas dan objektif", "Memahami dan mendukung"],
  },
  {
    id: 25,
    text: "Ketika teman curhat, Anda cenderung:",
    category: "TF",
    options: ["Memberikan solusi praktis", "Memberikan dukungan emosional"],
  },
  {
    id: 26,
    text: "Dalam situasi konflik, Anda lebih memprioritaskan:",
    category: "TF",
    options: ["Menemukan solusi yang logis", "Menjaga hubungan baik"],
  },
  {
    id: 27,
    text: "Anda lebih menghargai pujian atas:",
    category: "TF",
    options: ["Kompetensi dan prestasi", "Karakter dan kepedulian"],
  },
  {
    id: 28,
    text: "Dalam menilai ide, Anda lebih mempertimbangkan:",
    category: "TF",
    options: ["Efektivitas dan logika", "Dampak pada orang lain"],
  },
  {
    id: 29,
    text: "Anda lebih nyaman bekerja dalam lingkungan yang:",
    category: "TF",
    options: ["Berorientasi pada hasil", "Berorientasi pada orang"],
  },
  {
    id: 30,
    text: "Dalam memberi kritik, Anda cenderung:",
    category: "TF",
    options: ["Langsung dan objektif", "Halus dan mempertimbangkan perasaan"],
  },

  // Judging (J) vs. Perceiving (P)
  {
    id: 31,
    text: "Anda lebih suka:",
    category: "JP",
    options: [
      "Memiliki rencana dan jadwal yang terstruktur",
      "Bersikap fleksibel dan spontan",
    ],
  },
  {
    id: 32,
    text: "Dalam menyelesaikan proyek, Anda cenderung:",
    category: "JP",
    options: [
      "Menyelesaikannya jauh sebelum tenggat waktu",
      "Menyelesaikannya mendekati tenggat waktu",
    ],
  },
  {
    id: 33,
    text: "Anda merasa lebih nyaman ketika:",
    category: "JP",
    options: ["Segala sesuatu sudah diputuskan", "Pilihan masih terbuka"],
  },
  {
    id: 34,
    text: "Anda lebih suka lingkungan kerja yang:",
    category: "JP",
    options: [
      "Terstruktur dengan aturan jelas",
      "Fleksibel dengan sedikit aturan",
    ],
  },
  {
    id: 35,
    text: "Dalam menghadapi tugas baru, Anda cenderung:",
    category: "JP",
    options: [
      "Membuat daftar dan rencana terlebih dahulu",
      "Langsung mulai dan menyesuaikan di tengah jalan",
    ],
  },
  {
    id: 36,
    text: "Anda lebih menikmati:",
    category: "JP",
    options: ["Rutinitas yang teratur", "Variasi dan perubahan"],
  },
  {
    id: 37,
    text: "Dalam mengatur ruang kerja, Anda lebih suka:",
    category: "JP",
    options: [
      "Menjaga kerapihan dan keteraturan",
      "Membiarkannya sedikit berantakan tapi fungsional",
    ],
  },
  {
    id: 38,
    text: "Ketika merencanakan liburan, Anda cenderung:",
    category: "JP",
    options: [
      "Merencanakan setiap detail",
      "Memiliki rencana umum dan improvisasi",
    ],
  },
  {
    id: 39,
    text: "Anda merasa lebih produktif ketika:",
    category: "JP",
    options: [
      "Mengikuti jadwal yang sudah dibuat",
      "Bekerja sesuai inspirasi saat itu",
    ],
  },
  {
    id: 40,
    text: "Dalam mengambil keputusan, Anda lebih suka:",
    category: "JP",
    options: [
      "Memutuskan secepat mungkin",
      "Menunda keputusan untuk melihat informasi lebih lanjut",
    ],
  },
];

interface MBTIQuestionProps {
  onComplete: (result: string) => void;
}

const MBTIQuestionComponent: React.FC<MBTIQuestionProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentQuestion < mbtiQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const result = calculateMBTIType(newAnswers);
      onComplete(result);
    }
  };

  const calculateMBTIType = (answers: number[]): string => {
    let e = 0,
      i = 0,
      s = 0,
      n = 0,
      t = 0,
      f = 0,
      j = 0,
      p = 0;

    mbtiQuestions.forEach((question, index) => {
      switch (question.category) {
        case "EI":
          answers[index] === 0 ? e++ : i++;
          break;
        case "SN":
          answers[index] === 0 ? s++ : n++;
          break;
        case "TF":
          answers[index] === 0 ? t++ : f++;
          break;
        case "JP":
          answers[index] === 0 ? j++ : p++;
          break;
      }
    });

    return `${e > i ? "E" : "I"}${s > n ? "S" : "N"}${t > f ? "T" : "F"}${
      j > p ? "J" : "P"
    }`;
  };

  if (currentQuestion >= mbtiQuestions.length) {
    return <div>Test completed. Calculating results...</div>;
  }

  const question = mbtiQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / mbtiQuestions.length) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4 sm:p-6 md:p-8">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="p-8 border-b">
          <CardTitle className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
            Pertanyaan {currentQuestion + 1} dari {mbtiQuestions.length}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-lg sm:text-xl mb-8 text-center text-gray-700">
                {question.text}
              </p>
              <div className="space-y-4">
                {question.options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className="w-full py-6 text-lg sm:text-xl transition-all hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-gray-800 border border-gray-300"
                    variant="outline"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
        <div className="px-8 pb-8">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-500 h-2.5 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MBTIQuestionComponent;
