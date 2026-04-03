'use client';

import { useMemo, useState } from 'react';

const ELO_RULES = [
  {
    min: 0,
    max: 2000,
    gamesPer1000: 32,
    soloPricePerGame: 165.125,
  },
  {
    min: 2000,
    max: 3000,
    gamesPer1000: 40,
    soloPricePerGame: 535.425,
  },
];

const PARTY_MULTIPLIER = 1.5;
const EXPRESS_MULTIPLIER = 1.25;
const RUB_PER_USD = 90;

function formatRub(value: number) {
  return new Intl.NumberFormat('ru-RU').format(Math.round(value));
}

function formatUsd(value: number) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

function calculateBoost(
  currentEloRaw: string,
  targetEloRaw: string,
  isParty: boolean,
  isExpress: boolean
) {
  const currentElo = Number(currentEloRaw);
  const targetElo = Number(targetEloRaw);

  if (!Number.isFinite(currentElo) || !Number.isFinite(targetElo)) return null;
  if (targetElo <= currentElo) return null;

  let basePrice = 0;
  let pointer = currentElo;

  while (pointer < targetElo) {
    const rule = ELO_RULES.find(
      (item) => pointer >= item.min && pointer < item.max
    );

    if (!rule) break;

    const segmentEnd = Math.min(targetElo, rule.max);
    const eloDelta = segmentEnd - pointer;
    const segmentGames = (eloDelta / 1000) * rule.gamesPer1000;

    let pricePerGame = rule.soloPricePerGame;

    if (isParty) {
      pricePerGame *= PARTY_MULTIPLIER;
    }

    basePrice += segmentGames * pricePerGame;
    pointer = segmentEnd;
  }

  if (isExpress) {
    basePrice *= EXPRESS_MULTIPLIER;
  }

  const roundedBasePrice = Math.round(basePrice);
  const priceUsd = Math.round((roundedBasePrice / RUB_PER_USD) * 100) / 100;

  return {
    currentElo,
    targetElo,
    roundedBasePrice,
    priceUsd,
  };
}

