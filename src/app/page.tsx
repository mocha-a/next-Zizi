'use client';

import Dashboard from "@/components/home/Dashboard";
import Mood from "@/components/home/Mood";
import NewRelease from "@/components/home/NewRelease";
import Record from "@/components/home/Record";
import Chart from "@/components/home/Chart";

import '../styles/home/home.scss';
import Footer from "@/components/home/Footer";

export default function Home() {
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
