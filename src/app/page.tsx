'use client';

import Dashboard from "@/components/home/Dashboard";
import Mood from "@/components/home/Mood";
import NewRelease from "@/components/home/NewRelease";
import Chart from "@/components/home/Chart";

import '../styles/home/home.scss';

export default function Home() {

  return (
    <div className="home-container">
      <Dashboard/>
      <Mood/>
      <NewRelease/>
      <Chart/>
    </div>
  );
}
