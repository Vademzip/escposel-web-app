import HistoryTimeline from "@/components/homePageComponents/historyTimeline/historyTimeline";


export default function Home() {
  return (
      <div className={'text-center'}>
        <div className={'text-white text-2xl'}>Добро пожаловать на официальный сайт одной из самых перспективных команд
          в <img className={'h-6 w-40 inline-block mb-1'} src="/CivLogo.png" alt=""/>,
        </div>
        <div className={'text-white text-2xl'}>история которой пишется прямо сейчас..</div>
        <HistoryTimeline/>
      </div>
  )
}
