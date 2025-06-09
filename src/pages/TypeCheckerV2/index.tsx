import { TypeCheckerProvider } from "./state/TypeCheckerProvider";
import TypeButtons from "./TypeButtons";
import TypeInfo from "./TypeInfo";

export function TypeCheckerV2() {
  return <div>
    <TypeCheckerProvider>
      <TypeButtons />
      <TypeInfo />
    </TypeCheckerProvider>
  </div>
}