export function Line({
  roleIds,
  roleLabel,
  line,
  highlighted,
}: {
  roleIds: number[];
  roleLabel: string;
  highlighted: boolean;
  line: Array<{
    s: string;
    action?: boolean;
  }>;
}) {
  const rowClass =
    "play-line flex w-full flex-row p-2" +
    (highlighted ? " highlight-role" : "");

  return (
    <div className={rowClass} data-line-roles={roleIds.join(",")}>
      <div
        className={
          "box-border w-1/4 shrink-0 pr-2 text-left text-sm leading-snug md:w-52 md:pr-3 md:text-base"
        }
      >
        <span className="block break-words">{roleLabel}</span>
      </div>
      <div className={"min-w-0 flex-1 flex flex-col"}>
        {line
          .filter((text) => text.s)
          .map((text, index) => {
            return (
              <span
                key={index}
                className={
                  "play-line-text " +
                  (text.action ? "italic play-line-action " : " ")
                }
              >
                {text.s}
                <br />
              </span>
            );
          })}
      </div>
    </div>
  );
}
