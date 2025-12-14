// import { auth } from "@/auth";

import Dashboard from "@/components/home/Dashboard";
import Mood from "@/components/home/Mood";
import NewRelease from "@/components/home/NewRelease";
import Record from "@/components/home/Record";
import Chart from "@/components/home/Chart";
import Footer from "@/components/common/Footer";

import '../styles/home/home.scss';

export default async function Home() {
  // 세션 정보 가져오기
  // const session = await auth();

  return (
    <>
      <div className='header'>Zizi !</div>
      <div className="home-container">
        <Dashboard/>
        <Mood/>
        <NewRelease/>
        <Record/>
        <Chart/>
        <Footer/>
      </div>
    </>
  );
}
