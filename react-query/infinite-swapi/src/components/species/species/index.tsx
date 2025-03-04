import type { SpeciesProps } from "./types";

export function Species({ name, language, averageLifespan }: SpeciesProps) {
  return (
    <li>
      {name}
      <ul>
        <li>language: {language}</li>
        <li>average lifespan: {averageLifespan}</li>
      </ul>
    </li>
  );
}
