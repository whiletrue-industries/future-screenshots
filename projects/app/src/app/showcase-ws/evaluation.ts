/**
 * The evaluation the showcase acts on for an item.
 *
 * An item carries two evaluations: the human one (`favorable_future`,
 * `plausibility`), filled in by a participant or a moderator, and the model's
 * (`ai_favorable_future`, `ai_plausibility`), filled in at ingest. The human
 * answer wins whenever it exists; otherwise the model's stands in, so an item
 * nobody has evaluated yet still hangs on a string, tilts, and gets its
 * labels. This mirrors the server's `resolve_favorable_future`.
 *
 * Resolve once, where API items become `PhotoMetadata`, so every consumer –
 * layouts, rotation, filters, the demo tour's labels – reads the same values
 * from `metadata.favorable_future` and `metadata.plausibility`.
 */
export interface ResolvedEvaluation {
  favorable_future: string | null;
  plausibility: number | null;
}

/** True for null, undefined and the empty string – the ways "not answered" arrives from the API. */
function isBlank(value: unknown): boolean {
  return value === null || value === undefined || value === '';
}

export function resolveEvaluation(item: Record<string, any>): ResolvedEvaluation {
  const favorableFuture = !isBlank(item['favorable_future']) ? item['favorable_future'] : item['ai_favorable_future'];
  const plausibility = !isBlank(item['plausibility']) ? item['plausibility'] : item['ai_plausibility'];

  return {
    favorable_future: isBlank(favorableFuture) ? null : String(favorableFuture),
    plausibility: isBlank(plausibility) || !isFinite(Number(plausibility)) ? null : Number(plausibility),
  };
}
