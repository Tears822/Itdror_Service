"use client";

type CyberBenefitCardProps = {
  title: string;
  desc: string;
};

export function CyberBenefitCard({ title, desc }: CyberBenefitCardProps) {
  return (
    <div className="cyber-benefit-card">
      <div className="cyber-benefit-card__canvas">
        {/* Trackers first so ~ .cyber-benefit-card__card works; card is next sibling */}
        <div className="cyber-benefit-card__tracker tr-1" aria-hidden />
        <div className="cyber-benefit-card__tracker tr-2" aria-hidden />
        <div className="cyber-benefit-card__tracker tr-3" aria-hidden />
        <div className="cyber-benefit-card__tracker tr-4" aria-hidden />
        <div className="cyber-benefit-card__tracker tr-5" aria-hidden />
        <div className="cyber-benefit-card__tracker tr-6" aria-hidden />
        <div className="cyber-benefit-card__tracker tr-7" aria-hidden />
        <div className="cyber-benefit-card__tracker tr-8" aria-hidden />
        <div className="cyber-benefit-card__tracker tr-9" aria-hidden />
        <div className="cyber-benefit-card__card">
          <div className="cyber-benefit-card__content">
            <p className="cyber-benefit-card__prompt">HOVER ME</p>
            <div className="cyber-benefit-card__title">{title}</div>
            <p className="cyber-benefit-card__desc">{desc}</p>
            <div className="cyber-benefit-card__glare" aria-hidden />
            <div className="cyber-benefit-card__glow cyber-benefit-card__glow-1" aria-hidden />
            <div className="cyber-benefit-card__glow cyber-benefit-card__glow-2" aria-hidden />
            <div className="cyber-benefit-card__glow cyber-benefit-card__glow-3" aria-hidden />
            <span className="cyber-benefit-card__line" aria-hidden />
            <span className="cyber-benefit-card__line" aria-hidden />
            <span className="cyber-benefit-card__line" aria-hidden />
            <span className="cyber-benefit-card__corner" aria-hidden />
            <span className="cyber-benefit-card__corner" aria-hidden />
            <span className="cyber-benefit-card__corner" aria-hidden />
            <span className="cyber-benefit-card__corner" aria-hidden />
          </div>
        </div>
      </div>
    </div>
  );
}
