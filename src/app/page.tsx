import Admit from "./admit/page";
import TotalGuestCard from "@/components/totalGuestCard/TotalGuestCard";
import SearchComponent from "@/components/search/Search";
import InfoCard from "@/components/infoCard/InfoCard";
import { Scanner } from "@yudiel/react-qr-scanner";
import QRScanner from "@/components/qrScanner/QRScanner";

export default function Home() {
  return (
    <div>
      <Admit />
     
    </div>
  );
}
