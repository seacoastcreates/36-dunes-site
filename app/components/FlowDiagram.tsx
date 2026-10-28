export type FlowStep = {
  label: string;
  detail?: string;
  /** Symbol shown before this step. Defaults to an arrow; use "+" or "=" for
   * steps that combine rather than follow. */
  joiner?: string;
};

/** A left-to-right pipeline diagram for post bodies. Stacks vertically on
 * narrow screens, where the arrows turn to point down. */
export default function FlowDiagram({
  steps,
  caption,
  label,
}: {
  steps: FlowStep[];
  caption?: string;
  label: string;
}) {
  return (
    <figure className="flow">
      <ol className="flow-steps" aria-label={label}>
        {steps.map((step, i) => {
          const joiner = step.joiner ?? "→";
          return (
            <li className="flow-step" key={step.label}>
              {i > 0 && (
                <span
                  className={joiner === "→" ? "flow-joiner flow-arrow" : "flow-joiner"}
                  aria-hidden="true"
                >
                  {joiner}
                </span>
              )}
              <span className="flow-box">
                <span className="flow-index">{String(i + 1).padStart(2, "0")}</span>
                <span className="flow-label">{step.label}</span>
                {step.detail && <span className="flow-detail">{step.detail}</span>}
              </span>
            </li>
          );
        })}
      </ol>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
