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
      <div className="min-w-[9rem] max-w-[14rem] shrink-0 pr-2" data-role-ids={roleIdsAttr}>
        <span>{roleLabel}</span>
      </div>
      <div className="flex flex-col" data-role-ids={roleIdsAttr}>
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
