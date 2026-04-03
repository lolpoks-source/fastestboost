'use client';

import { useMemo, useState } from 'react';
import { Trophy, BarChart3, Zap } from 'lucide-react';

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

function calcEloBasePrice(currentEloRaw: string, targetEloRaw: string, isParty: boolean) {
  const currentElo = Number(currentEloRaw);
  const targetElo = Number(targetEloRaw);

  if (!Number.isFinite(currentElo) || !Number.isFinite(targetElo)) return null;
  if (targetElo <= currentElo) return null;

  let basePrice = 0;
  let pointer = currentElo;

  while (pointer < targetElo) {
    const rule = ELO_RULES.find((item) => pointer >= item.min && pointer < item.max);
    if (!rule) break;

    const segmentEnd = Math.min(targetElo, rule.max);
    const eloDelta = segmentEnd - pointer;
    const segmentGames = (eloDelta / 1000) * rule.gamesPer1000;
    const pricePerGame = isParty ? rule.soloPricePerGame * PARTY_MULTIPLIER : rule.soloPricePerGame;

    basePrice += segmentGames * pricePerGame;
    pointer = segmentEnd;
  }

  return Math.round(basePrice);
}

function calcWinsBasePrice(currentEloRaw: string, winsCountRaw: string, isParty: boolean) {
  const currentElo = Number(currentEloRaw);
  const winsCount = Number(winsCountRaw);

  if (!Number.isFinite(currentElo) || !Number.isFinite(winsCount)) return null;
  if (winsCount <= 0) return null;

  let pricePerWin = currentElo < 2000 ? 165.125 : 535.425;
  if (isParty) {
    pricePerWin *= PARTY_MULTIPLIER;
  }

  return Math.round(winsCount * pricePerWin);
}

