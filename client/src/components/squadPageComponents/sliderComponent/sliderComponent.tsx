import {Swiper, SwiperSlide} from 'swiper/react';
import Image from "next/image";
import 'swiper/css';
import 'swiper/css/effect-cards';
import Cree from "/public/Cree.png"
import Cyrus from "/public/Cyrus.png"
import Hungary from "/public/Hungary.png"
import Montezuma from "/public/Montezuma.png"
import Peter from "/public/Peter.png"
import RobertBruce from "/public/Robert.png"
import Suleiman from "/public/Suleiman.png"
import Tamar from "/public/Tamar.png"
import Teddy from "/public/Teddy.png"
import Theodora from "/public/Theodora.png"
import Victoria from "/public/Victoria.png"
import {Mousewheel, Navigation} from 'swiper/modules';
import Link from "next/link";

export default function SliderItems() {
  return (
    <Swiper
      className={'border border-dashed rounded-md'}
      mousewheel={true}
      navigation={true}
      grabCursor={true}
      modules={[Navigation, Mousewheel]}
      autoHeight
      centeredSlides={true}
      slidesPerView={6}
      spaceBetween={20}
      initialSlide={4}
      onSwiper={(swiper) => swiper.activeIndex = 6}
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        536: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
        1280: {
          slidesPerView: 5,
        },
        1536: {
          slidesPerView: 6
        }
      }}
    >
      <SwiperSlide>
        <Link href={'/player/18'} className={'h-340p phone:w-64 relative cursor-pointer align-bottom flex'}>
          <Image className={'hover:bg-gradient-to-br from-[#0f969c3b] to-[#6da5c000] object-contain'}
                 src={Peter} alt=""/>
          <div className={'absolute bottom-0 w-full text-center text-xl bg-black/50'}>Broccoli</div>
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link href={'/player/11'} className={'h-340p phone:w-64 relative cursor-pointer flex align-bottom'}>
          <Image className={'hover:bg-gradient-to-br from-[#0f969c3b] to-[#6da5c000] object-contain phone:object-cover'} src={RobertBruce}
                 alt=""/>
          <div className={'absolute bottom-0 w-full text-center text-xl bg-black/50'}>Dams</div>
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link href={'/player/12'} className={'h-340p phone:w-64 relative cursor-pointer flex align-bottom'}>
          <Image className={'hover:bg-gradient-to-br from-[#0f969c3b] to-[#6da5c000] object-contain'} src={Teddy}
                 alt=""/>
          <div className={'absolute bottom-0 w-full text-center text-xl bg-black/50'}>Dart</div>
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link href={'/player/20'} className={'h-340p phone:w-64 relative cursor-pointer flex align-bottom'}>
          <Image className={'hover:bg-gradient-to-br from-[#0f969c3b] to-[#6da5c000] object-contain'} src={Hungary}
                 alt=""/>
          <div className={'absolute bottom-0 w-full text-center text-xl bg-black/50'}>PandaV666</div>
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link href={'/player/10'} className={'h-340p phone:w-64 relative cursor-pointer flex align-bottom'}>
          <Image className={'hover:bg-gradient-to-br from-[#0f969c3b] to-[#6da5c000] object-contain'} src={Cyrus}
                 alt=""/>
          <div className={'absolute bottom-0 w-full text-center text-xl bg-black/50'}>Sewi27</div>
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link href={'/player/14'} className={'h-340p phone:w-64 relative cursor-pointer justify-center flex align-bottom'}>
          <Image className={'hover:bg-gradient-to-br from-[#0f969c3b] to-[#6da5c000] object-contain '} src={Theodora}
                 alt=""/>
          <div className={'absolute bottom-0 w-full text-center text-xl bg-black/50'}>StopIt</div>
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link href={'/player/21'} className={'h-340p phone:w-64 relative cursor-pointer flex align-bottom'}>
          <Image className={'hover:bg-gradient-to-br from-[#0f969c3b] to-[#6da5c000] object-contain phone:object-cover'} src={Montezuma}
                 alt=""/>
          <div className={'absolute bottom-0 w-full text-center text-xl bg-black/50'}>TaDpole</div>
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link href={'/player/13'} className={'h-340p phone:w-64 relative cursor-pointer flex align-bottom'}>
          <Image className={'hover:bg-gradient-to-br from-[#0f969c3b] to-[#6da5c000] object-contain'} src={Victoria}
                 alt=""/>
          <div className={'absolute bottom-0 w-full text-center text-xl bg-black/50'}>TheDrinky</div>
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link href={'/player/9'} className={'h-340p phone:w-64 relative cursor-pointer flex align-bottom'}>
          <Image className={'hover:bg-gradient-to-br from-[#0f969c3b] to-[#6da5c000] object-contain'} src={Tamar}
                 alt=""/>
          <div className={'absolute bottom-0 w-full text-center text-xl bg-black/50'}>_vadya_queen</div>
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link href={'/player/17'} className={'h-340p phone:w-64 relative cursor-pointer flex align-bottom'}>
          <Image className={'hover:bg-gradient-to-br from-[#0f969c3b] to-[#6da5c000] object-contain'} src={Cree}
                 alt=""/>
          <div className={'absolute bottom-0 w-full text-center text-xl bg-black/50'}>Valenthain</div>
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link href={'/player/16'} className={'h-340p phone:w-64 relative cursor-pointer flex align-bottom'}>
          <Image className={'hover:bg-gradient-to-br from-[#0f969c3b] to-[#6da5c000] object-contain'} src={Suleiman}
                 alt=""/>
          <div className={'absolute bottom-0 w-full text-center text-xl bg-black/50'}>Vlllone</div>
        </Link>
      </SwiperSlide>
    </Swiper>
  );
};