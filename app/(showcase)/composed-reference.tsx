import { ShowcaseAnatomy, ShowcaseApiReference } from "@/components/shared/showcase";
import { ShowcaseAnatomyContent, ShowcaseApiTable, type ShowcaseApiGroup } from "@/components/shared/showcase-reference";

export function ComposedReference({ name, code, parts, groups, note }: {
  name: string;
  code: string;
  parts: readonly (readonly string[])[];
  groups: readonly ShowcaseApiGroup[];
  note?: string;
}) {
  return <>
    <ShowcaseAnatomy><ShowcaseAnatomyContent name={name} code={code} parts={parts} /></ShowcaseAnatomy>
    <ShowcaseApiReference>
      <ShowcaseApiTable name={name} groups={groups} />
      {note && <p className="body-sm text-content-base">{note}</p>}
    </ShowcaseApiReference>
  </>;
}