export default function FastestBoostWebsite() {
  const [service, setService] = useState('By Wins');
  const [currentElo, setCurrentElo] = useState('1200');
  const [targetElo, setTargetElo] = useState('2000');
  const [winsCount, setWinsCount] = useState('6');
  const [telegram, setTelegram] = useState('');
  const [boostType, setBoostType] = useState<'solo' | 'party'>('solo');
  const [specificBooster, setSpecificBooster] = useState('First Available');
  const [options, setOptions] = useState({
    vipPriority: false,
    streaming: false,
    increaseKD: false,
    appearOffline: false,
    premiumQueue: false,
    expressMode: false,
    noPartyMembers: false,
    noVoiceInGame: false,
  });

  const isEloService = service === 'By Elo';
  const isWinsService = service === 'By Wins';
  const isCalcService = isEloService || isWinsService;
  const eloDiff = Math.max(0, Number(targetElo || 0) - Number(currentElo || 0));

  const pricing = useMemo(() => {
    let basePrice: number | null = null;

    if (isEloService) {
      basePrice = calcEloBasePrice(currentElo, targetElo, boostType === 'party');
    } else if (isWinsService) {
      basePrice = calcWinsBasePrice(currentElo, winsCount, boostType === 'party');
    }

    if (basePrice === null) return null;

    let finalMultiplier = 1;
    if (options.vipPriority) finalMultiplier += 0.2;
    if (options.streaming) finalMultiplier += 0.1;
    if (options.increaseKD) finalMultiplier += 0.2;
    if (options.premiumQueue) finalMultiplier += 0.5;
    if (options.expressMode) finalMultiplier += 0.5;
    if (options.noPartyMembers) finalMultiplier += 0.5;
    if (options.noVoiceInGame) finalMultiplier += 0.1;

    const finalPrice = Math.round(basePrice * finalMultiplier);
    const finalUsd = finalPrice / RUB_PER_USD;

    return {
      basePrice,
      finalPrice,
      finalUsd,
    };
  }, [currentElo, targetElo, winsCount, boostType, options, isEloService, isWinsService]);

  const telegramMessage = pricing
    ? `Hello, I want to order ${service}${isEloService ? ` from ${currentElo} Elo to ${targetElo} Elo` : ''}${isWinsService ? ` with ${winsCount} net wins from current Elo ${currentElo}` : ''}. Boost type: ${boostType}. Final price: ${formatRub(pricing.finalPrice)} RUB / ${formatUsd(pricing.finalUsd)} USD. Telegram: ${telegram || 'not specified'}.`
    : `Hello, I want to order ${service}. Telegram: ${telegram || 'not specified'}.`;

  const services = [
    { label: 'By Elo', icon: Trophy },
    { label: 'By Wins', icon: Zap },
  ];

  const toggleOption = (key: keyof typeof options) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const winsNumber = Math.max(1, Number(winsCount) || 1);

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <section className="relative overflow-hidden border-b border-white/10 bg-[#1a1a1a]">
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-red-900 via-red-600 to-red-300 opacity-90" />
        <div className="relative mx-auto max-w-7xl px-6 py-12 md:py-16">
          <div className="mb-8 text-center">
            <div className="text-4xl font-black tracking-tight text-white md:text-6xl">FASTESTBOOST</div>
            <div className="mt-2 text-sm uppercase tracking-[0.3em] text-zinc-300">CS2 Faceit Calculator</div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.7fr_0.95fr]">
            <div className="rounded-[32px] border border-white/10 bg-[#ececec] p-5 text-black shadow-2xl shadow-black/30">
              <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-2">
                {services.map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setService(label)}
                    className="group rounded-[28px]"
                  >
                    <div className="mb-3 flex justify-center">
                      <div className={`flex h-20 w-20 items-center justify-center rounded-full border transition ${
                        service === label
                          ? 'border-red-200 bg-white text-red-600 shadow-lg'
                          : 'border-zinc-200 bg-[#f3f3f3] text-red-500'
                      }`}>
                        <Icon size={38} strokeWidth={2.5} />
                      </div>
                    </div>
                    <div className={`rounded-2xl border px-4 py-4 text-center text-sm font-bold transition ${
                      service === label
                        ? 'border-red-600 bg-red-600 text-white shadow-lg'
                        : 'border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-100'
                    }`}>
                      {label}
                    </div>
                  </button>
                ))}
              </div>

              {isEloService ? (
                <div className="space-y-8">
                  <div>
                    <div className="mb-5 flex items-center gap-3 text-2xl font-bold text-zinc-900">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-200 text-xl">1</span>
                      <span>Select Current and Desired Elo</span>
                    </div>

                    <div className="grid items-end gap-6 md:grid-cols-[1fr_auto_1fr]">
                      <div className="rounded-[28px] border border-zinc-300 bg-white p-5 text-center shadow-sm">
                        <div className="mb-3 text-xl font-bold text-red-600">Current Elo</div>
                        <input
                          type="number"
                          value={currentElo}
                          onChange={(e) => setCurrentElo(e.target.value)}
                          className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-4 text-center text-4xl font-black outline-none"
                        />
                      </div>

                      <div className="pb-8 text-center">
                        <div className="text-5xl font-black text-red-600">»</div>
                        <div className="mt-3 inline-flex rounded-full border-2 border-red-500 px-4 py-2 text-lg font-bold text-red-600">
                          +{formatRub(eloDiff)} Elo
                        </div>
                      </div>

                      <div className="rounded-[28px] border border-zinc-300 bg-white p-5 text-center shadow-sm">
                        <div className="mb-3 text-xl font-bold text-red-600">Desired Elo</div>
                        <input
                          type="number"
                          value={targetElo}
                          onChange={(e) => setTargetElo(e.target.value)}
                          className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-4 text-center text-4xl font-black outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="mb-5 flex items-center gap-3 text-2xl font-bold text-zinc-900">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-200 text-xl">2</span>
                      <span>Choose Boost Type</span>
                    </div>

                    <div className="flex max-w-xl overflow-hidden rounded-full bg-zinc-200 p-1 shadow-inner">
                      <button
                        type="button"
                        onClick={() => setBoostType('solo')}
                        className={`flex-1 rounded-full px-6 py-4 text-lg font-bold transition ${
                          boostType === 'solo'
                            ? 'bg-red-600 text-white shadow-lg'
                            : 'text-zinc-500 hover:text-zinc-900'
                        }`}
                      >
                        Solo / Pilot
                      </button>
                      <button
                        type="button"
                        onClick={() => setBoostType('party')}
                        className={`flex-1 rounded-full px-6 py-4 text-lg font-bold transition ${
                          boostType === 'party'
                            ? 'bg-red-600 text-white shadow-lg'
                            : 'text-zinc-500 hover:text-zinc-900'
                        }`}
                      >
                        Duo / Lobby
                      </button>
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-zinc-300 bg-white p-5 shadow-sm">
                    <div className="mb-3 text-lg font-bold text-zinc-900">Your Telegram</div>
                    <input
                      value={telegram}
                      onChange={(e) => setTelegram(e.target.value)}
                      placeholder="@yourtelegram"
                      className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-4 text-lg outline-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div>
                    <div className="mb-5 flex items-center gap-3 text-2xl font-bold text-zinc-900">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-200 text-xl">1</span>
                      <span>Select Current Elo and Desired Wins</span>
                    </div>

                    <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
                      <div className="rounded-[28px] border border-zinc-300 bg-white p-5 shadow-sm">
                        <div className="mb-4 text-center text-xl font-bold text-red-600">Current Elo</div>
                        <input
                          type="number"
                          value={currentElo}
                          onChange={(e) => setCurrentElo(e.target.value)}
                          className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-4 text-center text-4xl font-black outline-none"
                        />
                      </div>

                      <div className="rounded-[28px] border border-zinc-300 bg-white p-5 text-center shadow-sm">
                        <div className="mb-4 text-xl font-bold text-red-600">Net Wins</div>
                        <div className="text-5xl font-black text-red-600">{winsNumber}</div>
                      </div>
                    </div>

                    <div className="mt-6 rounded-[28px] border border-zinc-300 bg-white p-6 shadow-sm">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="text-xl font-bold text-zinc-900">Wins slider</div>
                        <div className="inline-flex rounded-full border-2 border-red-500 px-4 py-2 text-lg font-bold text-red-600">
                          {winsNumber} Wins
                        </div>
                      </div>

                      <input
                        type="range"
                        min="1"
                        max="30"
                        value={winsNumber}
                        onChange={(e) => setWinsCount(e.target.value)}
                        className="h-3 w-full cursor-pointer appearance-none rounded-full bg-red-500 accent-red-600"
                      />

                      <div className="mt-3 flex justify-between text-sm font-medium text-zinc-500">
                        <span>1</span>
                        <span>10</span>
                        <span>20</span>
                        <span>30</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="mb-5 flex items-center gap-3 text-2xl font-bold text-zinc-900">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-200 text-xl">2</span>
                      <span>Choose Boost Type</span>
                    </div>

                    <div className="flex max-w-xl overflow-hidden rounded-full bg-zinc-200 p-1 shadow-inner">
                      <button
                        type="button"
                        onClick={() => setBoostType('solo')}
                        className={`flex-1 rounded-full px-6 py-4 text-lg font-bold transition ${
                          boostType === 'solo'
                            ? 'bg-red-600 text-white shadow-lg'
                            : 'text-zinc-500 hover:text-zinc-900'
                        }`}
                      >
                        Solo / Pilot
                      </button>
                      <button
                        type="button"
                        onClick={() => setBoostType('party')}
                        className={`flex-1 rounded-full px-6 py-4 text-lg font-bold transition ${
                          boostType === 'party'
                            ? 'bg-red-600 text-white shadow-lg'
                            : 'text-zinc-500 hover:text-zinc-900'
                        }`}
                      >
                        Duo / Lobby
                      </button>
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-zinc-300 bg-white p-5 shadow-sm">
                    <div className="mb-3 text-lg font-bold text-zinc-900">Your Telegram</div>
                    <input
                      value={telegram}
                      onChange={(e) => setTelegram(e.target.value)}
                      placeholder="@yourtelegram"
                      className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-4 text-lg outline-none"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-[32px] border border-white/10 bg-[#ececec] p-5 text-black shadow-2xl shadow-black/30">
              <div className="mb-5 flex items-center gap-3 text-2xl font-bold text-zinc-900">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-200 text-xl">3</span>
                <span>Checkout</span>
              </div>

              <div className="rounded-2xl border border-zinc-300 bg-white p-4 shadow-sm">
                <div className="text-lg font-black text-zinc-900">{service}</div>
                <div className="mt-1 text-sm font-semibold text-zinc-500">
                  {boostType === 'solo' ? 'Solo / Pilot' : 'Duo / Lobby'}
                </div>

                <div className="mt-4 space-y-3">
                  {[
                    ['VIP Priority (+20%)', 'vipPriority'],
                    ['Streaming (+10%)', 'streaming'],
                    ['Increase K/D (+20%)', 'increaseKD'],
                    ['Appear Offline (Free)', 'appearOffline'],
                    ['Premium Queue (+50%)', 'premiumQueue'],
                    ['Express Mode (+50%)', 'expressMode'],
                    ['No Party Members (+50%)', 'noPartyMembers'],
                    ['No Voice In-Game (+10%)', 'noVoiceInGame'],
                  ].map(([label, key]) => (
                    <div key={key} className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3">
                      <div className="text-sm font-medium text-zinc-800">{label}</div>
                      <button
                        type="button"
                        onClick={() => toggleOption(key as keyof typeof options)}
                        className={`relative h-8 w-16 rounded-full transition ${
                          options[key as keyof typeof options] ? 'bg-red-500' : 'bg-zinc-300'
                        }`}
                      >
                        <span
                          className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition ${
                            options[key as keyof typeof options] ? 'left-9' : 'left-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3">
                  <div className="mb-2 text-sm font-medium text-zinc-800">Specific Booster</div>
                  <select
                    value={specificBooster}
                    onChange={(e) => setSpecificBooster(e.target.value)}
                    className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none"
                  >
                    <option>First Available</option>
                    <option>Top Booster</option>
                    <option>Trusted Booster</option>
                  </select>
                </div>

                <div className="mt-6 border-t border-zinc-200 pt-5 text-center">
                  {pricing ? (
                    <>
                      <div className="text-lg font-medium text-zinc-700">Final Price</div>
                      <div className="mt-2 text-4xl font-black text-red-600">₽{formatRub(pricing.finalPrice)}</div>
                      <div className="mt-2 text-lg font-semibold text-zinc-500">${formatUsd(pricing.finalUsd)}</div>
                    </>
                  ) : null}

                  <a
                    href={`https://t.me/wqe12e1?text=${encodeURIComponent(telegramMessage)}`}
                    className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-red-600 px-6 py-4 text-xl font-black text-white shadow-lg transition hover:bg-red-500"
                  >
                    Checkout
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