export default function FastestBoostWebsite() {
  const [service, setService] = useState('Faceit Elo Boost');
  const [currentElo, setCurrentElo] = useState('1200');
  const [targetElo, setTargetElo] = useState('2000');
  const [telegram, setTelegram] = useState('');
  const [isParty, setIsParty] = useState(false);
  const [isExpress, setIsExpress] = useState(false);

  const isEloService = service === 'Faceit Elo Boost';

  const result = useMemo(() => {
    if (!isEloService) return null;
    return calculateBoost(currentElo, targetElo, isParty, isExpress);
  }, [currentElo, targetElo, isParty, isExpress, isEloService]);

  const services = [
    {
      title: 'Faceit Elo Boost',
      price: 'automatic calculator',
      text: 'Classic Elo boosting with automatic calculation based on your current and desired Elo.',
    },
    {
      title: 'Faceit Level Boost',
      price: 'price on request',
      text: 'Upgrade your account from the current Faceit level to the target level you want.',
    },
    {
      title: 'Faceit Wins Boost',
      price: 'price on request',
      text: 'Order a fixed number of wins for a simple and clear boost option.',
    },
    {
      title: 'Faceit Stats Boost',
      price: 'price on request',
      text: 'Focused boost option for better account stats like KD, average kills and overall profile.',
    },
    {
      title: 'Duo Queue / Party Boost',
      price: 'price on request',
      text: 'Play together with a booster in party format for a more comfortable experience.',
    },
    {
      title: 'Faceit Coaching',
      price: 'price on request',
      text: 'One-on-one help for players who want to improve mechanics, aim and decision making.',
    },
  ];

  const advantages = [
    'CS2 and Faceit focused service',
    'Experienced high Elo boosters',
    'Fast same-day start',
    'Automatic Elo calculator',
    '24/7 communication in Telegram',
    'Manual order review before start',
  ];

  const steps = [
    {
      title: 'Choose service',
      text: 'Select the service you need and send your order in a few clicks.',
    },
    {
      title: 'Use calculator',
      text: 'The calculator works for Faceit Elo Boost. Other services are priced manually.',
    },
    {
      title: 'Pay for order',
      text: 'After confirmation you receive payment details and we start the order.',
    },
    {
      title: 'Track progress',
      text: 'Stay in touch through Telegram and receive updates while the order is in progress.',
    },
  ];

  const reviews = [
    {
      name: 'Maks',
      text: 'Fast response, clean communication and the order started the same day.',
    },
    {
      name: 'Artem',
      text: 'Simple website, easy order form and no unnecessary steps.',
    },
    {
      name: 'Nikita',
      text: 'Good service for Faceit players who just want quick results.',
    },
  ];

  const telegramMessage = result
    ? `Hello, I want to order ${isExpress ? 'Express ' : ''}${isParty ? 'Party ' : ''}${service} from ${result.currentElo} Elo to ${result.targetElo} Elo. Price: ${formatRub(result.roundedBasePrice)} RUB / ${formatUsd(result.priceUsd)} USD.`
    : `Hello, I want to order ${service}.`;

  return (
    <div className="min-h-screen bg-[#070707] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <div className="text-2xl font-black tracking-tight md:text-3xl">
              FASTESTBOOST
            </div>
            <div className="text-xs uppercase tracking-[0.25em] text-zinc-400">
              CS2 Faceit Service
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
            <a href="#services" className="transition hover:text-white">
              Services
            </a>
            <a href="#calculator" className="transition hover:text-white">
              Calculator
            </a>
            <a href="#how" className="transition hover:text-white">
              How it works
            </a>
            <a href="#order" className="transition hover:text-white">
              Order
            </a>
          </nav>

          <a
            href="#calculator"
            className="rounded-2xl bg-violet-600 px-4 py-2 text-sm font-semibold shadow-lg shadow-violet-600/30 transition hover:scale-105 hover:bg-violet-500"
          >
            Calculate now
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.32),transparent_25%),radial-gradient(circle_at_left,rgba(255,255,255,0.08),transparent_20%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
          <div className="flex flex-col justify-center">
            <div className="mb-4 inline-flex w-fit rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-200">
              Fast CS2 Faceit orders
            </div>
            <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
              Fast and simple CS2 Faceit boosting website.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-300 md:text-lg">
              FastestBoost is built for players who want a clean and easy order
              flow: choose service, calculate the price, send details, pay, and
              get started.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#calculator"
                className="rounded-2xl bg-violet-600 px-6 py-3 font-semibold shadow-lg shadow-violet-600/30 transition hover:scale-105 hover:bg-violet-500"
              >
                Open calculator
              </a>
              <a
                href="#services"
                className="rounded-2xl border border-white/15 px-6 py-3 font-semibold text-zinc-200 transition hover:border-white/30 hover:bg-white/5"
              >
                View services
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
              {[
                'High Elo boosters',
                'Fast response',
                'Telegram support',
                'Automatic price',
                'Faceit focused',
                'Same day start',
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div id="calculator" className="flex items-center justify-center">
            <div className="w-full max-w-xl rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/40 backdrop-blur">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold">Faceit calculator</div>
                  <div className="text-sm text-zinc-400">
                    Price in RUB and USD
                  </div>
                </div>
                <div className="rounded-xl bg-violet-500/15 px-3 py-1 text-xs font-semibold text-violet-200">
                  {!isEloService
                    ? 'Manual Price'
                    : isExpress
                      ? 'Express'
                      : isParty
                        ? 'Party'
                        : 'Solo'}
                </div>
              </div>

              <div className="grid gap-4">
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none"
                >
                  <option>Faceit Elo Boost</option>
                  <option>Faceit Level Boost</option>
                  <option>Faceit Wins Boost</option>
                  <option>Faceit Stats Boost</option>
                  <option>Duo Queue / Party Boost</option>
                  <option>Faceit Coaching</option>
                </select>

                {isEloService ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none"
                        placeholder="Current Elo"
                        value={currentElo}
                        onChange={(e) => setCurrentElo(e.target.value)}
                      />
                      <input
                        className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none"
                        placeholder="Desired Elo"
                        value={targetElo}
                        onChange={(e) => setTargetElo(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setIsParty(false)}
                        className={`group relative overflow-hidden rounded-2xl border px-4 py-4 text-sm font-bold transition ${
                          !isParty
                            ? 'border-white/20 bg-gradient-to-br from-zinc-700 to-zinc-900 text-white shadow-lg'
                            : 'border-white/10 bg-black/30 text-zinc-400 hover:bg-white/5'
                        }`}
                      >
                        <div className="text-base">Solo</div>
                        <div className="mt-1 text-xs font-medium opacity-80">
                          Standard price
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsParty(true)}
                        className={`group relative overflow-hidden rounded-2xl border px-4 py-4 text-sm font-bold transition ${
                          isParty
                            ? 'border-violet-400/50 bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white shadow-lg shadow-violet-600/30'
                            : 'border-white/10 bg-black/30 text-zinc-400 hover:bg-white/5'
                        }`}
                      >
                        <div className="text-base">Party</div>
                        <div className="mt-1 text-xs font-medium opacity-80">
                          1.5x multiplier
                        </div>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsExpress((prev) => !prev)}
                      className={`relative overflow-hidden rounded-2xl border px-5 py-4 text-left transition ${
                        isExpress
                          ? 'border-emerald-400/50 bg-gradient-to-r from-emerald-500 to-lime-500 text-white shadow-lg shadow-emerald-500/25'
                          : 'border-white/10 bg-black/30 text-zinc-300 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="text-base font-bold">Express Boost</div>
                          <div className="mt-1 text-xs opacity-80">
                            Priority order +25% to price
                          </div>
                        </div>
                        <div
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            isExpress
                              ? 'bg-white/20 text-white'
                              : 'bg-white/5 text-zinc-400'
                          }`}
                        >
                          {isExpress ? 'ON' : 'OFF'}
                        </div>
                      </div>
                    </button>
                  </>
                ) : (
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-5 text-sm text-zinc-300">
                    <div className="text-base font-semibold text-white">
                      Manual pricing
                    </div>
                    <div className="mt-2 text-zinc-400">
                      This service is priced manually. Click the Telegram button
                      below and send your request.
                    </div>
                  </div>
                )}

                <input
                  className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none"
                  placeholder="Your Telegram"
                  value={telegram}
                  onChange={(e) => setTelegram(e.target.value)}
                />
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-zinc-300">
                {isEloService ? (
                  result ? (
                    <div className="space-y-2">
                      <div className="text-base font-semibold text-white">
                        {result.currentElo} elo - {result.targetElo} elo
                      </div>
                      <div>
                        Price RUB:{' '}
                        <span className="text-white">
                          {formatRub(result.roundedBasePrice)}
                        </span>
                      </div>
                      <div>
                        Price USD:{' '}
                        <span className="text-violet-300">
                          {formatUsd(result.priceUsd)}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-zinc-400">
                      Enter valid current and desired Elo values. Desired Elo must
                      be higher than current Elo.
                    </div>
                  )
                ) : (
                  <div className="text-zinc-400">
                    Price for this service is calculated manually.
                  </div>
                )}
              </div>

              <a
                href={`https://t.me/wqe12e1?text=${encodeURIComponent(
                  `${telegram ? `My telegram: ${telegram}. ` : ''}${telegramMessage}`
                )}`}
                className="mt-5 block rounded-2xl bg-violet-600 px-4 py-3 text-center font-semibold transition hover:bg-violet-500"
              >
                Continue in Telegram
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 max-w-2xl">
          <div className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
            Services
          </div>
          <h2 className="text-3xl font-black md:text-4xl">Main services</h2>
          <p className="mt-4 text-zinc-400">
            Built around the most common CS2 Faceit requests so the customer can
            choose quickly and place an order without confusion.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((serviceItem) => (
            <div
              key={serviceItem.title}
              className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-lg shadow-black/20"
            >
              <div className="text-xl font-bold">{serviceItem.title}</div>
              <div className="mt-2 text-sm font-semibold text-violet-300">
                {serviceItem.price}
              </div>
              <p className="mt-4 text-sm leading-6 text-zinc-400">
                {serviceItem.text}
              </p>
              <a
                href="#calculator"
                className="mt-6 inline-flex rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:scale-105"
              >
                Select
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <div className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
                Why FastestBoost
              </div>
              <h2 className="text-3xl font-black md:text-4xl">
                A simple website that focuses on orders, not on extra complexity.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {advantages.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-sm text-zinc-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="how" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 max-w-2xl">
          <div className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
            How it works
          </div>
          <h2 className="text-3xl font-black md:text-4xl">
            Simple order flow
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-sm font-bold">
                {index + 1}
              </div>
              <div className="text-lg font-bold">{step.title}</div>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="order" className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <div className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
              Order
            </div>
            <h2 className="text-3xl font-black md:text-4xl">
              Ready to launch FastestBoost?
            </h2>
            <p className="mt-4 max-w-xl text-zinc-400">
              Use the calculator, send the details through Telegram, and start
              the order without extra steps.
            </p>

            <div className="mt-8 space-y-3 text-sm text-zinc-300">
              <div>Telegram: @wqe12e1</div>
              <div>Payments: USDT / Crypto</div>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-5 text-xl font-bold">Contact / payment block</div>
            <div className="grid gap-4">
              <a
                href="https://t.me/wqe12e1"
                className="rounded-2xl bg-violet-600 px-5 py-3 text-center font-semibold transition hover:bg-violet-500"
              >
                Open Telegram
              </a>
              <button className="rounded-2xl border border-white/10 px-5 py-3 font-semibold text-zinc-200 transition hover:bg-white/5">
                Pay with Crypto
              </button>
            </div>
            <div className="mt-4 text-xs leading-6 text-zinc-500">
              Replace the payment button with your real wallet or checkout link
              later.
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="border-t border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-10 max-w-2xl">
            <div className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
              Reviews
            </div>
            <h2 className="text-3xl font-black md:text-4xl">
              Social proof block
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {reviews.map((review) => (
              <div
                key={review.name}
                className="rounded-[28px] border border-white/10 bg-black/30 p-6"
              >
                <div className="text-lg font-bold">{review.name}</div>
                <p className="mt-4 text-sm leading-6 text-zinc-400">
                  “{review.text}”
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-zinc-500">
        © 2026 FastestBoost. CS2 Faceit service landing page.
      </footer>
    </div>
  );
}