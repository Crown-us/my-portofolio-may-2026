import base0 from "@/app/portfolio.module.css";
import base1 from "@/app/portfolio-1.module.css";
import additions from "@/app/upgrade.module.css";
const modules = [base0, base1, additions];
const styles = Object.fromEntries(
  [...new Set(modules.flatMap((module) => Object.keys(module)))].map((key) => [
    key,
    modules
      .map((module) => module[key])
      .filter(Boolean)
      .join(" "),
  ]),
);
export default styles;
