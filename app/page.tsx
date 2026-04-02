export default function FastestBoostWebsite() {
  const services = [
    {
      title: 'Faceit Elo Boost',
      price: 'from $2 / match',
      text: 'Fast Elo boosting for players who want to climb without wasting time.',
    },
    {
      title: 'Faceit Level Boost',
      price: 'custom price',
      text: 'Level up your Faceit account from your current level to your target level.',
    },
    {
      title: 'Duo Queue',
      price: 'from $4 / match',
      text: 'Play together with a booster for a safer and more comfortable experience.',
    },
    {
      title: 'Placement Matches',
      price: 'custom price',
      text: 'Reliable help for important placement or calibration matches.',
    },
  ];

  const advantages = [
    'CS2 and Faceit focused service',
    'Experienced high Elo boosters',
    'Fast same-day start',
    'Simple order process',
    '24/7 communication in Telegram',
    'Manual order review before start',
  ];

  const steps = [
    {
      title: 'Choose service',
      text: 'Select the service you need: Elo Boost, Level Boost, Duo Queue or Placement Matches.',
    },
    {
      title: 'Fill the form',
      text: 'Send your current Elo, target Elo, Faceit nickname and Telegram contact.',
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

  return (
    <div className="min-h-screen bg-[#070707] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <div className="text-2xl font-black tracking-tight md:text-3xl">FASTESTBOOST</div>
            <div className="text-xs uppercase tracking-[0.25em] text-zinc-400">CS2 Faceit Service</div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
            <a href="#services" className="transition hover:text-white">Services</a>
            <a href="#how" className="transition hover:text-white">How it works</a>
            <a href="#reviews" className="transition hover:text-white">Reviews</a>
            <a href="#order" className="transition hover:text-white">Order</a>
          </nav>

          <a
            href="#order"
            className="rounded-2xl bg-violet-600 px-4 py-2 text-sm font-semibold shadow-lg shadow-violet-600/30 transition hover:scale-105 hover:bg-violet-500"
          >
            Order now
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
              FastestBoost is built for players who want a clean and easy order flow: choose service, send details, pay, and get started.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#order"
                className="rounded-2xl bg-violet-600 px-6 py-3 font-semibold shadow-lg shadow-violet-600/30 transition hover:scale-105 hover:bg-violet-500"
              >
                Start order
              </a>
              <a
                href="#services"
                className="rounded-2xl border border-white/15 px-6 py-3 font-semibold text-zinc-200 transition hover:border-white/30 hover:bg-white/5"
              >
                View services
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
              {['High Elo boosters', 'Fast response', 'Telegram support', 'Simple payment', 'Faceit focused', 'Same day start'].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full max-w-xl rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/40 backdrop-blur">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold">Quick order</div>
                  <div className="text-sm text-zinc-400">Simple order block for direct conversion</div>
                </div>
                <div className="rounded-xl bg-violet-500/15 px-3 py-1 text-xs font-semibold text-violet-200">
                  Faceit
                </div>
              </div>

              <div className="grid gap-4">
                <select className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none">
                  <option>Choose service</option>
                  <option>Faceit Elo Boost</option>
                  <option>Faceit Level Boost</option>
                  <option>Duo Queue</option>
                  <option>Placement Matches</option>
                </select>
                <input className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none" placeholder="Current Elo" />
                <input className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none" placeholder="Desired Elo" />
                <input className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none" placeholder="Faceit nickname" />
                <input className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none" placeholder="Telegram" />
                <button className="rounded-2xl bg-violet-600 px-4 py-3 font-semibold transition hover:bg-violet-500">
                  Continue to payment
                </button>
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-zinc-300">
                Replace this button with your Telegram link, crypto payment link, PayPal, or a Tilda form later.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 max-w-2xl">
          <div className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">Services</div>
          <h2 className="text-3xl font-black md:text-4xl">Main services</h2>
          <p className="mt-4 text-zinc-400">
            Built around the most common CS2 Faceit requests so the customer can choose quickly and place an order without confusion.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <div key={service.title} className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-lg shadow-black/20">
              <div className="text-xl font-bold">{service.title}</div>
              <div className="mt-2 text-sm font-semibold text-violet-300">{service.price}</div>
              <p className="mt-4 text-sm leading-6 text-zinc-400">{service.text}</p>
              <a href="#order" className="mt-6 inline-flex rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:scale-105">
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
              <div className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">Why FastestBoost</div>
              <h2 className="text-3xl font-black md:text-4xl">A simple website that focuses on orders, not on extra complexity.</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {advantages.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-sm text-zinc-200">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="how" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 max-w-2xl">
          <div className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">How it works</div>
          <h2 className="text-3xl font-black md:text-4xl">Simple order flow</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-sm font-bold">
                {index + 1}
              </div>
              <div className="text-lg font-bold">{step.title}</div>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="reviews" className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-10 max-w-2xl">
            <div className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">Reviews</div>
            <h2 className="text-3xl font-black md:text-4xl">Social proof block</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {reviews.map((review) => (
              <div key={review.name} className="rounded-[28px] border border-white/10 bg-black/30 p-6">
                <div className="text-lg font-bold">{review.name}</div>
                <p className="mt-4 text-sm leading-6 text-zinc-400">“{review.text}”</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="order" className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <div className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">Order</div>
            <h2 className="text-3xl font-black md:text-4xl">Ready to launch FastestBoost?</h2>
            <p className="mt-4 max-w-xl text-zinc-400">
              This section is ready for your payment link, Telegram username, crypto wallet or checkout button. You can keep everything simple and still have a professional landing page.
            </p>

            <div className="mt-8 space-y-3 text-sm text-zinc-300">
              <div>Telegram: @yourtelegram</div>
              <div>Discord: yourdiscord#0000</div>
              <div>Payments: USDT / PayPal / Crypto</div>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-5 text-xl font-bold">Contact / payment block</div>
            <div className="grid gap-4">
              <a href="https://t.me/yourtelegram" className="rounded-2xl bg-violet-600 px-5 py-3 text-center font-semibold transition hover:bg-violet-500">
                Open Telegram
              </a>
              <button className="rounded-2xl border border-white/10 px-5 py-3 font-semibold text-zinc-200 transition hover:bg-white/5">
                Pay with Crypto
              </button>
              <button className="rounded-2xl border border-white/10 px-5 py-3 font-semibold text-zinc-200 transition hover:bg-white/5">
                Pay with PayPal
              </button>
            </div>
            <div className="mt-4 text-xs leading-6 text-zinc-500">
              Replace the buttons with your real links later.
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-zinc-500">
        © 2026 FastestBoost. CS2 Faceit service landing page.
      </footer>
    </div>
  );
}
