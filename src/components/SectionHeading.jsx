import './SectionHeading.css';

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = 'left',
  light = false,
  className = '',
}) {
  return (
    <div className={`sec-heading sec-heading--${align}${light ? ' sec-heading--light' : ''} ${className}`}>
      {label && (
        <span className="section-label" aria-label={label}>
          {label}
        </span>
      )}
      <h2 className="sec-heading__title">{title}</h2>
      {subtitle && (
        <p className="sec-heading__subtitle">{subtitle}</p>
      )}
    </div>
  );
}
