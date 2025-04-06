import PermissionChecker from "@/components/PrivacyComponent/PermissionChecker";
import WalletCard from "@/components/account/WalletCard";
import BalanceSheet from "@/components/account/balanceSheet";
import DetailAccount from "@/components/account/detailAccount";
import GetAllAccount from "@/components/account/getAllAccount";
import IncomeStatement from "@/components/account/incomeStatement";
import TrialBalance from "@/components/account/trialBalance";
import { Route, Routes } from "react-router-dom";

export default function AccountRoutes() {
  return (
    <Routes>
      {" "}
      <Route path="/wallet" exact element={<WalletCard />} />
      <Route path="/account" exact element={<GetAllAccount />} />
      <Route path="/account/:id" element={<DetailAccount />} />
      {/* <Route path="/account/trial-balance" exact element={<TrialBalance />} />
      <Route path="/account/balance-sheet" exact element={<BalanceSheet />} />
      <Route path="/account/income" exact element={<IncomeStatement />} /> */}
    </Routes>
  );
}
