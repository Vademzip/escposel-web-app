'use client'
import React, {useEffect} from 'react';
import "./style.css"
import Script from "next/script";

const HistoryTimeline = () => {

  useEffect(() => {
    "use strict";
    // @ts-ignore
    function qs(selector, all = false) {
      return all ? document.querySelectorAll(selector) : document.querySelector(selector);
    }

    const sections = qs('.section', true);
    const timeline = qs('.timeline');
    const line = qs('.line');
    const soonSection = qs('.soon-section')
    if (line && timeline){

    }
    line.style.bottom = `calc(100% - 20px)`;
    let prevScrollY = window.scrollY;
    let up, down;
    let full = false;
    let set = 0;
    const targetY = window.innerHeight * .8;

    function scrollHandler() {
      const {
        scrollY
      } = window;
      up = scrollY < prevScrollY;
      down = !up;
      const timelineRect = timeline.getBoundingClientRect();
      const lineRect = line.getBoundingClientRect(); // const lineHeight = lineRect.bottom - lineRect.top;

      const dist = targetY - timelineRect.top;
      // console.log(dist);

      if (down && !full) {
        set = Math.max(set, dist);
        line.style.bottom = `calc(93% - ${set}px)`;
      }

      if (dist > timeline.offsetHeight - 50  && !full) {
        full = true;
        soonSection.style.opacity = 1
        line.style.bottom = `-50px`;
      }

      // @ts-ignore
      sections.forEach(item => {
        // console.log(item);
        const rect = item.getBoundingClientRect(); //     console.log(rect);

        if (rect.top + item.offsetHeight / 5 < targetY) {
          item.classList.add('show-me');
        }
      }); // console.log(up, down);

      prevScrollY = window.scrollY;
    }

    scrollHandler();
    line.style.display = 'block';
    window.addEventListener('scroll', scrollHandler);

  }, [])


  return (
    <div className={' relative max-w-screen-lg mx-auto mt-24'}>
      <div className={'text-3xl mt-10'}>Как всё начиналось?</div>

      <div className="timeline">
        <div className="line"></div>
        <div className="section">
          <div className="bead"></div>
          <div className="content">
            <h2 className={'tracking-widest'}>Зима 2022</h2>
            <p className={'tracking-widest font-bold'}>Civ World Cup 6 Qualifiers</p>
            <p>История команды началась в далёком 2022 году.. Шестеро крепких игроков Vanilla Civ собрались, чтобы
              испытать свои силы на полях киберспортивных сражений. Здесь была сыграна одна из самых <a
                href={'https://www.youtube.com/watch?v=IXRFxepENoo'}
                className={'text-orange-300'}
                target={'_blank'}
              >
                драматичных игр </a> в истории турнира.
            </p>
            <p className={'italic'}>
              Итоговое место: 5 из 6
            </p>
            <p className={'font-bold'}>
              Состав : _vadya_queen, GrandlySimple, Solo, PAV, redwarcat, Shkodych
            </p>
          </div>
        </div>

        <div className="section">
          <div className="bead"></div>
          <div className="content">
            <h2 className={'tracking-widest'}>Лето - Осень 2022</h2>
            <p className={'tracking-widest font-bold'}>Civ World Cup 7 Qualifiers</p>
            <p>Собравшись за 15 минут до конца регистрации на отборочный турнир, было решено всё таки заявиться на него.
              Также произошёл глобальный ребрендинг, сменился логотип и название команды.
              Новая команда называлась Posel Za Pivas и имела совершенно новый обновленный состав, состоящий из молодых
              и перспективных бойцов, во главе
              с TheDrinky.
            </p>
            <p className={'italic'}>
              Итоговое место: 6 из 8
            </p>
            <p className={'font-bold'}>
              Состав : theDrinky (ValMih), _vadya_queen, 69 без одежды, Valenthtain, Yakovman, Scabrous, papabatia,
              xlapatax
            </p>
          </div>
        </div>

        <div className="section">
          <div className="bead"></div>
          <div className="content">
            <h2 className={'tracking-widest'}>Весна 2023</h2>
            <p className={'tracking-widest font-bold'}>Civ World Cup 8 Qualifiers</p>
            <p> Весной 2023 года произошла очередная попытка забраться на вершину олимпа - попасть в главный турнир.
              В команде кардинально сменился состав, были приглашены многие звездные игроки из распавшейся команды Notice Me Senpai.
              И до осуществления цели не хватило буквально миллиметра, команда долго лидировала в турнирной таблице, но после двух поражений к концу турнира
              свалилось на третье место и была вынуждена играть стыковой матч с командой Easy Katka. К сожалению, игра была проиграна.
            </p>
            <p className={'italic'}>
              Итоговое место: 4 из 6.
            </p>
            <p className={'font-bold'}>
              Состав : Scabrous, Outside, Aleks, Solo, Valenthtain, _vadya_queen, PandaV666, Xlapatax
            </p>
          </div>
        </div>

        <div className="section">
          <div className="bead"></div>
          <div className="content">
            <h2 className={'tracking-widest'}>Лето 2023</h2>
            <p className={'tracking-widest font-bold'}>Civ Premier League 2.5</p>
            <p>Летом 2023 года команда вернулась к истокам и сменила название на Escape Posel.
              Впервые в своей истории, мы решили заглянуть на международный турнир от CPL.
              Начало турнира было очень тяжелым морально, 5 поражений подряд сильно давили на моральную составляющую команды.
              Но после ухода из команды Scabrous'а дела пошли наверх и оставшиеся 6 матчей были окончены победами.
              К сожалению, этого не хватило, чтобы попасть в плей-офф турнира.
            </p>
            <p className={'italic'}>
              Итоговое место: 6 из 12
            </p>
            <p className={'font-bold'}>
              Состав : theDrinky (ValMih), _vadya_queen, Valenthtain, Sewi27, Broccoli, StopIt,
              Dams, Vlllone, TaDpole, PandaV666, Dart
            </p>
          </div>
        </div>
      </div>
      <div className={'text-2xl opacity-0 transition-all duration-700 soon-section'}>
        Всё остальное впереди...
      </div>
    </div>
  );
};

export default HistoryTimeline;