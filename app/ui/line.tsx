export function Line({
  roleIds,
  roleLabel,
  line,
}: {
  roleIds: number[];
  roleLabel: string;
  line: Array<{
    s: string;
    action?: boolean;
  }>;
}) {
  const roleIdsAttr = roleIds.join(",");

  return (
    <div className="play-line flex w-full flex-row p-2">
      <div
        className="box-border w-1/4 shrink-0 pr-2 text-left text-sm leading-snug md:w-52 md:pr-3 md:text-base"
        data-role-ids={roleIdsAttr}
      >
        <span className="block break-words">{roleLabel}</span>
      </div>
      <div className="min-w-0 flex-1 flex flex-col" data-role-ids={roleIdsAttr}>
        {line
          .filter((text) => text.s)
          .map((text, index) => {
            return (
              <span
                key={index}
                className={
                  "play-line-text " + (text.action ? "italic " : " ")
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
