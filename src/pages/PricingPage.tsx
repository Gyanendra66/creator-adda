import { motion } from "framer-motion";
import { Check, Zap, Crown, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "Perfect for creators just getting started",
    icon: Zap,
    iconBg: "bg-neon-cyan/10",
    iconColor: "text-neon-cyan",
    features: [
      "Create your profile",
      "Browse & apply to 5 jobs/month",
      "Basic portfolio (3 items)",
      "Community access",
      "Standard support",
    ],
    cta: "Get Started",
    href: "/register",
    popular: false,
  },
  {
    name: "Pro",
    price: "₹999",
    period: "/month",
    description: "For serious creators ready to scale",
    icon: Crown,
    iconBg: "bg-neon-purple/10",
    iconColor: "text-neon-purple",
    features: [
      "Everything in Starter",
      "Unlimited job applications",
      "Unlimited portfolio items",
      "Featured in search results",
      "Priority support",
      "Analytics dashboard",
      "Custom profile URL",
    ],
    cta: "Go Pro",
    href: "/register",
    popular: true,
  },
  {
    name: "Business",
    price: "₹2,999",
    period: "/month",
    description: "For agencies & high-volume clients",
    icon: Rocket,
    iconBg: "bg-neon-orange/10",
    iconColor: "text-neon-orange",
    features: [
      "Everything in Pro",
      "Post unlimited jobs",
      "Team collaboration (5 seats)",
      "Dedicated account manager",
      "API access",
      "Custom contracts & NDA",
      "Invoice management",
      "Priority placement",
    ],
    cta: "Contact Sales",
    href: "/register",
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl font-bold sm:text-5xl">
            Simple, Transparent{" "}
            <span className="text-gradient">Pricing</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Choose the plan that fits your needs. Upgrade or downgrade anytime.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className={`relative rounded-2xl border p-8 ${
                plan.popular
                  ? "border-neon-purple/50 bg-neon-purple/5 shadow-lg shadow-neon-purple/10"
                  : "border-dark-border bg-dark-card/60"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-neon-purple to-neon-cyan px-4 py-1 text-xs font-bold text-white">
                  Most Popular
                </div>
              )}
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${plan.iconBg}`}>
                <plan.icon className={plan.iconColor} size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">{plan.name}</h3>
              <p className="mt-1 text-sm text-gray-400">{plan.description}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                {plan.period && <span className="text-gray-400">{plan.period}</span>}
              </div>
              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-gray-300">
                    <Check size={16} className="mt-0.5 shrink-0 text-green-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                to={plan.href}
                className={`mt-8 block w-full rounded-lg py-3 text-center text-sm font-semibold transition-all ${
                  plan.popular
                    ? "bg-gradient-to-r from-neon-purple to-neon-cyan text-white hover:shadow-lg hover:shadow-neon-purple/25"
                    : "border border-dark-border text-white hover:border-neon-purple/50"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mx-auto mt-24 max-w-3xl"
        >
          <h2 className="mb-8 text-center text-2xl font-bold">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Can I switch plans anytime?", a: "Yes! You can upgrade or downgrade at any time. Changes take effect on your next billing cycle." },
              { q: "Is there a commission on transactions?", a: "Creator Adda charges a 10% service fee on completed projects. This is included in the pricing for both creators and clients." },
              { q: "Do you offer refunds?", a: "We offer a 7-day money-back guarantee on all paid plans. If you're not satisfied, contact our support team." },
              { q: "What payment methods do you accept?", a: "We accept all major credit/debit cards, UPI, net banking, and popular wallets." },
            ].map((faq) => (
              <div key={faq.q} className="rounded-xl border border-dark-border bg-dark-card/40 p-6">
                <h4 className="font-medium text-white">{faq.q}</h4>
                <p className="mt-2 text-sm text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
