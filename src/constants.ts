export const TypeRelationsKeys = {
  double_damage_from: "double_damage_from",
  double_damage_to: "double_damage_to",
  half_damage_from: "half_damage_from",
  half_damage_to: "half_damage_to",
  no_damage_from: "no_damage_from",
  no_damage_to: "no_damage_to",
} as const;

export const typeRelationHeaders: Record<string, string> = {
  double_damage_from: "Weak to (2x)",
  double_damage_to: "Strong against (2x)",
  half_damage_from: "Resistant to (.5x)",
  half_damage_to: "Weak against (.5x)",
  no_damage_from: "Immune to (0x)",
  no_damage_to: "No effect on (0x)",
};
