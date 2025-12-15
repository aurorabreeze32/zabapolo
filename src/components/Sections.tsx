import Bubble from "@/components/Bubble";

export function WhatIs() {
  return (
    <section className="section">
      <h2 className="h2 mb-3">Что это за занятия</h2>
      <p className="p">
        Мини-водное поло — это игровой формат без силового контакта: учимся держаться на воде, правильно дышать, ориентироваться и взаимодействовать в команде. Занимаемся в мелком бассейне под контролем тренера.
      </p>
    </section>
  );
}

export function Groups() {
  return (
    <section className="section" id="groups">
      <h2 className="h2 mb-4">Группы и формат</h2>
      <ul className="space-y-3">
        <li><Bubble size="md" tail="left">Малые группы: 3–5 детей — внимание и безопасность на первом месте.</Bubble></li>
        <li><Bubble size="md" tail="right">4–5 лет — знакомство с водой и мячом, простые правила.</Bubble></li>
        <li><Bubble size="md" tail="left">5–6 лет — больше командных заданий, броски и координация.</Bubble></li>
        <li><Bubble size="md" tail="right">7–8 лет — мини-распасовки, простые комбинации, выносливость.</Bubble></li>
      </ul>
    </section>
  );
}

export function Trial() {
  return (
    <section className="section">
      <h2 className="h2 mb-3">Пробное по выходным</h2>
      <p className="p mb-4">
        Суббота и воскресенье — приглашаем на пробное занятие: поиграем в мини-водное поло со сверстниками в мелком бассейне и подберём комфортную группу.
      </p>
      <a className="btn btn-primary" href="#signup">Записаться на пробное</a>
    </section>
  );
}

export function Safety() {
  return (
    <section className="section">
      <h2 className="h2 mb-3">Безопасность</h2>
      <ul className="list-disc pl-5 space-y-2 p">
        <li>Мелкий бассейн, тренер рядом, группа 3–5 детей.</li>
        <li>Мягкие мячи и пенки, без силового контакта.</li>
        <li>Чёткие правила поведения, спокойный темп и позитивная дисциплина.</li>
      </ul>
    </section>
  );
}

export function Bring() {
  return (
    <section className="section">
      <h2 className="h2 mb-3">Что взять с собой</h2>
      <p className="p">Купальник/плавки, шапочку, очки, сланцы, полотенце. По желанию — беруши/зажим для носа. Остальное — у нас.</p>
    </section>
  );
}

export function Coach() {
  return (
    <section className="section">
      <h2 className="h2 mb-3">О тренере</h2>
      <p className="p">Я — [Имя Фамилия], мастер спорта по водному поло. Опыт работы с детьми от 4 лет. Через игру и команду ребёнок быстрее дружит с водой, учится дышать и увереннее держится на мелкой глубине. Безопасность и радость — на первом месте.</p>
    </section>
  );
}

export function Contacts() {
  return (
    <section className="section" id="signup">
      <h2 className="h2 mb-3">Контакты и запись</h2>
      <div className="space-y-2 p">
        <div>WhatsApp: +48 XXX XXX XXX</div>
        <div>E-mail: trainer@example.com</div>
        <div>Instagram: @username</div>
      </div>
      <div className="mt-4 flex gap-2">
        <a className="btn btn-primary" href="https://wa.me/48XXXXXXXXX" target="_blank">Написать в WhatsApp</a>
        <a className="btn btn-outline" href="#">Узнать расписание</a>
      </div>
    </section>
  );
}
